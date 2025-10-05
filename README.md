# Projeto de Testes Automatizados

**Gerenciador de Produtos - Sistema de Controle de Estoque**

Centro Universitário Senac-RS  
Disciplina: Qualidade de Software  
Professor: Luciano Zanuz  
**Integrantes:** [Adicione os nomes aqui]

---

## 📋 Sobre o Projeto

Sistema web de gerenciamento de produtos com testes automatizados completos incluindo testes unitários (25 casos) e testes de sistema (11 casos).

---

## 🚀 Tecnologias

- Node.js + Express
- Jest (Testes Unitários)
- Selenium WebDriver (Testes de Sistema)
- HTML/CSS/JavaScript

---

## 📦 Instalação

```bash
npm install
```

---

## ▶️ Execução

### 1. Iniciar a Aplicação
```bash
npm start
```
Acesse: http://localhost:3000

### 2. Executar Testes

```bash
# Todos os testes
npm test

# Apenas unitários
npm run test:unit

# Apenas sistema (app deve estar rodando!)
npm run test:system

# Gerar relatório JSON
npm run test:report
```

**IMPORTANTE:** Para testes de sistema, a aplicação DEVE estar rodando em outra janela do terminal!

---

## 🧪 Casos de Teste

### Testes Unitários (25 casos em 5 cenários)

**Cenário 1: Validação de Produtos** (4 casos)
- Criar produto válido (caminho feliz)
- Rejeitar nome vazio
- Rejeitar preço negativo
- Rejeitar quantidade negativa

**Cenário 2: Cálculos e Status** (5 casos)
- Calcular valor total
- Verificar produto em estoque
- Verificar produto sem estoque
- Adicionar estoque
- Remover estoque

**Cenário 3: Gerenciamento de Lista** (4 casos)
- Adicionar produto
- Remover produto
- Buscar por ID
- Listar todos

**Cenário 4: Operações Avançadas** (4 casos)
- Calcular valor total do estoque
- Filtrar em estoque
- Filtrar sem estoque
- Limpar lista

**Cenário 5: Casos Extremos** (4 casos)
- Remover inexistente
- Estoque negativo
- Remover mais que disponível
- Espaços extras no nome

### Testes de Sistema (11 casos em 4 cenários)

**Cenário 1: Adicionar Produtos** (3 casos)
- Adicionar válido (caminho feliz)
- Campos vazios (inválido)
- Múltiplos produtos

**Cenário 2: Gerenciar Estoque** (2 casos)
- Aumentar estoque
- Diminuir estoque

**Cenário 3: Remover Produtos** (2 casos)
- Remover com confirmação
- Cancelar remoção

**Cenário 4: Verificar Estatísticas** (3 casos)
- Atualização de estatísticas
- Produtos em estoque
- Produtos sem estoque

**Total: 36 casos de teste**

---

## 📁 Estrutura

```
├── src/
│   ├── productManager.js      # Lógica de negócio
│   ├── app.js                  # Servidor Express
│   └── public/
│       └── index.html          # Interface web
├── tests/
│   ├── unit/
│   │   └── test_productManager.js    # 25 testes unitários
│   └── system/
│       └── test_system.js            # 11 testes de sistema
├── package.json
└── README.md
```

---

## ✅ Requisitos Atendidos

- ✅ Testes de sistema: 4 cenários com 3+ casos cada
- ✅ Testes unitários: 5 cenários com 3+ casos cada
- ✅ Aplicação web desenvolvida e funcional
- ✅ Scripts de automação em JavaScript
- ✅ Caminho feliz, alternativos, inválidos e extremos
- ✅ Não é calculadora (gerenciador de produtos)
- ✅ Evidências: Relatórios dos testes

---

## 📊 Evidências

As evidências de execução são os próprios relatórios gerados pelo Jest ao executar `npm test`, que mostram:
- Todos os casos de teste executados
- Status (passou/falhou)
- Tempo de execução
- Cobertura de código

Você pode gerar um relatório JSON com:
```bash
npm run test:report
```

---

## 🎯 Funcionalidades

- ➕ Adicionar produtos
- ➖ Remover produtos
- 📊 Controle de estoque
- 📈 Estatísticas em tempo real
- ✅ Validações completas

---

## 📅 Data de Entrega

14/10/2025
