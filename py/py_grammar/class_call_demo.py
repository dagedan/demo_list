class CallDecorator(object):
	def __init__(self, func):
		self.func = func

	def __call__(self, *args):
		return 'hello' + self.func(args[0]) + 'world'


@CallDecorator
def print_func(param):
	return param


if __name__ == '__main__':

	result = print_func(',')
	print(result)