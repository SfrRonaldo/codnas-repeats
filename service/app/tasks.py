import json
import sys
import time
from flask import render_template
from rq import get_current_job
from app import create_app, db
from app.email import send_email

app = create_app()
app.app_context().push()

def analysis(body):
  try:
    url = 'http://localhost:3000/repeats/estimate/{}'.format(body['repeatId'])
    send_email(
      '[CoDNaS-Repeats] Conformational diversity analysis',
      sender=app.config['ADMINS'][0],
      recipients=[body['email']],
      text_body=render_template('response.txt', repeatId=body['repeatId']),
      html_body=render_template('response.html', repeatId=url)
    )
  except:
    app.logger.error('Unhandled exception', exc_info=sys.exc_info())