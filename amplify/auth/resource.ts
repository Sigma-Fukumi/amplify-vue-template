// CognitoにUser Poolを作成してログインとサインアップ機能を実装
// CognitoというAWSのリソースを定義するからresource.ts
import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
