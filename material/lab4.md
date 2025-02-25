# **Lab: Implementing and Testing Delete Functionality**  

> Please [push the source code to GitHub](./push-to-github.md) once you have completed the lab.

---

This lab will guide you through implementing and testing a **delete function** in a structured way. We'll follow these steps:  

1. **Understand the provided delete functionality (`deletePet`)**  
2. **Write the `deleteCar` function and its test cases**  
3. **Write the `deleteJob` function and its test cases**  

## **Part 1: Understanding `deletePet()`**  


### **Jest Setup Instructions**  

1. **Initialize the project:**  
   ```bash
   mkdir jest-lab4 
   cd jest-lab4
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


### **Implementing `deletePet()` in `petManager4.js`**  

The file `petManager4.js` manages pets in an array. It includes functions to add, retrieve, update, and delete pets. The key function we focus on here is `deletePet()`, which removes a pet based on its ID.  

Here’s the full code for `petManager4.js`:  

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

function deletePet(id) {

  const index = petArray.findIndex(pet => pet.id === id);
  if (index === -1) {
    return false;  // Pet not found, can't delete
  }

  const deletedPet = petArray.splice(index, 1);
  return deletedPet[0];  // Return the deleted pet
}

module.exports = { addOne, getAll, petArray, resetState, update, deletePet };
```

### **Step 2: Writing Test Cases for `deletePet()` in `petManager4.test.js`**  

Now, we need to ensure `deletePet()` works correctly. The test file checks if:  

✅ A pet is deleted successfully.  
✅ The function returns `false` if the pet does not exist.  
✅ The pet list updates correctly after deletion.  

Here’s the test file:  

```javascript
const {
  addOne,
  getAll,
  petArray,
  resetState,
  update,
  deletePet,
} = require("./petManager4");

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

  console.log("Checking the pet array length...");
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

test("deletePet() should delete a pet and return the deleted pet", () => {
  const pet = addOne("Buddy", "Dog", 3, "Brown", 20);
  const deletedPet = deletePet(1);

  expect(deletedPet).toEqual({
    id: 1,
    name: "Buddy",
    species: "Dog",
    age: 3,
    color: "Brown",
    weight: 20,
  });

  expect(petArray).toHaveLength(0); // Ensure the pet was deleted from petArray
});

test("deletePet() should return false if the pet ID does not exist", () => {
  expect(deletePet(999)).toBe(false); // Invalid ID
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

## **Part 2: Implement `deleteCar()`**  

### **Step 1: Implement `deleteCar()` in `carManager.js`**  

Now, apply what you learned from `deletePet()` to implement `deleteCar()` inside `carManager.js`. Your function should:  

- Maintain an array of cars.  
- Allow adding new cars with unique IDs.  
- Implement `deleteCar(id)`, which removes a car by its ID.  
- Return the deleted car object if found; otherwise, return `false`.  

---

### **Step 2: Write Tests for `deleteCar()` in `carManager.test.js`**  

Write test cases similar to `deletePet()`, ensuring:  

✅ A car is correctly deleted.  
✅ The function returns `false` when deleting a non-existing car.  
✅ The array updates correctly after deletion.  

---

## **Part 3: Implement `deleteJob()`**  

### **Step 1: Implement `deleteJob()` in `jobManager.js`**  

Now, apply the same logic to implement `deleteJob()` inside `jobManager.js`. Your function should:  

- Maintain an array of jobs.  
- Implement `deleteJob(id)`, which removes a job by its ID.  
- Return the deleted job object if found; otherwise, return `false`.  

---

### **Step 2: Write Tests for `deleteJob()` in `jobManager.test.js`**  

Write test cases to validate:  

✅ A job is correctly deleted.  
✅ The function returns `false` when attempting to delete a non-existent job.  
✅ The job array updates correctly after deletion.  

