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