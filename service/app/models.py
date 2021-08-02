from app import db

class GenInfo(db.Model):
  pdb_id = db.Column(db.String(10), primary_key=True)
  cluster = db.Column(db.Integer)
  name = db.Column(db.String(260))
  title = db.Column(db.String(340))
  organism = db.Column(db.String(115))
  seqres = db.Column(db.Integer)
  classification = db.Column(db.String(60))
  num_regions = db.Column(db.Integer)

  def __repr__(self):
    return '<GenInfo {}>'.format(self.pdb_id)
  
  def to_dict(self):
    data = {
      'pdb_id': self.pdb_id,
      'cluster': self.cluster,
      'name': self.name,
      'title': self.title,
      'organism': self.organism,
      'seqres': self.seqres,
      'classification': self.classification,
      'num_regions': self.num_regions
    }
    return data

class StrucInfo(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  cluster = db.Column(db.Integer)
  region = db.Column(db.Integer)
  num_conf = db.Column(db.Integer)
  rmsd_min = db.Column(db.Float)
  rmsd_max = db.Column(db.Float)
  rmsd_avg = db.Column(db.Float)

  def __repr__(self):
    return '<StrucInfo {}>'.format(self.id)

  def to_dict(self):
    data = {
      'id': self.id,
      'cluster': self.cluster,
      'region': self.region,
      'num_conf': self.num_conf,
      'rmsd_min': self.rmsd_min,
      'rmsd_max': self.rmsd_max,
      'rmsd_avg': self.rmsd_avg
    }
    return data
  
  def to_collection(results, data):
    for i in results:
      data.append(i.to_dict())    
    return

class Conformer(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  cluster = db.Column(db.Integer)
  conformer_1 = db.Column(db.String(10))
  conformer_2 = db.Column(db.String(10))
  lower_1 = db.Column(db.Integer)
  upper_1 = db.Column(db.Integer)
  lower_2 = db.Column(db.Integer)
  upper_2 = db.Column(db.Integer)
  region = db.Column(db.Integer)
  length_1 = db.Column(db.Integer)
  length_2 = db.Column(db.Integer)
  aligned_length = db.Column(db.Integer)
  rmsd = db.Column(db.Float)
  seq_id = db.Column(db.Float)
  tmscore_1 = db.Column(db.Float)
  tmscore_2 = db.Column(db.Float)
  tmscore_avg = db.Column(db.Float)

  def __repr__(self):
    return '<Conformer {}>'.format(self.id)

  def to_dict(self):
    data = {
      'id': self.id,
      'cluster': self.cluster,
      'conformer_1': self.conformer_1,
      'conformer_2': self.conformer_2,
      'lower_1': self.lower_1,
      'upper_1': self.upper_1,
      'lower_2': self.lower_2,
      'upper_2': self.upper_2,
      'region': self.region,
      'length_1': self.length_1,
      'length_2': self.length_2,
      'aligned_length': self.aligned_length,
      'rmsd': self.rmsd,
      'seq_id': self.seq_id,
      'tmscore_1': self.tmscore_1,
      'tmscore_2': self.tmscore_2,
      'tmscore_avg': self.tmscore_avg
    }
    return data
  
  def to_collection(results, data):
    for i in results:
      data.append(i.to_dict())    
    return

class GenInfoResult(db.Model):
  id = db.Column(db.String(4), primary_key=True)
  pdb_id = db.Column(db.String(10))
  lower = db.Column(db.Integer)
  upper = db.Column(db.Integer)
  name = db.Column(db.String(260))
  title = db.Column(db.String(340))
  organism = db.Column(db.String(115))
  seq_res = db.Column(db.Integer)
  classification = db.Column(db.String(60))

  def __repr__(self):
    return '<GenInfoResult {}>'.format(self.id)

  def to_dict(self):
    data = {
      'id': self.id,
      'pdb_id': self.pdb_id,
      'lower': self.lower,
      'upper': self.upper,
      'name': self.name,
      'title': self.title,
      'organism': self.organism,
      'seq_res': self.seq_res,
      'classification': self.classification
    }
    return data

class StrucInfoResult(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  num_conf = db.Column(db.Integer)
  rmsd_min = db.Column(db.Float)
  rmsd_max = db.Column(db.Float)
  rmsd_avg = db.Column(db.Float)

  def __repr__(self):
    return '<StrucInfoResult {}>'.format(self.id)

  def to_dict(self):
    data = {
      'id': self.id,
      'num_conf': self.num_conf,
      'rmsd_min': self.rmsd_min,
      'rmsd_max': self.rmsd_max,
      'rmsd_avg': self.rmsd_avg
    }
    return data

class ConformerResult(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  id_result = db.Column(db.Integer)
  conformer_1 = db.Column(db.String(10))
  conformer_2 = db.Column(db.String(10))
  lower_1 = db.Column(db.Integer)
  lower_2 = db.Column(db.Integer)
  upper_1 = db.Column(db.Integer)
  upper_2 = db.Column(db.Integer)
  length_1 = db.Column(db.Integer)
  length_2 = db.Column(db.Integer)
  aligned_length = db.Column(db.Integer)
  rmsd = db.Column(db.Float)
  seq_id = db.Column(db.Float)
  tmscore_1 = db.Column(db.Float)
  tmscore_2 = db.Column(db.Float)
  tmscore_avg = db.Column(db.Float)

  def __repr__(self):
    return '<ConformerResult {}>'.format(self.id)

  def to_dict(self):
    data = {
      'id': self.id,
      'id_result': self.id_result,
      'conformer_1': self.conformer_1,
      'conformer_2': self.conformer_2,
      'lower_1': self.lower_1,
      'lower_2': self.lower_2,
      'upper_1': self.upper_1,
      'upper_2': self.upper_2,
      'length_1': self.length_1,
      'length_2': self.length_2,
      'aligned_length': self.aligned_length,
      'rmsd': self.rmsd,
      'seq_id': self.seq_id,
      'tmscore_1': self.tmscore_1,
      'tmscore_2': self.tmscore_2,
      'tmscore_avg': self.tmscore_avg
    }
    return data
  
  def to_collection(results, data):
    for i in results:
      data.append(i.to_dict())    
    return