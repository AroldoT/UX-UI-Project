function atualizarDashboard() {
  const filtroData = document.getElementById('filtro-data').value;
  const filtroItem = document.getElementById('filtro-item').value;
  const filtroMesa = document.getElementById('filtro-mesa').value;
  const filtroPagamento = document.getElementById('filtro-pagamento').value;

  let vendasFiltradas = historicoVendas;

  if (filtroData) {
      vendasFiltradas = vendasFiltradas.filter(v => v.data.toDateString() === new Date(filtroData).toDateString());
  }
  if (filtroItem) {
      vendasFiltradas = vendasFiltradas.filter(v => v.itens.some(i => i.nome === filtroItem));
  }
  if (filtroMesa) {
      vendasFiltradas = vendasFiltradas.filter(v => v.mesa === parseInt(filtroMesa));
  }
  if (filtroPagamento) {
      vendasFiltradas = vendasFiltradas.filter(v => v.formaPagamento === filtroPagamento);
  }

  atualizarResumoVendas(vendasFiltradas);
  atualizarItensMaisVendidos(vendasFiltradas);
  atualizarVendasPorMesa(vendasFiltradas);
  atualizarVendasPorPagamento(vendasFiltradas);
}

function atualizarResumoVendas(vendasFiltradas) {
  const resumoVendas = document.getElementById('resumo-vendas');
  const totalVendas = vendasFiltradas.reduce((total, v) => total + v.total, 0);
  resumoVendas.innerHTML = `
      <h3>Resumo de Vendas</h3>
      <p>Total de Vendas: R$ ${totalVendas.toFixed(2)}</p>
      <p>Número de Pedidos: ${vendasFiltradas.length}</p>
  `;
}

function atualizarItensMaisVendidos(vendasFiltradas) {
  const itensMaisVendidos = document.getElementById('itens-mais-vendidos');
  const itensTotais = vendasFiltradas.flatMap(v => v.itens);
  const itensAgrupados = itensTotais.reduce((acc, item) => {
      acc[item.nome] = (acc[item.nome] || 0) + item.quantidade;
      return acc;
  }, {});
  const itensSorted = Object.entries(itensAgrupados).sort((a, b) => b[1] - a[1]);
  itensMaisVendidos.innerHTML = `
      <h3>Itens Mais Vendidos</h3>
      <ol>
          ${itensSorted.slice(0, 5).map(([nome, qtd]) => `<li>${nome}: ${qtd}</li>`).join('')}
      </ol>
  `;
}

function atualizarVendasPorMesa(vendasFiltradas) {
  const vendasPorMesa = document.getElementById('vendas-por-mesa');
  const vendasMesa = vendasFiltradas.reduce((acc, v) => {
      acc[v.mesa] = (acc[v.mesa] || 0) + v.total;
      return acc;
  }, {});
  vendasPorMesa.innerHTML = `
      <h3>Vendas por Mesa</h3>
      <ul>
          ${Object.entries(vendasMesa).map(([mesa, total]) => `<li>Mesa ${mesa}: R$ ${total.toFixed(2)}</li>`).join('')}
      </ul>
  `;
}

function atualizarVendasPorPagamento(vendasFiltradas) {
  const vendasPorPagamento = document.getElementById('vendas-por-pagamento');
  const vendasPagamento = vendasFiltradas.reduce((acc, v) => {
      acc[v.formaPagamento] = (acc[v.formaPagamento] || 0) + v.total;
      return acc;
  }, {});
  vendasPorPagamento.innerHTML = `
      <h3>Vendas por Forma de Pagamento</h3>
      <ul>
          ${Object.entries(vendasPagamento).map(([forma, total]) => `<li>${forma}: R$ ${total.toFixed(2)}</li>`).join('')}
      </ul>
  `;
}

function inicializarFiltros() {
  const filtroItem = document.getElementById('filtro-item');
  cardapio.forEach(item => {
      const option = document.createElement('option');
      option.value = item.nome;
      option.textContent = item.nome;
      filtroItem.appendChild(option);
  });

  const filtroMesa = document.getElementById('filtro-mesa');
  mesas.forEach(mesa => {
      const option = document.createElement('option');
      option.value = mesa.id;
      option.textContent = `Mesa ${mesa.id}`;
      filtroMesa.appendChild(option);
  });
}