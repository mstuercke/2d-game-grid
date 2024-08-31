/**
 * A cache to reuse proxies for objects instead of always creating a new one
 */
const proxyCache = new WeakMap()

/**
 * Creates a proxy for an object and all of its properties (recursively)
 * @param target The object that should be proxied
 * @param onChange Will be called, whenever a property of `target` changes (recursively)
 */
export const createDeepOnChangeProxy = <T extends object>(target: T, onChange: () => void): T => {
  const getOrCreateProxy = (item: object) => {
    if (proxyCache.has(item)) return proxyCache.get(item)

    const proxy = createDeepOnChangeProxy(item, onChange)
    proxyCache.set(item, proxy)
    return proxy
  }

  return new Proxy(target, {
    get(target, property) {
      const item = Reflect.get(target, property)
      return item && typeof item === 'object' ? getOrCreateProxy(item) : item
    },

    set(target, property, newValue) {
      const result = Reflect.set(target, property, newValue)
      onChange()
      return result
    },

    deleteProperty(target, property): boolean {
      const result = Reflect.deleteProperty(target, property)
      onChange()
      return result
    },
  })
}
