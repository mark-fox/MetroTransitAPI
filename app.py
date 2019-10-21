from flask import Flask, render_template, request, url_for
import requests, json

app = Flask(__name__)
app.static_folder = 'static'
URL = 'http://svc.metrotransit.org/nextrip/{}?format=json'


@app.route('/', methods=['GET', 'POST'])
def homepage():
    res = requests.get(URL.format('routes'))
    resData = res.json()

    if request.method == 'GET':
        return render_template('index.html', routes = resData)
    else:
        # route = request.form['routeField']
        return render_template('index.html')


if __name__ == '__main__':
    # TODO remove debug=True text when finalizing
    app.run(debug=True)
# TODO pip freeze > requirements.txt
