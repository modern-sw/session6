# Misc.

### Running Tests One by One in Jest

By default, running `npm test` will execute all of the tests in your application. However, when writing or debugging tests, it's often more efficient to run just one or a few specific tests rather than all of them. Jest offers several ways to achieve this.

#### Using `test.only`
One way to focus on specific tests is by using the `only` method. This allows you to tell Jest to run only the test(s) you mark with `test.only`:

```javascript
test.only("addOne() should return false if any parameter is missing", () => {
  expect(addOne("Buddy", "Dog", 3, "Brown")).toBe(false); // Missing weight
  expect(addOne()).toBe(false); // Missing all parameters
});
```

When Jest encounters `test.only`, **it will ignore all other tests** and only run the marked ones. However, be careful: it's easy to accidentally leave `test.only` in your code, which can cause future test runs to skip important tests.

#### Running Tests from the Command Line

Another option is to specify which tests to run directly from the command line, without modifying the code.

##### Running a Specific Test File
You can run a specific test file by passing the file path to the `npm test` command:
```bash
npm test -- tests/petManager.test.js
```

This will execute only the tests found in the `tests/petManager.test.js` file.

##### Running Tests by Name Pattern
You can also run tests by specifying a **name pattern**. This option allows you to run tests whose names (or describe block names) match a given string:
```bash
npm test -- --test-name-pattern="addOne() should add a pet and return the new pet object"
```

The argument for `--test-name-pattern` can be the full name of a test, a part of the name, or even the name of a `describe` block. For example, if you want to run all tests related to "empty array," you could use:

```bash
npm test -- --test-name-pattern="empty array"
```

This will run every test that includes "empty array" in its name.

### Caution with `test.only`
While `test.only` is useful, **be careful not to leave it in your code accidentally**. Doing so can cause Jest to skip important tests, potentially leading to false confidence that all tests are passing.
