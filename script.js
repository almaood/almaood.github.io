
/* =====================================
   AL MAUOOD — PREMIUM STORE
   Main JavaScript
===================================== */

// MOBILE NAVIGATION

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        menuToggle.textContent =
            navLinks.classList.contains('active') ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
}


// HERO VIDEO AUTOPLAY

const heroVideo = document.querySelector('.hero-media video');

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    const playVideo = () => {
        heroVideo.play().catch(() => {
            console.log('Hero video autoplay is unavailable.');
        });
    };

    playVideo();
}


// PRODUCT CATEGORY FILTER

const categoryButtons = document.querySelectorAll('[data-category]');
const productCards = document.querySelectorAll('[data-product-category]');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;

        categoryButtons.forEach(item => {
            item.classList.remove('active');
        });

        button.classList.add('active');

        productCards.forEach(card => {
            const productCategory = card.dataset.productCategory;

            card.style.display =
                selectedCategory === 'all' ||
                productCategory === selectedCategory
                    ? ''
                    : 'none';
        });
    });
});


// PRODUCT IMAGE GALLERY

document.querySelectorAll('.product-gallery').forEach(gallery => {

    const mainImage = gallery.querySelector('.main-product-image');
    const thumbnails = gallery.querySelectorAll('.gallery-thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {

            if (mainImage) {
                mainImage.src = thumbnail.src;
            }

            thumbnails.forEach(item => {
                item.classList.remove('active');
            });

            thumbnail.classList.add('active');
        });
    });
});


// ADD TO CART

let cart = JSON.parse(localStorage.getItem('almauood_cart')) || [];

function saveCart() {
    localStorage.setItem('almauood_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {

    if (!product || !product.id) return;

    const existingProduct = cart.find(item =>
        item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    alert('Product added to your bag!');
}

function updateCartCount() {

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = count;
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, quantity) {

    const product = cart.find(item => item.id === productId);

    if (!product) return;

    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    product.quantity = quantity;
    saveCart();
}

function getCartTotal() {

    return cart.reduce((total, item) => {
        return total + (Number(item.price) * item.quantity);
    }, 0);
}

updateCartCount();


// WHATSAPP ORDER

const whatsappNumber = '923096789111';

function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert('Your shopping bag is empty!');
        return;
    }

    let message = 'Assalamualaikum! I want to place an order from Al Mauood.\n\n';

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `Price: Rs. ${item.price}\n\n`;
    });

    message += `Total: Rs. ${getCartTotal()}\n\n`;
    message += 'Please share the order details.';

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}


// NEWSLETTER

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
        event.preventDefault();

        alert('Thank you for your interest in Al Mauood!');

        newsletterForm.reset();
    });
}


// SCROLL ANIMATIONS

const fadeElements = document.querySelectorAll('.fade-up');

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

} else {

    fadeElements.forEach(element => {
        element.classList.add('show');
    });

}


// BACK TO TOP

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// FOOTER CURRENT YEAR

const yearElement = document.querySelector('.current-year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// SOCIAL MEDIA LINKS

const socialLinks = {
    instagram: 'https://www.instagram.com/al_mauood/',
    facebook: 'https://www.facebook.com/profile.php?id=100080461295090',
    email: 'mailto:almauood.co@gmail.com',
    whatsapp: 'https://wa.me/923096789111'
};

document.querySelectorAll('[data-social]').forEach(link => {

    const platform = link.dataset.social;

    if (socialLinks[platform]) {
        link.href = socialLinks[platform];
    }

});


// CONSOLE

console.log('AL MAUOOD Store JavaScript Loaded Successfully!');
