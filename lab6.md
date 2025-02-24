# **Lab: Test-Driven Development (TDD) in JavaScript**  

## **Introduction to TDD**  

**Test-Driven Development (TDD)** is a software development process that emphasizes writing tests before writing the actual implementation code.  

TDD follows a **Red-Green-Refactor** cycle:  
1. **Red** – Write a failing test.  
2. **Green** – Write just enough code to make the test pass.  
3. **Refactor** – Improve the code while keeping the test passing.  

In this lab, we will practice TDD step by step by building a **User Management Library** in **Part 1**.  
- In **Part 2**, we will apply the same approach to a **Blog Management Library**.  
- In **Part 3**, we will repeat the process for a **Workout Tracking Library**.  

---

## **Part 1: Building a User Management Library with TDD**  

### **Step 1: Setting Up Our Project**  

1. Create a new folder for your project:  
   ```sh
   mkdir tdd-lab
   cd tdd-lab
   ```
2. Initialize a Node.js project:  
   ```sh
   npm init -y
   ```
3. Install Jest (our testing framework):  
   ```sh
   npm install jest --save-dev
   ```
4. Add this to `package.json` to enable Jest:  
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
5. Create a `userManager.js` file (our implementation).  
6. Create a `userManager.test.js` file (our test file).  

---

### **Step 2: Writing Our First Test (Red Phase)**  

We will start by writing a test for **adding users** before implementing the function.  

**userManager.test.js**  

```javascript
const { addUser, getUsers, resetUsers } = require("./userManager");

// Ensure a fresh state before each test
beforeEach(() => {
  resetUsers();
});

test("addUser() should add a user and return the new user object", () => {
  const user = addUser("Alice", "alice@example.com");

  expect(user).toEqual({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  });

  expect(getUsers()).toHaveLength(1);
});

test("getUsers() should return all added users", () => {
  addUser("Alice", "alice@example.com");
  addUser("Bob", "bob@example.com");

  const users = getUsers();
  expect(users).toHaveLength(2);
});

test("addUser() should return false if any field is missing", () => {
  expect(addUser("Alice")).toBe(false); // Missing email
});
```

If you run `npm test`, it will **fail** because `userManager.js` is empty.  
<!-- npm test -- userManager.test.js -->

---

### **Step 3: Writing the Code to Make Tests Pass (Green Phase)**  

Now, let's implement **just enough** code to pass the tests.  

**userManager.js**  

```javascript
let users = [];
let nextId = 1;

function resetUsers() {
  users = [];
  nextId = 1;
}

function addUser(name, email) {
  if (!name || !email) {
    return false;
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  return newUser;
}

function getUsers() {
  return users;
}

module.exports = { addUser, getUsers, resetUsers };
```

✅ **Run the tests again (`npm test`)** – they should now **pass**.  

---

### **Step 4: Refactoring (Refactor Phase)**  

Our code is already clean, but if we notice inefficiencies, we should refactor while keeping tests green.  


**Optimization 1:** Store users in an **object (map)** instead of an array for faster lookups.  

**Refactored userManager.js**  

```javascript
let users = new Map();
let nextId = 1;

function resetUsers() {
  users.clear();
  nextId = 1;
}

function addUser(name, email) {
  if (!name || !email) return false;

  const newUser = { id: nextId, name, email };
  users.set(nextId, newUser);
  nextId++;
  
  return newUser;
}

function getUsers() {
  return Array.from(users.values());
}

module.exports = { addUser, getUsers, resetUsers };
```

**Why is this better?**  
- Using a **Map** improves efficiency for lookups and deletions.  
- Converting users to an array only when needed optimizes performance.  

✅ **Run `npm test` – tests still pass after refactoring.**  

---

## **Part 2: Applying TDD to a Blog Management Library**  

Now, let's apply the same TDD process to a **blog system** where we can:  
- **Add blog posts**  
- **Get all blog posts**  

### **Step 1: Writing Tests First (Red Phase)**  

Create `blogManager.test.js` and write tests:  

**blogManager.test.js**  

```javascript
const { addBlog, getBlogs, resetBlogs } = require("./blogManager");

beforeEach(() => {
  resetBlogs();
});

test("addBlog() should add a blog post and return it", () => {
  const blog = addBlog("My First Blog", "This is content");

  expect(blog).toEqual({
    id: 1,
    title: "My First Blog",
    content: "This is content",
  });

  expect(getBlogs()).toHaveLength(1);
});

test("getBlogs() should return all added blogs", () => {
  addBlog("First Blog", "Content");
  addBlog("Second Blog", "More Content");

  expect(getBlogs()).toHaveLength(2);
});

test("addBlog() should return false if fields are missing", () => {
  expect(addBlog("Title")).toBe(false); // Missing content
});
```

🚨 Running the tests now will **fail** because we haven't implemented `blogManager.js`.  

---

### **Step 2: Writing Code to Pass Tests (Green Phase)**  

**blogManager.js**  

```javascript
let blogs = [];
let nextId = 1;

function resetBlogs() {
  blogs = [];
  nextId = 1;
}

function addBlog(title, content) {
  if (!title || !content) {
    return false;
  }

  const newBlog = { id: nextId++, title, content };
  blogs.push(newBlog);
  return newBlog;
}

function getBlogs() {
  return blogs;
}

module.exports = { addBlog, getBlogs, resetBlogs };
```

✅ **Run the tests again (`npm test`)** – they should now **pass**.  

---

### **Step 3: Refactoring (Refactor Phase)**  

If needed, we could improve the code.

**Refactored blogManager.js**  

```javascript
let blogs = new Map();
let nextId = 1;

function resetBlogs() {
  blogs.clear();
  nextId = 1;
}

function addBlog(title, content) {
  if (!title || !content) return false;

  const newBlog = { id: nextId, title, content };
  blogs.set(nextId, newBlog);
  nextId++;

  return newBlog;
}

function getBlogs() {
  return Array.from(blogs.values());
}

module.exports = { addBlog, getBlogs, resetBlogs };
```

**Why is this better?**  
- **Map improves lookup speed** for future features like **updating** or **deleting** posts.  
- Still passes all tests! ✅  

---

## **Part 3: Applying TDD to a Workout Tracking Library**  

Now, let’s build a **Workout Tracker** using TDD.  

### **Step 1: Writing Tests (Red Phase)**  

Create `workoutManager.test.js` and write:  

**workoutManager.test.js**  

```javascript
const { addWorkout, getWorkouts, resetWorkouts } = require("./workoutManager");

beforeEach(() => {
  resetWorkouts();
});

test("addWorkout() should add a workout and return it", () => {
  const workout = addWorkout("Running", 30);

  expect(workout).toEqual({
    id: 1,
    type: "Running",
    duration: 30,
  });

  expect(getWorkouts()).toHaveLength(1);
});

test("getWorkouts() should return all added workouts", () => {
  addWorkout("Running", 30);
  addWorkout("Swimming", 45);

  expect(getWorkouts()).toHaveLength(2);
});

test("addWorkout() should return false if fields are missing", () => {
  expect(addWorkout("Running")).toBe(false); // Missing duration
});
```

🚨 Running tests now **fails**.  

---

### **Step 2: Writing Code to Pass Tests (Green Phase)**  

**workoutManager.js**  

```javascript
let workouts = [];
let nextId = 1;

function resetWorkouts() {
  workouts = [];
  nextId = 1;
}

function addWorkout(type, duration) {
  if (!type || !duration) {
    return false;
  }

  const newWorkout = { id: nextId++, type, duration };
  workouts.push(newWorkout);
  return newWorkout;
}

function getWorkouts() {
  return workouts;
}

module.exports = { addWorkout, getWorkouts, resetWorkouts };
```

✅ **Run tests (`npm test`)** – they should pass.  


### **Step 3: Refactoring (Optimization Phase)**  

**Refactored workoutManager.js**  

```javascript
let workouts = new Map();
let nextId = 1;

function resetWorkouts() {
  workouts.clear();
  nextId = 1;
}

function addWorkout(type, duration) {
  if (!type || !duration) return false;

  const newWorkout = { id: nextId, type, duration };
  workouts.set(nextId, newWorkout);
  nextId++;

  return newWorkout;
}

function getWorkouts() {
  return Array.from(workouts.values());
}

module.exports = { addWorkout, getWorkouts, resetWorkouts };
```

