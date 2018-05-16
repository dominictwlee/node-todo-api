import React from 'react';
import PropTypes from 'prop-types';

// const AddTodo

const Form = ({ children, handleSubmit }) => {
  console.log(children);
  return <form onSubmit={handleSubmit}>{children}</form>;
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Form;
