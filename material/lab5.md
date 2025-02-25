# **Lab: Using `describe` Blocks for Better Test Organization**  

> Please [push the source code to GitHub](./push-to-github.md) once you have completed the lab.

---
In this lab, you will learn how to use `describe` blocks in Jest to structure test cases logically.  

We will follow these steps:  
1. **Understand the provided test file (`petManager5.test.js`) and its improvements using `describe` blocks.**  
2. **Refactor the test file for the car API to use `describe` blocks.**  
3. **Refactor the test file for the job API to use `describe` blocks.**  

---

## **Part 1: Understanding `describe` Blocks in `petManager5.test.js`**  


### **Jest Setup Instructions**  
1. **Initialize the project:**  
   ```bash
   mkdir jest-lab5 && cd jest-lab5
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

### **Why Use `describe` Blocks?**  

In Jest, `describe` blocks help **organize** test cases into logical groups.  
- Instead of having all tests in a **flat structure**, they are grouped by functionality.  
- This makes the tests **easier to read**, **easier to debug**, and **easier to maintain**.  
- It also provides **better test reporting**, as related tests are grouped together in the output.  

### **Refactored Test File with `describe` Blocks**  

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

Here’s the updated test file `petManager5.test.js`, where tests are grouped into four suites:  
1. **Read Operations (`getAll()`)**  
2. **Add Operations (`addOne()`)**  
3. **Update Operations (`update()`)**  
4. **Delete Operations (`deletePet()`)**  

```javascript
const { addOne, getAll, petArray, resetState, update, deletePet } = require("./petManager5");

beforeEach(() => {
  resetState();
});

// --- Read Operation Test Suite ---
describe("Read Operation: getAll()", () => {
  test("getAll() should return an empty array if no pets have been added", () => {
    expect(getAll()).toHaveLength(0);  // Check that no pets are present
  });

  test("getAll() should return an array with one pet after calling addOne()", () => {
    addOne("Buddy", "Dog", 3, "Brown", 20);

    const allPets = getAll();

    expect(allPets).toHaveLength(1);  // Check that the array has exactly 1 pet
    expect(allPets[0].id).toBe(1);   // Check that the ID of the first pet is 1
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

    expect(allPets).toHaveLength(2);  // Check that the array has exactly 2 pets
  });
});

// --- Add Operation Test Suite ---
describe("Add Operation: addOne()", () => {
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

    expect(petArray).toHaveLength(1);  // Ensure the pet was added to petArray
  });

  test("addOne() should return false if any parameter is missing", () => {
    expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false); // Missing weight
    expect(addOne()).toBe(false); // Missing all parameters
  });
});

// --- Update Operation Test Suite ---
describe("Update Operation: update()", () => {
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

    expect(petArray[0]).toEqual(updatedPet);  // Ensure the pet in petArray is updated
  });

  test("update() should return false if the pet ID does not exist", () => {
    expect(update(999, { name: "Nonexistent Pet" })).toBe(false);  // Invalid ID
  });
});

// --- Delete Operation Test Suite ---
describe("Delete Operation: deletePet()", () => {
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

    expect(petArray).toHaveLength(0);  // Ensure the pet was deleted from petArray
  });

  test("deletePet() should return false if the pet ID does not exist", () => {
    expect(deletePet(999)).toBe(false);  // Invalid ID
  });
});
```

### **Benefits of `describe` Blocks**  

✅ **Clear Organization** – Tests are grouped into meaningful sections.  
✅ **Better Debugging** – Failures are easier to trace.  
✅ **Cleaner Output** – Test results are structured neatly.  


---

## **Part 2: Refactor the Car API Test File**  

Now, apply what you learned to **refactor the car API test file** (`carManager.test.js`).  

### **Your Task:**  

- **Group related tests into `describe` blocks** (e.g., `describe("Read Operation: getAllCars()")`).  
- **Ensure the structure follows the same pattern** as `petManager5.test.js`.  
- **Run the tests** to make sure everything still works correctly.  

---

## **Part 3: Refactor the Job API Test File**  

Now, apply the same refactoring to **the job API test file** (`jobManager.test.js`).  

### **Your Task:**  

- **Group tests into `describe` blocks** for each major function.  
- **Follow the same structure** as in the pet and car API tests.  
- **Run your tests** to verify that they still pass.  

