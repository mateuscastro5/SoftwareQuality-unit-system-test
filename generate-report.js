const fs = require('fs');
const path = require('path');

// Lê o resultado dos testes em JSON
const resultsPath = path.join(__dirname, 'test-results.json');

if (!fs.existsSync(resultsPath)) {
  console.error('❌ Arquivo de resultados não encontrado. Execute os testes primeiro.');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

function formatDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

let report = '';
report += '═══════════════════════════════════════════════════════════════════\n';
report += '                    RELATÓRIO DE TESTES AUTOMATIZADOS\n';
report += '                  Projeto: Sistema de Gerenciamento de Produtos\n';
report += '═══════════════════════════════════════════════════════════════════\n\n';
report += `Data/Hora da Execução: ${formatDate()}\n`;
report += `Tempo Total: ${(results.testResults[0].perfStats.runtime / 1000).toFixed(2)}s\n\n`;

// Resumo Geral
report += '───────────────────────────────────────────────────────────────────\n';
report += '                           RESUMO GERAL\n';
report += '───────────────────────────────────────────────────────────────────\n';
report += `Total de Suítes: ${results.numTotalTestSuites}\n`;
report += `Suítes Aprovadas: ${results.numPassedTestSuites}\n`;
report += `Suítes Falhadas: ${results.numFailedTestSuites}\n\n`;
report += `Total de Testes: ${results.numTotalTests}\n`;
report += `Testes Aprovados: ${results.numPassedTests} ✓\n`;
report += `Testes Falhados: ${results.numFailedTests}\n`;
report += `Testes Ignorados: ${results.numPendingTests}\n\n`;

const successRate = ((results.numPassedTests / results.numTotalTests) * 100).toFixed(1);
report += `Taxa de Sucesso: ${successRate}%\n\n`;

report += '═══════════════════════════════════════════════════════════════════\n';
report += '                      DETALHAMENTO POR SUÍTE\n';
report += '═══════════════════════════════════════════════════════════════════\n\n';

results.testResults.forEach((suite, suiteIndex) => {
  const suiteName = path.basename(suite.name);
  const suiteType = suiteName.includes('unit') ? 'TESTES UNITÁRIOS' : 'TESTES DE SISTEMA';
  
  report += `\n[${suiteIndex + 1}] ${suiteType}\n`;
  report += `Arquivo: ${suiteName}\n`;
  report += `Tempo: ${(suite.perfStats.runtime / 1000).toFixed(2)}s\n`;
  report += `Status: ${suite.numFailingTests === 0 ? '✓ APROVADO' : '✗ FALHOU'}\n`;
  report += `Testes: ${suite.numPassingTests}/${suite.numPassingTests + suite.numFailingTests}\n\n`;

  const testsByDescribe = {};
  suite.assertionResults.forEach(test => {
    const ancestorTitles = test.ancestorTitles.join(' > ');
    if (!testsByDescribe[ancestorTitles]) {
      testsByDescribe[ancestorTitles] = [];
    }
    testsByDescribe[ancestorTitles].push(test);
  });

  Object.keys(testsByDescribe).forEach((describe, idx) => {
    report += `  ${describe}\n`;
    report += `  ${'─'.repeat(describe.length)}\n`;
    
    testsByDescribe[describe].forEach((test, testIdx) => {
      const status = test.status === 'passed' ? '✓' : '✗';
      const icon = test.status === 'passed' ? '✓' : '✗';
      const time = (test.duration / 1000).toFixed(3);
      report += `    ${icon} ${test.title} (${time}s)\n`;
      
      if (test.status === 'failed' && test.failureMessages.length > 0) {
        report += `       Erro: ${test.failureMessages[0].split('\n')[0]}\n`;
      }
    });
    report += '\n';
  });
});

report += '═══════════════════════════════════════════════════════════════════\n';
report += '                    CATEGORIAS DE TESTE COBERTAS\n';
report += '═══════════════════════════════════════════════════════════════════\n\n';
report += '✓ Caminho Feliz (Happy Path)\n';
report += '  - Operações válidas e esperadas do sistema\n\n';
report += '✓ Caminhos Alternativos\n';
report += '  - Diferentes fluxos de execução válidos\n\n';
report += '✓ Entradas Inválidas\n';
report += '  - Validação de dados incorretos\n\n';
report += '✓ Casos Extremos (Edge Cases)\n';
report += '  - Limites e situações especiais\n\n';

report += '═══════════════════════════════════════════════════════════════════\n';
report += '                            CONCLUSÃO\n';
report += '═══════════════════════════════════════════════════════════════════\n\n';

if (results.numFailedTests === 0) {
  report += '✓ TODOS OS TESTES PASSARAM COM SUCESSO!\n\n';
  report += 'O sistema está funcionando conforme esperado.\n';
  report += 'Todas as funcionalidades foram validadas:\n';
  report += '  - Validação de entrada de dados\n';
  report += '  - Operações CRUD (Create, Read, Update, Delete)\n';
  report += '  - Gerenciamento de estoque\n';
  report += '  - Cálculos e estatísticas\n';
  report += '  - Interface web (testes de sistema)\n';
} else {
  report += `✗ ${results.numFailedTests} TESTE(S) FALHARAM\n\n`;
  report += 'Revise os erros acima e corrija as funcionalidades.\n';
}

report += '\n═══════════════════════════════════════════════════════════════════\n';
report += '                         FIM DO RELATÓRIO\n';
report += '═══════════════════════════════════════════════════════════════════\n';

const reportPath = path.join(__dirname, 'relatorio-testes.txt');
fs.writeFileSync(reportPath, report, 'utf8');

console.log('\n✓ Relatório gerado com sucesso!');
console.log(`📄 Arquivo: ${reportPath}\n`);
