import pymongo
import requests
import schedule
import time

def updateAllData():
  pageNo = 1
  dataLenth = 1
  while dataLenth > 0:
    url = "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry"
    datas = {'gameNo': 85, 'provinceId': 0, 'pageSize': 50, 'isVerify': 1, 'pageNo': pageNo}
    res = requests.get(url, datas)
    if len(res.json()['value']['list']) == 0:
      break
    mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('admin', 'iflve.com')
    mongo_db = mongo_client.daletou
    mongo_collection = mongo_db.histroy_data
    print(mongo_collection)
    mongo_collection.insert_many(res.json()['value']['list'])
    pageNo += 1
    dataLenth = len(res.json()['value']['list'])


def updateNewData():
  url = "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry"
  datas = {'gameNo': 85, 'provinceId': 0, 'pageSize': 1, 'isVerify': 1, 'pageNo': 1}
  res = requests.get(url, datas)
  if len(res.json()['value']['list']) == 0:
    return
  currentLotteryData = res.json()['value']['list'][0]
  mongo_client = pymongo.MongoClient('47.98.118.82', 27017)
  mongo_auth = mongo_client.admin
  mongo_auth.authenticate('admin', 'iflve.com')
  mongo_db = mongo_client.daletou
  mongo_collection = mongo_db.histroy_data
  if mongo_collection.find_one({'lotteryDrawNum': currentLotteryData['lotteryDrawNum']}) == None:
    mongo_collection.insert_one(currentLotteryData)
  else:
    print('本期开奖结果已存在')

# schedule.every(1).minutes.do(updateNewData)
schedule.every().day.at("22:30").do(updateNewData)
a = 1
while True:
  schedule.run_pending()
  a += 1
  print(f'当前已正常执行了{a}次!!!')
  time.sleep(2)