// JAVASCRIPT codes for the COMMENT buttons

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
  
  userComment.addEventListener("input", e => {
    if (!userComment.value) {
      publishBtn.setAttribute("disabled", "disabled");
      publishBtn.classList.remove("abled")
    } else {
      publishBtn.removeAttribute("disabled");
      publishBtn.classList.add("abled")
    }
  })
  
  function addPost() {
    if (!userComment.value) return;
    USERID.name = userName.value;
    if (USERID.name === "Anonymous") {
      USERID.identity = false;
      USERID.image = "../images/anonymous.png"
    } else {
      USERID.identity = true;
      USERID.image = "../images/user.png"
    }
  
    USERID.message = userComment.value;
    USERID.date = new Date().toLocaleString();
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
    publishBtn.classList.remove("abled")
  
    let commentsNum = document.querySelectorAll(".parents").length;
    document.getElementById("comment").innerHTML = commentsNum;
    document.querySelector(".post-commenting-count").innerHTML = commentsNum;
  }
  
  publishBtn.addEventListener("click", addPost);
  
  // Load comments for a specific article based on its ID
  window.addEventListener("DOMContentLoaded", (event) => {
    const articleId = getArticleIdFromUrl(); // function to extract article ID from the URL
    if (articleId) {
      loadCommentsForArticle(articleId); // function to load comments for the specific article
    }
  });
  
  function getArticleIdFromUrl() {
    // logic to extract the article ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  function loadCommentsForArticle(articleId) {
    // logic to load comments for the specific article
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

  //on top GO BACK button onclick event

  document.getElementById("goBackBtn").addEventListener("click", goBack);

// Function to navigate back in the browser's history
function goBack() {
    window.history.back();
}

//on bottom GO BACK button onclick event
document.getElementById("goBack").addEventListener("click", goBack);

// Function to navigate back in the browser's history
function goBack() {
    window.history.back();
}

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



  

