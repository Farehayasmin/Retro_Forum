
const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');

    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    displayPosts(posts);
};

const displayPosts = posts => {
    const postContainer = document.getElementById('post-container');
    // Clear the container to avoid duplicating posts if function is called again
    postContainer.innerHTML = '';

    posts.forEach(post => {
        console.log(post);
        // Create a div
        const postCard = document.createElement('div');
        postCard.classList = `card-compact bg-gray-300 w-96  m-5 shadow-xl`;

        // Set innerHTML
        postCard.innerHTML = ` 
            <figure>
                <img src="${post.author}" alt="${post.object}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${post.title}</h2>
                <p>${post.description || "No description available."}</p>
                <div class="card-actions justify-end">
                    
                </div>
            </div>
        `;

        // Append child
        postContainer.appendChild(postCard);
    });
};

loadPost();


