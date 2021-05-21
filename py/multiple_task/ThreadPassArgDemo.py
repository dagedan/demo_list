import threading
import time

def show_info(arg1,arg2,arg3, name, age):
	while True:
		print(str(arg1) + str(arg2) + str(arg3), name + str(age))
		time.sleep(0.5)

if __name__ == '__main__':
	sub_thread = threading.Thread(target=show_info, args=(1,2,3), kwargs={"name": "zhangsan", "age": 19})
	sub_thread.start()