(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("sjcl"));
	else if(typeof define === 'function' && define.amd)
		define(["sjcl"], factory);
	else if(typeof exports === 'object')
		exports["keymakerToolbox"] = factory(require("sjcl"));
	else
		root["keymakerToolbox"] = factory(root["sjcl"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _sjcl = __webpack_require__(1);
	
	var _sjcl2 = _interopRequireDefault(_sjcl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	    var dk = _sjcl2.default.misc.pbkdf2(password, _sjcl2.default.codec.utf8String.toBits(salt), iterations, keylen * 8);
	    var hex = _sjcl2.default.codec.hex.fromBits(dk);
	
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
	
	exports.default = keymakerToolbox;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=keymaker-toolbox.js.map