import { supabase } from './supabase';

export const getContacts = async () => {
  const { data, error } = await supabase.from('contatos').select('*');
  if (error) throw error;
  return data;
};

export const addContact = async (contact) => {
  const { data, error } = await supabase.from('contatos').insert([contact]);
  if (error) throw error;
  return data[0];
};
