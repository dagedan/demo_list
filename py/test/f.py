import datetime
now_time = datetime.datetime.now()
t = datetime.datetime.strftime(now_time,'%Y-%m-%d %H:%M:%S')
print(t)
f = open('logs.txt', 'a')
f.write(f'{t}  号码已存在！\n');
f.close()