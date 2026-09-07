/* ============================================
   OCEAN DEV PORTFOLIO - JAVASCRIPT
   ============================================ */

// ---- Bubble Generator ----
function createBubbles() {
    const container = document.getElementById('bubblesContainer');
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 30 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 15 + 10) + 's';
        bubble.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(bubble);
    }
}

// ---- Typed Text Effect ----
function initTypedText() {
    const typedEl = document.getElementById('typedText');
    const words = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'Freelancer', 'Ocean Lover'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// ---- Navbar Scroll Effect ----
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Scrolled style
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ---- Skill Bars Animation ----
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
}

// ---- Stat Counter Animation ----
function initStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

// ---- Project Filter ----
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    card.style.display = 'block';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ---- Reveal on Scroll ----
function initReveal() {
    const reveals = document.querySelectorAll('.section-header, .about-grid, .skill-card, .project-card, .ocean-item, .contact-grid, .video-card');

    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

// ---- Lightbox ----
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const oceanItems = document.querySelectorAll('.ocean-item img');

    oceanItems.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ---- Video Player ----
function toggleVideo(videoId, btn) {
    const video = document.getElementById(videoId);
    const icon = btn.querySelector('i');

    if (video.paused) {
        // Pause all other videos
        document.querySelectorAll('video').forEach(v => {
            if (v.id !== videoId) {
                v.pause();
                const otherBtn = v.closest('.video-wrapper').querySelector('.video-play-btn i');
                if (otherBtn) {
                    otherBtn.classList.remove('fa-pause');
                    otherBtn.classList.add('fa-play');
                }
            }
        });

        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Make toggleVideo globally accessible
window.toggleVideo = toggleVideo;

// ---- Back to Top ----
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple feedback (ganti dengan AJAX request untuk produksi)
        const btn = form.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
        btn.style.background = 'linear-gradient(135deg, #00d68f, #00b377)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ---- Smooth Scroll for Anchor Links ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ---- Parallax on Hero ----
function initParallax() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-bg-img');
        if (hero && window.scrollY < window.innerHeight) {
            hero.style.transform = `scale(1.1) translateY(${window.scrollY * 0.3}px)`;
        }
    });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    initTypedText();
    initNavbar();
    initMobileMenu();
    initSkillBars();
    initStatCounter();
    initProjectFilter();
    initReveal();
    initLightbox();
    initBackToTop();
    initContactForm();
    initSmoothScroll();
    initParallax();
});
