const execa = require('execa');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {cwd, env, stdout, stderr, logger} = context;
  try {
    logger.log(`Verifying Gradle task 'bintrayUpload' installed on machine`);
    const result = execa('./gradlew', ['--dry-run', 'bintrayUpload'], {cwd, env});
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;
  } catch (_) {
    throw new AggregateError([getError('ETASKNOTINSTALLED', {})]);
  }
};
