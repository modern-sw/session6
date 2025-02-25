const { addBlog, getBlogs, resetBlogs } = require("./blogManager");

beforeEach(() => {
  resetBlogs();
});

test("addBlog() should add a blog post and return it", () => {
  const blog = addBlog("My First Blog", "This is content");

  expect(blog).toEqual({
    id: 1,
    title: "My First Blog",
    content: "This is content",
  });

  expect(getBlogs()).toHaveLength(1);
});

test("getBlogs() should return all added blogs", () => {
  addBlog("First Blog", "Content");
  addBlog("Second Blog", "More Content");

  expect(getBlogs()).toHaveLength(2);
});

test("addBlog() should return false if fields are missing", () => {
  expect(addBlog("Title")).toBe(false); // Missing content
});