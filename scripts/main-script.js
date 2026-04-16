document.getElementById('camera-input').addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('capturedImage', e.target.result);
            window.location.href = 'newpost.html';
        }
        reader.readAsDataURL(event.target.files[0]);
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.querySelector('#posts-container');
    const noPostsMessage = document.querySelector('.no-posts');
    const posts = JSON.parse(localStorage.getItem('travel_posts')) || [];

    if (posts.length > 0) {
        if (noPostsMessage) noPostsMessage.style.display = 'none';

        // render posts (newest first)
        posts.reverse().forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'card mb-3';
            postElement.innerHTML = `
                <img src="${post.image}" class="card-img-top" alt="Travel photo">
                <div class="card-body">
                    <h5 class="card-title">${post.city}</h5>
                    <p class="card-text"><small class="text-muted">${post.date}</small></p>
                    <p class="card-text">GPS: ${post.lat.toFixed(4)}, ${post.lon.toFixed(4)}</p>
                    <p class="card-text">${post.description ||''}</p>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }
});