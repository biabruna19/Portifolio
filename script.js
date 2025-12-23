document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZAÇÃO DE ÍCONES
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. MODO CLARO/ESCURO
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light');
            const currentIcon = themeToggle.querySelector('i') || themeToggle.querySelector('svg');
            
            if (currentIcon) {
                // Atualiza o atributo para o Lucide reconhecer
                currentIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
                // Re-renderiza apenas os ícones necessários
                lucide.createIcons();
            }
        });
    }

    // 3. MENU MOBILE
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // 4. ANIMAÇÕES DE SCROLL (REVEAL)
    const observerOptions = { 
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Para o objetivo e outros elementos
                entry.target.classList.add('reveal-active');
                
                // Caso específico para o conteúdo interno do objetivo
                const content = entry.target.querySelector('.obj-interactive-content');
                if (content) {
                    content.classList.add('reveal');
                }
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem animar ao rolar
    const elementsToAnimate = document.querySelectorAll('.project-card, .mini-card, .edu-column, #objetivo');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-prepare'); 
        scrollObserver.observe(el);
    });
});

// Função para o efeito de máquina de escrever ao rolar
const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('start-typing');
            // Opcional: parar de observar após animar uma vez
            // typeObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.5 });

// Seleciona todos os textos que terão o efeito
document.querySelectorAll('.typing-effect').forEach(text => {
    typeObserver.observe(text);

});
