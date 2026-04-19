window.addEventListener('DOMContentLoaded', function() {
    //fetching and compressing the image from localStorage
    const rawImage = localStorage.getItem('capturedImage');
    const imgElement = document.getElementById('captured-image');
    
    if (rawImage) {
        // creating canvas to compress the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tempImg = new Image();

        tempImg.onload = function() {
            const maxWidth = 800;
            const scale = maxWidth / tempImg.width;
            canvas.width = maxWidth;
            canvas.height = tempImg.height * scale;

            // drawing the img and compressing it
            ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

            // changing to jpeg with quality 0.7 (70%)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            
            // displaying the compressed image and saving it back to localStorage
            imgElement.src = compressedBase64;
            imgElement.style.display = 'block';
            localStorage.setItem('capturedImage', compressedBase64);
        };
        tempImg.src = rawImage;
    }

    // Fetching gps and location name
    const status = document.getElementById('status');
    const coordsDiv = document.getElementById('coordinates');
    const latShow = document.getElementById('lat');
    const lonShow = document.getElementById('lon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            status.style.display = 'none';
            coordsDiv.style.display = 'block';
            latShow.innerText = lat.toFixed(6);
            lonShow.innerText = lon.toFixed(6);
            
            localStorage.setItem('lastLat', lat);
            localStorage.setItem('lastLon', lon);

            // fetching city name using reverse geocoding (OpenStreetMap Nominatim API)
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                .then(res => res.json())
                .then(data => {
                    const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Unknown Location";
                    status.innerText = `City: ${city}`;
                    status.style.display = 'block';
                    localStorage.setItem('lastCity', city);
                })
                .catch(() => {
                    status.innerText = "City: (offline)";
                    status.style.display = 'block';
                });
        }, 
        (err) => { status.innerText = "City: GPS Error: " + err.message; },
        { enableHighAccuracy: true, timeout: 20000 });
    }
});

// Adding new post to localStorage and returning to main page
document.getElementById('add-post-btn').addEventListener('click', function() {
    const image = localStorage.getItem('capturedImage');
    const lat = localStorage.getItem('lastLat');
    const lon = localStorage.getItem('lastLon');
    const city = localStorage.getItem('lastCity') || "Unknown Location";
    const date = new Date().toLocaleDateString();
    const textAreaElement = document.getElementById('TextArea');
    const description = textAreaElement ? textAreaElement.value.trim() : "";

    if (!image || !lat) {
        alert("Wait for GPS and photo!");
        return;
    }

    const newPost = {
        id: Date.now(),
        image: image, 
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        city: city,
        date: date,
        description: description
    };

    const posts = JSON.parse(localStorage.getItem('travel_posts')) || [];
    posts.push(newPost);
    
    try {
        localStorage.setItem('travel_posts', JSON.stringify(posts));
        localStorage.removeItem('capturedImage'); 
        window.location.href = './main.html'; 
    } catch (e) {
        alert("Memory full! Cannot save the post.");
    }
});