# keymaker-toolbox

Toolbox of keymaker.

[![Travis build status](http://img.shields.io/travis/hemslo/keymaker-toolbox.svg?style=flat)](https://travis-ci.org/hemslo/keymaker-toolbox)
[![Code Climate](https://codeclimate.com/github/hemslo/keymaker-toolbox/badges/gpa.svg)](https://codeclimate.com/github/hemslo/keymaker-toolbox)
[![Test Coverage](https://codeclimate.com/github/hemslo/keymaker-toolbox/badges/coverage.svg)](https://codeclimate.com/github/hemslo/keymaker-toolbox)
[![Dependency Status](https://david-dm.org/hemslo/keymaker-toolbox.svg)](https://david-dm.org/hemslo/keymaker-toolbox)
[![devDependency Status](https://david-dm.org/hemslo/keymaker-toolbox/dev-status.svg)](https://david-dm.org/hemslo/keymaker-toolbox#info=devDependencies)

### How it works

Use PBKDF2 with SHA-256 to derive a key, then replace every byte with supplied character sets(lower, upper, number, special).
