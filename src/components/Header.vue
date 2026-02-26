<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'

const { user, signOut } = useAuthenticator()
</script>

<template>
  <ul>
    <li><Router-link to="/todos">TODOリスト</Router-link></li>
    <li><Router-link to="/airecipe">AIレシピ</Router-link></li>
    <li><Router-link to="/file">ファイル</Router-link></li>
    <li><Router-link to="/sayhello">関数呼び出し</Router-link></li>
    <li><Router-link to="/">メニュー画面</Router-link></li>
</ul>
</template>