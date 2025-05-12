// HEADER STARS
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 200; // Número de estrelas

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posição aleatória
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Tamanho aleatório
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Duração e opacidade aleatórias
        star.style.setProperty('--duration', `${1 + Math.random() * 3}s`);
        star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
        
        starsContainer.appendChild(star);
    }
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

// Função para criar estrelas cadentes
function createShootingStars() {
    const starsContainer = document.querySelector('.stars-container');
    
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Posição inicial aleatória no topo
        const startX = Math.random() * window.innerWidth * 0.8;
        const startY = 0;
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        
        starsContainer.appendChild(shootingStar);
        
        // Cria partículas do rastro
        let lastX = startX;
        let lastY = startY;
        const trailInterval = setInterval(() => {
            // Calcula a nova posição (movimento diagonal)
            lastX += 15;
            lastY += 15;
            
            // Cria partículas do rastro
            createTrailParticle(lastX, lastY, 1 + Math.random());
            
            // Para de criar partículas quando a estrela sair da tela
            if (lastX > window.innerWidth || lastY > window.innerHeight) {
                clearInterval(trailInterval);
            }
        }, 50);
        
        // Remove a estrela após a animação
        setTimeout(() => {
            shootingStar.remove();
            clearInterval(trailInterval);
        }, 3000);
    }, 5000);
}

// Função para criar cometas
function createComets() {
    const starsContainer = document.querySelector('.stars-container');
    
    setInterval(() => {
        const comet = document.createElement('div');
        comet.className = 'comet';
        
        // Posição inicial aleatória no topo
        const startX = Math.random() * window.innerWidth * 0.8;
        const startY = 0;
        comet.style.left = `${startX}px`;
        comet.style.top = `${startY}px`;
        
        starsContainer.appendChild(comet);
        
        // Cria partículas do rastro
        let lastX = startX;
        let lastY = startY;
        const trailInterval = setInterval(() => {
            // Calcula a nova posição (movimento diagonal)
            lastX += 20;
            lastY += 20;
            
            // Cria partículas do rastro
            createTrailParticle(lastX, lastY, 1.5 + Math.random());
            
            // Para de criar partículas quando o cometa sair da tela
            if (lastX > window.innerWidth || lastY > window.innerHeight) {
                clearInterval(trailInterval);
            }
        }, 30);
        
        // Remove o cometa após a animação
        setTimeout(() => {
            comet.remove();
            clearInterval(trailInterval);
        }, 4000);
    }, 8000);
}

// Inicializa os efeitos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Cria o container de estrelas se não existir
    if (!document.querySelector('.stars-container')) {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        document.querySelector('header').appendChild(starsContainer);
    }
    
    createStars();
    createShootingStars();
    createComets();
});