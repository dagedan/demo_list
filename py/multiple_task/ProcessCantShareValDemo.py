"""
  进程之间不共享全局变量
  原因： 创建子进程其实是多主进程进行拷贝，子进程其实就是主进程的一个副本
  对于linux、mac主进程执行的代码不会进行拷贝，但是对于window系统来说主进程执行的代码也会进行拷贝
  在windows系统中，执行到创建子进程代码时，拷贝执行代码到进程中，如此就造成形成递归，形成死循环。
"""
import multiprocessing
import time
global_list = list()


def add_data():
    for i in range(3):
        global_list.append(i)
        print('添加数据：', i)
        time.sleep(0.2)
    print('数据添加完成')


def read_data():
    print('全局数据：', global_list)


if __name__ == '__main__':
    add_data_process = multiprocessing.Process(target=add_data);
    read_data_process = multiprocessing.Process(target=read_data);

    add_data_process.start()
    """
      等待add_data_process执行完毕，再往下执行
    """
    add_data_process.join()
    read_data_process.start()