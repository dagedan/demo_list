import {createStore, combine, createApi, createEffect, createGate, forward} from 'effector'
import {useStore, useGate} from 'effector-react'
const myVerySideEffectFx = createEffect()
myVerySideEffectFx.use(async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000)
  });
  await promise;
})
const SampleCompGate = createGate() // no need in useEffect wow!

forward({
  from: SampleCompGate.open, //as a bonus you can call multiple effects in array like to: [fx1, fx2]
  to: myVerySideEffectFx
})
myVerySideEffectFx.done.watch(() => console.log(' iam done'))

const Loading = () => (
<div>I am loading huh?</div>
)
const ProfileForm = () => (
  <form>
    <input type='text' placeholder='my little input' />
    <input type='submit' />
  </form>
)
const SampleComp = () => {
  useGate(SampleCompGate) // instead of use Effect
  const loading = useStore(myVerySideEffectFx.pending)
	console.log(loading)
  return loading
    ? <Loading />
    : <ProfileForm />
}
export default SampleComp
