import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { sayHello } from './functions/say-hello/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
  sayHello
});

backend.addOutput({
  custom: {
      sayHelloFunctionName: backend.sayHello.resources.lambda.functionName,
     },
});

const authenticatedUserIamRole = backend.auth.resources.authenticatedUserIamRole;
backend.sayHello.resources.lambda.grantInvoke(authenticatedUserIamRole);
