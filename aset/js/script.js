// Projects filter
const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white', 'dark:bg-primary-dark', 'dark:text-dark_text');
            btn.classList.add('bg-white', 'text-gray-900', 'dark:bg-dark_card', 'dark:text-dark_text');
        });
        button.classList.remove('bg-white', 'text-gray-900', 'dark:bg-dark_card', 'dark:text-dark_text');
        button.classList.add('bg-primary', 'text-white', 'dark:bg-primary-dark', 'dark:text-white');
        
        const filter = button.dataset.filter;
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Theme toggle
const themeToggle = document.createElement('button');
themeToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
`;
themeToggle.classList.add('p-2', 'rounded-full', 'bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200', 'hover:bg-gray-300', 'dark:hover:bg-gray-600', 'transition', 'duration-300');
themeToggle.id = 'theme-toggle';

const navbar = document.querySelector('nav .container > div');
console.log('Navbar element:', navbar);

const mobileMenuButton = document.getElementById('mobile-menu-toggle');
console.log('Mobile menu button element:', mobileMenuButton);

if (mobileMenuButton) {
    navbar.insertBefore(themeToggle, mobileMenuButton);
} else {
    navbar.appendChild(themeToggle);
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Save user preference
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}

// Mobile menu toggle
const mobileNavButton = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');

if (mobileNavButton && mobileMenu) {
    mobileNavButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    mobileMenu.querySelectorAll('a[data-menu-close]').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });
}
