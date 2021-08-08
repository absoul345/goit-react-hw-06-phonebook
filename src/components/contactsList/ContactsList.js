import React from 'react';
import Filter from './filter/Filter';
import ContactsItem from './contactsItem/ContactsItem';
import { phoneBookOperations } from '../../redux/phoneBook';
import { connect } from 'react-redux';
import { getFilterContacts } from '../../redux/phoneBook/contacts-selectors';

const ContactsList = ({ contacts, filter, onDeleteContact }) => (
  <>
    <Filter value={filter} />
    <ul>
      {contacts.map(contact => (
        <ContactsItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  </>
);

const mapStateToProps = state => ({
  contacts: getFilterContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(phoneBookOperations.deleteContacts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
