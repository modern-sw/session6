// let blogs = [];
// let nextId = 1;

// function resetBlogs() {
//   blogs = [];
//   nextId = 1;
// }

// function addBlog(title, content) {
//   if (!title || !content) {
//     return false;
//   }

//   const newBlog = { id: nextId++, title, content };
//   blogs.push(newBlog);
//   return newBlog;
// }

// function getBlogs() {
//   return blogs;
// }

// module.exports = { addBlog, getBlogs, resetBlogs };

let blogs = new Map();
let nextId = 1;

function resetBlogs() {
  blogs.clear();
  nextId = 1;
}

function addBlog(title, content) {
  if (!title || !content) return false;

  const newBlog = { id: nextId, title, content };
  blogs.set(nextId, newBlog);
  nextId++;

  return newBlog;
}

function getBlogs() {
  return Array.from(blogs.values());
}

module.exports = { addBlog, getBlogs, resetBlogs };