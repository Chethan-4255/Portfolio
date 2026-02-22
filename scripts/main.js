/**
 * Main Scripts
 * Handles typing effect, mobile menu, lazy loading, and accessibility aids.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // 2. Typing Effect Logic
    const words = [
        "Young Tech Innovator",
        "Web Developer",
        "Problem Solver",
        "Cybersecurity Enthusiast",
        "Blockchain Developer"
    ];
    let currentWordIndex = 0;
    let currentText = "";
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenWords = 2000;

    function typeWriterEffect() {
        const typewriterElement = document.getElementById("typewriter");
        if (!typewriterElement) return;

        const fullWord = words[currentWordIndex];

        if (isDeleting) {
            currentText = fullWord.substring(0, currentText.length - 1);
        } else {
            currentText = fullWord.substring(0, currentText.length + 1);
        }

        typewriterElement.textContent = currentText;

        let timeoutSpeed = typeSpeed;

        if (isDeleting) {
            timeoutSpeed = deleteSpeed;
        }

        if (!isDeleting && currentText === fullWord) {
            timeoutSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && currentText === "") {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            timeoutSpeed = 500;
        }

        setTimeout(typeWriterEffect, timeoutSpeed);
    }

    // Start typing effect slightly delayed
    setTimeout(typeWriterEffect, 1000);

    // 3. Simple Lazy Loading for standard images
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

    // 4. "Show All" toggle functionality for linkedIn style lists
    const showAllButtons = document.querySelectorAll('.li-show-all');
    showAllButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const hiddenItems = document.querySelectorAll(`#${targetId} .hidden-item`);

            if (btn.textContent.includes('Show all')) {
                hiddenItems.forEach(item => {
                    item.style.display = 'flex';
                });
                btn.innerHTML = 'Show less <i class="fa-solid fa-arrow-up"></i>';
            } else {
                hiddenItems.forEach(item => {
                    item.style.display = 'none';
                });
                btn.innerHTML = 'Show all <i class="fa-solid fa-arrow-right"></i>';
            }
        });
    });
});
