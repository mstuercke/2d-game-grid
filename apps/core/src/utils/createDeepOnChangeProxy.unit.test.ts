import {createDeepOnChangeProxy} from './createDeepOnChangeProxy.js'

type Root = {
  foo?: string
  innerObject?: {
    bar?: string
  }
  innerArray?: {baz?: string}[]
}

describe(createDeepOnChangeProxy.name, () => {
  const counter = vi.fn()

  describe('should call onChange for adding properties', () => {
    it('for root', async () => {
      const root = createDeepOnChangeProxy<Root>({}, counter)

      root.foo = 'foo'
      expect(counter).toHaveBeenCalledTimes(1)

      expect(root).toEqual({
        foo: 'foo',
      })
    })

    it('for innerObject', async () => {
      const root = createDeepOnChangeProxy<Root>({}, counter)

      root.innerObject = {}
      expect(counter).toHaveBeenCalledTimes(1)

      root.innerObject.bar = 'bar'
      expect(counter).toHaveBeenCalledTimes(2)

      expect(root).toEqual({
        innerObject: {bar: 'bar'},
      })
    })

    it('for innerArray', async () => {
      const root = createDeepOnChangeProxy<Root>({}, counter)

      root.innerArray = [{}]
      expect(counter).toHaveBeenCalledTimes(1)

      root.innerArray[0].baz = 'baz'
      expect(counter).toHaveBeenCalledTimes(2)

      expect(root).toEqual({
        innerArray: [{baz: 'baz'}],
      })
    })
  })

  describe('should call onChange for modifying properties', () => {
    it('for root', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          foo: 'foo',
        },
        counter,
      )

      root.foo = 'foo-updated'
      expect(counter).toHaveBeenCalledTimes(1)

      expect(root).toEqual({
        foo: 'foo-updated',
      })
    })

    it('for innerObject', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          innerObject: {bar: 'bar'},
        },
        counter,
      )

      if (!root.innerObject) throw 'innerObject not defined'
      root.innerObject.bar = 'bar-updated-1'
      expect(counter).toHaveBeenCalledTimes(1)

      root.innerObject = {bar: 'bar-updated-2'}
      expect(counter).toHaveBeenCalledTimes(2)

      root.innerObject.bar = 'bar-updated-3'
      expect(counter).toHaveBeenCalledTimes(3)

      root.innerObject.bar = undefined
      expect(counter).toHaveBeenCalledTimes(4)

      expect(root).toEqual({
        innerObject: {bar: undefined},
      })
    })

    it('for innerArray', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          innerArray: [{baz: 'baz'}],
        },
        counter,
      )

      if (!root.innerArray) throw 'innerArray not defined'
      root.innerArray[0].baz = 'baz-updated-1'
      expect(counter).toHaveBeenCalledTimes(1)

      root.innerArray = [{baz: 'baz-updated-2'}]
      expect(counter).toHaveBeenCalledTimes(2)

      root.innerArray[0].baz = 'bar-updated-3'
      expect(counter).toHaveBeenCalledTimes(3)

      root.innerArray[0].baz = undefined
      expect(counter).toHaveBeenCalledTimes(4)

      expect(root).toEqual({
        innerArray: [{baz: undefined}],
      })
    })
  })

  describe('should call onChange for deleting properties', () => {
    it('for root', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          foo: 'foo',
        },
        counter,
      )

      delete root.foo
      expect(counter).toHaveBeenCalledTimes(1)

      expect(root).toEqual({})
    })

    it('for innerObject', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          innerObject: {bar: 'bar'},
        },
        counter,
      )

      delete root.innerObject?.bar
      expect(counter).toHaveBeenCalledTimes(1)

      delete root.innerObject
      expect(counter).toHaveBeenCalledTimes(2)

      expect(root).toEqual({})
    })

    it('for innerArray', async () => {
      const root = createDeepOnChangeProxy<Root>(
        {
          innerArray: [{baz: 'baz'}],
        },
        counter,
      )

      delete root.innerArray?.[0].baz
      expect(counter).toHaveBeenCalledTimes(1)

      delete root.innerArray
      expect(counter).toHaveBeenCalledTimes(2)

      expect(root).toEqual({})
    })
  })

  describe('should not call onChange for modifying detached innerObject objects', () => {
    it('for innerObject', async () => {
      const innerObject = {bar: 'bar'}
      const root = createDeepOnChangeProxy<Root>({foo: 'foo', innerObject} as any, counter)

      delete root.innerObject
      expect(counter).toHaveBeenCalledTimes(1)

      innerObject.bar = 'bar-updated'
      expect(counter).toHaveBeenCalledTimes(1)

      expect(root).toEqual({foo: 'foo'})
    })

    it('for innerArray', async () => {
      const innerArray = [{baz: 'baz'}]
      const root = createDeepOnChangeProxy<Root>({foo: 'foo', innerArray} as any, counter)

      delete root.innerArray
      expect(counter).toHaveBeenCalledTimes(1)

      innerArray[0].baz = 'baz-updated'
      expect(counter).toHaveBeenCalledTimes(1)

      expect(root).toEqual({foo: 'foo'})
    })
  })
})
