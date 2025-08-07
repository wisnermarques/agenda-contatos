import { addContact } from '../services/contactService';
import { supabase } from '../services/supabase';


// Mock do Supabase
jest.mock('../services/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(),
    })),
  },
}));

describe('adiciona contato', () => {
  test('deve inserir o contato e retornar o contato salvo', async () => {
    const fakeContact = {
      nome: 'Maria',
      email: 'maria@email.com',
      telefone: '11999999999',
    };

    // Configura o retorno simulado do Supabase
    const mockInsert = jest.fn().mockResolvedValue({
      data: [fakeContact],
      error: null,
    });

    supabase.from.mockReturnValue({ insert: mockInsert });

    const result = await addContact(fakeContact);

    expect(supabase.from).toHaveBeenCalledWith('contatos');
    expect(mockInsert).toHaveBeenCalledWith([fakeContact]);
    expect(result).toEqual(fakeContact);
  });

  test('deve lançar erro se o Supabase retornar erro', async () => {
    const fakeContact = {
      nome: 'João',
      email: 'joao@email.com',
      telefone: '11999999998',
    };

    const mockInsert = jest.fn().mockResolvedValue({
      data: null,
      error: new Error('Erro ao inserir'),
    });

    supabase.from.mockReturnValue({ insert: mockInsert });

    await expect(addContact(fakeContact)).rejects.toThrow('Erro ao inserir');
  });
});
