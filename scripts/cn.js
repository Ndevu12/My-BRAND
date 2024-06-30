// files tho hundle blogs related operations

const publish = documment.getElementById('save-publish');
const draft = document.getElementById('save-as-draft');
const pendingReview = Document.getElementById('pending-review');
const discard = document.getElementById('discard');
const archive = document.getElementById('archive');

publish.addEventListener('click', () => {
    // Save the blog post and post it
    saveBlog();
    publishBlog();
    saveBlogAsDraft();
});

let blog = {
    title: title.value,
    content: content.value,
    description: Description.value,
    imageUrl: undefined,
    author: '',
    category: category.value,
    tags: tags.value,
    likes: 0,
    comments: []
}