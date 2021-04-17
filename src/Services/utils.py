import pytz
from datetime import datetime, timedelta
import werkzeug
# from flask import json
import json
from json import JSONEncoder

def json_response(payload, status=200):
    return (json.dumps(payload), status, {"content-type": "application/json"})

def required_param_check(statement, message):
    if statement == True:
        raise werkzeug.exceptions.BadRequest(description=message)
    else:
        return


def _get_date_with_timezone(date, timezone):
    date_format = "%Y-%m-%d"
    date = datetime.strptime(date, date_format)

    return timezone.localize(date, is_dst=None)

def compute_start_and_end_date(start_date, end_date, timezone):
    start_date = _get_date_with_timezone(start_date, timezone)
    end_date = _get_date_with_timezone(end_date, timezone)

    start_date = timezone.localize(datetime(start_date.year, start_date.month, start_date.day, 0, 0, 0, tzinfo=None))
    end_date = timezone.localize(datetime(end_date.year, end_date.month, end_date.day, 23, 59, 59, tzinfo=None))

    return start_date, end_date
    
def get_date_sid(date_time):
    month = int(date_time.strftime("%m"))
    day = int(date_time.strftime("%d"))
    year = int(date_time.strftime("%Y"))

    result = datetime(year, month, day, 0, 0, 0, tzinfo=date_time.tzinfo)
    return result.isoformat()
