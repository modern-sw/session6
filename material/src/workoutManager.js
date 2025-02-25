// let workouts = [];
// let nextId = 1;

// function resetWorkouts() {
//   workouts = [];
//   nextId = 1;
// }

// function addWorkout(type, duration) {
//   if (!type || !duration) {
//     return false;
//   }

//   const newWorkout = { id: nextId++, type, duration };
//   workouts.push(newWorkout);
//   return newWorkout;
// }

// function getWorkouts() {
//   return workouts;
// }

// module.exports = { addWorkout, getWorkouts, resetWorkouts };
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