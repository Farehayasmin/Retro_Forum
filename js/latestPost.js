document.addEventListener('DOMContentLoaded', () => {
    console.log(document.getElementById('posts-container'));  // This should log the element if it's found
    fetchLatestPosts();
});

// Function to fetch latest posts from API
const fetchLatestPosts = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
        const data = await response.json(); // Parse the JSON response

        // Log the data to confirm the structure
        console.log("API Response: ", data);

        if (Array.isArray(data)) {
            // Call the function to display the posts with the fetched data
            displayLatestPosts(data);
        } else {
            console.error("Error: No valid data found or incorrect response format.");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// Function to display latest posts
const displayLatestPosts = (posts) => {
    const postsContainer = document.getElementById('posts-container'); // Ensure you have this container in HTML

    if (!postsContainer) {
        console.error("Error: 'posts-container' element not found in the DOM.");
        return;
    }

    postsContainer.innerHTML = ''; // Clear the container before displaying new posts

    posts.forEach(post => {
        // Create the card structure for each post
        const postCard = document.createElement('div');
        postCard.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'mb-4', 'bg-white');

        // Create the cover image element
        const coverImage = document.createElement('img');
        coverImage.src = post.cover_image;
        coverImage.alt = post.title;
        coverImage.classList.add('w-full', 'h-56', 'object-cover');
        postCard.appendChild(coverImage);

        // Create the card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('px-6', 'py-4');

        // Create the post title
        const postTitle = document.createElement('h3');
        postTitle.classList.add('font-semibold', 'text-xl', 'mb-2');
        postTitle.textContent = post.title;
        cardBody.appendChild(postTitle);

        // Create the post description
        const postDescription = document.createElement('p');
        postDescription.classList.add('text-gray-700', 'text-base');
        postDescription.textContent = post.description;
        cardBody.appendChild(postDescription);

        // Create the author details
        const authorDetails = document.createElement('div');
        authorDetails.classList.add('flex', 'items-center', 'mt-4');

        const profileImage = document.createElement('img');
        profileImage.src = post.profile_image;
        profileImage.alt = post.author.name;
        profileImage.classList.add('w-10', 'h-10', 'rounded-full', 'mr-2');
        authorDetails.appendChild(profileImage);

        const authorName = document.createElement('span');
        authorName.classList.add('font-semibold', 'text-sm');
        authorName.textContent = post.author.name;
        authorDetails.appendChild(authorName);

        // Add the post date and designation if available
        if (post.author.designation) {
            const postDate = document.createElement('span');
            postDate.classList.add('text-gray-500', 'text-sm', 'ml-2');
            postDate.textContent = ` - ${post.author.designation}`;
            authorDetails.appendChild(postDate);
        }

        const postDate = document.createElement('span');
        postDate.classList.add('text-gray-500', 'text-sm', 'ml-2');
        postDate.textContent = post.author.posted_date;
        authorDetails.appendChild(postDate);

        cardBody.appendChild(authorDetails);
        postCard.appendChild(cardBody);

        // Append the post card to the container
        postsContainer.appendChild(postCard);
    });
};
