import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddContacts.module.css';
import { phoneBookOperations } from '../../redux/phoneBook';

export class AddContacts extends Component {
  state = {
    id: uuidv4(),
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const sameContact = this.props.contacts.find(
      item =>
        item.name.toLowerCase() === this.state.name.toLowerCase() ||
        item.number === this.state.number,
    );

    if (sameContact) {
      return alert(
        `Name ${this.state.name} or number ${this.state.number} are already in contacts`,
      );
    }
    this.props.onSubmit(this.state.name, this.state.number);
    this.reset();
    return;
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label} htmlFor={uuidv4()}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              id={uuidv4()}
              value={name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label className={styles.label} htmlFor={uuidv4()}>
            Number
            <input
              className={styles.input}
              type="tel"
              name="number"
              id={uuidv4()}
              value={number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button className={styles.btn} type="submit">
            Add contacts
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispachPhoneBook = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(phoneBookOperations.addContacts(name, number)),
});

export default connect(mapStateToProps, mapDispachPhoneBook)(AddContacts);
