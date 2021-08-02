from datetime import datetime
import string
import secrets
from flask import jsonify
from app.models import GenInfo, GenInfoResult, StrucInfo, StrucInfoResult, Conformer, ConformerResult
from app import db
from app.api import bp
from app.functions import estimateGenInfo, estimateConformers, estimateStrucInfo

@bp.route('/repeats/genInformation/<string:repeatId>', methods=['GET'])
def get_general_information(repeatId):
  try:
    _repeatId = repeatId[:4].lower() + repeatId[4:]
    data = GenInfo.query.filter_by(pdb_id=_repeatId).first().to_dict()
    response = jsonify(
      category="success",
      message="The general information of repeat was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The general information of repeat was not obtained satisfactorily",
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
      message="The structural information of repeat was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The structural information of repeat was not obtained satisfactorily",
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
    Conformer.to_collection(results_conformer_1, data)
    Conformer.to_collection(results_conformer_2, data)
    response = jsonify(
      category="success",
      message="The conformers of repeat was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The conformers of repeat was not obtained satisfactorily",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response

@bp.route('/estimate/genInformation/<string:repeatId>', methods=['GET'])
def get_general_information_result(repeatId):
  try:
    _pdbId = repeatId.split('_')[0].lower() + '_' + repeatId.split('_')[1]
    _lower = int(repeatId.split('_')[2])
    _upper = int(repeatId.split('_')[3])
    data = GenInfoResult.query.filter_by(pdb_id=_pdbId, lower=_lower, upper=_upper).first().to_dict()
    response = jsonify(
      category="success",
      message="The general information of estimate was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The general information of estimate was not obtained satisfactorily",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response   

@bp.route('/estimate/strucInformation/<string:repeatId>', methods=['GET'])
def get_structural_information_result(repeatId):
  try:
    _pdbId = repeatId.split('_')[0].lower() + '_' + repeatId.split('_')[1]
    _lower = int(repeatId.split('_')[2])
    _upper = int(repeatId.split('_')[3])
    genInfo = GenInfoResult.query.filter_by(pdb_id=_pdbId, lower=_lower, upper=_upper).first().to_dict()
    _id = int(genInfo['id'])
    data = StrucInfoResult.query.filter_by(id=_id).first().to_dict()
    response = jsonify(
      category="success",
      message="The structural information of estimate was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The structural information of estimate was not obtained satisfactorily",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response 

@bp.route('/estimate/conformers/<string:repeatId>', methods=['GET'])
def get_conformers_results(repeatId):
  try:
    _pdbId = repeatId.split('_')[0].lower() + '_' + repeatId.split('_')[1]
    _lower = int(repeatId.split('_')[2])
    _upper = int(repeatId.split('_')[3])
    genInfo = GenInfoResult.query.filter_by(pdb_id=_pdbId, lower=_lower, upper=_upper).first().to_dict()
    _id_result = int(genInfo['id'])
    results_conformer_1 = ConformerResult.query.filter_by(id_result=_id_result, conformer_1=_pdbId).all()
    results_conformer_2 = ConformerResult.query.filter_by(id_result=_id_result, conformer_2=_pdbId).all()
    data = []
    ConformerResult.to_collection(results_conformer_1, data)
    ConformerResult.to_collection(results_conformer_2, data)  
    response = jsonify(
      category="success",
      message="The conformers of estimate was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The conformers of estimate was not obtained satisfactorily",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response 

@bp.route('/estimate/search/<string:repeatId>', methods=['GET'])
def get_estimate(repeatId):
  try:
    _pdbId = repeatId.split('_')[0].lower() + '_' + repeatId.split('_')[1]
    _lower = int(repeatId.split('_')[2])
    _upper = int(repeatId.split('_')[3])
    genInfoResult = GenInfoResult.query.filter_by(pdb_id=_pdbId, lower=_lower, upper=_upper).first().to_dict()
    _id = genInfoResult['id']
    strucInfoResult = StrucInfoResult.query.filter_by(id=_id).first().to_dict()
    results_conformer_1 = ConformerResult.query.filter_by(id_result=_id, conformer_1=_pdbId).all()
    results_conformer_2 = ConformerResult.query.filter_by(id_result=_id, conformer_2=_pdbId).all()
    conformers = []
    ConformerResult.to_collection(results_conformer_1, conformers)
    ConformerResult.to_collection(results_conformer_2, conformers)      
    data = { "genInfo": genInfoResult, "strucInfo": strucInfoResult, "conformers": conformers }
    response = jsonify(
      category="success",
      message="The general information of estimate was obtained satisfactorily",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The data from the conformational diversity analysis were not obtained satisfactorily",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response

@bp.route('/estimate/<string:repeatId>', methods=['GET'])
def estimate_conformational_diversity(repeatId):
  try:
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
    db.session.commit()
    _structuralInformation = estimateStrucInfo(token)
    db.session.add(StrucInfoResult(
      id=_repeatId[:4].lower()+_repeatId[4:],
      num_conf=_structuralInformation['num_conf'],
      rmsd_min=_structuralInformation['rmsd_min'],
      rmsd_max=_structuralInformation['rmsd_max'],
      rmsd_avg=_structuralInformation['rmsd_avg']
    ))
    db.session.commit()
    data = { 'genInfo': _generalInformation, 'conformers': _conformers, 'strucInfo': _structuralInformation }
    response = jsonify(
      category="success",
      message="The estimation of the conformational diversity was obtained in a satisfactory way",
      timestamp=datetime.now(),
      payload=data,
      status=200
    )
    return response
  except:
    response = jsonify(
      category="error",
      message="The estimation of the conformational diversity was not obtained in a satisfactory way",
      timestamp=datetime.now(),
      status=404
    )
    response.status_code = 404
    return response