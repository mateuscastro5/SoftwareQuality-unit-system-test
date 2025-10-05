const express = require('express');
const path = require('path');
const { ProductManager } = require('./productManager');

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
  res.json(productManager.getAllProducts());
});

app.post('/api/products', (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = productManager.addProduct(name, price, quantity);
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseFloat(req.params.id);
  const success = productManager.removeProduct(id);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Produto não encontrado' });
  }
});

app.patch('/api/products/:id/stock', (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    const { amount, operation } = req.body;
    const product = productManager.getProduct(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }

    if (operation === 'add') {
      product.addStock(amount);
    } else if (operation === 'remove') {
      product.removeStock(amount);
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  res.json({
    total: productManager.products.length,
    totalValue: productManager.getTotalValue(),
    inStock: productManager.getInStockProducts().length,
    outOfStock: productManager.getOutOfStockProducts().length
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = { app, productManager };
