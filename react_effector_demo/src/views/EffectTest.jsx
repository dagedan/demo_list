import {createEffect, forward, createStore} from 'effector'
import {useList} from 'effector-react'

const getAllId = createEffect({handler: async () => [1, 2, 3]})

const getPostsByIds = createEffect({
  handler: ids => {
    let promises = ids.map(
      async id => {
        console.log(id);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        )
        const posts = await res.json()
        return {id, posts}
      }
    )
    return Promise.all(promises)
  } 
})

forward({
  from: getAllId.done.map(({result}) => {
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    return result
  }),
  to: getPostsByIds,
})

const postGroups = createStore([])
  .on(getPostsByIds.done, (list, {result}) => [
    ...list,
    ...result,
  ])

function EffectTest() {
  return useList(postGroups, ({id, posts}) =>
    posts.map(({title, body}) => (
      <div key={title}>
        {title}
        <br />
        {body}
        <hr />
      </div>
    ))
  )
}
getAllId()
export default EffectTest
