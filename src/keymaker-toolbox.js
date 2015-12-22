import sjcl from 'sjcl';

const Characters = {
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  number: '0123456789'.split(''),
  special: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')
};

const keymakerToolbox = {
  makeKey(password, salt, iterations=100000, keylen=32, lower=true, upper=true, number=true, special=true) {
    let dk = sjcl.misc.pbkdf2(password,
                              sjcl.codec.utf8String.toBits(salt),
                              iterations,
                              keylen * 8);
    let hex = sjcl.codec.hex.fromBits(dk);

    let types = [];
    const allTypes = ['lower', 'upper', 'number', 'special'];
    [lower, upper, number, special].forEach((e, i) => {
      if (e) {
        types.push(allTypes[i]);
      }
    });

    if (types.length === 0 || keylen < types.length) {
      return hex;
    }

    let decs = hex.match(/.{2}/g).map(i => parseInt(i, 16));
    let characters = decs.map(dec => {
      let type = types[dec % types.length];
      return Characters[type][dec % Characters[type].length];
    });

    // ensure all types at least one
    let indices = characters.map((e, i) => i);
    let index = 0;
    types.forEach(type => {
      let i = decs[index] % indices.length;
      index = indices[i];
      indices.splice(i, 1);
      characters[index] = Characters[type][decs[index] % Characters[type].length];
    });
    return characters.join('');
  }
};

export default keymakerToolbox;
