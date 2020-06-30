const {defaultTo} = require('lodash');
const AggregateError = require('aggregate-error');
const verifyPluginConfig = require('./lib/verify-config');
const verifyAuth = require('./lib/verify-auth');
const verifyTaskInstalled = require('./lib/verify-cli-installed');
const prepareLib = require('./lib/prepare');
const publishLib = require('./lib/publish');

// Let verified;
let prepared;

async function verifyConditions(pluginConfig, context) {
  // Set default values for config
  pluginConfig.checkAuthEnvVars = defaultTo(pluginConfig.checkAuthEnvVars, true);

  const errors = verifyPluginConfig(pluginConfig);

  try {
    // 1. Verify gradle task exists
    await verifyTaskInstalled(pluginConfig, context);

    // 2. Verify auth environment variables exists
    await verifyAuth(pluginConfig, context);
  } catch (error) {
    errors.push(...error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  //  Verified = true;
}

async function prepare(pluginConfig, context) {
  await prepareLib(pluginConfig, context);
  prepared = true;
}

async function publish(pluginConfig, context) {
  if (!prepared) {
    await prepareLib(pluginConfig, context);
  }

  return publishLib(pluginConfig, context);
}

module.exports = {verifyConditions, prepare, publish};
