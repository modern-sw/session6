# **📚 Lab Instructions: Testing `getAll()` with Jest and JavaScript**  

> Please [push the source code to GitHub](./push-to-github.md)

---

## **🔹 Overview**  
In this lab, you will:  
1. **Part 1**: Set up Jest and test `getAll()` in `petManager2.js`.  
2. **Part 2**: Write tests for `readCars()` in `carManager2.js`.  
3. **Part 3**: Write tests for `readJobs()` in `jobManager2.js`.  

By the end of this lab, you will understand how to test retrieval functions and ensure correct data handling.  

---

## **🔹 Part 1: Testing `getAll()` in `petManager2.js`**  


### **Jest Setup Instructions**  
1. **Initialize the project:**  
   ```bash
   mkdir jest-lab2 && cd jest-lab2
   npm init -y
   ```  

2. **Install Jest:**  
   ```bash
   npm install --save-dev jest
   ```  

3. **Update `package.json`:**  
   ```json
   "scripts": {
     "test": "jest"
   }
   ```  

4. **Run Tests:**  
   ```bash
   npm test
   ```  

---

### **Code Setup**  

### **`petManager2.js`**  
This module manages a collection of pets, allowing you to add pets and retrieve all pets.  
```javascript
const petArray = [];
let nextId = 1;  

function resetState() {
  nextId = 1;
  petArray.length = 0;
}

function addOne(name, species, age, color, weight) {
  if (!name || !species || !age || !color || !weight) {
    return false;
  }

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

function getAll() {
  return petArray;
}

module.exports = { addOne, getAll, petArray, resetState };
```  

---

### **Writing Tests for `getAll()`**  

### **`petManager2.test.js`**  
We will test:  
1. If `getAll()` returns an empty array when no pets are added.  
2. If `getAll()` returns the correct pets after adding them.  

```javascript
const { addOne, getAll, petArray, resetState } = require("./petManager2");

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
  expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false);
  expect(addOne()).toBe(false);
});

test("getAll() should return an empty array if no pets have been added", () => {
  expect(getAll()).toHaveLength(0);
});

test("getAll() should return an array with one pet after calling addOne()", () => {
  addOne("Buddy", "Dog", 3, "Brown", 20);

  const allPets = getAll();
  expect(allPets).toHaveLength(1);
  expect(allPets[0].id).toBe(1);
  expect(allPets[0]).toEqual({
    id: 1,
    name: "Buddy",
    species: "Dog",
    age: 3,
    color: "Brown",
    weight: 20,
  });
});

test("getAll() should return an array with multiple pets after calling addOne() multiple times", () => {
  addOne("Buddy", "Dog", 3, "Brown", 20);
  addOne("Milo", "Cat", 2, "White", 5);

  const allPets = getAll();
  expect(allPets).toHaveLength(2);
});
```  

---

## **🔹 Part 2: Writing Tests for `readCars()` in `carManager2.js`**  

Now, apply what you’ve learned to write tests for the **car management system**.  

### **Code: `carManager2.js`**  
```javascript
let carArray = [];

function addCar(make, model, year, color) {
  if (!make || !model || !year || !color) {
    return false;
  }

  const newCar = { make, model, year, color };
  carArray.push(newCar);
  return newCar;
}

function readCars() {
  return carArray;
}

module.exports = { addCar, readCars, carArray };
```  

---

### **📝 Your Task: Write `carManager2.test.js`**  
Create a test file **`carManager2.test.js`** and write tests for the `readCars()` function.  

- Test that `readCars()` returns an **empty array** when no cars have been added.  
- Test that `readCars()` returns an **array with one car** after adding a car.  
- Test that `readCars()` returns **multiple cars** after adding several.  

📌 **Use Jest and follow the pattern from Part 1!**  

---

## **🔹 Part 3: Writing Tests for `readJobs()` in `jobManager2.js`**  

Now, test the **job management system**.  

### **Code: `jobManager2.js`**  
```javascript
let jobArray = [];

function addJob(title, company, salary, location) {
  if (!title || !company || !salary || !location) {
    return false;
  }

  const newJob = { title, company, salary, location };
  jobArray.push(newJob);
  return newJob;
}

function readJobs() {
  return jobArray;
}

module.exports = { addJob, readJobs, jobArray };
```  

---

### **📝 Your Task: Write `jobManager2.test.js`**  
Create a test file **`jobManager2.test.js`** and write tests for the `readJobs()` function.  

- Test that `readJobs()` returns an **empty array** when no jobs have been added.  
- Test that `readJobs()` returns an **array with one job** after adding a job.  
- Test that `readJobs()` returns **multiple jobs** after adding several.  

📌 **Use Jest and follow the pattern from Part 1!**  

---

## **🔹 Conclusion**  
- **Part 1**: Set up Jest and tested `getAll()` in `petManager2.js`.  
- **Part 2 & 3**: Applied the same logic to cars and jobs.  
- **Key Skills**:  
  ✅ Validating `getAll()` functions.  
  ✅ Ensuring tests start with a clean state (`beforeEach()`).  
  ✅ Running tests with Jest.  

