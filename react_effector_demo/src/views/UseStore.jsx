
import React, {useEffect} from 'react'
import {useStore} from 'effector-react'
import {getList, $dataList} from '../store/dataStore'

export default function App() {
  const dataList = useStore($dataList)
  useEffect(() => {
    getList({pageNum:1, pageSize: 5})
  }, [])
  return (
    
    <div>
      {
        dataList.map(i=>{
          return <p key={i.id}>{i.Address}</p>
        })
      }
    </div>
  )
}
