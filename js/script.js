document.addEventListener('DOMContentLoaded', function() {
    // --- Start of general debugging messages (useful during development) ---
    console.log("DOM content loaded. Check console and network tab for any loading issues.");
    // --- End of general debugging messages ---

    // Smooth scrolling for navigation links and scroll-down indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Enable smooth scrolling
                });

                // Close Bootstrap navbar on mobile after clicking a link
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Set current year in footer dynamically
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Intersection Observer for various scroll-triggered animations
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.3 // Trigger when 30% of the element is visible (makes elements appear sooner)
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve the element once it has animated, if you want animations to play only once per page load
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove the 'active' class when out of view, for animations to replay
                // entry.target.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements that have the animation classes and observe them
    document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .slide-in-left, .slide-in-right, .scale-in-bounce' // Added .scale-in-bounce
    ).forEach(element => {
        observer.observe(element);
    });

    // Contact Form Submission Handling (Client-side example - no backend integration)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formMessage.style.display = 'block';
                formMessage.className = 'mt-3 text-center text-danger';
                formMessage.textContent = 'Please fill in all required fields.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.style.display = 'block';
                formMessage.className = 'mt-3 text-center text-danger';
                formMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            console.log('Form Data Submitted:', { name, email, subject, message });

            formMessage.style.display = 'block';
            formMessage.className = 'mt-3 text-center text-success';
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';

            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
