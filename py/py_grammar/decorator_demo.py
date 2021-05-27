class PDecorator(object):
	pass


def div_decorator(func):
	def inner(param):
		return '<div>' + func(param) + '</div>'
	return inner


@div_decorator
def test_func(param):
	return param


if __name__ == '__main__':
	res = test_func('1111')
	print(res)