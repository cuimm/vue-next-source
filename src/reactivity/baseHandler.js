import {hasChanged, hasOwnProperty, isObject} from '../shared/utils'
import {reactive} from './reactive'
import {track, trigger} from './effect'
import {TrackOpTypes, TriggerOpTypes} from './operation'

function createGetter() {
  return function get(target, propKey, receiver) {
    console.log('---取值Getter---', target, propKey)
    const propValue = Reflect.get(target, propKey)

    // 收集依赖
    track(target, TrackOpTypes.GET, propKey)

    if (isObject(propValue)) {
      return reactive(propValue)
    }
    return propValue
  }
}

function createSetter() {
  return function set(target, propKey, value, receiver) {
    console.log('~~~赋值Setter~~~', target, propKey, value)
    const oldValue = target[propKey]
    const hadKey = hasOwnProperty(target, propKey)
    const result = Reflect.set(target, propKey, value, receiver)

    if (!hadKey) {
      console.log('属性新增');
      trigger(target, TriggerOpTypes.ADD, propKey, value)
    } else if (hasChanged(value, oldValue)) {
      console.log('属性修改');
      trigger(target, TriggerOpTypes.SET, propKey, value, oldValue)
    }

    return result
  }
}

const get = createGetter()
const set = createSetter()

/**
 * 拦截普通对象和数组的处理。除了拦截get和set处理之外，可能还要拦截其他操作 deleteProperty...
 */
export const mutableHandler = {
  get,
  set,
}
