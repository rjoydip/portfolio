---
idOnly: true
title: JavaScript Coercions
description: JavaScript Coercions Scenerios
pubDate: Sep 29, 2018
---

## Coercion 1

typeof `NaN` >>> `number`

By definition, NaN is the return value from operations which have an `undefined * numerical` result. Hence why, in JavaScript, aside from being part of the global

Object, it is also part of the Number object: Number.NaN. It is still a

Numeric data type, but it is undefined as a real number

```js
Number.MAX_VALUE >> 1.7976931348623157e+308
console.dir(Number) > get more info about Number
typeof (3.2317006071311 * 10e616) / (3.2317006071311 * 10e616)
```

> [!Note]
> Note: Don’t use (`typeof NaN`) rather use (`isNan()`)
> More info: [https://javascriptrefined.io/nan-and-typeof-36cd6e2a4e43](https://javascriptrefined.io/nan-and-typeof-36cd6e2a4e43)

## Coercion 2

- `9999999999999999` > `10000000000000000`

That number is too large to fit in an integer, so is possibly converted to a double. Floating point numbers are not exact.

All javascript numbers are double precision floating point numbers, that means you have only **16** digit of precision, and `9999999999999999` clearly passes that limit.

## Coercion 3

- `0.2 + 0.1` === `0.3` > `false`
- `0.2 + 0.1` === `0.3` > `0.30000000000000004`

The length of `0.30000000000000004` is **19** and it will be converted into (double only has `15/16` digits of accuracy and when you give it a number it can’t represent (which is most of the time, even 0.1 is not accurate) it takes the closest representable number.)

> [!Note]
> Floating point numbers are not exact

## Coercion 4

- `Math.max()` > `-Infinity`
- `Math.min()` > `Infinity`

The `Math.max()` function is used to return the largest of zero or more numbers. The result is ***“-Infinity”*** if no arguments are passed and the result is `NaN`.

At least one of the arguments cannot be converted to a number. `max()` is a static method of Math, therefore, it is always used as `Math.max()`, rather than as a method of a Math object created.

## Coercion 5

- `[] + []` > ``
- `{} + []` > `0`
- `[] + {}` > `[object Object]`

All operands are non-primitive values, so `+` starts with the leftmost triggering numeric conversion. Both Object’s and Array’s valueOf method returns the object itself, so it’s ignored and `toString()` is used as a fallback. The trick here is that first `{}` is not considered as an object literal, but rather as a block declaration statement, so it’s ignored.

Evaluation starts with next `+` expression, which is converted to an empty string via `toString()` method and then to `0`.

## Coercion 6

- `true + true + true === 3` > `true`

When trying to make `+` operation true is like 1 and false is like 0, then if you make true+true+true you get `3`

### Tags

`JavaScript` • `Coercions` • `Tricks` • `Fun`
