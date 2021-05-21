from flask import Flask, json

'''
    import_name: 寻找工程的主目录
'''
app = Flask(__name__)
app.config.from_pyfile('setting.py')


def create_flask_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.config.from_envvar('PROJECT_SETTING')
    return app


@app.route('/')
def index():
    print(app.config['SECRET_KEY'])
    print(app.config['ABC'])
    return '111'


@app.route('/api_map')
def api_map():
    rules_iterator = app.url_map.iter_rules()
    return json.dumps({rule.endpoint: rule.rule for rule in rules_iterator})
