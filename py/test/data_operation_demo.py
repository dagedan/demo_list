sb = 'sbsb'
list = [1, 2, 3, 4]
tuple = (1, 2, 3, 4)
set = {1, 2, 3, 5}
dict = {'name': 'sb', 'age': 18}


def print_hi():
  i = 1
  result = 0
  while i <= 100:
    # print(f'这是第{i}次了', end='')
    print(f'这是第{i}次了')
    result += i
    i += 1
  print(f'结果是{result}')
  print(type(list))
  print(type(tuple))
  print(type(set))
  print(type(dict))


def mul_table():
  i = 1
  while i <= 9:
    j = 1
    while j <= i:
      print(f'{j}*{i}={i * j}  ', end='')
      j += 1
    print('')
    i += 1
  else:
    print('我擦')


def mul_for_table():
  for i in range(1,10):
    for j in range(1, i+1):
      print(f'{j}*{i} = {i*j}  ', end='')
    print()

def list_demo ():
  list = ['zhang', 'li']
  list.extend(['wang', 'zhou'])
  list.insert(2, 'chen')
  print(list.index('chen'))
  print(list.count('chen'))
  print(len(list))

def tuple_demo():
  tuple1 = (1,2,3,4,5)
  print(type(tuple1))
  print(tuple1[1])

def set_demo():
  set1 = {10,20,30}
  print(set1)
  '''
    这样创建的是一个字典，非集合， 正确写法：set2 = set()
  '''
  set2 = {}
  print(type(set2)) # type is dict

def dict_demo ():
  dict1 = {'name':1, 'age': 100, 'gender': 'male'}
  print(type(dict1))
  dict1['isSB'] = 'yes'
  print(dict1)
  for i in dict1.keys():
    print(i)
  for i in dict1.values():
    print(i)
  for key, value in dict1.items():
    print(f'{key}:{value}')

if __name__ == '__main__':
  # print_hi()
  # mul_table()
  # mul_for_table()
  # tuple_demo()
  # list_demo()
  # dict_demo()
  set_demo()