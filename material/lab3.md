# **📚 Lab Instructions: Testing `update()` with Jest and JavaScript**  

> Please [push the source code to GitHub](./push-to-github.md) once you have completed the lab.

---

## **🔹 Overview**  
In this lab, you will:  
1. **Part 1**: Set up Jest and test `update()` in `petManager3.js`.  
2. **Part 2**: Write `updateCar()` and its test in `carManager3.js`.  
3. **Part 3**: Write `updateJob()` and its test in `jobManager3.js`.  

By the end of this lab, you will understand how to test update functions and ensure correct data handling.  

---

## **🔹 Part 1: Testing `update()` in `petManager3.js`**  


### **Jest Setup Instructions**  
1. **Initialize the project:**  
   ```bash
   mkdir jest-lab3 
   cd jest-lab3
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

### **`petManager3.js`**  
This module manages a collection of pets, allowing you to add, update, and retrieve all pets.  
```javascript
const petArray = [];
let nextId = 1;  // Ensure nextId is declared with 'let' (not 'const')

function resetState() {
  nextId = 1;
  petArray.length = 0;
}


function addOne(name, species, age, color, weight) {

  if (!name || !species || !age || !color || !weight) {
    return false;
  }

  const newPet = {
    id: nextId++, // Increment id each time a pet is added
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


function update(id, updatedDetails) {

  const pet = petArray.find(pet => pet.id === id);
  if (!pet) {
    return false;  // Pet not found, can't update
  }

  // Update the pet's details
  Object.assign(pet, updatedDetails);
  return pet;
}

module.exports = { addOne, getAll, petArray, resetState, update };
```  

---

### **Writing Tests for `update()`**  

### **`petManager3.test.js`**  
We will test:  
1. If `update()` successfully updates a pet’s details.  
2. If `update()` fails when given an invalid ID.  

```javascript
const {
  addOne,
  getAll,
  petArray,
  resetState,
  update,
} = require("./petManager3");

// This hook will reset the petArray and nextId before each test to ensure clean state.
beforeEach(() => {
  resetState();
});

test("addOne() should add a pet and return the new pet object", () => {
  const pet = addOne("Buddy", "Dog", 3, "Brown", 20);

  expect(pet).toEqual({
    id: 1, // This checks that the id is correctly set to 1.
    name: "Buddy",
    species: "Dog",
    age: 3,
    color: "Brown",
    weight: 20,
  });

  expect(petArray).toHaveLength(1); // Ensure the pet was added to petArray
});

test("addOne() should return false if any parameter is missing", () => {
  expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false); // Missing weight
  expect(addOne()).toBe(false); // Missing all parameters
});

test("getAll() should return an empty array if no pets have been added", () => {
  expect(getAll()).toHaveLength(0); // Check that no pets are present
});

test("getAll() should return an array with one pet after calling addOne()", () => {
  addOne("Buddy", "Dog", 3, "Brown", 20);

  const allPets = getAll();

  expect(allPets).toHaveLength(1); // Check that the array has exactly 1 pet
  expect(allPets[0].id).toBe(1); // Check that the ID of the first pet is 1
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

  expect(allPets).toHaveLength(2); // Check that the array has exactly 2 pets
});

test("update() should update the pet details", () => {
  const pet = addOne("Buddy", "Dog", 3, "Brown", 20);
  const updatedPet = update(1, { name: "Buddy Jr.", age: 4, color: "Golden" });

  expect(updatedPet).toEqual({
    id: 1,
    name: "Buddy Jr.",
    species: "Dog",
    age: 4,
    color: "Golden",
    weight: 20,
  });

  expect(petArray[0]).toEqual(updatedPet); // Ensure the pet in petArray is updated
});

test("update() should return false if the pet ID does not exist", () => {
  expect(update(999, { name: "Nonexistent Pet" })).toBe(false); // Invalid ID
});



test("getAll() should return an array with one pet after calling addOne()", () => {
  addOne("Buddy", "Dog", 3, "Brown", 20);

  const allPets = getAll();

  expect(allPets).toHaveLength(1); // Check that the array has exactly 1 pet
  expect(allPets[0].id).toBe(1); // Check that the ID of the first pet is 1
  expect(allPets[0]).toEqual({
    id: 1,
    name: "Buddy",
    species: "Dog",
    age: 3,
    color: "Brown",
    weight: 20,
  });
});
```  

---

## **🔹 Part 2: Writing `updateCar()` and Tests for `carManager3.js`**  

Now, apply what you’ve learned to write the **update function for cars**.  

### **Code: `carManager3.js`**  
```javascript
let carArray = [];

function addCar(make, model, year, color) {
  if (!make || !model || !year || !color) {
    return false;
  }

  const newCar = { id: carArray.length + 1, make, model, year, color };
  carArray.push(newCar);
  return newCar;
}

function readCars() {
  return carArray;
}

// TODO: Implement updateCar(id, updatedDetails) function

module.exports = { addCar, readCars, carArray };
```  

---

### **📝 Your Task: Implement `updateCar()` and Write `carManager3.test.js`**  
- Implement `updateCar(id, updatedDetails)`, similar to `update()` in `petManager3.js`.  
- Test that `updateCar()` successfully updates a car’s details.  
- Test that `updateCar()` returns `false` when given an invalid ID.  

📌 **Use Jest and follow the pattern from Part 1!**  

---

## **🔹 Part 3: Writing `updateJob()` and Tests for `jobManager3.js`**  

Now, test the **update function for jobs**.  

### **Code: `jobManager3.js`**  
```javascript
let jobArray = [];

function addJob(title, company, salary, location) {
  if (!title || !company || !salary || !location) {
    return false;
  }

  const newJob = { id: jobArray.length + 1, title, company, salary, location };
  jobArray.push(newJob);
  return newJob;
}

function readJobs() {
  return jobArray;
}

// TODO: Implement updateJob(id, updatedDetails) function

module.exports = { addJob, readJobs, jobArray };
```  

---

### **📝 Your Task: Implement `updateJob()` and Write `jobManager3.test.js`**  
- Implement `updateJob(id, updatedDetails)`, similar to `update()` in `petManager3.js`.  
- Test that `updateJob()` successfully updates a job’s details.  
- Test that `updateJob()` returns `false` when given an invalid ID.  

📌 **Use Jest and follow the pattern from Part 1!**  

---

## **🔹 Conclusion**  
- **Part 1**: Set up Jest and tested `update()` in `petManager3.js`.  
- **Part 2 & 3**: Applied the same logic to cars and jobs.  
- **Key Skills**:  
  ✅ Validating `update()` functions.  
  ✅ Ensuring tests start with a clean state (`beforeEach()`).  
  ✅ Running tests with Jest.  
