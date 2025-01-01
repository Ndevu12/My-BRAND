import { BASE_URL } from '../config.js';

// Function to protect admin routes
export function protectAdminRoute() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'NotAllowed.html';
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('#loginButton');

  if (loginButton) {
  loginButton.addEventListener('click', async () => {
    const username = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;

    console.log({ username, password });
    
    if (!username || !password) {
        alert('All fields have to be provided.');
        return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        const token = result.data.accessToken;
        localStorage.setItem('token', token);
        console.log({token});


        alert(result.data.message);
        window.location.href = '../views/dashboard.html';
      } else {
        alert(`Error: ${result.message}`);
        console.error(`Error: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(`Error: ${error.message}`);
    }
  });
}

    // Function to handle admin logout
    function logout() {
      localStorage.removeItem('token');
      
      alert('You have been logged out');
      window.location.href = "signin.html";
    }
  
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    };
});
