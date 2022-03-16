<template>
  <div id="about-container">
    <Card
      icon="fa-solid fa-circle-info"
      title="About Solar Tweaks"
      subtitle="Learn a bit more about Solar Tweaks, what is it and how it works"
      background="about"
      id="about-card"
    >
      <div id="cards-item">
        <CardItem
          title="About Us"
          icon="fa-solid fa-user"
          id="about-us-card-item"
        >
          <p id="about-us">
            Solar Tweaks is a modification pack for Lunar Client. By modifying
            the game's code when it gets loaded, we add a variety of features
            that enhance your Minecraft experience. Browse and configure our
            "Modules" to your own needs under the Patcher tab, launch with one
            click, and enjoy a better Lunar Client!
            <br />
            We are not affiliated with Mojang or Moonsworth! We are just a bunch
            of people who love Lunar Client and want to make it better!
          </p>
        </CardItem>
        <div id="little-cards">
          <CardItem
            title="Discord"
            icon="fa-brands fa-discord"
            subtitle="Our server is the best place to get help"
            class="little-card"
          >
            <button
              @click="openLink(constants.links.DISCORD)"
              id="discord-button"
            >
              <i class="fa-solid fa-up-right-from-square button-icon"></i>
              Discord
            </button>
          </CardItem>
          <CardItem
            title="About Launcher"
            icon="fa-solid fa-code-branch"
            :subtitle="`Electron: v${aboutLauncherDescription.electron} • Node: v${aboutLauncherDescription.node} • Chrome: v${aboutLauncherDescription.chrome}`"
            class="little-card"
            ><h3 id="launcher-version">
              Version {{ aboutLauncherDescription.launcher }}
            </h3>
          </CardItem>
          <CardItem
            title="Lunar Client"
            icon="fa-solid fa-moon"
            subtitle="Click on the button to open their website"
            class="little-card"
          >
            <button
              @click="openLink(constants.links.LUNARCLIENT)"
              id="discord-button"
            >
              <i class="fa-solid fa-up-right-from-square button-icon"></i>
              Lunar Client
            </button>
          </CardItem>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { remote } from 'electron';
import process from 'process';

import Card from '../Card/Card.vue';
import CardItem from '../Card/CardItem.vue';
import constants from '../../constants';

export default {
  name: 'About',

  components: {
    Card,
    CardItem,
  },

  data: () => ({
    constants,
    aboutLauncherDescription: {
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome,
      launcher: remote.app.getVersion(),
    },
  }),

  methods: {
    /**
     * Opens a link in the default browser
     * @param {string} url The url to open
     */
    openLink(url) {
      remote.shell.openExternal(url);
    },
  },
};
</script>

<style scoped>
#about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#cards-item {
  display: flex;
  flex-direction: column;
}

#about-card {
  margin-top: 50px;
}

#about-us-card-item {
  margin-top: 20px;
  width: 90%;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
}

#about-us {
  color: #f7f7f7;
  text-align: center;
  font-size: smaller;
  font-weight: 300;
  letter-spacing: 0.55px;
  line-height: 1.5;
}

.little-card {
  width: 300px;
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  margin: 24px;
  margin-top: 0px;
}

#little-cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.button-icon {
  margin-right: 5px;
}

#discord-button {
  background-color: #2b71ce;
  border: none;
  width: 150px;
  color: #f7f7f7;
  height: 30px;
  border-radius: 5px;
  margin-top: 12px;
  margin-right: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

#discord-button:hover {
  background-color: #2560ac;
}

#launcher-version {
  color: #f7f7f7;
  margin-top: 3px;
  font-weight: 400;
}
</style>
