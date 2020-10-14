import {effect, reactive} from './reactivity'

const targetObj = {
  name: 'cuimm',
  age: 20,
  arr: [1, 2, 3],
  obj: {
    gender: 'girl',
  },
}

const state = reactive(targetObj)


// console.log('state', state)
// console.log(state.name)
// state.obj.gender
// state.age = 21

window.state = state

const res = effect(() => {
  console.log('effect 定义响应式', state.name)
})
effect(() => {
  console.log('effect 定义响应式 2', state.name)
})
// console.log('reactiveEffect', res)

console.log('state', state)
