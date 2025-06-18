// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Scroll to Top
const scrollTopButton = document.querySelector('.scroll-top');

function toggleScrollTopButton() {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Product Search and Filter
function filterProducts() {
    const searchInput = document.querySelector('#search-input');
    const products = document.querySelectorAll('.product-card');
    const searchTerm = searchInput.value.toLowerCase();

    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        product.style.display = isVisible ? '' : 'none';
    });
}

// Wishlist Management
const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = btn.dataset.productId;
        btn.classList.toggle('active', wishlist.includes(productId));
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    lazyLoadImages();
    updateWishlistUI();

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleScrollTopButton);
    }

    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleWishlist(btn.dataset.productId));
    });
}); 