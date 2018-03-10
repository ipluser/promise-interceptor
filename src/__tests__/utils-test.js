import {
  isFunction,
  identity,
  promiseRejectIdentity
} from '../utils'

class Clazz {}

const func = () => {}
const emptyObject = {}
const emptyArray = []

describe('isFunction', () => {
  test('equals to true', () => {
    expect(isFunction(Clazz)).toBeTruthy()
    expect(isFunction(func)).toBeTruthy()
  })

  test('equals to false', () => {
    expect(isFunction(undefined)).toBeFalsy()
    expect(isFunction(null)).toBeFalsy()
    expect(isFunction(524)).toBeFalsy()
    expect(isFunction('524')).toBeFalsy()
    expect(isFunction(true)).toBeFalsy()
    expect(isFunction(emptyObject)).toBeFalsy()
    expect(isFunction(emptyArray)).toBeFalsy()
  })
})

describe('identity', () => {
  test('equals to itself', () => {
    expect(identity(Clazz)).toBe(Clazz)
    expect(identity(func)).toBe(func)
    expect(identity(undefined)).toBe(undefined)
    expect(identity(null)).toBe(null)
    expect(identity(524)).toBe(524)
    expect(identity('524')).toBe('524')
    expect(identity(true)).toBe(true)
    expect(identity(emptyObject)).toBe(emptyObject)
    expect(identity(emptyArray)).toBe(emptyArray)
  })
})

describe('promiseRejectIdentity', () => {
  test('wrap object to Promise.Reject ', () => {
    return promiseRejectIdentity('something wrong').catch((err) => expect(err).toBe('something wrong'))
  })
})
