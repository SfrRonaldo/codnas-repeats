from os import sync
import secrets
import sys
import string
from flask import render_template
from app import create_app, db
from app.email import send_email
from app.models import GenInfoResult, StrucInfoResult, ConformerResult
from app.functions import estimateGenInfo, estimateConformers, estimateStrucInfo

app = create_app()
app.app_context().push()

def estimate_conformational_diversity(repeatId):
  alphabet = string.ascii_letters + string.digits
  while True:
    token = ''.join(secrets.choice(alphabet) for i in range(10))
    if (any(c.islower() for c in token)
      and any(c.isupper() for c in token)
      and sum(c.isdigit() for c in token) >= 3):
      break
  _repeatId = repeatId
  _generalInformation = estimateGenInfo(_repeatId[:4], token, _repeatId)
  _conformers = estimateConformers(_repeatId, token)
  db.session.add(GenInfoResult(
    id=_generalInformation['id'], pdb_id=_generalInformation['pdb_id'],
    lower=int(_generalInformation['lower']), upper=int(_generalInformation['upper']),
    name=_generalInformation['name'], title=_generalInformation['title'],
    organism=_generalInformation['organism'], classification=_generalInformation['classification']
  ))
  db.session.commit()    
  for i in _conformers:
    db.session.add(ConformerResult(
      id_result=_repeatId[:4].lower()+_repeatId[4:],
      conformer_1=i['conformer_1'],
      conformer_2=i['conformer_2'],
      lower_1=int(i['lower_1']),
      lower_2=int(i['lower_2']),
      upper_1=int(i['upper_1']),
      upper_2=int(i['upper_2']),
      rmsd=float(i['rmsd']),
      seq_id=float(i['seq_id'])
    ))
  _structuralInformation = estimateStrucInfo(token)
  db.session.add(StrucInfoResult(
    id=_repeatId[:4].lower()+_repeatId[4:],
    num_conf=_structuralInformation['num_conf'],
    rmsd_min=_structuralInformation['rmsd_min'],
    rmsd_max=_structuralInformation['rmsd_max'],
    rmsd_avg=_structuralInformation['rmsd_avg']
  ))
  db.session.commit()  

def analysis(data):
  try:
    send_email(
      '[CoDNaS-Repeats] Conformational diversity analysis',
      sender=app.config['ADMINS'][0],
      recipients=[app.config['ADMINS'][0]],
      text_body=render_template('request.txt', repeatId=data['repeatId'], email=data['email']),
      html_body=render_template('request.html', repeatId=data['repeatId'], email=data['email']),
      sync=True
    )    
    estimate_conformational_diversity(data['repeatId'])
    url = 'http://localhost/repeats/estimate/{}'.format(data['repeatId'])
    send_email(
      '[CoDNaS-Repeats] Conformational diversity analysis',
      sender=app.config['ADMINS'][0],
      recipients=[data['email']],
      text_body=render_template('response.txt', repeatId=data['repeatId']),
      html_body=render_template('response.html', repeatId=url),
      sync=True
    )
  except:
    app.logger.error('Unhandled exception', exc_info=sys.exc_info())