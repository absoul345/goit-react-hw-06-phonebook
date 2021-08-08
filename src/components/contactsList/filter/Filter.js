import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter } from '../../../redux/phoneBook/phoneBook-actions';
import { getFilter } from '../../../redux/phoneBook/contacts-selectors';

const Filter = ({ value, changeFilter }) => {
  return (
    <>
      <label className={styles.filter}>
        Find contacts by name
        <input type="text" value={value} onChange={changeFilter}></input>
      </label>
    </>
  );
};

Filter.prototype = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  value: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  changeFilter: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
