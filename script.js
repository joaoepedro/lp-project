// Elementos do DOM
const faqItems = document.querySelectorAll('.faq-item');
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes')
};

// Data final para o countdown (7 dias a partir de agora)
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);

// Função para atualizar o countdown
function updateCountdown() {
    const now = new Date();
    const difference = endDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    countdownElements.days.textContent = String(days).padStart(2, '0');
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
}

// Atualizar countdown a cada minuto
setInterval(updateCountdown, 60000);
updateCountdown();

// Toggle FAQ items
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle do item atual
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll para links internos
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

// Animação de fade-in no scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para animar
const elementsToAnimate = document.querySelectorAll('.benefit-card, .step, .testimonial-card, .stat-item, .offer-content, .faq-item');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Validação do formulário (quando implementado)
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const name = form.querySelector('input[type="text"]');
    const phone = form.querySelector('input[type="tel"]');

    let isValid = true;
    let errorMessage = '';

    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        errorMessage = 'Por favor, insira um email válido.';
    }

    if (name && name.value.trim().length < 3) {
        isValid = false;
        errorMessage = 'Por favor, insira seu nome completo.';
    }

    if (phone && !phone.value.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
        isValid = false;
        errorMessage = 'Por favor, insira um telefone válido.';
    }

    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

// Adicionar classe fade-in aos elementos visíveis na carga inicial
document.addEventListener('DOMContentLoaded', () => {
    const visibleElements = document.querySelectorAll('.benefit-card, .step, .testimonial-card, .stat-item');
    visibleElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('fade-in');
        }
    });
});

// Carrossel de Depoimentos
const carousel = {
    container: document.querySelector('.testimonials-container'),
    cards: document.querySelectorAll('.testimonial-card'),
    prevButton: document.querySelector('.carousel-button.prev'),
    nextButton: document.querySelector('.carousel-button.next'),
    dotsContainer: document.querySelector('.carousel-dots'),
    currentIndex: 0,
    autoPlayInterval: null,

    init() {
        this.createDots();
        this.setupEventListeners();
        this.startAutoPlay();
    },

    createDots() {
        this.cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    },

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());

        // Pausar autoplay quando o mouse estiver sobre o carrossel
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    },

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },

    goToSlide(index) {
        this.cards[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.cards[this.currentIndex].classList.add('active');
        this.updateDots();
    },

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(nextIndex);
    },

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(prevIndex);
    },

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
};

// Inicializar o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    // ... existing code ...
}); 