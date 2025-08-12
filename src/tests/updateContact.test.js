import { updateContact } from '../services/contactService';
import { supabase } from '../services/supabase';

// Mock do Supabase
jest.mock('../services/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe('updateContact', () => {
  test('deve atualizar o contato corretamente', async () => {
    const id = 1;
    const contact = {
      nome: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(11) 99999-9999'
    };

    // Mock da chain do Supabase: from().update().eq()
    const mockEq = jest.fn().mockResolvedValue({ error: null });
    const mockUpdate = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ update: mockUpdate });

    await updateContact(id, contact);

    expect(supabase.from).toHaveBeenCalledWith('contatos');
    expect(mockUpdate).toHaveBeenCalledWith({
      ...contact,
      telefone: '11999999999' // número sem máscara
    });
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });

  test('deve lançar erro se o Supabase retornar erro', async () => {
    const id = 2;
    const contact = {
      nome: 'João Souza',
      email: 'joao@email.com',
      telefone: '22 99999-9999'
    };

    const fakeError = new Error('Erro ao atualizar');
    const mockEq = jest.fn().mockResolvedValue({ error: fakeError });
    const mockUpdate = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ update: mockUpdate });

    await expect(updateContact(id, contact)).rejects.toThrow('Erro ao atualizar');
  });
});
