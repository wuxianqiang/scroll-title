let obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2
  }
}
console.log()
console.log
function reactive(target) {
  return createReactiveObject(target)
}

// 1. 判断对象
function isObject(value) {
  return typeof value === 'object' && value !== null
}

function hasOwn (target, key) {
  return target.hasOwnProperty(key)
}

let toProxy = new WeakMap(); // 弱引用映射表， 源对象：代理过的对象
let toRaw = new WeakMap(); // 代理过的对象：源对象

// 创建响应式的对象
function createReactiveObject(target) { 
  if (!isObject(target)) {
    return target
  }
  let proxy = toProxy.get(target) // 是不是已经代理过了
  if (proxy) {
    return proxy
  }
  if (toRaw.has(target)) {
    // 通过代理的对象再次代理，直接返回
    return target
  }
  // 拦截哪些属性
  let baseHandler = {
    // receiver当前的代理对象，observed，代理后的对象
    get(target, key, receiver) {
      // 一般会和新的API使用
      let result = Reflect.get(target, key, receiver)
      // 如果是对象，重新代理一下这个对象
      return isObject(result) ? reactive(result) : result // 取值的时候会递归
    },
    set(target, key, value, receiver) {
      // 数组设置，元素改变，length也发生改变，要区别改属性还是新增，有key是改，没key是曾
      let flag = Reflect.set(target, key, value, receiver)
      return flag
    }
  }
  // 如果已经代理了，就不要再new了
  let observed = new Proxy(target, baseHandler) // es6创建代理对象
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}