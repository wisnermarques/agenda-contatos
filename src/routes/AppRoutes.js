import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout/Layout';
import HomePage from '../pages/HomePage';
import ContactsPage from '../pages/ContactsPage';
import NewContactPage from '../pages/NewContactPage';
import EditContactPage from '../pages/EditContactPage';
import { addContact } from '../services/contactService';

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
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contatos" element={<ContactsPage />} />
        <Route 
          path="/novo" 
          element={<NewContactPage onSubmit={handleAddContact} />} 
        />
        <Route path="/editar/:id" element={<EditContactPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;