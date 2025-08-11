import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';
import { getContactById, updateContact } from '../services/contactService';

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getContactById(id)
            .then(setContact)
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (formData) => {
        await updateContact(id, formData);
        navigate('/contatos'); // volta para a lista
    };

    if (loading) return <p>Carregando...</p>;
    if (!contact) return <p>Contato não encontrado.</p>;

    return (
        <div>
            <h2>Editar Contato</h2>
            <ContactForm contact={contact} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditContact;
