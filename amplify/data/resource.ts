// AppSync + DB + AIを定義するためのDSL
// AppSync/Dynamo DB/BedrockというAWSのリソースを定義するからresource.ts
// a はAmplifyが提供しているスキーマ構築用ヘルパー
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

// APIモデルを作成
const schema = a.schema({
  // Todoモデル(model => Dynamo DBとCRUD API)
  // GraphQLが生成　TodoのType/Query(select)/Mutation(INSERT/UPDATE/DELETE)
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization(allow => [allow.owner()]),
  // AIチャットAPI
  chat: a.conversation({
      aiModel: a.ai.model('Claude Haiku 4.5'),
      systemPrompt: 'あなたは日本語で対応する親切なアシスタントです。'
  })
  .authorization((allow) => allow.owner()),
  // AI生成API
  generateRecipe: a.generation({
    aiModel: a.ai.model('Claude Haiku 4.5'),
    systemPrompt: 'あなたは日本語でレシピを生成する料理の専門家です。',
  })
  .arguments({
    description: a.string(),
  })
  .returns(
    a.customType({
      name: a.string(),
      ingredients: a.string().array(),
      instructions: a.string(),
    })
  )
  .authorization((allow) => [allow.authenticated()]),
});
// スキーマで定義したAPIを型付きで使用可能になる
export type Schema = ClientSchema<typeof schema>;
// データAPI(AppSync)全体の設定を確定してデプロイ対象にする宣言
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
