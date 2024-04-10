//JAVASCRIPT codes for the LIKE buttons

document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".post-sharing");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-sharing-button");
		const count = rating.querySelector(".post-sharing-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-sharing-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("post-sharing-selected")) {
					const count = rating.querySelector(".post-sharing-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-sharing-selected");
				}
			});

			rating.classList.add("post-sharing-selected");

			const like = likeRating === rating;
			const response = await fetch(`/posts/${postId}/${like}`);
			const body = await response.json();
		});
	});
});
