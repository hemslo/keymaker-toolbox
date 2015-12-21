import keymakerToolbox from '../../src/keymaker-toolbox';

describe('keymakerToolbox', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(keymakerToolbox, 'greet');
      keymakerToolbox.greet();
    });

    it('should have been run once', () => {
      expect(keymakerToolbox.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(keymakerToolbox.greet).to.have.always.returned('hello');
    });
  });
});
