const { Builder, By, until } = require('selenium-webdriver');

const BASE_URL = 'http://localhost:3000';
let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
}, 30000);

afterAll(async () => {
  await driver.quit();
});

describe('Cenário 1: Adicionar Produtos', () => {
  
  beforeEach(async () => {
    await driver.get(BASE_URL);
    await driver.sleep(1000);
  }, 15000);

  test('Caso 1: Adicionar produto válido (caminho feliz)', async () => {
    await driver.findElement(By.id('product-name')).sendKeys('Notebook Dell');
    await driver.findElement(By.id('product-price')).sendKeys('3500');
    await driver.findElement(By.id('product-quantity')).sendKeys('10');
    await driver.findElement(By.css('.btn-add')).click();
    
    await driver.sleep(1000);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).toContain('Notebook Dell');
  }, 15000);

  test('Caso 2: Tentar adicionar sem preencher campos (entrada inválida)', async () => {
    await driver.findElement(By.css('.btn-add')).click();
    
    await driver.sleep(500);
    
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).toContain('Preencha todos os campos');
    await alert.accept();
  }, 15000);

  test('Caso 3: Adicionar múltiplos produtos', async () => {
    await driver.findElement(By.id('product-name')).sendKeys('Mouse');
    await driver.findElement(By.id('product-price')).sendKeys('50');
    await driver.findElement(By.id('product-quantity')).sendKeys('20');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(800);
    
    await driver.findElement(By.id('product-name')).sendKeys('Teclado');
    await driver.findElement(By.id('product-price')).sendKeys('150');
    await driver.findElement(By.id('product-quantity')).sendKeys('15');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(800);
    
    const rows = await driver.findElements(By.css('#products-body tr'));
    expect(rows.length).toBeGreaterThanOrEqual(2);
  }, 20000);
});

describe('Cenário 2: Gerenciar Estoque', () => {
  
  test('Caso 1: Aumentar estoque (caminho feliz)', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Mouse Logitech');
    await driver.findElement(By.id('product-price')).sendKeys('80');
    await driver.findElement(By.id('product-quantity')).sendKeys('5');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const addButtons = await driver.findElements(By.css('.btn-stock'));
    await addButtons[addButtons.length - 2].click();
    await driver.sleep(1000);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).toContain('Mouse Logitech');
    expect(tbody).toContain('6');
  }, 15000);

  test('Caso 2: Diminuir estoque', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Teclado Mecânico');
    await driver.findElement(By.id('product-price')).sendKeys('200');
    await driver.findElement(By.id('product-quantity')).sendKeys('8');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const buttons = await driver.findElements(By.css('.btn-stock'));
    await buttons[buttons.length - 1].click();
    await driver.sleep(1000);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).toContain('Teclado Mecânico');
    expect(tbody).toContain('7');
  }, 15000);
});

describe('Cenário 3: Remover Produtos', () => {
  
  test('Caso 1: Remover produto (caminho feliz)', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Produto Deletar');
    await driver.findElement(By.id('product-price')).sendKeys('99');
    await driver.findElement(By.id('product-quantity')).sendKeys('3');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const removeButtons = await driver.findElements(By.css('.btn-remove'));
    await removeButtons[removeButtons.length - 1].click();
    
    await driver.sleep(500);
    const alert = await driver.switchTo().alert();
    await alert.accept();
    await driver.sleep(1000);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).not.toContain('Produto Deletar');
  }, 15000);

  test('Caso 2: Cancelar remoção', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Produto Manter');
    await driver.findElement(By.id('product-price')).sendKeys('75');
    await driver.findElement(By.id('product-quantity')).sendKeys('2');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    // Pegar o último botão remover
    const removeButtons = await driver.findElements(By.css('.btn-remove'));
    await removeButtons[removeButtons.length - 1].click();
    
    await driver.sleep(500);
    const alert = await driver.switchTo().alert();
    await alert.dismiss();
    await driver.sleep(500);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).toContain('Produto Manter');
  }, 15000);
});

describe('Cenário 4: Verificar Estatísticas', () => {
  
  test('Caso 1: Verificar atualização de estatísticas', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Stats Test');
    await driver.findElement(By.id('product-price')).sendKeys('100');
    await driver.findElement(By.id('product-quantity')).sendKeys('10');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const totalProducts = await driver.findElement(By.id('total-products')).getText();
    const totalValue = await driver.findElement(By.id('total-value')).getText();
    
    expect(parseInt(totalProducts)).toBeGreaterThan(0);
    expect(totalValue).toContain('R$');
  }, 15000);

  test('Caso 2: Verificar produtos em estoque', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Em Estoque');
    await driver.findElement(By.id('product-price')).sendKeys('50');
    await driver.findElement(By.id('product-quantity')).sendKeys('5');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const inStock = await driver.findElement(By.id('in-stock')).getText();
    expect(parseInt(inStock)).toBeGreaterThan(0);
  }, 15000);

  test('Caso 3: Verificar produto sem estoque', async () => {
    await driver.get(BASE_URL);
    await driver.sleep(500);
    
    await driver.findElement(By.id('product-name')).sendKeys('Sem Estoque');
    await driver.findElement(By.id('product-price')).sendKeys('100');
    await driver.findElement(By.id('product-quantity')).sendKeys('0');
    await driver.findElement(By.css('.btn-add')).click();
    await driver.sleep(1000);
    
    const tbody = await driver.findElement(By.id('products-body')).getText();
    expect(tbody).toContain('Sem estoque');
  }, 15000);
});
