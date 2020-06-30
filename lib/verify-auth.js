const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {env, logger} = context;

  if (pluginConfig.checkAuthEnvVars) {
    logger.log(`Checking if environment variables set for Bintray authentication`);

    if (!env.BINTRAY_USERNAME || !env.BINTRAY_KEY) {
      throw new AggregateError([getError('EAUTHENVVARS', {})]);
    }
  }
};
