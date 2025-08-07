import { render, screen, waitFor } from '@testing-library/react';
import ContactList from '../components/ContactList';
import * as service from '../services/contactService';

jest.mock('../services/contactService');

test('exibe mensagem quando não há contatos cadastrados', async () => {
  // Simula resposta vazia do serviço
  service.getContacts.mockResolvedValue([]);

  render(<ContactList />);

  // Aguarda renderização assíncrona
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
