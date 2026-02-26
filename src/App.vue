<script setup lang="ts">
// Vue3のComposition APIの書き方
// TODO:Vue2のOption APIとの違いについて調べて何がどう便利になったのかを知る
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import HeaderList from '@/components/Header.vue'

</script>

<template>
  <main> 
    <authenticator>
      <!--UIコンポーネントAuthenticatorの内部のuserとsignOut()を受け取る-->
      <template v-slot="{ user, signOut }">
        <div>
          <HeaderList />
        </div>
        <router-view />
      </template>
    </authenticator>
  </main>
</template>

