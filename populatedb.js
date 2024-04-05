#! /usr/bin/env node

console.log(
    'This script populates some test Blog, authors, blogCategory and project to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  import blog from "./BackEnd/models/Blog.js";
  import Author from "./BackEnd/models/author.js";
  import blogCategory from "./BackEnd/models/blogCategories.js";

  const categories = [];
  const authors = [];
  const Blogs = [];
  
  
  import mongoose from "mongoose";

  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await CreateCategory();
    await createAuthors();
    await createBlog();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the tags to the ...Create functions so that, for example,
  // categorie[0] will always be the Fantasy categorie, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function CreateblogCategory(name) {
    const category = new blogCategory({ name: name });
    await category.save();
    console.log(`Added categorie: ${name}`);
  }
  
  async function authorCreate(Blogs, name ) {
    const authordetail = { postId: Blogs, name: name };

    const author = new Author(authordetail);
  
    await author.save();
    // authors[tags] = author;
    console.log(`Added author: ${name} ${Blogs}`);
  }
  
  async function blogCreate(tags, title, content, comments, author, categorie) {
    const Blogdetail = {
      title: title,
      content: content,
      author: author,
      comments: comments,
      tags: tags,
    };
    if (categorie != false) Blogdetail.categorie = categorie;
  
    const Blog = new blog(Blogdetail);
    await Blog.save();
    
    console.log(`Added Blog: ${title}`);
  }
  

  async function CreateCategory() {
    console.log("Adding categories");
    await Promise.all([
      CreateblogCategory("Scienc"),
      CreateblogCategory("Technology"),
      CreateblogCategory("Critical thinking"),
      CreateblogCategory("Business"),
      CreateblogCategory("Social Life"),
    ]);
  }
  
  async function createAuthors() {
    console.log("Adding authors");
    await Promise.all([
      authorCreate(Blogs[0], "Patrick"),
      authorCreate(Blogs[2], "Ben"),
      authorCreate(Blogs[3], "Isaac"),
      authorCreate(Blogs[1], "Bob"),
      authorCreate(Blogs[2], "Jim"),
    ]);
  }
  
  async function createBlog() {
    console.log("Adding Blogs");
    await Promise.all([
      blogCreate(Science,
        "The Name of the Wind (The Kingkiller Chronicle, #1)",
        "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
        [4,4,5,6,6,9],
        authors[0],
        [categories[0]]
      ),
      blogCreate([Technology, AI],
        "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
        "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
        [4,4,5,6,6,9],
        authors[0],
        [categories[0]]
      ),
      blogCreate([Technology, AI],
        "The Slow Regard of Silent Things (Kingkiller Chronicle)",
        "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
        [4,4,5,6,6,9],
        authors[0],
        [categories[0]]
      ),
      blogCreate(3,
        "Apes and Angels",
        "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
        [4,4,5,6,6,9],
        authors[1],
        [categories[1]]
      ),
      blogCreate([Future, AI],
        "Death Wave",
        "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
        [4,4,5,6,6,9],
        authors[1],
        [categories[1]]
      ),
      blogCreate([Technology, AI],
        "Test Blog 1",
        "content of test Blog 1",
        [4,4,5,6,6,9],
        authors[4],
        [categories[0], categories[1]]
      ),
      blogCreate([Technology, AI],
        "Test Blog 2",
        "content of test Blog 2",
        [4,4,5,6,6,9],
        authors[4],
        false
      ),
    ]);
  }
  