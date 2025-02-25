# **📚 Lab Instructions: Testing Basics with Jest and JavaScript**  

> Please [push the source code to GitHub](./push-to-github.md)

---
## **🔹 Part 1: Setting Up Jest and Testing `petManager.js`**  

### **Objective**  
Set up Jest and test the `addOne()` function to ensure it correctly adds pets to an array and handles invalid inputs.  

---


## **Jest Setup Instructions**  

### **Step 1: Initialize Project**  
1. Create a project folder and initialize npm:  
   ```bash
   mkdir jest-lab1 && cd jest-lab1
   npm init -y
   ```  

### **Step 2: Install Jest**  
```bash
npm install --save-dev jest
```  

### **Step 3: Update `package.json`**  
Add the Jest test script:  
```json
"scripts": {
  "test": "jest"
}
```  

### **Step 4: Run Tests**  
```bash
npm test
```  

---

## **Code Setup**  

### **`petManager.js`**  
```javascript
const petArray = [];
let nextId = 1; 

function resetState() {
  nextId = 1;
  petArray.length = 0;
}

function addOne(name, species, age, color, weight) {
  if (typeof name !== "string" || typeof species !== "string" || typeof color !== "string") return false;
  if (typeof age !== "number" || typeof weight !== "number") return false;
  if (!name || !species || age <= 0 || !color || weight <= 0) return false;

  const newPet = {
    id: nextId++,
    name,
    species,
    age,
    color,
    weight,
  };

  petArray.push(newPet);
  return newPet;
}

module.exports = { addOne, petArray, resetState };
```  

### **`petManager.test.js`**  
```javascript
const { addOne, petArray, resetState } = require("./petManager");

beforeEach(() => {
  resetState();
});

test("addOne() should add a pet and return the new pet object", () => {
  const pet = addOne("Buddy", "Dog", 3, "Brown", 20);

  expect(pet).toEqual({
    id: 1,
    name: "Buddy",
    species: "Dog",
    age: 3,
    color: "Brown",
    weight: 20,
  });

  expect(petArray).toHaveLength(1);
});

test("addOne() should return false if any parameter is missing", () => {
  expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false); // Missing weight
  expect(addOne()).toBe(false); // Missing all parameters
});

test("addOne() should return false for invalid data types", () => {
  expect(addOne(123, "Dog", 3, "Brown", 20)).toBe(false); // Name should be a string
  expect(addOne("Buddy", "Dog", -2, "Brown", 20)).toBe(false); // Age should be positive
  expect(addOne("Buddy", "Dog", 3, "Brown", "Heavy")).toBe(false); // Weight should be a number
});
```  

---

## **🔹 Part 2: Test `carManager.js`**  

### **Code to Test**  

### **`carManager.js`**  
```javascript
let carArray = [];

function resetState() {
  carArray.length = 0;
}

function addCar(make, model, year, color) {
  if (typeof make !== "string" || typeof model !== "string" || typeof color !== "string") return false;
  if (typeof year !== "number" || year <= 0) return false;
  if (!make || !model || !year || !color) return false;

  const newCar = { make, model, year, color };
  carArray.push(newCar);
  return newCar;
}

module.exports = { addCar, carArray, resetState };
```  

---

## **Your Task**  
Write tests for `addCar()` in **`carManager.test.js`**:  
1. Verify a car is added to `carArray` when all parameters are provided.  
2. Ensure `addCar()` returns `false` if any parameter is missing or invalid.  

---

### **Example Test Structure**  

### **`carManager.test.js`**  
```javascript
const { addCar, carArray, resetState } = require("./carManager");

beforeEach(() => {
  resetState();
});

test("addCar() adds a car and returns the new car object", () => {
  const car = addCar("Toyota", "Corolla", 2020, "Blue");
  
  expect(car).toEqual({
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Blue",
  });

  expect(carArray).toHaveLength(1);
});

test("addCar() returns false if any parameter is missing", () => {
  expect(addCar("Toyota", "Corolla", 2020)).toBe(false); // Missing color
  expect(addCar()).toBe(false); // Missing all parameters
});

test("addCar() returns false for invalid data types", () => {
  expect(addCar(123, "Corolla", 2020, "Blue")).toBe(false); // Make should be a string
  expect(addCar("Toyota", "Corolla", "Year", "Blue")).toBe(false); // Year should be a number
  expect(addCar("Toyota", "Corolla", -2020, "Blue")).toBe(false); // Year should be positive
});
```  

---

## **🔹 Part 3: Test `jobManager.js`**  

### **Code to Test**  

### **`jobManager.js`**  
```javascript
let jobArray = [];

function resetState() {
  jobArray.length = 0;
}

function addJob(title, company, salary, location) {
  if (typeof title !== "string" || typeof company !== "string" || typeof location !== "string") return false;
  if (typeof salary !== "number" || salary <= 0) return false;
  if (!title || !company || !salary || !location) return false;

  const newJob = { title, company, salary, location };
  jobArray.push(newJob);
  return newJob;
}

module.exports = { addJob, jobArray, resetState };
```  

---

### **Your Task**  
Write tests for `addJob()` in **`jobManager.test.js`**:  
1. Verify a job is added to `jobArray` when all parameters are provided.  
2. Ensure `addJob()` returns `false` if any parameter is missing or invalid.  

---

### **Example Test Structure**  

### **`jobManager.test.js`**  
```javascript
const { addJob, jobArray, resetState } = require("./jobManager");

beforeEach(() => {
  resetState();
});

test("addJob() adds a job and returns the new job object", () => {
  const job = addJob("Software Engineer", "Tech Corp", 100000, "San Francisco");

  expect(job).toEqual({
    title: "Software Engineer",
    company: "Tech Corp",
    salary: 100000,
    location: "San Francisco",
  });

  expect(jobArray).toHaveLength(1);
});

test("addJob() returns false if any parameter is missing", () => {
  expect(addJob("Software Engineer", "Tech Corp", 100000)).toBe(false); // Missing location
  expect(addJob()).toBe(false); // Missing all parameters
});

test("addJob() returns false for invalid data types", () => {
  expect(addJob(123, "Tech Corp", 100000, "San Francisco")).toBe(false); // Title should be a string
  expect(addJob("Software Engineer", "Tech Corp", "Salary", "San Francisco")).toBe(false); // Salary should be a number
  expect(addJob("Software Engineer", "Tech Corp", -50000, "San Francisco")).toBe(false); // Salary should be positive
});
```  

---

## **🔹 Conclusion**  
- **Part 1**: Set up Jest and tested a pet manager.  
- **Part 2 & 3**: Wrote tests for car and job managers, including edge cases.  
- **Key Skills**: Jest setup, test isolation, parameter validation.  

