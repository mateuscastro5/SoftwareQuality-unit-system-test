class Product {
  constructor(name, price, quantity) {
    if (!name || name.trim() === '') {
      throw new Error('Nome do produto é obrigatório');
    }
    if (price < 0) {
      throw new Error('Preço não pode ser negativo');
    }
    if (quantity < 0) {
      throw new Error('Quantidade não pode ser negativa');
    }

    this.id = Date.now() + Math.random();
    this.name = name.trim();
    this.price = parseFloat(price);
    this.quantity = parseInt(quantity);
  }

  getTotal() {
    return this.price * this.quantity;
  }

  isInStock() {
    return this.quantity > 0;
  }

  addStock(amount) {
    if (amount < 0) {
      throw new Error('Quantidade deve ser positiva');
    }
    this.quantity += amount;
  }

  removeStock(amount) {
    if (amount < 0) {
      throw new Error('Quantidade deve ser positiva');
    }
    if (amount > this.quantity) {
      throw new Error('Estoque insuficiente');
    }
    this.quantity -= amount;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(name, price, quantity) {
    const product = new Product(name, price, quantity);
    this.products.push(product);
    return product;
  }

  removeProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  getProduct(id) {
    return this.products.find(p => p.id === id);
  }

  getAllProducts() {
    return [...this.products];
  }

  getTotalValue() {
    return this.products.reduce((sum, p) => sum + p.getTotal(), 0);
  }

  getInStockProducts() {
    return this.products.filter(p => p.isInStock());
  }

  getOutOfStockProducts() {
    return this.products.filter(p => !p.isInStock());
  }

  clear() {
    this.products = [];
  }
}

module.exports = { Product, ProductManager };
