// Garante que a página tem altura válida antes de screenshots
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    // Verifica se o body tem altura válida
    cy.document().then((doc) => {
      if (doc.body.offsetHeight === 0) {
        cy.log('Página com altura zero, recarregando...');
        cy.reload();
        cy.wait(1000);
      }
    });
  }
});

// Ignora erros de recursos externos
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});