import execute from '../execute'
import Interceptor from '../interceptor'

let interceptor = null

beforeEach(() => {
  interceptor = new Interceptor()
  interceptor.use((res) => res + 1)
  interceptor.use((res) => Promise.resolve(res + 1), (err) => Promise.reject(err + 2))
  interceptor.use(undefined, (err) => Promise.reject(err + 2))
})

describe('execute', () => {
  test('Promise.resolve with interceptor', () => {
    return execute(Promise.resolve(0), interceptor).then((res) => expect(res).toBe(2))
  })

  test('Promise.reject with interceptor', () => {
    return execute(Promise.reject(0), interceptor).catch((err) => expect(err).toBe(4))
  })
})
