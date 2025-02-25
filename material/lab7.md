# **Lab on Miscellaneous Testing Topics**


In this lab, we will cover a series of miscellaneous topics that are important for writing effective and maintainable tests. These topics include **code coverage**, **the relationship between TDD and unit testing**, **integration vs. end-to-end tests**, **the testing pyramid**, and **special test cases** like skipping tests or running tests by pattern.

---

## **1. Code Coverage**

### **Objective:**  
We will create a small application that performs basic **user operations**: reading, updating, and deleting users. Then, we will demonstrate how poor test coverage can impact your application and show how to improve coverage.

---



### **Step 0: Jest Setup Instructions**  
1. **Initialize the project:**  
   ```bash
   mkdir jest-lab7 && cd jest-lab7
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

---

### **Step 1: Code for User Operations**

Create the file `userManager2.js`:

```javascript
let users = [];
let nextId = 1;

function addUser(name, email) {
  // Check if both fields are provided, otherwise return false
  if (!name || !email) return false;

  const newUser = {
    id: nextId++,  // Auto increment user ID
    name,
    email,
  };

  users.push(newUser);
  return newUser;
}

function getUsers() {
  return users;
}

function resetUsers() {
  // Reset users array and nextId
  users = [];
  nextId = 1;  // Reset the ID for the next test
}

module.exports = { addUser, getUsers, resetUsers };
```

---

### **Step 2: Initial Test Cases with Poor Coverage**

Create `userManager2.test.js`:

```javascript
const { addUser, getUsers, resetUsers } = require("./userManager");

// Ensure a fresh state before each test
beforeEach(() => {
  resetUsers();
});

test("addUser() should add a user and return the new user object", () => {
  const user = addUser("Alice", "alice@example.com");

  expect(user).toEqual({
    id: 1,  // Verify the ID is correctly set to 1
    name: "Alice",
    email: "alice@example.com",
  });

  expect(getUsers()).toHaveLength(1);  // Verify that there is exactly one user
});

test("getUsers() should return all added users", () => {
  addUser("Alice", "alice@example.com");
  addUser("Bob", "bob@example.com");

  const users = getUsers();
  expect(users).toHaveLength(2);  // Verify that the array length is 2
  expect(users[0]).toEqual({ id: 1, name: "Alice", email: "alice@example.com" });
  expect(users[1]).toEqual({ id: 2, name: "Bob", email: "bob@example.com" });
});

// test("addUser() should return false if any field is missing", () => {
//   expect(addUser("Alice")).toBe(false);  // Missing email
//   expect(addUser(null, "alice@example.com")).toBe(false);  // Missing name
//   expect(addUser()).toBe(false);  // Missing both fields
// });
```

---

### **Step 3: Run Coverage Tool**

Run `npx jest --coverage` to see the code coverage report.

### **Initial Coverage Report:**

```plaintext
Statements   : 100% (6/8)
Branches     : 75% (4/8)
Functions    : 100% (4/4)
Lines        : 34% (6/8)
```

<!-- ---

### **Step 4: Add More Tests to Improve Coverage**

Now, let's improve coverage by adding tests for edge cases, such as updating and not finding a user.

Add these tests to `userManager.test.js`:

```javascript
test("updateUser() should update user information", () => {
  addUser("Dave", "dave@example.com");
  const updatedUser = updateUser(1, "Dave Updated", "daveupdated@example.com");
  expect(updatedUser.name).toBe("Dave Updated");
  expect(updatedUser.email).toBe("daveupdated@example.com");
});

test("updateUser() should return false if user doesn't exist", () => {
  const result = updateUser(999, "Nonexistent", "nonexistent@example.com");
  expect(result).toBe(false);
});

test("deleteUser() should return false if user doesn't exist", () => {
  const result = deleteUser(999);
  expect(result).toBe(false);
});
```

---
### **Step 5: Run Coverage Again**

Run `jest --coverage` again and observe the improved coverage.

### **Improved Coverage Report:**

```plaintext
Statements   : 100% (8/8)
Branches     : 100% (8/8)
Functions    : 100% (4/4)
Lines        : 100% (8/8)
```

Now the tests cover all functions and edge cases.
 -->
---

### **Explanation of Coverage**  

**Code coverage** is a metric used to measure how much of your code is exercised by tests. The higher the coverage, the better your tests are at covering all possible code paths. There are different types of coverage:
- **Statement Coverage** – Measures if each line of code is executed.
- **Branch Coverage** – Ensures all possible branches (e.g., `if` statements) are tested.
- **Function Coverage** – Checks if all functions are called at least once.
- **Line Coverage** – Ensures each line of the code is executed.

Improving coverage helps ensure that your application behaves as expected in various scenarios and edge cases.

---

## **2. How TDD is Related to Unit Testing**

### **Test-Driven Development (TDD)**  
TDD is a methodology where you write tests before writing the code that implements the features. It involves writing **unit tests** that verify the behavior of **small, isolated** pieces of your application, such as individual functions or methods.

### **Relationship between TDD and Unit Testing**  
- **Unit Testing** is an integral part of TDD. In TDD, you write unit tests to:
  1. Define the functionality (Red phase).
  2. Implement just enough code to pass the test (Green phase).
  3. Refactor the code while keeping the tests green (Refactor phase).
  
Unit tests in TDD ensure that each component of your application works independently before you combine them into a full system.

---

## **3. Integration vs. End-to-End Tests**

### **Integration Tests**  
Integration tests check if different parts of your application work together. These tests typically cover the interaction between different units, such as a service interacting with a database or an API interacting with a data model.

**Example:** Testing if the `addUser` function properly saves a user to a database.

### **End-to-End (E2E) Tests**  
End-to-end tests check the system as a whole, simulating real-world user interactions. They often test the application from the frontend to the backend to ensure that the entire system is working as expected.

**Example:** Testing if a user can sign up through a web form, and then confirming the user appears in the database.

### **Key Differences:**
- **Integration Tests** focus on ensuring components work together.
- **E2E Tests** simulate real user behavior across the entire application.

---

## **4. The Testing Pyramid**

The testing pyramid is a concept that emphasizes the different levels of testing. The idea is that:
- **Unit Tests** should be the base of the pyramid, making up the majority of your tests.
- **Integration Tests** should sit in the middle layer.
- **End-to-End Tests** should form the smallest layer at the top.

This structure encourages more frequent unit tests and fewer E2E tests, since E2E tests tend to be more time-consuming and brittle.

---

## **5. Special Cases in Testing**

### **Skipping Tests (e.g., `.only`)**

Sometimes, you may want to run a single test or a set of tests while temporarily skipping the others. You can use `.only` to do this.

```javascript
test.only("This test will run exclusively", () => {
  expect(true).toBe(true);
});
```

### **Running Tests on a Specific File**

You can run tests for a specific file using the `--testPathPattern` option.

```bash
jest --testPathPattern="userManager.test.js"
```

This will run tests only for the `userManager.test.js` file.

### **Running Tests by Pattern**

You can also run tests based on a pattern, which can be useful if you have many tests and want to filter them.

```bash
npm test -- --test-name-pattern="addUser"
```

This will run all tests that have the string `addUser` in their names.

---

## **Conclusion**

In this lab, we covered various aspects of testing:
- **Code Coverage**: We demonstrated how coverage can be improved by adding more test cases and explained its significance.
- **TDD & Unit Testing**: We discussed how TDD is closely related to unit testing and how it drives writing testable code.
- **Integration vs. E2E Tests**: We learned the difference between these types of tests and their use cases.
- **Testing Pyramid**: We discussed how to structure your tests to focus on unit tests while balancing integration and E2E tests.
- **Special Test Cases**: We looked at how to skip tests, run tests by file or pattern, and the usefulness of `.only` and `--testPathPattern`.

