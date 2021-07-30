from flask import Flask
import time

app = Flask(__name__)

@app.route('/api/time')
def currentTime():
    return {'time': time.time()}
