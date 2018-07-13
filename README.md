
# expire-map

[![NPM version](https://img.shields.io/npm/v/@zcong/expire-map.svg?style=flat)](https://npmjs.com/package/@zcong/expire-map) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/expire-map.svg?style=flat)](https://npmjs.com/package/@zcong/expire-map) [![CircleCI](https://circleci.com/gh/zcong1993/expire-map/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/expire-map/tree/master)  [![codecov](https://codecov.io/gh/zcong1993/expire-map/branch/master/graph/badge.svg)](https://codecov.io/gh/zcong1993/expire-map)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/zcong1993/donate)

## Install

```bash
$ yarn add @zcong/expire-map
```

## Usage

```js
const ExpireMap = require('@zcong/expire-map').default

const em = new ExpireMap(5000)

em.setExpire('haha', 'hehe', 2000)

console.log(em.get('haha))
// 'hehe'
// fater 2000 ms
console.log(em.get('haha))
// undefined
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**expire-map** © [zcong1993](https://github.com/zcong1993), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by zcong1993 with help from contributors ([list](https://github.com/zcong1993/expire-map/contributors)).

> [github.com/zcong1993](https://github.com/zcong1993) · GitHub [@zcong1993](https://github.com/zcong1993)
