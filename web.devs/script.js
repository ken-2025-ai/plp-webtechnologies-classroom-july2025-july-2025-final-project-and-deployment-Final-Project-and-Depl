// Navigation and Page Management
        class WebsiteApp {
            constructor() {
                this.currentPage = 'home';
                this.init();
            }

            init() {
                this.setupNavigation();
                this.setupMobileMenu();
                this.setupScrollAnimations();
                this.setupContactForm();
                this.setupScrollEffects();
            }

            // Navigation Management
            setupNavigation() {
                const navLinks = document.querySelectorAll('.nav-link');
                const footerLinks = document.querySelectorAll('footer a[data-page]');
                const heroButtons = document.querySelectorAll('.btn[data-page]');
                
                // Combine all navigation elements
                const allNavElements = [...navLinks, ...footerLinks, ...heroButtons];
                
                allNavElements.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetPage = e.target.getAttribute('data-page');
                        if (targetPage) {
                            this.navigateToPage(targetPage);
                        }
                    });
                });
            }

            navigateToPage(pageName) {
                // Hide all pages
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => {
                    page.classList.add('page-hidden');
                });

                // Show target page
                const targetPage = document.getElementById(`${pageName}-page`);
                if (targetPage) {
                    targetPage.classList.remove('page-hidden');
                }

                // Update navigation
                this.updateNavigation(pageName);
                this.currentPage = pageName;

                // Close mobile menu if open
                this.closeMobileMenu();

                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Trigger animations for the new page
                setTimeout(() => {
                    this.animatePageElements();
                }, 100);
            }

            updateNavigation(activePage) {
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === activePage) {
                        link.classList.add('active');
                    }
                });
            }

            // Mobile Menu
            setupMobileMenu() {
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinks = document.querySelector('.nav-links');

                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                        this.closeMobileMenu();
                    }
                });
            }

            closeMobileMenu() {
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }

            // Scroll Animations
            setupScrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, observerOptions);

                // Observe all cards
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    observer.observe(card);
                });
            }

            animatePageElements() {
                const cards = document.querySelectorAll('.page:not(.page-hidden) .card');
                cards.forEach((card, index) => {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }

            // Contact Form
            setupContactForm() {
                const form = document.getElementById('contact-form');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleFormSubmission(form);
                    });

                    // Real-time validation
                    const inputs = form.querySelectorAll('input, textarea');
                    inputs.forEach(input => {
                        input.addEventListener('blur', () => {
                            this.validateField(input);
                        });
                    });
                }
            }

            validateField(field) {
                const formGroup = field.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                let isValid = true;

                // Remove previous error state
                formGroup.classList.remove('error');
                errorMessage.style.display = 'none';

                // Validation rules
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    errorMessage.textContent = `Please enter your ${field.name}`;
                } else if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        errorMessage.textContent = 'Please enter a valid email address';
                    }
                }

                // Show error if invalid
                if (!isValid) {
                    formGroup.classList.add('error');
                    errorMessage.style.display = 'block';
                }

                return isValid;
            }

            handleFormSubmission(form) {
                const inputs = form.querySelectorAll('input, textarea');
                let isFormValid = true;

                // Validate all fields
                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isFormValid = false;
                    }
                });

                if (isFormValid) {
                    // Simulate form submission
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalText = submitButton.textContent;
                    
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;

                    setTimeout(() => {
                        alert('Thank you for your message! I\'ll get back to you soon.');
                        form.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }
            }

            // Scroll Effects
            setupScrollEffects() {
                let lastScrollY = window.scrollY;
                const header = document.querySelector('header');

                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;

                    // Hide/show header on scroll
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScrollY = currentScrollY;
                });
            }
        }

        // Initialize the website when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new WebsiteApp();
        });

        // Add some additional interactive features
        document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add loading animation to buttons
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', function() {
                    if (!this.hasAttribute('data-page')) {
                        this.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 150);
                    }
                });
            });

            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    hero.style.transform = `translateY(${rate}px)`;
                });
            }

            // Type writer effect for hero text (optional enhancement)
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                setTimeout(typeWriter, 1000);
            }

            // Add hover effects to cards
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Progress bar for page loading (visual enhancement)
            const createProgressBar = () => {
                const progressBar = document.createElement('div');
                progressBar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 0%;
                    height: 3px;
                    background: var(--secondary-color);
                    z-index: 9999;
                    transition: width 0.3s ease;
                `;
                document.body.appendChild(progressBar);

                window.addEventListener('scroll', () => {
                    const scrollTop = document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercent = (scrollTop / scrollHeight) * 100;
                    progressBar.style.width = scrollPercent + '%';
                });
            };
            createProgressBar();

            // Easter egg: Konami code
            let konamiCode = [];
            const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
            
            document.addEventListener('keydown', (e) => {
                konamiCode.push(e.keyCode);
                if (konamiCode.length > konamiSequence.length) {
                    konamiCode.shift();
                }
                
                if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                    document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)';
                    document.body.style.backgroundSize = '400% 400%';
                    document.body.style.animation = 'rainbow 2s ease infinite';
                    
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes rainbow {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    setTimeout(() => {
                        document.body.style.background = '';
                        document.body.style.animation = '';
                        document.head.removeChild(style);
                    }, 5000);
                }
            });
        });