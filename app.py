from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
# Designates location of front-end files
app.static_folder = 'static'
# API address plus formatting placeholder
URL = 'http://svc.metrotransit.org/nextrip/{}?format=json'


# Main page's route
@app.route('/', methods=['GET', 'POST'])
def homepage():
    # Generates Response from API for all Routes
    res = requests.get(URL.format('routes'))
    # Converts Response to be sent to web page
    resData = res.json()
    return render_template('index.html', routes=resData)


# Directions route
@app.route('/directions', methods=['GET', 'POST'])
def getDirections():
    # Retrieves data from passed object
    routeNumber = request.args['routeNum']
    # Generates Response from API using RouteID
    res = requests.get(URL.format('directions/' + routeNumber))
    # Converts Response to be sent to AJAX callback
    return jsonify(res.json())


# Stops route
@app.route('/stops')
def getStops():
    # Retrieves data from passed object
    routeNumber = request.args['routeNum']
    direction = request.args['direction']
    # Generates Response from API using RouteID and DirectionID
    res = requests.get(URL.format('stops/' + routeNumber + '/' + direction))
    # Converts Response to be sent to AJAX callback
    return jsonify(res.json())


# Departure Time route
@app.route('/time')
def getTime():
    # Retrieves data from passed object
    routeNumber = request.args['routeNum']
    direction = request.args['direction']
    stop = request.args['stopNum']
    # Generates Response from API using RouteID, DirectionID, and StopID
    res = requests.get(URL.format(routeNumber + '/' + direction + '/' + stop))
    # Converts Response to be sent to AJAX callback
    return jsonify(res.json())


# Run app
if __name__ == '__main__':
    app.run()
