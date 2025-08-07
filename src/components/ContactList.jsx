import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/contactService';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
