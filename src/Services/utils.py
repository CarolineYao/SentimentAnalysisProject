import pytz
import datetime
import werkzeug
from flask import json

def json_response(payload, status=200):
    return (json.dumps(payload), status, {"content-type": "application/json"})

def required_header_check(statement, message):
    if statement == True:
        raise werkzeug.exceptions.BadRequest(description=message)
    else:
        return


def get_date_with_timezone(date, timezone_text):
    timezone = pytz.timezone(timezone_text)
    date_format = "%Y-%m-%d"
    date = datetime.datetime.strptime(date, date_format)

    return timezone.localize(date, is_dst=None)