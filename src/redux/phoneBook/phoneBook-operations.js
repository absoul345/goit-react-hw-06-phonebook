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

axios.defaults.baseURL =
  'https://hw-07-1c0c4-default-rtdb.europe-west1.firebasedatabase.app/';

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
