function adicionarItemAMesa(itemId) {
  if (!mesaSelecionada) {
    alert("Selecione uma mesa primeiro.");
    return;
  }
  const mesa = mesas.find(m => m.id === mesaSelecionada);
  const item = cardapio.find(i => i.id === itemId);
  const pedidoExistente = mesa.pedidos.find(p => p.id === itemId);
  if (pedidoExistente) {
    pedidoExistente.quantidade++;
  } else {
    mesa.pedidos.push({ ...item, quantidade: 1 });
  }
  mesa.ocupada = true;
  renderizarMesas();
  selecionarMesa(mesaSelecionada);
  fecharCardapio();
}

function abrirModalUnirMesas() {
  const modal = document.getElementById('modal-unir-mesas');
  const listaMesasUnir = document.getElementById('lista-mesas-unir');
  listaMesasUnir.innerHTML = '';
  mesas.forEach(mesa => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `unir-mesa-${mesa.id}`;
    checkbox.value = mesa.id;
    const label = document.createElement('label');
    label.htmlFor = `unir-mesa-${mesa.id}`;
    label.textContent = `Mesa ${mesa.id}`;
    listaMesasUnir.appendChild(checkbox);
    listaMesasUnir.appendChild(label);
    listaMesasUnir.appendChild(document.createElement('br'));
  });
  modal.style.display = "block";
}

function unirMesas() {
  const mesasSelecionadas = Array.from(document.querySelectorAll('#lista-mesas-unir input:checked')).map(cb => parseInt(cb.value));
  if (mesasSelecionadas.length < 2) {
    alert("Selecione pelo menos duas mesas para unir.");
    return;
  }
  const mesaPrincipal = mesas.find(m => m.id === mesasSelecionadas[0]);
  mesasSelecionadas.slice(1).forEach(mesaId => {
    const mesaSecundaria = mesas.find(m => m.id === mesaId);
    mesaPrincipal.pedidos = mesaPrincipal.pedidos.concat(mesaSecundaria.pedidos);
    mesaSecundaria.pedidos = [];
    mesaSecundaria.ocupada = false;
  });
  mesaPrincipal.ocupada = true;
  renderizarMesas();
  selecionarMesa(mesaPrincipal.id);
  document.getElementById('modal-unir-mesas').style.display = "none";
}