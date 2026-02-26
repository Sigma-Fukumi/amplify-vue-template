// S3バケットを作ってパスごとのアクセス権限を宣言
// S3というAWSのリソースを定義するからresource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    // バケットの論理名(Amplifyによってユニーク名に変換)
    name: 'amplifyTeamDrive',
    access: (allow) => ({
      // ログインユーザーごとのフォルダパス
      'profile-pictures/{entity_id}/*': [
        allow.guest.to(['read']),
        allow.entity('identity').to(['read', 'write', 'delete'])
      ],
      // 誰でもアップロードと閲覧可能のフォルダパス
      'picture-submissions/*': [
        allow.authenticated.to(['read','write']),
        allow.guest.to(['read', 'write'])
      ],
    })
  });
