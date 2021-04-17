from flask import Flask, json, g, request, jsonify, make_response
from .utils import required_header_check, get_date_with_timezone, json_response
from .errorHandlers import *
import pytz
import datetime
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

    timezone = headers.get("timezone")

    start_date = headers.get("startDate")
    end_date = headers.get("endDate")
    required_header_check((start_date == None) or (end_date == None),  "Date range is required")

      
    start_date = get_date_with_timezone(start_date, timezone)
    end_date = get_date_with_timezone(end_date, timezone)



    return json_response({})


if __name__ == "__main__":
    app.run()