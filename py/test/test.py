a = []
i = 1
while (i <= 10):
  a.append(i)
  i += 1
print(a)

b = []
j = 1
for j in range(0, 10):
  b.append(j + 1)
print(b)

list1 = [i for i in range(10) if i % 2 == 1]
print(list1)
