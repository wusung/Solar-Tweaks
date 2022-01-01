module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      outputDir: 'dist',
      builderOptions: {
        appId: 'com.solartweaks.solartweaks',
        productName: 'Solar Tweaks',
        win: {
          target: 'nsis',
          icon: 'build/icons/win/icon.ico',
          publisherName: 'Solar Tweaks',
          verifyUpdateCodeSignature: true,
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'build/icons/win/icon.ico',
          uninstallerIcon: 'build/icons/win/icon.ico',
          installerHeaderIcon: 'build/icons/win/icon.ico',
          displayLanguageSelector: true,
          runAfterFinish: true,
        },
        linux: {
          target: 'AppImage',
          maintainer: 'Solar Tweaks',
          vendor: 'Solar Tweaks',
          icon: 'build/icons/linux/icon.png',
          synopsis: 'Solar Tweaks',
          description: 'Solar Tweaks',
          category: 'Game',
        },
      },
    },
  },
};
