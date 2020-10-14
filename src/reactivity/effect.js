let uid = 0
let activeEffect
const effectStack = []
const targetMap = new WeakMap()

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect() // 如果不是计算属性 => 立马执行
  }
  return effect
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    try {
      activeEffect = effect
      effectStack.push(effect)
      return fn() // 执行fn => 会触发createGetter方法 => 执行track收集依赖
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }

  effect.id = uid++
  effect.deps = []
  effect.options = options
  return effect
}

/**
 * 依赖收集
 * @param target
 * @param type
 * @param key
 */
export function track(target, type, key) {
  if (activeEffect === undefined) {
    return
  }
  let deepsMap = targetMap.get(target)
  if (!deepsMap) {
    targetMap.set(target, (deepsMap = new Map()))
  }
  let dep = deepsMap.get(key)
  if (!dep) {
    deepsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)   // 将当前的effect加入依赖
    activeEffect.deps.push(dep) // 相互记忆
  }
  console.log('----', deepsMap, key);
}

export function trigger(target, triggerOpType, propKey, newValue, oldValue) {
  console.log('trigger~~~~~', target, triggerOpType, propKey, newValue, oldValue);
  const deepsMap = targetMap.get(target)
  if (!deepsMap) {
    return
  }
  let effects = deepsMap.get(propKey)
  if (effects) {
    effects.forEach(effect => effect())
  }
}










