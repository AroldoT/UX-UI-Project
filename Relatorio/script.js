function carregarRelatorio() {
  const relatorioDados = {
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR'),
      itens: [
          { nome: "Prato Principal", valor: 45.90 },
          { nome: "Bebida", valor: 8.50 },
          { nome: "Sobremesa", valor: 15.00 }
      ]
  };

  let conteudoHTML = `
      <div>Data: ${relatorioDados.data}</div>
      <div>Hora: ${relatorioDados.hora}</div>
      <div>Mesa: 15</div>
      <div style="margin-top: 15px;">
  `;

  let total = 0;
  relatorioDados.itens.forEach(item => {
      conteudoHTML += `
          <div class="item">
              <span>${item.nome}</span>
              <span>R$ ${item.valor.toFixed(2)}</span>
          </div>
      `;
      total += item.valor;
  });

  conteudoHTML += `
      </div>
      <div id="total">
          Total: R$ ${total.toFixed(2)}
      </div>
  `;

  document.getElementById('relatorio').innerHTML += conteudoHTML;
}

function enviarEmail() {
  const email = prompt("Digite o e-mail para envio:");
  if (email) {
      // Aqui você precisaria implementar a lógica de envio de e-mail
      alert(`Relatório enviado para ${email}. (Simulação)`);
  }
}

window.onload = carregarRelatorio;