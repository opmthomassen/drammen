/* ===================================
   Drammen Scener - Mock-up JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('.material-icons');
            icon.textContent = icon.textContent === 'menu' ? 'close' : 'menu';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const relatedSitesHeight = document.querySelector('.related-sites').offsetHeight;
                const offset = headerHeight + relatedSitesHeight + 20;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('.material-icons').textContent = 'menu';
                }
            }
        });
    });

    // Form submission handler (demo)
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            // Show success message (demo)
            alert('Takk for din henvendelse! Vi tar kontakt snart.');
            this.reset();
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.venue-card, .package-card, .menu-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .venue-card.visible,
        .package-card.visible,
        .menu-category.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Add stagger delay for grid items
    document.querySelectorAll('.venues-grid .venue-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.packages-grid .package-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.menu-categories .menu-category').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Mobile nav styles (injected)
    const mobileNavStyles = document.createElement('style');
    mobileNavStyles.textContent = `
        @media (max-width: 768px) {
            .main-nav {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .main-nav.active {
                display: block !important;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .main-nav .nav-list {
                flex-direction: column;
                gap: 0;
            }

            .main-nav .nav-list li {
                width: 100%;
            }

            .main-nav .nav-list a {
                display: block;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
            }

            .main-nav .btn-contact {
                margin-top: 20px;
                text-align: center;
            }

            .dropdown {
                position: static;
                box-shadow: none;
                padding-left: 20px;
                display: none;
            }

            .has-dropdown.active .dropdown {
                display: block;
                opacity: 1;
                visibility: visible;
                transform: none;
            }
        }
    `;
    document.head.appendChild(mobileNavStyles);

    // Handle dropdown on mobile
    const dropdownItems = document.querySelectorAll('.has-dropdown > a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    console.log('Drammen Scener mock-up loaded successfully!');
});
