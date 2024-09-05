function gerarRelatorio(mesa, totalComTaxas, formaPagamento) {
  let relatorioHtml = `
      <h2>Relatório de Consumo - Mesa ${mesa.id}</h2>
      <p>Data: ${new Date().toLocaleString()}</p>
      <h3>Itens Consumidos:</h3>
      <ul>
  `;

  mesa.pedidos.forEach(p => {
      relatorioHtml += `<li>${p.nome} - R$ ${p.preco.toFixed(2)} x ${p.quantidade} = R$ ${(p.preco * p.quantidade).toFixed(2)}</li>`;
      console.log(p.nome)
  });
  
  let subtotal = mesa.pedidos.reduce((total, p) => total + p.preco * p.quantidade, 0);
  let taxaServico = document.getElementById('taxa-servico').checked ? subtotal * TAXA_SERVICO_PERCENTUAL : 0;
  let coverArtistico = document.getElementById('cover-artistico').checked ? COVER_ARTISTICO : 0;

  relatorioHtml += `
      </ul>
      <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      <p>Taxa de Serviço (10%): R$ ${taxaServico.toFixed(2)}</p>
      <p>Cover Artístico: R$ ${coverArtistico.toFixed(2)}</p>
      <p><strong>Total: R$ ${totalComTaxas.toFixed(2)}</strong></p>
      <p>Forma de Pagamento: ${formaPagamento}</p>
  `;

  const relatorioWindow = window.open('', '_blank', 'width=600,height=600');
  relatorioWindow.document.write(`
    <html>
      <head>
        <title>Relatório de Consumo - Mesa ${mesa.id}</title>
        <style>
            body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            }
            ul {
            list-style: none;
            }
            #relatorio {
            background-color: white;
            width: 300px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            }
            #cabecalho {
            text-align: center;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
            }
            #logo {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
            }
            .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            }
            #total {
            border-top: 1px dashed #000;
            padding-top: 10px;
            font-weight: bold;
            text-align: right;
            margin-top: 10px;
            }
            .no-print {
            text-align: center;
            margin-top: 20px;
            }
            button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            }
            @media print {
            body {
                background-color: white;
            }
            #relatorio {
                box-shadow: none;
            }
            .no-print {
                display: none;
            }
            }
        </style>
      </head>
      <body>
        <div id="relatorio-conteudo">${relatorioHtml}</div>
        <div class="no-print">
          <button onclick="window.print()">Imprimir</button>
          <button onclick="enviarEmail()">Enviar por E-mail</button>
        </div>
        <script>
          function enviarEmail() {
            const email = prompt("Digite o e-mail para envio:");
            if (email) {
              alert('Simulação: Relatório enviado para ' + email);
              // Aqui você implementaria a lógica real de envio de e-mail
            }
          }
        </script>
      </body>
    </html>
`);
  relatorioWindow.document.close();
}