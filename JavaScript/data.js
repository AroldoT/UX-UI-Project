let mesas = [
  { id: 1, ocupada: false, pedidos: [] },
  { id: 2, ocupada: false, pedidos: [] },
  { id: 3, ocupada: false, pedidos: [] },
  { id: 4, ocupada: false, pedidos: [] },
  { id: 5, ocupada: false, pedidos: [] },
];

let cardapio = [
  { id: 1, nome: "Café", preco: 5 },
  { id: 2, nome: "Bolo", preco: 8 },
  { id: 3, nome: "Sanduíche", preco: 12 },
  { id: 4, nome: "Suco", preco: 7 },
  { id: 5, nome: "Croissant", preco: 6 },
];

let vendasTotais = 0;
let mesaSelecionada = null;
let historicoVendas = [];

const COVER_ARTISTICO = 10.00;
const TAXA_SERVICO_PERCENTUAL = 0.10;