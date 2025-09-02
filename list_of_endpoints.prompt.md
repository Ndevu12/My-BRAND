# API Integration Task for AI Model

Connect the existing client-side application to the backend API endpoints. The frontend UI components are already implemented - the task is to add the necessary JavaScript code to integrate with the server.

## Base URL

The base URL for all API endpoints will be provided separately. No prefix is needed.

## Authentication

The backend uses cookie-based authentication rather than bearer tokens:
- When a user logs in, the JWT token is automatically stored in an HTTP-only cookie by the server
- For protected routes, the cookie is automatically sent with each request
- No need to manually include Authorization headers in requests
- The cookie handling is managed by the browser

## Available Endpoints

### Auth Endpoints
- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **GET** `/auth/me` - Get current user (admin only)
- **DELETE** `/auth/users` - Delete all users (admin only)

### Blog Endpoints
- **GET** `/blogs/public?page=1&limit=10` - Get all blogs (public)
- **GET** `/blogs/public/recent` - Get latest blogs (public)
- **GET** `/blogs/public/:id` - Get specific blog by ID (public)
- **GET** `/blogs/by-category/:id` - Get blogs by category
- **GET** `/blogs/by-title` - Get blog by title
- **GET** `/blogs/by-tag` - Get blogs by signle tag
- **POST** `/blogs/create` - Create new blog (admin only)
- **PUT** `/blogs/update/:id` - Update blog (author or admin)
- **DELETE** `/blogs/delete/:id` - Delete blog (author or admin)
- **GET** `/blogs/:id` - Get blog with comments (admin or subscriber)
- **GET** `/blogs` - Get all blogs (admin view)
- **PUT** `/blogs/like/:id` - Like a blog (authenticated users)
- **GET** `/blogs/author/:id` - Get author by blog ID
- **GET** `/blogs/by-slug/:slug` - Get blog by slug 

### Blog Category Endpoints
- **POST** `/blog-category/create` - Create category (admin only)
- **GET** `/blog-category/:id` - Get category by ID
- **PUT** `/blog-category/update/:id` - Update category (admin only)
- **DELETE** `/blog-category/delete/:id` - Delete category (admin only)
- **GET** `/blog-category` - Get all blog categories

### Comment Endpoints
- **POST** `/comment/add` - Add a comment
- **DELETE** `/comment/:id` - Delete comment (admin or subscriber)

### Message Endpoints
- **POST** `/message/contactme` - Send contact message
- **GET** `/message/:id` - Get message by ID (admin only)
- **GET** `/message` - Get all messages (admin only)
- **DELETE** `/message/delete/:id` - Delete message (admin only)

### Notification Endpoints
- **POST** `/notification/create` - Create notification
- **PUT** `/notification/update/:id` - Update notification
- **GET** `/notification/:id` - Get notification by ID
- **GET** `/notification` - Get all notifications
- **DELETE** `/notification/delete/:id` - Delete notification (admin only)

### Subscriber Endpoints
- **POST** `/subscriber/create` - Create subscriber
- **PUT** `/subscriber/update/:id` - Update subscriber (admin or subscriber)
- **GET** `/subscriber/:id` - Get subscriber by ID (admin only)
- **GET** `/subscriber` - Get all subscribers (admin only)
- **DELETE** `/subscriber/delete/:id` - Delete subscriber (admin only)

### User Profile Endpoints
- **GET** `/profile/me` - Get my profile (authenticated)
- **PUT** `/profile/me` - Update my profile (authenticated)
- **DELETE** `/profile/me` - Delete my profile (authenticated)
- **GET** `/profile/:userId` - Get public profile by user ID

### Home Endpoint
- **GET** `/` - Home page

---

## Blog Feature Integration Instructions

Integrate the following API endpoints with the existing client-side blog components. Focus on connecting the UI elements to their corresponding server endpoints using JavaScript.

### 1. Displaying Public Blogs

#### Fetch All Blogs (Public View)
```javascript
// Create a function to fetch all public blogs
async function getAllBlogs() {
  try {
    const response = await fetch('BASE_URL/blogs/public');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Display a Single Blog by ID
```javascript
async function getBlogById(id) {
  try {
    const response = await fetch(`BASE_URL/blogs/public/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### 2. Filtering Blogs

#### Get Blogs by Category
```javascript
async function getBlogsByCategory(categoryId) {
  try {
    const response = await fetch(`BASE_URL/blogs/by-category/${categoryId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs by category');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Search Blogs by Title
```javascript
async function searchBlogsByTitle(title) {
  try {
    const response = await fetch(`BASE_URL/blogs/by-title?title=${encodeURIComponent(title)}`);
    if (!response.ok) {
      throw new Error('Failed to search blogs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### 3. Blog Categories Integration

#### Fetch All Blog Categories
```javascript
async function getAllCategories() {
  try {
    const response = await fetch('BASE_URL/blog-category');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### 4. Authentication for Blog Management (Admin Features)

#### Login For Authentication
```javascript
async function login(email, password) {
  try {
    const response = await fetch('BASE_URL/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      // This is important to allow cookies to be set by the server
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    // No need to manually store the token - it's in the HTTP-only cookie
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Create a New Blog Post (Admin only)
```javascript
async function createBlog(blogData) {
  // Create form data for multipart/form-data (for image upload)
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', blogData.title);
  formData.append('content', blogData.content);
  formData.append('categoryId', blogData.categoryId);
  
  // Add image if provided
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  try {
    const response = await fetch('BASE_URL/blogs/create', {
      method: 'POST',
      // Include credentials to send the authentication cookie
      credentials: 'include',
      // No need for Authorization header as auth is handled by cookies
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Update an Existing Blog Post
```javascript
async function updateBlog(id, blogData) {
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', blogData.title);
  formData.append('content', blogData.content);
  formData.append('categoryId', blogData.categoryId);
  
  // Add image if provided
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  try {
    const response = await fetch(`BASE_URL/blogs/update/${id}`, {
      method: 'PUT',
      credentials: 'include', // Include authentication cookies
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Delete a Blog Post
```javascript
async function deleteBlog(id) {
  try {
    const response = await fetch(`BASE_URL/blogs/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Include authentication cookies
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### 5. Blog Interaction Features

#### Like a Blog
```javascript
async function likeBlog(id) {
  try {
    const response = await fetch(`BASE_URL/blogs/like/${id}`, {
      method: 'PUT',
      credentials: 'include', // Include authentication cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to like blog');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

#### Add a Comment to a Blog
```javascript
async function addComment(blogId, commentData) {
  try {
    const response = await fetch('BASE_URL/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId,
        name: commentData.name,
        email: commentData.email,
        content: commentData.content,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### 6. User Subscription

#### Subscribe to the Blog
```javascript
async function subscribe(email, name) {
  try {
    const response = await fetch('BASE_URL/subscriber/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

## Integration Requirements

1. Connect existing client-side UI components to the server API endpoints.
2. Update the existing frontend code to make proper API calls to the backend.
3. Implement API integration for data retrieval, creation, updates, and deletion.
4. Add proper error handling for all API requests in the existing client code.
5. Enhance the existing UI with loading indicators during API calls.
6. Ensure all form submissions include proper validation before sending to the API.
7. Configure all API requests with `credentials: 'include'` to properly handle cookie-based authentication.
8. Update the UI to properly handle all API response states (loading, success, error).
9. Add client-side caching where appropriate to reduce API calls.
10. Implement pagination for listing features if supported by the API.

## Integration Order

1. Connect the existing blog display components with the blog API endpoints.
2. Implement API integration for blog filtering and search features.
3. Connect the authentication UI with the auth API endpoints.
4. Integrate admin blog management features with their corresponding endpoints.
5. Wire up comment and like functionality to the relevant API endpoints.
6. Connect the subscription form to the subscriber API endpoint.

## Required API Integrations for Initial Release

1. Blog listing with search and category filtering functionality
2. Blog detail view with comments integration
3. Authentication system (login/register/logout)
4. Admin blog management operations (create, update, delete)
5. Contact form submission
6. Newsletter subscription functionality

## Future API Integrations

1. User profile management functionality
2. Enhanced admin dashboard with complete content management
3. Real-time notification system
4. Analytics data collection and visualization
5. Social media sharing integration

---

*Replace BASE_URL with the actual API base URL in all code examples. All authenticated requests must include `credentials: 'include'` to ensure that cookies are sent with the request. The client-side UI components are already implemented - this task is specifically focused on connecting those components to the backend API endpoints through proper JavaScript integration with cookie-based authentication.*
