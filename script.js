// ===== PROJECT SLIDER FUNCTIONALITY =====

// Get slider elements
const sliderContainer = document.getElementById('sliderContainer');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Current slide index (starts at 0)
let currentSlideIndex = 0;

// Total number of slides
const totalSlides = slides.length;

// Function to show a specific slide
function showSlide(index) {
    // Make sure index is within bounds
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    // Move the slider container to show the current slide
    // Each slide is 100% width, so we move by 100% * slide index
    const translateX = -currentSlideIndex * 100;
    sliderContainer.style.transform = `translateX(${translateX}%)`;

    // Update dots indicator
    updateDots();
}

// Function to update dot indicators
function updateDots() {
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current dot
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Function to change slide (called by navigation buttons)
function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Function to go to specific slide (called by dots)
function currentSlide(index) {
    showSlide(index - 1); // Subtract 1 because dots start from 1, array starts from 0
}

// Auto-slide functionality (optional)
function startAutoSlide() {
    setInterval(() => {
        changeSlide(1); // Move to next slide every 5 seconds
    }, 5000);
}

// Start auto-slide when page loads
startAutoSlide();

// ===== MOBILE MENU FUNCTIONALITY =====

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====

// Add click event to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the target section ID
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calculate offset for fixed navigation
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// ===== CONTACT FORM FUNCTIONALITY =====

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && subject && message) {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // Clear form
        this.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        // Here you would normally send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
    }
});

// ===== SKILL BARS ANIMATION ON SCROLL =====

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const aboutSection = document.getElementById('about');

    // Check if about section is in viewport
    const rect = aboutSection.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';

            // Animate to full width after a short delay
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
}

// Run skill bar animation on scroll
window.addEventListener('scroll', animateSkillBars);

// ===== INITIALIZE EVERYTHING WHEN PAGE LOADS =====

document.addEventListener('DOMContentLoaded', function() {
    // Show first slide
    showSlide(0);

    // Run skill bar animation once on load
    animateSkillBars();

    console.log('Portfolio website loaded successfully!');
});
