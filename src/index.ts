export type ExpireValue = {
  expiredIn: number,
  value: any
}

export default class ExpireMap {
  private store: Map<any, ExpireValue>

  constructor(gcInterval: number) {
    this.store = new Map()
    setInterval(this.checkAll.bind(this), gcInterval || 5000)
  }

  private setData = (k: any, v: any, expiredIn: number) => {
    const vv: ExpireValue = {
      expiredIn,
      value: v
    }
    this.store.set(k, vv)
  }

  private check = (k: any) => {
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

  public get = (k: any): any => {
    if (!this.store.has(k)) {
      return undefined
    }
    this.check(k)
    return this.store.get(k) && this.store.get(k).value
  }

  public setExpire = (k: any, v: any, expire: number) => {
    const expiredIn: number = Date.now() + Number(expire)
    this.setData(k, v, expiredIn)
  }

  public setExpiredIn = (k: any, v: any, expiredIn: Date) => {
    this.setData(k, v, new Date(expiredIn).getTime())
  }

  public getAll = (): Map<any, any> => {
    const m = new Map()
    for (const [k, v] of this.store) {
      this.get(k) && m.set(k, v.value)
    }
    return m
  }

  public has = (k: any): boolean => {
    this.check(k)
    return this.store.has(k)
  }

  get size(): number {
    this.checkAll()
    return this.store.size
  }
}
