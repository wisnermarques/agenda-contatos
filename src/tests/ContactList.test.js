// ContactList.test.js
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ContactList from '../components/ContactList';
import * as service from '../services/contactService';

jest.mock('../services/contactService');

test('exibe mensagem quando não há contatos cadastrados', async () => {
  service.getContacts.mockResolvedValue([]);

  render(<ContactList />);

  await waitFor(() => {
    expect(screen.getByText(/nenhum contato cadastrado/i)).toBeInTheDocument();
  });
});

test('exibe lista de contatos', async () => {
  service.getContacts.mockResolvedValue([
    { id: '1', nome: 'Ana', email: 'ana@email.com', telefone: '123456789' },
    { id: '2', nome: 'João', email: 'joao@email.com', telefone: '987654321' },
  ]);

  render(<ContactList />);

  await waitFor(() => {
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
  });
});

test('deleta um contato ao clicar em "Remover"', async () => {
  const mockContacts = [
    { id: '1', nome: 'Ana', email: 'ana@email.com', telefone: '123' },
  ];
  
  service.getContacts.mockResolvedValue(mockContacts);
  service.deleteContact.mockImplementation((id) => {
    mockContacts.splice(0, 1); // Remove o contato
    return Promise.resolve();
  });

  render(<ContactList />);

  await waitFor(() => {
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/remover/i));

  await waitFor(() => {
    expect(service.deleteContact).toHaveBeenCalledWith('1');
    expect(screen.queryByText('Ana')).not.toBeInTheDocument();
  });
});