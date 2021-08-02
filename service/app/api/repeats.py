from datetime import datetime
from flask import jsonify
from app.models import GenInfo, StrucInfo, Conformer
from app import db
from app.api import bp

@bp.route('/repeats/genInformation/<string:repeatId>', methods=['GET'])
def get_general_information(repeatId):
  try:
    _repeatId = repeatId[:4].lower() + repeatId[4:]
    data = GenInfo.query.filter_by(pdb_id=_repeatId).first().to_dict()
    response = jsonify(
      category="success",
      message="The general information of repeat was satisfactorily obtained",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The general information of repeat was not satisfactorily obtained",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response    

@bp.route('/repeats/strucInformation/<string:repeatId>', methods=['GET'])
def get_structural_information(repeatId):
  try:
    _repeatId = repeatId[:4].lower() + repeatId[4:]
    genInfo = GenInfo.query.filter_by(pdb_id=_repeatId).first().to_dict()
    _cluster = int(genInfo['cluster'])
    results = StrucInfo.query.filter_by(cluster=_cluster).all()
    data = []
    StrucInfo.to_collection(results, data)
    response = jsonify(
      category="success",
      message="The general information of repeat was satisfactorily obtained",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The general information of repeat was not satisfactorily obtained",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response

@bp.route('/repeats/conformers/<string:repeatId>', methods=['GET'])
def get_conformers(repeatId):
  try:
    _repeatId = repeatId[:4].lower() + repeatId[4:]
    results_conformer_1 = Conformer.query.filter_by(conformer_1=_repeatId).all()
    results_conformer_2 = Conformer.query.filter_by(conformer_2=_repeatId).all()
    data = []
    StrucInfo.to_collection(results_conformer_1, data)
    StrucInfo.to_collection(results_conformer_2, data)
    response = jsonify(
      category="success",
      message="The general information of repeat was satisfactorily obtained",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The general information of repeat was not satisfactorily obtained",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response       