

const currentLocationHref = window.location.href;
const url = new URL(currentLocationHref);
const id = url.searchParams.get("id");

function formatDate(dateString) {
  const date = new Date(dateString);
    const months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December",
  ];

  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${months[monthIndex]} ${
    day < 10 ? "0" : ""
  }${day}, ${year}`;

  return formattedDate;
}

// get blogs from api
const loadBlog = async () => {
  const res = await fetch(
    `https://my-brand-backend-apis.onrender.com/api/blog/${id}`
  );

  if (!res.ok) {
    alert("blog not found");
    return (window.location.href = "../views/blog.html");
  }

  const data = await res.json();
   const currentBlog = data.blogWithComments;

  document.title = currentBlog.title;

  const blogImage = document.querySelector(".blogImage");
  blogImage.src = `${currentBlog.imageUrl}`;

  const blogTitle = document.querySelector(".blogTitle");
  blogTitle.innerHTML = currentBlog.title;

  const blogContent = document.querySelector(".content");
    blogContent.innerHTML = currentBlog.content;
    
  const blogDate = document.getElementById("date");
  blogDate.innerHTML = `${formatDate(currentBlog.date)}`;

  const Author = document.querySelector(".author");
Author.innerHTML = `${currentBlog.author.name}, ${currentBlog.author.email}`;

  const description = document.querySelector(".description");
  description.innerHTML = currentBlog.Description;
    
  const likes = document.querySelector(".post-rating-count");
  likes.style.cursor = "pointer";  

  likes.innerHTML = `${currentBlog.likes}`;

  const commentNumber = document.querySelector(".comment-count");
  commentNumber.innerHTML = currentBlog.comments.length;

  const blogID = document.querySelector("#data-post-id");
  blogID.value = currentBlog._id;
};

loadBlog();

// Load all blog


i
// secttion to hundle blogs create operations

const publish = documment.querySelectorAll('#save-publish');
const draft = document.querySelectorAll('save-as-draft');
const pendingReview = Document.getElementById('pending-review');
const discard = document.getElementById('discard');
const archive = document.getElementById('archive');
const update = document.querySelectorAll('.update');

// Get values
const title = document.querySelector('.title').value;
const content = document.querySelector('#content').value;
const description = document.querySelector('#Description').value;
const category = document.querySelector('#dateRange').value;
const tags = document.querySelector('#tags').value; 
const author = document.querySelector('#author').value;
const authorEmail = document.querySelector('#authorEmail').value;

if (!title || !content || !description || !category || !tags || !author || !authorEmail) { 
  alert("Please fill in all fields");
  // return;
}
let blog = {
    title: title,
    content: content,
    description: description,
    imageUrl: undefined,
  author: {
    name: author,
    email: authorEmail
  },
    category: category,
    tags: tags,
    likes: 0,
    comments: []
}

publish.addEventListener('click', async (blog) => {
  console.log('Publish button clicked!');

  // Save the blog post and post it
  const saved = await saveBlog(blog);

  if (!saved) {
    alert('Blog not saved');
    return;
  }
  publishBlog(blog);
});

const saveBlog = async (data) => { 
  console.log('Saveblog function called!');

    return fetch('https://my-brand-backend-apis.onrender.com/api/blog/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 404) {
          console.log('Endpoint not found');
        }
      if (!response.ok) {
          const errorMessage = response.json();
            throw new Error('Network connection was not ok', errorMessage);
        }
        return response.json();
    })
    .then(data => {
      console.log('Blog saved Successfully:', data);
      return true;
    })
    .catch((error) => {
      console.error('Error:', error);
      return false;
    });
}

const publishBlog = async (data) => {
  console.log('Publish blog function called!');
  document.querySelector('.article-title').innerHTML = data.title;
  document.querySelector('.content').innerHTML = data.content;
  document.querySelector('.post-rating-count').innerHTML = data.likes;
  document.querySelector('.post-commenting-count').innerHTML = data.comments.length;
}

// Blog update

const updateBlog = async () => {
  const currentLocationHref = window.location.href;
  const url = new URL(currentLocationHref);
  const id = url.searchParams.get("id");
  const res = await fetch(
    `https://my-brand-backend-apis.onrender.com/api/blog/${id}`
  );

  if (!res.ok) {
    alert("blog not found");
    return (window.location.href = "../views/blog.html");
  }
  const data = await res.json();

  title.value = data.title;
  content.value = data.content;
  description.value = data.Description;
  category.value = data.category;
  tags.value = data.tags;
  author.value = data.author.name;
  authorEmail.value = data.author.email;
  
  update.innerHTML = 'Save changes';

  update.addEventListener('click', saveBlog);
  

  const isBlogUpdated = updateBlog(id, blog);

  if (!isBlogUpdated) {
    alert('Blog not updated');
    return;
  }
  console.log('Update button clicked!');
}

update.addEventListener('click', updateBlog);

// Delete blog section

const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(button => {
  button.addEventListener('click', (e) => {

    const currentLocationHref = window.location.href;
    const url = new URL(currentLocationHref);
    const id = url.searchParams.get("id");

    const isBlogDeleted = deleteBlog(id);

    if (!isBlogDeleted) {
      alert('Blog not deleted');
      return;
    }
    console.log('Delete button clicked!');
  });
});

const deleteBlog = async (id) => {
  return fetch(`https://my-brand-backend-apis.onrender.com/api/blog/delete/${id}`, {
    method: 'DELETE'
  })
   .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
   .then(data => {
      console.log('Blog deleted Successfully:', data);
    })
   .catch((error) => {
      console.error('Error:', error);
    });
}

export { currentBlog } 