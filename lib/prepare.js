const replaceInFile = require('replace-in-file');

module.exports = async (pluginConfig, context) => {
  const {
    cwd,
    nextRelease: {version},
    logger,
  } = context;

  logger.log(`Write version ${version} to ${cwd}/gradle.properties`);

  // Regexr.com/57kma
  const replaceInFileOptions = {
    files: `${cwd}/gradle.properties`,
    from: /version\s*=.*/g,
    to: (match) => {
      // We want to preserve whitespace. So, we are only going to replace the `=X.X.X` part of the string.
      // regexr.com/56oig
      return match.replace(/=.*/g, `=${version}`);
    },
  };

  await replaceInFile(replaceInFileOptions);
};
