import {
  adicionarCards,
  containerCardEl,
} from './modules/adicionarImagens.js';
import {
  dificuldadeFacil,
  dificuldadeNormal,
  dificuldadeDificil,
} from './modules/allArrays.js';
import mudarOrdemArray from './modules/mudarOrdemArray.js';

const dificuldadeEl = document.querySelector('[data-js="dificuldade"]');
const botaoIniciarEl = document.querySelector('[data-js="iniciarJogo"]');
const tituloTelaInicialEl = document.querySelector('[data-js="header"]');
const githubMensagemEl = document.querySelector('[data-js="footer"]');
const modalTelaEl = document.querySelector('[data-js="modal-score"]');
const botaoVoltarMenuEl = document.querySelector(
  '[data-js="voltar-ao-menu-botao"]'
);
const placarAcertoEl = document.querySelector('[data-js="placar-acertos"]')
const h2PlacarEl = document.querySelector('[data-js="placar"]')

const pontuacao = (() => {
  return {
    mostrarTelaDePontos: () => {
        modalTelaEl.classList.remove('hidden');
    },
  };
})();

function gameFunc(array) {
  const allCards = document.querySelectorAll('.card');
  const controleDePontos = pontuacao;
  const mostrarModalDePontos = controleDePontos.mostrarTelaDePontos;
  const urlImagemBack = './src/img/back.png'
  
  let contador = 0;
  let primeiroAlvo = 0;
  let segundoAlvo = 0;
  let pontos = 0

  containerCardEl.addEventListener('click', e => {
    let namePersonagem = e.target.name;
    const checarCardValido = e.target.classList.contains('card');
    const cardNaoSelec = !e.target.classList.contains('active');
    console.log(e.target)
    e.target.style.animationName = 'teste'
    if (checarCardValido) {
      if ((contador < 2) && cardNaoSelec) {
        if (contador < 1 ) {
          primeiroAlvo = namePersonagem;
          contador++;

        } else if(primeiroAlvo !== namePersonagem) {
          segundoAlvo = namePersonagem;  
          contador++;
        }
        e.target.src = `./src/img/${array[namePersonagem]}.png`;
        
      }
      
      if (contador === 2 && (primeiroAlvo >= 0 && segundoAlvo.length)) {

        if (array[primeiroAlvo] !== array[segundoAlvo]) {
        setTimeout(() =>  {
            allCards[primeiroAlvo].src = urlImagemBack;
            allCards[segundoAlvo].src = urlImagemBack;
            
            allCards[primeiroAlvo].style.animationName = ''
            allCards[segundoAlvo].style.animationName = ''

            contador = 0;
          }, 800);
        }
        if (
          (array[primeiroAlvo] === array[segundoAlvo]) &&
          (primeiroAlvo != segundoAlvo)
          ) {
            allCards[primeiroAlvo].classList.add('active');
            allCards[segundoAlvo].classList.add('active');
            
            allCards[primeiroAlvo].style.animationName = 'escurecer'
            allCards[segundoAlvo].style.animationName = 'escurecer'

            h2PlacarEl.textContent = `Você já acertou: ${pontos + 1} :)`
            pontos++

            allCards.forEach(card=>{
              if(!card.classList.contains('active')){
                console.log('nao tem')
                card.src = urlImagemBack
              }
            })
            if(pontos === (array.length / 2)){
              console.log('oi')
              setTimeout(mostrarModalDePontos,2000);
              pontos = 0
            }
            contador = 0;
          }
        }
      }
    });
  }

function esconderParaOgame() {
  tituloTelaInicialEl.classList.add('hidden');
  githubMensagemEl.classList.add('hidden');
}

function voltarAoMenu() {
  botaoVoltarMenuEl.addEventListener('click', e => {
    document.location.reload(true)
  });
}

const prepararJogo = (dificuldadeEl, classeDificuldade) => {
  adicionarCards(mudarOrdemArray(dificuldadeEl));
  containerCardEl.classList.add(classeDificuldade);
  gameFunc(dificuldadeEl);
  esconderParaOgame();
};

function iniciarJoguinho() {
  botaoIniciarEl.addEventListener('click', e => {
    switch (dificuldadeEl.value) {
      case 'facil':
        prepararJogo(dificuldadeFacil, 'facil');
        break;
      case 'normal':
        prepararJogo(dificuldadeNormal, 'normal');
        break;
      default:
        prepararJogo(dificuldadeDificil, 'dificil');
    }
    placarAcertoEl.classList.remove('hidden')
  });
}

voltarAoMenu();
iniciarJoguinho();
