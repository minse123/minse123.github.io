// Projects filter
const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('bg-primary', 'text-white', 'active-filter'));
        filterButtons.forEach(btn => btn.classList.add('bg-white'));
        button.classList.remove('bg-white');
        button.classList.add('bg-primary', 'text-white', 'active-filter');
        
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

const mobileMenuButton = navbar ? navbar.querySelector('button.md\:hidden') : null;
console.log('Mobile menu button element:', mobileMenuButton);

if (mobileMenuButton) {
    navbar.insertBefore(themeToggle, mobileMenuButton);
} else {
    navbar.appendChild(themeToggle);
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save user preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Mobile menu toggle
const mobileNavButton = document.querySelector('nav button.md\:hidden');
const mobileNavMenu = document.querySelector('nav .hidden.md\:flex'); // This is the desktop menu, need to create a mobile one

if (mobileNavButton) {
    mobileNavButton.addEventListener('click', () => {
        // For simplicity, let's just toggle a class on the body or a dedicated mobile menu div
        // A more robust solution would involve creating a separate mobile menu element
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('md:hidden', 'fixed', 'inset-0', 'bg-white', 'dark:bg-dark', 'z-40', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-6', 'transition-transform', 'transform', 'translate-x-full');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.innerHTML = `
            <a href="#home" class="text-2xl hover:text-primary transition">Home</a>
            <a href="#about" class="text-2xl hover:text-primary transition">About</a>
            <a href="#services" class="text-2xl hover:text-primary transition">Services</a>
            <a href="#projects" class="text-2xl hover:text-primary transition">Projects</a>
            <a href="#contact" class="text-2xl hover:text-primary transition">Contact</a>
            <button id="close-mobile-menu" class="absolute top-4 right-4 text-gray-600 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
        document.body.appendChild(mobileMenu);

        // Animate in
        setTimeout(() => {
            mobileMenu.classList.remove('translate-x-full');
        }, 10);

        document.getElementById('close-mobile-menu').addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.addEventListener('transitionend', () => {
                mobileMenu.remove();
            }, { once: true });
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.addEventListener('transitionend', () => {
                    mobileMenu.remove();
                }, { once: true });
            });
        });
    });
}
