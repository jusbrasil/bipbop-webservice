/* bipbop-webservice version 2.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errorCodes = require('./error-codes.js');
require('./chunk-e8134695.js');
var exception = require('./exception.js');
require('./chunk-5bed5cc1.js');
var push = require('./push.js');
require('./chunk-6d526ab8.js');
var webService = require('./web-service-37b281a8.js');
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
