<template>
  <div id="loader-container">
    <img
      src="@/assets/logo.svg"
      id="loader-icon"
      class="loaded"
      alt="Solar Tweaks Logo"
    />
  </div>
</template>

<script>
export default {
  name: 'Loader',

  mounted() {
    // The loading animation
    setTimeout(() => {
      document.getElementById('loader-icon').style.width = '150px';
      document.getElementById('loader-icon').style.height = '150px';
      document.getElementById('loader-icon').style.opacity = '1';
    }, 50);

    // Hide the loading screen after a 1,5 seconds
    setTimeout(() => {
      this.$store.commit('setAppLoading', false);
    }, 1500);
  },
};
</script>

<style scoped>
#loader-container {
  -webkit-app-region: drag;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #181818;
  z-index: 100;
}

#loader-icon {
  width: 0px;
  height: 0px;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out,
    opacity 0.5s ease-in-out;
}
</style>
