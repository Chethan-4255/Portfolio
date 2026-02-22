/**
 * Main Scripts
 * Handles simple interactions, lazy loading, and accessibility aids.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Basic lazy loading observation for images if any more are added
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                    }
                    image.classList.add('fade-in');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add subtle hover sound or effect log (optional non-intrusive)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // A visual queue is already handled via CSS, 
            // but JS could trigger tiny particle effects here if desired.
        });
    });
});
