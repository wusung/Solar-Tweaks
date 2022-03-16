<template>
  <Loader v-if="$store.getters.isAppLoading" />
  <TitleBar />
  <Content />
  <Footer />
</template>

<script>
import Loader from './components/Loader.vue';
import TitleBar from './components/TitleBar.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';

import { login } from './javascript/discord';
import setupSettings from './javascript/settings';
import { clearLogs } from './javascript/logger';
import { remote } from 'electron';
import './assets/global.css';

export default {
  name: 'App',

  components: {
    Loader,
    TitleBar,
    Content,
    Footer,
  },

  async mounted() {
    // Clear logs file because new launch (or reload)
    await clearLogs();

    // Settings
    await setupSettings();

    if (!navigator.onLine) {
      remote.dialog.showMessageBoxSync({
        type: 'error',
        title: 'No Internet Connection',
        message:
          'You are not connected to the internet. Please connect and try again.',
        buttons: ['OK'],
        defaultId: 0,
      });
      remote.app.quit();
    }

    // Discord RPC
    await login();
  },
};
</script>

<style>
* {
  user-select: none;
  -webkit-user-select: none;
  padding: 0;
  margin: 0;
  font-family: Roboto, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #181818;
}

::-webkit-scrollbar {
  display: none;
}
</style>
