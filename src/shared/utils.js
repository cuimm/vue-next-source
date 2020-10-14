/**
 * 判断是否是对象
 * @param target
 * @returns {boolean}
 */
export const isObject = target => target !== null && typeof target === 'object';

/**
 * 判断是否是自身（非继承）属性
 * @param target
 * @param key
 * @returns {boolean}
 */
export const hasOwnProperty = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

/**
 * 判断值是否变化
 * @param value
 * @param oldValue
 * @returns {boolean}
 */
export const hasChanged = (value, oldValue) => value !== oldValue
