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

test("adds negative numbers", () => {
    expect(calculator.add(-2, -3)).toBe(-5);
});

test("multiplies with zero", () => {
    expect(calculator.multiply(5, 0)).toBe(0);
});

test("divides by zero", () => {
    expect(() => calculator.divide(6, 0)).toThrow("Cannot divide by zero");
});