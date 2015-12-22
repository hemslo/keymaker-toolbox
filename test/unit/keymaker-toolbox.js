import keymakerToolbox from '../../src/keymaker-toolbox';

describe('keymakerToolbox', () => {
  describe('makeKey function', () => {
    it('should return a key', () => {
      expect(keymakerToolbox.makeKey('password', 'salt')).to.equal('$s2d$0TF2c6`k$2e$9PqySg`0PVs:BRJ');
    });

    it('should return hex when all false', () => {
      expect(keymakerToolbox.makeKey('password', 'salt', 100000, 32, false, false, false, false)).to.equal('0394a2ede332c9a13eb82e9b24631604c31df978b4e2f0fbd2c549944f9d79a5');
    });
  });
});
