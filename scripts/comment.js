// JAVASCRIPT codes for the COMMENT buttons

import { currentBlog } from "./blogs";

// CODES FOR USER COMMENTS FORM 
const USERID = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null
  }
  
  const userComment = document.querySelector(".usercomment");
  const publishBtn = document.querySelector("#publish");
  const comments = document.querySelector(".comments");
  const userName = document.querySelector(".user");
  const notify = document.querySelector(".notifyinput");
  const postCommentingButton = document.querySelectorAll(".post-commenting-button");
  
  // postCommentingButton.addEventListener("click",
  
  userComment.addEventListener("input", e => {
    if (!userComment.value || !userName.value) {
      publishBtn.setAttribute("disabled", "disabled");
      publishBtn.classList.remove("abled")
    } else {
      publishBtn.removeAttribute("disabled");
      publishBtn.classList.add("abled")
    }
  })

const addComment = async () =>{
    
  if (!userComment.value || !userName.value) {
    alert("Please enter a comment or a name.");
    return;
  }
  
    USERID.name = userName.value;
      USERID.image = "../images/anonymous.png"
    USERID.message = userComment.value;
  USERID.date = new Date().toLocaleString();

  const newComment = {
    commenterName: userName.value,
    comment: userComment.value
  }

  const url =
  "https://my-brand-backend-apis.onrender.com/api/comments";

try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    
    const resError = await response.json();
    showToaster(resError.error, 5000);
  }

  if (response.ok) {
    
    const data = await response.json();
    showToaster(data.message, 3000);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
} catch (error) {
  
  showToaster("oops something goes wrong", 3000);
}
  
    let published =
      `<div class="parents">
        <img src="${USERID.image}">
        <div>
            <h1>${USERID.name}</h1>
            <p>${USERID.message}</p>
            <div class="engagements">
              <img src="../images/like.png" id="like">
              <img src="../images/share.png" alt=""></div>
            <span class="date">${USERID.date}</span>
        </div>    
    </div>`
  
    comments.innerHTML += published;
  userComment.value = "";
  userName.value = "";
    publishBtn.classList.remove("abled")
  
    let commentsNum = document.querySelectorAll(".parents").length;
    document.getElementById("comment").innerHTML = commentsNum;
    document.querySelector(".post-commenting-count").innerHTML = commentsNum;
  }
  
  publishBtn.addEventListener("click", addComment);
  

  const loadComment = () => {
    const currentBlogComments = currentBlog.comments;

    if (currentBlogComments.length > 0) {
      for (let i = 0; i < currentBlogComments.length; i++) {
        comments.innerHTML = `<div class="parents">
        <img src="${USERID.image}">
        <div>
            <h1>${USERID.name}</h1>
            <p>${USERID.message}</p>
            <div class="engagements">
              <img src="../images/like.png" id="like">
              <img src="../images/share.png" alt=""></div>
            <span class="date">${USERID.date}</span>
        </div>    
      </div>`;
      }
    }
  };
loadComment();
  
  
  //on top GO BACK button onclick event
  document.getElementById("goBackBtn").addEventListener("click", goBack);

// Function to navigate back in the browser's history
function goBack() {
    window.history.back();
}

//on bottom GO BACK button onclick event
document.getElementById("goBack").addEventListener("click", goBack);

// // Function to navigate back in the browser's history
// function goBack() {
//     window.history.back();
// }

//JAVASCRIPT codes for the COMMENT buttons

// CODES FOR USER COMMENTS

// const USERID = {
//     name: null,
//     identity: null,
//     image: null,
//     message: null,
//     date: null
// }

// const userComment = document.querySelector(".usercomment");
// const publishBtn = document.querySelector("#publish");
// const comments = document.querySelector(".comments");
// const userName = document.querySelector(".user");
// const notify = document.querySelector(".notifyinput");

//     userComment.addEventListener("input", e => {
//         if(!userComment.value) {
//             publishBtn.setAttribute("disabled", "disabled");
//             publishBtn.classList.remove("abled")
//         }else {
//             publishBtn.removeAttribute("disabled");
//             publishBtn.classList.add("abled")
//         }
//     })

//     function addPost() {
//         if(!userComment.value) return;
//         USERID.name = userName.value;
//         if(USERID.name === "Anonymous") {
//             USERID.identity = false;
//             USERID.image = "../images/anonymous.png"
//         }else {
//             USERID.identity = true;
//             USERID.image = "../images/user.png"
//         }

//         USERID.message = userComment.value;
//         USERID.date = new Date().toLocaleString();
//         let published = 
//         `<div class="parents">
//             <img src="${USERID.image}">
//             <div>
//                 <h1>${USERID.name}</h1>
//                 <p>${USERID.message}</p>
//                 <div class="engagements">
// 				<img src="../images/like.png" id="like">
// 				<img src="../images/share.png" alt=""></div>
//                 <span class="date">${USERID.date}</span>
//             </div>    
//         </div>`

//         comments.innerHTML += published;
//         userComment.value = "";
//         publishBtn.classList.remove("abled")

//         let commentsNum = document.querySelectorAll(".parents").length;
//         document.getElementById("comment").innerHTML = commentsNum;
//         document.getElementsByClassName("post-commenting-count").innerHTML = commentsNum;

//     }

//     publishBtn.addEventListener("click", addPost);



  

