const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const SECRET = 'roulotte-personnel-2026';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// Recipes: ingredient counts per portion (simple units)
const RECIPES = {
  crevettes: {crevettes:1, limoncello:0.05, tomates_concassees:0.2, echalotes:0.05, tagliatelles:1},
  rouget: {rouget:1, haricots_verts:1, pommes_de_terre:1, creme_curry:0.05},
  saumon: {saumon:1, legumes_quinoa:1, sauce_thai:0.05},
  barbecue: {viande_grille:1, frites:1, salade:1},
  viande_grille: {viande_grille:1, frites:1, salade:1},
  chipolatas: {chipolatas:1, frites:1, salade:1},
  merguez: {merguez:1, frites:1, salade:1},
  poulet: {poulet:1, frites:1, salade:1},
  ribs: {ribs:1, frites:1, salade:1},
  snacking: {snacking:1}
};

app.post('/api/order', (req, res) => {
  const { name, items } = req.body || {};
  if (!name || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Donn�es invalides' });
  }
  const orders = readOrders();
  const order = { id: Date.now(), name, items, ts: new Date().toISOString() };
  orders.push(order);
  writeOrders(orders);
  res.json({ ok: true });
});

app.get('/api/orders/' + SECRET, (req, res) => {
  const orders = readOrders();
  res.json({ orders });
});

app.get('/api/totals/' + SECRET, (req, res) => {
  const orders = readOrders();
  const dishTotals = {}; // counts per dish id
  const ingredientTotals = {}; // aggregated ingredients

  for (const o of orders) {
    for (const it of o.items) {
      const id = it.id;
      const qty = Number(it.qty) || 0;
      if (qty <= 0) continue;
      dishTotals[id] = (dishTotals[id] || 0) + qty;
      const recipe = RECIPES[id];
      if (recipe) {
        for (const [ing, v] of Object.entries(recipe)) {
          ingredientTotals[ing] = (ingredientTotals[ing] || 0) + v * qty;
        }
      }
    }
  }

  res.json({ dishTotals, ingredientTotals });
});

app.delete('/api/order/:id/' + SECRET, (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Id de commande invalide' });

  const orders = readOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return res.status(404).json({ error: 'Commande introuvable' });

  orders.splice(index, 1);
  writeOrders(orders);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
