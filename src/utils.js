export const isFunction = (obj) => (typeof obj === 'function')

export const identity = (obj) => obj

export const promiseRejectIdentity = (err) => Promise.reject(err)
