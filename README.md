```
WeakMap {{…} => Map(1)}
[[Entries]]
0: {Object => Map(1)}
key:
age: 20
arr: (3) [1, 2, 3]
name: "cuimm"
obj: {gender: "girl"}
__proto__: Object
value: Map(1)
[[Entries]]
0: {"name" => Set(2)}
key: "name"
value: Set(2)
[[Entries]]
0: function reactiveEffect() { try { activeEffect = effect; effectStack.push(effect); return fn(); // 执行fn => 会触发createGetter方法 => 执行track收集依赖 } finally { effectStack.pop(); activeEffect = effectStack[effectStack.length - 1]; } }
1: function reactiveEffect() { try { activeEffect = effect; effectStack.push(effect); return fn(); // 执行fn => 会触发createGetter方法 => 执行track收集依赖 } finally { effectStack.pop(); activeEffect = effectStack[effectStack.length - 1]; } }
size: 2
__proto__: Set
size: 1
__proto__: Map
__proto__: WeakMap

WeekMap

目标对象：target

依赖结构：
const targetMap = new WeakMap();


```
