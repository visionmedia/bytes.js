# node-bytes

Byte string parser / formatter.

## Usage

### Used as a class

```js
var BytesParser = require('bytes');

var bytesParser = new BytesParser();
```

#### BytesParser.convert(value, [options]): string|null

Convert the given value in bytes into a string. If the value is negative, it is kept as such. If it is a float, it is
 rounded.

**Arguments**

| Name    | Type   | Description        |
|---------|--------|--------------------|
| value   | `number` | Value in bytes     |
| options | `Object` | Conversion options |

**Options**

| Property          | Type   | Description                                                                             |
|-------------------|--------|-----------------------------------------------------------------------------------------|
| thousandSeparator | `string`&#124;`null` | Example of values: `' '`, `','` and `.`... Default value to `' '`. |

**Returns**

| Name    | Type        | Description             |
|---------|-------------|-------------------------|
| results | `string`&#124;`null` | Return null upon error. String value otherwise. |

**Example**

```js
bytesParser.convert(1024);
// output: '1Kb'

bytesParser.convert(1024, {case: 'lowercase'});
// output: '1kb'
```

#### BytesParser.parse(stringValue)

Parse the string value into an integer in bytes. If no unit is given, it is assumed the value is in bytes.

**Arguments**

| Name          | Type   | Description        |
|---------------|--------|--------------------|
| stringValue   | `string` | String to parse.   |

**Returns**

| Name    | Type        | Description             |
|---------|-------------|-------------------------|
| results | `number`&#124;`null` | Return null upon error. Value in bytes otherwise. |

**Example**

```js
bytesParser.parse('1Kb');
// output: 1024

bytesParser.parse('1024');
// output: 1024
```

### Used as a function

```js
var bytesParser = require('bytes');

bytesParser(1024);
// output: '1kB'

bytesParser(1000, {thousandsSeparator: ','});
// output: '1 000B'

bytesParser('1Kb');
// output: 1024

bytesParser('1024');
// output: 1024
```

## Installation

```bash
npm install bytes --save
component install visionmedia/bytes.js
```

## License 

[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/visionmedia/bytes.js/blob/master/LICENSE)
