class SweetPotato():
  def __init__(self):
    self.cook_time = 0
    self.cook_status = '生'
    self.condiments = []

  def cook(self, time):
    self.cook_time += time
    if 0 <= self.cook_time < 5:
      self.cook_status = '生'
    elif 5 <= self.cook_time < 8:
      self.cook_status = '熟'
    else:
      self.cook_status = '过'

  def add_condiments(self, condiment):
    self.condiments.append(condiment)

  def __str__(self):
    return f'时长：{self.cook_time} 状态为：{self.cook_status} 调料：{self.condiments}'

a = SweetPotato()
print(a)
a.cook(4)
a.add_condiments('辣椒面')
print(a)
a.cook(5)
a.add_condiments('味精')
print(a)
a.cook(6)
print(a)