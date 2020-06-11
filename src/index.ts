export type ExpireValue<T> = {
  expire: number; // ms
  expiredNano: number;
  value: T;
};

export type Hrtime = [number, number];

export const hrtime2nano = (hrtime: Hrtime): number =>
  hrtime[0] * 1e9 + hrtime[1];

export const ms2nano = (t: number): number => t * 1e6;

export default class ExpireMap<K, V> {
  private store: Map<K, ExpireValue<V>>;

  constructor(gcInterval: number) {
    this.store = new Map();
    if (gcInterval > 0) {
      setInterval(() => this.gc(), gcInterval).unref();
    }
  }

  set(key: K, value: V, expire: number) {
    const ev: ExpireValue<V> = {
      value,
      expire,
      expiredNano: this.nowNano() + ms2nano(expire),
    };

    this.store.set(key, ev);
  }

  get(key: K) {
    return this.getOrEvict(key);
  }

  has(key: K) {
    return this.store.has(key) && this.isValid(this.store.get(key));
  }

  clear() {
    this.store.clear();
  }

  delete(key: K) {
    this.store.delete(key);
  }

  getAll() {
    this.gc();
    const mp = new Map<K, V>();
    for (const [k, v] of this.store.entries()) {
      mp.set(k, v.value);
    }
    return mp;
  }

  gc() {
    for (const [k, _] of this.store.entries()) {
      this.getOrEvict(k);
    }
  }

  get size() {
    return this.store.size;
  }

  private isValid(ev: ExpireValue<V> | undefined) {
    if (!ev) {
      return false;
    }
    return ev.expiredNano > this.nowNano();
  }

  private getOrEvict(key: K) {
    const ev = this.store.get(key);
    if (this.isValid(ev)) {
      return ev.value;
    }
    this.store.delete(key);
    return undefined;
  }

  private nowNano() {
    return hrtime2nano(process.hrtime());
  }
}
