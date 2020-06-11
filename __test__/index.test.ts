import ExpireMap from '../src';

const delay = (t: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, t));

test('normal expire map should work well', async () => {
  const em = new ExpireMap(5000);
  const mp = new Map();

  const key = 'test_key';
  const value = 'test_value';
  const expire = 1000;

  em.set(key, value, expire);
  mp.set(key, value);

  expect(em.get(key)).toBe(value);
  expect(em.has(key)).toBeTruthy();
  expect(em.get('invalid key')).toBeUndefined();
  expect(em.size).toBe(1);
  expect(em.getAll()).toEqual(mp);

  await delay(expire);

  expect(em.get(key)).toBe(undefined);
  expect(em.getAll().size).toBe(0);
  expect(em.has(key)).toBeFalsy();
  expect(em.size).toBe(0);
});

test('clear should work well', () => {
  const em = new ExpireMap(5000);
  const mp = new Map();

  const key = 'test_key';
  const value = 'test_value';
  const key2 = 'test_key_2';
  const value2 = 'test_value_2';
  const expire = 1000;

  em.set(key, value, expire);
  em.set(key2, value2, expire);
  expect(em.get(key)).toBe(value);
  expect(em.get(key2)).toBe(value2);
  em.clear();
  expect(em.size).toBe(0);
});

test('delete should work well', () => {
  const em = new ExpireMap(0);
  const mp = new Map();

  const key = 'test_key';
  const value = 'test_value';
  const expire = 1000;

  em.set(key, value, expire);
  expect(em.get(key)).toBe(value);
  em.delete(key);
  expect(em.has(key)).toBeFalsy();
});

test('gc should work well', async () => {
  const em = new ExpireMap(500);
  Array(100)
    .fill(null)
    .forEach((_, i) => {
      em.set(i, i, 100);
    });
  expect(em.size).toBe(100);
  const sleep = (n: number) => new Promise((r) => setTimeout(r, n));
  await sleep(500);
  expect(em.size).toBe(0);
});
