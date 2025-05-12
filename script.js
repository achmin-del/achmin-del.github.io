// Wait for DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // ==================
    // NAVBAR FUNCTIONALITY
    // ==================

    // Variables
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ==================
    // SKILLS ANIMATION
    // ==================

    // Animate skill bars when they come into view
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skill-progress');

    // Function to animate skill bars
    function animateSkills() {
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-percent');
            progress.style.width = value + '%';
        });
    }

    // Use Intersection Observer to trigger animation when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);

    // ==================
    // SMOOTH SCROLLING
    // ==================

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================
    // CONTACT FORM
    // ==================

    // Simple form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }

            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes, show success message
            // In a real project, you would send the form data to a server here
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }

    // ==================
    // TYPEWRITER EFFECT 
    // ==================

    // Simple typewriter effect for hero section
    const typeElement = document.querySelector('.hero-text h3');
    const textToType = typeElement.textContent;
    const typingDelay = 100;
    let charIndex = 0;

    typeElement.textContent = '';

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingDelay);
        }
    }

    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);

    // ==================
    // REVEAL ANIMATIONS
    // ==================

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.about-content, .skill-card, .project-card, .contact-item');

    // Create an intersection observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(element);
    });

    // Add the CSS class that triggers the animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
});