'use babel';

import fs from 'fs';
import path from 'path';
import semver from 'semver';

export default {
  activate(state) {
    const lastVersion = this.getLastVersion();
    const currentVersion = atom.getVersion();

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
    const homeDir = atom.getConfigDirPath();
    try {
      fs.rmdirSync(path.join(homeDir, 'blob-store'));
    } catch (e) {
      console.info('Blob store was already missing');
    }
  },

  getLastVersion() {
    return localStorage.getItem('clear-blob-storage:version');
  },

  setLastVersion(version) {
    localStorage.setItem('clear-blob-storage:version', version);
  }
};
