//JAVASCRIPT codes for the LIKE buttons

document.querySelectorAll(".post").forEach(post => {

	const currentLocationHref = window.location.href;
	const url = new URL(currentLocationHref);
	const id = url.searchParams.get("id");

	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}
			try {
				const response = await fetch(
				  `https://my-brand-backend-apis.onrender.com/api/blog/like/${id}`,
				  {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					},
				  }
				);
		  
				if (!response.ok) {
				  const resError = await response.json();
				  showToaster(resError.error, 5000);
				}
		  
				if (response.ok) {
					const data = await response.json();
					const likeCount = data.likes;
					querySelector(".post-rating-count").textContent = likeCount;
				  setTimeout(() => {
					window.location.reload();
				  }, 3000);
				}
			  } catch (error) {
				console.log(error);
			  }

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});
			rating.classList.add("post-rating-selected");

			const like = likeRating === rating;
			const response = await fetch(`/posts/${id}/${like}`);
			const body = await response.json();
		});
	});
});
