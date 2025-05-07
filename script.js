const respostasCorretas = {
    pergunta1: 'SondaVoyager1',
    pergunta2: 'buraco negro', // Aceita variações no JS
    pergunta3: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
    pergunta4: '1969-07-20', // Data do pouso na Lua (pode aceitar só o ano)
    pergunta5: ['Júpiter', 'Saturno', 'Urano'],
    pergunta7: 'MA',
    pergunta8: 'Pilares da Criação'
};

const mensagensPontuacao = [
    { faixa: [0,2], msg: 'Não desista, foco nos estudos!' },
    { faixa: [3,4], msg: 'Chegou perto, mas ainda falta.' },
    { faixa: [5,6,7], msg: 'Você mandou bem, mas pode ir melhor!' },
    { faixa: [8], msg: 'As estrelas brilharam pra você, incrível, você acertou todas!' }
];

// Função para normalizar strings (remover acentos, caixa baixa)
function normalizar(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .toLowerCase()
        .trim();
}

function calcularPontuacao() {
    let pontos = 0;
    // Pergunta 1
    const p1 = document.querySelector('input[name="pergunta1"]:checked');
    if (p1 && p1.value === respostasCorretas.pergunta1) pontos++;
    // Pergunta 2
    const p2 = document.getElementById('p2').value;
    if (normalizar(p2).includes('buraco negro')) pontos++;
    // Pergunta 3
    const p3 = document.getElementById('ap3').value;
    if (respostasCorretas.pergunta3.test(p3)) pontos++;
    // Pergunta 4
    const p4 = document.querySelector('input[type="date"]');
    if (p4 && (p4.value.startsWith('1969'))) pontos++;
    // Pergunta 5
    const p5 = Array.from(document.querySelectorAll('input[name="pergunta5"]:checked')).map(cb => cb.value);
    if (
        p5.length === 3 &&
        respostasCorretas.pergunta5.every(planeta => p5.includes(planeta)) &&
        p5.every(planeta => respostasCorretas.pergunta5.includes(planeta))
    ) pontos++;
    // Pergunta 7
    const p7 = document.getElementById('p7').value;
    if (p7 === respostasCorretas.pergunta7) pontos++;
    // Pergunta 8
    const p8 = document.getElementById('p8').value;
    if (normalizar(p8).includes('pilares')) pontos++;
    return pontos;
}

function mostrarRespostasCorretas() {
    return `
    <div class="respostas-corretas" style="margin-top:24px;text-align:left;font-size:1.1rem;background:rgba(10,20,40,0.85);padding:18px 16px;border-radius:12px;box-shadow:0 2px 12px #0a0a2344;">
        <strong>Respostas corretas:</strong>
        <ul style="list-style:square inside;line-height:1.7;">
            <li><b>Pergunta 1:</b> Sonda Voyager 1</li>
            <li><b>Pergunta 2:</b> Buraco negro</li>
            <li><b>Pergunta 4:</b> 1969 (20/07/1969)</li>
            <li><b>Pergunta 5:</b> Júpiter, Saturno, Urano</li>
            <li><b>Pergunta 7:</b> Maranhão (MA)</li>
            <li><b>Pergunta 8:</b> Pilares da Criação</li>
        </ul>
    </div>
    `;
}

function mostrarResultado(pontos) {
    let msg = '';
    for (const faixa of mensagensPontuacao) {
        if (faixa.faixa.includes(pontos) || (faixa.faixa[0] <= pontos && faixa.faixa[faixa.faixa.length-1] >= pontos)) {
            msg = faixa.msg;
            break;
        }
    }
    let resultadoDiv = document.getElementById('resultadoQuiz');
    if (!resultadoDiv) {
        resultadoDiv = document.createElement('div');
        resultadoDiv.id = 'resultadoQuiz';
        document.querySelector('main').appendChild(resultadoDiv);
    }
    resultadoDiv.innerHTML = `<span class="nasa-icon"></span><span class="roscosmos-icon"></span><br><strong>Sua pontuação: ${pontos}/8</strong><br>${msg}<div id="efeitoEstrelas"></div>${mostrarRespostasCorretas()}`;
    resultadoDiv.style.display = 'block';
    animarEstrelas();
}

// Função para animar estrelas brilhando
function animarEstrelas() {
    const efeito = document.getElementById('efeitoEstrelas');
    efeito.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        const estrela = document.createElement('span');
        estrela.textContent = '★';
        estrela.style.position = 'absolute';
        estrela.style.left = Math.random() * 90 + '%';
        estrela.style.top = Math.random() * 80 + '%';
        estrela.style.fontSize = (Math.random() * 18 + 12) + 'px';
        estrela.style.color = ['#fff', '#90caf9', '#e53935'][Math.floor(Math.random()*3)];
        estrela.style.opacity = Math.random() * 0.7 + 0.3;
        estrela.style.animation = `estrelaBrilha ${Math.random()*1.5+0.8}s infinite alternate`;
        efeito.appendChild(estrela);
    }
    efeito.style.position = 'relative';
    efeito.style.height = '60px';
}

// Adiciona keyframes para estrelas
const style = document.createElement('style');
style.innerHTML = `@keyframes estrelaBrilha { from { opacity: 0.3; } to { opacity: 1; } }`;
document.head.appendChild(style);

// Adiciona evento ao último botão de submit do quiz
window.addEventListener('DOMContentLoaded', function() {
    // Adiciona um botão de finalizar ao final do quiz
    let btnFinalizar = document.createElement('button');
    btnFinalizar.textContent = 'Finalizar Quiz';
    btnFinalizar.style.display = 'block';
    btnFinalizar.style.margin = '32px auto 0 auto';
    btnFinalizar.style.fontSize = '1.2rem';
    document.querySelector('main').appendChild(btnFinalizar);
    btnFinalizar.addEventListener('click', function(e) {
        e.preventDefault();
        const pontos = calcularPontuacao();
        mostrarResultado(pontos);
        btnFinalizar.disabled = true;
        btnFinalizar.textContent = 'Quiz Finalizado';
    });
    // Remove submits individuais dos forms
    document.querySelectorAll('form button').forEach(btn => btn.style.display = 'none');
});

document.addEventListener('DOMContentLoaded', () => {
    const introducaoSection = document.querySelector('.introducao');
    const quizSection = document.querySelector('.quiz-section');
    const comecarQuizBtn = document.querySelector('.comecar-quiz');

    comecarQuizBtn.addEventListener('click', () => {
        // Adiciona uma animação de fade out na seção de introdução
        introducaoSection.style.opacity = '0';
        introducaoSection.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            // Esconde a seção de introdução
            introducaoSection.style.display = 'none';
            
            // Mostra a seção do quiz com fade in
            quizSection.style.display = 'block';
            quizSection.style.opacity = '0';
            
            // Força um reflow para garantir que a animação funcione
            quizSection.offsetHeight;
            
            quizSection.style.opacity = '1';
            quizSection.style.transition = 'opacity 0.5s ease';
        }, 500);
    });
}); 