# Bytes utility

Utility to parse a string bytes (ex: `1TB`) to bytes (`1099511627776`) and vice-versa.

## Usage


```js
var Bytes = require('bytes');
```

#### Bytes.convert(value, [options]): string|null

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
| thousandsSeparator | `string`&#124;`null` | Example of values: `' '`, `','` and `.`... Default value to `' '`. |

**Returns**

| Name    | Type        | Description             |
|---------|-------------|-------------------------|
| results | `string`&#124;`null` | Return null upon error. String value otherwise. |

**Example**

```js
Bytes.convert(1024);
// output: '1kB'

Bytes.convert(1000);
// output: '1 000B'

Bytes.convert(1024, {thousandsSeparator: null});
// output: '1000B'
```

#### Bytes.parse(stringValue)

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
Bytes.parse('1kB');
// output: 1024

Bytes.parse('1024');
// output: 1024
```

### Used as a function

```js
var Bytes = require('bytes');

Bytes(1024);
// output: '1kB'

Bytes(1000, {thousandsSeparator: ','});
// output: '1 000B'

Bytes('1Kb');
// output: 1024

Bytes('1024');
// output: 1024
```

## Installation

```bash
npm install bytes --save
component install visionmedia/bytes.js
```

## License 

[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/visionmedia/bytes.js/blob/master/LICENSE)
