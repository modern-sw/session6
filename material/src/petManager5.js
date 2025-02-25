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

