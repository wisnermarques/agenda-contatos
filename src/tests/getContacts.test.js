import { getContacts } from '../services/contactService';
import { supabase } from '../services/supabase';

// Mock do Supabase
jest.mock('../services/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe('lista contatos', () => {
  test('deve listar os contatos', async () => {
    const fakeContacts = [
      { nome: 'Maria', email: 'maria@email.com', telefone: '11999999999' },
      { nome: 'João', email: 'joao@email.com', telefone: '22999999999' }
    ];

    // Mock para simular a chamada do supabase
    const mockSelect = jest.fn().mockResolvedValue({
      data: fakeContacts,
      error: null
    });

    supabase.from.mockReturnValue({ select: mockSelect });

    const result = await getContacts();

    expect(supabase.from).toHaveBeenCalledWith('contatos');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(result).toEqual(fakeContacts);
  });

  test('deve lançar erro se o Supabase retornar erro', async () => {
    const mockSelect = jest.fn().mockResolvedValue({
      data: null,
      error: new Error('Erro ao listar')
    });

    supabase.from.mockReturnValue({ select: mockSelect });

    await expect(getContacts()).rejects.toThrow('Erro ao listar');
  });
});
