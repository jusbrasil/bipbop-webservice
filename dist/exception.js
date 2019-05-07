/* bipbop-webservice version 2.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errorCodes = require('./error-codes.js');
var __chunk_1 = require('./chunk-e8134695.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var ExtendableError = function (_extendableBuiltin2) {
  _inherits(ExtendableError, _extendableBuiltin2);

  function ExtendableError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, ExtendableError);

    // extending Error is weird and does not propagate `message`
    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    Object.defineProperty(_this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true
    });

    Object.defineProperty(_this, 'name', {
      configurable: true,
      enumerable: false,
      value: _this.constructor.name,
      writable: true
    });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(_this, _this.constructor);
      return _possibleConstructorReturn(_this);
    }

    Object.defineProperty(_this, 'stack', {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true
    });
    return _this;
  }

  return ExtendableError;
}(_extendableBuiltin(Error));

var BIPBOPException =
/*#__PURE__*/
function (_Exception) {
  __chunk_1._inherits(BIPBOPException, _Exception);

  function BIPBOPException() {
    __chunk_1._classCallCheck(this, BIPBOPException);

    return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(BIPBOPException).apply(this, arguments));
  }

  __chunk_1._createClass(BIPBOPException, null, [{
    key: "factory",
    value: function factory(message) {
      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : errorCodes.default.E_UNKNOWN;
      var push = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var exception = new BIPBOPException(message);
      exception.code = code;
      exception.push = push;
      return this;
    }
  }]);

  return BIPBOPException;
}(ExtendableError);

exports.default = BIPBOPException;
/* www.bipbop.com.br */
//# sourceMappingURL=exception.js.map
