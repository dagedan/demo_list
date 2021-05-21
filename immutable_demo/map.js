const {Map} = require('immutable')

const a = {x: 1, y: 2}
const obj = a
console.log(a === obj)


obj.x = '12312312'
console.log(a.x)
let c = Map({
  name: 'zhangsan'
})

let d = c.set('age', 18)
console.log(c.toJSON());
console.log(d.toJSON());