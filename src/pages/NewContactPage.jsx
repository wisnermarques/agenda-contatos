import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/contacts/ContactForm/ContactForm';

const NewContactPage = ({ onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">Cadastrar Novo Contato</h2>
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => navigate('/contatos')}
                >
                  <i className="bi bi-arrow-left me-1"></i> Voltar
                </button>
              </div>
            </div>
            <div className="card-body p-4">
              <ContactForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewContactPage;