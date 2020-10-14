import {isObject} from '../shared/utils'
import {mutableHandler} from './baseHandler'

/**
 * 创建响应式对象
 * @param target 指定对象
 * @returns {*}
 */
export function reactive(target) {
  return createReactiveObject(target, mutableHandler)
}

/**
 * 创建一个响应式的对象，目标对象可能不一定是数组或者对象，可能还有set、map...
 * @param target
 * @param baseHandler
 * @returns {*}
 */
function createReactiveObject(target, baseHandler) {
  // 不是对象直接返回
  if (!isObject(target)) {
    return target
  }
  return new Proxy(target, baseHandler)
}
