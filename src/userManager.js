// let users = [];
// let nextId = 1;

// function resetUsers() {
//   users = [];
//   nextId = 1;
// }

// function addUser(name, email) {
//   if (!name || !email) {
//     return false;
//   }

//   const newUser = { id: nextId++, name, email };
//   users.push(newUser);
//   return newUser;
// }

// function getUsers() {
//   return users;
// }

// module.exports = { addUser, getUsers, resetUsers };

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