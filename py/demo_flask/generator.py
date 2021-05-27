
def my_generator(num):
	a = 0
	b = 1
	current_index = 0
	result = 0
	while current_index <= num:
		result = a
		a, b = b, a + b
		current_index += 1
		yield result


if __name__ == '__main__':
	# val = (i ** 2 for i in range(5))
	# for i in val:
	# 	print(i)

	value = my_generator(100)
	for i in value:
		print(i)