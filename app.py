from flask import Flask, render_template, render_template_string, request, jsonify, url_for, make_response
from flask.templating import render_template_string
from flask_restful import Resource, Api, reqparse
import json
from json.decoder import JSONDecodeError

import pandas as pd
import numpy as np

app = Flask(__name__)

# converts csv to pandas file
data = pd.read_csv('static/past.csv')

@app.context_processor
def inject():
    # converts pandas to json
    return dict(json_data=data.to_json(orient='records'))

# displays homepage
@app.route('/')
def home():
    return render_template('index.html', results=data)

# displays first table
@app.route('/', methods=['POST'])
def actions():
    string = ''
    with open('templates/results.html', 'r') as file:
        for line in file:
            string += line
        file.close()

    #keyword = json.loads(request.data)

    keyword = request.form['searchbar']
    #keyword = request.form.get('searchbar')

    mask = np.column_stack([data[col].str.contains(keyword, na=False) for col in data])
    matches = data.loc[mask.any(axis=1)]
    html_string = render_template_string(string, results=matches)
    return jsonify(resp=html_string)
    
# display next table
@app.route('/iteration', methods=['GET'])
def returnTable():
    return data

app.run(debug=True) 
