import React, { Component } from 'react';
import SectionAddContacts from '../section/SectionAddContacts';
import SectionList from '../section/SectionList';
import AddContacts from '../addContacts/AddContacts';
import ContactsList from '../contactsList/ContactsList';
import { phoneBookOperations } from '../../redux/phoneBook';
import { connect } from 'react-redux';
import { getLoading } from '../../redux/phoneBook/contacts-selectors';

export class Phonebook extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        <SectionAddContacts title="Phonebook">
          <AddContacts />
        </SectionAddContacts>
        <SectionList title="Contacts">
          <ContactsList />
          {this.props.isLoadingContacts && <h1>Loading...</h1>}
        </SectionList>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContacts: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phoneBookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
