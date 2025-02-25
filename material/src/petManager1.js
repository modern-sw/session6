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


module.exports = { addOne, petArray, resetState};

