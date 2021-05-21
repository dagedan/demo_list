import multiprocessing


def with_arg(name, age, x, y):
    print(name, age)
    print(x, y)


if __name__ == '__main__':
    process_with_arg = multiprocessing.Process(target=with_arg, args=('张三', 18), kwargs={"x": 11, "y": 22})
    process_with_arg.start();