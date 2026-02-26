<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'

const { user, signOut } = useAuthenticator()
</script>

<template>
  <div>
    <h1>メニュー画面</h1>
    <p>ようこそ {{ user?.username }}</p>
    <button @click="signOut">ログアウト</button>
  </div>
</template>
