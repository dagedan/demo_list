class Room():
  def __init__(self):
    self.area = 1000
    self.furnishing_list = []

  def add_furnishing(self, furnishing):
    if self.area > furnishing.needArea:
      self.furnishing_list.append(furnishing)
      self.area -= furnishing.needArea
    else:
      print('剩余面积不足')

  def __str__(self):
    return f'当前剩余面积{self.area},当前所有家具：{list(map(lambda x: str(x.needArea) + x.name, self.furnishing_list))}'


class Furnishing():
  def __init__(self, needArea, name):
    self.needArea = needArea
    self.name = name
furnishing1 = Furnishing(10, '家具1')
furnishing2 = Furnishing(1000, '家具1')
furnishing3 = Furnishing(10000, '家具1')
r = Room()
r.add_furnishing(furnishing1)
print(r)
r.add_furnishing(furnishing2)
