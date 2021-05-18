
const validator = require('validator');

const validateSignup = (data) => {
  const errors = {};

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }
  if (!validator.isLength(data.phone, { min: 7, max: 30 })) {
    errors.phone = 'Phone No. is invalid';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!validator.equals(data.password, data.confirmpassword)) {
    errors.confirmPassword = 'Password and Confirm Password donot match';
  }

  return  errors;
};

module.exports = validateSignup;
