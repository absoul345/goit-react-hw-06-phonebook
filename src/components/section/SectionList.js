import React from 'react';
import styles from './Section.module.css';
import PropTypes from 'prop-types';

const SectionList = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title__List}>{title}</h2>
      {children}
    </div>
  );
};

SectionList.prototype = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default SectionList;
