// tests/ContactsPage.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactsPage from '../../pages/ContactsPage';
import * as contactService from '../../services/contactService';

jest.mock('../../services/contactService');

const renderPage = () => {
    return render(
        <MemoryRouter>
            <ContactsPage />
        </MemoryRouter>
    );
};

// Ignorar warnings do React Router
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe('ContactsPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renderiza mensagem quando não há contatos', async () => {
        contactService.getContacts.mockResolvedValueOnce([]);

        renderPage();

        expect(await screen.findByText(/nenhum contato cadastrado/i)).toBeInTheDocument();
        expect(contactService.getContacts).toHaveBeenCalledTimes(1);
    });

    test('renderiza lista de contatos quando houver dados', async () => {
        contactService.getContacts.mockResolvedValueOnce([
            { id: 1, nome: 'Ana', email: 'ana@email.com', telefone: '(11) 98888-7777' },
            { id: 2, nome: 'João', email: 'joao@email.com', telefone: '(21) 97777-6666' }
        ]);

        renderPage();

        // Verificar se a lista foi carregada procurando por elementos únicos
        await waitFor(() => {
            // Verificar se a tabela ou cards estão presentes
            expect(screen.getByRole('table')).toBeInTheDocument();
            expect(screen.getByText('Lista de Contatos')).toBeInTheDocument();
        });

        // Verificar se os nomes estão presentes (usando getAllByText já que há múltiplas ocorrências)
        const anaElements = screen.getAllByText('Ana');
        const joaoElements = screen.getAllByText('João');

        expect(anaElements.length).toBeGreaterThan(0);
        expect(joaoElements.length).toBeGreaterThan(0);

        // Verificar se pelo menos um elemento de cada está visível
        expect(anaElements[0]).toBeInTheDocument();
        expect(joaoElements[0]).toBeInTheDocument();
    });

    test('renderiza mensagem de erro quando o serviço falha', async () => {

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        contactService.getContacts.mockRejectedValueOnce(new Error('Erro de conexão'));

        renderPage();

        expect(await screen.findByText(/erro ao carregar contatos/i)).toBeInTheDocument();
        expect(contactService.getContacts).toHaveBeenCalledTimes(1);

        consoleSpy.mockRestore(); // restaura comportamento normal
    });
});
