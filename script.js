async function loadData() {
  const res = await fetch('data.json');
  const data = await res.json();
  renderData(data);
}

function renderData(data) {
  const container = document.getElementById('crypto-data');
  container.innerHTML = '';
  data.forEach(coin => {
    const changeClass = coin.change >= 0 ? 'up' : 'down';
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <span>${coin.name}</span>
      <span>$${coin.price.toFixed(2)}</span>
      <span class="${changeClass}">${coin.change}%</span>
    `;
    container.appendChild(row);
  });
}

// Simulate live updates
function randomizeData(data) {
  return data.map(c => ({
    ...c,
    price: c.price * (1 + (Math.random() - 0.5) / 100),
    change: (Math.random() * 2 - 1).toFixed(2)
  }));
}

let coins = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    coins = data;
    renderData(coins);
    setInterval(() => {
      coins = randomizeData(coins);
      renderData(coins);
    }, 5000);
  });
