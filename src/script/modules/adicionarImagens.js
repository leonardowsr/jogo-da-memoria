const containerCardEl = document.querySelector('.container-card');
const secaoMenuEl = document.querySelector('[data-js="section-menu"]');

const adicionarCards = arrayDeNomes => {
  for (let i = 0; i < arrayDeNomes.length; i++) {
    let imagem = document.createElement('img');
    imagem.src = `./src/img/back.png`;
    imagem.setAttribute('width', '150px');
    imagem.setAttribute('height', '180px');
    imagem.setAttribute('name', `${i}`);
    imagem.classList.add('card')
    containerCardEl.insertAdjacentElement('beforeend', imagem);
    
  }
  containerCardEl.classList.remove('hidden');
  secaoMenuEl.classList.add('hidden');
};

export { adicionarCards, containerCardEl, secaoMenuEl };
