function renderizarMesas() {
  const listaMesas = document.getElementById('lista-mesas');
  listaMesas.innerHTML = '';
  mesas.forEach(mesa => {
      const botao = document.createElement('button');
      botao.textContent = `Mesa ${mesa.id}`;
      botao.classList.add('mesa-btn');
      if (mesa.ocupada) botao.classList.add('ocupada');
      botao.onclick = () => selecionarMesa(mesa.id);
      listaMesas.appendChild(botao);
  });
}

function selecionarMesa(id) {
  mesaSelecionada = id;
  const mesa = mesas.find(m => m.id === id);
  const detalhesMesa = document.getElementById('detalhes-mesa');
  detalhesMesa.innerHTML = `
      <h3>Mesa ${mesa.id}</h3>
      <p>Status: ${mesa.ocupada ? 'Ocupada' : 'Livre'}</p>
      <h4>Pedidos:</h4>
      <ul>
          ${mesa.pedidos.map(p => `<li>${p.nome} (${p.quantidade}x) - R$ ${p.preco * p.quantidade}</li>`).join('')}
      </ul>
      <p>Total: R$ ${mesa.pedidos.reduce((total, p) => total + p.preco * p.quantidade, 0)}</p>
      <button class="add-itens" id="btn-adicionar-item">+</button>
  `;
  document.getElementById('btn-adicionar-item').onclick = abrirCardapio;
}

function abrirCardapio() {
  const modal = document.getElementById('modal-cardapio');
  const listaCardapio = document.getElementById('lista-cardapio');
  listaCardapio.innerHTML = '';
  cardapio.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item-cardapio');
      div.innerHTML = `
          <span>${item.nome} - R$ ${item.preco}</span>
          <button onclick="adicionarItemAMesa(${item.id})">Adicionar</button>
      `;
      listaCardapio.appendChild(div);
  });
  modal.style.display = "block";
}

function fecharCardapio() {
  const modal = document.getElementById('modal-cardapio');
  modal.style.display = "none";
}

function atualizarDashboard() {
  // Implementação do dashboard (pode ser movida para um arquivo separado se necessário)
}