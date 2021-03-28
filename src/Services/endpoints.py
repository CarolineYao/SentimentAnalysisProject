from flask import Flask, json, g, request

app = Flask(__name__)

@app.route("/getuserpostsemotions", methods=["GET"])
def get():
    return json_response({})



def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})



if __name__ == '__main__':
    app.run()