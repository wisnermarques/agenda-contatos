import { getContactById } from '../services/contactService';
import { supabase } from '../services/supabase';

// Mock do Supabase
jest.mock('../services/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe('getContactById', () => {
  test('deve retornar o contato pelo ID', async () => {
    const id = 1;
    const fakeContact = {
      id: 1,
      nome: 'Maria Souza',
      email: 'maria@email.com',
      telefone: '11999999999'
    };

    // Mock encadeado: from().select().eq().single()
    const mockSingle = jest.fn().mockResolvedValue({ data: fakeContact, error: null });
    const mockEq = jest.fn(() => ({ single: mockSingle }));
    const mockSelect = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ select: mockSelect });

    const result = await getContactById(id);

    expect(supabase.from).toHaveBeenCalledWith('contatos');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('id', id);
    expect(mockSingle).toHaveBeenCalled();
    expect(result).toEqual(fakeContact);
  });

  test('deve lançar erro se o Supabase retornar erro', async () => {
    const id = 2;
    const fakeError = new Error('Erro ao buscar contato');

    const mockSingle = jest.fn().mockResolvedValue({ data: null, error: fakeError });
    const mockEq = jest.fn(() => ({ single: mockSingle }));
    const mockSelect = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ select: mockSelect });

    await expect(getContactById(id)).rejects.toThrow('Erro ao buscar contato');
  });
});
