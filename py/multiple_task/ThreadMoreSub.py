import threading
import time


def sub_task():
	while True:
		time.sleep(0.2)
		print("线程执行中 ")


if __name__ == "__main__":
	sub_thread = threading.Thread(target=sub_task)
	"""
	1、守护主线程sub_thread.daemon = True
	"""
	# sub_thread.daemon = True
	sub_thread.start()
	time.sleep(1)
	print('over')