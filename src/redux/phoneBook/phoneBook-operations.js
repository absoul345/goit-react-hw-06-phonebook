import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} from './phoneBook-actions';

axios.defaults.baseURL = 'http://localhost:4040/';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }
};

const addContacts = (name, number) => async dispatch => {
  const contact = { name, number };

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

const deleteContacts = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    return await axios
      .delete(`/contacts/${id}`)
      .then(() => dispatch(deleteContactSuccess(id)));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContacts, deleteContacts, fetchContacts };
