import Interceptor from '../interceptor'

const noop = () => {}
const mockCallBack = jest.fn()

let interceptor = null

beforeEach(() => {
  interceptor = new Interceptor()
})

describe('constructor', () => {
  test('the initial length of handlers is zero', () => {
    expect(interceptor.handlers.length).toBe(0)
  })
})

describe('use', () => {
  test('invoked twice with parameters, then the length of handlers is four', () => {
    interceptor.use(noop)
    interceptor.use(noop, noop)

    expect(interceptor.handlers.length).toBe(4)
  })

  test('doesn\'t pass parameters, then the length of handlers is zero', () => {
    interceptor.use()

    expect(interceptor.handlers.length).toBe(0)
  })
})

describe('remove', () => {
  test('specified handler, then the value of the handler is undefined', () => {
    interceptor.use(noop)
    interceptor.remove(noop)

    expect(interceptor.handlers[0]).toBeUndefined()
  })

  test('unrecognizable handler, then the value of the handler is original', () => {
    interceptor.use(noop)
    interceptor.remove(() => {})

    expect(interceptor.handlers[0]).toBe(noop)
  })
})

describe('forEach', () => {
  test('handlers to callback', () => {
    interceptor.use(noop)
    interceptor.use(noop, noop)
    interceptor.forEach(mockCallBack)

    expect(mockCallBack.mock.calls.length).toBe(2)
  })
})
