from flask import json, request, jsonify, make_response
import werkzeug

exception_to_error_code = {
    "BadRequest": 400
}

def _get_exception_error_code(e):
    exception_type = type(e).__name__
    return exception_to_error_code[exception_type]

def _compute_error_json(e):
    return {
        "code": _get_exception_error_code(e),
        "message": e.description
    }

def handle_bad_request(e):
    return make_response(_compute_error_json(e), _get_exception_error_code(e))