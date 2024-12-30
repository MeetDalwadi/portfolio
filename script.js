// Typing animation for the about section
const aboutText = "Hello! I'm a passionate developer with a love for creating beautiful and functional web applications.";
let index = 0;

function typeWriter() {
    const aboutParagraph = document.querySelector('.about-text p:first-child');
    if (index < aboutText.length) {
        aboutParagraph.innerHTML = `<i class="fas fa-quote-left"></i> ${aboutText.substring(0, index + 1)}<span class="cursor">|</span>`;
        index++;
        setTimeout(typeWriter, 50);
    } else {
        aboutParagraph.innerHTML = `<i class="fas fa-quote-left"></i> ${aboutText}`;
    }
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.width = targetWidth;
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Dynamic project cards
const projects = [
    {
        title: 'Project One',
        description: 'A brief description of your first project',
        tech: ['Technology 1', 'Technology 2', 'Technology 3'],
        icons: ['fas fa-cog', 'fas fa-cogs', 'fas fa-tools'],
        links: {
            live: '#',
            github: '#'
        }
    },
    {
        title: 'Project Two',
        description: 'A brief description of your second project',
        tech: ['Technology 1', 'Technology 2', 'Technology 3'],
        icons: ['fas fa-cog', 'fas fa-cogs', 'fas fa-tools'],
        links: {
            live: '#',
            github: '#'
        }
    }
];

function createProjectCard(project) {
    return `
        <div class="project-card">
            <h3 class="project-title"><i class="fas fa-project-diagram"></i> ${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map((tech, index) => `
                    <span class="tech-tag"><i class="${project.icons[index]}"></i> ${tech}</span>
                `).join('')}
            </div>
            <div class="project-links">
                <a href="${project.links.live}" class="btn"><i class="fas fa-eye"></i> View Project</a>
                <a href="${project.links.github}" class="btn"><i class="fab fa-github"></i> GitHub</a>
            </div>
        </div>
    `;
}

// Particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Dynamic navigation highlight
function updateNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Form handling with validation and animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formButton = contactForm.querySelector('button');
    const originalButtonText = formButton.innerHTML;
    
    // Validate form
    let isValid = true;
    formData.forEach((value, key) => {
        if (!value.trim()) {
            isValid = false;
            const input = contactForm.querySelector(`[name="${key}"]`);
            input.classList.add('error');
            setTimeout(() => input.classList.remove('error'), 3000);
        }
    });

    if (!isValid) return;

    // Simulate form submission
    formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formButton.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success animation
        formButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
        contactForm.reset();
        
        setTimeout(() => {
            formButton.innerHTML = originalButtonText;
            formButton.disabled = false;
        }, 3000);
    } catch (error) {
        formButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        setTimeout(() => {
            formButton.innerHTML = originalButtonText;
            formButton.disabled = false;
        }, 3000);
    }
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Dark mode toggle
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    createParticles();
    createDarkModeToggle();
    
    // Render projects
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(createProjectCard).join('');
    
    // Initialize scroll animations
    window.addEventListener('scroll', updateNavigation);
});

// Add smooth scrolling to all links
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

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Form submission handling
const originalContactForm = document.getElementById('contact-form');
originalContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(originalContactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    originalContactForm.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

// Smooth scroll for navigation links
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

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
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
