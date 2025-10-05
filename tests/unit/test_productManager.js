const { Product, ProductManager } = require('../../src/productManager');

describe('Cenário 1: Validação de Produtos', () => {
  
  test('Caso 1: Criar produto válido (caminho feliz)', () => {
    const product = new Product('Notebook', 3000, 5);
    
    expect(product.name).toBe('Notebook');
    expect(product.price).toBe(3000);
    expect(product.quantity).toBe(5);
    expect(product.id).toBeDefined();
  });

  test('Caso 2: Rejeitar produto com nome vazio (entrada inválida)', () => {
    expect(() => new Product('', 100, 5)).toThrow('Nome do produto é obrigatório');
  });

  test('Caso 3: Rejeitar preço negativo (entrada inválida)', () => {
    expect(() => new Product('Mouse', -50, 10)).toThrow('Preço não pode ser negativo');
  });

  test('Caso 4: Rejeitar quantidade negativa (entrada inválida)', () => {
    expect(() => new Product('Teclado', 150, -5)).toThrow('Quantidade não pode ser negativa');
  });
});

describe('Cenário 2: Cálculos e Status', () => {
  
  test('Caso 1: Calcular valor total do produto', () => {
    const product = new Product('Mouse', 50, 10);
    expect(product.getTotal()).toBe(500);
  });

  test('Caso 2: Verificar produto em estoque', () => {
    const product = new Product('Teclado', 100, 5);
    expect(product.isInStock()).toBe(true);
  });

  test('Caso 3: Verificar produto sem estoque', () => {
    const product = new Product('Monitor', 1000, 0);
    expect(product.isInStock()).toBe(false);
  });

  test('Caso 4: Adicionar estoque', () => {
    const product = new Product('Webcam', 200, 5);
    product.addStock(10);
    expect(product.quantity).toBe(15);
  });

  test('Caso 5: Remover estoque', () => {
    const product = new Product('Headset', 150, 10);
    product.removeStock(3);
    expect(product.quantity).toBe(7);
  });
});

describe('Cenário 3: Gerenciamento de Lista', () => {
  let manager;

  beforeEach(() => {
    manager = new ProductManager();
  });

  test('Caso 1: Adicionar produto à lista', () => {
    const product = manager.addProduct('Notebook', 3000, 5);
    
    expect(manager.products.length).toBe(1);
    expect(product.name).toBe('Notebook');
  });

  test('Caso 2: Remover produto da lista', () => {
    const product = manager.addProduct('Mouse', 50, 10);
    const removed = manager.removeProduct(product.id);
    
    expect(removed).toBe(true);
    expect(manager.products.length).toBe(0);
  });

  test('Caso 3: Buscar produto por ID', () => {
    const product = manager.addProduct('Teclado', 150, 8);
    const found = manager.getProduct(product.id);
    
    expect(found).toBeDefined();
    expect(found.name).toBe('Teclado');
  });

  test('Caso 4: Listar todos os produtos', () => {
    manager.addProduct('Mouse', 50, 10);
    manager.addProduct('Teclado', 150, 5);
    
    const all = manager.getAllProducts();
    expect(all.length).toBe(2);
  });
});

describe('Cenário 4: Operações Avançadas', () => {
  let manager;

  beforeEach(() => {
    manager = new ProductManager();
  });

  test('Caso 1: Calcular valor total do estoque', () => {
    manager.addProduct('Notebook', 3000, 2);
    manager.addProduct('Mouse', 50, 10);
    
    expect(manager.getTotalValue()).toBe(6500);
  });

  test('Caso 2: Filtrar produtos em estoque', () => {
    manager.addProduct('Produto A', 100, 5);
    manager.addProduct('Produto B', 200, 0);
    
    const inStock = manager.getInStockProducts();
    expect(inStock.length).toBe(1);
  });

  test('Caso 3: Filtrar produtos sem estoque', () => {
    manager.addProduct('Produto A', 100, 5);
    manager.addProduct('Produto B', 200, 0);
    manager.addProduct('Produto C', 300, 0);
    
    const outOfStock = manager.getOutOfStockProducts();
    expect(outOfStock.length).toBe(2);
  });

  test('Caso 4: Limpar lista de produtos', () => {
    manager.addProduct('Produto A', 100, 5);
    manager.addProduct('Produto B', 200, 10);
    manager.clear();
    
    expect(manager.products.length).toBe(0);
  });
});

describe('Cenário 5: Casos Extremos e Validações', () => {
  let manager;

  beforeEach(() => {
    manager = new ProductManager();
  });

  test('Caso 1: Tentar remover produto inexistente', () => {
    const result = manager.removeProduct(99999);
    expect(result).toBe(false);
  });

  test('Caso 2: Tentar adicionar estoque negativo', () => {
    const product = new Product('Produto', 100, 10);
    expect(() => product.addStock(-5)).toThrow('Quantidade deve ser positiva');
  });

  test('Caso 3: Remover mais estoque do que disponível', () => {
    const product = new Product('Produto', 100, 5);
    expect(() => product.removeStock(10)).toThrow('Estoque insuficiente');
  });

  test('Caso 4: Nome com espaços extras', () => {
    const product = new Product('  Produto  ', 100, 5);
    expect(product.name).toBe('Produto');
  });
});
