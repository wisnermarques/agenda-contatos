import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteContact, getContacts } from '../services/contactService';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (contacts.length === 0) {
    return <p>Nenhum contato cadastrado.</p>;
  }

  return (
    <ul>
      {contacts.map((c) => (
        <li key={c.id}>
          <strong>{c.nome}</strong> — {c.email} — {c.telefone}
          <Link to={`/editar/${c.id}`}>
            <button>Editar</button>
          </Link>
          <button onClick={() => handleDelete(c.id)}>Remover</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
