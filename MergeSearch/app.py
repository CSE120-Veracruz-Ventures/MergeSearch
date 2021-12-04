from flask import Flask, render_template
import pandas as pd
import numpy as np

app = Flask(__name__)

# converts csv to pandas file
data = pd.read_csv('static/past.csv')

@app.route('/')
def home():
    return render_template('index.html', results=data)

app.run(debug=True) 
