import connect from '../connect'
import Interceptor from '../interceptor'

let interceptor = null

beforeEach(() => {
  interceptor = new Interceptor()
  interceptor.use((res) => res + 1)
  interceptor.use((res) => Promise.resolve(res + 1), (err) => Promise.reject(err + 2))
  interceptor.use(undefined, (err) => Promise.reject(err + 2))
})

describe('connect', () => {
  test('interceptor to a function that return Promise.resolve', () => {
    const wrappedFunction = connect(interceptor)(() => Promise.resolve(0))

    return wrappedFunction().then((res) => expect(res).toBe(2))
  })

  test('interceptor to a function that return Promise.reject', () => {
    const wrappedFunction = connect(interceptor)(() => Promise.reject(0))

    return wrappedFunction().catch((err) => expect(err).toBe(4))
  })
})
