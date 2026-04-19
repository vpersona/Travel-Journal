let isSharing = false;

window.sharePost = async function(postId) {
    if (isSharing) return;
    
    const posts = JSON.parse(localStorage.getItem('travel_posts')) || [];
    const post = posts.find(p => p.id == postId);
    
    if (!post) return;
    
    const shareText = `📍 ${post.city}\n📅 ${post.date}\n💭 ${post.description || 'Zobacz gdzie jestem!'}\n\nCoordinates: ${post.lat.toFixed(4)}, ${post.lon.toFixed(4)}`;
    
    isSharing = true;
    
    // sprawdz jakie urządzenie i czy obsługuje Web Share API
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (navigator.share && isMobile) {
        try {
            await navigator.share({
                title: `Travel Journal - ${post.city}`,
                text: shareText,
                url: window.location.href
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.log('Share failed:', err);
            }
        } finally {
            isSharing = false;
        }
    } else {
        // jeśli Web Share API nie jest dostępne, kopiuj do schowka
        const textToCopy = `${shareText}\n\nLink: ${window.location.href}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('✅ Skopiowano do schowka!', 'success');
            isSharing = false;
        }).catch((err) => {
            showToast('❌ Nie udało się skopiować', 'error');
            isSharing = false;
        });
    }
};

// powiadomienie toast
function showToast(message, type = 'info') {
    
    const oldToast = document.getElementById('share-toast');
    if (oldToast) oldToast.remove();
    
    
    const toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    toast.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // automatyczne usuwanie po 3 sekundach
    setTimeout(() => {
        toast.remove();
    }, 3000);
}