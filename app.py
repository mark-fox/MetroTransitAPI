from flask import Flask, render_template, request, url_for, jsonify
import requests, json

app = Flask(__name__)
app.static_folder = 'static'
URL = 'http://svc.metrotransit.org/nextrip/{}?format=json'


@app.route('/', methods=['GET', 'POST'])
def homepage():
    res = requests.get(URL.format('routes'))
    resData = res.json()

# TODO condense parameters and make single return line
    if request.method == 'GET':
        return render_template('index.html', routes=resData)
    else:
        route = request.form['routeField']
        return render_template('index.html', routes=resData)


@app.route('/directions', methods=['GET', 'POST'])
def getDirections():
    print('getDirections reached')
    if request.method == "GET":
        # routeNumber = request.json['routeNum']
        routeNumber = request.args['routeNum']
        # routeNumber = request.get_json()
        print(type(routeNumber))
        print(routeNumber)
        temp = 'directions/' + str(routeNumber)
        print('temp is: ' + temp)
        res = requests.get(URL.format('directions/' + routeNumber))
        print('directions response:')
        print(type(res))
        # print(res[0].Text)
        print(res.json())
        return jsonify(res.json()) # json.dumps(res) # jsonify(res.json()) # res.json()


if __name__ == '__main__':
    # TODO remove debug=True text when finalizing
    app.run(debug=True)
# TODO pip freeze > requirements.txt
