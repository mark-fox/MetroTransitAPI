from flask import Flask, render_template, request, url_for, jsonify
import requests, json

app = Flask(__name__)
app.static_folder = 'static'
URL = 'http://svc.metrotransit.org/nextrip/{}?format=json'


@app.route('/', methods=['GET', 'POST'])
def homepage():
    res = requests.get(URL.format('routes'))
    resData = res.json()
    return render_template('index.html', routes=resData)


@app.route('/directions', methods=['GET', 'POST'])
def getDirections():
    print('getDirections reached')
    routeNumber = request.args['routeNum']
    res = requests.get(URL.format('directions/' + routeNumber))
    return jsonify(res.json())


if __name__ == '__main__':
    # TODO remove debug=True text when finalizing
    app.run(debug=True)
# TODO pip freeze > requirements.txt
