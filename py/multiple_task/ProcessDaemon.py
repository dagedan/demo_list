import multiprocessing
import time


def sub_task():
    while True:
        print('任务执行')
        time.sleep(0.2)


if __name__ == '__main__':
    sub_task_process = multiprocessing.Process(target=sub_task)
    """
        1、把字子进程设置为守护主进程，则：主进程结束前，自动销毁子进程
        2、或者主进程结束前主动调用sub_task_process.terminate() 销毁子进程
    """
    # sub_task_process.daemon = True
    sub_task_process.start()
    time.sleep(0.5)
    sub_task_process.terminate()
    print('主进程结束')
