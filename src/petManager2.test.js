const {
  addOne,
  getAll,
  petArray,
  resetState,
} = require("./petManager2");

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
