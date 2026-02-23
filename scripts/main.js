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
    // 5. Universal Modal Logic
    const initModal = () => {
        // Create modal DOM elements if they don't exist
        if (!document.getElementById('universal-modal')) {
            const modalHTML = `
                <div id="universal-modal" class="modal-overlay">
                    <div class="modal-content-wrapper">
                        <button id="modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
                        <img id="modal-image" src="" alt="Enlarged View">
                        <iframe id="modal-pdf" src=""></iframe>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const modal = document.getElementById('universal-modal');
        const modalImg = document.getElementById('modal-image');
        const modalPdf = document.getElementById('modal-pdf');
        const closeBtn = document.getElementById('modal-close');

        const openModal = (url, type) => {
            modalImg.style.display = 'none';
            modalPdf.style.display = 'none';

            if (type === 'image') {
                modalImg.src = url;
                modalImg.style.display = 'block';
            } else if (type === 'pdf') {
                modalPdf.src = url;
                modalPdf.style.display = 'block';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalImg.src = '';
                modalPdf.src = '';
            }, 300); // Clear after fade out
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(); // Close if clicking outside wrapper
        });

        // Attach to all elements inside .li-thumbnails
        // Also handling direct image tags and links that don't belong to buttons
        document.querySelectorAll('.li-thumbnails a, .li-thumbnails img').forEach(el => {
            if (el.tagName.toLowerCase() === 'a' && el.classList.contains('li-credential-btn')) {
                return; // Dont hijack actual external credential buttons
            }
            if (el.tagName.toLowerCase() === 'a' && el.classList.contains('li-live-btn')) {
                return; // Dont hijack live site buttons
            }

            el.addEventListener('click', (e) => {
                let url = '';
                let type = 'image';

                if (el.tagName.toLowerCase() === 'a') {
                    url = el.getAttribute('href');
                    if (!url || url === '#') return;

                    // Check if it links to media (images, PDFs, or LinkedIn secure image links)
                    const isMedia = url.match(/\.(jpeg|jpg|gif|png|pdf)(\?.*)?$/i) ||
                        url.includes('media.licdn.com/dms/image') ||
                        url.includes('CERTS/') ||
                        url.includes('Images/') ||
                        url.includes('drive.google.com');

                    if (!isMedia) {
                        return; // Let standard web URLs act normally (like live site links)
                    }
                    e.preventDefault(); // Stop navigation, handle in modal

                    // Convert Google Drive share links to embeddable preview links
                    if (url.includes('drive.google.com')) {
                        const driveMatch = url.match(/\/file\/d\/([^/]+)/);
                        if (driveMatch) {
                            url = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
                        }
                        type = 'pdf';
                        openModal(url, type);
                        return;
                    }
                } else if (el.tagName.toLowerCase() === 'img') {
                    // Check if parent is a link, if so let the link handler do it
                    if (el.closest('a')) return;
                    url = el.getAttribute('src');
                    // Avoid placeholder images
                    if (url.includes('via.placeholder.com')) return;
                }

                if (!url) return;

                if (url.toLowerCase().includes('.pdf')) {
                    type = 'pdf';
                }

                openModal(url, type);
            });
        });
    };

    // run after a slight delay to ensure all DOM elements are parsed
    setTimeout(initModal, 100);

});


// ============================================================
// VISUAL POLISH ENHANCEMENTS
// ============================================================

// 4. Subtle parallax on mousemove for cube-container
(() => {
  const container = document.querySelector('.cube-container');
  if (!container) return;
  const cubes = [...container.querySelectorAll('.cube')];
  window.addEventListener('mousemove', (e) => {
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    cubes.forEach((c, idx) => {
      const depth = (idx + 1) * 6;
      const tx = cx * depth;
      const ty = cy * depth;
      c.style.transform = `translate(${tx}px, ${ty}px) rotate3d(1,1,0,${(idx + 1) * 30}deg)`;
    });
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.display = 'none';
  }
})();

// 11. Keyboard close for modal
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('universal-modal');
  if (!modal) return;
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.click();
  }
});
