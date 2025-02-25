# Lab: Test-Driven Development (TDD) and Code Coverage with Jest


> Please [push the source code to GitHub](./push-to-github.md) once you have completed the lab.

---

## Objective
In this lab, you will learn how to use Test-Driven Development (TDD) to implement a simple calculator in JavaScript. You will also learn how to measure and improve test coverage using Jest.

## Prerequisites
- Node.js installed
- Basic knowledge of JavaScript
- Jest installed (`npm install --save-dev jest`)

---

## Step 1: Initialize the Project
1. Create a new project folder and navigate into it:
   ```sh
   mkdir tdd-calculator && cd tdd-calculator
   ```
2. Initialize a Node.js project:
   ```sh
   npm init -y
   ```
3. Install Jest as a development dependency:
   ```sh
   npm install --save-dev jest
   ```
4. Update `package.json` to use Jest for testing:
   ```json
   "scripts": {
     "test": "jest --coverage"
   }
   ```

---

## Step 2: Write the First Test
Following the TDD approach, we will first write test specifications before implementing the actual functionality.

1. Create a `calculator.test.js` file:

2. Write test cases for basic arithmetic operations:
   ```js
   const calculator = require("./calculator");

   test("adds two numbers", () => {
       expect(calculator.add(2, 3)).toBe(5);
   });

   test("multiplies two numbers", () => {
       expect(calculator.multiply(2, 3)).toBe(6);
   });

   test("divides two numbers", () => {
       expect(calculator.divide(6, 3)).toBe(2);
   });
   ```

---

## Step 3: Implement the First Version of the Calculator
1. Now, create the `calculator.js` file:

2. Write a basic implementation to pass the initial tests:

```js
const calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

module.exports = calculator;
```

Run the tests using:
```sh
npm test
```
All tests should pass.

---

## Step 4: Improve Test Cases (Edge Cases)
Now, let's add more test cases to handle edge cases:

```js
test("adds negative numbers", () => {
    expect(calculator.add(-2, -3)).toBe(-5);
});

test("multiplies with zero", () => {
    expect(calculator.multiply(5, 0)).toBe(0);
});

test("divides by zero", () => {
    expect(() => calculator.divide(6, 0)).toThrow("Cannot divide by zero");
});
```

Modify `calculator.js` to handle division by zero:
```js
const calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
    }
};

module.exports = calculator;
```
Run the tests again. All tests should still pass.


## Step 5: Checking Code Coverage
Run the following command:
```sh
npx jest --coverage
```
Jest will generate a coverage report. Aim for 100% coverage by writing additional tests for uncovered cases if necessary.
