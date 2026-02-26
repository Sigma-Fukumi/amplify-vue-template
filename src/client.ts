// AmplifyのData機能用クライアントを生成
import { generateClient } from 'aws-amplify/data'
// Schema型で型安全にする
import type { Schema } from '../amplify/data/resource'
// どのコンポーネントからでも使えるAPIクライアントをexport
export const client = generateClient<Schema>()