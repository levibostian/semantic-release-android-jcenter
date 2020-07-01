const test = require('ava');
const {stub} = require('sinon');
const verify = require('../lib/verify-config');

test.beforeEach((t) => {
  // Stub the logger functions
  t.context.log = stub();
  t.context.logger = {log: t.context.log};
});

test('Verify "checkAuthEnvVars" options', async (t) => {
  t.deepEqual(await verify({checkAuthEnvVars: false}, {}, t.context.logger), []);
});

test('Verify "checkAuthEnvVars" default values', async (t) => {
  t.deepEqual(await verify({checkAuthEnvVars: true}, {}, t.context.logger), []);
});

test('Return SemanticReleaseError if "checkAuthEnvVars" option is not a Boolean', async (t) => {
  const checkAuthEnvVars = 42;
  const [error, ...errors] = await verify({checkAuthEnvVars}, {}, t.context.logger);

  t.is(errors.length, 0);
  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'EINVALIDCHECKAUTHENVVARS');
});

// Test('Return SemanticReleaseError Array if multiple config are invalid', async (t) => {
//   const checkAuthEnvVars = 42;
//   const podLintArgs = 42;
//   const podPushArgs = 42;
//   const [error1, error2, error3] = await verify({podLint, podLintArgs, podPushArgs}, {}, t.context.logger);

//   t.is(error1.name, 'SemanticReleaseError');
//   t.is(error1.code, 'EINVALIDPODLINT');

//   t.is(error2.name, 'SemanticReleaseError');
//   t.is(error2.code, 'EINVALIDPODLINTARGS');

//   t.is(error3.name, 'SemanticReleaseError');
//   t.is(error3.code, 'EINVALIDPODPUSHARGS');
// });
