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