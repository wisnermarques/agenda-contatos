// Comandos utilitários para o app
Cypress.Commands.add('visitContatos', () => {
  cy.visit('/contatos');
});

Cypress.Commands.add('criarContato', ({ nome, telefone, email }) => {
  cy.visit('/novo');
  cy.get('[data-testid="input-nome"]').type(nome);
  cy.get('[data-testid="input-telefone"]').type(telefone);
  cy.get('[data-testid="input-email"]').type(email);
  cy.get('[data-testid="btn-salvar"]').click();
});
