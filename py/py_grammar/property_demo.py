class PropertyDemo1(object):
	def __init__(self):
		self.__age = 0

	@property
	def age(self):
		return self.__age

	@age.setter
	def age(self, age):
		self.__age = age

class PropertyDemo2(object):
	def __init__(self):
		self.__age = 0

	def set_age(self, new_age):
		self.__age = new_age

	def get_age(self):
		return self.__age

	age = property(get_age, set_age)


if __name__ == '__main__':
	a = PropertyDemo2()
	a.age = 10
	print(a.age)