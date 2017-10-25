'use babel';

export default {
  activate(state) {
    const semver = require('semver');
    const lastVersion = this.getLastVersion();
    const currentVersion = this.getCurrentVersion();

    if (!lastVersion || semver.gt(currentVersion, lastVersion)) {
      console.info('Clearing blob storage...')
      this.clearBlobStorage();
      this.setLastVersion(currentVersion);
    }
  },

  deactivate() {
  },

  serialize() {
  },

  clearBlobStorage() {
    const fs = require('fs');
    const path = require('path');

    const homeDir = atom.getConfigDirPath();
    try {
      fs.rmdirSync(path.join(homeDir, 'blob-store'));
    } catch (e) {
      console.info('Blob store was already missing');
    }
  },

  getCurrentVersion() {
    return atom.getVersion();
  },

  getLastVersion() {
    return localStorage.getItem('clear-blob-storage:version');
  },

  setLastVersion(version) {
    localStorage.setItem('clear-blob-storage:version', version);
  }
};
