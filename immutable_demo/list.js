const {
  List
} = require('immutable')
const list1 = List([1, 2, 3, 4, 5])
console.log(List.isList(list1));


const list2 = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
console.log(list2.size);

const list3 = list2.set(0, '我勒个去')
console.log(list3.get(0));

const list4 = list3.delete(2)

console.log(list4);

const list5 = list4.update(3, x => x + 300)

console.log(list5.toJSON());

const keys = list5.keys()
for (key of keys) {
  console.log(key)
}

const values = list5.values()
for (value of values) {
  console.log(value)
}

const entries = list5.entries()
for (entry of entries) {
  console.log(entry)
}

list6 = List([{
  name: 'aaaaa',
  gender: '男'
}, {
  name: 'bbbb',
  gender: '男'
}, {
  name: 'ccccc',
  gender: '男'
}, {
  name: 'ddddd',
  gender: '男'
}, {
  name: 'eee',
  gender: '女'
},])

const list7 = list6.groupBy(i => {
  return i.gender
})
console.log('====================================');
console.log(list7.toJSON());
console.log('====================================');