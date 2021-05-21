import pymongo
import requests
import datetime

from bson import ObjectId
from flask import Flask, json, request
from bson.json_util import dumps
from flask_apscheduler import APScheduler
from flask import g

app = Flask(__name__)


class MyEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, ObjectId):
      return str(obj)
    return super(MyEncoder, self).default(obj)


class Config:
  """App configuration."""
  JOBS = [
    {
      "id": "job1",
      "func": "job1",
      "trigger": 'interval',
      "minutes": 1
    }
  ]
  SCHEDULER_EXECUTORS = {"default": {"type": "threadpool", "max_workers": 20}}
  SCHEDULER_JOB_DEFAULTS = {"coalesce": False, "max_instances": 3}
  SCHEDULER_API_ENABLED = True


def get_count():
    count = getattr(g, '_count', None)
    if count is None:
        g._count = 1  # to store messages you may use a dictionary
    else:
        g._count = g._count + 1
    return g._count


def update_new_data():
    print(get_count())
    queryUrl = 'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry'
    queryParams = {'gameNo': 85, 'provinceId': 0, 'pageSize': 100, 'isVerify': 1, 'pageNo': get_count()}
    res = requests.get(queryUrl, queryParams)
    if len(res.json()['value']['list']) == 0:
        return
    currentLotteryData = res.json()['value']['list'][0]
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.histroy_data
    if mongo_collection.find_one({'lotteryDrawNum': currentLotteryData['lotteryDrawNum']}) is None:
        mongo_collection.insert_one(currentLotteryData)
        print('更新成功')
    else:
        now_time = datetime.datetime.now()
        t = datetime.datetime.strftime(now_time, '%Y-%m-%d %H:%M:%S')
        f = open('logs.txt', 'a')
        f.write(f'{t}  号码已存在！\n');
        f.close()
        print('号码已存在')
    mongo_client.close()


@app.route('/get_history_data_by_page', methods=["GET"])
def get_history_data_by_page():
    pageNo = int(request.args['pageNo']) or 1
    pageSize = int(request.args['pageSize']) or 20
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.histroy_data
    # result = mongo_collection.find().limit(pageSize).skip(pageSize * (pageNo-1)).sort({'lotteryDrawNum':1})
    result = mongo_collection.find().limit(pageSize).skip(pageSize * (pageNo - 1)).sort(
      [("lotteryDrawNum", pymongo.DESCENDING)])
    count = mongo_collection.find().count()
    totalPage = count // pageSize if count % pageSize == 0 else (count // pageSize) + 1
    JsonResult = {'data': list(result), 'total': count, 'pageNo': pageNo, 'pageSize': pageSize, 'totalPage': totalPage}
    mongo_client.close()
    return dumps(JsonResult, cls=MyEncoder)


@app.route('/my_num', methods=["GET"])
def my_num():
    userID = request.args['userID']
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.userNum
    result = mongo_collection.aggregate(
      [
        {
          "$lookup": {
            "from": "histroy_data",
            "localField": "drawNum",
            "foreignField": "lotteryDrawNum",
            "as": "extra"
          }
        },
        {
          "$project": {
            "_id": 1.0,
            "drawNum": 1.0,
            "mycode": 1.0,
            "userID": 1.0,
            "lotteryDrawResult": "$extra.lotteryDrawResult",
            "lotteryDrawTime": "$extra.lotteryDrawTime"
          }
        },
        {
          "$sort": {
            "drawNum": -1.0
          }
        }
      ]
    );
    mongo_client.close()
    return dumps(result, cls=MyEncoder)


@app.route('/my_data', methods=["GET"])
def my_data():
    userID = request.args['userID']
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.userNum
    result = mongo_collection.aggregate()
    mongo_client.close()
    return dumps(result, cls=MyEncoder)


@app.route('/get_num_by_period', methods=["GET"])
def get_num_by_period():
    period = request.args['period']
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.histroy_data
    result = mongo_collection.find({'lotteryDrawNum': period})
    mongo_client.close()
    return dumps(result, cls=MyEncoder)


@app.route('/add_num', methods=["POST"])
def add_num():
    data = request.get_json()
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.userNum
    result = mongo_collection.update_one({'drawNum': data['drawNum'],
                                          'userID': '6095d31ed62bd25a4b516e2b'},
                                         {"$push": {'mycode': data['mycode']}}, True);
    JsonResult = {'data': result.acknowledged}
    mongo_client.close()
    return JsonResult


@app.route('/login', methods=["POST"])
def login():
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.user
    result = mongo_collection.find_one(request.get_json(), {'_id': 1, 'usr': 1});
    JsonResult = {'data': result}
    mongo_client.close()
    return dumps(JsonResult, cls=MyEncoder)


def job1():
    update_new_data()
    now_time = datetime.datetime.now()
    t = datetime.datetime.strftime(now_time, '%Y-%m-%d %H:%M:%S')
    f = open('logs.txt', 'a')
    f.write(f'{t}  更新成功！\n');
    f.close()


if __name__ == '__main__':
    app.json_encoder = MyEncoder
    app.config.from_object(Config())
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()
    app.run()
