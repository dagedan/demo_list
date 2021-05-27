# 浅拷贝
import copy


if __name__ == '__main__':
	# a = 1
	# b = copy.copy(a)
	# print(f'a的内存地址{id(a)}, b的内存地址{id(b)}')

	# a = 'aslhdkjah的金风科技'
	# b = copy.copy(a)
	# print(f'a的内存地址{id(a)}, b的内存地址{id(b)}')

	# a = True
	# b = copy.copy(a)
	# print(f'a的内存地址{id(a)}, b的内存地址{id(b)}')

	# a = (1, 2, 'sdkfhskhjsdf', ['xxx', '3333', '3423'])
	# b = copy.copy(a)
	# print(f'a的内存地址{id(a)}, b的内存地址{id(b)}')

	# a = [1, 2, ['22', 'xxxxx']]
	# b = copy.copy(a)
	# b[2].append('yyyyy')
	# # 只拷贝了第一层，深层的对象还是共享的原来的引用
	# # print(f'a的内存地址{id(a)}, b的内存地址{id(b)}')
	# print(a, b)

	# deepcopy  只要包含可变对象，均会完全拷贝
	# tuple1 = (1,2,3,4)
	# tuple2 = copy.deepcopy(tuple1)
	# print(f'tuple1内存地址：{id(tuple1)},tuple2内存地址：{id(tuple2)}')

	tuple1 = (1, 2, 3, ['x', 'v'])
	tuple2 = copy.deepcopy(tuple1)
	print(f'tuple1内存地址：{id(tuple1)},tuple2内存地址：{id(tuple2)}')


