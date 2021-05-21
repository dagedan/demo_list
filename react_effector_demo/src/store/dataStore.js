
import {createStore, createEffect, createApi} from 'effector'
import {List} from 'immutable'
import * as api from '../api';

// export const getList = createEffect(async (params) => {
//   const req = await api.getlist(params)
//   return req.data.data.rows.fromJS()
// })

const createMapApi = mapStore => {
  return createApi(mapStore, {
    // init: (store, data) => arrayToOrderedMap(data),
    // new: (store, e) => {
    //   const first = OrderedMap([[e.id, fromJS(e.item)]])
    //   return first.merge(store)
    // },
    // newPage: (store, data) => store.merge(arrayToOrderedMap(data)),
    // edit: (store, e) => {
    //   if (!store.has(e.id)) return store
    //   return store.mergeDeepIn([e.id], e.data)
    // },
    // remove: (store, idSet) => {
    //   return store.update(map =>
    //     map.withMutations(map => {
    //       idSet.forEach(id => {
    //         map.delete(id)
    //       })
    //     })
    //   )
    // },
  })
}

export const $dataList = createStore(List([]))

export const dataListApi = createMapApi($dataList)


$dataList.watch(list => {
  console.log(`${list}`)
})
