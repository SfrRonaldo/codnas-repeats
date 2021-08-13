import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from flask_mail import Mail
from redis import Redis
import rq
from config import Config


db = SQLAlchemy()
migrate = Migrate()
mail = Mail()


def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)

  db.init_app(app)
  migrate.init_app(app, db)
  mail.init_app(app)
  app.redis = Redis.from_url(app.config['REDIS_URL'])
  app.task_queue = rq.Queue('codnas-repeats-tasks', connection=app.redis, default_timeout=600)

  from app.api import bp as api_bp
  app.register_blueprint(api_bp, url_prefix='/api')

  return app