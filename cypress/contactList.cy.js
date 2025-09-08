// contactList.cy.js
import React from 'react';
import ContactList from '../../src/components/contacts/ContactList';
import * as contactService from '../../src/services/contactService';

describe('ContactList', () => {
  beforeEach(() => {
    // mocka os contatos
    cy.stub(contactService, 'getContacts').resolves([
      {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '11999999999',
        favorito: true,
      },
      {
        id: 2,
        nome: 'Maria Souza',
        email: 'maria@email.com',
        telefone: '21988888888',
        favorito: false,
      },
    ]);

    // mocka deleteContact
    cy.stub(contactService, 'deleteContact').resolves();

    cy.mount(<ContactList />);
  });

  it('deve exibir contatos na lista', () => {
    cy.findByText('João Silva').should('exist');
    cy.findByText('Maria Souza').should('exist');
  });

  it('deve abrir modal ao clicar em excluir', () => {
    cy.get('[data-testid="btn-excluir-1"]').click();
    cy.findByText(/Confirmar Exclusão/).should('be.visible');
  });

  it('deve excluir contato ao confirmar exclusão', () => {
    cy.get('[data-testid="btn-excluir-1"]').click();
    cy.get('[data-testid="btn-confirmar-exclusao"]').click();
    cy.findByText('João Silva').should('not.exist');
  });
});
