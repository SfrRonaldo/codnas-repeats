from app import create_app, db
from app.models import GenInfo, StrucInfo, Conformer

app = create_app()

@app.shell_context_processor
def make_shell_context():
  return {
    'db': db, 'GenInfo': GenInfo, ' StrucInfo': StrucInfo, 'Conformer': Conformer
  }