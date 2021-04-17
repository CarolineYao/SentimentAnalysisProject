from flask import Flask, json, g, request, jsonify, make_response
from .utils import *
from .errorHandlers import *
from Backend import TwitterDataFetch
from Backend import NeuralNetModel
import pytz
from datetime import datetime, timedelta
import werkzeug

app = Flask(__name__)
app.register_error_handler(400, handle_bad_request)


@app.route("/getuserpostsemotions", methods=["GET"])
def get():
    headers = request.headers

    social_media = headers.get("socialMediaSource")
    required_header_check(social_media == None, "Social Media source is required")

    username = headers.get("username")
    required_header_check(username == None, "Username is required")

    timezone_text = headers.get("timezone")
    required_header_check(timezone_text == None, "Timezone is required")
    timezone = pytz.timezone(timezone_text)

    start_date = headers.get("startDate")
    end_date = headers.get("endDate")
    required_header_check((start_date == None) or (end_date == None),  "Date range is required")

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

        
    # END OF FOR LOOP

    return make_response(jsonify({
        "fullList": analyzed_lst,
        "byDate": analysis_by_date
        }), 200)


if __name__ == "__main__":
    app.run()