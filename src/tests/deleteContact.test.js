import { deleteContact } from '../services/contactService';
import { supabase } from '../services/supabase';

// Mock do Supabase
jest.mock('../services/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe('deleteContact', () => {
  test('deve deletar o contato corretamente', async () => {
    const id = 1;

    // Mock encadeado: from().delete().eq()
    const mockEq = jest.fn().mockResolvedValue({ error: null });
    const mockDelete = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ delete: mockDelete });

    await deleteContact(id);

    expect(supabase.from).toHaveBeenCalledWith('contatos');
    expect(mockDelete).toHaveBeenCalled(); // verifica que o delete foi chamado
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });

  test('deve lançar erro se o Supabase retornar erro', async () => {
    const id = 2;
    const fakeError = new Error('Erro ao deletar');

    const mockEq = jest.fn().mockResolvedValue({ error: fakeError });
    const mockDelete = jest.fn(() => ({ eq: mockEq }));
    supabase.from.mockReturnValue({ delete: mockDelete });

    await expect(deleteContact(id)).rejects.toThrow('Erro ao deletar');
  });
});
