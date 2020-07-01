const {isNil, isBoolean} = require('lodash');
const getError = require('./get-error');

const VALIDATORS = {
  checkAuthEnvVars: isBoolean,
};

module.exports = ({checkAuthEnvVars}) => {
  const errors = Object.entries({checkAuthEnvVars}).reduce(
    (errors, [option, value]) =>
      !isNil(value) && !VALIDATORS[option](value)
        ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
        : errors,
    []
  );

  return errors;
};
