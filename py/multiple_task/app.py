"""
1、多任务
概念：同一时间被执行多个任务

执行方式
并发：在一段时间内交替的去执行任务（单核cpu交替分配一小段时间）
并行：多核cpu下可以实现并行（任务数大于cpu核数并发执行，任务数小于cpu核数小于并行执行）

进程和线程
进程：正在运行的程序或软件，负责向操作系统索要资源
线程：包含在进程中，负责执行代码的

"""
import multiprocessing
import os
import time


def song():
    print(f"song的进程id：{os.getpid()},他的父进程id是：{os.getppid()}")
    for i in range(3):
        print('song')
        time.sleep(0.2)
        # 根据进程id 强杀进程
        os.kill(os.getpid(), 9)


def dance():
    print(f"dance进程的id：{os.getpid()},他的父进程id是：{os.getppid()}")
    for i in range(3):
        print('dance')
        time.sleep(0.2)


if __name__ == '__main__':
    pid = os.getpid()
    print("主进程id：", pid)
    song_process = multiprocessing.Process(target=song);
    dance_process = multiprocessing.Process(target=dance);
    song_process.start()
    dance_process.start()
