// Funcionalidades Nick



// Criando estrelas AI 
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;

    // Configurações
    const config = {
        stars: { count: 400, minSize: 1, maxSize: 3 }
    };

    // Criar estrelas iniciais para a página
    for (let i = 0; i < config.stars.count; i++) {
        createStar(starsContainer, config.stars.minSize, config.stars.maxSize);
    }
}

function createStar(container, minSize, maxSize) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * (maxSize - minSize) + minSize;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    container.appendChild(star);
}

// Função para criar partículas
function createParticles(element, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória ao longo do rastro
        const position = Math.random() * 100;
        particle.style.left = `${position}%`;
        
        // Tamanho aleatório
        const size = Math.random() * 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 1}s`;
        
        element.appendChild(particle);
        
        // Remove a partícula após a animação
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Função para criar partículas do rastro
function createTrailParticle(x, y, size) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    
    // Posiciona a partícula
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Define o tamanho
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Adiciona ao container
    document.querySelector('.stars-container').appendChild(particle);
    
    // Remove a partícula após a animação
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Inicializar estrelas quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createStars();
});