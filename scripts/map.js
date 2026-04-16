window.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([52.2297, 21.0122], 6);
    // using OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const posts = JSON.parse(localStorage.getItem('travel_posts')) || [];
    // This code gets the arrows on the photos to actually work so that photos taken in the same place are shown
    if (posts.length > 0) {
        // grouping posts by coordinates (we chceck which photos were taken in the same place and group them together)
        const groups = {};
        posts.forEach(post => {
            const key = `${post.lat.toFixed(4)}_${post.lon.toFixed(4)}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(post);
        });

        const allCoords = [];

        // adding markers for each group of photos taken in the same place
        Object.values(groups).forEach(group => {
            const first = group[0];
            const marker = L.marker([first.lat, first.lon]).addTo(map);
            allCoords.push([first.lat, first.lon]);

            // generating html for photos slider
            let slidesHtml = "";
            group.forEach((post, index) => {
                slidesHtml += `
                    <div class="my-slide slide-${first.id}" id="slide-${post.id}" style="display: ${index === 0 ? 'block' : 'none'};">
                        <img src="${post.image}" style="width:100%; border-radius:5px;">
                        <p><strong>${post.city}</strong></p>
                        <p style="font-size:11px;">${post.description || ''}</p>
                        <small>${post.date}</small>
                    </div>
                `;
            });

            // adding the arrows to slide the images if there are more than 1 photo taken in the same place
            const navigationHtml = group.length > 1 ? `
                <div class="text-center mt-2">
                    <button class="btn btn-sm btn-outline-primary" onclick="changeSlide('${first.id}', -1)">❮</button>
                    <span style="font-size:12px; margin: 0 10px;">${group.length} photos</span>
                    <button class="btn btn-sm btn-outline-primary" onclick="changeSlide('${first.id}', 1)">❯</button>
                </div>
            ` : "";

            marker.bindPopup(`<div style="width:180px;">${slidesHtml}${navigationHtml}</div>`);
        });

        if (allCoords.length > 0) {
            map.fitBounds(L.latLngBounds(allCoords), { padding: [50, 50] });
        }
    }
});

// changing between photos taken in the same place using the arrows
window.changeSlide = function(groupId, direction) {
    const slides = document.querySelectorAll(`.slide-${groupId}`);
    let currentIndex = 0;

    // find the currently visible slide
    slides.forEach((slide, index) => {
        if (slide.style.display === 'block') currentIndex = index;
    });

    // count the index of the next slide to show
    let newIndex = currentIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    // turn off the current slide and turn on the new one
    slides[currentIndex].style.display = 'none';
    slides[newIndex].style.display = 'block';
};