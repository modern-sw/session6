const { addOne, getAll, petArray, resetState, update, deletePet } = require("./petManager5");

beforeEach(() => {
  console.log('Resetting the state before test...');
  resetState();
});

// --- Read Operation Test Suite ---
describe("Read Operation: getAll()", () => {
  test("getAll() should return an empty array if no pets have been added", () => {
    console.log("\nTesting getAll() with no pets...");
    expect(getAll()).toHaveLength(0);  // Check that no pets are present
  });

  test("getAll() should return an array with one pet after calling addOne()", () => {
    console.log("\nTesting getAll() after adding one pet...");
    addOne("Buddy", "Dog", 3, "Brown", 20);

    const allPets = getAll();
    console.log("Pets in the array:", allPets);

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
    console.log("\nTesting getAll() after adding multiple pets...");
    addOne("Buddy", "Dog", 3, "Brown", 20);
    addOne("Milo", "Cat", 2, "White", 5);

    const allPets = getAll();
    console.log("Pets in the array:", allPets);

    expect(allPets).toHaveLength(2);  // Check that the array has exactly 2 pets
  });
});

// --- Add Operation Test Suite ---
describe("Add Operation: addOne()", () => {
  test("addOne() should add a pet and return the new pet object", () => {
    console.log("\nTesting addOne() with valid parameters...");
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
    console.log("\nTesting addOne() with missing parameters...");
    expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false); // Missing weight
    expect(addOne()).toBe(false); // Missing all parameters
  });
});

// --- Update Operation Test Suite ---
describe("Update Operation: update()", () => {
  test("update() should update the pet details", () => {
    console.log("\nTesting update()...");
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
    console.log("\nTesting update() with invalid ID...");
    expect(update(999, { name: "Nonexistent Pet" })).toBe(false);  // Invalid ID
  });
});

// --- Delete Operation Test Suite ---
describe("Delete Operation: deletePet()", () => {
  test("deletePet() should delete a pet and return the deleted pet", () => {
    console.log("\nTesting deletePet()...");
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
    console.log("\nTesting deletePet() with invalid ID...");
    expect(deletePet(999)).toBe(false);  // Invalid ID
  });
});
