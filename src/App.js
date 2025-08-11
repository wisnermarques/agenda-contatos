import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { addContact } from './services/contactService';
import EditContact from './components/EditContact';

const Home = () => <h2>Bem-vindo ao Gerenciador de Contatos</h2>;

const AppRoutes = () => {
  const navigate = useNavigate();

  const handleAddContact = async (contact) => {
    try {
      await addContact(contact);
      alert('Contato cadastrado com sucesso!');
      navigate('/contatos');
    } catch (error) {
      console.error('Erro ao cadastrar contato:', error);
      alert('Erro ao cadastrar contato.');
    }
  };

  return (
    <>
      <nav style={{ marginBottom: '20px' }}>
        <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', padding: 0 }}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contatos">Listar Contatos</NavLink></li>
          <li><NavLink to="/novo">Cadastrar Contato</NavLink></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contatos" element={<ContactList />} />
        <Route path="/novo" element={<ContactForm onSubmit={handleAddContact} />} />
        <Route path="/editar/:id" element={<EditContact />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
