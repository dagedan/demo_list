import React, {useEffect, useState} from 'react'
// import {createStore, createEvent} from 'effector-logger'
import {createStore, createEvent, createApi} from 'effector'
import {useStore} from 'effector-react'
import {OrderedMap,} from 'immutable';
import {getlist} from '../api'
const initState = OrderedMap()

const resetData = createEvent()
const currentList = createStore(initState)
currentList.watch(res => {
  console.log('====================================');
  console.log('res:', res);
  console.log('====================================');
})

const api = createApi(currentList, {
  setData: (c, p) => c = p
})



const App = () => {
  
  const [pageNum, setpageNum] = useState(0)
  const [total, settotal] = useState(0)
  const [totalPage, settotalPage] = useState(0)
  useEffect(() => {
    fetchListData(pageNum)
  }, [pageNum])

  const fetchListData = async (pageNum) => {
    const res = await getlist({pageNum, pageSize: 10})
    api.setData(res.data.data)
    settotal(res.data.data.total)
    settotalPage(res.data.data.totalPages)
  }

  const {rows} = useStore(currentList)
  return (
    <div>
      {
        rows && rows.map(item => {
          return <h5 key={item.id}>{item.Name}--{item.Address}</h5>
        })
      }
      <br/>
     {
      pageNum > 0 && <button onClick={() => setpageNum(pageNum - 1)}>上一页</button>
     }
     {
       pageNum + 1 < totalPage && <button onClick={() => setpageNum(pageNum + 1)}>下一页</button>
     }
     <h1>当前是第{pageNum + 1}页</h1>
     <h1>总计:{total}条记录</h1>
    </div>
  )
}
export default App