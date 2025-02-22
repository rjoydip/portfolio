---
idOnly: true
title: Learn Rust
description: Learning Rust Basic things
pubDate: Sep 30, 2018
---

## Requirements

* **Rust**: The main source code repository for Rust. It contains the compiler, standard library, and documentation.
* **Cargo**: Distributed by default with Rust. If you've got rustc installed locally, you probably also have cargo installed locally.

## Installation

```bash
git clone https://github.com/rjoydip/learn-rust.git
cd learn-rust
npm start
```

## Hello Rust

```rust
println!("Hello, rust!");
```

## Comments

```rust
// single line comment
/*
    Multiline comments
*/
```

## Variables

```rust
// print a variable
let x = 5;
println!("{}", x);

// variable mutant
let mut x = 5;
x = 9;
println!("{}", x);

// print multiple variable
let (x, y): (i32, i16) = (15, 16);
println!("{}", x);
println!("{}", y);
println!("Multiple value print {}, {}", x, y);

// print variable
let x = 18;
println!("Binary: {:b}, Hexadecimal: {:x}, Octal: {:o}", x, x, x);

// display decimal value
println!("Display output 1: {:.2}", 1.234);
```

## Primitive Data Types

* `bool`: The boolean type.
* `char`: A character type.
* `i8`: The 8-bit signed integer type.
* `i16`: The 16-bit signed integer type.
* `i32`: The 32-bit signed integer type.
* `i64`: The 64-bit signed integer type.
* `isize`: The pointer-sized signed integer type.
* `u8`: The 8-bit unsigned integer type.
* `u16`: The 16-bit unsigned integer type.
* `u32`: The 32-bit unsigned integer type.
* `u64`: The 64-bit unsigned integer type.
* `usize`: The pointer-sized unsigned integer type.
* `f32`: The 32-bit floating point type.
* `f64`: The 64-bit floating point type.
* `array`: A fixed-size array, denoted [T; N], for the element type, T, and the no-negative compile-time constant size, N.
* `slice`: A dynamically-sized view into a contiguous sequence, [T].
* `str`: String slices.
* `tuple`: A finite heterogeneous sequence, (T, U, ..).

## Conditional Flow

### If else

```rust
let x = 10;
if x == 1 {
    println!("Inside if");
} else if x > 5 {
    println!("Inside else if");
} else {
    println!("Inside else");
}
```

### If else with let

```rust
let condition = false;
let number = if condition {
    5
} else {
    6
};
println!("The value of number is: {}", number);
```

## Casting

```rust
let f = 24.4321_f32;
let i = f as u8;
println!("{}, {}", f, i);
```

## Array

An array is fixed-size, collection of same-type elements.

```rust
let array: [i32; 5] = [0, 1, 2, 3, 4];
println!("The first element of the array is: {}", array[0]);

// slice
let slice = &array[0..3];
```

## Tuple

Tuples are finite, heterogeneous, sequences. Let's unpack that quickly. First of all they are finite; this is fairly self-explanatory. They have a size, a fixed number of elements. They are heterogeneous. They can contain multiple different types. This is in contrast to an array, which can only contain elements of the same type. And lastly they are sequences, meaning they have an order, and most importantly they can be accessed by index (although in a different manner than arrays).

```rust
let tuple = ("hello", 42, "world", [3,6,9]);
println!("First element is {}", tuple.0);
println!("Second element is {}", tuple.1);
println!("Third element is {}", tuple.2);
let mut counter = 0;
for x in &tuple.3 {
    println!("Element {} of the fourth element is {}", counter, x);
    counter += 1;
}
```

## Loop

### Infinite Loop

```rust
loop {
    println!("Infinite");
}
```

### While Loop

```rust
let mut count = 5;
while count > 1 {
    count -= 1;
    println!("Count is {}", count);
}
```

### For Loop

```rust
let arr = [10, 20, 30, 40, 50];
for ele in arr.iter() {
    println!("Element of array is {}", ele);
}
```

### Reverse Loop

```rust
for number in (1..4).rev() {
    println!("{}", number);
}
```

### Enumerate

```rust
for (i, x) in (1..10).enumerate() {
    println!("Index is: {} and value is: {}", i, x);
}
```

### Break Statement

```rust
let mut x = 0;

// break with loop
loop {
    println!("Value of i is {}", x);
    if x >= 10 {
        break;
    }
    x += 1;
}

// break with while
while x < 100 {
    println!("Value of i is {}", x);
    if x >= 10 {
        break;
    }
    x += 1;
}

// break with for
for ele in 1..100 {
    println!("Value of i is {}", x);
    if x >= 10 {
        break;
    }
    x += 1;
}
```

## Match

### Match with number

```rust
let x = 4;
match x {
    0 => { println!("Value is 0"); }
    1 => { println!("Value is 1"); }
    2 => { println!("Value is 2"); }
    3 => { println!("Value is 3"); }
    4 => { println!("Value is 4"); }
    5 => { println!("Value is 5"); }
    _ => { println!("Any value match"); }
}
```

### Match with string

```rust
let x = '6';
match x {
    '0' => { println!("Value is 0"); }
    '1' => { println!("Value is 1"); }
    '2' => { println!("Value is 2"); }
    '3' => { println!("Value is 3"); }
    '4' => { println!("Value is 4"); }
    '5' => { println!("Value is 5"); }
    _ => { println!("Any value match"); }
}
```

### Match with OR

```rust
let x = 3;
match x {
    3 | 2 => { println!("Value is {}", x); }
    3 => { println!("Value is three"); }
    _ => { println!("Any value match"); }
}
```

### Match with condition

```rust
let x = 1;
let y = 3;
match (x, y) {
    (x, y) if x > y => { println!("Decreasing"); }
    (x, y) if x < y => { println!("Increasing"); }
    (x, y) => { println!("Equal"); }
}
```

### Match with range

```rust
let a = 8;
match a {
    4..=7 => println!("In between 4...7: {}", a),
    _ => println!("Not in between 4...7"),
}
```

### Pair/Tuple Match

```rust
let pair = (1, 0);
match pair {
    (0, y) => println!("Y: {}", y),
    (x, 0) => println!("X: {}", x),
    _ => println!("Not match"),
}
```

### Pattern Match

```rust
let p = 1;
match p {
    1..=10 => println!("Between 1 to 10: {}", p),
    11..=20 => println!("Between 11 to 20: {}", p),
    _ => println!("Other"),
}
```

## Implement

```rust
struct Object {
    width: u32,
    height: u32,
}

impl Object {
    fn area(&self) -> u32 {
        return self.height * self.width;
    }

    fn new(width: u32, height: u32) -> Object {
        Object {
            width: width,
            height: height,
        }
    }

    fn show(&self) {
        println!("{} x {} with area: {}", self.width, self.height, self.area());
    }
}

let o = Object {
    width: 3,
    height: 2,
};
let obj = Object::new(o.width, o.height);
obj.show();
```

## Enum

```rust
enum Shape {
    Rectangle { height: u32, width: u32 },
    Square(u32),
    Circle(f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Rectangle { height, width } => (height * width) as f64,
            Shape::Square(ref s) => (s * s) as f64,
            Shape::Circle(ref r) => 3.14 * (r * r),
        }
    }
}

let r = Shape::Rectangle { height: 10, width: 10 };
let s = Shape::Square(10);
let c = Shape::Circle(4.5);

println!("Area of rectangle: {}", r.area());
println!("Area of square: {}", s.area());
println!("Area of circle: {}", c.area());
```

## Related function

```rust
// Struct
struct Object {
    width: u32,
    height: u32,
}

// Methods
impl Object {
    fn area(&self) -> u32 {
        return self.height * self.width;
    }

    fn show(&self) {
        println!("{}x{} with area: {}", self.width, self.height, self.area());
    }
}

// Related Function
impl Object {
    fn new(width: u32, height: u32) -> Object {
        Object {
            width: width,
            height: height,
        }
    }
}

let o = Object {
    width: 3,
    height: 2
};
let obj = Object::new(o.width, o.height);
obj.show();
```

## Vector enum

```rust
#[derive(Debug)]
enum Example {
    Float(f64),
    Int(i32),
    Test(String),
}

let r = vec![
    Example::Int(111),
    Example::Float(11.1),
    Example::Test(String::from("Hello world")),
];
println!("{:?}", r);
```

## Char match

```rust
let s = Some('c');

// Example 1
match s {
    Some(i) => println!("Value inside match: {}", i),
    None => {},
}

// Example 2
if let Some(i) = s {
    println!("Value inside if: {}", i);
} else {
    println!("Inside else");
}
```

## Trait

```rust
trait Shape {
    fn area(&self) -> u32;
}

struct Rectangle {
    height: u32,
    width: u32,
}

struct Circle {
    radius: f64,
}

impl Shape for Rectangle {
    fn area(&self) -> u32 {
        self.height * self.width
    }
}

impl Shape for Circle {
    fn area(&self) -> u32 {
        (3.14 * self.radius * self.radius) as u32
    }
}

let c = Circle { radius: 100.2 };
let r = Rectangle { height: 2, width: 3 };
println!("Circle area: {}, Rectangle area: {}", c.area(), r.area());
```

## Ownership and Borrowing

### Example 1

```rust
let x = 1; // x is owner of one and it stores in stack
let s = String::from("hi");

// x and s move reference ownership to y
// NOTE: one reference can own one piece of data
// println!("{}", s);
```

### Example 2

```rust
// example is called ownership moving
fn take(x: Vec<i32>) {
    println!("We took v: {} and {}", x[0], x[1]);
}

let mut v = vec![1, 2];

take(v); // transferring v ownership from main -> take

println!("{:?}", v); // This will cause an error
```

### Example 3

```rust
// example is called ownership copy
fn copy(a: i32, b: i32) {
    println!("Value of a and b is (inside copy fn): {}, {}", a, b);
}

let a = 1;
let b = 2;

// Unallocated from main because a,b just copied to another fn
println!("Value of a and b is (inside main fn): {}, {}", a, b);
```

### Example 4

```rust
// more complicated
// borrowing (rather reference of v)
fn borrow1(v: &Vec<i32>) {
    println!("Value of v in borrow1 fn is: {}", v[0]);
}

fn borrow2(v: &Vec<i32>) {
    println!("Value of v in borrow2 fn is: {}", v[3]);
}

fn borrow3(v: &Vec<i32>) {
    println!("Value of v in borrow3 fn is: {}", v[4]);
}

let v = vec![1, 2, 3, 4, 5];

borrow1(&v);
borrow2(&v);
borrow3(&v);

println!("Value of v (inside main fn): {:?}", v);
```

### Example 5

```rust
// complex ownership and borrowing
fn count(v: &Vec<i32>, val: i32) -> usize {
    v.iter().filter(|&&x| x == val).count()
}

let v = vec![1, 2, 1, 2, 3, 4, 5, 3];

for &i in &v {
    let c = count(&v, i); // x and v are borrowed
    println!("{} is repeated {} times", i, c);
}
```

## Concepts

1. [What is Ownership?](https://doc.rust-lang.org/book/second-edition/ch04-01-what-is-ownership.html#what-is-ownership)

## Examples

All example area here. [rjoydip-zz/learn-rust](https://github.com/rjoydip-zz/learn-rust/tree/master/examples)

## Tags

`Programming` • `Rust` • `Learning To Code` • `Basics`
