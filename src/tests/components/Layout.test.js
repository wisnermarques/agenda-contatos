import { render, screen, within } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import Home from '../../components/home/Home';
import ContactList from '../../components/contacts/ContactList/ContactList';

describe('Layout Integração', () => {
    // Ignorar warnings do React Router
    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    test('Deve testar a integração com Navbar real', () => {
        render(
            <BrowserRouter>
                <Layout>
                    <div>Conteúdo da página</div>
                </Layout>
            </BrowserRouter>
        );

        // Verifica se a navegação está presente
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();

        // Verifica título
        expect(screen.getByText(/Gerenciador de Contatos/i)).toBeInTheDocument();

        // Verifica links de navegação
        const linksContatos = screen.getAllByRole('link', { name: /contatos/i });
        expect(linksContatos).toHaveLength(2);
        const linksHome = screen.getAllByRole('link', { name: /home/i });
        expect(linksHome).toHaveLength(1);

        // Verifica se o conteúdo principal é renderizado
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByText('Conteúdo da página')).toBeInTheDocument();
    });

    test('Deve manter o layout em diferentes rotas', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/contatos" element={<Layout><ContactList /></Layout>} />
                </Routes>
            </BrowserRouter>
        );

        // O Layout deve persistir independente da rota
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
