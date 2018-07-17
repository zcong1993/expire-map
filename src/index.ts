export type ExpireValue<T> = {
  expiredIn: number,
  value: T
}

export default class ExpireMap<K, V> {
  private store: Map<K, ExpireValue<V>>

  constructor(gcInterval: number) {
    this.store = new Map()
    setInterval(this.checkAll.bind(this), gcInterval || 5000)
  }

  private setData = (k: K, v: V, expiredIn: number) => {
    const vv: ExpireValue<V> = {
      expiredIn,
      value: v
    }
    this.store.set(k, vv)
  }

  private check = (k: K) => {
    const v = this.store.get(k)
    if (!v) {
      return
    }
    if (Date.now() >= v.expiredIn) {
      this.store.delete(k)
    }
  }

  private checkAll = () => {
    for (const [k, _] of this.store) {
      this.check(k)
    }
  }

  public get = (k: K): V => {
    if (!this.store.has(k)) {
      return undefined
    }
    this.check(k)
    return this.store.get(k) && this.store.get(k).value
  }

  public setExpire = (k: K, v: V, expire: number) => {
    const expiredIn: number = Date.now() + Number(expire)
    this.setData(k, v, expiredIn)
  }

  public setExpiredIn = (k: K, v: V, expiredIn: Date) => {
    this.setData(k, v, new Date(expiredIn).getTime())
  }

  public getAll = (): Map<K, V> => {
    const m = new Map()
    for (const [k, v] of this.store) {
      this.get(k) && m.set(k, v.value)
    }
    return m
  }

  public has = (k: K): boolean => {
    this.check(k)
    return this.store.has(k)
  }

  public update = (k: K, v: V): boolean => {
    if (!this.has(k)) {
      return false
    }
    const vv: ExpireValue<V> = this.store.get(k)
    vv.value = v
    this.store.set(k, vv)
    return true
  }

  public clear = () => {
    this.store.clear()
  }

  public delete = (k: K): boolean => {
    return this.store.delete(k)
  }

  get size(): number {
    this.checkAll()
    return this.store.size
  }
}
