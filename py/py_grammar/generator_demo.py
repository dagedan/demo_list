# 方法1：
# 使用列表推导式
generator1 = (i ** 2 for i in range(10))
list1 = [i ** 2 for i in range(10)]
# 方法2：
# 使用生成器函数 yield， 例子：使用生成器函数生成斐波拉切数列


def fibonacci_sequence(count):
	a = 0
	b = 1
	result = 0
	current_index = 0
	while current_index <= count:
		result = a
		a,b = b, a+ b
		current_index += 1
		yield result


if __name__ == '__main__':
	# for i in generator1:
	# 	print(i)
	#
	# for i in list1:
	# 	print(i)

	fb_list = fibonacci_sequence(10)
	for i in fb_list:
		print(i)
