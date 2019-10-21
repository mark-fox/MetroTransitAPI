from flask import Flask, render_template, request
import requests, json

app = Flask(__name__)
URL = 'http://svc.metrotransit.org/nextrip/{}?format=json'


@app.route('/', methods=['GET', 'POST'])
def homepage():
    res = requests.get(URL.format('routes'))
    resData = res.json()

    if request.method == 'GET':
        return render_template('index.html', routes = resData)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    # TODO remove debug=True text when finalizing
    app.run(debug=True)
# TODO pip freeze > requirements.txt
