function finalizarMesa() {
  if (!mesaSelecionada) {
      alert("Selecione uma mesa para finalizar.");
      return;
  }
  const mesa = mesas.find(m => m.id === mesaSelecionada);
  const total = mesa.pedidos.reduce((total, p) => total + p.preco * p.quantidade, 0);

  document.getElementById('total-mesa').textContent = total.toFixed(2);

  const modalPagamento = document.getElementById('modal-pagamento');
  modalPagamento.style.display = "block";

  document.getElementById('btn-pagamento-parcial').onclick = () => pagarParcialmente(mesa, total);
  document.getElementById('btn-realizar-pagamento').onclick = () => realizarPagamento(mesa, total);
}

function pagarParcialmente(mesa, total) {
  const valorParcial = parseFloat(prompt("Valor a ser pago parcialmente:"));
  if (isNaN(valorParcial) || valorParcial <= 0) {
      alert("Valor inválido para pagamento parcial.");
      return;
  }

  let totalComTaxas = calcularTotalComTaxas(total);

  if (valorParcial > totalComTaxas) {
      alert("Valor parcial maior que o total com taxas.");
      return;
  }

  totalComTaxas -= valorParcial;
  alert(`Pagamento parcial realizado. Valor restante: R$ ${totalComTaxas.toFixed(2)}`);

  document.getElementById('total-mesa').textContent = totalComTaxas.toFixed(2);
}

function realizarPagamento(mesa, total) {
  let totalComTaxas = calcularTotalComTaxas(total);

  const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked').value;
  alert(`Pagamento realizado no valor de R$ ${totalComTaxas.toFixed(2)} via ${formaPagamento}.`);

  historicoVendas.push({
      data: new Date(),
      mesa: mesa.id,
      itens: [...mesa.pedidos],
      total: totalComTaxas,
      formaPagamento: formaPagamento
  });

  vendasTotais += totalComTaxas;
  mesa.ocupada = false;
  mesa.pedidos = [];

  fecharPagamento();
  renderizarMesas();
  atualizarDashboard();
  selecionarMesa(mesaSelecionada);
  gerarRelatorio(mesa, totalComTaxas, formaPagamento);
}

function calcularTotalComTaxas(total) {
  let totalComTaxas = total;
  if (document.getElementById('cover-artistico').checked) {
      totalComTaxas += COVER_ARTISTICO;
  }
  if (document.getElementById('taxa-servico').checked) {
      totalComTaxas += total * TAXA_SERVICO_PERCENTUAL;
  }
  return totalComTaxas;
}

function fecharPagamento() {
  const modalPagamento = document.getElementById('modal-pagamento');
  modalPagamento.style.display = "none";
}