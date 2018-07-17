import ExpireMap from '../src'

const delay = (t: number):Promise<void> => new Promise(resolve => setTimeout(resolve, t))

test('normal expire map should work well', async () => {
  const em = new ExpireMap(5000)
  const mp = new Map()

  const key = 'test_key'
  const value = 'test_value'
  const expire = 1000

  em.setExpire(key, value, expire)
  mp.set(key, value)

  expect(em.get(key)).toBe(value)
  expect(em.has(key)).toBeTruthy()
  expect(em.get('invalid key')).toBeUndefined()
  expect(em.size).toBe(1)
  expect(em.getAll()).toEqual(mp)

  await delay(expire)

  expect(em.get(key)).toBe(undefined)
  expect(em.getAll().size).toBe(0)
  expect(em.has(key)).toBeFalsy()
  expect(em.size).toBe(0)
})

test('normal expiredIn map should work well', async () => {
  const em = new ExpireMap(5000)
  const mp = new Map()

  const key = 'test_key'
  const value = 'test_value'
  const expire = 1000

  const expireIn = new Date(Date.now() + expire)

  em.setExpiredIn(key, value, expireIn)
  mp.set(key, value)

  expect(em.get(key)).toBe(value)
  expect(em.has(key)).toBeTruthy()
  expect(em.size).toBe(1)
  expect(em.getAll()).toEqual(mp)

  await delay(expire)

  expect(em.get(key)).toBe(undefined)
  expect(em.getAll().size).toBe(0)
  expect(em.has(key)).toBeFalsy()
  expect(em.size).toBe(0)
})

test('update should work well', () => {
  const em = new ExpireMap(5000)
  const mp = new Map()

  const key = 'test_key'
  const value = 'test_value'
  const value2 = 'test_value_2'
  const expire = 1000

  em.setExpire(key, value, expire)
  expect(em.get(key)).toBe(value)
  em.update(key, value2)
  expect(em.get(key)).toBe(value2)
  expect(em.update('invald key', 'value')).toBeFalsy()
})

test('clear should work well', () => {
  const em = new ExpireMap(5000)
  const mp = new Map()

  const key = 'test_key'
  const value = 'test_value'
  const key2 = 'test_key_2'
  const value2 = 'test_value_2'
  const expire = 1000

  em.setExpire(key, value, expire)
  em.setExpire(key2, value2, expire)
  expect(em.get(key)).toBe(value)
  expect(em.get(key2)).toBe(value2)
  em.clear()
  expect(em.size).toBe(0)
})

test('delete should work well', () => {
  const em = new ExpireMap(5000)
  const mp = new Map()

  const key = 'test_key'
  const value = 'test_value'
  const expire = 1000

  em.setExpire(key, value, expire)
  expect(em.get(key)).toBe(value)
  expect(em.delete(key)).toBeTruthy()
  expect(em.has(key)).toBeFalsy()
})
