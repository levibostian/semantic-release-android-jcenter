module.exports = {
  EINVALIDCHECKAUTHENVVARS: ({checkAuthEnvVars}) => ({
    message: 'Invalid `checkAuthEnvVars` option.',
    details: `The checkAuthEnvVars option, if defined, must be a \`Boolean\`.
Your configuration for the \`checkAuthEnvVars\` option is \`${checkAuthEnvVars}\`.`,
  }),
  ETASKNOTINSTALLED: () => ({
    message: "You do not have the Gradle task 'bintrayUpload' on your project.",
    details: `See the plugin documentation and try again.`,
  }),
  EAUTHENVVARS: () => ({
    message: 'You did not set the Bintray authentication environment variables',
    details: `You did not define \`BINTRAY_USERNAME\` and \`BINTRAY_KEY\`. Define these variables or disable this check. See the plugin documentation and try again.`,
  }),
};
