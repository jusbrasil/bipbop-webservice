/* bipbop-webservice version 2.0.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errorCodes = require('./error-codes.js');
require('./chunk-b130bd2b.js');
var exception = require('./exception.js');
require('./chunk-74bab327.js');
var push = require('./push.js');
require('./chunk-0036cf04.js');
var webService = require('./web-service-bb6088bd.js');
require('form-data');
require('cross-fetch');
var subkey = require('./subkey.js');



exports.ErrorCodes = errorCodes.default;
exports.Exception = exception.default;
exports.Push = push.default;
Object.defineProperty(exports, 'PushParameters', {
	enumerable: true,
	get: function () {
		return push.PushParameters;
	}
});
exports.WebService = webService.WebService;
exports.Subkey = subkey.default;
/* www.bipbop.com.br */
//# sourceMappingURL=index.js.map
