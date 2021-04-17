from flask import Flask, json, g, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from .utils import *
from .errorHandlers import *
from Backend import TwitterDataFetch
from Backend import NeuralNetModel
from Backend import index_to_class
import pytz
from datetime import datetime, timedelta
import werkzeug

app = Flask(__name__)
app.register_error_handler(400, handle_bad_request)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})


@app.route("/getuserpostsemotions", methods=["GET"])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def get():
    args = request.args

    social_media = args.get("socialMediaSource")
    required_param_check(social_media == None, "Social Media source is required")

    username = args.get("username")
    required_param_check(username == None, "Username is required")

    timezone_text = args.get("timezone")
    required_param_check(timezone_text == None, "Timezone is required")
    timezone = pytz.timezone(timezone_text)

    start_date = args.get("startDate")
    end_date = args.get("endDate")
    required_param_check((start_date == None) or (end_date == None),  "Date range is required")

    start_date_with_tz, end_date_with_tz = compute_start_and_end_date(start_date, end_date, timezone)

    dataFetch = None

    if (social_media == "twitter"):
        dataFetch = TwitterDataFetch(start_date=start_date_with_tz, end_date=end_date_with_tz)
    
    dataFetch.fetch_user_posts(username)
    data_lst = dataFetch.get_data_lst()

    nn_model = NeuralNetModel("../Backend")
    analyzed_lst = []
    analysis_by_date = {}

    for data in data_lst:
        data_time_with_tz = data.get_time().replace(tzinfo=pytz.utc).astimezone(timezone)
        data_timestamp = data_time_with_tz
        data_emotion = nn_model.analyze(data)
        fmt = '%Y-%m-%d %H:%M:%S %Z'

        result = {
            "time": data_timestamp.strftime(fmt),
            "text": data.get_text(),
            "emotion": data_emotion
        }

        analyzed_lst.append(result)
        data_date = get_date_sid(data_time_with_tz)

        if data_date in analysis_by_date:
            date_analysis_data = analysis_by_date[data_date]
            if data_emotion in date_analysis_data:
                date_analysis_data[data_emotion].append(result)
            else:
                date_analysis_data[data_emotion] = [result]
        else:
            analysis_by_date[data_date] = {}
            analysis_by_date[data_date][data_emotion] = [result]

        
    # END OF FOR LOOP

    return make_response(jsonify({
        "fullList": analyzed_lst,
        "byDate": analysis_by_date,
        "emotions": list(index_to_class.values()),
    }), 200)


if __name__ == "__main__":
    app.run()