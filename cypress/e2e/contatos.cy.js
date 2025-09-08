describe('Agenda de Contatos - Fluxos principais', () => {
  it('deve cadastrar um novo contato com sucesso', () => {
    cy.visit('/novo');

    cy.get('input[name="nome"]').type('Maria Souza');
    cy.get('input[name="telefone"]').type('(11) 98888-7777');
    cy.get('input[name="email"]').type('maria@email.com');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/contatos');
    cy.contains('Maria Souza').should('be.visible');
  });

  it('deve permitir editar um contato', () => {
    cy.visit('/contatos');

    cy.contains('Maria Souza')
      .parent()
      .find('button')
      .contains('Editar')
      .click();

    cy.url().should('include', '/editar/');
    cy.get('input[name="telefone"]').clear().type('(11) 97777-6666');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/contatos');
    cy.contains('(11) 97777-6666').should('be.visible');
  });
});
