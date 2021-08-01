from app import db

class GenInfo(db.Model):
  pdb_id = db.Column(db.String(4), primary_key=True)
  cluster = db.Column(db.Integer)
  name = db.Column(db.String(260))
  title = db.Column(db.String(340))
  organism = db.Column(db.String(115))
  seqres = db.Column(db.Integer)
  classification = db.Column(db.String(60))
  num_regions = db.Column(db.Integer)

  def __repr__(self):
    return '<GenInfo {}>'.format(self.pdb_id)

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