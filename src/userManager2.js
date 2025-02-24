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
