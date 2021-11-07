from flask import Flask, render_template, request, url_for, make_response
from flask_restful import Resource, Api, reqparse
import json
from json.decoder import JSONDecodeError

import pandas as pd
import numpy as np

app = Flask(__name__)

data = pd.read_csv('static/past.csv')

@app.route('/')
def home():
    return render_template('index.html', results=data)

@app.route('/', methods=['POST'])
def actions():
    #text = request.args.get('jsdata')
    #matches = data
    #if text:
        keyword = request.form.get('searchbar')
        mask = np.column_stack([data[col].str.contains(keyword, na=False) for col in data])
        matches = data.loc[mask.any(axis=1)]
        return render_template('index.html', results=matches)
    #return render_template('index.html', results=data)

app.run() 
