(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('sjcl')) : typeof define === 'function' && define.amd ? define(['sjcl'], factory) : global.keymakerToolbox = factory(global.sjcl);
})(this, function (sjcl) {
  'use strict';

  var Characters = {
    lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    number: '0123456789'.split(''),
    special: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')
  };

  var keymakerToolbox = {
    makeKey: function makeKey(password, salt) {
      var iterations = arguments.length <= 2 || arguments[2] === undefined ? 100000 : arguments[2];
      var keylen = arguments.length <= 3 || arguments[3] === undefined ? 32 : arguments[3];
      var lower = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
      var upper = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];
      var number = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];
      var special = arguments.length <= 7 || arguments[7] === undefined ? true : arguments[7];

      var dk = sjcl.misc.pbkdf2(password, sjcl.codec.utf8String.toBits(salt), iterations, keylen * 8);
      var hex = sjcl.codec.hex.fromBits(dk);

      var types = [];
      var allTypes = ['lower', 'upper', 'number', 'special'];
      [lower, upper, number, special].forEach(function (e, i) {
        if (e) {
          types.push(allTypes[i]);
        }
      });

      if (types.length === 0 || keylen < types.length) {
        return hex;
      }

      var decs = hex.match(/.{2}/g).map(function (i) {
        return parseInt(i, 16);
      });
      var characters = decs.map(function (dec) {
        var type = types[dec % types.length];
        return Characters[type][dec % Characters[type].length];
      });

      // ensure all types at least one
      var indices = characters.map(function (e, i) {
        return i;
      });
      var index = 0;
      types.forEach(function (type) {
        var i = decs[index] % indices.length;
        index = indices[i];
        indices.splice(i, 1);
        characters[index] = Characters[type][decs[index] % Characters[type].length];
      });
      return characters.join('');
    }
  };

  var keymaker_toolbox = keymakerToolbox;

  return keymaker_toolbox;
});
//# sourceMappingURL=keymaker-toolbox.js.map
