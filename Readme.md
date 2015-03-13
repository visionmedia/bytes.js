# node-bytes

  Byte string parser / formatter.

## Example:

```js
bytes('1kb')
// => 1024

bytes('2mb')
// => 2097152

bytes('1gb')
// => 1073741824

bytes(1073741824)
// => 1gb

bytes(1099511627776)
// => 1tb
```

## Installation

```
$ npm install bytes
$ component install visionmedia/bytes.js
```

## License 

[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/visionmedia/bytes.js/blob/master/LICENSE)
