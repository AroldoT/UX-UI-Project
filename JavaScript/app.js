function inicializar() {
  renderizarMesas();
  inicializarFiltros();
  atualizarDashboard();
  configurarEventListeners();
}

function configurarEventListeners() {
  document.getElementById('btn-cardapio').addEventListener('click', abrirCardapio);
  document.getElementById('btn-finalizar-mesa').addEventListener('click', finalizarMesa);
  document.getElementById('btn-unir-mesas').addEventListener('click', abrirModalUnirMesas);
  document.getElementById('btn-confirmar-uniao').addEventListener('click', unirMesas);
  document.getElementById('aplicar-filtros').addEventListener('click', atualizarDashboard);

  const fecharModais = document.getElementsByClassName('fechar');
  for (let i = 0; i < fecharModais.length; i++) {
      fecharModais[i].onclick = function() {
          this.parentElement.parentElement.style.display = 'none';
      };
  }

  window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = "none";
      }
  };
}

window.onload = inicializar;