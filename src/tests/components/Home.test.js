import { render, screen } from '@testing-library/react';
import Home from '../../components/home/Home';

describe('Home Component', () => {
  test('deve renderizar mensagem de boas-vindas na tag h2', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { 
      level: 2,
      name: /Bem-vindo ao Gerenciador de Contatos/i 
    });
    
    expect(heading).toBeInTheDocument();
  });
});