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
