'use babel';

import sinon from 'sinon';
import ClearBlobStorage from '../lib/clear-blob-storage';

describe('ClearBlobStorage', () => {
  describe('when the package is activated', () => {
    it('clears the blob storage', () => {
      const sandbox = sinon.createSandbox();
      sandbox.stub(ClearBlobStorage, 'getLastVersion').returns('1.2.3');
      sandbox.stub(atom, 'getVersion').returns('1.2.4');
      sandbox.spy(ClearBlobStorage, 'clearBlobStorage');
      sandbox.spy(ClearBlobStorage, 'setLastVersion')

      ClearBlobStorage.activate();

      sinon.assert.calledOnce(ClearBlobStorage.clearBlobStorage);
      sinon.assert.calledWith(ClearBlobStorage.setLastVersion, '1.2.4');
      sandbox.reset();

      ClearBlobStorage.getLastVersion.returns();
      ClearBlobStorage.activate();
      sinon.assert.calledOnce(ClearBlobStorage.clearBlobStorage);

      sandbox.restore();
    });

    it('does not clear the storage for the same version', () => {
      const sandbox = sinon.createSandbox();
      sandbox.stub(ClearBlobStorage, 'getLastVersion').returns('1.2.3');
      sandbox.stub(atom, 'getVersion').returns('1.2.3');
      sandbox.spy(ClearBlobStorage, 'clearBlobStorage');

      ClearBlobStorage.activate();

      sinon.assert.notCalled(ClearBlobStorage.clearBlobStorage);

      sandbox.restore();
    });
  });
});
