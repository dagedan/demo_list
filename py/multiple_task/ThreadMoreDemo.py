import threading
import time


def task(i):
	time.sleep(1)
	print('线程无序测试：' + str(i) + '\n')
	print(threading.current_thread())


if __name__ == "__main__":
	for i in range(10):
		sub_thread = threading.Thread(target=task, args=(i,))
		sub_thread.start()