/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/*! Axios v1.8.4 Copyright (c) 2025 Matt Zabriskie and contributors */


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({source, data}) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);

    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    }
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === 'function',
  isFunction(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************

var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}

utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  } 

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

var platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = typeof navigator === 'object' && navigator || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = hasBrowserEnv && window.location.href || 'http://localhost';

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv,
  navigator: _navigator,
  origin: origin
});

var platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data) ||
      utils$1.isReadableStream(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if ( passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return throttle(e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};

const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
  url = new URL(url, platform.origin);

  return (
    origin.protocol === url.protocol &&
    origin.host === url.host &&
    (isMSIE || origin.port === url.port)
  );
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;

var cookies = platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, prop , caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop , caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, prop , caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

var resolveConfig = (config) => {
  const newConfig = mergeConfig({}, config);

  let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

  newConfig.headers = headers = AxiosHeaders$1.from(headers);

  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  let contentType;

  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // Let the browser set it
    } else if ((contentType = headers.getContentType()) !== false) {
      // fix semicolon duplication issue for ReactNative FormData implementation
      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
};

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let {responseType, onUploadProgress, onDownloadProgress} = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;

    function done() {
      flushUpload && flushUpload(); // flush events
      flushDownload && flushDownload(); // flush events

      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
    }

    let request = new XMLHttpRequest();

    request.open(_config.method.toUpperCase(), _config.url, true);

    // Set the request timeout in MS
    request.timeout = _config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = _config.responseType;
    }

    // Handle progress if needed
    if (onDownloadProgress) {
      ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
      request.addEventListener('progress', downloadThrottled);
    }

    // Not all browsers support upload events
    if (onUploadProgress && request.upload) {
      ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

      request.upload.addEventListener('progress', uploadThrottled);

      request.upload.addEventListener('loadend', flushUpload);
    }

    if (_config.cancelToken || _config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(_config.url);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const composeSignals = (signals, timeout) => {
  const {length} = (signals = signals ? signals.filter(Boolean) : []);

  if (timeout || length) {
    let controller = new AbortController();

    let aborted;

    const onabort = function (reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };

    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal.addEventListener('abort', onabort));

    const {signal} = controller;

    signal.unsubscribe = () => utils$1.asap(unsubscribe);

    return signal;
  }
};

var composeSignals$1 = composeSignals;

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream({
    async pull(controller) {
      try {
        const {done, value} = await iterator.next();

        if (done) {
         _onFinish();
          controller.close();
          return;
        }

        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
};

const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

// used only inside the fetch adapter
const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
);

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
};

const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;

  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: 'POST',
    get duplex() {
      duplexAccessed = true;
      return 'half';
    },
  }).headers.has('Content-Type');

  return duplexAccessed && !hasContentType;
});

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const supportsResponseStream = isReadableStreamSupported &&
  test(() => utils$1.isReadableStream(new Response('').body));


const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};

isFetchSupported && (((res) => {
  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
      (_, config) => {
        throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
      });
  });
})(new Response));

const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }

  if(utils$1.isBlob(body)) {
    return body.size;
  }

  if(utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: 'POST',
      body,
    });
    return (await _request.arrayBuffer()).byteLength;
  }

  if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }

  if(utils$1.isURLSearchParams(body)) {
    body = body + '';
  }

  if(utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};

const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());

  return length == null ? getBodyLength(body) : length;
};

var fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = 'same-origin',
    fetchOptions
  } = resolveConfig(config);

  responseType = responseType ? (responseType + '').toLowerCase() : 'text';

  let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

  let request;

  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
  });

  let requestContentLength;

  try {
    if (
      onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
      (requestContentLength = await resolveBodyLength(headers, data)) !== 0
    ) {
      let _request = new Request(url, {
        method: 'POST',
        body: data,
        duplex: "half"
      });

      let contentTypeHeader;

      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
        headers.setContentType(contentTypeHeader);
      }

      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );

        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }

    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? 'include' : 'omit';
    }

    // Cloudflare Workers throws when credentials are defined
    // see https://github.com/cloudflare/workerd/issues/902
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : undefined
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
      const options = {};

      ['status', 'statusText', 'headers'].forEach(prop => {
        options[prop] = response[prop];
      });

      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];

      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }

    responseType = responseType || 'text';

    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

    !isStreamResponse && unsubscribe && unsubscribe();

    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    })
  } catch (err) {
    unsubscribe && unsubscribe();

    if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      )
    }

    throw AxiosError.from(err, err && err.code, config, request);
  }
});

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const VERSION = "1.8.4";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  }
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};

        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack;
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    validator.assertOptions(config, {
      baseUrl: validators.spelling('baseURL'),
      withXsrfToken: validators.spelling('withXSRFToken')
    }, true);

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/ckeditor/ckeditor.js":
/*!*******************************************!*\
  !*** ./node_modules/ckeditor/ckeditor.js ***!
  \*******************************************/
/***/ (() => {

﻿/*
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){window.CKEDITOR&&window.CKEDITOR.dom||(window.CKEDITOR||(window.CKEDITOR=function(){var a=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,f={timestamp:"J5S9",version:"4.12.1 (Standard)",revision:"64749bb245",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:a},status:"unloaded",basePath:function(){var b=window.CKEDITOR_BASEPATH||"";if(!b)for(var c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var g=c[f].src.match(a);if(g){b=g[1];break}}-1==b.indexOf(":/")&&
"//"!=b.slice(0,2)&&(b=0===b.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+b:location.href.match(/^[^\?]*\/(?:)/)[0]+b);if(!b)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return b}(),getUrl:function(a){-1==a.indexOf(":/")&&0!==a.indexOf("/")&&(a=this.basePath+a);this.timestamp&&"/"!=a.charAt(a.length-1)&&!/[&?]t=/.test(a)&&(a+=(0<=a.indexOf("?")?"\x26":"?")+"t\x3d"+this.timestamp);
return a},domReady:function(){function a(){try{document.addEventListener?(document.removeEventListener("DOMContentLoaded",a,!1),b()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",a),b())}catch(g){}}function b(){for(var a;a=c.shift();)a()}var c=[];return function(g){function h(){try{document.documentElement.doScroll("left")}catch(e){setTimeout(h,1);return}a()}c.push(g);"complete"===document.readyState&&setTimeout(a,1);if(1==c.length)if(document.addEventListener)document.addEventListener("DOMContentLoaded",
a,!1),window.addEventListener("load",a,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",a);window.attachEvent("onload",a);g=!1;try{g=!window.frameElement}catch(b){}document.documentElement.doScroll&&g&&h()}}}()},b=window.CKEDITOR_GETURL;if(b){var c=f.getUrl;f.getUrl=function(a){return b.call(f,a)||c.call(f,a)}}return f}()),CKEDITOR.event||(CKEDITOR.event=function(){},CKEDITOR.event.implementOn=function(a){var f=CKEDITOR.event.prototype,b;for(b in f)null==a[b]&&(a[b]=f[b])},
CKEDITOR.event.prototype=function(){function a(a){var d=f(this);return d[a]||(d[a]=new b(a))}var f=function(a){a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={})},b=function(a){this.name=a;this.listeners=[]};b.prototype={getListenerIndex:function(a){for(var b=0,f=this.listeners;b<f.length;b++)if(f[b].fn==a)return b;return-1}};return{define:function(b,d){var f=a.call(this,b);CKEDITOR.tools.extend(f,d,!0)},on:function(b,d,f,k,g){function h(a,e,n,g){a={name:b,sender:this,editor:a,
data:e,listenerData:k,stop:n,cancel:g,removeListener:m};return!1===d.call(f,a)?!1:a.data}function m(){n.removeListener(b,d)}var e=a.call(this,b);if(0>e.getListenerIndex(d)){e=e.listeners;f||(f=this);isNaN(g)&&(g=10);var n=this;h.fn=d;h.priority=g;for(var q=e.length-1;0<=q;q--)if(e[q].priority<=g)return e.splice(q+1,0,h),{removeListener:m};e.unshift(h)}return{removeListener:m}},once:function(){var a=Array.prototype.slice.call(arguments),b=a[1];a[1]=function(a){a.removeListener();return b.apply(this,
arguments)};return this.on.apply(this,a)},capture:function(){CKEDITOR.event.useCapture=1;var a=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return a},fire:function(){var a=0,b=function(){a=1},l=0,k=function(){l=1};return function(g,h,m){var e=f(this)[g];g=a;var n=l;a=l=0;if(e){var q=e.listeners;if(q.length)for(var q=q.slice(0),y,u=0;u<q.length;u++){if(e.errorProof)try{y=q[u].call(this,m,h,b,k)}catch(p){}else y=q[u].call(this,m,h,b,k);!1===y?l=1:"undefined"!=typeof y&&(h=y);if(a||l)break}}h=
l?!1:"undefined"==typeof h?!0:h;a=g;l=n;return h}}(),fireOnce:function(a,b,l){b=this.fire(a,b,l);delete f(this)[a];return b},removeListener:function(a,b){var l=f(this)[a];if(l){var k=l.getListenerIndex(b);0<=k&&l.listeners.splice(k,1)}},removeAllListeners:function(){var a=f(this),b;for(b in a)delete a[b]},hasListeners:function(a){return(a=f(this)[a])&&0<a.listeners.length}}}()),CKEDITOR.editor||(CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this)},CKEDITOR.editor.prototype.fire=
function(a,f){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fire.call(this,a,f,this)},CKEDITOR.editor.prototype.fireOnce=function(a,f){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fireOnce.call(this,a,f,this)},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)),CKEDITOR.env||(CKEDITOR.env=function(){var a=navigator.userAgent.toLowerCase(),f=a.match(/edge[ \/](\d+.?\d*)/),b=-1<a.indexOf("trident/"),b=!(!f&&!b),b={ie:b,edge:!!f,webkit:!b&&
-1<a.indexOf(" applewebkit/"),air:-1<a.indexOf(" adobeair/"),mac:-1<a.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode&&(!document.documentMode||10>document.documentMode),mobile:-1<a.indexOf("mobile"),iOS:/(ipad|iphone|ipod)/.test(a),isCustomDomain:function(){if(!this.ie)return!1;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"},secure:"https:"==location.protocol};b.gecko="Gecko"==navigator.product&&!b.webkit&&!b.ie;b.webkit&&(-1<a.indexOf("chrome")?b.chrome=
!0:b.safari=!0);var c=0;b.ie&&(c=f?parseFloat(f[1]):b.quirks||!document.documentMode?parseFloat(a.match(/msie (\d+)/)[1]):document.documentMode,b.ie9Compat=9==c,b.ie8Compat=8==c,b.ie7Compat=7==c,b.ie6Compat=7>c||b.quirks);b.gecko&&(f=a.match(/rv:([\d\.]+)/))&&(f=f[1].split("."),c=1E4*f[0]+100*(f[1]||0)+1*(f[2]||0));b.air&&(c=parseFloat(a.match(/ adobeair\/(\d+)/)[1]));b.webkit&&(c=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));b.version=c;b.isCompatible=!(b.ie&&7>c)&&!(b.gecko&&4E4>c)&&!(b.webkit&&
534>c);b.hidpi=2<=window.devicePixelRatio;b.needsBrFiller=b.gecko||b.webkit||b.ie&&10<c;b.needsNbspFiller=b.ie&&11>c;b.cssClass="cke_browser_"+(b.ie?"ie":b.gecko?"gecko":b.webkit?"webkit":"unknown");b.quirks&&(b.cssClass+=" cke_browser_quirks");b.ie&&(b.cssClass+=" cke_browser_ie"+(b.quirks?"6 cke_browser_iequirks":b.version));b.air&&(b.cssClass+=" cke_browser_air");b.iOS&&(b.cssClass+=" cke_browser_ios");b.hidpi&&(b.cssClass+=" cke_hidpi");return b}()),"unloaded"==CKEDITOR.status&&function(){CKEDITOR.event.implementOn(CKEDITOR);
CKEDITOR.loadFullCore=function(){if("basic_ready"!=CKEDITOR.status)CKEDITOR.loadFullCore._load=1;else{delete CKEDITOR.loadFullCore;var a=document.createElement("script");a.type="text/javascript";a.src=CKEDITOR.basePath+"ckeditor.js";document.getElementsByTagName("head")[0].appendChild(a)}};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=function(a){(this._.pending||(this._.pending=[])).push(a)};(function(){CKEDITOR.domReady(function(){var a=CKEDITOR.loadFullCore,f=CKEDITOR.loadFullCoreTimeout;a&&(CKEDITOR.status=
"basic_ready",a&&a._load?a():f&&setTimeout(function(){CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore()},1E3*f))})})();CKEDITOR.status="basic_loaded"}(),"use strict",CKEDITOR.VERBOSITY_WARN=1,CKEDITOR.VERBOSITY_ERROR=2,CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR,CKEDITOR.warn=function(a,f){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire("log",{type:"warn",errorCode:a,additionalData:f})},CKEDITOR.error=function(a,f){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire("log",
{type:"error",errorCode:a,additionalData:f})},CKEDITOR.on("log",function(a){if(window.console&&window.console.log){var f=console[a.data.type]?a.data.type:"log",b=a.data.errorCode;if(a=a.data.additionalData)console[f]("[CKEDITOR] Error code: "+b+".",a);else console[f]("[CKEDITOR] Error code: "+b+".");console[f]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#"+b)}},null,null,999),CKEDITOR.dom={},function(){function a(a,e,b){this._minInterval=
a;this._context=b;this._lastOutput=this._scheduledTimer=0;this._output=CKEDITOR.tools.bind(e,b||{});var g=this;this.input=function(){function a(){g._lastOutput=(new Date).getTime();g._scheduledTimer=0;g._call()}if(!g._scheduledTimer||!1!==g._reschedule()){var e=(new Date).getTime()-g._lastOutput;e<g._minInterval?g._scheduledTimer=setTimeout(a,g._minInterval-e):a()}}}function f(e,g,b){a.call(this,e,g,b);this._args=[];var h=this;this.input=CKEDITOR.tools.override(this.input,function(a){return function(){h._args=
Array.prototype.slice.call(arguments);a.call(this)}})}var b=[],c=CKEDITOR.env.gecko?"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",d=/&/g,l=/>/g,k=/</g,g=/"/g,h=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,m={lt:"\x3c",gt:"\x3e",amp:"\x26",quot:'"',nbsp:" ",shy:"­"},e=function(a,e){return"#"==e[0]?String.fromCharCode(parseInt(e.slice(1),10)):m[e]};CKEDITOR.on("reset",function(){b=[]});CKEDITOR.tools={arrayCompare:function(a,e){if(!a&&!e)return!0;if(!a||!e||a.length!=e.length)return!1;
for(var g=0;g<a.length;g++)if(a[g]!=e[g])return!1;return!0},getIndex:function(a,e){for(var g=0;g<a.length;++g)if(e(a[g]))return g;return-1},clone:function(a){var e;if(a&&a instanceof Array){e=[];for(var g=0;g<a.length;g++)e[g]=CKEDITOR.tools.clone(a[g]);return e}if(null===a||"object"!=typeof a||a instanceof String||a instanceof Number||a instanceof Boolean||a instanceof Date||a instanceof RegExp||a.nodeType||a.window===a)return a;e=new a.constructor;for(g in a)e[g]=CKEDITOR.tools.clone(a[g]);return e},
capitalize:function(a,e){return a.charAt(0).toUpperCase()+(e?a.slice(1):a.slice(1).toLowerCase())},extend:function(a){var e=arguments.length,g,b;"boolean"==typeof(g=arguments[e-1])?e--:"boolean"==typeof(g=arguments[e-2])&&(b=arguments[e-1],e-=2);for(var h=1;h<e;h++){var c=arguments[h]||{};CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(c),function(e){if(!0===g||null==a[e])if(!b||e in b)a[e]=c[e]})}return a},prototypedCopy:function(a){var e=function(){};e.prototype=a;return new e},copy:function(a){var e=
{},g;for(g in a)e[g]=a[g];return e},isArray:function(a){return"[object Array]"==Object.prototype.toString.call(a)},isEmpty:function(a){for(var e in a)if(a.hasOwnProperty(e))return!1;return!0},cssVendorPrefix:function(a,e,g){if(g)return c+a+":"+e+";"+a+":"+e;g={};g[a]=e;g[c+a]=e;return g},cssStyleToDomStyle:function(){var a=document.createElement("div").style,e="undefined"!=typeof a.cssFloat?"cssFloat":"undefined"!=typeof a.styleFloat?"styleFloat":"float";return function(a){return"float"==a?e:a.replace(/-./g,
function(a){return a.substr(1).toUpperCase()})}}(),buildStyleHtml:function(a){a=[].concat(a);for(var e,g=[],b=0;b<a.length;b++)if(e=a[b])/@import|[{}]/.test(e)?g.push("\x3cstyle\x3e"+e+"\x3c/style\x3e"):g.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"'+e+'"\x3e');return g.join("")},htmlEncode:function(a){return void 0===a||null===a?"":String(a).replace(d,"\x26amp;").replace(l,"\x26gt;").replace(k,"\x26lt;")},htmlDecode:function(a){return a.replace(h,e)},htmlEncodeAttr:function(a){return CKEDITOR.tools.htmlEncode(a).replace(g,
"\x26quot;")},htmlDecodeAttr:function(a){return CKEDITOR.tools.htmlDecode(a)},transformPlainTextToHtml:function(a,e){var g=e==CKEDITOR.ENTER_BR,b=this.htmlEncode(a.replace(/\r\n/g,"\n")),b=b.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;"),h=e==CKEDITOR.ENTER_P?"p":"div";if(!g){var c=/\n{2}/g;if(c.test(b))var d="\x3c"+h+"\x3e",m="\x3c/"+h+"\x3e",b=d+b.replace(c,function(){return m+d})+m}b=b.replace(/\n/g,"\x3cbr\x3e");g||(b=b.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/"+h+"\x3e)"),function(a){return CKEDITOR.tools.repeat(a,
2)}));b=b.replace(/^ | $/g,"\x26nbsp;");return b=b.replace(/(>|\s) /g,function(a,e){return e+"\x26nbsp;"}).replace(/ (?=<)/g,"\x26nbsp;")},getNextNumber:function(){var a=0;return function(){return++a}}(),getNextId:function(){return"cke_"+this.getNextNumber()},getUniqueId:function(){for(var a="e",e=0;8>e;e++)a+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return a},override:function(a,e){var g=e(a);g.prototype=a.prototype;return g},setTimeout:function(a,e,g,b,h){h||(h=window);g||(g=
h);return h.setTimeout(function(){b?a.apply(g,[].concat(b)):a.apply(g)},e||0)},throttle:function(a,e,g){return new this.buffers.throttle(a,e,g)},trim:function(){var a=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(e){return e.replace(a,"")}}(),ltrim:function(){var a=/^[ \t\n\r]+/g;return function(e){return e.replace(a,"")}}(),rtrim:function(){var a=/[ \t\n\r]+$/g;return function(e){return e.replace(a,"")}}(),indexOf:function(a,e){if("function"==typeof e)for(var g=0,b=a.length;g<b;g++){if(e(a[g]))return g}else{if(a.indexOf)return a.indexOf(e);
g=0;for(b=a.length;g<b;g++)if(a[g]===e)return g}return-1},search:function(a,e){var g=CKEDITOR.tools.indexOf(a,e);return 0<=g?a[g]:null},bind:function(a,e){return function(){return a.apply(e,arguments)}},createClass:function(a){var e=a.$,g=a.base,b=a.privates||a._,h=a.proto;a=a.statics;!e&&(e=function(){g&&this.base.apply(this,arguments)});if(b)var c=e,e=function(){var a=this._||(this._={}),e;for(e in b){var g=b[e];a[e]="function"==typeof g?CKEDITOR.tools.bind(g,this):g}c.apply(this,arguments)};g&&
(e.prototype=this.prototypedCopy(g.prototype),e.prototype.constructor=e,e.base=g,e.baseProto=g.prototype,e.prototype.base=function r(){this.base=g.prototype.base;g.apply(this,arguments);this.base=r});h&&this.extend(e.prototype,h,!0);a&&this.extend(e,a,!0);return e},addFunction:function(a,e){return b.push(function(){return a.apply(e||this,arguments)})-1},removeFunction:function(a){b[a]=null},callFunction:function(a){var e=b[a];return e&&e.apply(window,Array.prototype.slice.call(arguments,1))},cssLength:function(){var a=
/^-?\d+\.?\d*px$/,e;return function(g){e=CKEDITOR.tools.trim(g+"")+"px";return a.test(e)?e:g||""}}(),convertToPx:function(){var a;return function(e){a||(a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',CKEDITOR.document),CKEDITOR.document.getBody().append(a));if(!/%$/.test(e)){var g=0>parseFloat(e);g&&(e=e.replace("-",""));a.setStyle("width",e);e=a.$.clientWidth;return g?-e:e}return e}}(),repeat:function(a,
e){return Array(e+1).join(a)},tryThese:function(){for(var a,e=0,g=arguments.length;e<g;e++){var b=arguments[e];try{a=b();break}catch(h){}}return a},genKey:function(){return Array.prototype.slice.call(arguments).join("-")},defer:function(a){return function(){var e=arguments,g=this;window.setTimeout(function(){a.apply(g,e)},0)}},normalizeCssText:function(a,e){var g=[],b,h=CKEDITOR.tools.parseCssText(a,!0,e);for(b in h)g.push(b+":"+h[b]);g.sort();return g.length?g.join(";")+";":""},convertRgbToHex:function(a){return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,
function(a,e,g,b){a=[e,g,b];for(e=0;3>e;e++)a[e]=("0"+parseInt(a[e],10).toString(16)).slice(-2);return"#"+a.join("")})},normalizeHex:function(a){return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,function(a,e,g,b){a=e.toLowerCase();3==a.length&&(a=a.split(""),a=[a[0],a[0],a[1],a[1],a[2],a[2]].join(""));return"#"+a+b})},parseCssText:function(a,e,g){var b={};g&&(a=(new CKEDITOR.dom.element("span")).setAttribute("style",a).getAttribute("style")||"");a&&(a=CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
if(!a||";"==a)return b;a.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,g,h){e&&(g=g.toLowerCase(),"font-family"==g&&(h=h.replace(/\s*,\s*/g,",")),h=CKEDITOR.tools.trim(h));b[g]=h});return b},writeCssText:function(a,e){var g,b=[];for(g in a)b.push(g+":"+a[g]);e&&b.sort();return b.join("; ")},objectCompare:function(a,e,g){var b;if(!a&&!e)return!0;if(!a||!e)return!1;for(b in a)if(a[b]!=e[b])return!1;if(!g)for(b in e)if(a[b]!=e[b])return!1;return!0},objectKeys:function(a){return CKEDITOR.tools.object.keys(a)},
convertArrayToObject:function(a,e){var g={};1==arguments.length&&(e=!0);for(var b=0,h=a.length;b<h;++b)g[a[b]]=e;return g},fixDomain:function(){for(var a;;)try{a=window.parent.document.domain;break}catch(e){a=a?a.replace(/.+?(?:\.|$)/,""):document.domain;if(!a)break;document.domain=a}return!!a},eventsBuffer:function(a,e,g){return new this.buffers.event(a,e,g)},enableHtml5Elements:function(a,e){for(var g="abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
b=g.length,h;b--;)h=a.createElement(g[b]),e&&a.appendChild(h)},checkIfAnyArrayItemMatches:function(a,e){for(var g=0,b=a.length;g<b;++g)if(a[g].match(e))return!0;return!1},checkIfAnyObjectPropertyMatches:function(a,e){for(var g in a)if(g.match(e))return!0;return!1},keystrokeToString:function(a,e){var g=this.keystrokeToArray(a,e);g.display=g.display.join("+");g.aria=g.aria.join("+");return g},keystrokeToArray:function(a,e){var g=e&16711680,b=e&65535,h=CKEDITOR.env.mac,c=[],d=[];g&CKEDITOR.CTRL&&(c.push(h?
"⌘":a[17]),d.push(h?a[224]:a[17]));g&CKEDITOR.ALT&&(c.push(h?"⌥":a[18]),d.push(a[18]));g&CKEDITOR.SHIFT&&(c.push(h?"⇧":a[16]),d.push(a[16]));b&&(a[b]?(c.push(a[b]),d.push(a[b])):(c.push(String.fromCharCode(b)),d.push(String.fromCharCode(b))));return{display:c,aria:d}},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",getCookie:function(a){a=a.toLowerCase();for(var e=document.cookie.split(";"),g,b,h=0;h<e.length;h++)if(g=e[h].split("\x3d"),
b=decodeURIComponent(CKEDITOR.tools.trim(g[0]).toLowerCase()),b===a)return decodeURIComponent(1<g.length?g[1]:"");return null},setCookie:function(a,e){document.cookie=encodeURIComponent(a)+"\x3d"+encodeURIComponent(e)+";path\x3d/"},getCsrfToken:function(){var a=CKEDITOR.tools.getCookie("ckCsrfToken");if(!a||40!=a.length){var a=[],e="";if(window.crypto&&window.crypto.getRandomValues)a=new Uint8Array(40),window.crypto.getRandomValues(a);else for(var g=0;40>g;g++)a.push(Math.floor(256*Math.random()));
for(g=0;g<a.length;g++)var b="abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[g]%36),e=e+(.5<Math.random()?b.toUpperCase():b);a=e;CKEDITOR.tools.setCookie("ckCsrfToken",a)}return a},escapeCss:function(a){return a?window.CSS&&CSS.escape?CSS.escape(a):isNaN(parseInt(a.charAt(0),10))?a:"\\3"+a.charAt(0)+" "+a.substring(1,a.length):""},getMouseButton:function(a){return(a=a.data?a.data.$:a)?CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.ie6Compat)?4===a.button?CKEDITOR.MOUSE_BUTTON_MIDDLE:1===a.button?
CKEDITOR.MOUSE_BUTTON_LEFT:CKEDITOR.MOUSE_BUTTON_RIGHT:a.button:!1},convertHexStringToBytes:function(a){var e=[],g=a.length/2,b;for(b=0;b<g;b++)e.push(parseInt(a.substr(2*b,2),16));return e},convertBytesToBase64:function(a){var e="",g=a.length,b;for(b=0;b<g;b+=3){var h=a.slice(b,b+3),c=h.length,d=[],m;if(3>c)for(m=c;3>m;m++)h[m]=0;d[0]=(h[0]&252)>>2;d[1]=(h[0]&3)<<4|h[1]>>4;d[2]=(h[1]&15)<<2|(h[2]&192)>>6;d[3]=h[2]&63;for(m=0;4>m;m++)e=m<=c?e+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d[m]):
e+"\x3d"}return e},style:{parse:{_colors:{aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",
darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",
gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",green:"#008000",greenyellow:"#ADFF2F",grey:"#808080",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",
lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",
mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",
sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",windowtext:"windowtext",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},_borderStyle:"none hidden dotted dashed solid double groove ridge inset outset".split(" "),
_widthRegExp:/^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,_rgbaRegExp:/rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,_hslaRegExp:/hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,background:function(a){var e={},g=this._findColor(a);g.length&&(e.color=g[0],CKEDITOR.tools.array.forEach(g,function(e){a=a.replace(e,"")}));if(a=CKEDITOR.tools.trim(a))e.unprocessed=a;return e},margin:function(a){return CKEDITOR.tools.style.parse.sideShorthand(a,
function(a){return a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g)||["0px"]})},sideShorthand:function(a,e){function g(a){b.top=h[a[0]];b.right=h[a[1]];b.bottom=h[a[2]];b.left=h[a[3]]}var b={},h=e?e(a):a.split(/\s+/);switch(h.length){case 1:g([0,0,0,0]);break;case 2:g([0,1,0,1]);break;case 3:g([0,1,2,1]);break;case 4:g([0,1,2,3])}return b},border:function(a){return CKEDITOR.tools.style.border.fromCssRule(a)},_findColor:function(a){var e=[],g=CKEDITOR.tools.array,e=e.concat(a.match(this._rgbaRegExp)||
[]),e=e.concat(a.match(this._hslaRegExp)||[]);return e=e.concat(g.filter(a.split(/\s+/),function(a){return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi)?!0:a.toLowerCase()in CKEDITOR.tools.style.parse._colors}))}}},array:{filter:function(a,e,g){var b=[];this.forEach(a,function(h,c){e.call(g,h,c,a)&&b.push(h)});return b},find:function(a,e,g){for(var b=a.length,h=0;h<b;){if(e.call(g,a[h],h,a))return a[h];h++}},forEach:function(a,e,g){var b=a.length,h;for(h=0;h<b;h++)e.call(g,a[h],h,a)},map:function(a,
e,g){for(var b=[],h=0;h<a.length;h++)b.push(e.call(g,a[h],h,a));return b},reduce:function(a,e,g,b){for(var h=0;h<a.length;h++)g=e.call(b,g,a[h],h,a);return g},every:function(a,e,g){if(!a.length)return!0;e=this.filter(a,e,g);return a.length===e.length}},object:{DONT_ENUMS:"toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),entries:function(a){return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a),function(e){return[e,a[e]]})},values:function(a){return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a),
function(e){return a[e]})},keys:function(a){var e=Object.prototype.hasOwnProperty,g=[],b=CKEDITOR.tools.object.DONT_ENUMS,h;for(h in a)g.push(h);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)for(h=0;h<b.length;h++)e.call(a,b[h])&&g.push(b[h]);return g},findKey:function(a,e){if("object"!==typeof a)return null;for(var g in a)if(a[g]===e)return g;return null},merge:function(a,e){var g=CKEDITOR.tools,b=g.clone(a),h=g.clone(e);g.array.forEach(g.object.keys(h),function(a){b[a]="object"===typeof h[a]&&"object"===
typeof b[a]?g.object.merge(b[a],h[a]):h[a]});return b}},getAbsoluteRectPosition:function(a,e){function g(a){if(a){var e=a.getClientRect();b.top+=e.top;b.left+=e.left;"x"in b&&"y"in b&&(b.x+=e.x,b.y+=e.y);g(a.getWindow().getFrame())}}var b=CKEDITOR.tools.copy(e);g(a.getFrame());var h=CKEDITOR.document.getWindow().getScrollPosition();b.top+=h.y;b.left+=h.x;"x"in b&&"y"in b&&(b.y+=h.y,b.x+=h.x);b.right=b.left+b.width;b.bottom=b.top+b.height;return b}};a.prototype={reset:function(){this._lastOutput=0;
this._clearTimer()},_reschedule:function(){return!1},_call:function(){this._output()},_clearTimer:function(){this._scheduledTimer&&clearTimeout(this._scheduledTimer);this._scheduledTimer=0}};f.prototype=CKEDITOR.tools.prototypedCopy(a.prototype);f.prototype._reschedule=function(){this._scheduledTimer&&this._clearTimer()};f.prototype._call=function(){this._output.apply(this._context,this._args)};CKEDITOR.tools.buffers={};CKEDITOR.tools.buffers.event=a;CKEDITOR.tools.buffers.throttle=f;CKEDITOR.tools.style.border=
CKEDITOR.tools.createClass({$:function(a){a=a||{};this.width=a.width;this.style=a.style;this.color=a.color;this._.normalize()},_:{normalizeMap:{color:[[/windowtext/g,"black"]]},normalize:function(){for(var a in this._.normalizeMap){var e=this[a];e&&(this[a]=CKEDITOR.tools.array.reduce(this._.normalizeMap[a],function(a,e){return a.replace(e[0],e[1])},e))}}},proto:{toString:function(){return CKEDITOR.tools.array.filter([this.width,this.style,this.color],function(a){return!!a}).join(" ")}},statics:{fromCssRule:function(a){var e=
{},g=a.split(/\s+/g);a=CKEDITOR.tools.style.parse._findColor(a);a.length&&(e.color=a[0]);CKEDITOR.tools.array.forEach(g,function(a){e.style||-1===CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle,a)?!e.width&&CKEDITOR.tools.style.parse._widthRegExp.test(a)&&(e.width=a):e.style=a});return new CKEDITOR.tools.style.border(e)},splitCssValues:function(a,e){e=e||{};var g=CKEDITOR.tools.array.reduce(["width","style","color"],function(g,b){var h=a["border-"+b]||e[b];g[b]=h?CKEDITOR.tools.style.parse.sideShorthand(h):
null;return g},{});return CKEDITOR.tools.array.reduce(["top","right","bottom","left"],function(e,b){var h={},c;for(c in g){var d=a["border-"+b+"-"+c];h[c]=d?d:g[c]&&g[c][b]}e["border-"+b]=new CKEDITOR.tools.style.border(h);return e},{})}}});CKEDITOR.tools.array.indexOf=CKEDITOR.tools.indexOf;CKEDITOR.tools.array.isArray=CKEDITOR.tools.isArray;CKEDITOR.MOUSE_BUTTON_LEFT=0;CKEDITOR.MOUSE_BUTTON_MIDDLE=1;CKEDITOR.MOUSE_BUTTON_RIGHT=2}(),CKEDITOR.dtd=function(){var a=CKEDITOR.tools.extend,f=function(a,
e){for(var g=CKEDITOR.tools.clone(a),b=1;b<arguments.length;b++){e=arguments[b];for(var h in e)delete g[h]}return g},b={},c={},d={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},l={command:1,link:1,meta:1,noscript:1,script:1,style:1},k={},g={"#":1},h={center:1,dir:1,noframes:1};a(b,{a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,
canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},g,{acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1});a(c,d,b,h);f={a:f(b,{a:1,button:1}),abbr:b,address:c,area:k,article:c,aside:c,audio:a({source:1,track:1},c),b:b,base:k,
bdi:b,bdo:b,blockquote:c,body:c,br:k,button:f(b,{a:1,button:1}),canvas:b,caption:c,cite:b,code:b,col:k,colgroup:{col:1},command:k,datalist:a({option:1},b),dd:c,del:b,details:a({summary:1},c),dfn:b,div:c,dl:{dt:1,dd:1},dt:c,em:b,embed:k,fieldset:a({legend:1},c),figcaption:c,figure:a({figcaption:1},c),footer:c,form:c,h1:b,h2:b,h3:b,h4:b,h5:b,h6:b,head:a({title:1,base:1},l),header:c,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:k,html:a({head:1,body:1},c,l),i:b,iframe:g,img:k,input:k,ins:b,kbd:b,keygen:k,
label:b,legend:b,li:c,link:k,main:c,map:c,mark:b,menu:a({li:1},c),meta:k,meter:f(b,{meter:1}),nav:c,noscript:a({link:1,meta:1,style:1},b),object:a({param:1},b),ol:{li:1},optgroup:{option:1},option:g,output:b,p:b,param:k,pre:b,progress:f(b,{progress:1}),q:b,rp:b,rt:b,ruby:a({rp:1,rt:1},b),s:b,samp:b,script:g,section:c,select:{optgroup:1,option:1},small:b,source:k,span:b,strong:b,style:g,sub:b,summary:a({h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},b),sup:b,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},
tbody:{tr:1},td:c,textarea:g,tfoot:{tr:1},th:c,thead:{tr:1},time:f(b,{time:1}),title:g,tr:{th:1,td:1},track:k,u:b,ul:{li:1},"var":b,video:a({source:1,track:1},c),wbr:k,acronym:b,applet:a({param:1},c),basefont:k,big:b,center:c,dialog:k,dir:{li:1},font:b,isindex:k,noframes:c,strike:b,tt:b};a(f,{$block:a({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},d,h),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,
main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:b,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,
li:1},$nonBodyContent:a({body:1,head:1,html:1},f.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,
"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return f}(),CKEDITOR.dom.event=function(a){this.$=a},CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||
this.$.which},getKeystroke:function(){var a=this.getKey();if(this.$.ctrlKey||this.$.metaKey)a+=CKEDITOR.CTRL;this.$.shiftKey&&(a+=CKEDITOR.SHIFT);this.$.altKey&&(a+=CKEDITOR.ALT);return a},preventDefault:function(a){var f=this.$;f.preventDefault?f.preventDefault():f.returnValue=!1;a&&this.stopPropagation()},stopPropagation:function(){var a=this.$;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},getTarget:function(){var a=this.$.target||this.$.srcElement;return a?new CKEDITOR.dom.node(a):null},
getPhase:function(){return this.$.eventPhase||2},getPageOffset:function(){var a=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(a.documentElement.scrollLeft||a.body.scrollLeft),y:this.$.pageY||this.$.clientY+(a.documentElement.scrollTop||a.body.scrollTop)}}},CKEDITOR.CTRL=1114112,CKEDITOR.SHIFT=2228224,CKEDITOR.ALT=4456448,CKEDITOR.EVENT_PHASE_CAPTURING=1,CKEDITOR.EVENT_PHASE_AT_TARGET=2,CKEDITOR.EVENT_PHASE_BUBBLING=3,CKEDITOR.dom.domObject=function(a){a&&(this.$=a)},CKEDITOR.dom.domObject.prototype=
function(){var a=function(a,b){return function(c){"undefined"!=typeof CKEDITOR&&a.fire(b,new CKEDITOR.dom.event(c))}};return{getPrivate:function(){var a;(a=this.getCustomData("_"))||this.setCustomData("_",a={});return a},on:function(f){var b=this.getCustomData("_cke_nativeListeners");b||(b={},this.setCustomData("_cke_nativeListeners",b));b[f]||(b=b[f]=a(this,f),this.$.addEventListener?this.$.addEventListener(f,b,!!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent("on"+f,b));return CKEDITOR.event.prototype.on.apply(this,
arguments)},removeListener:function(a){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(a)){var b=this.getCustomData("_cke_nativeListeners"),c=b&&b[a];c&&(this.$.removeEventListener?this.$.removeEventListener(a,c,!1):this.$.detachEvent&&this.$.detachEvent("on"+a,c),delete b[a])}},removeAllListeners:function(){var a=this.getCustomData("_cke_nativeListeners"),b;for(b in a){var c=a[b];this.$.detachEvent?this.$.detachEvent("on"+b,c):this.$.removeEventListener&&this.$.removeEventListener(b,
c,!1);delete a[b]}CKEDITOR.event.prototype.removeAllListeners.call(this)}}}(),function(a){var f={};CKEDITOR.on("reset",function(){f={}});a.equals=function(a){try{return a&&a.$===this.$}catch(c){return!1}};a.setCustomData=function(a,c){var d=this.getUniqueId();(f[d]||(f[d]={}))[a]=c;return this};a.getCustomData=function(a){var c=this.$["data-cke-expando"];return(c=c&&f[c])&&a in c?c[a]:null};a.removeCustomData=function(a){var c=this.$["data-cke-expando"],c=c&&f[c],d,l;c&&(d=c[a],l=a in c,delete c[a]);
return l?d:null};a.clearCustomData=function(){this.removeAllListeners();var a=this.$["data-cke-expando"];a&&delete f[a]};a.getUniqueId=function(){return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber())};CKEDITOR.event.implementOn(a)}(CKEDITOR.dom.domObject.prototype),CKEDITOR.dom.node=function(a){return a?new CKEDITOR.dom[a.nodeType==CKEDITOR.NODE_DOCUMENT?"document":a.nodeType==CKEDITOR.NODE_ELEMENT?"element":a.nodeType==CKEDITOR.NODE_TEXT?"text":a.nodeType==
CKEDITOR.NODE_COMMENT?"comment":a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject"](a):this},CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject,CKEDITOR.NODE_ELEMENT=1,CKEDITOR.NODE_DOCUMENT=9,CKEDITOR.NODE_TEXT=3,CKEDITOR.NODE_COMMENT=8,CKEDITOR.NODE_DOCUMENT_FRAGMENT=11,CKEDITOR.POSITION_IDENTICAL=0,CKEDITOR.POSITION_DISCONNECTED=1,CKEDITOR.POSITION_FOLLOWING=2,CKEDITOR.POSITION_PRECEDING=4,CKEDITOR.POSITION_IS_CONTAINED=8,CKEDITOR.POSITION_CONTAINS=16,CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,
{appendTo:function(a,f){a.append(this,f);return a},clone:function(a,f){function b(c){c["data-cke-expando"]&&(c["data-cke-expando"]=!1);if(c.nodeType==CKEDITOR.NODE_ELEMENT||c.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)if(f||c.nodeType!=CKEDITOR.NODE_ELEMENT||c.removeAttribute("id",!1),a){c=c.childNodes;for(var d=0;d<c.length;d++)b(c[d])}}function c(b){if(b.type==CKEDITOR.NODE_ELEMENT||b.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){if(b.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var d=b.getName();":"==d[0]&&
b.renameNode(d.substring(1))}if(a)for(d=0;d<b.getChildCount();d++)c(b.getChild(d))}}var d=this.$.cloneNode(a);b(d);d=new CKEDITOR.dom.node(d);CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&c(d);return d},hasPrevious:function(){return!!this.$.previousSibling},hasNext:function(){return!!this.$.nextSibling},insertAfter:function(a){a.$.parentNode.insertBefore(this.$,a.$.nextSibling);return a},insertBefore:function(a){a.$.parentNode.insertBefore(this.$,
a.$);return a},insertBeforeMe:function(a){this.$.parentNode.insertBefore(a.$,this.$);return a},getAddress:function(a){for(var f=[],b=this.getDocument().$.documentElement,c=this.$;c&&c!=b;){var d=c.parentNode;d&&f.unshift(this.getIndex.call({$:c},a));c=d}return f},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument)},getIndex:function(a){function f(a,g){var h=g?a.nextSibling:a.previousSibling;return h&&h.nodeType==CKEDITOR.NODE_TEXT?b(h)?f(h,
g):h:null}function b(a){return!a.nodeValue||a.nodeValue==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE}var c=this.$,d=-1,l;if(!this.$.parentNode||a&&c.nodeType==CKEDITOR.NODE_TEXT&&b(c)&&!f(c)&&!f(c,!0))return-1;do a&&c!=this.$&&c.nodeType==CKEDITOR.NODE_TEXT&&(l||b(c))||(d++,l=c.nodeType==CKEDITOR.NODE_TEXT);while(c=c.previousSibling);return d},getNextSourceNode:function(a,f,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getFirst&&this.getFirst();var d;if(!a){if(this.type==
CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getNext()}for(;!a&&(d=(d||this).getParent());){if(b&&!1===b(d,!0))return null;a=d.getNext()}return!a||b&&!1===b(a)?null:f&&f!=a.type?a.getNextSourceNode(!1,f,b):a},getPreviousSourceNode:function(a,f,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getLast&&this.getLast();var d;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getPrevious()}for(;!a&&(d=(d||this).getParent());){if(b&&!1===
b(d,!0))return null;a=d.getPrevious()}return!a||b&&!1===b(a)?null:f&&a.type!=f?a.getPreviousSourceNode(!1,f,b):a},getPrevious:function(a){var f=this.$,b;do b=(f=f.previousSibling)&&10!=f.nodeType&&new CKEDITOR.dom.node(f);while(b&&a&&!a(b));return b},getNext:function(a){var f=this.$,b;do b=(f=f.nextSibling)&&new CKEDITOR.dom.node(f);while(b&&a&&!a(b));return b},getParent:function(a){var f=this.$.parentNode;return f&&(f.nodeType==CKEDITOR.NODE_ELEMENT||a&&f.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?
new CKEDITOR.dom.node(f):null},getParents:function(a){var f=this,b=[];do b[a?"push":"unshift"](f);while(f=f.getParent());return b},getCommonAncestor:function(a){if(a.equals(this))return this;if(a.contains&&a.contains(this))return a;var f=this.contains?this:this.getParent();do if(f.contains(a))return f;while(f=f.getParent());return null},getPosition:function(a){var f=this.$,b=a.$;if(f.compareDocumentPosition)return f.compareDocumentPosition(b);if(f==b)return CKEDITOR.POSITION_IDENTICAL;if(this.type==
CKEDITOR.NODE_ELEMENT&&a.type==CKEDITOR.NODE_ELEMENT){if(f.contains){if(f.contains(b))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(b.contains(f))return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING}if("sourceIndex"in f)return 0>f.sourceIndex||0>b.sourceIndex?CKEDITOR.POSITION_DISCONNECTED:f.sourceIndex<b.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING}f=this.getAddress();a=a.getAddress();for(var b=Math.min(f.length,a.length),c=0;c<b;c++)if(f[c]!=
a[c])return f[c]<a[c]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;return f.length<a.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING},getAscendant:function(a,f){var b=this.$,c,d;f||(b=b.parentNode);"function"==typeof a?(d=!0,c=a):(d=!1,c=function(b){b="string"==typeof b.nodeName?b.nodeName.toLowerCase():"";return"string"==typeof a?b==a:b in a});for(;b;){if(c(d?new CKEDITOR.dom.node(b):b))return new CKEDITOR.dom.node(b);
try{b=b.parentNode}catch(l){b=null}}return null},hasAscendant:function(a,f){var b=this.$;f||(b=b.parentNode);for(;b;){if(b.nodeName&&b.nodeName.toLowerCase()==a)return!0;b=b.parentNode}return!1},move:function(a,f){a.append(this.remove(),f)},remove:function(a){var f=this.$,b=f.parentNode;if(b){if(a)for(;a=f.firstChild;)b.insertBefore(f.removeChild(a),f);b.removeChild(f)}return this},replace:function(a){this.insertBefore(a);a.remove()},trim:function(){this.ltrim();this.rtrim()},ltrim:function(){for(var a;this.getFirst&&
(a=this.getFirst());){if(a.type==CKEDITOR.NODE_TEXT){var f=CKEDITOR.tools.ltrim(a.getText()),b=a.getLength();if(f)f.length<b&&(a.split(b-f.length),this.$.removeChild(this.$.firstChild));else{a.remove();continue}}break}},rtrim:function(){for(var a;this.getLast&&(a=this.getLast());){if(a.type==CKEDITOR.NODE_TEXT){var f=CKEDITOR.tools.rtrim(a.getText()),b=a.getLength();if(f)f.length<b&&(a.split(f.length),this.$.lastChild.parentNode.removeChild(this.$.lastChild));else{a.remove();continue}}break}CKEDITOR.env.needsBrFiller&&
(a=this.$.lastChild)&&1==a.type&&"br"==a.nodeName.toLowerCase()&&a.parentNode.removeChild(a)},isReadOnly:function(a){var f=this;this.type!=CKEDITOR.NODE_ELEMENT&&(f=this.getParent());CKEDITOR.env.edge&&f&&f.is("textarea","input")&&(a=!0);if(!a&&f&&"undefined"!=typeof f.$.isContentEditable)return!(f.$.isContentEditable||f.data("cke-editable"));for(;f;){if(f.data("cke-editable"))return!1;if(f.hasAttribute("contenteditable"))return"false"==f.getAttribute("contenteditable");f=f.getParent()}return!0}}),
CKEDITOR.dom.window=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus()},getViewPaneSize:function(){var a=this.$.document,f="CSS1Compat"==a.compatMode;return{width:(f?a.documentElement.clientWidth:a.body.clientWidth)||0,height:(f?a.documentElement.clientHeight:a.body.clientHeight)||0}},getScrollPosition:function(){var a=this.$;if("pageXOffset"in a)return{x:a.pageXOffset||
0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||a.body.scrollTop||0}},getFrame:function(){var a=this.$.frameElement;return a?new CKEDITOR.dom.element.get(a):null}}),CKEDITOR.dom.document=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(a){if(this.$.createStyleSheet)this.$.createStyleSheet(a);
else{var f=new CKEDITOR.dom.element("link");f.setAttributes({rel:"stylesheet",type:"text/css",href:a});this.getHead().append(f)}},appendStyleText:function(a){if(this.$.createStyleSheet){var f=this.$.createStyleSheet("");f.cssText=a}else{var b=new CKEDITOR.dom.element("style",this);b.append(new CKEDITOR.dom.text(a,this));this.getHead().append(b)}return f||b.$.sheet},createElement:function(a,f){var b=new CKEDITOR.dom.element(a,this);f&&(f.attributes&&b.setAttributes(f.attributes),f.styles&&b.setStyles(f.styles));
return b},createText:function(a){return new CKEDITOR.dom.text(a,this)},focus:function(){this.getWindow().focus()},getActive:function(){var a;try{a=this.$.activeElement}catch(f){return null}return new CKEDITOR.dom.element(a)},getById:function(a){return(a=this.$.getElementById(a))?new CKEDITOR.dom.element(a):null},getByAddress:function(a,f){for(var b=this.$.documentElement,c=0;b&&c<a.length;c++){var d=a[c];if(f)for(var l=-1,k=0;k<b.childNodes.length;k++){var g=b.childNodes[k];if(!0!==f||3!=g.nodeType||
!g.previousSibling||3!=g.previousSibling.nodeType)if(l++,l==d){b=g;break}}else b=b.childNodes[d]}return b?new CKEDITOR.dom.node(b):null},getElementsByTag:function(a,f){CKEDITOR.env.ie&&8>=document.documentMode||!f||(a=f+":"+a);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))},getHead:function(){var a=this.$.getElementsByTagName("head")[0];return a=a?new CKEDITOR.dom.element(a):this.getDocumentElement().append(new CKEDITOR.dom.element("head"),!0)},getBody:function(){return new CKEDITOR.dom.element(this.$.body)},
getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement)},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView)},write:function(a){this.$.open("text/html","replace");CKEDITOR.env.ie&&(a=a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e('+CKEDITOR.tools.fixDomain+")();\x3c/script\x3e"));this.$.write(a);this.$.close()},find:function(a){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))},findOne:function(a){return(a=
this.$.querySelector(a))?new CKEDITOR.dom.element(a):null},_getHtml5ShivFrag:function(){var a=this.getCustomData("html5ShivFrag");a||(a=this.$.createDocumentFragment(),CKEDITOR.tools.enableHtml5Elements(a,!0),this.setCustomData("html5ShivFrag",a));return a}}),CKEDITOR.dom.nodeList=function(a){this.$=a},CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length},getItem:function(a){return 0>a||a>=this.$.length?null:(a=this.$[a])?new CKEDITOR.dom.node(a):null},toArray:function(){return CKEDITOR.tools.array.map(this.$,
function(a){return new CKEDITOR.dom.node(a)})}},CKEDITOR.dom.element=function(a,f){"string"==typeof a&&(a=(f?f.$:document).createElement(a));CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.element.get=function(a){return(a="string"==typeof a?document.getElementById(a)||document.getElementsByName(a)[0]:a)&&(a.$?a:new CKEDITOR.dom.element(a))},CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node,CKEDITOR.dom.element.createFromHtml=function(a,f){var b=new CKEDITOR.dom.element("div",f);b.setHtml(a);
return b.getFirst().remove()},CKEDITOR.dom.element.setMarker=function(a,f,b,c){var d=f.getCustomData("list_marker_id")||f.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),l=f.getCustomData("list_marker_names")||f.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");a[d]=f;l[b]=1;return f.setCustomData(b,c)},CKEDITOR.dom.element.clearAllMarkers=function(a){for(var f in a)CKEDITOR.dom.element.clearMarkers(a,a[f],1)},CKEDITOR.dom.element.clearMarkers=
function(a,f,b){var c=f.getCustomData("list_marker_names"),d=f.getCustomData("list_marker_id"),l;for(l in c)f.removeCustomData(l);f.removeCustomData("list_marker_names");b&&(f.removeCustomData("list_marker_id"),delete a[d])},function(){function a(a,b){return-1<(" "+a+" ").replace(l," ").indexOf(" "+b+" ")}function f(a){var b=!0;a.$.id||(a.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber(),b=!1);return function(){b||a.removeAttribute("id")}}function b(a,b){var c=CKEDITOR.tools.escapeCss(a.$.id);return"#"+
c+" "+b.split(/,\s*/).join(", #"+c+" ")}function c(a){for(var b=0,c=0,e=k[a].length;c<e;c++)b+=parseFloat(this.getComputedStyle(k[a][c])||0,10)||0;return b}var d=document.createElement("_").classList,d="undefined"!==typeof d&&null!==String(d.add).match(/\[Native code\]/gi),l=/[\n\t\r]/g;CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:d?function(a){this.$.classList.add(a);return this}:function(g){var b=this.$.className;b&&(a(b,g)||(b+=" "+g));this.$.className=
b||g;return this},removeClass:d?function(a){var b=this.$;b.classList.remove(a);b.className||b.removeAttribute("class");return this}:function(g){var b=this.getAttribute("class");b&&a(b,g)&&((b=b.replace(new RegExp("(?:^|\\s+)"+g+"(?\x3d\\s|$)"),"").replace(/^\s+/,""))?this.setAttribute("class",b):this.removeAttribute("class"));return this},hasClass:function(b){return a(this.$.className,b)},append:function(a,b){"string"==typeof a&&(a=this.getDocument().createElement(a));b?this.$.insertBefore(a.$,this.$.firstChild):
this.$.appendChild(a.$);return a},appendHtml:function(a){if(this.$.childNodes.length){var b=new CKEDITOR.dom.element("div",this.getDocument());b.setHtml(a);b.moveChildren(this)}else this.setHtml(a)},appendText:function(a){null!=this.$.text&&CKEDITOR.env.ie&&9>CKEDITOR.env.version?this.$.text+=a:this.append(new CKEDITOR.dom.text(a))},appendBogus:function(a){if(a||CKEDITOR.env.needsBrFiller){for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();a&&
a.is&&a.is("br")||(a=this.getDocument().createElement("br"),CKEDITOR.env.gecko&&a.setAttribute("type","_moz"),this.append(a))}},breakParent:function(a,b){var c=new CKEDITOR.dom.range(this.getDocument());c.setStartAfter(this);c.setEndAfter(a);var e=c.extractContents(!1,b||!1),d;c.insertNode(this.remove());if(CKEDITOR.env.ie&&!CKEDITOR.env.edge){for(c=new CKEDITOR.dom.element("div");d=e.getFirst();)d.$.style.backgroundColor&&(d.$.style.backgroundColor=d.$.style.backgroundColor),c.append(d);c.insertAfter(this);
c.remove(!0)}else e.insertAfterNode(this)},contains:document.compareDocumentPosition?function(a){return!!(this.$.compareDocumentPosition(a.$)&16)}:function(a){var b=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?b.contains(a.getParent().$):b!=a.$&&b.contains(a.$)},focus:function(){function a(){try{this.$.focus()}catch(b){}}return function(b){b?CKEDITOR.tools.setTimeout(a,100,this):a.call(this)}}(),getHtml:function(){var a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g,""):a},getOuterHtml:function(){if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/,
"");var a=this.$.ownerDocument.createElement("div");a.appendChild(this.$.cloneNode(!0));return a.innerHTML},getClientRect:function(a){var b=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());!b.width&&(b.width=b.right-b.left);!b.height&&(b.height=b.bottom-b.top);return a?CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(),b):b},setHtml:CKEDITOR.env.ie&&9>CKEDITOR.env.version?function(a){try{var b=this.$;if(this.getParent())return b.innerHTML=a;var c=this.getDocument()._getHtml5ShivFrag();
c.appendChild(b);b.innerHTML=a;c.removeChild(b);return a}catch(e){this.$.innerHTML="";b=new CKEDITOR.dom.element("body",this.getDocument());b.$.innerHTML=a;for(b=b.getChildren();b.count();)this.append(b.getItem(0));return a}}:function(a){return this.$.innerHTML=a},setText:function(){var a=document.createElement("p");a.innerHTML="x";a=a.textContent;return function(b){this.$[a?"textContent":"innerText"]=b}}(),getAttribute:function(){var a=function(a){return this.$.getAttribute(a,2)};return CKEDITOR.env.ie&&
(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){switch(a){case "class":a="className";break;case "http-equiv":a="httpEquiv";break;case "name":return this.$.name;case "tabindex":return a=this.$.getAttribute(a,2),0!==a&&0===this.$.tabIndex&&(a=null),a;case "checked":return a=this.$.attributes.getNamedItem(a),(a.specified?a.nodeValue:this.$.checked)?"checked":null;case "hspace":case "value":return this.$[a];case "style":return this.$.style.cssText;case "contenteditable":case "contentEditable":return this.$.attributes.getNamedItem("contentEditable").specified?
this.$.getAttribute("contentEditable"):null}return this.$.getAttribute(a,2)}:a}(),getAttributes:function(a){var b={},c=this.$.attributes,e;a=CKEDITOR.tools.isArray(a)?a:[];for(e=0;e<c.length;e++)-1===CKEDITOR.tools.indexOf(a,c[e].name)&&(b[c[e].name]=c[e].value);return b},getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes)},getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(a){var b=this.getWindow().$.getComputedStyle(this.$,null);return b?
b.getPropertyValue(a):""}:function(a){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]},getDtd:function(){var a=CKEDITOR.dtd[this.getName()];this.getDtd=function(){return a};return a},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:function(){var a=this.$.tabIndex;return 0!==a||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute("tabindex"),10)?a:-1},getText:function(){return this.$.textContent||this.$.innerText||""},getWindow:function(){return this.getDocument().getWindow()},
getId:function(){return this.$.id||null},getNameAtt:function(){return this.$.name||null},getName:function(){var a=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&8>=document.documentMode){var b=this.$.scopeName;"HTML"!=b&&(a=b.toLowerCase()+":"+a)}this.getName=function(){return a};return this.getName()},getValue:function(){return this.$.value},getFirst:function(a){var b=this.$.firstChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getNext(a));return b},getLast:function(a){var b=this.$.lastChild;
(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getPrevious(a));return b},getStyle:function(a){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]},is:function(){var a=this.getName();if("object"==typeof arguments[0])return!!arguments[0][a];for(var b=0;b<arguments.length;b++)if(arguments[b]==a)return!0;return!1},isEditable:function(a){var b=this.getName();return this.isReadOnly()||"none"==this.getComputedStyle("display")||"hidden"==this.getComputedStyle("visibility")||CKEDITOR.dtd.$nonEditable[b]||
CKEDITOR.dtd.$empty[b]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount()?!1:!1!==a?(a=CKEDITOR.dtd[b]||CKEDITOR.dtd.span,!(!a||!a["#"])):!0},isIdentical:function(a){var b=this.clone(0,1);a=a.clone(0,1);b.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);a.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);if(b.$.isEqualNode)return b.$.style.cssText=CKEDITOR.tools.normalizeCssText(b.$.style.cssText),
a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText),b.$.isEqualNode(a.$);b=b.getOuterHtml();a=a.getOuterHtml();if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&this.is("a")){var c=this.getParent();c.type==CKEDITOR.NODE_ELEMENT&&(c=c.clone(),c.setHtml(b),b=c.getHtml(),c.setHtml(a),a=c.getHtml())}return b==a},isVisible:function(){var a=(this.$.offsetHeight||this.$.offsetWidth)&&"hidden"!=this.getComputedStyle("visibility"),b,c;a&&CKEDITOR.env.webkit&&(b=this.getWindow(),!b.equals(CKEDITOR.document.getWindow())&&
(c=b.$.frameElement)&&(a=(new CKEDITOR.dom.element(c)).isVisible()));return!!a},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return!1;for(var a=this.getChildren(),b=0,c=a.count();b<c;b++){var e=a.getItem(b);if(e.type!=CKEDITOR.NODE_ELEMENT||!e.data("cke-bookmark"))if(e.type==CKEDITOR.NODE_ELEMENT&&!e.isEmptyInlineRemoveable()||e.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(e.getText()))return!1}return!0},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||
CKEDITOR.env.quirks)?function(){for(var a=this.$.attributes,b=0;b<a.length;b++){var c=a[b];switch(c.nodeName){case "class":if(this.getAttribute("class"))return!0;case "data-cke-expando":continue;default:if(c.specified)return!0}}return!1}:function(){var a=this.$.attributes,b=a.length,c={"data-cke-expando":1,_moz_dirty:1};return 0<b&&(2<b||!c[a[0].nodeName]||2==b&&!c[a[1].nodeName])},hasAttribute:function(){function a(b){var g=this.$.attributes.getNamedItem(b);if("input"==this.getName())switch(b){case "class":return 0<
this.$.className.length;case "checked":return!!this.$.checked;case "value":return b=this.getAttribute("type"),"checkbox"==b||"radio"==b?"on"!=this.$.value:!!this.$.value}return g?g.specified:!1}return CKEDITOR.env.ie?8>CKEDITOR.env.version?function(b){return"name"==b?!!this.$.name:a.call(this,b)}:a:function(a){return!!this.$.attributes.getNamedItem(a)}}(),hide:function(){this.setStyle("display","none")},moveChildren:function(a,b){var c=this.$;a=a.$;if(c!=a){var e;if(b)for(;e=c.lastChild;)a.insertBefore(c.removeChild(e),
a.firstChild);else for(;e=c.firstChild;)a.appendChild(c.removeChild(e))}},mergeSiblings:function(){function a(b,g,e){if(g&&g.type==CKEDITOR.NODE_ELEMENT){for(var c=[];g.data("cke-bookmark")||g.isEmptyInlineRemoveable();)if(c.push(g),g=e?g.getNext():g.getPrevious(),!g||g.type!=CKEDITOR.NODE_ELEMENT)return;if(b.isIdentical(g)){for(var d=e?b.getLast():b.getFirst();c.length;)c.shift().move(b,!e);g.moveChildren(b,!e);g.remove();d&&d.type==CKEDITOR.NODE_ELEMENT&&d.mergeSiblings()}}}return function(b){if(!1===
b||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a"))a(this,this.getNext(),!0),a(this,this.getPrevious())}}(),show:function(){this.setStyles({display:"",visibility:""})},setAttribute:function(){var a=function(a,b){this.$.setAttribute(a,b);return this};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(b,c){"class"==b?this.$.className=c:"style"==b?this.$.style.cssText=c:"tabindex"==b?this.$.tabIndex=c:"checked"==b?this.$.checked=c:"contenteditable"==b?a.call(this,
"contentEditable",c):a.apply(this,arguments);return this}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(b,c){if("src"==b&&c.match(/^http:\/\//))try{a.apply(this,arguments)}catch(e){}else a.apply(this,arguments);return this}:a}(),setAttributes:function(a){for(var b in a)this.setAttribute(b,a[b]);return this},setValue:function(a){this.$.value=a;return this},removeAttribute:function(){var a=function(a){this.$.removeAttribute(a)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?
function(a){"class"==a?a="className":"tabindex"==a?a="tabIndex":"contenteditable"==a&&(a="contentEditable");this.$.removeAttribute(a)}:a}(),removeAttributes:function(a){if(CKEDITOR.tools.isArray(a))for(var b=0;b<a.length;b++)this.removeAttribute(a[b]);else for(b in a=a||this.getAttributes(),a)a.hasOwnProperty(b)&&this.removeAttribute(b)},removeStyle:function(a){var b=this.$.style;if(b.removeProperty||"border"!=a&&"margin"!=a&&"padding"!=a)b.removeProperty?b.removeProperty(a):b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)),
this.$.style.cssText||this.removeAttribute("style");else{var c=["top","left","right","bottom"],e;"border"==a&&(e=["color","style","width"]);for(var b=[],d=0;d<c.length;d++)if(e)for(var f=0;f<e.length;f++)b.push([a,c[d],e[f]].join("-"));else b.push([a,c[d]].join("-"));for(a=0;a<b.length;a++)this.removeStyle(b[a])}},setStyle:function(a,b){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},setOpacity:function(a){CKEDITOR.env.ie&&
9>CKEDITOR.env.version?(a=Math.round(100*a),this.setStyle("filter",100<=a?"":"progid:DXImageTransform.Microsoft.Alpha(opacity\x3d"+a+")")):this.setStyle("opacity",a)},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","none"));if(CKEDITOR.env.ie){this.setAttribute("unselectable","on");for(var a,b=this.getElementsByTag("*"),c=0,e=b.count();c<e;c++)a=b.getItem(c),a.setAttribute("unselectable","on")}},getPositionedAncestor:function(){for(var a=this;"html"!=a.getName();){if("static"!=
a.getComputedStyle("position"))return a;a=a.getParent()}return null},getDocumentPosition:function(a){var b=0,c=0,e=this.getDocument(),d=e.getBody(),f="BackCompat"==e.$.compatMode;if(document.documentElement.getBoundingClientRect&&(CKEDITOR.env.ie?8!==CKEDITOR.env.version:1)){var l=this.$.getBoundingClientRect(),k=e.$.documentElement,p=k.clientTop||d.$.clientTop||0,v=k.clientLeft||d.$.clientLeft||0,w=!0;CKEDITOR.env.ie&&(w=e.getDocumentElement().contains(this),e=e.getBody().contains(this),w=f&&e||
!f&&w);w&&(CKEDITOR.env.webkit||CKEDITOR.env.ie&&12<=CKEDITOR.env.version?(b=d.$.scrollLeft||k.scrollLeft,c=d.$.scrollTop||k.scrollTop):(c=f?d.$:k,b=c.scrollLeft,c=c.scrollTop),b=l.left+b-v,c=l.top+c-p)}else for(p=this,v=null;p&&"body"!=p.getName()&&"html"!=p.getName();){b+=p.$.offsetLeft-p.$.scrollLeft;c+=p.$.offsetTop-p.$.scrollTop;p.equals(this)||(b+=p.$.clientLeft||0,c+=p.$.clientTop||0);for(;v&&!v.equals(p);)b-=v.$.scrollLeft,c-=v.$.scrollTop,v=v.getParent();v=p;p=(l=p.$.offsetParent)?new CKEDITOR.dom.element(l):
null}a&&(l=this.getWindow(),p=a.getWindow(),!l.equals(p)&&l.$.frameElement&&(a=(new CKEDITOR.dom.element(l.$.frameElement)).getDocumentPosition(a),b+=a.x,c+=a.y));document.documentElement.getBoundingClientRect||!CKEDITOR.env.gecko||f||(b+=this.$.clientLeft?1:0,c+=this.$.clientTop?1:0);return{x:b,y:c}},scrollIntoView:function(a){var b=this.getParent();if(b){do if((b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is("body")&&this.scrollIntoParent(b,
a,1),b.is("html")){var c=b.getWindow();try{var e=c.$.frameElement;e&&(b=new CKEDITOR.dom.element(e))}catch(d){}}while(b=b.getParent())}},scrollIntoParent:function(a,b,c){var e,d,f,l;function k(e,b){/body|html/.test(a.getName())?a.getWindow().$.scrollBy(e,b):(a.$.scrollLeft+=e,a.$.scrollTop+=b)}function p(a,e){var b={x:0,y:0};if(!a.is(w?"body":"html")){var c=a.$.getBoundingClientRect();b.x=c.left;b.y=c.top}c=a.getWindow();c.equals(e)||(c=p(CKEDITOR.dom.element.get(c.$.frameElement),e),b.x+=c.x,b.y+=
c.y);return b}function v(a,b){return parseInt(a.getComputedStyle("margin-"+b)||0,10)||0}!a&&(a=this.getWindow());f=a.getDocument();var w="BackCompat"==f.$.compatMode;a instanceof CKEDITOR.dom.window&&(a=w?f.getBody():f.getDocumentElement());CKEDITOR.env.webkit&&(f=this.getEditor(!1))&&(f._.previousScrollTop=null);f=a.getWindow();d=p(this,f);var r=p(a,f),z=this.$.offsetHeight;e=this.$.offsetWidth;var t=a.$.clientHeight,x=a.$.clientWidth;f=d.x-v(this,"left")-r.x||0;l=d.y-v(this,"top")-r.y||0;e=d.x+
e+v(this,"right")-(r.x+x)||0;d=d.y+z+v(this,"bottom")-(r.y+t)||0;(0>l||0<d)&&k(0,!0===b?l:!1===b?d:0>l?l:d);c&&(0>f||0<e)&&k(0>f?f:e,0)},setState:function(a,b,c){b=b||"cke";switch(a){case CKEDITOR.TRISTATE_ON:this.addClass(b+"_on");this.removeClass(b+"_off");this.removeClass(b+"_disabled");c&&this.setAttribute("aria-pressed",!0);c&&this.removeAttribute("aria-disabled");break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(b+"_disabled");this.removeClass(b+"_off");this.removeClass(b+"_on");c&&this.setAttribute("aria-disabled",
!0);c&&this.removeAttribute("aria-pressed");break;default:this.addClass(b+"_off"),this.removeClass(b+"_on"),this.removeClass(b+"_disabled"),c&&this.removeAttribute("aria-pressed"),c&&this.removeAttribute("aria-disabled")}},getFrameDocument:function(){var a=this.$;try{a.contentWindow.document}catch(b){a.src=a.src}return a&&new CKEDITOR.dom.document(a.contentWindow.document)},copyAttributes:function(a,b){var c=this.$.attributes;b=b||{};for(var e=0;e<c.length;e++){var d=c[e],f=d.nodeName.toLowerCase(),
l;if(!(f in b))if("checked"==f&&(l=this.getAttribute(f)))a.setAttribute(f,l);else if(!CKEDITOR.env.ie||this.hasAttribute(f))l=this.getAttribute(f),null===l&&(l=d.nodeValue),a.setAttribute(f,l)}""!==this.$.style.cssText&&(a.$.style.cssText=this.$.style.cssText)},renameNode:function(a){if(this.getName()!=a){var b=this.getDocument();a=new CKEDITOR.dom.element(a,b);this.copyAttributes(a);this.moveChildren(a);this.getParent(!0)&&this.$.parentNode.replaceChild(a.$,this.$);a.$["data-cke-expando"]=this.$["data-cke-expando"];
this.$=a.$;delete this.getName}},getChild:function(){function a(b,c){var e=b.childNodes;if(0<=c&&c<e.length)return e[c]}return function(b){var c=this.$;if(b.slice)for(b=b.slice();0<b.length&&c;)c=a(c,b.shift());else c=a(c,b);return c?new CKEDITOR.dom.node(c):null}}(),getChildCount:function(){return this.$.childNodes.length},disableContextMenu:function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT&&b.hasClass("cke_enable_context_menu")}this.on("contextmenu",function(b){b.data.getTarget().getAscendant(a,
!0)||b.data.preventDefault()})},getDirection:function(a){return a?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||"ltr":this.getStyle("direction")||this.getAttribute("dir")},data:function(a,b){a="data-"+a;if(void 0===b)return this.getAttribute(a);!1===b?this.removeAttribute(a):this.setAttribute(a,b);return null},getEditor:function(a){var b=CKEDITOR.instances,c,e,d;a=a||void 0===a;for(c in b)if(e=b[c],e.element.equals(this)&&
e.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||!a&&(d=e.editable())&&(d.equals(this)||d.contains(this)))return e;return null},find:function(a){var c=f(this);a=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,a)));c();return a},findOne:function(a){var c=f(this);a=this.$.querySelector(b(this,a));c();return a?new CKEDITOR.dom.element(a):null},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var e=a(this);if(!1!==e){c=this.getChildren();for(var d=0;d<c.count();d++)e=c.getItem(d),e.type==CKEDITOR.NODE_ELEMENT?
e.forEach(a,b):b&&e.type!=b||a(e)}}});var k={width:["border-left-width","border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};CKEDITOR.dom.element.prototype.setSize=function(a,b,d){"number"==typeof b&&(!d||CKEDITOR.env.ie&&CKEDITOR.env.quirks||(b-=c.call(this,a)),this.setStyle(a,b+"px"))};CKEDITOR.dom.element.prototype.getSize=function(a,b){var d=Math.max(this.$["offset"+CKEDITOR.tools.capitalize(a)],this.$["client"+
CKEDITOR.tools.capitalize(a)])||0;b&&(d-=c.call(this,a));return d}}(),CKEDITOR.dom.documentFragment=function(a){a=a||CKEDITOR.document;this.$=a.type==CKEDITOR.NODE_DOCUMENT?a.$.createDocumentFragment():a},CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(a){a=a.$;a.parentNode.insertBefore(this.$,a.nextSibling)},getHtml:function(){var a=new CKEDITOR.dom.element("div");this.clone(1,1).appendTo(a);
return a.getHtml().replace(/\s*data-cke-expando=".*?"/g,"")}},!0,{append:1,appendBogus:1,clone:1,getFirst:1,getHtml:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,getChildCount:1,getChild:1,getChildren:1}),CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.document.prototype,!0,{find:1,findOne:1}),function(){function a(a,b){var e=this.range;if(this._.end)return null;
if(!this._.start){this._.start=1;if(e.collapsed)return this.end(),null;e.optimize()}var c,d=e.startContainer;c=e.endContainer;var g=e.startOffset,h=e.endOffset,n,f=this.guard,m=this.type,l=a?"getPreviousSourceNode":"getNextSourceNode";if(!a&&!this._.guardLTR){var k=c.type==CKEDITOR.NODE_ELEMENT?c:c.getParent(),C=c.type==CKEDITOR.NODE_ELEMENT?c.getChild(h):c.getNext();this._.guardLTR=function(a,b){return(!b||!k.equals(a))&&(!C||!a.equals(C))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(e.root))}}if(a&&
!this._.guardRTL){var H=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(),F=d.type==CKEDITOR.NODE_ELEMENT?g?d.getChild(g-1):null:d.getPrevious();this._.guardRTL=function(a,b){return(!b||!H.equals(a))&&(!F||!a.equals(F))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(e.root))}}var I=a?this._.guardRTL:this._.guardLTR;n=f?function(a,b){return!1===I(a,b)?!1:f(a,b)}:I;this.current?c=this.current[l](!1,m,n):(a?c.type==CKEDITOR.NODE_ELEMENT&&(c=0<h?c.getChild(h-1):!1===n(c,!0)?null:c.getPreviousSourceNode(!0,
m,n)):(c=d,c.type==CKEDITOR.NODE_ELEMENT&&((c=c.getChild(g))||(c=!1===n(d,!0)?null:d.getNextSourceNode(!0,m,n)))),c&&!1===n(c)&&(c=null));for(;c&&!this._.end;){this.current=c;if(!this.evaluator||!1!==this.evaluator(c)){if(!b)return c}else if(b&&this.evaluator)return!1;c=c[l](!1,m,n)}this.end();return this.current=null}function f(b){for(var e,c=null;e=a.call(this,b);)c=e;return c}CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(a){this.range=a;this._={}},proto:{end:function(){this._.end=
1},next:function(){return a.call(this)},previous:function(){return a.call(this,1)},checkForward:function(){return!1!==a.call(this,0,1)},checkBackward:function(){return!1!==a.call(this,1,1)},lastForward:function(){return f.call(this)},lastBackward:function(){return f.call(this,1)},reset:function(){delete this.current;this._={}}}});var b={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,
"table-caption":1},c={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(a){return"none"!=this.getComputedStyle("float")||this.getComputedStyle("position")in c||!b[this.getComputedStyle("display")]?!!(this.is(CKEDITOR.dtd.$block)||a&&this.is(a)):!0};CKEDITOR.dom.walker.blockBoundary=function(a){return function(b){return!(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary(a))}};CKEDITOR.dom.walker.listItemBoundary=function(){return this.blockBoundary({br:1})};CKEDITOR.dom.walker.bookmark=
function(a,b){function e(a){return a&&a.getName&&"span"==a.getName()&&a.data("cke-bookmark")}return function(c){var d,g;d=c&&c.type!=CKEDITOR.NODE_ELEMENT&&(g=c.getParent())&&e(g);d=a?d:d||e(c);return!!(b^d)}};CKEDITOR.dom.walker.whitespaces=function(a){return function(b){var e;b&&b.type==CKEDITOR.NODE_TEXT&&(e=!CKEDITOR.tools.trim(b.getText())||CKEDITOR.env.webkit&&b.getText()==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);return!!(a^e)}};CKEDITOR.dom.walker.invisible=function(a){var b=CKEDITOR.dom.walker.whitespaces(),
e=CKEDITOR.env.webkit?1:0;return function(c){b(c)?c=1:(c.type==CKEDITOR.NODE_TEXT&&(c=c.getParent()),c=c.$.offsetWidth<=e);return!!(a^c)}};CKEDITOR.dom.walker.nodeType=function(a,b){return function(e){return!!(b^e.type==a)}};CKEDITOR.dom.walker.bogus=function(a){function b(a){return!l(a)&&!k(a)}return function(e){var c=CKEDITOR.env.needsBrFiller?e.is&&e.is("br"):e.getText&&d.test(e.getText());c&&(c=e.getParent(),e=e.getNext(b),c=c.isBlockBoundary()&&(!e||e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary()));
return!!(a^c)}};CKEDITOR.dom.walker.temp=function(a){return function(b){b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());b=b&&b.hasAttribute("data-cke-temp");return!!(a^b)}};var d=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,l=CKEDITOR.dom.walker.whitespaces(),k=CKEDITOR.dom.walker.bookmark(),g=CKEDITOR.dom.walker.temp(),h=function(a){return k(a)||l(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty)};CKEDITOR.dom.walker.ignored=function(a){return function(b){b=l(b)||k(b)||
g(b);return!!(a^b)}};var m=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(a){return function(b){for(var e=0,c=b.getChildCount();e<c;++e)if(!m(b.getChild(e)))return!!a;return!a}};var e=CKEDITOR.dom.walker.empty(),n=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(function(a){var b={},e;for(e in a)CKEDITOR.dtd[e]["#"]&&(b[e]=1);return b}(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});CKEDITOR.dom.walker.editable=function(a){return function(b){b=m(b)?!1:b.type==CKEDITOR.NODE_TEXT||
b.type==CKEDITOR.NODE_ELEMENT&&(b.is(CKEDITOR.dtd.$inline)||b.is("hr")||"false"==b.getAttribute("contenteditable")||!CKEDITOR.env.needsBrFiller&&b.is(n)&&e(b))?!0:!1;return!!(a^b)}};CKEDITOR.dom.element.prototype.getBogus=function(){var a=this;do a=a.getPreviousSourceNode();while(h(a));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is("br"):a.getText&&d.test(a.getText()))?a:!1}}(),CKEDITOR.dom.range=function(a){this.endOffset=this.endContainer=this.startOffset=this.startContainer=null;this.collapsed=
!0;var f=a instanceof CKEDITOR.dom.document;this.document=f?a:a.getDocument();this.root=f?a.getBody():a},function(){function a(a){a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset}function f(a,b,c,d,g){function h(a,b,e,c){var d=e?a.getPrevious():a.getNext();if(c&&l)return d;t||c?b.append(a.clone(!0,g),e):(a.remove(),k&&b.append(a,e));return d}function f(){var a,b,e,c=Math.min(G.length,D.length);for(a=0;a<c;a++)if(b=G[a],e=D[a],!b.equals(e))return a;
return a-1}function m(){var b=N-1,c=I&&J&&!x.equals(A);b<Q-1||b<O-1||c?(c?a.moveToPosition(A,CKEDITOR.POSITION_BEFORE_START):O==b+1&&F?a.moveToPosition(D[b],CKEDITOR.POSITION_BEFORE_END):a.moveToPosition(D[b+1],CKEDITOR.POSITION_BEFORE_START),d&&(b=G[b+1])&&b.type==CKEDITOR.NODE_ELEMENT&&(c=CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e',a.document),c.insertAfter(b),b.mergeSiblings(!1),a.moveToBookmark({startNode:c}))):a.collapse(!0)}
a.optimizeBookmark();var l=0===b,k=1==b,t=2==b;b=t||k;var x=a.startContainer,A=a.endContainer,B=a.startOffset,C=a.endOffset,H,F,I,J,E,L;if(t&&A.type==CKEDITOR.NODE_TEXT&&(x.equals(A)||x.type===CKEDITOR.NODE_ELEMENT&&x.getFirst().equals(A)))c.append(a.document.createText(A.substring(B,C)));else{A.type==CKEDITOR.NODE_TEXT?t?L=!0:A=A.split(C):0<A.getChildCount()?C>=A.getChildCount()?(A=A.getChild(C-1),F=!0):A=A.getChild(C):J=F=!0;x.type==CKEDITOR.NODE_TEXT?t?E=!0:x.split(B):0<x.getChildCount()?0===B?
(x=x.getChild(B),H=!0):x=x.getChild(B-1):I=H=!0;for(var G=x.getParents(),D=A.getParents(),N=f(),Q=G.length-1,O=D.length-1,K=c,W,R,Z,ha=-1,X=N;X<=Q;X++){R=G[X];Z=R.getNext();for(X!=Q||R.equals(D[X])&&Q<O?b&&(W=K.append(R.clone(0,g))):H?h(R,K,!1,I):E&&K.append(a.document.createText(R.substring(B)));Z;){if(Z.equals(D[X])){ha=X;break}Z=h(Z,K)}K=W}K=c;for(X=N;X<=O;X++)if(c=D[X],Z=c.getPrevious(),c.equals(G[X]))b&&(K=K.getChild(0));else{X!=O||c.equals(G[X])&&O<Q?b&&(W=K.append(c.clone(0,g))):F?h(c,K,!1,
J):L&&K.append(a.document.createText(c.substring(0,C)));if(X>ha)for(;Z;)Z=h(Z,K,!0);K=W}t||m()}}function b(){var a=!1,b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!0),d=CKEDITOR.dom.walker.bogus();return function(g){return c(g)||b(g)?!0:d(g)&&!a?a=!0:g.type==CKEDITOR.NODE_TEXT&&(g.hasAscendant("pre")||CKEDITOR.tools.trim(g.getText()).length)||g.type==CKEDITOR.NODE_ELEMENT&&!g.is(l)?!1:!0}}function c(a){var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(1);
return function(d){return c(d)||b(d)?!0:!a&&k(d)||d.type==CKEDITOR.NODE_ELEMENT&&d.is(CKEDITOR.dtd.$removeEmpty)}}function d(a){return function(){var b;return this[a?"getPreviousNode":"getNextNode"](function(a){!b&&m(a)&&(b=a);return h(a)&&!(k(a)&&a.equals(b))})}}var l={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},k=CKEDITOR.dom.walker.bogus(),g=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
h=CKEDITOR.dom.walker.editable(),m=CKEDITOR.dom.walker.ignored(!0);CKEDITOR.dom.range.prototype={clone:function(){var a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},collapse:function(a){a?(this._setEndContainer(this.startContainer),this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),this.startOffset=this.endOffset);
this.collapsed=!0},cloneContents:function(a){var b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||f(this,2,b,!1,"undefined"==typeof a?!0:a);return b},deleteContents:function(a){this.collapsed||f(this,0,null,a)},extractContents:function(a,b){var c=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||f(this,1,c,a,"undefined"==typeof b?!0:b);return c},createBookmark:function(a){var b,c,d,g,h=this.collapsed;b=this.document.createElement("span");b.data("cke-bookmark",1);b.setStyle("display",
"none");b.setHtml("\x26nbsp;");a&&(d="cke_bm_"+CKEDITOR.tools.getNextNumber(),b.setAttribute("id",d+(h?"C":"S")));h||(c=b.clone(),c.setHtml("\x26nbsp;"),a&&c.setAttribute("id",d+"E"),g=this.clone(),g.collapse(),g.insertNode(c));g=this.clone();g.collapse(!0);g.insertNode(b);c?(this.setStartAfter(b),this.setEndBefore(c)):this.moveToPosition(b,CKEDITOR.POSITION_AFTER_END);return{startNode:a?d+(h?"C":"S"):b,endNode:a?d+"E":c,serializable:a,collapsed:h}},createBookmark2:function(){function a(b){var e=
b.container,d=b.offset,g;g=e;var h=d;g=g.type!=CKEDITOR.NODE_ELEMENT||0===h||h==g.getChildCount()?0:g.getChild(h-1).type==CKEDITOR.NODE_TEXT&&g.getChild(h).type==CKEDITOR.NODE_TEXT;g&&(e=e.getChild(d-1),d=e.getLength());if(e.type==CKEDITOR.NODE_ELEMENT&&0<d){a:{for(g=e;d--;)if(h=g.getChild(d).getIndex(!0),0<=h){d=h;break a}d=-1}d+=1}if(e.type==CKEDITOR.NODE_TEXT){g=e;for(h=0;(g=g.getPrevious())&&g.type==CKEDITOR.NODE_TEXT;)h+=g.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE,"").length;
g=h;e.getText()?d+=g:(h=e.getPrevious(c),g?(d=g,e=h?h.getNext():e.getParent().getFirst()):(e=e.getParent(),d=h?h.getIndex(!0)+1:0))}b.container=e;b.offset=d}function b(a,e){var c=e.getCustomData("cke-fillingChar");if(c){var d=a.container;c.equals(d)&&(a.offset-=CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length,0>=a.offset&&(a.offset=d.getIndex(),a.container=d.getParent()))}}var c=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,!0);return function(c){var d=this.collapsed,g={container:this.startContainer,
offset:this.startOffset},h={container:this.endContainer,offset:this.endOffset};c&&(a(g),b(g,this.root),d||(a(h),b(h,this.root)));return{start:g.container.getAddress(c),end:d?null:h.container.getAddress(c),startOffset:g.offset,endOffset:h.offset,normalized:c,collapsed:d,is2:!0}}}(),moveToBookmark:function(a){if(a.is2){var b=this.document.getByAddress(a.start,a.normalized),c=a.startOffset,d=a.end&&this.document.getByAddress(a.end,a.normalized);a=a.endOffset;this.setStart(b,c);d?this.setEnd(d,a):this.collapse(!0)}else b=
(c=a.serializable)?this.document.getById(a.startNode):a.startNode,a=c?this.document.getById(a.endNode):a.endNode,this.setStartBefore(b),b.remove(),a?(this.setEndBefore(a),a.remove()):this.collapse(!0)},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,d=this.endOffset,g;if(a.type==CKEDITOR.NODE_ELEMENT)if(g=a.getChildCount(),g>c)a=a.getChild(c);else if(1>g)a=a.getPreviousSourceNode();else{for(a=a.$;a.lastChild;)a=a.lastChild;a=new CKEDITOR.dom.node(a);a=
a.getNextSourceNode()||a}if(b.type==CKEDITOR.NODE_ELEMENT)if(g=b.getChildCount(),g>d)b=b.getChild(d).getPreviousSourceNode(!0);else if(1>g)b=b.getPreviousSourceNode();else{for(b=b.$;b.lastChild;)b=b.lastChild;b=new CKEDITOR.dom.node(b)}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a,endNode:b}},getCommonAncestor:function(a,b){var c=this.startContainer,d=this.endContainer,c=c.equals(d)?a&&c.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1?c.getChild(this.startOffset):
c:c.getCommonAncestor(d);return b&&!c.is?c.getParent():c},optimize:function(){var a=this.startContainer,b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a))},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a.is&&a.is("span")&&a.data("cke-bookmark")&&this.setStartAt(a,CKEDITOR.POSITION_BEFORE_START);
b&&b.is&&b.is("span")&&b.data("cke-bookmark")&&this.setEndAt(b,CKEDITOR.POSITION_AFTER_END)},trim:function(a,b){var c=this.startContainer,d=this.startOffset,g=this.collapsed;if((!a||g)&&c&&c.type==CKEDITOR.NODE_TEXT){if(d)if(d>=c.getLength())d=c.getIndex()+1,c=c.getParent();else{var h=c.split(d),d=c.getIndex()+1,c=c.getParent();this.startContainer.equals(this.endContainer)?this.setEnd(h,this.endOffset-this.startOffset):c.equals(this.endContainer)&&(this.endOffset+=1)}else d=c.getIndex(),c=c.getParent();
this.setStart(c,d);if(g){this.collapse(!0);return}}c=this.endContainer;d=this.endOffset;b||g||!c||c.type!=CKEDITOR.NODE_TEXT||(d?(d>=c.getLength()||c.split(d),d=c.getIndex()+1):d=c.getIndex(),c=c.getParent(),this.setEnd(c,d))},enlarge:function(a,b){function c(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")?null:a}var d=new RegExp(/[^\s\ufeff]/);switch(a){case CKEDITOR.ENLARGE_INLINE:var g=1;case CKEDITOR.ENLARGE_ELEMENT:var h=function(a,b){var e=new CKEDITOR.dom.range(m);
e.setStart(a,b);e.setEndAt(m,CKEDITOR.POSITION_BEFORE_END);var e=new CKEDITOR.dom.walker(e),c;for(e.guard=function(a){return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary())};c=e.next();){if(c.type!=CKEDITOR.NODE_TEXT)return!1;H=c!=a?c.getText():c.substring(b);if(d.test(H))return!1}return!0};if(this.collapsed)break;var f=this.getCommonAncestor(),m=this.root,l,k,t,x,A,B=!1,C,H;C=this.startContainer;var F=this.startOffset;C.type==CKEDITOR.NODE_TEXT?(F&&(C=!CKEDITOR.tools.trim(C.substring(0,F)).length&&
C,B=!!C),C&&((x=C.getPrevious())||(t=C.getParent()))):(F&&(x=C.getChild(F-1)||C.getLast()),x||(t=C));for(t=c(t);t||x;){if(t&&!x){!A&&t.equals(f)&&(A=!0);if(g?t.isBlockBoundary():!m.contains(t))break;B&&"inline"==t.getComputedStyle("display")||(B=!1,A?l=t:this.setStartBefore(t));x=t.getPrevious()}for(;x;)if(C=!1,x.type==CKEDITOR.NODE_COMMENT)x=x.getPrevious();else{if(x.type==CKEDITOR.NODE_TEXT)H=x.getText(),d.test(H)&&(x=null),C=/[\s\ufeff]$/.test(H);else if((x.$.offsetWidth>(CKEDITOR.env.webkit?1:
0)||b&&x.is("br"))&&!x.data("cke-bookmark"))if(B&&CKEDITOR.dtd.$removeEmpty[x.getName()]){H=x.getText();if(d.test(H))x=null;else for(var F=x.$.getElementsByTagName("*"),I=0,J;J=F[I++];)if(!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]){x=null;break}x&&(C=!!H.length)}else x=null;C&&(B?A?l=t:t&&this.setStartBefore(t):B=!0);if(x){C=x.getPrevious();if(!t&&!C){t=x;x=null;break}x=C}else t=null}t&&(t=c(t.getParent()))}C=this.endContainer;F=this.endOffset;t=x=null;A=B=!1;C.type==CKEDITOR.NODE_TEXT?
CKEDITOR.tools.trim(C.substring(F)).length?B=!0:(B=!C.getLength(),F==C.getLength()?(x=C.getNext())||(t=C.getParent()):h(C,F)&&(t=C.getParent())):(x=C.getChild(F))||(t=C);for(;t||x;){if(t&&!x){!A&&t.equals(f)&&(A=!0);if(g?t.isBlockBoundary():!m.contains(t))break;B&&"inline"==t.getComputedStyle("display")||(B=!1,A?k=t:t&&this.setEndAfter(t));x=t.getNext()}for(;x;){C=!1;if(x.type==CKEDITOR.NODE_TEXT)H=x.getText(),h(x,0)||(x=null),C=/^[\s\ufeff]/.test(H);else if(x.type==CKEDITOR.NODE_ELEMENT){if((0<x.$.offsetWidth||
b&&x.is("br"))&&!x.data("cke-bookmark"))if(B&&CKEDITOR.dtd.$removeEmpty[x.getName()]){H=x.getText();if(d.test(H))x=null;else for(F=x.$.getElementsByTagName("*"),I=0;J=F[I++];)if(!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]){x=null;break}x&&(C=!!H.length)}else x=null}else C=1;C&&B&&(A?k=t:this.setEndAfter(t));if(x){C=x.getNext();if(!t&&!C){t=x;x=null;break}x=C}else t=null}t&&(t=c(t.getParent()))}l&&k&&(f=l.contains(k)?k:l,this.setStartBefore(f),this.setEndAfter(f));break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:t=
new CKEDITOR.dom.range(this.root);m=this.root;t.setStartAt(m,CKEDITOR.POSITION_AFTER_START);t.setEnd(this.startContainer,this.startOffset);t=new CKEDITOR.dom.walker(t);var E,L,G=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),D=null,N=function(a){if(a.type==CKEDITOR.NODE_ELEMENT&&"false"==a.getAttribute("contenteditable"))if(D){if(D.equals(a)){D=null;return}}else D=a;else if(D)return;var b=G(a);b||(E=a);return b},g=function(a){var b=N(a);!b&&a.is&&a.is("br")&&
(L=a);return b};t.guard=N;t=t.lastBackward();E=E||m;this.setStartAt(E,!E.is("br")&&(!t&&this.checkStartOfBlock()||t&&E.contains(t))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){t=this.clone();t=new CKEDITOR.dom.walker(t);var Q=CKEDITOR.dom.walker.whitespaces(),O=CKEDITOR.dom.walker.bookmark();t.evaluator=function(a){return!Q(a)&&!O(a)};if((t=t.previous())&&t.type==CKEDITOR.NODE_ELEMENT&&t.is("br"))break}t=this.clone();t.collapse();t.setEndAt(m,
CKEDITOR.POSITION_BEFORE_END);t=new CKEDITOR.dom.walker(t);t.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?g:N;E=D=L=null;t=t.lastForward();E=E||m;this.setEndAt(E,!t&&this.checkEndOfBlock()||t&&E.contains(t)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);L&&this.setEndAfter(L)}},shrink:function(a,b,c){var d="boolean"===typeof c?c:c&&"boolean"===typeof c.shrinkOnBlockBoundary?c.shrinkOnBlockBoundary:!0,g=c&&c.skipBogus;if(!this.collapsed){a=a||CKEDITOR.SHRINK_TEXT;var h=this.clone(),f=
this.startContainer,m=this.endContainer,l=this.startOffset,k=this.endOffset,t=c=1;f&&f.type==CKEDITOR.NODE_TEXT&&(l?l>=f.getLength()?h.setStartAfter(f):(h.setStartBefore(f),c=0):h.setStartBefore(f));m&&m.type==CKEDITOR.NODE_TEXT&&(k?k>=m.getLength()?h.setEndAfter(m):(h.setEndAfter(m),t=0):h.setEndBefore(m));var h=new CKEDITOR.dom.walker(h),x=CKEDITOR.dom.walker.bookmark(),A=CKEDITOR.dom.walker.bogus();h.evaluator=function(b){return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT)};
var B;h.guard=function(b,c){if(g&&A(b)||x(b))return!0;if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||c&&b.equals(B)||!1===d&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute("contenteditable"))return!1;c||b.type!=CKEDITOR.NODE_ELEMENT||(B=b);return!0};c&&(f=h[a==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(f,b?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);t&&(h.reset(),(h=h[a==CKEDITOR.SHRINK_ELEMENT?
"lastBackward":"previous"]())&&this.setEndAt(h,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END));return!(!c&&!t)}},insertNode:function(a){this.optimizeBookmark();this.trim(!1,!0);var b=this.startContainer,c=b.getChild(this.startOffset);c?a.insertBefore(c):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&this.endOffset++;this.setStartBefore(a)},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(!0)},moveToRange:function(a){this.setStart(a.startContainer,a.startOffset);
this.setEnd(a.endContainer,a.endOffset)},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount())},setStart:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex(),b=b.getParent());this._setStartContainer(b);this.startOffset=c;this.endContainer||(this._setEndContainer(b),this.endOffset=c);a(this)},setEnd:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex()+
1,b=b.getParent());this._setEndContainer(b);this.endOffset=c;this.startContainer||(this._setStartContainer(b),this.startOffset=c);a(this)},setStartAfter:function(a){this.setStart(a.getParent(),a.getIndex()+1)},setStartBefore:function(a){this.setStart(a.getParent(),a.getIndex())},setEndAfter:function(a){this.setEnd(a.getParent(),a.getIndex()+1)},setEndBefore:function(a){this.setEnd(a.getParent(),a.getIndex())},setStartAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setStart(b,0);
break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setStart(b,b.getLength()):this.setStart(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(b);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(b)}a(this)},setEndAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setEnd(b,0);break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setEnd(b,b.getLength()):this.setEnd(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(b);
break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(b)}a(this)},fixBlock:function(a,b){var c=this.createBookmark(),d=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(d);d.trim();this.insertNode(d);var g=d.getBogus();g&&g.remove();d.appendBogus();this.moveToBookmark(c);return d},splitBlock:function(a,b){var c=new CKEDITOR.dom.elementPath(this.startContainer,this.root),d=new CKEDITOR.dom.elementPath(this.endContainer,this.root),
g=c.block,h=d.block,f=null;if(!c.blockLimit.equals(d.blockLimit))return null;"br"!=a&&(g||(g=this.fixBlock(!0,a),h=(new CKEDITOR.dom.elementPath(this.endContainer,this.root)).block),h||(h=this.fixBlock(!1,a)));c=g&&this.checkStartOfBlock();d=h&&this.checkEndOfBlock();this.deleteContents();g&&g.equals(h)&&(d?(f=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(h,CKEDITOR.POSITION_AFTER_END),h=null):c?(f=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(g,
CKEDITOR.POSITION_BEFORE_START),g=null):(h=this.splitElement(g,b||!1),g.is("ul","ol")||g.appendBogus()));return{previousBlock:g,nextBlock:h,wasStartOfBlock:c,wasEndOfBlock:d,elementPath:f}},splitElement:function(a,b){if(!this.collapsed)return null;this.setEndAt(a,CKEDITOR.POSITION_BEFORE_END);var c=this.extractContents(!1,b||!1),d=a.clone(!1,b||!1);c.appendTo(d);d.insertAfter(a);this.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);return d},removeEmptyBlocksAtEnd:function(){function a(e){return function(a){return b(a)||
c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable()||e.is("table")&&a.is("caption")?!1:!0}}var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!1);return function(b){for(var c=this.createBookmark(),d=this[b?"endPath":"startPath"](),g=d.block||d.blockLimit,h;g&&!g.equals(d.root)&&!g.getFirst(a(g));)h=g.getParent(),this[b?"setEndAt":"setStartAt"](g,CKEDITOR.POSITION_AFTER_END),g.remove(1),g=h;this.moveToBookmark(c)}}(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,
this.root)},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,this.root)},checkBoundaryOfElement:function(a,b){var d=b==CKEDITOR.START,g=this.clone();g.collapse(d);g[d?"setStartAt":"setEndAt"](a,d?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);g=new CKEDITOR.dom.walker(g);g.evaluator=c(d);return g[d?"checkBackward":"checkForward"]()},checkStartOfBlock:function(){var a=this.startContainer,c=this.startOffset;CKEDITOR.env.ie&&c&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.ltrim(a.substring(0,
c)),g.test(a)&&this.trim(0,1));this.trim();a=new CKEDITOR.dom.elementPath(this.startContainer,this.root);c=this.clone();c.collapse(!0);c.setStartAt(a.block||a.blockLimit,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkBackward()},checkEndOfBlock:function(){var a=this.endContainer,c=this.endOffset;CKEDITOR.env.ie&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.rtrim(a.substring(c)),g.test(a)&&this.trim(1,0));this.trim();a=new CKEDITOR.dom.elementPath(this.endContainer,
this.root);c=this.clone();c.collapse(!1);c.setEndAt(a.block||a.blockLimit,CKEDITOR.POSITION_BEFORE_END);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkForward()},getPreviousNode:function(a,b,c){var d=this.clone();d.collapse(1);d.setStartAt(c||this.root,CKEDITOR.POSITION_AFTER_START);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.previous()},getNextNode:function(a,b,c){var d=this.clone();d.collapse();d.setEndAt(c||this.root,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(d);
c.evaluator=a;c.guard=b;return c.next()},checkReadOnly:function(){function a(b,c){for(;b;){if(b.type==CKEDITOR.NODE_ELEMENT){if("false"==b.getAttribute("contentEditable")&&!b.data("cke-editable"))return 0;if(b.is("html")||"true"==b.getAttribute("contentEditable")&&(b.contains(c)||b.equals(c)))break}b=b.getParent()}return 1}return function(){var b=this.startContainer,c=this.endContainer;return!(a(b,c)&&a(c,b))}}(),moveToElementEditablePosition:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(!1))return this.moveToPosition(a,
b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),!0;for(var c=0;a;){if(a.type==CKEDITOR.NODE_TEXT){b&&this.endContainer&&this.checkEndOfBlock()&&g.test(a.getText())?this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);c=1;break}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable())this.moveToPosition(a,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START),c=1;else if(b&&a.is("br")&&this.endContainer&&
this.checkEndOfBlock())this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START);else if("false"==a.getAttribute("contenteditable")&&a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a),this.setEndAfter(a),!0;var d=a,h=c,f=void 0;d.type==CKEDITOR.NODE_ELEMENT&&d.isEditable(!1)&&(f=d[b?"getLast":"getFirst"](m));h||f||(f=d[b?"getPrevious":"getNext"](m));a=f}return!!c},moveToClosestEditablePosition:function(a,b){var c,d=0,g,h,f=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];a?(c=new CKEDITOR.dom.range(this.root),
c.moveToPosition(a,f[b?0:1])):c=this.clone();if(a&&!a.is(CKEDITOR.dtd.$block))d=1;else if(g=c[b?"getNextEditableNode":"getPreviousEditableNode"]())d=1,(h=g.type==CKEDITOR.NODE_ELEMENT)&&g.is(CKEDITOR.dtd.$block)&&"false"==g.getAttribute("contenteditable")?(c.setStartAt(g,CKEDITOR.POSITION_BEFORE_START),c.setEndAt(g,CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&h&&g.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(c.setEnd(g,0),c.collapse()):c.moveToPosition(g,f[b?1:0]);d&&this.moveToRange(c);
return!!d},moveToElementEditStart:function(a){return this.moveToElementEditablePosition(a)},moveToElementEditEnd:function(a){return this.moveToElementEditablePosition(a,!0)},getEnclosedNode:function(){var a=this.clone();a.optimize();if(a.startContainer.type!=CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a),b=CKEDITOR.dom.walker.bookmark(!1,!0),c=CKEDITOR.dom.walker.whitespaces(!0);a.evaluator=function(a){return c(a)&&b(a)};var d=a.next();
a.reset();return d&&d.equals(a.previous())?d:null},getTouchedStartNode:function(){var a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a},getTouchedEndNode:function(){var a=this.endContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a},getNextEditableNode:d(),getPreviousEditableNode:d(1),_getTableElement:function(a){a=a||{td:1,th:1,tr:1,tbody:1,thead:1,tfoot:1,table:1};var b=this.startContainer,c=
this.endContainer,d=b.getAscendant("table",!0),g=c.getAscendant("table",!0);return d&&!this.root.contains(d)?null:CKEDITOR.env.safari&&d&&c.equals(this.root)?b.getAscendant(a,!0):this.getEnclosedNode()?this.getEnclosedNode().getAscendant(a,!0):d&&g&&(d.equals(g)||d.contains(g)||g.contains(d))?b.getAscendant(a,!0):null},scrollIntoView:function(){var a=new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",this.document),b,c,d,g=this.clone();g.optimize();(d=g.startContainer.type==
CKEDITOR.NODE_TEXT)?(c=g.startContainer.getText(),b=g.startContainer.split(g.startOffset),a.insertAfter(g.startContainer)):g.insertNode(a);a.scrollIntoView();d&&(g.startContainer.setText(c),b.remove());a.remove()},getClientRects:function(){function a(b,c){var e=CKEDITOR.tools.array.map(b,function(a){return a}),d=new CKEDITOR.dom.range(c.root),g,h,f;c.startContainer instanceof CKEDITOR.dom.element&&(h=0===c.startOffset&&c.startContainer.hasAttribute("data-widget"));c.endContainer instanceof CKEDITOR.dom.element&&
(f=(f=c.endOffset===(c.endContainer.getChildCount?c.endContainer.getChildCount():c.endContainer.length))&&c.endContainer.hasAttribute("data-widget"));h&&d.setStart(c.startContainer.getParent(),c.startContainer.getIndex());f&&d.setEnd(c.endContainer.getParent(),c.endContainer.getIndex()+1);if(h||f)c=d;d=c.cloneContents().find("[data-cke-widget-id]").toArray();if(d=CKEDITOR.tools.array.map(d,function(a){var b=c.root.editor;a=a.getAttribute("data-cke-widget-id");return b.widgets.instances[a].element}))return d=
CKEDITOR.tools.array.map(d,function(a){var b;b=a.getParent().hasClass("cke_widget_wrapper")?a.getParent():a;g=this.root.getDocument().$.createRange();g.setStart(b.getParent().$,b.getIndex());g.setEnd(b.getParent().$,b.getIndex()+1);b=g.getClientRects();b.widgetRect=a.getClientRect();return b},c),CKEDITOR.tools.array.forEach(d,function(a){function b(d){CKEDITOR.tools.array.forEach(e,function(b,g){var h=CKEDITOR.tools.objectCompare(a[d],b);h||(h=CKEDITOR.tools.objectCompare(a.widgetRect,b));h&&(Array.prototype.splice.call(e,
g,a.length-d,a.widgetRect),c=!0)});c||(d<e.length-1?b(d+1):e.push(a.widgetRect))}var c;b(0)}),e}function b(a,c,e){var g;c.collapsed?e.startContainer instanceof CKEDITOR.dom.element?(a=e.checkStartOfBlock(),g=new CKEDITOR.dom.text("​"),a?e.startContainer.append(g,!0):0===e.startOffset?g.insertBefore(e.startContainer.getFirst()):(e=e.startContainer.getChildren().getItem(e.startOffset-1),g.insertAfter(e)),c.setStart(g.$,0),c.setEnd(g.$,0),a=c.getClientRects(),g.remove()):e.startContainer instanceof CKEDITOR.dom.text&&
(""===e.startContainer.getText()?(e.startContainer.setText("​"),a=c.getClientRects(),e.startContainer.setText("")):a=[d(e.createBookmark())]):a=[d(e.createBookmark())];return a}function c(a,b,e){a=CKEDITOR.tools.extend({},a);b&&(a=CKEDITOR.tools.getAbsoluteRectPosition(e.document.getWindow(),a));!a.width&&(a.width=a.right-a.left);!a.height&&(a.height=a.bottom-a.top);return a}function d(a){var b=a.startNode;a=a.endNode;var c;b.setText("​");b.removeStyle("display");a?(a.setText("​"),a.removeStyle("display"),
c=[b.getClientRect(),a.getClientRect()],a.remove()):c=[b.getClientRect(),b.getClientRect()];b.remove();return{right:Math.max(c[0].right,c[1].right),bottom:Math.max(c[0].bottom,c[1].bottom),left:Math.min(c[0].left,c[1].left),top:Math.min(c[0].top,c[1].top),width:Math.abs(c[0].left-c[1].left),height:Math.max(c[0].bottom,c[1].bottom)-Math.min(c[0].top,c[1].top)}}return void 0!==this.document.getSelection?function(d){var g=this.root.getDocument().$.createRange(),h;g.setStart(this.startContainer.$,this.startOffset);
g.setEnd(this.endContainer.$,this.endOffset);h=g.getClientRects();h=a(h,this);h.length||(h=b(h,g,this));return CKEDITOR.tools.array.map(h,function(a){return c(a,d,this)},this)}:function(a){return[c(d(this.createBookmark()),a,this)]}}(),_setStartContainer:function(a){this.startContainer=a},_setEndContainer:function(a){this.endContainer=a},_find:function(a,b){var c=this.getCommonAncestor(),d=this.getBoundaryNodes(),g=[],h,f,m,l;if(c&&c.find)for(f=c.find(a),h=0;h<f.count();h++)if(c=f.getItem(h),b||!c.isReadOnly())m=
c.getPosition(d.startNode)&CKEDITOR.POSITION_FOLLOWING||d.startNode.equals(c),l=c.getPosition(d.endNode)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_IS_CONTAINED||d.endNode.equals(c),m&&l&&g.push(c);return g}};CKEDITOR.dom.range.mergeRanges=function(a){return CKEDITOR.tools.array.reduce(a,function(a,b){var c=a[a.length-1],e=!1;b=b.clone();b.enlarge(CKEDITOR.ENLARGE_ELEMENT);if(c){var d=new CKEDITOR.dom.range(b.root),e=new CKEDITOR.dom.walker(d),g=CKEDITOR.dom.walker.whitespaces();d.setStart(c.endContainer,
c.endOffset);d.setEnd(b.startContainer,b.startOffset);for(d=e.next();g(d)||b.endContainer.equals(d);)d=e.next();e=!d}e?c.setEnd(b.endContainer,b.endOffset):a.push(b);return a},[])}}(),CKEDITOR.POSITION_AFTER_START=1,CKEDITOR.POSITION_BEFORE_END=2,CKEDITOR.POSITION_BEFORE_START=3,CKEDITOR.POSITION_AFTER_END=4,CKEDITOR.ENLARGE_ELEMENT=1,CKEDITOR.ENLARGE_BLOCK_CONTENTS=2,CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3,CKEDITOR.ENLARGE_INLINE=4,CKEDITOR.START=1,CKEDITOR.END=2,CKEDITOR.SHRINK_ELEMENT=1,CKEDITOR.SHRINK_TEXT=
2,"use strict",function(){function a(a){1>arguments.length||(this.range=a,this.forceBrBreak=0,this.enlargeBr=1,this.enforceRealBlocks=0,this._||(this._={}))}function f(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function b(a,c,d,g){a:{null==g&&(g=f(d));for(var h;h=g.shift();)if(h.getDtd().p){g={element:h,remaining:g};break a}g=null}if(!g)return 0;if((h=CKEDITOR.filter.instances[g.element.data("cke-filter")])&&
!h.check(c))return b(a,c,d,g.remaining);c=new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c=c.createIterator();c.enlargeBr=a.enlargeBr;c.enforceRealBlocks=a.enforceRealBlocks;c.activeFilter=c.filter=h;a._.nestedEditable={element:g.element,container:d,remaining:g.remaining,iterator:c};return 1}function c(a,b,c){if(!b)return!1;a=a.clone();a.collapse(!c);return a.checkBoundaryOfElement(b,c?CKEDITOR.START:CKEDITOR.END)}var d=/^[\r\n\t ]+$/,l=CKEDITOR.dom.walker.bookmark(!1,!0),k=CKEDITOR.dom.walker.whitespaces(!0),
g=function(a){return l(a)&&k(a)},h={dd:1,dt:1,li:1};a.prototype={getNextParagraph:function(a){var e,f,k,y,u;a=a||"p";if(this._.nestedEditable){if(e=this._.nestedEditable.iterator.getNextParagraph(a))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,e;this.activeFilter=this.filter;if(b(this,a,this._.nestedEditable.container,this._.nestedEditable.remaining))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,this._.nestedEditable.iterator.getNextParagraph(a);this._.nestedEditable=
null}if(!this.range.root.getDtd()[a])return null;if(!this._.started){var p=this.range.clone();f=p.startPath();var v=p.endPath(),w=!p.collapsed&&c(p,f.block),r=!p.collapsed&&c(p,v.block,1);p.shrink(CKEDITOR.SHRINK_ELEMENT,!0);w&&p.setStartAt(f.block,CKEDITOR.POSITION_BEFORE_END);r&&p.setEndAt(v.block,CKEDITOR.POSITION_AFTER_START);f=p.endContainer.hasAscendant("pre",!0)||p.startContainer.hasAscendant("pre",!0);p.enlarge(this.forceBrBreak&&!f||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);
p.collapsed||(f=new CKEDITOR.dom.walker(p.clone()),v=CKEDITOR.dom.walker.bookmark(!0,!0),f.evaluator=v,this._.nextNode=f.next(),f=new CKEDITOR.dom.walker(p.clone()),f.evaluator=v,f=f.previous(),this._.lastNode=f.getNextSourceNode(!0,null,p.root),this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()&&(v=this.range.clone(),v.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END),v.checkEndOfBlock()&&
(v=new CKEDITOR.dom.elementPath(v.endContainer,v.root),this._.lastNode=(v.block||v.blockLimit).getNextSourceNode(!0))),this._.lastNode&&p.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=p.document.createText(""),this._.lastNode.insertAfter(f)),p=null);this._.started=1;f=p}v=this._.nextNode;p=this._.lastNode;for(this._.nextNode=null;v;){var w=0,r=v.hasAscendant("pre"),z=v.type!=CKEDITOR.NODE_ELEMENT,t=0;if(z)v.type==CKEDITOR.NODE_TEXT&&d.test(v.getText())&&(z=0);else{var x=v.getName();
if(CKEDITOR.dtd.$block[x]&&"false"==v.getAttribute("contenteditable")){e=v;b(this,a,e);break}else if(v.isBlockBoundary(this.forceBrBreak&&!r&&{br:1})){if("br"==x)z=1;else if(!f&&!v.getChildCount()&&"hr"!=x){e=v;k=v.equals(p);break}f&&(f.setEndAt(v,CKEDITOR.POSITION_BEFORE_START),"br"!=x&&(this._.nextNode=v));w=1}else{if(v.getFirst()){f||(f=this.range.clone(),f.setStartAt(v,CKEDITOR.POSITION_BEFORE_START));v=v.getFirst();continue}z=1}}z&&!f&&(f=this.range.clone(),f.setStartAt(v,CKEDITOR.POSITION_BEFORE_START));
k=(!w||z)&&v.equals(p);if(f&&!w)for(;!v.getNext(g)&&!k;){x=v.getParent();if(x.isBlockBoundary(this.forceBrBreak&&!r&&{br:1})){w=1;z=0;k||x.equals(p);f.setEndAt(x,CKEDITOR.POSITION_BEFORE_END);break}v=x;z=1;k=v.equals(p);t=1}z&&f.setEndAt(v,CKEDITOR.POSITION_AFTER_END);v=this._getNextSourceNode(v,t,p);if((k=!v)||w&&f)break}if(!e){if(!f)return this._.docEndMarker&&this._.docEndMarker.remove(),this._.nextNode=null;e=new CKEDITOR.dom.elementPath(f.startContainer,f.root);v=e.blockLimit;w={div:1,th:1,td:1};
e=e.block;!e&&v&&!this.enforceRealBlocks&&w[v.getName()]&&f.checkStartOfBlock()&&f.checkEndOfBlock()&&!v.equals(f.root)?e=v:!e||this.enforceRealBlocks&&e.is(h)?(e=this.range.document.createElement(a),f.extractContents().appendTo(e),e.trim(),f.insertNode(e),y=u=!0):"li"!=e.getName()?f.checkStartOfBlock()&&f.checkEndOfBlock()||(e=e.clone(!1),f.extractContents().appendTo(e),e.trim(),u=f.splitBlock(),y=!u.wasStartOfBlock,u=!u.wasEndOfBlock,f.insertNode(e)):k||(this._.nextNode=e.equals(p)?null:this._getNextSourceNode(f.getBoundaryNodes().endNode,
1,p))}y&&(y=e.getPrevious())&&y.type==CKEDITOR.NODE_ELEMENT&&("br"==y.getName()?y.remove():y.getLast()&&"br"==y.getLast().$.nodeName.toLowerCase()&&y.getLast().remove());u&&(y=e.getLast())&&y.type==CKEDITOR.NODE_ELEMENT&&"br"==y.getName()&&(!CKEDITOR.env.needsBrFiller||y.getPrevious(l)||y.getNext(l))&&y.remove();this._.nextNode||(this._.nextNode=k||e.equals(p)||!p?null:this._getNextSourceNode(e,1,p));return e},_getNextSourceNode:function(a,b,c){function d(a){return!(a.equals(c)||a.equals(g))}var g=
this.range.root;for(a=a.getNextSourceNode(b,null,d);!l(a);)a=a.getNextSourceNode(b,null,d);return a}};CKEDITOR.dom.range.prototype.createIterator=function(){return new a(this)}}(),CKEDITOR.command=function(a,f){this.uiItems=[];this.exec=function(b){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return!1;this.editorFocus&&a.focus();return!1===this.fire("exec")?!0:!1!==f.exec.call(this,a,b)};this.refresh=function(a,b){if(!this.readOnly&&a.readOnly)return!0;if(this.context&&!b.isContextFor(this.context)||
!this.checkAllowed(!0))return this.disable(),!0;this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&this.disable();return!1===this.fire("refresh",{editor:a,path:b})?!0:f.refresh&&!1!==f.refresh.apply(this,arguments)};var b;this.checkAllowed=function(c){return c||"boolean"!=typeof b?b=a.activeFilter.checkFeature(this):b};CKEDITOR.tools.extend(this,f,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!f.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this)},CKEDITOR.command.prototype=
{enable:function(){this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&"undefined"!=typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF)},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED)},setState:function(a){if(this.state==a||a!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return!1;this.previousState=this.state;this.state=a;this.fire("state");return!0},toggleState:function(){this.state==CKEDITOR.TRISTATE_OFF?this.setState(CKEDITOR.TRISTATE_ON):
this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF)}},CKEDITOR.event.implementOn(CKEDITOR.command.prototype),CKEDITOR.ENTER_P=1,CKEDITOR.ENTER_BR=2,CKEDITOR.ENTER_DIV=3,CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"\x3c!DOCTYPE html\x3e",bodyId:"",bodyClass:"",fullPage:!1,height:200,contentsCss:CKEDITOR.getUrl("contents.css"),
extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:1E4,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]},function(){function a(a,b,c,e,d){var g,h;a=[];for(g in b){h=b[g];h="boolean"==typeof h?{}:"function"==typeof h?{match:h}:I(h);"$"!=g.charAt(0)&&(h.elements=g);c&&(h.featureName=c.toLowerCase());var f=h;f.elements=k(f.elements,/\s+/)||null;f.propertiesOnly=f.propertiesOnly||!0===f.elements;var m=/\s*,\s*/,l=void 0;for(l in L){f[l]=k(f[l],
m)||null;var n=f,v=G[l],D=k(f[G[l]],m),x=f[l],A=[],B=!0,r=void 0;D?B=!1:D={};for(r in x)"!"==r.charAt(0)&&(r=r.slice(1),A.push(r),D[r]=!0,B=!1);for(;r=A.pop();)x[r]=x["!"+r],delete x["!"+r];n[v]=(B?!1:D)||null}f.match=f.match||null;e.push(h);a.push(h)}b=d.elements;d=d.generic;var F;c=0;for(e=a.length;c<e;++c){g=I(a[c]);h=!0===g.classes||!0===g.styles||!0===g.attributes;f=g;l=v=m=void 0;for(m in L)f[m]=w(f[m]);n=!0;for(l in G){m=G[l];v=f[m];D=[];x=void 0;for(x in v)-1<x.indexOf("*")?D.push(new RegExp("^"+
x.replace(/\*/g,".*")+"$")):D.push(x);v=D;v.length&&(f[m]=v,n=!1)}f.nothingRequired=n;f.noProperties=!(f.attributes||f.classes||f.styles);if(!0===g.elements||null===g.elements)d[h?"unshift":"push"](g);else for(F in f=g.elements,delete g.elements,f)if(b[F])b[F][h?"unshift":"push"](g);else b[F]=[g]}}function f(a,c,e,d){if(!a.match||a.match(c))if(d||g(a,c))if(a.propertiesOnly||(e.valid=!0),e.allAttributes||(e.allAttributes=b(a.attributes,c.attributes,e.validAttributes)),e.allStyles||(e.allStyles=b(a.styles,
c.styles,e.validStyles)),!e.allClasses){a=a.classes;c=c.classes;d=e.validClasses;if(a)if(!0===a)a=!0;else{for(var h=0,f=c.length,m;h<f;++h)m=c[h],d[m]||(d[m]=a(m));a=!1}else a=!1;e.allClasses=a}}function b(a,b,c){if(!a)return!1;if(!0===a)return!0;for(var e in b)c[e]||(c[e]=a(e));return!1}function c(a,b,c){if(!a.match||a.match(b)){if(a.noProperties)return!1;c.hadInvalidAttribute=d(a.attributes,b.attributes)||c.hadInvalidAttribute;c.hadInvalidStyle=d(a.styles,b.styles)||c.hadInvalidStyle;a=a.classes;
b=b.classes;if(a){for(var e=!1,g=!0===a,h=b.length;h--;)if(g||a(b[h]))b.splice(h,1),e=!0;a=e}else a=!1;c.hadInvalidClass=a||c.hadInvalidClass}}function d(a,b){if(!a)return!1;var c=!1,e=!0===a,d;for(d in b)if(e||a(d))delete b[d],c=!0;return c}function l(a,b,c){if(a.disabled||a.customConfig&&!c||!b)return!1;a._.cachedChecks={};return!0}function k(a,b){if(!a)return!1;if(!0===a)return a;if("string"==typeof a)return a=J(a),"*"==a?!0:CKEDITOR.tools.convertArrayToObject(a.split(b));if(CKEDITOR.tools.isArray(a))return a.length?
CKEDITOR.tools.convertArrayToObject(a):!1;var c={},e=0,d;for(d in a)c[d]=a[d],e++;return e?c:!1}function g(a,b){if(a.nothingRequired)return!0;var c,e,d,g;if(d=a.requiredClasses)for(g=b.classes,c=0;c<d.length;++c)if(e=d[c],"string"==typeof e){if(-1==CKEDITOR.tools.indexOf(g,e))return!1}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(g,e))return!1;return h(b.styles,a.requiredStyles)&&h(b.attributes,a.requiredAttributes)}function h(a,b){if(!b)return!0;for(var c=0,e;c<b.length;++c)if(e=b[c],"string"==
typeof e){if(!(e in a))return!1}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,e))return!1;return!0}function m(a){if(!a)return{};a=a.split(/\s*,\s*/).sort();for(var b={};a.length;)b[a.shift()]="cke-test";return b}function e(a){var b,c,e,d,g={},h=1;for(a=J(a);b=a.match(D);)(c=b[2])?(e=n(c,"styles"),d=n(c,"attrs"),c=n(c,"classes")):e=d=c=null,g["$"+h++]={elements:b[1],classes:c,styles:e,attributes:d},a=a.slice(b[0].length);return g}function n(a,b){var c=a.match(N[b]);return c?J(c[1]):null}
function q(a){var b=a.styleBackup=a.attributes.style,c=a.classBackup=a.attributes["class"];a.styles||(a.styles=CKEDITOR.tools.parseCssText(b||"",1));a.classes||(a.classes=c?c.split(/\s+/):[])}function y(a,b,e,d){var g=0,h;d.toHtml&&(b.name=b.name.replace(Q,"$1"));if(d.doCallbacks&&a.elementCallbacks){a:{h=a.elementCallbacks;for(var m=0,l=h.length,k;m<l;++m)if(k=h[m](b)){h=k;break a}h=void 0}if(h)return h}if(d.doTransform&&(h=a._.transformations[b.name])){q(b);for(m=0;m<h.length;++m)x(a,b,h[m]);p(b)}if(d.doFilter){a:{m=
b.name;l=a._;a=l.allowedRules.elements[m];h=l.allowedRules.generic;m=l.disallowedRules.elements[m];l=l.disallowedRules.generic;k=d.skipRequired;var n={valid:!1,validAttributes:{},validClasses:{},validStyles:{},allAttributes:!1,allClasses:!1,allStyles:!1,hadInvalidAttribute:!1,hadInvalidClass:!1,hadInvalidStyle:!1},D,A;if(a||h){q(b);if(m)for(D=0,A=m.length;D<A;++D)if(!1===c(m[D],b,n)){a=null;break a}if(l)for(D=0,A=l.length;D<A;++D)c(l[D],b,n);if(a)for(D=0,A=a.length;D<A;++D)f(a[D],b,n,k);if(h)for(D=
0,A=h.length;D<A;++D)f(h[D],b,n,k);a=n}else a=null}if(!a||!a.valid)return e.push(b),1;A=a.validAttributes;var r=a.validStyles;h=a.validClasses;var m=b.attributes,B=b.styles,l=b.classes;k=b.classBackup;var F=b.styleBackup,w,G,J=[],n=[],C=/^data-cke-/;D=!1;delete m.style;delete m["class"];delete b.classBackup;delete b.styleBackup;if(!a.allAttributes)for(w in m)A[w]||(C.test(w)?w==(G=w.replace(/^data-cke-saved-/,""))||A[G]||(delete m[w],D=!0):(delete m[w],D=!0));if(!a.allStyles||a.hadInvalidStyle){for(w in B)a.allStyles||
r[w]?J.push(w+":"+B[w]):D=!0;J.length&&(m.style=J.sort().join("; "))}else F&&(m.style=F);if(!a.allClasses||a.hadInvalidClass){for(w=0;w<l.length;++w)(a.allClasses||h[l[w]])&&n.push(l[w]);n.length&&(m["class"]=n.sort().join(" "));k&&n.length<k.split(/\s+/).length&&(D=!0)}else k&&(m["class"]=k);D&&(g=1);if(!d.skipFinalValidation&&!v(b))return e.push(b),1}d.toHtml&&(b.name=b.name.replace(O,"cke:$1"));return g}function u(a){var b=[],c;for(c in a)-1<c.indexOf("*")&&b.push(c.replace(/\*/g,".*"));return b.length?
new RegExp("^(?:"+b.join("|")+")$"):null}function p(a){var b=a.attributes,c;delete b.style;delete b["class"];if(c=CKEDITOR.tools.writeCssText(a.styles,!0))b.style=c;a.classes.length&&(b["class"]=a.classes.sort().join(" "))}function v(a){switch(a.name){case "a":if(!(a.children.length||a.attributes.name||a.attributes.id))return!1;break;case "img":if(!a.attributes.src)return!1}return!0}function w(a){if(!a)return!1;if(!0===a)return!0;var b=u(a);return function(c){return c in a||b&&c.match(b)}}function r(){return new CKEDITOR.htmlParser.element("br")}
function z(a){return a.type==CKEDITOR.NODE_ELEMENT&&("br"==a.name||F.$block[a.name])}function t(a,b,c){var e=a.name;if(F.$empty[e]||!a.children.length)"hr"==e&&"br"==b?a.replaceWith(r()):(a.parent&&c.push({check:"it",el:a.parent}),a.remove());else if(F.$block[e]||"tr"==e)if("br"==b)a.previous&&!z(a.previous)&&(b=r(),b.insertBefore(a)),a.next&&!z(a.next)&&(b=r(),b.insertAfter(a)),a.replaceWithChildren();else{var e=a.children,d;b:{d=F[b];for(var g=0,h=e.length,f;g<h;++g)if(f=e[g],f.type==CKEDITOR.NODE_ELEMENT&&
!d[f.name]){d=!1;break b}d=!0}if(d)a.name=b,a.attributes={},c.push({check:"parent-down",el:a});else{d=a.parent;for(var g=d.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||"body"==d.name,m,l,h=e.length;0<h;)f=e[--h],g&&(f.type==CKEDITOR.NODE_TEXT||f.type==CKEDITOR.NODE_ELEMENT&&F.$inline[f.name])?(m||(m=new CKEDITOR.htmlParser.element(b),m.insertAfter(a),c.push({check:"parent-down",el:m})),m.add(f,0)):(m=null,l=F[d.name]||F.span,f.insertAfter(a),d.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||f.type!=CKEDITOR.NODE_ELEMENT||
l[f.name]||c.push({check:"el-up",el:f}));a.remove()}}else e in{style:1,script:1}?a.remove():(a.parent&&c.push({check:"it",el:a.parent}),a.replaceWithChildren())}function x(a,b,c){var e,d;for(e=0;e<c.length;++e)if(d=c[e],!(d.check&&!a.check(d.check,!1)||d.left&&!d.left(b))){d.right(b,K);break}}function A(a,b){var c=b.getDefinition(),e=c.attributes,d=c.styles,g,h,f,m;if(a.name!=c.element)return!1;for(g in e)if("class"==g)for(c=e[g].split(/\s+/),f=a.classes.join("|");m=c.pop();){if(-1==f.indexOf(m))return!1}else if(a.attributes[g]!=
e[g])return!1;for(h in d)if(a.styles[h]!=d[h])return!1;return!0}function B(a,b){var c,e;"string"==typeof a?c=a:a instanceof CKEDITOR.style?e=a:(c=a[0],e=a[1]);return[{element:c,left:e,right:function(a,c){c.transform(a,b)}}]}function C(a){return function(b){return A(b,a)}}function H(a){return function(b,c){c[a](b)}}var F=CKEDITOR.dtd,I=CKEDITOR.tools.copy,J=CKEDITOR.tools.trim,E=["","p","br","div"];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a,b){this.allowedContent=[];this.disallowedContent=
[];this.elementCallbacks=null;this.disabled=!1;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{},cachedChecks:{}};CKEDITOR.filter.instances[this.id]=this;var c=this.editor=a instanceof CKEDITOR.editor?a:null;if(c&&!b){this.customConfig=!0;var e=c.config.allowedContent;!0===e?this.disabled=!0:(e||(this.customConfig=!1),this.allow(e,"config",1),this.allow(c.config.extraAllowedContent,
"extra",1),this.allow(E[c.enterMode]+" "+E[c.shiftEnterMode],"default",1),this.disallow(c.config.disallowedContent))}else this.customConfig=!1,this.allow(b||a,"default",1)};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(b,c,d){if(!l(this,b,d))return!1;var g,h;if("string"==typeof b)b=e(b);else if(b instanceof CKEDITOR.style){if(b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor),c,d);g=b.getDefinition();b={};d=g.attributes;b[g.element]=g={styles:g.styles,
requiredStyles:g.styles&&CKEDITOR.tools.object.keys(g.styles)};d&&(d=I(d),g.classes=d["class"]?d["class"].split(/\s+/):null,g.requiredClasses=g.classes,delete d["class"],g.attributes=d,g.requiredAttributes=d&&CKEDITOR.tools.object.keys(d))}else if(CKEDITOR.tools.isArray(b)){for(g=0;g<b.length;++g)h=this.allow(b[g],c,d);return h}a(this,b,c,this.allowedContent,this._.allowedRules);return!0},applyTo:function(a,b,c,e){if(this.disabled)return!1;var d=this,g=[],h=this.editor&&this.editor.config.protectedSource,
f,m=!1,l={doFilter:!c,doTransform:!0,doCallbacks:!0,toHtml:b};a.forEach(function(a){if(a.type==CKEDITOR.NODE_ELEMENT){if("off"==a.attributes["data-cke-filter"])return!1;if(!b||"span"!=a.name||!~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-"))if(f=y(d,a,g,l),f&1)m=!0;else if(f&2)return!1}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){var c;a:{var e=decodeURIComponent(a.value.replace(/^\{cke_protected\}/,""));c=[];var k,n,v;if(h)for(n=0;n<
h.length;++n)if((v=e.match(h[n]))&&v[0].length==e.length){c=!0;break a}e=CKEDITOR.htmlParser.fragment.fromHtml(e);1==e.children.length&&(k=e.children[0]).type==CKEDITOR.NODE_ELEMENT&&y(d,k,c,l);c=!c.length}c||g.push(a)}},null,!0);g.length&&(m=!0);var k;a=[];e=E[e||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];for(var n;c=g.pop();)c.type==CKEDITOR.NODE_ELEMENT?t(c,e,a):c.remove();for(;k=a.pop();)if(c=k.el,c.parent)switch(n=F[c.parent.name]||F.span,k.check){case "it":F.$removeEmpty[c.name]&&
!c.children.length?t(c,e,a):v(c)||t(c,e,a);break;case "el-up":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||n[c.name]||t(c,e,a);break;case "parent-down":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||n[c.name]||t(c.parent,e,a)}return m},checkFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent)},disable:function(){this.disabled=!0},disallow:function(b){if(!l(this,b,!0))return!1;"string"==typeof b&&(b=
e(b));a(this,b,null,this.disallowedContent,this._.disallowedRules);return!0},addContentForms:function(a){if(!this.disabled&&a){var b,c,e=[],d;for(b=0;b<a.length&&!d;++b)c=a[b],("string"==typeof c||c instanceof CKEDITOR.style)&&this.check(c)&&(d=c);if(d){for(b=0;b<a.length;++b)e.push(B(a[b],d));this.addTransformations(e)}}},addElementCallback:function(a){this.elementCallbacks||(this.elementCallbacks=[]);this.elementCallbacks.push(a)},addFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&
(a=a.toFeature(this.editor));this.allow(a.allowedContent,a.name);this.addTransformations(a.contentTransformations);this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(a.requiredContent):!0},addTransformations:function(a){var b,c;if(!this.disabled&&a){var e=this._.transformations,d;for(d=0;d<a.length;++d){b=a[d];var g=void 0,h=void 0,f=void 0,m=void 0,l=void 0,k=void 0;c=[];for(h=0;h<b.length;++h)f=b[h],"string"==typeof f?(f=
f.split(/\s*:\s*/),m=f[0],l=null,k=f[1]):(m=f.check,l=f.left,k=f.right),g||(g=f,g=g.element?g.element:m?m.match(/^([a-z0-9]+)/i)[0]:g.left.getDefinition().element),l instanceof CKEDITOR.style&&(l=C(l)),c.push({check:m==g?null:m,left:l,right:"string"==typeof k?H(k):k});b=g;e[b]||(e[b]=[]);e[b].push(c)}}},check:function(a,b,c){if(this.disabled)return!0;if(CKEDITOR.tools.isArray(a)){for(var d=a.length;d--;)if(this.check(a[d],b,c))return!0;return!1}var g,h;if("string"==typeof a){h=a+"\x3c"+(!1===b?"0":
"1")+(c?"1":"0")+"\x3e";if(h in this._.cachedChecks)return this._.cachedChecks[h];g=e(a).$1;var f=g.styles,d=g.classes;g.name=g.elements;g.classes=d=d?d.split(/\s*,\s*/):[];g.styles=m(f);g.attributes=m(g.attributes);g.children=[];d.length&&(g.attributes["class"]=d.join(" "));f&&(g.attributes.style=CKEDITOR.tools.writeCssText(g.styles))}else g=a.getDefinition(),f=g.styles,d=g.attributes||{},f&&!CKEDITOR.tools.isEmpty(f)?(f=I(f),d.style=CKEDITOR.tools.writeCssText(f,!0)):f={},g={name:g.element,attributes:d,
classes:d["class"]?d["class"].split(/\s+/):[],styles:f,children:[]};var f=CKEDITOR.tools.clone(g),l=[],k;if(!1!==b&&(k=this._.transformations[g.name])){for(d=0;d<k.length;++d)x(this,g,k[d]);p(g)}y(this,f,l,{doFilter:!0,doTransform:!1!==b,skipRequired:!c,skipFinalValidation:!c});0<l.length?c=!1:((b=g.attributes["class"])&&(g.attributes["class"]=g.attributes["class"].split(" ").sort().join(" ")),c=CKEDITOR.tools.objectCompare(g.attributes,f.attributes,!0),b&&(g.attributes["class"]=b));"string"==typeof a&&
(this._.cachedChecks[h]=c);return c},getAllowedEnterMode:function(){var a=["p","div","br"],b={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(c,e){var d=a.slice(),g;if(this.check(E[c]))return c;for(e||(d=d.reverse());g=d.pop();)if(this.check(g))return b[g];return CKEDITOR.ENTER_BR}}(),clone:function(){var a=new CKEDITOR.filter,b=CKEDITOR.tools.clone;a.allowedContent=b(this.allowedContent);a._.allowedRules=b(this._.allowedRules);a.disallowedContent=b(this.disallowedContent);
a._.disallowedRules=b(this._.disallowedRules);a._.transformations=b(this._.transformations);a.disabled=this.disabled;a.editor=this.editor;return a},destroy:function(){delete CKEDITOR.filter.instances[this.id];delete this._;delete this.allowedContent;delete this.disallowedContent}};var L={styles:1,attributes:1,classes:1},G={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},D=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
N={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},Q=/^cke:(object|embed|param)$/,O=/^(object|embed|param)$/,K;K=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){this.lengthToStyle(a,"width");this.lengthToStyle(a,"height")},sizeToAttribute:function(a){this.lengthToAttribute(a,"width");this.lengthToAttribute(a,"height")},lengthToStyle:function(a,b,c){c=c||b;if(!(c in a.styles)){var e=a.attributes[b];e&&(/^\d+$/.test(e)&&(e+="px"),a.styles[c]=e)}delete a.attributes[b]},
lengthToAttribute:function(a,b,c){c=c||b;if(!(c in a.attributes)){var e=a.styles[b],d=e&&e.match(/^(\d+)(?:\.\d*)?px$/);d?a.attributes[c]=d[1]:"cke-test"==e&&(a.attributes[c]="cke-test")}delete a.styles[b]},alignmentToStyle:function(a){if(!("float"in a.styles)){var b=a.attributes.align;if("left"==b||"right"==b)a.styles["float"]=b}delete a.attributes.align},alignmentToAttribute:function(a){if(!("align"in a.attributes)){var b=a.styles["float"];if("left"==b||"right"==b)a.attributes.align=b}delete a.styles["float"]},
splitBorderShorthand:function(a){if(a.styles.border){var b=CKEDITOR.tools.style.parse.border(a.styles.border);b.color&&(a.styles["border-color"]=b.color);b.style&&(a.styles["border-style"]=b.style);b.width&&(a.styles["border-width"]=b.width);delete a.styles.border}},listTypeToStyle:function(a){if(a.attributes.type)switch(a.attributes.type){case "a":a.styles["list-style-type"]="lower-alpha";break;case "A":a.styles["list-style-type"]="upper-alpha";break;case "i":a.styles["list-style-type"]="lower-roman";
break;case "I":a.styles["list-style-type"]="upper-roman";break;case "1":a.styles["list-style-type"]="decimal";break;default:a.styles["list-style-type"]=a.attributes.type}},splitMarginShorthand:function(a){function b(e){a.styles["margin-top"]=c[e[0]];a.styles["margin-right"]=c[e[1]];a.styles["margin-bottom"]=c[e[2]];a.styles["margin-left"]=c[e[3]]}if(a.styles.margin){var c=a.styles.margin.match(/(\-?[\.\d]+\w+)/g)||["0px"];switch(c.length){case 1:b([0,0,0,0]);break;case 2:b([0,1,0,1]);break;case 3:b([0,
1,2,1]);break;case 4:b([0,1,2,3])}delete a.styles.margin}},matchesStyle:A,transform:function(a,b){if("string"==typeof b)a.name=b;else{var c=b.getDefinition(),e=c.styles,d=c.attributes,g,h,f,m;a.name=c.element;for(g in d)if("class"==g)for(c=a.classes.join("|"),f=d[g].split(/\s+/);m=f.pop();)-1==c.indexOf(m)&&a.classes.push(m);else a.attributes[g]=d[g];for(h in e)a.styles[h]=e[h]}}}}(),function(){CKEDITOR.focusManager=function(a){if(a.focusManager)return a.focusManager;this.hasFocus=!1;this.currentActive=
null;this._={editor:a};return this};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(a){this._.timer&&clearTimeout(this._.timer);a&&(this.currentActive=a);this.hasFocus||this._.locked||((a=CKEDITOR.currentInstance)&&a.focusManager.blur(1),this.hasFocus=!0,(a=this._.editor.container)&&a.addClass("cke_focus"),this._.editor.fire("focus"))},lock:function(){this._.locked=1},unlock:function(){delete this._.locked},blur:function(a){function f(){if(this.hasFocus){this.hasFocus=
!1;var a=this._.editor.container;a&&a.removeClass("cke_focus");this._.editor.fire("blur")}}if(!this._.locked){this._.timer&&clearTimeout(this._.timer);var b=CKEDITOR.focusManager._.blurDelay;a||!b?f.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;f.call(this)},b,this)}},add:function(a,f){var b=a.getCustomData("focusmanager");if(!b||b!=this){b&&b.remove(a);var b="focus",c="blur";f&&(CKEDITOR.env.ie?(b="focusin",c="focusout"):CKEDITOR.event.useCapture=1);var d={blur:function(){a.equals(this.currentActive)&&
this.blur()},focus:function(){this.focus(a)}};a.on(b,d.focus,this);a.on(c,d.blur,this);f&&(CKEDITOR.event.useCapture=0);a.setCustomData("focusmanager",this);a.setCustomData("focusmanager_handlers",d)}},remove:function(a){a.removeCustomData("focusmanager");var f=a.removeCustomData("focusmanager_handlers");a.removeListener("blur",f.blur);a.removeListener("focus",f.focus)}}}(),CKEDITOR.keystrokeHandler=function(a){if(a.keystrokeHandler)return a.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes=
{};this._={editor:a};return this},function(){var a,f=function(b){b=b.data;var d=b.getKeystroke(),f=this.keystrokes[d],k=this._.editor;a=!1===k.fire("key",{keyCode:d,domEvent:b});a||(f&&(a=!1!==k.execCommand(f,{from:"keystrokeHandler"})),a||(a=!!this.blockedKeystrokes[d]));a&&b.preventDefault(!0);return!a},b=function(b){a&&(a=!1,b.data.preventDefault(!0))};CKEDITOR.keystrokeHandler.prototype={attach:function(a){a.on("keydown",f,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on("keypress",b,this)}}}(),
function(){CKEDITOR.lang={languages:{af:1,ar:1,az:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,oc:1,pl:1,"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(a,f,b){a&&CKEDITOR.lang.languages[a]||
(a=this.detect(f,a));var c=this;f=function(){c[a].dir=c.rtl[a]?"rtl":"ltr";b(a,c[a])};this[a]?f():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+a+".js"),f,this)},detect:function(a,f){var b=this.languages;f=f||navigator.userLanguage||navigator.language||a;var c=f.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),d=c[1],c=c[2];b[d+"-"+c]?d=d+"-"+c:b[d]||(d=null);CKEDITOR.lang.detect=d?function(){return d}:function(a){return a};return d||a}}}(),CKEDITOR.scriptLoader=function(){var a={},f={};return{load:function(b,
c,d,l){var k="string"==typeof b;k&&(b=[b]);d||(d=CKEDITOR);var g=b.length,h=[],m=[],e=function(a){c&&(k?c.call(d,a):c.call(d,h,m))};if(0===g)e(!0);else{var n=function(a,b){(b?h:m).push(a);0>=--g&&(l&&CKEDITOR.document.getDocumentElement().removeStyle("cursor"),e(b))},q=function(b,c){a[b]=1;var e=f[b];delete f[b];for(var d=0;d<e.length;d++)e[d](b,c)},y=function(b){if(a[b])n(b,!0);else{var e=f[b]||(f[b]=[]);e.push(n);if(!(1<e.length)){var d=new CKEDITOR.dom.element("script");d.setAttributes({type:"text/javascript",
src:b});c&&(CKEDITOR.env.ie&&(8>=CKEDITOR.env.version||CKEDITOR.env.ie9Compat)?d.$.onreadystatechange=function(){if("loaded"==d.$.readyState||"complete"==d.$.readyState)d.$.onreadystatechange=null,q(b,!0)}:(d.$.onload=function(){setTimeout(function(){d.$.onload=null;d.$.onerror=null;q(b,!0)},0)},d.$.onerror=function(){d.$.onload=null;d.$.onerror=null;q(b,!1)}));d.appendTo(CKEDITOR.document.getHead())}}};l&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");for(var u=0;u<g;u++)y(b[u])}},
queue:function(){function a(){var b;(b=c[0])&&this.load(b.scriptUrl,b.callback,CKEDITOR,0)}var c=[];return function(d,f){var k=this;c.push({scriptUrl:d,callback:function(){f&&f.apply(this,arguments);c.shift();a.call(k)}});1==c.length&&a.call(this)}}()}}(),CKEDITOR.resourceManager=function(a,f){this.basePath=a;this.fileName=f;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}}},CKEDITOR.resourceManager.prototype={add:function(a,f){if(this.registered[a])throw Error('[CKEDITOR.resourceManager.add] The resource name "'+
a+'" is already registered.');var b=this.registered[a]=f||{};b.name=a;b.path=this.getPath(a);CKEDITOR.fire(a+CKEDITOR.tools.capitalize(this.fileName)+"Ready",b);return this.get(a)},get:function(a){return this.registered[a]||null},getPath:function(a){var f=this.externals[a];return CKEDITOR.getUrl(f&&f.dir||this.basePath+a+"/")},getFilePath:function(a){var f=this.externals[a];return CKEDITOR.getUrl(this.getPath(a)+(f?f.file:this.fileName+".js"))},addExternal:function(a,f,b){a=a.split(",");for(var c=
0;c<a.length;c++){var d=a[c];b||(f=f.replace(/[^\/]+$/,function(a){b=a;return""}));this.externals[d]={dir:f,file:b||this.fileName+".js"}}},load:function(a,f,b){CKEDITOR.tools.isArray(a)||(a=a?[a]:[]);for(var c=this.loaded,d=this.registered,l=[],k={},g={},h=0;h<a.length;h++){var m=a[h];if(m)if(c[m]||d[m])g[m]=this.get(m);else{var e=this.getFilePath(m);l.push(e);e in k||(k[e]=[]);k[e].push(m)}}CKEDITOR.scriptLoader.load(l,function(a,e){if(e.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "'+
k[e[0]].join(",")+'" was not found at "'+e[0]+'".');for(var d=0;d<a.length;d++)for(var h=k[a[d]],m=0;m<h.length;m++){var l=h[m];g[l]=this.get(l);c[l]=1}f.call(b,g)},this)}},CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin"),CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(a){var f={};return function(b,c,d){var l={},k=function(b){a.call(this,b,function(a){CKEDITOR.tools.extend(l,a);var b=[],e;for(e in a){var g=a[e],q=g&&g.requires;if(!f[e]){if(g.icons)for(var y=
g.icons.split(","),u=y.length;u--;)CKEDITOR.skin.addIcon(y[u],g.path+"icons/"+(CKEDITOR.env.hidpi&&g.hidpi?"hidpi/":"")+y[u]+".png");g.isSupportedEnvironment=g.isSupportedEnvironment||function(){return!0};f[e]=1}if(q)for(q.split&&(q=q.split(",")),g=0;g<q.length;g++)l[q[g]]||b.push(q[g])}if(b.length)k.call(this,b);else{for(e in l)g=l[e],g.onLoad&&!g.onLoad._called&&(!1===g.onLoad()&&delete l[e],g.onLoad._called=1);c&&c.call(d||window,l)}},this)};k.call(this,b)}}),CKEDITOR.plugins.setLang=function(a,
f,b){var c=this.get(a);a=c.langEntries||(c.langEntries={});c=c.lang||(c.lang=[]);c.split&&(c=c.split(","));-1==CKEDITOR.tools.indexOf(c,f)&&c.push(f);a[f]=b},CKEDITOR.ui=function(a){if(a.ui)return a.ui;this.items={};this.instances={};this.editor=a;this._={handlers:{}};return this},CKEDITOR.ui.prototype={add:function(a,f,b){b.name=a.toLowerCase();var c=this.items[a]={type:f,command:b.command||null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(c,b)},get:function(a){return this.instances[a]},
create:function(a){var f=this.items[a],b=f&&this._.handlers[f.type],c=f&&f.command&&this.editor.getCommand(f.command),b=b&&b.create.apply(this,f.args);this.instances[a]=b;c&&c.uiItems.push(b);b&&!b.type&&(b.type=f.type);return b},addHandler:function(a,f){this._.handlers[a]=f},space:function(a){return CKEDITOR.document.getById(this.spaceId(a))},spaceId:function(a){return this.editor.id+"_"+a}},CKEDITOR.event.implementOn(CKEDITOR.ui),function(){function a(a,e,d){CKEDITOR.event.call(this);a=a&&CKEDITOR.tools.clone(a);
if(void 0!==e){if(!(e instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");if(!d)throw Error("One of the element modes must be specified.");if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&d==CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");if(!b(e,d))throw Error('The specified element mode is not supported on element: "'+e.getName()+'".');this.element=e;this.elementMode=d;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&
(e.getId()||e.getNameAtt())}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};this.templates={};this.name=this.name||f();this.id=CKEDITOR.tools.getNextId();this.status="unloaded";this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);this.on("readOnly",c);this.on("selectionChange",function(a){l(this,a.data.path)});this.on("activeFilterChange",
function(){l(this,this.elementPath(),!0)});this.on("mode",c);this.on("instanceReady",function(){if(this.config.startupFocus){if("end"===this.config.startupFocus){var a=this.createRange();a.selectNodeContents(this.editable());a.shrink(CKEDITOR.SHRINK_ELEMENT,!0);a.collapse();this.getSelection().selectRanges([a])}this.focus()}});CKEDITOR.fire("instanceCreated",null,this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){"destroyed"!==this.status?g(this,a):CKEDITOR.warn("editor-incorrect-destroy")},
0,this)}function f(){do var a="editor"+ ++u;while(CKEDITOR.instances[a]);return a}function b(a,b){return b==CKEDITOR.ELEMENT_MODE_INLINE?a.is(CKEDITOR.dtd.$editable)||a.is("textarea"):b==CKEDITOR.ELEMENT_MODE_REPLACE?!a.is(CKEDITOR.dtd.$nonBodyContent):1}function c(){var a=this.commands,b;for(b in a)d(this,a[b])}function d(a,b){b[b.startDisabled?"disable":a.readOnly&&!b.readOnly?"disable":b.modes[a.mode]?"enable":"disable"]()}function l(a,b,c){if(b){var e,d,g=a.commands;for(d in g)e=g[d],(c||e.contextSensitive)&&
e.refresh(a,b)}}function k(a){var b=a.config.customConfig;if(!b)return!1;var b=CKEDITOR.getUrl(b),c=p[b]||(p[b]={});c.fn?(c.fn.call(a,a.config),CKEDITOR.getUrl(a.config.customConfig)!=b&&k(a)||a.fireOnce("customConfigLoaded")):CKEDITOR.scriptLoader.queue(b,function(){c.fn=CKEDITOR.editorConfig?CKEDITOR.editorConfig:function(){};k(a)});return!0}function g(a,b){a.on("customConfigLoaded",function(){if(b){if(b.on)for(var c in b.on)a.on(c,b.on[c]);CKEDITOR.tools.extend(a.config,b,!0);delete a.config.on}c=
a.config;a.readOnly=c.readOnly?!0:a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.is("textarea")?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):a.element.isReadOnly():a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):!1;a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is("textarea")||CKEDITOR.dtd[a.element.getName()].p):!1;a.tabIndex=c.tabIndex||a.element&&a.element.getAttribute("tabindex")||
0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:c.enterMode;a.activeShiftEnterMode=a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:c.shiftEnterMode;c.skin&&(CKEDITOR.skinName=c.skin);a.fireOnce("configLoaded");a.dataProcessor=new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);h(a)});b&&null!=b.customConfig&&(a.config.customConfig=b.customConfig);k(a)||a.fireOnce("customConfigLoaded")}function h(a){CKEDITOR.skin.loadPart("editor",function(){m(a)})}function m(a){CKEDITOR.lang.load(a.config.language,
a.config.defaultLanguage,function(b,c){var d=a.config.title;a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(c);a.title="string"==typeof d||!1===d?d:[a.lang.editor,a.name].join(", ");a.config.contentsLangDirection||(a.config.contentsLangDirection=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir);a.fire("langLoaded");e(a)})}function e(a){a.getStylesSet(function(b){a.once("loaded",function(){a.fire("stylesSet",{styles:b})},null,null,1);n(a)})}function n(a){function b(a){if(!a)return"";
CKEDITOR.tools.isArray(a)&&(a=a.join(","));return a.replace(/\s/g,"")}var c=a.config,e=b(c.plugins),d=b(c.extraPlugins),g=b(c.removePlugins);if(d)var h=new RegExp("(?:^|,)(?:"+d.replace(/,/g,"|")+")(?\x3d,|$)","g"),e=e.replace(h,""),e=e+(","+d);if(g)var f=new RegExp("(?:^|,)(?:"+g.replace(/,/g,"|")+")(?\x3d,|$)","g"),e=e.replace(f,"");CKEDITOR.env.air&&(e+=",adobeair");CKEDITOR.plugins.load(e.split(","),function(b){var e=[],d=[],g=[];a.plugins=CKEDITOR.tools.extend({},a.plugins,b);for(var h in b){var m=
b[h],l=m.lang,k=null,n=m.requires,x;CKEDITOR.tools.isArray(n)&&(n=n.join(","));if(n&&(x=n.match(f)))for(;n=x.pop();)CKEDITOR.error("editor-plugin-required",{plugin:n.replace(",",""),requiredBy:h});l&&!a.lang[h]&&(l.split&&(l=l.split(",")),0<=CKEDITOR.tools.indexOf(l,a.langCode)?k=a.langCode:(k=a.langCode.replace(/-.*/,""),k=k!=a.langCode&&0<=CKEDITOR.tools.indexOf(l,k)?k:0<=CKEDITOR.tools.indexOf(l,"en")?"en":l[0]),m.langEntries&&m.langEntries[k]?(a.lang[h]=m.langEntries[k],k=null):g.push(CKEDITOR.getUrl(m.path+
"lang/"+k+".js")));d.push(k);e.push(m)}CKEDITOR.scriptLoader.load(g,function(){for(var b=["beforeInit","init","afterInit"],g=0;g<b.length;g++)for(var h=0;h<e.length;h++){var f=e[h];0===g&&d[h]&&f.lang&&f.langEntries&&(a.lang[f.name]=f.langEntries[d[h]]);if(f[b[g]])f[b[g]](a)}a.fireOnce("pluginsLoaded");c.keystrokes&&a.setKeystroke(a.config.keystrokes);for(h=0;h<a.config.blockedKeystrokes.length;h++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[h]]=1;a.status="loaded";a.fireOnce("loaded");
CKEDITOR.fire("instanceLoaded",null,a)})})}function q(){var a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var b=this.getData();this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is("textarea")?a.setValue(b):a.setHtml(b);return!0}return!1}function y(a,b){function c(a){var b=a.startContainer,e=a.endContainer;return b.is&&(b.is("tr")||b.is("td")&&b.equals(e)&&a.endOffset===b.getChildCount())?!0:!1}function e(a){var b=a.startContainer;return b.is("tr")?a.cloneContents():
b.clone(!0)}for(var d=new CKEDITOR.dom.documentFragment,g,h,f,m=0;m<a.length;m++){var l=a[m],k=l.startContainer.getAscendant("tr",!0);c(l)?(g||(g=k.getAscendant("table").clone(),g.append(k.getAscendant({thead:1,tbody:1,tfoot:1}).clone()),d.append(g),g=g.findOne("thead, tbody, tfoot")),h&&h.equals(k)||(h=k,f=k.clone(),g.append(f)),f.append(e(l))):d.append(l.cloneContents())}return g?d:b.getHtmlFromRange(a[0])}a.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=a;var u=0,p={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
{plugins:{detectConflict:function(a,b){for(var c=0;c<b.length;c++){var e=b[c];if(this[e])return CKEDITOR.warn("editor-plugin-conflict",{plugin:a,replacedWith:e}),!0}return!1}},addCommand:function(a,b){b.name=a.toLowerCase();var c=b instanceof CKEDITOR.command?b:new CKEDITOR.command(this,b);this.mode&&d(this,c);return this.commands[a]=c},_attachToForm:function(){function a(b){c.updateElement();c._.required&&!e.getValue()&&!1===c.fire("required")&&b.data.preventDefault()}function b(a){return!!(a&&a.call&&
a.apply)}var c=this,e=c.element,d=new CKEDITOR.dom.element(e.$.form);e.is("textarea")&&d&&(d.on("submit",a),b(d.$.submit)&&(d.$.submit=CKEDITOR.tools.override(d.$.submit,function(b){return function(){a();b.apply?b.apply(this):b()}})),c.on("destroy",function(){d.removeListener("submit",a)}))},destroy:function(a){var b=CKEDITOR.filter.instances,c=this;this.fire("beforeDestroy");!a&&q.call(this);this.editable(null);this.filter&&delete this.filter;CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b),
function(a){a=b[a];c===a.editor&&a.destroy()});delete this.activeFilter;this.status="destroyed";this.fire("destroy");this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire("instanceDestroyed",null,this)},elementPath:function(a){if(!a){a=this.getSelection();if(!a)return null;a=a.getStartElement()}return a?new CKEDITOR.dom.elementPath(a,this.editable()):null},createRange:function(){var a=this.editable();return a?new CKEDITOR.dom.range(a):null},execCommand:function(a,b){var c=this.getCommand(a),
e={name:a,commandData:b||{},command:c};return c&&c.state!=CKEDITOR.TRISTATE_DISABLED&&!1!==this.fire("beforeCommandExec",e)&&(e.returnValue=c.exec(e.commandData),!c.async&&!1!==this.fire("afterCommandExec",e))?e.returnValue:!1},getCommand:function(a){return this.commands[a]},getData:function(a){!a&&this.fire("beforeGetData");var b=this._.data;"string"!=typeof b&&(b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is("textarea")?b.getValue():b.getHtml():"");b={dataValue:b};!a&&this.fire("getData",
b);return b.dataValue},getSnapshot:function(){var a=this.fire("getSnapshot");"string"!=typeof a&&(a=(a=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.is("textarea")?a.getValue():a.getHtml():"");return a},loadSnapshot:function(a){this.fire("loadSnapshot",a)},setData:function(a,b,c){var e=!0,d=b;b&&"object"==typeof b&&(c=b.internal,d=b.callback,e=!b.noSnapshot);!c&&e&&this.fire("saveSnapshot");if(d||!c)this.once("dataReady",function(a){!c&&e&&this.fire("saveSnapshot");d&&d.call(a.editor)});
a={dataValue:a};!c&&this.fire("setData",a);this._.data=a.dataValue;!c&&this.fire("afterSetData",a)},setReadOnly:function(a){a=null==a||a;this.readOnly!=a&&(this.readOnly=a,this.keystrokeHandler.blockedKeystrokes[8]=+a,this.editable().setReadOnly(a),this.fire("readOnly"))},insertHtml:function(a,b,c){this.fire("insertHtml",{dataValue:a,mode:b,range:c})},insertText:function(a){this.fire("insertText",a)},insertElement:function(a){this.fire("insertElement",a)},getSelectedHtml:function(a){var b=this.editable(),
c=this.getSelection(),c=c&&c.getRanges();if(!b||!c||0===c.length)return null;b=y(c,b);return a?b.getHtml():b},extractSelectedHtml:function(a,b){var c=this.editable(),e=this.getSelection().getRanges(),d=new CKEDITOR.dom.documentFragment,g;if(!c||0===e.length)return null;for(g=0;g<e.length;g++)d.append(c.extractHtmlFromRange(e[g],b));b||this.getSelection().selectRanges([e[0]]);return a?d.getHtml():d},focus:function(){this.fire("beforeFocus")},checkDirty:function(){return"ready"==this.status&&this._.previousValue!==
this.getSnapshot()},resetDirty:function(){this._.previousValue=this.getSnapshot()},updateElement:function(){return q.call(this)},setKeystroke:function(){for(var a=this.keystrokeHandler.keystrokes,b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],c,e,d=b.length;d--;)c=b[d],e=0,CKEDITOR.tools.isArray(c)&&(e=c[1],c=c[0]),e?a[c]=e:delete a[c]},getCommandKeystroke:function(a,b){var c="string"===typeof a?this.getCommand(a):a,e=[];if(c){var d=CKEDITOR.tools.object.findKey(this.commands,
c),g=this.keystrokeHandler.keystrokes;if(c.fakeKeystroke)e.push(c.fakeKeystroke);else for(var h in g)g[h]===d&&e.push(h)}return b?e:e[0]||null},addFeature:function(a){return this.filter.addFeature(a)},setActiveFilter:function(a){a||(a=this.filter);this.activeFilter!==a&&(this.activeFilter=a,this.fire("activeFilterChange"),a===this.filter?this.setActiveEnterMode(null,null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),a.getAllowedEnterMode(this.shiftEnterMode,!0)))},setActiveEnterMode:function(a,
b){a=a?this.blockless?CKEDITOR.ENTER_BR:a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b)this.activeEnterMode=a,this.activeShiftEnterMode=b,this.fire("activeEnterModeChange")},showNotification:function(a){alert(a)}});CKEDITOR.editor._getEditorElement=function(a){if(!CKEDITOR.env.isCompatible)return null;var b=CKEDITOR.dom.element.get(a);return b?b.getEditor()?(CKEDITOR.error("editor-element-conflict",{editorName:b.getEditor().name}),
null):b:(CKEDITOR.error("editor-incorrect-element",{element:a}),null)}}(),CKEDITOR.ELEMENT_MODE_NONE=0,CKEDITOR.ELEMENT_MODE_REPLACE=1,CKEDITOR.ELEMENT_MODE_APPENDTO=2,CKEDITOR.ELEMENT_MODE_INLINE=3,CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}},function(){var a=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
f={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(b){for(var c,d,l=0,k;c=this._.htmlPartsRegex.exec(b);){d=c.index;if(d>l)if(l=b.substring(l,d),k)k.push(l);else this.onText(l);l=this._.htmlPartsRegex.lastIndex;if(d=c[1])if(d=d.toLowerCase(),k&&CKEDITOR.dtd.$cdata[d]&&
(this.onCDATA(k.join("")),k=null),!k){this.onTagClose(d);continue}if(k)k.push(c[0]);else if(d=c[3]){if(d=d.toLowerCase(),!/="/.test(d)){var g={},h,m=c[4];c=!!c[5];if(m)for(;h=a.exec(m);){var e=h[1].toLowerCase();h=h[2]||h[3]||h[4]||"";g[e]=!h&&f[e]?e:CKEDITOR.tools.htmlDecodeAttr(h)}this.onTagOpen(d,g,c);!k&&CKEDITOR.dtd.$cdata[d]&&(k=[])}}else if(d=c[2])this.onComment(d)}if(b.length>l)this.onText(b.substring(l,b.length))}}}(),CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._=
{output:[]}},proto:{openTag:function(a){this._.output.push("\x3c",a)},openTagClose:function(a,f){f?this._.output.push(" /\x3e"):this._.output.push("\x3e")},attribute:function(a,f){"string"==typeof f&&(f=CKEDITOR.tools.htmlEncodeAttr(f));this._.output.push(" ",a,'\x3d"',f,'"')},closeTag:function(a){this._.output.push("\x3c/",a,"\x3e")},text:function(a){this._.output.push(a)},comment:function(a){this._.output.push("\x3c!--",a,"--\x3e")},write:function(a){this._.output.push(a)},reset:function(){this._.output=
[];this._.indent=!1},getHtml:function(a){var f=this._.output.join("");a&&this.reset();return f}}}),"use strict",function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var a=this.parent.children,f=CKEDITOR.tools.indexOf(a,this),b=this.previous,c=this.next;b&&(b.next=c);c&&(c.previous=b);a.splice(f,1);this.parent=null},replaceWith:function(a){var f=this.parent.children,b=CKEDITOR.tools.indexOf(f,this),c=a.previous=this.previous,d=a.next=this.next;c&&(c.next=
a);d&&(d.previous=a);f[b]=a;a.parent=this.parent;this.parent=null},insertAfter:function(a){var f=a.parent.children,b=CKEDITOR.tools.indexOf(f,a),c=a.next;f.splice(b+1,0,this);this.next=a.next;this.previous=a;a.next=this;c&&(c.previous=this);this.parent=a.parent},insertBefore:function(a){var f=a.parent.children,b=CKEDITOR.tools.indexOf(f,a);f.splice(b,0,this);this.next=a;(this.previous=a.previous)&&(a.previous.next=this);a.previous=this;this.parent=a.parent},getAscendant:function(a){var f="function"==
typeof a?a:"string"==typeof a?function(b){return b.name==a}:function(b){return b.name in a},b=this.parent;for(;b&&b.type==CKEDITOR.NODE_ELEMENT;){if(f(b))return b;b=b.parent}return null},wrapWith:function(a){this.replaceWith(a);a.add(this);return a},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this)},getFilterContext:function(a){return a||{}}}}(),"use strict",CKEDITOR.htmlParser.comment=function(a){this.value=a;this._={isBlockLike:!1}},CKEDITOR.htmlParser.comment.prototype=
CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(a,f){var b=this.value;if(!(b=a.onComment(f,b,this)))return this.remove(),!1;if("string"!=typeof b)return this.replaceWith(b),!1;this.value=b;return!0},writeHtml:function(a,f){f&&this.filter(f);a.comment(this.value)}}),"use strict",function(){CKEDITOR.htmlParser.text=function(a){this.value=a;this._={isBlockLike:!1}};CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,
filter:function(a,f){if(!(this.value=a.onText(f,this.value,this)))return this.remove(),!1},writeHtml:function(a,f){f&&this.filter(f);a.text(this.value)}})}(),"use strict",function(){CKEDITOR.htmlParser.cdata=function(a){this.value=a};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(a){a.write(this.value)}})}(),"use strict",CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;
this._={isBlockLike:!0,hasInlineStarted:!1}},function(){function a(a){return a.attributes["data-cke-survive"]?!1:"a"==a.name&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]}var f=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),b={ol:1,ul:1},c=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),d={ul:"li",ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};
CKEDITOR.htmlParser.fragment.fromHtml=function(l,k,g){function h(a){var b;if(0<v.length)for(var c=0;c<v.length;c++){var e=v[c],d=e.name,g=CKEDITOR.dtd[d],h=r.name&&CKEDITOR.dtd[r.name];h&&!h[d]||a&&g&&!g[a]&&CKEDITOR.dtd[a]?d==r.name&&(n(r,r.parent,1),c--):(b||(m(),b=1),e=e.clone(),e.parent=r,r=e,v.splice(c,1),c--)}}function m(){for(;w.length;)n(w.shift(),r)}function e(a){if(a._.isBlockLike&&"pre"!=a.name&&"textarea"!=a.name){var b=a.children.length,c=a.children[b-1],e;c&&c.type==CKEDITOR.NODE_TEXT&&
((e=CKEDITOR.tools.rtrim(c.value))?c.value=e:a.children.length=b-1)}}function n(b,c,d){c=c||r||p;var h=r;void 0===b.previous&&(q(c,b)&&(r=c,u.onTagOpen(g,{}),b.returnPoint=c=r),e(b),a(b)&&!b.children.length||c.add(b),"pre"==b.name&&(t=!1),"textarea"==b.name&&(z=!1));b.returnPoint?(r=b.returnPoint,delete b.returnPoint):r=d?c:h}function q(a,b){if((a==p||"body"==a.name)&&g&&(!a.name||CKEDITOR.dtd[a.name][g])){var c,e;return(c=b.attributes&&(e=b.attributes["data-cke-real-element-type"])?e:b.name)&&c in
CKEDITOR.dtd.$inline&&!(c in CKEDITOR.dtd.head)&&!b.isOrphan||b.type==CKEDITOR.NODE_TEXT}}function y(a,b){return a in CKEDITOR.dtd.$listItem||a in CKEDITOR.dtd.$tableContent?a==b||"dt"==a&&"dd"==b||"dd"==a&&"dt"==b:!1}var u=new CKEDITOR.htmlParser,p=k instanceof CKEDITOR.htmlParser.element?k:"string"==typeof k?new CKEDITOR.htmlParser.element(k):new CKEDITOR.htmlParser.fragment,v=[],w=[],r=p,z="textarea"==p.name,t="pre"==p.name;u.onTagOpen=function(e,d,g,l){d=new CKEDITOR.htmlParser.element(e,d);d.isUnknown&&
g&&(d.isEmpty=!0);d.isOptionalClose=l;if(a(d))v.push(d);else{if("pre"==e)t=!0;else{if("br"==e&&t){r.add(new CKEDITOR.htmlParser.text("\n"));return}"textarea"==e&&(z=!0)}if("br"==e)w.push(d);else{for(;!(l=(g=r.name)?CKEDITOR.dtd[g]||(r._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c,d.isUnknown||r.isUnknown||l[e]);)if(r.isOptionalClose)u.onTagClose(g);else if(e in b&&g in b)g=r.children,(g=g[g.length-1])&&"li"==g.name||n(g=new CKEDITOR.htmlParser.element("li"),r),!d.returnPoint&&(d.returnPoint=
r),r=g;else if(e in CKEDITOR.dtd.$listItem&&!y(e,g))u.onTagOpen("li"==e?"ul":"dl",{},0,1);else if(g in f&&!y(e,g))!d.returnPoint&&(d.returnPoint=r),r=r.parent;else if(g in CKEDITOR.dtd.$inline&&v.unshift(r),r.parent)n(r,r.parent,1);else{d.isOrphan=1;break}h(e);m();d.parent=r;d.isEmpty?n(d):r=d}}};u.onTagClose=function(a){for(var b=v.length-1;0<=b;b--)if(a==v[b].name){v.splice(b,1);return}for(var c=[],e=[],d=r;d!=p&&d.name!=a;)d._.isBlockLike||e.unshift(d),c.push(d),d=d.returnPoint||d.parent;if(d!=
p){for(b=0;b<c.length;b++){var h=c[b];n(h,h.parent)}r=d;d._.isBlockLike&&m();n(d,d.parent);d==r&&(r=r.parent);v=v.concat(e)}"body"==a&&(g=!1)};u.onText=function(a){if(!(r._.hasInlineStarted&&!w.length||t||z)&&(a=CKEDITOR.tools.ltrim(a),0===a.length))return;var b=r.name,e=b?CKEDITOR.dtd[b]||(r._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!z&&!e["#"]&&b in f)u.onTagOpen(d[b]||""),u.onText(a);else{m();h();t||z||(a=a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," "));a=new CKEDITOR.htmlParser.text(a);
if(q(r,a))this.onTagOpen(g,{},0,1);r.add(a)}};u.onCDATA=function(a){r.add(new CKEDITOR.htmlParser.cdata(a))};u.onComment=function(a){m();h();r.add(new CKEDITOR.htmlParser.comment(a))};u.parse(l);for(m();r!=p;)n(r,r.parent,1);e(p);return p};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(a,b){isNaN(b)&&(b=this.children.length);var c=0<b?this.children[b-1]:null;if(c){if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT&&(c.value=CKEDITOR.tools.rtrim(c.value),0===
c.value.length)){this.children.pop();this.add(a);return}c.next=a}a.previous=c;a.parent=this;this.children.splice(b,0,a);this._.hasInlineStarted||(this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike)},filter:function(a,b){b=this.getFilterContext(b);a.onRoot(b,this);this.filterChildren(a,!1,b)},filterChildren:function(a,b,c){if(this.childrenFilteredBy!=a.id){c=this.getFilterContext(c);if(b&&!this.parent)a.onRoot(c,this);this.childrenFilteredBy=a.id;for(b=
0;b<this.children.length;b++)!1===this.children[b].filter(a,c)&&b--}},writeHtml:function(a,b){b&&this.filter(b);this.writeChildrenHtml(a)},writeChildrenHtml:function(a,b,c){var d=this.getFilterContext();if(c&&!this.parent&&b)b.onRoot(d,this);b&&this.filterChildren(b,!1,d);b=0;c=this.children;for(d=c.length;b<d;b++)c[b].writeHtml(a)},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var d=a(this);if(!1!==d){c=this.children;for(var f=0;f<c.length;f++)d=c[f],d.type==CKEDITOR.NODE_ELEMENT?d.forEach(a,
b):b&&d.type!=b||a(d)}},getFilterContext:function(a){return a||{}}}}(),"use strict",function(){function a(){this.rules=[]}function f(b,c,d,f){var k,g;for(k in c)(g=b[k])||(g=b[k]=new a),g.add(c[k],d,f)}CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(b){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new a;this.attributeNameRules=new a;this.elementsRules={};this.attributesRules={};this.textRules=new a;this.commentRules=new a;this.rootRules=new a;b&&this.addRules(b,10)},
proto:{addRules:function(a,c){var d;"number"==typeof c?d=c:c&&"priority"in c&&(d=c.priority);"number"!=typeof d&&(d=10);"object"!=typeof c&&(c={});a.elementNames&&this.elementNameRules.addMany(a.elementNames,d,c);a.attributeNames&&this.attributeNameRules.addMany(a.attributeNames,d,c);a.elements&&f(this.elementsRules,a.elements,d,c);a.attributes&&f(this.attributesRules,a.attributes,d,c);a.text&&this.textRules.add(a.text,d,c);a.comment&&this.commentRules.add(a.comment,d,c);a.root&&this.rootRules.add(a.root,
d,c)},applyTo:function(a){a.filter(this)},onElementName:function(a,c){return this.elementNameRules.execOnName(a,c)},onAttributeName:function(a,c){return this.attributeNameRules.execOnName(a,c)},onText:function(a,c,d){return this.textRules.exec(a,c,d)},onComment:function(a,c,d){return this.commentRules.exec(a,c,d)},onRoot:function(a,c){return this.rootRules.exec(a,c)},onElement:function(a,c){for(var d=[this.elementsRules["^"],this.elementsRules[c.name],this.elementsRules.$],f,k=0;3>k;k++)if(f=d[k]){f=
f.exec(a,c,this);if(!1===f)return null;if(f&&f!=c)return this.onNode(a,f);if(c.parent&&!c.name)break}return c},onNode:function(a,c){var d=c.type;return d==CKEDITOR.NODE_ELEMENT?this.onElement(a,c):d==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(a,c.value)):d==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(a,c.value)):null},onAttribute:function(a,c,d,f){return(d=this.attributesRules[d])?d.exec(a,f,c,this):f}}});CKEDITOR.htmlParser.filterRulesGroup=a;a.prototype=
{add:function(a,c,d){this.rules.splice(this.findIndex(c),0,{value:a,priority:c,options:d})},addMany:function(a,c,d){for(var f=[this.findIndex(c),0],k=0,g=a.length;k<g;k++)f.push({value:a[k],priority:c,options:d});this.rules.splice.apply(this.rules,f)},findIndex:function(a){for(var c=this.rules,d=c.length-1;0<=d&&a<c[d].priority;)d--;return d+1},exec:function(a,c){var d=c instanceof CKEDITOR.htmlParser.node||c instanceof CKEDITOR.htmlParser.fragment,f=Array.prototype.slice.call(arguments,1),k=this.rules,
g=k.length,h,m,e,n;for(n=0;n<g;n++)if(d&&(h=c.type,m=c.name),e=k[n],!(a.nonEditable&&!e.options.applyToAll||a.nestedEditable&&e.options.excludeNestedEditable)){e=e.value.apply(null,f);if(!1===e||d&&e&&(e.name!=m||e.type!=h))return e;null!=e&&(f[0]=c=e)}return c},execOnName:function(a,c){for(var d=0,f=this.rules,k=f.length,g;c&&d<k;d++)g=f[d],a.nonEditable&&!g.options.applyToAll||a.nestedEditable&&g.options.excludeNestedEditable||(c=c.replace(g.value[0],g.value[1]));return c}}}(),function(){function a(a,
e){function g(a){return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(" "):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1})}function h(a,e){return function(d){if(d.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var h=[],m=b(d),k,D;if(m)for(f(m,1)&&h.push(m);m;)l(m)&&(k=c(m))&&f(k)&&((D=c(k))&&!l(D)?h.push(k):(g(n).insertAfter(k),k.remove())),m=m.previous;for(m=0;m<h.length;m++)h[m].remove();if(h=!a||!1!==("function"==typeof e?e(d):e))n||CKEDITOR.env.needsBrFiller||d.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT?
n||CKEDITOR.env.needsBrFiller||!(7<document.documentMode||d.name in CKEDITOR.dtd.tr||d.name in CKEDITOR.dtd.$listItem)?(h=b(d),h=!h||"form"==d.name&&"input"==h.name):h=!1:h=!1;h&&d.add(g(a))}}}function f(a,b){if((!n||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&"br"==a.name&&!a.attributes["data-cke-eol"])return!0;var c;return a.type==CKEDITOR.NODE_TEXT&&(c=a.value.match(r))&&(c.index&&((new CKEDITOR.htmlParser.text(a.value.substring(0,c.index))).insertBefore(a),a.value=c[0]),!CKEDITOR.env.needsBrFiller&&
n&&(!b||a.parent.name in D)||!n&&((c=a.previous)&&"br"==c.name||!c||l(c)))?!0:!1}var m={elements:{}},n="html"==e,D=CKEDITOR.tools.extend({},A),x;for(x in D)"#"in t[x]||delete D[x];for(x in D)m.elements[x]=h(n,a.config.fillEmptyBlocks);m.root=h(n,!1);m.elements.br=function(a){return function(b){if(b.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var e=b.attributes;if("data-cke-bogus"in e||"data-cke-eol"in e)delete e["data-cke-bogus"];else{for(e=b.next;e&&d(e);)e=e.next;var h=c(b);!e&&l(b.parent)?k(b.parent,
g(a)):l(e)&&h&&!l(h)&&g(a).insertBefore(e)}}}}(n);return m}function f(a,b){return a!=CKEDITOR.ENTER_BR&&!1!==b?a==CKEDITOR.ENTER_DIV?"div":"p":!1}function b(a){for(a=a.children[a.children.length-1];a&&d(a);)a=a.previous;return a}function c(a){for(a=a.previous;a&&d(a);)a=a.previous;return a}function d(a){return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&a.attributes["data-cke-bookmark"]}function l(a){return a&&(a.type==CKEDITOR.NODE_ELEMENT&&a.name in
A||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)}function k(a,b){var c=a.children[a.children.length-1];a.children.push(b);b.parent=a;c&&(c.next=b,b.previous=c)}function g(a){a=a.attributes;"false"!=a.contenteditable&&(a["data-cke-editable"]=a.contenteditable?"true":1);a.contenteditable="false"}function h(a){a=a.attributes;switch(a["data-cke-editable"]){case "true":a.contenteditable="true";break;case "1":delete a.contenteditable}}function m(a){return a.replace(I,function(a,b,c){return"\x3c"+b+c.replace(J,
function(a,b){return E.test(b)&&-1==c.indexOf("data-cke-saved-"+b)?" data-cke-saved-"+a+" data-cke-"+CKEDITOR.rnd+"-"+a:a})+"\x3e"})}function e(a,b){return a.replace(b,function(a,b,c){0===a.indexOf("\x3ctextarea")&&(a=b+p(c).replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;")+"\x3c/textarea\x3e");return"\x3ccke:encoded\x3e"+encodeURIComponent(a)+"\x3c/cke:encoded\x3e"})}function n(a){return a.replace(D,function(a,b){return decodeURIComponent(b)})}function q(a){return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
function(a){return"\x3c!--"+z+"{C}"+encodeURIComponent(a).replace(/--/g,"%2D%2D")+"--\x3e"})}function y(a){return CKEDITOR.tools.array.reduce(a.split(""),function(a,b){var c=b.toLowerCase(),e=b.toUpperCase(),d=u(c);c!==e&&(d+="|"+u(e));return a+("("+d+")")},"")}function u(a){var b;b=a.charCodeAt(0);var c=b.toString(16);b={htmlCode:"\x26#"+b+";?",hex:"\x26#x0*"+c+";?",entity:{"\x3c":"\x26lt;","\x3e":"\x26gt;",":":"\x26colon;"}[a]};for(var e in b)b[e]&&(a+="|"+b[e]);return a}function p(a){return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,
function(a,b){return decodeURIComponent(b)})}function v(a,b){var c=b._.dataStore;return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)}).replace(/\{cke_protected_(\d+)\}/g,function(a,b){return c&&c[b]||""})}function w(a,b){var c=[],e=b.config.protectedSource,d=b._.dataStore||(b._.dataStore={id:1}),g=/<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,e=[/<script[\s\S]*?(<\/script>|$)/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(e);a=a.replace(/\x3c!--[\s\S]*?--\x3e/g,
function(a){return"\x3c!--{cke_tempcomment}"+(c.push(a)-1)+"--\x3e"});for(var h=0;h<e.length;h++)a=a.replace(e[h],function(a){a=a.replace(g,function(a,b,e){return c[e]});return/cke_temp(comment)?/.test(a)?a:"\x3c!--{cke_temp}"+(c.push(a)-1)+"--\x3e"});a=a.replace(g,function(a,b,e){return"\x3c!--"+z+(b?"{C}":"")+encodeURIComponent(c[e]).replace(/--/g,"%2D%2D")+"--\x3e"});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(a){return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,
function(a,b){d[d.id]=decodeURIComponent(b);return"{cke_protected_"+d.id++ +"}"})});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(a,c,e,d){return"\x3c"+c+e+"\x3e"+v(p(d),b)+"\x3c/"+c+"\x3e"})}CKEDITOR.htmlDataProcessor=function(b){var c,d,g=this;this.editor=b;this.dataFilter=c=new CKEDITOR.htmlParser.filter;this.htmlFilter=d=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;c.addRules(B);c.addRules(C,{applyToAll:!0});c.addRules(a(b,"data"),
{applyToAll:!0});d.addRules(H);d.addRules(F,{applyToAll:!0});d.addRules(a(b,"html"),{applyToAll:!0});b.on("toHtml",function(a){a=a.data;var c=a.dataValue,d,c=c.replace(N,""),c=w(c,b),c=e(c,G),c=m(c),c=e(c,L),c=c.replace(Q,"$1cke:$2"),c=c.replace(K,"\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),c=c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2"),c=c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,"$1data-cke-"+CKEDITOR.rnd+"-$2");d=a.context||b.editable().getName();var g;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&"pre"==
d&&(d="div",c="\x3cpre\x3e"+c+"\x3c/pre\x3e",g=1);d=b.document.createElement(d);d.setHtml("a"+c);c=d.getHtml().substr(1);c=c.replace(new RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),"");g&&(c=c.replace(/^<pre>|<\/pre>$/gi,""));c=c.replace(O,"$1$2");c=n(c);c=p(c);d=!1===a.fixForBody?!1:f(a.enterMode,b.config.autoParagraph);c=CKEDITOR.htmlParser.fragment.fromHtml(c,a.context,d);d&&(g=c,!g.children.length&&CKEDITOR.dtd[g.name][d]&&(d=new CKEDITOR.htmlParser.element(d),g.add(d)));a.dataValue=c},null,null,
5);b.on("toHtml",function(a){a.data.filter.applyTo(a.data.dataValue,!0,a.data.dontFilter,a.data.enterMode)&&b.fire("dataFiltered")},null,null,6);b.on("toHtml",function(a){a.data.dataValue.filterChildren(g.dataFilter,!0)},null,null,10);b.on("toHtml",function(a){a=a.data;var b=a.dataValue,c=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(c);b=c.getHtml(!0);a.dataValue=q(b)},null,null,15);b.on("toDataFormat",function(a){var c=a.data.dataValue;a.data.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/^<br *\/?>/i,
""));a.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(c,a.data.context,f(a.data.enterMode,b.config.autoParagraph))},null,null,5);b.on("toDataFormat",function(a){a.data.dataValue.filterChildren(g.htmlFilter,!0)},null,null,10);b.on("toDataFormat",function(a){a.data.filter.applyTo(a.data.dataValue,!1,!0)},null,null,11);b.on("toDataFormat",function(a){var c=a.data.dataValue,e=g.writer;e.reset();c.writeChildrenHtml(e);c=e.getHtml(!0);c=p(c);c=v(c,b);a.data.dataValue=c},null,null,15)};CKEDITOR.htmlDataProcessor.prototype=
{toHtml:function(a,b,c,e){var d=this.editor,g,h,f,m;b&&"object"==typeof b?(g=b.context,c=b.fixForBody,e=b.dontFilter,h=b.filter,f=b.enterMode,m=b.protectedWhitespaces):g=b;g||null===g||(g=d.editable().getName());return d.fire("toHtml",{dataValue:a,context:g,fixForBody:c,dontFilter:e,filter:h||d.filter,enterMode:f||d.enterMode,protectedWhitespaces:m}).dataValue},toDataFormat:function(a,b){var c,e,d;b&&(c=b.context,e=b.filter,d=b.enterMode);c||null===c||(c=this.editor.editable().getName());return this.editor.fire("toDataFormat",
{dataValue:a,filter:e||this.editor.filter,context:c,enterMode:d||this.editor.enterMode}).dataValue}};var r=/(?:&nbsp;|\xa0)$/,z="{cke_protected}",t=CKEDITOR.dtd,x="caption colgroup col thead tfoot tbody".split(" "),A=CKEDITOR.tools.extend({},t.$blockLimit,t.$block),B={elements:{input:g,textarea:g}},C={attributeNames:[[/^on/,"data-cke-pa-on"],[/^srcdoc/,"data-cke-pa-srcdoc"],[/^data-cke-expando$/,""]],elements:{iframe:function(a){if(a.attributes&&a.attributes.src){var b=a.attributes.src.toLowerCase().replace(/[^a-z]/gi,
"");if(0===b.indexOf("javascript")||0===b.indexOf("data"))a.attributes["data-cke-pa-src"]=a.attributes.src,delete a.attributes.src}}}},H={elements:{embed:function(a){var b=a.parent;if(b&&"object"==b.name){var c=b.attributes.width,b=b.attributes.height;c&&(a.attributes.width=c);b&&(a.attributes.height=b)}},a:function(a){var b=a.attributes;if(!(a.children.length||b.name||b.id||a.attributes["data-cke-saved-name"]))return!1}}},F={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,
""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(a){var b=a.attributes;if(b){if(b["data-cke-temp"])return!1;for(var c=["name","href","src"],e,d=0;d<c.length;d++)e="data-cke-saved-"+c[d],e in b&&delete b[c[d]]}return a},table:function(a){a.children.slice(0).sort(function(a,b){var c,e;a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type&&(c=CKEDITOR.tools.indexOf(x,a.name),e=CKEDITOR.tools.indexOf(x,b.name));-1<c&&-1<e&&c!=e||(c=a.parent?a.getIndex():-1,e=b.parent?b.getIndex():-1);return c>e?
1:-1})},param:function(a){a.children=[];a.isEmpty=!0;return a},span:function(a){"Apple-style-span"==a.attributes["class"]&&delete a.name},html:function(a){delete a.attributes.contenteditable;delete a.attributes["class"]},body:function(a){delete a.attributes.spellcheck;delete a.attributes.contenteditable},style:function(a){var b=a.children[0];b&&b.value&&(b.value=CKEDITOR.tools.trim(b.value));a.attributes.type||(a.attributes.type="text/css")},title:function(a){var b=a.children[0];!b&&k(a,b=new CKEDITOR.htmlParser.text);
b.value=a.attributes["data-cke-title"]||""},input:h,textarea:h},attributes:{"class":function(a){return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,""))||!1}}};CKEDITOR.env.ie&&(F.attributes.style=function(a){return a.replace(/(^|;)([^\:]+)/g,function(a){return a.toLowerCase()})});var I=/<(a|area|img|input|source)\b([^>]*)>/gi,J=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,E=/^(href|src|name)$/i,L=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
G=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,D=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,N=new RegExp("("+y("\x3ccke:encoded\x3e")+"(.*?)"+y("\x3c/cke:encoded\x3e")+")|("+y("\x3c")+y("/")+"?"+y("cke:encoded\x3e")+")","gi"),Q=/(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi,O=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,K=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi}(),"use strict",CKEDITOR.htmlParser.element=function(a,f){this.name=a;this.attributes=f||{};this.children=
[];var b=a||"",c=b.match(/^cke:(.*)/);c&&(b=c[1]);b=!!(CKEDITOR.dtd.$nonBodyContent[b]||CKEDITOR.dtd.$block[b]||CKEDITOR.dtd.$listItem[b]||CKEDITOR.dtd.$tableContent[b]||CKEDITOR.dtd.$nonEditable[b]||"br"==b);this.isEmpty=!!CKEDITOR.dtd.$empty[a];this.isUnknown=!CKEDITOR.dtd[a];this._={isBlockLike:b,hasInlineStarted:this.isEmpty||!b}},CKEDITOR.htmlParser.cssStyle=function(a){var f={};((a instanceof CKEDITOR.htmlParser.element?a.attributes.style:a)||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
function(a,c,d){"font-family"==c&&(d=d.replace(/["']/g,""));f[c.toLowerCase()]=d});return{rules:f,populate:function(a){var c=this.toString();c&&(a instanceof CKEDITOR.dom.element?a.setAttribute("style",c):a instanceof CKEDITOR.htmlParser.element?a.attributes.style=c:a.style=c)},toString:function(){var a=[],c;for(c in f)f[c]&&a.push(c,":",f[c],";");return a.join("")}}},function(){function a(a){return function(b){return b.type==CKEDITOR.NODE_ELEMENT&&("string"==typeof a?b.name==a:b.name in a)}}var f=
function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0},b=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:b.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes)},filter:function(a,b){var f=this,k,g;b=f.getFilterContext(b);if(!f.parent)a.onRoot(b,f);for(;;){k=f.name;if(!(g=a.onElementName(b,k)))return this.remove(),!1;f.name=g;if(!(f=a.onElement(b,f)))return this.remove(),
!1;if(f!==this)return this.replaceWith(f),!1;if(f.name==k)break;if(f.type!=CKEDITOR.NODE_ELEMENT)return this.replaceWith(f),!1;if(!f.name)return this.replaceWithChildren(),!1}k=f.attributes;var h,m;for(h in k){for(g=k[h];;)if(m=a.onAttributeName(b,h))if(m!=h)delete k[h],h=m;else break;else{delete k[h];break}m&&(!1===(g=a.onAttribute(b,f,m,g))?delete k[m]:k[m]=g)}f.isEmpty||this.filterChildren(a,!1,b);return!0},filterChildren:b.filterChildren,writeHtml:function(a,b){b&&this.filter(b);var l=this.name,
k=[],g=this.attributes,h,m;a.openTag(l,g);for(h in g)k.push([h,g[h]]);a.sortAttributes&&k.sort(f);h=0;for(m=k.length;h<m;h++)g=k[h],a.attribute(g[0],g[1]);a.openTagClose(l,this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(l)},writeChildrenHtml:b.writeChildrenHtml,replaceWithChildren:function(){for(var a=this.children,b=a.length;b;)a[--b].insertAfter(this);this.remove()},forEach:b.forEach,getFirst:function(b){if(!b)return this.children.length?this.children[0]:null;"function"!=typeof b&&
(b=a(b));for(var d=0,f=this.children.length;d<f;++d)if(b(this.children[d]))return this.children[d];return null},getHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml()},setHtml:function(a){a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children;for(var b=0,f=a.length;b<f;++b)a[b].parent=this},getOuterHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeHtml(a);return a.getHtml()},split:function(a){for(var b=this.children.splice(a,
this.children.length-a),f=this.clone(),k=0;k<b.length;++k)b[k].parent=f;f.children=b;b[0]&&(b[0].previous=null);0<a&&(this.children[a-1].next=null);this.parent.add(f,this.getIndex()+1);return f},find:function(a,b){void 0===b&&(b=!1);var f=[],k;for(k=0;k<this.children.length;k++){var g=this.children[k];"function"==typeof a&&a(g)?f.push(g):"string"==typeof a&&g.name===a&&f.push(g);b&&g.find&&(f=f.concat(g.find(a,b)))}return f},findOne:function(a,b){var f=null,k=CKEDITOR.tools.array.find(this.children,
function(g){var h="function"===typeof a?a(g):g.name===a;if(h||!b)return h;g.children&&g.findOne&&(f=g.findOne(a,!0));return!!f});return f||k||null},addClass:function(a){if(!this.hasClass(a)){var b=this.attributes["class"]||"";this.attributes["class"]=b+(b?" ":"")+a}},removeClass:function(a){var b=this.attributes["class"];b&&((b=CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)"+a+"(?:\\s+|$)")," ")))?this.attributes["class"]=b:delete this.attributes["class"])},hasClass:function(a){var b=this.attributes["class"];
return b?(new RegExp("(?:^|\\s)"+a+"(?\x3d\\s|$)")).test(b):!1},getFilterContext:function(a){var b=[];a||(a={nonEditable:!1,nestedEditable:!1});a.nonEditable||"false"!=this.attributes.contenteditable?a.nonEditable&&!a.nestedEditable&&"true"==this.attributes.contenteditable&&b.push("nestedEditable",!0):b.push("nonEditable",!0);if(b.length){a=CKEDITOR.tools.copy(a);for(var f=0;f<b.length;f+=2)a[b[f]]=b[f+1]}return a}},!0)}(),function(){var a=/{([^}]+)}/g;CKEDITOR.template=function(a){this.source="function"===
typeof a?a:String(a)};CKEDITOR.template.prototype.output=function(f,b){var c=("function"===typeof this.source?this.source(f):this.source).replace(a,function(a,b){return void 0!==f[b]?f[b]:a});return b?b.push(c):c}}(),delete CKEDITOR.loadFullCore,CKEDITOR.instances={},CKEDITOR.document=new CKEDITOR.dom.document(document),CKEDITOR.add=function(a){function f(){CKEDITOR.currentInstance==a&&(CKEDITOR.currentInstance=null,CKEDITOR.fire("currentInstance"))}CKEDITOR.instances[a.name]=a;a.on("focus",function(){CKEDITOR.currentInstance!=
a&&(CKEDITOR.currentInstance=a,CKEDITOR.fire("currentInstance"))});a.on("blur",f);a.on("destroy",f);CKEDITOR.fire("instance",null,a)},CKEDITOR.remove=function(a){delete CKEDITOR.instances[a.name]},function(){var a={};CKEDITOR.addTemplate=function(f,b){var c=a[f];if(c)return c;c={name:f,source:b};CKEDITOR.fire("template",c);return a[f]=new CKEDITOR.template(c.source)};CKEDITOR.getTemplate=function(f){return a[f]}}(),function(){var a=[];CKEDITOR.addCss=function(f){a.push(f)};CKEDITOR.getCss=function(){return a.join("\n")}}(),
CKEDITOR.on("instanceDestroyed",function(){CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire("reset")}),CKEDITOR.TRISTATE_ON=1,CKEDITOR.TRISTATE_OFF=2,CKEDITOR.TRISTATE_DISABLED=0,function(){CKEDITOR.inline=function(a,f){a=CKEDITOR.editor._getEditorElement(a);if(!a)return null;var b=new CKEDITOR.editor(f,a,CKEDITOR.ELEMENT_MODE_INLINE),c=a.is("textarea")?a:null;c?(b.setData(c.getValue(),null,!0),a=CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"'+!!b.readOnly+'" class\x3d"cke_textarea_inline"\x3e'+
c.getValue()+"\x3c/div\x3e",CKEDITOR.document),a.insertAfter(c),c.hide(),c.$.form&&b._attachToForm()):b.setData(a.getHtml(),null,!0);b.on("loaded",function(){b.fire("uiReady");b.editable(a);b.container=a;b.ui.contentsElement=a;b.setData(b.getData(1));b.resetDirty();b.fire("contentDom");b.mode="wysiwyg";b.fire("mode");b.status="ready";b.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,b)},null,null,1E4);b.on("destroy",function(){c&&(b.container.clearCustomData(),b.container.remove(),c.show());
b.element.clearCustomData();delete b.element});return b};CKEDITOR.inlineAll=function(){var a,f,b;for(b in CKEDITOR.dtd.$editable)for(var c=CKEDITOR.document.getElementsByTag(b),d=0,l=c.count();d<l;d++)a=c.getItem(d),"true"==a.getAttribute("contenteditable")&&(f={element:a,config:{}},!1!==CKEDITOR.fire("inline",f)&&CKEDITOR.inline(a,f.config))};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll()})}(),CKEDITOR.replaceClass="ckeditor",function(){function a(a,d,l,k){a=CKEDITOR.editor._getEditorElement(a);
if(!a)return null;var g=new CKEDITOR.editor(d,a,k);k==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.setStyle("visibility","hidden"),g._.required=a.hasAttribute("required"),a.removeAttribute("required"));l&&g.setData(l,null,!0);g.on("loaded",function(){b(g);k==CKEDITOR.ELEMENT_MODE_REPLACE&&g.config.autoUpdateElement&&a.$.form&&g._attachToForm();g.setMode(g.config.startupMode,function(){g.resetDirty();g.status="ready";g.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,g)})});g.on("destroy",f);return g}
function f(){var a=this.container,b=this.element;a&&(a.clearCustomData(),a.remove());b&&(b.clearCustomData(),this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(b.show(),this._.required&&b.setAttribute("required","required")),delete this.element)}function b(a){var b=a.name,f=a.element,k=a.elementMode,g=a.fire("uiSpace",{space:"top",html:""}).html,h=a.fire("uiSpace",{space:"bottom",html:""}).html,m=new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+
CKEDITOR.env.cssClass+'"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':"")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':"")+'\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
b=CKEDITOR.dom.element.createFromHtml(m.output({id:a.id,name:b,langDir:a.lang.dir,langCode:a.langCode,voiceLabel:a.title,topHtml:g?'\x3cspan id\x3d"'+a.ui.spaceId("top")+'" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e'+g+"\x3c/span\x3e":"",contentId:a.ui.spaceId("contents"),bottomHtml:h?'\x3cspan id\x3d"'+a.ui.spaceId("bottom")+'" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e'+h+"\x3c/span\x3e":"",outerEl:CKEDITOR.env.ie?"span":"div"}));k==CKEDITOR.ELEMENT_MODE_REPLACE?
(f.hide(),b.insertAfter(f)):f.append(b);a.container=b;a.ui.contentsElement=a.ui.space("contents");g&&a.ui.space("top").unselectable();h&&a.ui.space("bottom").unselectable();f=a.config.width;k=a.config.height;f&&b.setStyle("width",CKEDITOR.tools.cssLength(f));k&&a.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(k));b.disableContextMenu();CKEDITOR.env.webkit&&b.on("focus",function(){a.focus()});a.fireOnce("uiReady")}CKEDITOR.replace=function(b,d){return a(b,d,null,CKEDITOR.ELEMENT_MODE_REPLACE)};
CKEDITOR.appendTo=function(b,d,f){return a(b,d,f,CKEDITOR.ELEMENT_MODE_APPENDTO)};CKEDITOR.replaceAll=function(){for(var a=document.getElementsByTagName("textarea"),b=0;b<a.length;b++){var f=null,k=a[b];if(k.name||k.id){if("string"==typeof arguments[0]){if(!(new RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)")).test(k.className))continue}else if("function"==typeof arguments[0]&&(f={},!1===arguments[0](k,f)))continue;this.replace(k,f)}}};CKEDITOR.editor.prototype.addMode=function(a,b){(this._.modes||(this._.modes=
{}))[a]=b};CKEDITOR.editor.prototype.setMode=function(a,b){var f=this,k=this._.modes;if(a!=f.mode&&k&&k[a]){f.fire("beforeSetMode",a);if(f.mode){var g=f.checkDirty(),k=f._.previousModeData,h,m=0;f.fire("beforeModeUnload");f.editable(0);f._.previousMode=f.mode;f._.previousModeData=h=f.getData(1);"source"==f.mode&&k==h&&(f.fire("lockSnapshot",{forceUpdate:!0}),m=1);f.ui.space("contents").setHtml("");f.mode=""}else f._.previousModeData=f.getData(1);this._.modes[a](function(){f.mode=a;void 0!==g&&!g&&
f.resetDirty();m?f.fire("unlockSnapshot"):"wysiwyg"==a&&f.fire("saveSnapshot");setTimeout(function(){f.fire("mode");b&&b.call(f)},0)})}};CKEDITOR.editor.prototype.resize=function(a,b,f,k){var g=this.container,h=this.ui.space("contents"),m=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;k=k?this.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}):g;k.setSize("width",a,!0);m&&(m.style.width="1%");var e=(k.$.offsetHeight||0)-(h.$.clientHeight||
0),g=Math.max(b-(f?0:e),0);b=f?b+e:b;h.setStyle("height",g+"px");m&&(m.style.width="100%");this.fire("resize",{outerHeight:b,contentsHeight:g,outerWidth:a||k.getSize("width")})};CKEDITOR.editor.prototype.getResizable=function(a){return a?this.ui.space("contents"):this.container};CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass)})}(),CKEDITOR.config.startupMode="wysiwyg",function(){function a(a){var b=a.editor,e=a.data.path,d=e.blockLimit,g=a.data.selection,
h=g.getRanges()[0],m;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(g=f(g,e))g.appendBogus(),m=CKEDITOR.env.ie;k(b,e.block,d)&&h.collapsed&&!h.getCommonAncestor().isReadOnly()&&(e=h.clone(),e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),d=new CKEDITOR.dom.walker(e),d.guard=function(a){return!c(a)||a.type==CKEDITOR.NODE_COMMENT||a.isReadOnly()},!d.checkForward()||e.checkStartOfBlock()&&e.checkEndOfBlock())&&(b=h.fixBlock(!0,b.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p"),CKEDITOR.env.needsBrFiller||
(b=b.getFirst(c))&&b.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/)&&b.remove(),m=1,a.cancel());m&&h.select()}function f(a,b){if(a.isFake)return 0;var e=b.block||b.blockLimit,d=e&&e.getLast(c);if(!(!e||!e.isBlockBoundary()||d&&d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()||e.is("pre")||e.getBogus()))return e}function b(a){var b=a.data.getTarget();b.is("input")&&(b=b.getAttribute("type"),"submit"!=b&&"reset"!=b||a.data.preventDefault())}function c(a){return n(a)&&
q(a)}function d(a,b){return function(c){var e=c.data.$.toElement||c.data.$.fromElement||c.data.$.relatedTarget;(e=e&&e.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(e):null)&&(b.equals(e)||b.contains(e))||a.call(this,c)}}function l(a){function b(a){return function(b,d){d&&b.type==CKEDITOR.NODE_ELEMENT&&b.is(g)&&(e=b);if(!(d||!c(b)||a&&u(b)))return!1}}var e,d=a.getRanges()[0];a=a.root;var g={table:1,ul:1,ol:1,dl:1};if(d.startPath().contains(g)){var f=d.clone();f.collapse(1);f.setStartAt(a,
CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(f);a.guard=b();a.checkBackward();if(e)return f=d.clone(),f.collapse(),f.setEndAt(e,CKEDITOR.POSITION_AFTER_END),a=new CKEDITOR.dom.walker(f),a.guard=b(!0),e=!1,a.checkForward(),e}return null}function k(a,b,c){return!1!==a.config.autoParagraph&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&(a.editable().equals(c)&&!b||b&&"true"==b.getAttribute("contenteditable"))}function g(a){return a.activeEnterMode!=CKEDITOR.ENTER_BR&&!1!==a.config.autoParagraph?
a.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p":!1}function h(a){a&&a.isEmptyInlineRemoveable()&&a.remove()}function m(a){var b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){b.fire("saveSnapshot")},0)}function e(a,b,c){var e=a.getCommonAncestor(b);for(b=a=c?b:a;(a=a.getParent())&&!e.equals(a)&&1==a.getChildCount();)b=a;b.remove()}var n,q,y,u,p,v,w,r,z,t;CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(a,b){this.base(b.$||b);this.editor=a;this.status=
"unloaded";this.hasFocus=!1;this.setup()},proto:{focus:function(){var a;if(CKEDITOR.env.webkit&&!this.hasFocus&&(a=this.editor._.previousActive||this.getDocument().getActive(),this.contains(a))){a.focus();return}CKEDITOR.env.edge&&14<CKEDITOR.env.version&&!this.hasFocus&&this.getDocument().equals(CKEDITOR.document)&&(this.editor._.previousScrollTop=this.$.scrollTop);try{if(!CKEDITOR.env.ie||CKEDITOR.env.edge&&14<CKEDITOR.env.version||!this.getDocument().equals(CKEDITOR.document))if(CKEDITOR.env.chrome){var b=
this.$.scrollTop;this.$.focus();this.$.scrollTop=b}else this.$.focus();else this.$.setActive()}catch(c){if(!CKEDITOR.env.ie)throw c;}CKEDITOR.env.safari&&!this.isInline()&&(a=CKEDITOR.document.getActive(),a.equals(this.getWindow().getFrame())||this.getWindow().focus())},on:function(a,b){var c=Array.prototype.slice.call(arguments,0);CKEDITOR.env.ie&&/^focus|blur$/.exec(a)&&(a="focus"==a?"focusin":"focusout",b=d(b,this),c[0]=a,c[1]=b);return CKEDITOR.dom.element.prototype.on.apply(this,c)},attachListener:function(a){!this._.listeners&&
(this._.listeners=[]);var b=Array.prototype.slice.call(arguments,1),b=a.on.apply(a,b);this._.listeners.push(b);return b},clearListeners:function(){var a=this._.listeners;try{for(;a.length;)a.pop().removeListener()}catch(b){}},restoreAttrs:function(){var a=this._.attrChanges,b,c;for(c in a)a.hasOwnProperty(c)&&(b=a[c],null!==b?this.setAttribute(c,b):this.removeAttribute(c))},attachClass:function(a){var b=this.getCustomData("classes");this.hasClass(a)||(!b&&(b=[]),b.push(a),this.setCustomData("classes",
b),this.addClass(a))},changeAttr:function(a,b){var c=this.getAttribute(a);b!==c&&(!this._.attrChanges&&(this._.attrChanges={}),a in this._.attrChanges||(this._.attrChanges[a]=c),this.setAttribute(a,b))},insertText:function(a){this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(a),"text")},transformPlainTextToHtml:function(a){var b=this.editor.getSelection().getStartElement().hasAscendant("pre",!0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(a,
b)},insertHtml:function(a,b,c){var e=this.editor;e.focus();e.fire("saveSnapshot");c||(c=e.getSelection().getRanges()[0]);v(this,b||"html",a,c);c.select();m(this);this.editor.fire("afterInsertHtml",{})},insertHtmlIntoRange:function(a,b,c){v(this,c||"html",a,b);this.editor.fire("afterInsertHtml",{intoRange:b})},insertElement:function(a,b){var e=this.editor;e.focus();e.fire("saveSnapshot");var d=e.activeEnterMode,e=e.getSelection(),g=a.getName(),g=CKEDITOR.dtd.$block[g];b||(b=e.getRanges()[0]);this.insertElementIntoRange(a,
b)&&(b.moveToPosition(a,CKEDITOR.POSITION_AFTER_END),g&&((g=a.getNext(function(a){return c(a)&&!u(a)}))&&g.type==CKEDITOR.NODE_ELEMENT&&g.is(CKEDITOR.dtd.$block)?g.getDtd()["#"]?b.moveToElementEditStart(g):b.moveToElementEditEnd(a):g||d==CKEDITOR.ENTER_BR||(g=b.fixBlock(!0,d==CKEDITOR.ENTER_DIV?"div":"p"),b.moveToElementEditStart(g))));e.selectRanges([b]);m(this)},insertElementIntoSelection:function(a){this.insertElement(a)},insertElementIntoRange:function(a,b){var c=this.editor,e=c.config.enterMode,
d=a.getName(),g=CKEDITOR.dtd.$block[d];if(b.checkReadOnly())return!1;b.deleteContents(1);b.startContainer.type==CKEDITOR.NODE_ELEMENT&&(b.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})?w(b):b.startContainer.is(CKEDITOR.dtd.$list)&&r(b));var f,m;if(g)for(;(f=b.getCommonAncestor(0,1))&&(m=CKEDITOR.dtd[f.getName()])&&(!m||!m[d]);)if(f.getName()in CKEDITOR.dtd.span){var g=b.splitElement(f),k=b.createBookmark();h(f);h(g);b.moveToBookmark(k)}else b.checkStartOfBlock()&&b.checkEndOfBlock()?(b.setStartBefore(f),
b.collapse(!0),f.remove()):b.splitBlock(e==CKEDITOR.ENTER_DIV?"div":"p",c.editable());b.insertNode(a);return!0},setData:function(a,b){b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();"unloaded"==this.status&&(this.status="ready");this.editor.fire("dataReady")},getData:function(a){var b=this.getHtml();a||(b=this.editor.dataProcessor.toDataFormat(b));return b},setReadOnly:function(a){this.setAttribute("contenteditable",!a)},detach:function(){this.removeClass("cke_editable");
this.status="detached";var a=this.editor;this._.detach();delete a.document;delete a.window},isInline:function(){return this.getDocument().equals(CKEDITOR.document)},fixInitialSelection:function(){function a(){var b=c.getDocument().$,e=b.getSelection(),d;a:if(e.anchorNode&&e.anchorNode==c.$)d=!0;else{if(CKEDITOR.env.webkit&&(d=c.getDocument().getActive())&&d.equals(c)&&!e.anchorNode){d=!0;break a}d=void 0}d&&(d=new CKEDITOR.dom.range(c),d.moveToElementEditStart(c),b=b.createRange(),b.setStart(d.startContainer.$,
d.startOffset),b.collapse(!0),e.removeAllRanges(),e.addRange(b))}function b(){var a=c.getDocument().$,e=a.selection,d=c.getDocument().getActive();"None"==e.type&&d.equals(c)&&(e=new CKEDITOR.dom.range(c),a=a.body.createTextRange(),e.moveToElementEditStart(c),e=e.startContainer,e.type!=CKEDITOR.NODE_ELEMENT&&(e=e.getParent()),a.moveToElementText(e.$),a.collapse(!0),a.select())}var c=this;if(CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.quirks))this.hasFocus&&(this.focus(),b());else if(this.hasFocus)this.focus(),
a();else this.once("focus",function(){a()},null,null,-999)},getHtmlFromRange:function(a){if(a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);a={doc:this.getDocument(),range:a.clone()};z.eol.detect(a,this);z.bogus.exclude(a);z.cell.shrink(a);a.fragment=a.range.cloneContents();z.tree.rebuild(a,this);z.eol.fix(a,this);return new CKEDITOR.dom.documentFragment(a.fragment.$)},extractHtmlFromRange:function(a,b){var c=t,e={range:a,doc:a.document},d=this.getHtmlFromRange(a);if(a.collapsed)return a.optimize(),
d;a.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.table.detectPurge(e);e.bookmark=a.createBookmark();delete e.range;var g=this.editor.createRange();g.moveToPosition(e.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START);e.targetBookmark=g.createBookmark();c.list.detectMerge(e,this);c.table.detectRanges(e,this);c.block.detectMerge(e,this);e.tableContentsRanges?(c.table.deleteRanges(e),a.moveToBookmark(e.bookmark),e.range=a):(a.moveToBookmark(e.bookmark),e.range=a,a.extractContents(c.detectExtractMerge(e)));a.moveToBookmark(e.targetBookmark);
a.optimize();c.fixUneditableRangePosition(a);c.list.merge(e,this);c.table.purge(e,this);c.block.merge(e,this);if(b){c=a.startPath();if(e=a.checkStartOfBlock()&&a.checkEndOfBlock()&&c.block&&!a.root.equals(c.block)){a:{var e=c.block.getElementsByTag("span"),g=0,f;if(e)for(;f=e.getItem(g++);)if(!q(f)){e=!0;break a}e=!1}e=!e}e&&(a.moveToPosition(c.block,CKEDITOR.POSITION_BEFORE_START),c.block.remove())}else c.autoParagraph(this.editor,a),y(a.startContainer)&&a.startContainer.appendBogus();a.startContainer.mergeSiblings();
return d},setup:function(){var a=this.editor;this.attachListener(a,"beforeGetData",function(){var b=this.getData();this.is("textarea")||!1!==a.config.ignoreEmptyParagraph&&(b=b.replace(p,function(a,b){return b}));a.setData(b,null,1)},this);this.attachListener(a,"getSnapshot",function(a){a.data=this.getData(1)},this);this.attachListener(a,"afterSetData",function(){this.setData(a.getData(1))},this);this.attachListener(a,"loadSnapshot",function(a){this.setData(a.data,1)},this);this.attachListener(a,
"beforeFocus",function(){var b=a.getSelection();(b=b&&b.getNative())&&"Control"==b.type||this.focus()},this);this.attachListener(a,"insertHtml",function(a){this.insertHtml(a.data.dataValue,a.data.mode,a.data.range)},this);this.attachListener(a,"insertElement",function(a){this.insertElement(a.data)},this);this.attachListener(a,"insertText",function(a){this.insertText(a.data)},this);this.setReadOnly(a.readOnly);this.attachClass("cke_editable");a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass("cke_editable_inline"):
a.elementMode!=CKEDITOR.ELEMENT_MODE_REPLACE&&a.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||this.attachClass("cke_editable_themed");this.attachClass("cke_contents_"+a.config.contentsLangDirection);a.keystrokeHandler.blockedKeystrokes[8]=+a.readOnly;a.keystrokeHandler.attach(this);this.on("blur",function(){this.hasFocus=!1},null,null,-1);this.on("focus",function(){this.hasFocus=!0},null,null,-1);if(CKEDITOR.env.webkit)this.on("scroll",function(){a._.previousScrollTop=a.editable().$.scrollTop},null,
null,-1);if(CKEDITOR.env.edge&&14<CKEDITOR.env.version){var d=function(){var b=a.editable();null!=a._.previousScrollTop&&b.getDocument().equals(CKEDITOR.document)&&(b.$.scrollTop=a._.previousScrollTop,a._.previousScrollTop=null,this.removeListener("scroll",d))};this.on("scroll",d)}a.focusManager.add(this);this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0,a.once("contentDom",function(){a.focusManager.focus(this)},this));this.isInline()&&this.changeAttr("tabindex",a.tabIndex);if(!this.is("textarea")){a.document=
this.getDocument();a.window=this.getWindow();var g=a.document;this.changeAttr("spellcheck",!a.config.disableNativeSpellChecker);var f=a.config.contentsLangDirection;this.getDirection(1)!=f&&this.changeAttr("dir",f);var h=CKEDITOR.getCss();if(h){var f=g.getHead(),m=f.getCustomData("stylesheet");m?h!=m.getText()&&(CKEDITOR.env.ie&&9>CKEDITOR.env.version?m.$.styleSheet.cssText=h:m.setText(h)):(h=g.appendStyleText(h),h=new CKEDITOR.dom.element(h.ownerNode||h.owningElement),f.setCustomData("stylesheet",
h),h.data("cke-temp",1))}f=g.getCustomData("stylesheet_ref")||0;g.setCustomData("stylesheet_ref",f+1);this.setCustomData("cke_includeReadonly",!a.config.disableReadonlyStyling);this.attachListener(this,"click",function(a){a=a.data;var b=(new CKEDITOR.dom.elementPath(a.getTarget(),this)).contains("a");b&&2!=a.$.button&&b.isReadOnly()&&a.preventDefault()});var k={8:1,46:1};this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey(),e;b=a.getSelection();if(0!==b.getRanges().length){if(c in
k){var d,g=b.getRanges()[0],f=g.startPath(),h,m,q,c=8==c;CKEDITOR.env.ie&&11>CKEDITOR.env.version&&(d=b.getSelectedElement())||(d=l(b))?(a.fire("saveSnapshot"),g.moveToPosition(d,CKEDITOR.POSITION_BEFORE_START),d.remove(),g.select(),a.fire("saveSnapshot"),e=1):g.collapsed&&((h=f.block)&&(q=h[c?"getPrevious":"getNext"](n))&&q.type==CKEDITOR.NODE_ELEMENT&&q.is("table")&&g[c?"checkStartOfBlock":"checkEndOfBlock"]()?(a.fire("saveSnapshot"),g[c?"checkEndOfBlock":"checkStartOfBlock"]()&&h.remove(),g["moveToElementEdit"+
(c?"End":"Start")](q),g.select(),a.fire("saveSnapshot"),e=1):f.blockLimit&&f.blockLimit.is("td")&&(m=f.blockLimit.getAscendant("table"))&&g.checkBoundaryOfElement(m,c?CKEDITOR.START:CKEDITOR.END)&&(q=m[c?"getPrevious":"getNext"](n))?(a.fire("saveSnapshot"),g["moveToElementEdit"+(c?"End":"Start")](q),g.checkStartOfBlock()&&g.checkEndOfBlock()?q.remove():g.select(),a.fire("saveSnapshot"),e=1):(m=f.contains(["td","th","caption"]))&&g.checkBoundaryOfElement(m,c?CKEDITOR.START:CKEDITOR.END)&&(e=1))}return!e}});
a.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&this.attachListener(this,"keyup",function(b){b.data.getKeystroke()in k&&!this.getFirst(c)&&(this.appendBogus(),b=a.createRange(),b.moveToPosition(this,CKEDITOR.POSITION_AFTER_START),b.select())});this.attachListener(this,"dblclick",function(b){if(a.readOnly)return!1;b={element:b.data.getTarget()};a.fire("doubleclick",b)});CKEDITOR.env.ie&&this.attachListener(this,"click",b);CKEDITOR.env.ie&&!CKEDITOR.env.edge||this.attachListener(this,"mousedown",
function(b){var c=b.data.getTarget();c.is("img","hr","input","textarea","select")&&!c.isReadOnly()&&(a.getSelection().selectElement(c),c.is("input","textarea","select")&&b.data.preventDefault())});CKEDITOR.env.edge&&this.attachListener(this,"mouseup",function(b){(b=b.data.getTarget())&&b.is("img")&&!b.isReadOnly()&&a.getSelection().selectElement(b)});CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(b){if(2==b.data.$.button&&(b=b.data.getTarget(),!b.getAscendant("table")&&!b.getOuterHtml().replace(p,
""))){var c=a.createRange();c.moveToElementEditStart(b);c.select(!0)}});CKEDITOR.env.webkit&&(this.attachListener(this,"click",function(a){a.data.getTarget().is("input","select")&&a.data.preventDefault()}),this.attachListener(this,"mouseup",function(a){a.data.getTarget().is("input","textarea")&&a.data.preventDefault()}));CKEDITOR.env.webkit&&this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey();if(c in k&&(b=a.getSelection(),0!==b.getRanges().length)){var c=
8==c,d=b.getRanges()[0];b=d.startPath();if(d.collapsed)a:{var g=b.block;if(g&&d[c?"checkStartOfBlock":"checkEndOfBlock"]()&&d.moveToClosestEditablePosition(g,!c)&&d.collapsed){if(d.startContainer.type==CKEDITOR.NODE_ELEMENT){var f=d.startContainer.getChild(d.startOffset-(c?1:0));if(f&&f.type==CKEDITOR.NODE_ELEMENT&&f.is("hr")){a.fire("saveSnapshot");f.remove();b=!0;break a}}d=d.startPath().block;if(!d||d&&d.contains(g))b=void 0;else{a.fire("saveSnapshot");var h;(h=(c?d:g).getBogus())&&h.remove();
h=a.getSelection();f=h.createBookmarks();(c?g:d).moveChildren(c?d:g,!1);b.lastElement.mergeSiblings();e(g,d,!c);h.selectBookmarks(f);b=!0}}else b=!1}else c=d,h=b.block,d=c.endPath().block,h&&d&&!h.equals(d)?(a.fire("saveSnapshot"),(g=h.getBogus())&&g.remove(),c.enlarge(CKEDITOR.ENLARGE_INLINE),c.deleteContents(),d.getParent()&&(d.moveChildren(h,!1),b.lastElement.mergeSiblings(),e(h,d,!0)),c=a.getSelection().getRanges()[0],c.collapse(1),c.optimize(),""===c.startContainer.getHtml()&&c.startContainer.appendBogus(),
c.select(),b=!0):b=!1;if(!b)return;a.getSelection().scrollIntoView();a.fire("saveSnapshot");return!1}},this,null,100)}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var a;if(a=this.removeCustomData("classes"))for(;a.length;)this.removeClass(a.pop());if(!this.is("textarea")){a=this.getDocument();var b=a.getHead();if(b.getCustomData("stylesheet")){var c=a.getCustomData("stylesheet_ref");--c?a.setCustomData("stylesheet_ref",c):(a.removeCustomData("stylesheet_ref"),
b.removeCustomData("stylesheet").remove())}}this.editor.fire("contentDomUnload");delete this.editor}}});CKEDITOR.editor.prototype.editable=function(a){var b=this._.editable;if(b&&a)return 0;arguments.length&&(b=this._.editable=a?a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this,a):(b&&b.detach(),null));return b};CKEDITOR.on("instanceLoaded",function(b){var c=b.editor;c.on("insertElement",function(a){a=a.data;a.type==CKEDITOR.NODE_ELEMENT&&(a.is("input")||a.is("textarea"))&&("false"!=a.getAttribute("contentEditable")&&
a.data("cke-editable",a.hasAttribute("contenteditable")?"true":"1"),a.setAttribute("contentEditable",!1))});c.on("selectionChange",function(b){if(!c.readOnly){var e=c.getSelection();e&&!e.isLocked&&(e=c.checkDirty(),c.fire("lockSnapshot"),a(b),c.fire("unlockSnapshot"),!e&&c.resetDirty())}})});CKEDITOR.on("instanceCreated",function(a){var b=a.editor;b.on("mode",function(){var a=b.editable();if(a&&a.isInline()){var c=b.title;a.changeAttr("role","textbox");a.changeAttr("aria-multiline","true");a.changeAttr("aria-label",
c);c&&a.changeAttr("title",c);var e=b.fire("ariaEditorHelpLabel",{}).label;if(e&&(c=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents"))){var d=CKEDITOR.tools.getNextId(),e=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+d+'" class\x3d"cke_voice_label"\x3e'+e+"\x3c/span\x3e");c.append(e);a.changeAttr("aria-describedby",d)}}})});CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");n=CKEDITOR.dom.walker.whitespaces(!0);
q=CKEDITOR.dom.walker.bookmark(!1,!0);y=CKEDITOR.dom.walker.empty();u=CKEDITOR.dom.walker.bogus();p=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;v=function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT}function b(c,e){var d,g,f,h,m=[],k=e.range.startContainer;d=e.range.startPath();for(var k=n[k.getName()],l=0,q=c.getChildren(),G=q.count(),v=-1,r=-1,F=0,t=d.contains(n.$list);l<G;++l)d=q.getItem(l),a(d)?(f=
d.getName(),t&&f in CKEDITOR.dtd.$list?m=m.concat(b(d,e)):(h=!!k[f],"br"!=f||!d.data("cke-eol")||l&&l!=G-1||(F=(g=l?m[l-1].node:q.getItem(l+1))&&(!a(g)||!g.is("br")),g=g&&a(g)&&n.$block[g.getName()]),-1!=v||h||(v=l),h||(r=l),m.push({isElement:1,isLineBreak:F,isBlock:d.isBlockBoundary(),hasBlockSibling:g,node:d,name:f,allowed:h}),g=F=0)):m.push({isElement:0,node:d,allowed:1});-1<v&&(m[v].firstNotAllowed=1);-1<r&&(m[r].lastNotAllowed=1);return m}function e(b,c){var d=[],g=b.getChildren(),f=g.count(),
h,m=0,k=n[c],l=!b.is(n.$inline)||b.is("br");for(l&&d.push(" ");m<f;m++)h=g.getItem(m),a(h)&&!h.is(k)?d=d.concat(e(h,c)):d.push(h);l&&d.push(" ");return d}function d(b){return a(b.startContainer)&&b.startContainer.getChild(b.startOffset-1)}function f(b){return b&&a(b)&&(b.is(n.$removeEmpty)||b.is("a")&&!b.isBlockBoundary())}function m(b,c,e,d){var g=b.clone(),f,h;g.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);(f=(new CKEDITOR.dom.walker(g)).next())&&a(f)&&q[f.getName()]&&(h=f.getPrevious())&&a(h)&&!h.getParent().equals(b.startContainer)&&
e.contains(h)&&d.contains(f)&&f.isIdentical(h)&&(f.moveChildren(h),f.remove(),m(b,c,e,d))}function l(b,c){function e(b,c){if(c.isBlock&&c.isElement&&!c.node.is("br")&&a(b)&&b.is("br"))return b.remove(),1}var d=c.endContainer.getChild(c.endOffset),g=c.endContainer.getChild(c.endOffset-1);d&&e(d,b[b.length-1]);g&&e(g,b[0])&&(c.setEnd(c.endContainer,c.endOffset-1),c.collapse())}var n=CKEDITOR.dtd,q={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},v={p:1,div:1,h1:1,h2:1,
h3:1,h4:1,h5:1,h6:1},G=CKEDITOR.tools.extend({},n.$inline);delete G.br;return function(D,q,r,t){var w=D.editor,z=!1;"unfiltered_html"==q&&(q="html",z=!0);if(!t.checkReadOnly()){var y=(new CKEDITOR.dom.elementPath(t.startContainer,t.root)).blockLimit||t.root;q={type:q,dontFilter:z,editable:D,editor:w,range:t,blockLimit:y,mergeCandidates:[],zombies:[]};var z=q.range,y=q.mergeCandidates,u="html"===q.type,p,E,U,ba,ca,V;"text"==q.type&&z.shrink(CKEDITOR.SHRINK_ELEMENT,!0,!1)&&(E=CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",
z.document),z.insertNode(E),z.setStartAfter(E));U=new CKEDITOR.dom.elementPath(z.startContainer);q.endPath=ba=new CKEDITOR.dom.elementPath(z.endContainer);if(!z.collapsed){p=ba.block||ba.blockLimit;var M=z.getCommonAncestor();p&&!p.equals(M)&&!p.contains(M)&&z.checkEndOfBlock()&&q.zombies.push(p);z.deleteContents()}for(;(ca=d(z))&&a(ca)&&ca.isBlockBoundary()&&U.contains(ca);)z.moveToPosition(ca,CKEDITOR.POSITION_BEFORE_END);m(z,q.blockLimit,U,ba);E&&(z.setEndBefore(E),z.collapse(),E.remove());E=z.startPath();
if(p=E.contains(f,!1,1))V=z.splitElement(p),q.inlineStylesRoot=p,q.inlineStylesPeak=E.lastElement;E=z.createBookmark();u&&(h(p),h(V));(p=E.startNode.getPrevious(c))&&a(p)&&f(p)&&y.push(p);(p=E.startNode.getNext(c))&&a(p)&&f(p)&&y.push(p);for(p=E.startNode;(p=p.getParent())&&f(p);)y.push(p);z.moveToBookmark(E);""===w.getData()&&w.enterMode===CKEDITOR.ENTER_DIV&&((w=D.getFirst())&&w.remove(),t.setStartAt(D,CKEDITOR.POSITION_AFTER_START),t.collapse(!0));if(D=r){D=q.range;if("text"==q.type&&q.inlineStylesRoot){t=
q.inlineStylesPeak;w=t.getDocument().createText("{cke-peak}");for(V=q.inlineStylesRoot.getParent();!t.equals(V);)w=w.appendTo(t.clone()),t=t.getParent();r=w.getOuterHtml().split("{cke-peak}").join(r)}t=q.blockLimit.getName();if(/^\s+|\s+$/.test(r)&&"span"in CKEDITOR.dtd[t]){var aa='\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';r=aa+r+aa}r=q.editor.dataProcessor.toHtml(r,{context:null,fixForBody:!1,protectedWhitespaces:!!aa,dontFilter:q.dontFilter,filter:q.editor.activeFilter,enterMode:q.editor.activeEnterMode});
t=D.document.createElement("body");t.setHtml(r);aa&&(t.getFirst().remove(),t.getLast().remove());if((aa=D.startPath().block)&&(1!=aa.getChildCount()||!aa.getBogus()))a:{var P;if(1==t.getChildCount()&&a(P=t.getFirst())&&P.is(v)&&!P.hasAttribute("contenteditable")){aa=P.getElementsByTag("*");D=0;for(V=aa.count();D<V;D++)if(w=aa.getItem(D),!w.is(G))break a;P.moveChildren(P.getParent(1));P.remove()}}q.dataWrapper=t;D=r}if(D){P=q.range;D=P.document;t=q.blockLimit;V=0;var S,aa=[],T,Y;r=E=0;var da,w=P.startContainer;
ca=q.endPath.elements[0];var ga,z=ca.getPosition(w),y=!!ca.getCommonAncestor(w)&&z!=CKEDITOR.POSITION_IDENTICAL&&!(z&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED),w=b(q.dataWrapper,q);for(l(w,P);V<w.length;V++){z=w[V];if(u=z.isLineBreak)u=P,p=t,ba=U=void 0,z.hasBlockSibling?u=1:(U=u.startContainer.getAscendant(n.$block,1))&&U.is({div:1,p:1})?(ba=U.getPosition(p),ba==CKEDITOR.POSITION_IDENTICAL||ba==CKEDITOR.POSITION_CONTAINS?u=0:(p=u.splitElement(U),u.moveToPosition(p,CKEDITOR.POSITION_AFTER_START),
u=1)):u=0;if(u)r=0<V;else{u=P.startPath();!z.isBlock&&k(q.editor,u.block,u.blockLimit)&&(Y=g(q.editor))&&(Y=D.createElement(Y),Y.appendBogus(),P.insertNode(Y),CKEDITOR.env.needsBrFiller&&(S=Y.getBogus())&&S.remove(),P.moveToPosition(Y,CKEDITOR.POSITION_BEFORE_END));if((u=P.startPath().block)&&!u.equals(T)){if(S=u.getBogus())S.remove(),aa.push(u);T=u}z.firstNotAllowed&&(E=1);if(E&&z.isElement){u=P.startContainer;for(p=null;u&&!n[u.getName()][z.name];){if(u.equals(t)){u=null;break}p=u;u=u.getParent()}if(u)p&&
(da=P.splitElement(p),q.zombies.push(da),q.zombies.push(p));else{p=t.getName();ga=!V;u=V==w.length-1;p=e(z.node,p);U=[];ba=p.length;for(var M=0,ia=void 0,ea=0,ja=-1;M<ba;M++)ia=p[M]," "==ia?(ea||ga&&!M||(U.push(new CKEDITOR.dom.text(" ")),ja=U.length),ea=1):(U.push(ia),ea=0);u&&ja==U.length&&U.pop();ga=U}}if(ga){for(;u=ga.pop();)P.insertNode(u);ga=0}else P.insertNode(z.node);z.lastNotAllowed&&V<w.length-1&&((da=y?ca:da)&&P.setEndAt(da,CKEDITOR.POSITION_AFTER_START),E=0);P.collapse()}}1!=w.length?
S=!1:(S=w[0],S=S.isElement&&"false"==S.node.getAttribute("contenteditable"));S&&(r=!0,u=w[0].node,P.setStartAt(u,CKEDITOR.POSITION_BEFORE_START),P.setEndAt(u,CKEDITOR.POSITION_AFTER_END));q.dontMoveCaret=r;q.bogusNeededBlocks=aa}S=q.range;var fa;da=q.bogusNeededBlocks;for(ga=S.createBookmark();T=q.zombies.pop();)T.getParent()&&(Y=S.clone(),Y.moveToElementEditStart(T),Y.removeEmptyBlocksAtEnd());if(da)for(;T=da.pop();)CKEDITOR.env.needsBrFiller?T.appendBogus():T.append(S.document.createText(" "));
for(;T=q.mergeCandidates.pop();)T.mergeSiblings();S.moveToBookmark(ga);if(!q.dontMoveCaret){for(T=d(S);T&&a(T)&&!T.is(n.$empty);){if(T.isBlockBoundary())S.moveToPosition(T,CKEDITOR.POSITION_BEFORE_END);else{if(f(T)&&T.getHtml().match(/(\s|&nbsp;)$/g)){fa=null;break}fa=S.clone();fa.moveToPosition(T,CKEDITOR.POSITION_BEFORE_END)}T=T.getLast(c)}fa&&S.moveToRange(fa)}}}}();w=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)};
b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT};return b}function b(a,c,e){c=a.getDocument().createElement(c);a.append(c,e);return c}function c(a){var b=a.count(),e;for(b;0<b--;)e=a.getItem(b),CKEDITOR.tools.trim(e.getHtml())||(e.appendBogus(),CKEDITOR.env.ie&&9>CKEDITOR.env.version&&e.getChildCount()&&e.getFirst().remove())}return function(e){var d=e.startContainer,g=d.getAscendant("table",1),f=!1;c(g.getElementsByTag("td"));c(g.getElementsByTag("th"));g=e.clone();g.setStart(d,0);g=
a(g).lastBackward();g||(g=e.clone(),g.setEndAt(d,CKEDITOR.POSITION_BEFORE_END),g=a(g).lastForward(),f=!0);g||(g=d);g.is("table")?(e.setStartAt(g,CKEDITOR.POSITION_BEFORE_START),e.collapse(!0),g.remove()):(g.is({tbody:1,thead:1,tfoot:1})&&(g=b(g,"tr",f)),g.is("tr")&&(g=b(g,g.getParent().is("thead")?"th":"td",f)),(d=g.getBogus())&&d.remove(),e.moveToPosition(g,f?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END))}}();r=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,
b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$list)||a.is(CKEDITOR.dtd.$listItem)};b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$listItem)};return b}return function(b){var c=b.startContainer,e=!1,d;d=b.clone();d.setStart(c,0);d=a(d).lastBackward();d||(d=b.clone(),d.setEndAt(c,CKEDITOR.POSITION_BEFORE_END),d=a(d).lastForward(),e=!0);d||(d=c);d.is(CKEDITOR.dtd.$list)?(b.setStartAt(d,CKEDITOR.POSITION_BEFORE_START),b.collapse(!0),d.remove()):
((c=d.getBogus())&&c.remove(),b.moveToPosition(d,e?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END),b.select())}}();z={eol:{detect:function(a,b){var c=a.range,e=c.clone(),d=c.clone(),g=new CKEDITOR.dom.elementPath(c.startContainer,b),f=new CKEDITOR.dom.elementPath(c.endContainer,b);e.collapse(1);d.collapse();g.block&&e.checkBoundaryOfElement(g.block,CKEDITOR.END)&&(c.setStartAfter(g.block),a.prependEolBr=1);f.block&&d.checkBoundaryOfElement(f.block,CKEDITOR.START)&&(c.setEndBefore(f.block),
a.appendEolBr=1)},fix:function(a,b){var c=b.getDocument(),e;a.appendEolBr&&(e=this.createEolBr(c),a.fragment.append(e));!a.prependEolBr||e&&!e.getPrevious()||a.fragment.append(this.createEolBr(c),1)},createEolBr:function(a){return a.createElement("br",{attributes:{"data-cke-eol":1}})}},bogus:{exclude:function(a){var b=a.range.getBoundaryNodes(),c=b.startNode,b=b.endNode;!b||!u(b)||c&&c.equals(b)||a.range.setEndBefore(b)}},tree:{rebuild:function(a,b){var c=a.range,e=c.getCommonAncestor(),d=new CKEDITOR.dom.elementPath(e,
b),g=new CKEDITOR.dom.elementPath(c.startContainer,b),c=new CKEDITOR.dom.elementPath(c.endContainer,b),f;e.type==CKEDITOR.NODE_TEXT&&(e=e.getParent());if(d.blockLimit.is({tr:1,table:1})){var h=d.contains("table").getParent();f=function(a){return!a.equals(h)}}else if(d.block&&d.block.is(CKEDITOR.dtd.$listItem)&&(g=g.contains(CKEDITOR.dtd.$list),c=c.contains(CKEDITOR.dtd.$list),!g.equals(c))){var m=d.contains(CKEDITOR.dtd.$list).getParent();f=function(a){return!a.equals(m)}}f||(f=function(a){return!a.equals(d.block)&&
!a.equals(d.blockLimit)});this.rebuildFragment(a,b,e,f)},rebuildFragment:function(a,b,c,e){for(var d;c&&!c.equals(b)&&e(c);)d=c.clone(0,1),a.fragment.appendTo(d),a.fragment=d,c=c.getParent()}},cell:{shrink:function(a){a=a.range;var b=a.startContainer,c=a.endContainer,e=a.startOffset,d=a.endOffset;b.type==CKEDITOR.NODE_ELEMENT&&b.equals(c)&&b.is("tr")&&++e==d&&a.shrink(CKEDITOR.SHRINK_TEXT)}}};t=function(){function a(b,c){var e=b.getParent();if(e.is(CKEDITOR.dtd.$inline))b[c?"insertBefore":"insertAfter"](e)}
function b(c,e,d){a(e);a(d,1);for(var g;g=d.getNext();)g.insertAfter(e),e=g;y(c)&&c.remove()}function c(a,b){var e=new CKEDITOR.dom.range(a);e.setStartAfter(b.startNode);e.setEndBefore(b.endNode);return e}return{list:{detectMerge:function(a,b){var e=c(b,a.bookmark),d=e.startPath(),g=e.endPath(),f=d.contains(CKEDITOR.dtd.$list),h=g.contains(CKEDITOR.dtd.$list);a.mergeList=f&&h&&f.getParent().equals(h.getParent())&&!f.equals(h);a.mergeListItems=d.block&&g.block&&d.block.is(CKEDITOR.dtd.$listItem)&&
g.block.is(CKEDITOR.dtd.$listItem);if(a.mergeList||a.mergeListItems)e=e.clone(),e.setStartBefore(a.bookmark.startNode),e.setEndAfter(a.bookmark.endNode),a.mergeListBookmark=e.createBookmark()},merge:function(a,c){if(a.mergeListBookmark){var e=a.mergeListBookmark.startNode,d=a.mergeListBookmark.endNode,g=new CKEDITOR.dom.elementPath(e,c),f=new CKEDITOR.dom.elementPath(d,c);if(a.mergeList){var h=g.contains(CKEDITOR.dtd.$list),m=f.contains(CKEDITOR.dtd.$list);h.equals(m)||(m.moveChildren(h),m.remove())}a.mergeListItems&&
(g=g.contains(CKEDITOR.dtd.$listItem),f=f.contains(CKEDITOR.dtd.$listItem),g.equals(f)||b(f,e,d));e.remove();d.remove()}}},block:{detectMerge:function(a,b){if(!a.tableContentsRanges&&!a.mergeListBookmark){var c=new CKEDITOR.dom.range(b);c.setStartBefore(a.bookmark.startNode);c.setEndAfter(a.bookmark.endNode);a.mergeBlockBookmark=c.createBookmark()}},merge:function(a,c){if(a.mergeBlockBookmark&&!a.purgeTableBookmark){var e=a.mergeBlockBookmark.startNode,d=a.mergeBlockBookmark.endNode,g=new CKEDITOR.dom.elementPath(e,
c),f=new CKEDITOR.dom.elementPath(d,c),g=g.block,f=f.block;g&&f&&!g.equals(f)&&b(f,e,d);e.remove();d.remove()}}},table:function(){function a(c){var d=[],g,f=new CKEDITOR.dom.walker(c),h=c.startPath().contains(e),m=c.endPath().contains(e),k={};f.guard=function(a,f){if(a.type==CKEDITOR.NODE_ELEMENT){var l="visited_"+(f?"out":"in");if(a.getCustomData(l))return;CKEDITOR.dom.element.setMarker(k,a,l,1)}if(f&&h&&a.equals(h))g=c.clone(),g.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),d.push(g);else if(!f&&m&&
a.equals(m))g=c.clone(),g.setStartAt(m,CKEDITOR.POSITION_AFTER_START),d.push(g);else{if(l=!f)l=a.type==CKEDITOR.NODE_ELEMENT&&a.is(e)&&(!h||b(a,h))&&(!m||b(a,m));if(!l&&(l=f))if(a.is(e))var l=h&&h.getAscendant("table",!0),n=m&&m.getAscendant("table",!0),q=a.getAscendant("table",!0),l=l&&l.contains(q)||n&&n.contains(q);else l=void 0;l&&(g=c.clone(),g.selectNodeContents(a),d.push(g))}};f.lastForward();CKEDITOR.dom.element.clearAllMarkers(k);return d}function b(a,c){var e=CKEDITOR.POSITION_CONTAINS+
CKEDITOR.POSITION_IS_CONTAINED,d=a.getPosition(c);return d===CKEDITOR.POSITION_IDENTICAL?!1:0===(d&e)}var e={td:1,th:1,caption:1};return{detectPurge:function(a){var b=a.range,c=b.clone();c.enlarge(CKEDITOR.ENLARGE_ELEMENT);var c=new CKEDITOR.dom.walker(c),d=0;c.evaluator=function(a){a.type==CKEDITOR.NODE_ELEMENT&&a.is(e)&&++d};c.checkForward();if(1<d){var c=b.startPath().contains("table"),g=b.endPath().contains("table");c&&g&&b.checkBoundaryOfElement(c,CKEDITOR.START)&&b.checkBoundaryOfElement(g,
CKEDITOR.END)&&(b=a.range.clone(),b.setStartBefore(c),b.setEndAfter(g),a.purgeTableBookmark=b.createBookmark())}},detectRanges:function(d,g){var f=c(g,d.bookmark),h=f.clone(),m,k,l=f.getCommonAncestor();l.is(CKEDITOR.dtd.$tableContent)&&!l.is(e)&&(l=l.getAscendant("table",!0));k=l;l=new CKEDITOR.dom.elementPath(f.startContainer,k);k=new CKEDITOR.dom.elementPath(f.endContainer,k);l=l.contains("table");k=k.contains("table");if(l||k)l&&k&&b(l,k)?(d.tableSurroundingRange=h,h.setStartAt(l,CKEDITOR.POSITION_AFTER_END),
h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),h=f.clone(),h.setEndAt(l,CKEDITOR.POSITION_AFTER_END),m=f.clone(),m.setStartAt(k,CKEDITOR.POSITION_BEFORE_START),m=a(h).concat(a(m))):l?k||(d.tableSurroundingRange=h,h.setStartAt(l,CKEDITOR.POSITION_AFTER_END),f.setEndAt(l,CKEDITOR.POSITION_AFTER_END)):(d.tableSurroundingRange=h,h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),f.setStartAt(k,CKEDITOR.POSITION_AFTER_START)),d.tableContentsRanges=m?m:a(f)},deleteRanges:function(a){for(var b;b=a.tableContentsRanges.pop();)b.extractContents(),
y(b.startContainer)&&b.startContainer.appendBogus();a.tableSurroundingRange&&a.tableSurroundingRange.extractContents()},purge:function(a){if(a.purgeTableBookmark){var b=a.doc,c=a.range.clone(),b=b.createElement("p");b.insertBefore(a.purgeTableBookmark.startNode);c.moveToBookmark(a.purgeTableBookmark);c.deleteContents();a.range.moveToPosition(b,CKEDITOR.POSITION_AFTER_START)}}}}(),detectExtractMerge:function(a){return!(a.range.startPath().contains(CKEDITOR.dtd.$listItem)&&a.range.endPath().contains(CKEDITOR.dtd.$listItem))},
fixUneditableRangePosition:function(a){a.startContainer.getDtd()["#"]||a.moveToClosestEditablePosition(null,!0)},autoParagraph:function(a,b){var c=b.startPath(),e;k(a,c.block,c.blockLimit)&&(e=g(a))&&(e=b.document.createElement(e),e.appendBogus(),b.insertNode(e),b.moveToPosition(e,CKEDITOR.POSITION_AFTER_START))}}}()}(),function(){function a(a){return CKEDITOR.plugins.widget&&CKEDITOR.plugins.widget.isDomWidget(a)}function f(b,c){if(0===b.length||a(b[0].getEnclosedNode()))return!1;var e,d;if((e=!c&&
1===b.length)&&!(e=b[0].collapsed)){var g=b[0];e=g.startContainer.getAscendant({td:1,th:1},!0);var f=g.endContainer.getAscendant({td:1,th:1},!0);d=CKEDITOR.tools.trim;e&&e.equals(f)&&!e.findOne("td, th, tr, tbody, table")?(g=g.cloneContents(),e=g.getFirst()?d(g.getFirst().getText())!==d(e.getText()):!0):e=!1}if(e)return!1;for(d=0;d<b.length;d++)if(e=b[d]._getTableElement(),!e)return!1;return!0}function b(a){function b(a){a=a.find("td, th");var c=[],e;for(e=0;e<a.count();e++)c.push(a.getItem(e));return c}
var c=[],e,d;for(d=0;d<a.length;d++)e=a[d]._getTableElement(),e.is&&e.is({td:1,th:1})?c.push(e):c=c.concat(b(e));return c}function c(a){a=b(a);var c="",e=[],d,g;for(g=0;g<a.length;g++)d&&!d.equals(a[g].getAscendant("tr"))?(c+=e.join("\t")+"\n",d=a[g].getAscendant("tr"),e=[]):0===g&&(d=a[g].getAscendant("tr")),e.push(a[g].getText());return c+=e.join("\t")}function d(a){var b=this.root.editor,e=b.getSelection(1);this.reset();t=!0;e.root.once("selectionchange",function(a){a.cancel()},null,null,0);e.selectRanges([a[0]]);
e=this._.cache;e.ranges=new CKEDITOR.dom.rangeList(a);e.type=CKEDITOR.SELECTION_TEXT;e.selectedElement=a[0]._getTableElement();e.selectedText=c(a);e.nativeSel=null;this.isFake=1;this.rev=w++;b._.fakeSelection=this;t=!1;this.root.fire("selectionchange")}function l(){var b=this._.fakeSelection,c;if(b){c=this.getSelection(1);var e;if(!(e=!c)&&(e=!c.isHidden())){e=b;var d=c.getRanges(),g=e.getRanges(),h=d.length&&d[0]._getTableElement()&&d[0]._getTableElement().getAscendant("table",!0),m=g.length&&g[0]._getTableElement()&&
g[0]._getTableElement().getAscendant("table",!0),k=1===d.length&&d[0]._getTableElement()&&d[0]._getTableElement().is("table"),l=1===g.length&&g[0]._getTableElement()&&g[0]._getTableElement().is("table");if(a(e.getSelectedElement()))e=!1;else{var n=1===d.length&&d[0].collapsed,g=f(d,!!CKEDITOR.env.webkit)&&f(g);h=h&&m?h.equals(m)||m.contains(h):!1;h&&(n||g)?(k&&!l&&e.selectRanges(d),e=!0):e=!1}e=!e}e&&(b.reset(),b=0)}if(!b&&(b=c||this.getSelection(1),!b||b.getType()==CKEDITOR.SELECTION_NONE))return;
this.fire("selectionCheck",b);c=this.elementPath();c.compare(this._.selectionPreviousPath)||(e=this._.selectionPreviousPath&&this._.selectionPreviousPath.blockLimit.equals(c.blockLimit),!CKEDITOR.env.webkit&&!CKEDITOR.env.gecko||e||(this._.previousActive=this.document.getActive()),this._.selectionPreviousPath=c,this.fire("selectionChange",{selection:b,path:c}))}function k(){A=!0;x||(g.call(this),x=CKEDITOR.tools.setTimeout(g,200,this))}function g(){x=null;A&&(CKEDITOR.tools.setTimeout(l,0,this),A=
!1)}function h(a){return B(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?!0:!1}function m(a){function b(c,e){return c&&c.type!=CKEDITOR.NODE_TEXT?a.clone()["moveToElementEdit"+(e?"End":"Start")](c):!1}if(!(a.root instanceof CKEDITOR.editable))return!1;var c=a.startContainer,e=a.getPreviousNode(h,null,c),d=a.getNextNode(h,null,c);return b(e)||b(d,1)||!(e||d||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary()&&c.getBogus())?!0:!1}function e(a){n(a,!1);var b=a.getDocument().createText(r);
a.setCustomData("cke-fillingChar",b);return b}function n(a,b){var c=a&&a.removeCustomData("cke-fillingChar");if(c){if(!1!==b){var e=a.getDocument().getSelection().getNative(),d=e&&"None"!=e.type&&e.getRangeAt(0),g=r.length;if(c.getLength()>g&&d&&d.intersectsNode(c.$)){var f=[{node:e.anchorNode,offset:e.anchorOffset},{node:e.focusNode,offset:e.focusOffset}];e.anchorNode==c.$&&e.anchorOffset>g&&(f[0].offset-=g);e.focusNode==c.$&&e.focusOffset>g&&(f[1].offset-=g)}}c.setText(q(c.getText(),1));f&&(c=a.getDocument().$,
e=c.getSelection(),c=c.createRange(),c.setStart(f[0].node,f[0].offset),c.collapse(!0),e.removeAllRanges(),e.addRange(c),e.extend(f[1].node,f[1].offset))}}function q(a,b){return b?a.replace(z,function(a,b){return b?" ":""}):a.replace(r,"")}function y(a,b){var c=b&&CKEDITOR.tools.htmlEncode(b)||"\x26nbsp;",c=CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"'+(CKEDITOR.env.ie&&14>CKEDITOR.env.version?"display:none":"position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;")+
'"\x3e'+c+"\x3c/div\x3e",a.document);a.fire("lockSnapshot");a.editable().append(c);var e=a.getSelection(1),d=a.createRange(),g=e.root.on("selectionchange",function(a){a.cancel()},null,null,0);d.setStartAt(c,CKEDITOR.POSITION_AFTER_START);d.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);e.selectRanges([d]);g.removeListener();a.fire("unlockSnapshot");a._.hiddenSelectionContainer=c}function u(a){var b={37:1,39:1,8:1,46:1};return function(c){var e=c.data.getKeystroke();if(b[e]){var d=a.getSelection().getRanges(),
g=d[0];1==d.length&&g.collapsed&&(e=g[38>e?"getPreviousEditableNode":"getNextEditableNode"]())&&e.type==CKEDITOR.NODE_ELEMENT&&"false"==e.getAttribute("contenteditable")&&(a.getSelection().fake(e),c.data.preventDefault(),c.cancel())}}}function p(a){for(var b=0;b<a.length;b++){var c=a[b];c.getCommonAncestor().isReadOnly()&&a.splice(b,1);if(!c.collapsed){if(c.startContainer.isReadOnly())for(var e=c.startContainer,d;e&&!((d=e.type==CKEDITOR.NODE_ELEMENT)&&e.is("body")||!e.isReadOnly());)d&&"false"==
e.getAttribute("contentEditable")&&c.setStartAfter(e),e=e.getParent();e=c.startContainer;d=c.endContainer;var g=c.startOffset,f=c.endOffset,h=c.clone();e&&e.type==CKEDITOR.NODE_TEXT&&(g>=e.getLength()?h.setStartAfter(e):h.setStartBefore(e));d&&d.type==CKEDITOR.NODE_TEXT&&(f?h.setEndAfter(d):h.setEndBefore(d));e=new CKEDITOR.dom.walker(h);e.evaluator=function(e){if(e.type==CKEDITOR.NODE_ELEMENT&&e.isReadOnly()){var d=c.clone();c.setEndBefore(e);c.collapsed&&a.splice(b--,1);e.getPosition(h.endContainer)&
CKEDITOR.POSITION_CONTAINS||(d.setStartAfter(e),d.collapsed||a.splice(b+1,0,d));return!0}return!1};e.next()}}return a}var v="function"!=typeof window.getSelection,w=1,r=CKEDITOR.tools.repeat("​",7),z=new RegExp(r+"( )?","g"),t,x,A,B=CKEDITOR.dom.walker.invisible(1),C=function(){function a(b){return function(a){var c=a.editor.createRange();c.moveToClosestEditablePosition(a.selected,b)&&a.editor.getSelection().selectRanges([c]);return!1}}function b(a){return function(b){var c=b.editor,e=c.createRange(),
d;if(!c.readOnly)return(d=e.moveToClosestEditablePosition(b.selected,a))||(d=e.moveToClosestEditablePosition(b.selected,!a)),d&&c.getSelection().selectRanges([e]),c.fire("saveSnapshot"),b.selected.remove(),d||(e.moveToElementEditablePosition(c.editable()),c.getSelection().selectRanges([e])),c.fire("saveSnapshot"),!1}}var c=a(),e=a(1);return{37:c,38:c,39:e,40:e,8:b(),46:b(1)}}();CKEDITOR.on("instanceCreated",function(a){function b(){var a=c.getSelection();a&&a.removeAllRanges()}var c=a.editor;c.on("contentDom",
function(){function a(){t=new CKEDITOR.dom.selection(c.getSelection());t.lock()}function b(){g.removeListener("mouseup",b);m.removeListener("mouseup",b);var a=CKEDITOR.document.$.selection,c=a.createRange();"None"!=a.type&&c.parentElement()&&c.parentElement().ownerDocument==d.$&&c.select()}function e(a){a=a.getRanges()[0];return a?(a=a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")},!0))&&"false"===a.getAttribute("contenteditable")?
a:null:null}var d=c.document,g=CKEDITOR.document,f=c.editable(),h=d.getBody(),m=d.getDocumentElement(),q=f.isInline(),r,t;CKEDITOR.env.gecko&&f.attachListener(f,"focus",function(a){a.removeListener();0!==r&&(a=c.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==f.$&&(a=c.createRange(),a.moveToElementEditStart(f),a.select())},null,null,-2);f.attachListener(f,CKEDITOR.env.webkit||CKEDITOR.env.gecko?"focusin":"focus",function(){if(r&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){r=c._.previousActive&&
c._.previousActive.equals(d.getActive());var a=null!=c._.previousScrollTop&&c._.previousScrollTop!=f.$.scrollTop;CKEDITOR.env.webkit&&r&&a&&(f.$.scrollTop=c._.previousScrollTop)}c.unlockSelection(r);r=0},null,null,-1);f.attachListener(f,"mousedown",function(){r=0});if(CKEDITOR.env.ie||q)v?f.attachListener(f,"beforedeactivate",a,null,null,-1):f.attachListener(c,"selectionCheck",a,null,null,-1),f.attachListener(f,CKEDITOR.env.webkit||CKEDITOR.env.gecko?"focusout":"blur",function(){c.lockSelection(t);
r=1},null,null,-1),f.attachListener(f,"mousedown",function(){r=0});if(CKEDITOR.env.ie&&!q){var w;f.attachListener(f,"mousedown",function(a){2==a.data.$.button&&((a=c.document.getSelection())&&a.getType()!=CKEDITOR.SELECTION_NONE||(w=c.window.getScrollPosition()))});f.attachListener(f,"mouseup",function(a){2==a.data.$.button&&w&&(c.document.$.documentElement.scrollLeft=w.x,c.document.$.documentElement.scrollTop=w.y);w=null});if("BackCompat"!=d.$.compatMode){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat){var z,
y;m.on("mousedown",function(a){function b(a){a=a.data.$;if(z){var c=h.$.createTextRange();try{c.moveToPoint(a.clientX,a.clientY)}catch(e){}z.setEndPoint(0>y.compareEndPoints("StartToStart",c)?"EndToEnd":"StartToStart",c);z.select()}}function c(){m.removeListener("mousemove",b);g.removeListener("mouseup",c);m.removeListener("mouseup",c);z.select()}a=a.data;if(a.getTarget().is("html")&&a.$.y<m.$.clientHeight&&a.$.x<m.$.clientWidth){z=h.$.createTextRange();try{z.moveToPoint(a.$.clientX,a.$.clientY)}catch(e){}y=
z.duplicate();m.on("mousemove",b);g.on("mouseup",c);m.on("mouseup",c)}})}if(7<CKEDITOR.env.version&&11>CKEDITOR.env.version)m.on("mousedown",function(a){a.data.getTarget().is("html")&&(g.on("mouseup",b),m.on("mouseup",b))})}}f.attachListener(f,"selectionchange",l,c);f.attachListener(f,"keyup",k,c);f.attachListener(f,"touchstart",k,c);f.attachListener(f,"touchend",k,c);CKEDITOR.env.ie&&f.attachListener(f,"keydown",function(a){var b=this.getSelection(1),c=e(b);c&&!c.equals(f)&&(b.selectElement(c),a.data.preventDefault())},
c);f.attachListener(f,CKEDITOR.env.webkit||CKEDITOR.env.gecko?"focusin":"focus",function(){c.forceNextSelectionCheck();c.selectionChange(1)});if(q&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var p;f.attachListener(f,"mousedown",function(){p=1});f.attachListener(d.getDocumentElement(),"mouseup",function(){p&&k.call(c);p=0})}else f.attachListener(CKEDITOR.env.ie?f:d.getDocumentElement(),"mouseup",k,c);CKEDITOR.env.webkit&&f.attachListener(d,"keydown",function(a){switch(a.data.getKey()){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:f.hasFocus&&
n(f)}},null,null,-1);f.attachListener(f,"keydown",u(c),null,null,-1)});c.on("setData",function(){c.unlockSelection();CKEDITOR.env.webkit&&b()});c.on("contentDomUnload",function(){c.unlockSelection()});if(CKEDITOR.env.ie9Compat)c.on("beforeDestroy",b,null,null,9);c.on("dataReady",function(){delete c._.fakeSelection;delete c._.hiddenSelectionContainer;c.selectionChange(1)});c.on("loadSnapshot",function(){var a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),b=c.editable().getLast(a);b&&b.hasAttribute("data-cke-hidden-sel")&&
(b.remove(),CKEDITOR.env.gecko&&(a=c.editable().getFirst(a))&&a.is("br")&&a.getAttribute("_moz_editor_bogus_node")&&a.remove())},null,null,100);c.on("key",function(a){if("wysiwyg"==c.mode){var b=c.getSelection();if(b.isFake){var e=C[a.data.keyCode];if(e)return e({editor:c,selected:b.getSelectedElement(),selection:b,keyEvent:a})}}})});if(CKEDITOR.env.webkit)CKEDITOR.on("instanceReady",function(a){var b=a.editor;b.on("selectionChange",function(){var a=b.editable(),c=a.getCustomData("cke-fillingChar");
c&&(c.getCustomData("ready")?(n(a),a.editor.fire("selectionCheck")):c.setCustomData("ready",1))},null,null,-1);b.on("beforeSetMode",function(){n(b.editable())},null,null,-1);b.on("getSnapshot",function(a){a.data&&(a.data=q(a.data))},b,null,20);b.on("toDataFormat",function(a){a.data.dataValue=q(a.data.dataValue)},null,null,0)});CKEDITOR.editor.prototype.selectionChange=function(a){(a?l:k).call(this)};CKEDITOR.editor.prototype.getSelection=function(a){return!this._.savedSelection&&!this._.fakeSelection||
a?(a=this.editable())&&"wysiwyg"==this.mode?new CKEDITOR.dom.selection(a):null:this._.savedSelection||this._.fakeSelection};CKEDITOR.editor.prototype.lockSelection=function(a){a=a||this.getSelection(1);return a.getType()!=CKEDITOR.SELECTION_NONE?(!a.isLocked&&a.lock(),this._.savedSelection=a,!0):!1};CKEDITOR.editor.prototype.unlockSelection=function(a){var b=this._.savedSelection;return b?(b.unlock(a),delete this._.savedSelection,!0):!1};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};
CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this)};CKEDITOR.dom.range.prototype.select=function(){var a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;CKEDITOR.dom.selection=function(a){if(a instanceof CKEDITOR.dom.selection){var b=a;a=a.root}var c=a instanceof CKEDITOR.dom.element;
this.rev=b?b.rev:w++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=c?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b)return CKEDITOR.tools.extend(this._.cache,b._.cache),this.isFake=b.isFake,this.isLocked=b.isLocked,this;a=this.getNative();var e,d;if(a)if(a.getRangeAt)e=(d=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(d.commonAncestorContainer);else{try{d=a.createRange()}catch(g){}e=d&&CKEDITOR.dom.element.get(d.item&&d.item(0)||d.parentElement())}if(!e||
e.type!=CKEDITOR.NODE_ELEMENT&&e.type!=CKEDITOR.NODE_TEXT||!this.root.equals(e)&&!this.root.contains(e))this._.cache.type=CKEDITOR.SELECTION_NONE,this._.cache.startElement=null,this._.cache.selectedElement=null,this._.cache.selectedText="",this._.cache.ranges=new CKEDITOR.dom.rangeList;return this};var H={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.tools.extend(CKEDITOR.dom.selection,{_removeFillingCharSequenceString:q,
_createFillingCharSequenceNode:e,FILLING_CHAR_SEQUENCE:r});CKEDITOR.dom.selection.prototype={getNative:function(){return void 0!==this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=v?this.document.$.selection:this.document.getWindow().$.getSelection()},getType:v?function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_NONE;try{var c=this.getNative(),e=c.type;"Text"==e&&(b=CKEDITOR.SELECTION_TEXT);"Control"==e&&(b=CKEDITOR.SELECTION_ELEMENT);c.createRange().parentElement()&&
(b=CKEDITOR.SELECTION_TEXT)}catch(d){}return a.type=b}:function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_TEXT,c=this.getNative();if(!c||!c.rangeCount)b=CKEDITOR.SELECTION_NONE;else if(1==c.rangeCount){var c=c.getRangeAt(0),e=c.startContainer;e==c.endContainer&&1==e.nodeType&&1==c.endOffset-c.startOffset&&H[e.childNodes[c.startOffset].nodeName.toLowerCase()]&&(b=CKEDITOR.SELECTION_ELEMENT)}return a.type=b},getRanges:function(){var a=v?function(){function a(b){return(new CKEDITOR.dom.node(b)).getIndex()}
var b=function(b,c){b=b.duplicate();b.collapse(c);var e=b.parentElement();if(!e.hasChildNodes())return{container:e,offset:0};for(var d=e.children,g,f,h=b.duplicate(),m=0,k=d.length-1,l=-1,n,q;m<=k;)if(l=Math.floor((m+k)/2),g=d[l],h.moveToElementText(g),n=h.compareEndPoints("StartToStart",b),0<n)k=l-1;else if(0>n)m=l+1;else return{container:e,offset:a(g)};if(-1==l||l==d.length-1&&0>n){h.moveToElementText(e);h.setEndPoint("StartToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;d=e.childNodes;if(!h)return g=
d[d.length-1],g.nodeType!=CKEDITOR.NODE_TEXT?{container:e,offset:d.length}:{container:g,offset:g.nodeValue.length};for(e=d.length;0<h&&0<e;)f=d[--e],f.nodeType==CKEDITOR.NODE_TEXT&&(q=f,h-=f.nodeValue.length);return{container:q,offset:-h}}h.collapse(0<n?!0:!1);h.setEndPoint(0<n?"StartToStart":"EndToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;if(!h)return{container:e,offset:a(g)+(0<n?0:1)};for(;0<h;)try{f=g[0<n?"previousSibling":"nextSibling"],f.nodeType==CKEDITOR.NODE_TEXT&&(h-=f.nodeValue.length,
q=f),g=f}catch(r){return{container:e,offset:a(g)}}return{container:q,offset:0<n?-h:q.nodeValue.length+h}};return function(){var a=this.getNative(),c=a&&a.createRange(),e=this.getType();if(!a)return[];if(e==CKEDITOR.SELECTION_TEXT)return a=new CKEDITOR.dom.range(this.root),e=b(c,!0),a.setStart(new CKEDITOR.dom.node(e.container),e.offset),e=b(c),a.setEnd(new CKEDITOR.dom.node(e.container),e.offset),a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&
a.collapse(),[a];if(e==CKEDITOR.SELECTION_ELEMENT){for(var e=[],d=0;d<c.length;d++){for(var g=c.item(d),f=g.parentNode,h=0,a=new CKEDITOR.dom.range(this.root);h<f.childNodes.length&&f.childNodes[h]!=g;h++);a.setStart(new CKEDITOR.dom.node(f),h);a.setEnd(new CKEDITOR.dom.node(f),h+1);e.push(a)}return e}return[]}}():function(){var a=[],b,c=this.getNative();if(!c)return a;for(var e=0;e<c.rangeCount;e++){var d=c.getRangeAt(e);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(d.startContainer),
d.startOffset);b.setEnd(new CKEDITOR.dom.node(d.endContainer),d.endOffset);a.push(b)}return a};return function(b){var c=this._.cache,e=c.ranges;e||(c.ranges=e=new CKEDITOR.dom.rangeList(a.call(this)));return b?p(new CKEDITOR.dom.rangeList(e.slice())):e}}(),getStartElement:function(){var a=this._.cache;if(void 0!==a.startElement)return a.startElement;var b;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var c=this.getRanges()[0];
if(c){if(c.collapsed)b=c.startContainer,b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());else{for(c.optimize();b=c.startContainer,c.startOffset==(b.getChildCount?b.getChildCount():b.getLength())&&!b.isBlockBoundary();)c.setStartAfter(b);b=c.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();if((b=b.getChild(c.startOffset))&&b.type==CKEDITOR.NODE_ELEMENT)for(c=b.getFirst();c&&c.type==CKEDITOR.NODE_ELEMENT;)b=c,c=c.getFirst();else b=c.startContainer}b=b.$}}return a.startElement=b?
new CKEDITOR.dom.element(b):null},getSelectedElement:function(){var a=this._.cache;if(void 0!==a.selectedElement)return a.selectedElement;var b=this,c=CKEDITOR.tools.tryThese(function(){return b.getNative().createRange().item(0)},function(){for(var a=b.getRanges()[0].clone(),c,e,d=2;d&&!((c=a.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&H[c.getName()]&&(e=c));d--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return e&&e.$});return a.selectedElement=c?new CKEDITOR.dom.element(c):null},getSelectedText:function(){var a=
this._.cache;if(void 0!==a.selectedText)return a.selectedText;var b=this.getNative(),b=v?"Control"==b.type?"":b.createRange().text:b.toString();return a.selectedText=b},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1},unlock:function(a){if(this.isLocked){if(a)var b=this.getSelectedElement(),c=this.getRanges(),e=this.isFake;this.isLocked=0;this.reset();a&&(a=b||c[0]&&c[0].getCommonAncestor())&&a.getAscendant("body",
1)&&(f(c)?d.call(this,c):e?this.fake(b):b?this.selectElement(b):this.selectRanges(c))}},reset:function(){this._.cache={};this.isFake=0;var a=this.root.editor;if(a&&a._.fakeSelection)if(this.rev==a._.fakeSelection.rev){delete a._.fakeSelection;var b=a._.hiddenSelectionContainer;if(b){var c=a.checkDirty();a.fire("lockSnapshot");b.remove();a.fire("unlockSnapshot");!c&&a.resetDirty()}delete a._.hiddenSelectionContainer}else CKEDITOR.warn("selection-fake-reset");this.rev=w++},selectElement:function(a){var b=
new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);this.selectRanges([b])},selectRanges:function(a){var b=this.root.editor,c=b&&b._.hiddenSelectionContainer;this.reset();if(c)for(var c=this.root,g,h=0;h<a.length;++h)g=a[h],g.endContainer.equals(c)&&(g.endOffset=Math.min(g.endOffset,c.getChildCount()));if(a.length)if(this.isLocked){var k=CKEDITOR.document.getActive();this.unlock();this.selectRanges(a);this.lock();k&&!k.equals(this.root)&&k.focus()}else{var l;a:{var q,r;if(1==a.length&&
!(r=a[0]).collapsed&&(l=r.getEnclosedNode())&&l.type==CKEDITOR.NODE_ELEMENT&&(r=r.clone(),r.shrink(CKEDITOR.SHRINK_ELEMENT,!0),(q=r.getEnclosedNode())&&q.type==CKEDITOR.NODE_ELEMENT&&(l=q),"false"==l.getAttribute("contenteditable")))break a;l=void 0}if(l)this.fake(l);else if(b&&b.plugins.tableselection&&b.plugins.tableselection.isSupportedEnvironment()&&f(a)&&!t&&!a[0]._getTableElement({table:1}).hasAttribute("data-cke-tableselection-ignored"))d.call(this,a);else{if(v){q=CKEDITOR.dom.walker.whitespaces(!0);
l=/\ufeff|\u00a0/;r={table:1,tbody:1,tr:1};1<a.length&&(b=a[a.length-1],a[0].setEnd(b.endContainer,b.endOffset));b=a[0];a=b.collapsed;var w,z,u;if((c=b.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in H&&(!c.is("a")||!c.getText()))try{u=c.$.createControlRange();u.addElement(c.$);u.select();return}catch(y){}if(b.startContainer.type==CKEDITOR.NODE_ELEMENT&&b.startContainer.getName()in r||b.endContainer.type==CKEDITOR.NODE_ELEMENT&&b.endContainer.getName()in r)b.shrink(CKEDITOR.NODE_ELEMENT,
!0),a=b.collapsed;u=b.createBookmark();r=u.startNode;a||(k=u.endNode);u=b.document.$.body.createTextRange();u.moveToElementText(r.$);u.moveStart("character",1);k?(l=b.document.$.body.createTextRange(),l.moveToElementText(k.$),u.setEndPoint("EndToEnd",l),u.moveEnd("character",-1)):(w=r.getNext(q),z=r.hasAscendant("pre"),w=!(w&&w.getText&&w.getText().match(l))&&(z||!r.hasPrevious()||r.getPrevious().is&&r.getPrevious().is("br")),z=b.document.createElement("span"),z.setHtml("\x26#65279;"),z.insertBefore(r),
w&&b.document.createText("﻿").insertBefore(r));b.setStartBefore(r);r.remove();a?(w?(u.moveStart("character",-1),u.select(),b.document.$.selection.clear()):u.select(),b.moveToPosition(z,CKEDITOR.POSITION_BEFORE_START),z.remove()):(b.setEndBefore(k),k.remove(),u.select())}else{k=this.getNative();if(!k)return;this.removeAllRanges();for(u=0;u<a.length;u++){if(u<a.length-1&&(w=a[u],z=a[u+1],l=w.clone(),l.setStart(w.endContainer,w.endOffset),l.setEnd(z.startContainer,z.startOffset),!l.collapsed&&(l.shrink(CKEDITOR.NODE_ELEMENT,
!0),b=l.getCommonAncestor(),l=l.getEnclosedNode(),b.isReadOnly()||l&&l.isReadOnly()))){z.setStart(w.startContainer,w.startOffset);a.splice(u--,1);continue}b=a[u];z=this.document.$.createRange();b.collapsed&&CKEDITOR.env.webkit&&m(b)&&(l=e(this.root),b.insertNode(l),(w=l.getNext())&&!l.getPrevious()&&w.type==CKEDITOR.NODE_ELEMENT&&"br"==w.getName()?(n(this.root),b.moveToPosition(w,CKEDITOR.POSITION_BEFORE_START)):b.moveToPosition(l,CKEDITOR.POSITION_AFTER_END));z.setStart(b.startContainer.$,b.startOffset);
try{z.setEnd(b.endContainer.$,b.endOffset)}catch(p){if(0<=p.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))b.collapse(1),z.setEnd(b.endContainer.$,b.endOffset);else throw p;}k.addRange(z)}}this.reset();this.root.fire("selectionchange")}}},fake:function(a,b){var c=this.root.editor;void 0===b&&a.hasAttribute("aria-label")&&(b=a.getAttribute("aria-label"));this.reset();y(c,b);var e=this._.cache,d=new CKEDITOR.dom.range(this.root);d.setStartBefore(a);d.setEndAfter(a);e.ranges=new CKEDITOR.dom.rangeList(d);
e.selectedElement=e.startElement=a;e.type=CKEDITOR.SELECTION_ELEMENT;e.selectedText=e.nativeSel=null;this.isFake=1;this.rev=w++;c._.fakeSelection=this;this.root.fire("selectionchange")},isHidden:function(){var a=this.getCommonAncestor();a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data("cke-hidden-sel"))},isInTable:function(a){return f(this.getRanges(),a)},isCollapsed:function(){var a=this.getRanges();return 1===a.length&&a[0].collapsed},createBookmarks:function(a){a=this.getRanges().createBookmarks(a);
this.isFake&&(a.isFake=1);return a},createBookmarks2:function(a){a=this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a},selectBookmarks:function(a){for(var b=[],c,e=0;e<a.length;e++){var d=new CKEDITOR.dom.range(this.root);d.moveToBookmark(a[e]);b.push(d)}a.isFake&&(c=f(b)?b[0]._getTableElement():b[0].getEnclosedNode(),c&&c.type==CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn("selection-not-fake"),a.isFake=0));a.isFake&&!f(b)?this.fake(c):this.selectRanges(b);return this},getCommonAncestor:function(){var a=
this.getRanges();return a.length?a[0].startContainer.getCommonAncestor(a[a.length-1].endContainer):null},scrollIntoView:function(){this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView()},removeAllRanges:function(){if(this.getType()!=CKEDITOR.SELECTION_NONE){var a=this.getNative();try{a&&a[v?"empty":"removeAllRanges"]()}catch(b){}this.reset()}}}}(),"use strict",CKEDITOR.STYLE_BLOCK=1,CKEDITOR.STYLE_INLINE=2,CKEDITOR.STYLE_OBJECT=3,function(){function a(a,b){for(var c,e;(a=a.getParent())&&
!a.equals(b);)if(a.getAttribute("data-nostyle"))c=a;else if(!e){var d=a.getAttribute("contentEditable");"false"==d?c=a:"true"==d&&(e=1)}return c}function f(a,b,c,e){return(a.getPosition(b)|e)==e&&(!c.childRule||c.childRule(a))}function b(c){var e=c.document;if(c.collapsed)e=w(this,e),c.insertNode(e),c.moveToPosition(e,CKEDITOR.POSITION_BEFORE_END);else{var g=this.element,h=this._.definition,m,k=h.ignoreReadonly,l=k||h.includeReadonly;null==l&&(l=c.root.getCustomData("cke_includeReadonly"));var n=
CKEDITOR.dtd[g];n||(m=!0,n=CKEDITOR.dtd.span);c.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.trim();var q=c.createBookmark(),r=q.startNode,v=q.endNode,t=r,z;if(!k){var y=c.getCommonAncestor(),k=a(r,y),y=a(v,y);k&&(t=k.getNextSourceNode(!0));y&&(v=y)}for(t.getPosition(v)==CKEDITOR.POSITION_FOLLOWING&&(t=0);t;){k=!1;if(t.equals(v))t=null,k=!0;else{var p=t.type==CKEDITOR.NODE_ELEMENT?t.getName():null,y=p&&"false"==t.getAttribute("contentEditable"),A=p&&t.getAttribute("data-nostyle");if(p&&t.data("cke-bookmark")||
t.type===CKEDITOR.NODE_COMMENT){t=t.getNextSourceNode(!0);continue}if(y&&l&&CKEDITOR.dtd.$block[p])for(var B=t,x=d(B),C=void 0,H=x.length,da=0,B=H&&new CKEDITOR.dom.range(B.getDocument());da<H;++da){var C=x[da],I=CKEDITOR.filter.instances[C.data("cke-filter")];if(I?I.check(this):1)B.selectNodeContents(C),b.call(this,B)}x=p?!n[p]||A?0:y&&!l?0:f(t,v,h,L):1;if(x)if(C=t.getParent(),x=h,H=g,da=m,!C||!(C.getDtd()||CKEDITOR.dtd.span)[H]&&!da||x.parentRule&&!x.parentRule(C))k=!0;else{if(z||p&&CKEDITOR.dtd.$removeEmpty[p]&&
(t.getPosition(v)|L)!=L||(z=c.clone(),z.setStartBefore(t)),p=t.type,p==CKEDITOR.NODE_TEXT||y||p==CKEDITOR.NODE_ELEMENT&&!t.getChildCount()){for(var p=t,F;(k=!p.getNext(J))&&(F=p.getParent(),n[F.getName()])&&f(F,r,h,G);)p=F;z.setEndAfter(p)}}else k=!0;t=t.getNextSourceNode(A||y)}if(k&&z&&!z.collapsed){for(var k=w(this,e),y=k.hasAttributes(),A=z.getCommonAncestor(),p={},x={},C={},H={},ea,E,fa;k&&A;){if(A.getName()==g){for(ea in h.attributes)!H[ea]&&(fa=A.getAttribute(E))&&(k.getAttribute(ea)==fa?x[ea]=
1:H[ea]=1);for(E in h.styles)!C[E]&&(fa=A.getStyle(E))&&(k.getStyle(E)==fa?p[E]=1:C[E]=1)}A=A.getParent()}for(ea in x)k.removeAttribute(ea);for(E in p)k.removeStyle(E);y&&!k.hasAttributes()&&(k=null);k?(z.extractContents().appendTo(k),z.insertNode(k),u.call(this,k),k.mergeSiblings(),CKEDITOR.env.ie||k.$.normalize()):(k=new CKEDITOR.dom.element("span"),z.extractContents().appendTo(k),z.insertNode(k),u.call(this,k),k.remove(!0));z=null}}c.moveToBookmark(q);c.shrink(CKEDITOR.SHRINK_TEXT);c.shrink(CKEDITOR.NODE_ELEMENT,
!0)}}function c(a){function b(){for(var a=new CKEDITOR.dom.elementPath(e.getParent()),c=new CKEDITOR.dom.elementPath(l.getParent()),d=null,g=null,f=0;f<a.elements.length;f++){var h=a.elements[f];if(h==a.block||h==a.blockLimit)break;n.checkElementRemovable(h,!0)&&(d=h)}for(f=0;f<c.elements.length;f++){h=c.elements[f];if(h==c.block||h==c.blockLimit)break;n.checkElementRemovable(h,!0)&&(g=h)}g&&l.breakParent(g);d&&e.breakParent(d)}a.enlarge(CKEDITOR.ENLARGE_INLINE,1);var c=a.createBookmark(),e=c.startNode,
d=this._.definition.alwaysRemoveElement;if(a.collapsed){for(var g=new CKEDITOR.dom.elementPath(e.getParent(),a.root),f,h=0,m;h<g.elements.length&&(m=g.elements[h])&&m!=g.block&&m!=g.blockLimit;h++)if(this.checkElementRemovable(m)){var k;!d&&a.collapsed&&(a.checkBoundaryOfElement(m,CKEDITOR.END)||(k=a.checkBoundaryOfElement(m,CKEDITOR.START)))?(f=m,f.match=k?"start":"end"):(m.mergeSiblings(),m.is(this.element)?y.call(this,m):p(m,t(this)[m.getName()]))}if(f){d=e;for(h=0;;h++){m=g.elements[h];if(m.equals(f))break;
else if(m.match)continue;else m=m.clone();m.append(d);d=m}d["start"==f.match?"insertBefore":"insertAfter"](f)}}else{var l=c.endNode,n=this;b();for(g=e;!g.equals(l);)f=g.getNextSourceNode(),g.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(g)&&(g.getName()==this.element?y.call(this,g):p(g,t(this)[g.getName()]),f.type==CKEDITOR.NODE_ELEMENT&&f.contains(e)&&(b(),f=e.getNext())),g=f}a.moveToBookmark(c);a.shrink(CKEDITOR.NODE_ELEMENT,!0)}function d(a){var b=[];a.forEach(function(a){if("true"==
a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function l(a){var b=a.getEnclosedNode()||a.getCommonAncestor(!1,!0);(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1))&&!a.isReadOnly()&&r(a,this)}function k(a){var b=a.getCommonAncestor(!0,!0);if(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1)){var b=this._.definition,c=b.attributes;if(c)for(var e in c)a.removeAttribute(e,c[e]);if(b.styles)for(var d in b.styles)b.styles.hasOwnProperty(d)&&
a.removeStyle(d)}}function g(a){var b=a.createBookmark(!0),c=a.createIterator();c.enforceRealBlocks=!0;this._.enterMode&&(c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR);for(var e,d=a.document,g;e=c.getNextParagraph();)!e.isReadOnly()&&(c.activeFilter?c.activeFilter.check(this):1)&&(g=w(this,d,e),m(e,g));a.moveToBookmark(b)}function h(a){var b=a.createBookmark(1),c=a.createIterator();c.enforceRealBlocks=!0;c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var e,d;e=c.getNextParagraph();)this.checkElementRemovable(e)&&
(e.is("pre")?((d=this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))&&e.copyAttributes(d),m(e,d)):y.call(this,e));a.moveToBookmark(b)}function m(a,b){var c=!b;c&&(b=a.getDocument().createElement("div"),a.copyAttributes(b));var d=b&&b.is("pre"),g=a.is("pre"),f=!d&&g;if(d&&!g){g=b;(f=a.getBogus())&&f.remove();f=a.getHtml();f=n(f,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,"");f=f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1");f=f.replace(/([ \t\n\r]+|&nbsp;)/g,
" ");f=f.replace(/<br\b[^>]*>/gi,"\n");if(CKEDITOR.env.ie){var h=a.getDocument().createElement("div");h.append(g);g.$.outerHTML="\x3cpre\x3e"+f+"\x3c/pre\x3e";g.copyAttributes(h.getFirst());g=h.getFirst().remove()}else g.setHtml(f);b=g}else f?b=q(c?[a.getHtml()]:e(a),b):a.moveChildren(b);b.replace(a);if(d){var c=b,m;(m=c.getPrevious(E))&&m.type==CKEDITOR.NODE_ELEMENT&&m.is("pre")&&(d=n(m.getHtml(),/\n$/,"")+"\n\n"+n(c.getHtml(),/^\n/,""),CKEDITOR.env.ie?c.$.outerHTML="\x3cpre\x3e"+d+"\x3c/pre\x3e":
c.setHtml(d),m.remove())}else c&&v(b)}function e(a){var b=[];n(a.getOuterHtml(),/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,function(a,b,c){return b+"\x3c/pre\x3e"+c+"\x3cpre\x3e"}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(a,c){b.push(c)});return b}function n(a,b,c){var e="",d="";a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(a,b,c){b&&(e=b);c&&(d=c);return""});return e+a.replace(b,c)+d}function q(a,b){var c;
1<a.length&&(c=new CKEDITOR.dom.documentFragment(b.getDocument()));for(var e=0;e<a.length;e++){var d=a[e],d=d.replace(/(\r\n|\r)/g,"\n"),d=n(d,/^[ \t]*\n/,""),d=n(d,/\n$/,""),d=n(d,/^[ \t]+|[ \t]+$/g,function(a,b){return 1==a.length?"\x26nbsp;":b?" "+CKEDITOR.tools.repeat("\x26nbsp;",a.length-1):CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "}),d=d.replace(/\n/g,"\x3cbr\x3e"),d=d.replace(/[ \t]{2,}/g,function(a){return CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "});if(c){var g=b.clone();g.setHtml(d);
c.append(g)}else b.setHtml(d)}return c||b}function y(a,b){var c=this._.definition,e=c.attributes,c=c.styles,d=t(this)[a.getName()],g=CKEDITOR.tools.isEmpty(e)&&CKEDITOR.tools.isEmpty(c),f;for(f in e)if("class"!=f&&!this._.definition.fullMatch||a.getAttribute(f)==x(f,e[f]))b&&"data-"==f.slice(0,5)||(g=a.hasAttribute(f),a.removeAttribute(f));for(var h in c)this._.definition.fullMatch&&a.getStyle(h)!=x(h,c[h],!0)||(g=g||!!a.getStyle(h),a.removeStyle(h));p(a,d,C[a.getName()]);g&&(this._.definition.alwaysRemoveElement?
v(a,1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!a.hasAttributes()?v(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))}function u(a){for(var b=t(this),c=a.getElementsByTag(this.element),e,d=c.count();0<=--d;)e=c.getItem(d),e.isReadOnly()||y.call(this,e,!0);for(var g in b)if(g!=this.element)for(c=a.getElementsByTag(g),d=c.count()-1;0<=d;d--)e=c.getItem(d),e.isReadOnly()||p(e,b[g])}function p(a,b,c){if(b=b&&b.attributes)for(var e=0;e<b.length;e++){var d=b[e][0],
g;if(g=a.getAttribute(d)){var f=b[e][1];(null===f||f.test&&f.test(g)||"string"==typeof f&&g==f)&&a.removeAttribute(d)}}c||v(a)}function v(a,b){if(!a.hasAttributes()||b)if(CKEDITOR.dtd.$block[a.getName()]){var c=a.getPrevious(E),e=a.getNext(E);!c||c.type!=CKEDITOR.NODE_TEXT&&c.isBlockBoundary({br:1})||a.append("br",1);!e||e.type!=CKEDITOR.NODE_TEXT&&e.isBlockBoundary({br:1})||a.append("br");a.remove(!0)}else c=a.getFirst(),e=a.getLast(),a.remove(!0),c&&(c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings(),
e&&!c.equals(e)&&e.type==CKEDITOR.NODE_ELEMENT&&e.mergeSiblings())}function w(a,b,c){var e;e=a.element;"*"==e&&(e="span");e=new CKEDITOR.dom.element(e,b);c&&c.copyAttributes(e);e=r(e,a);b.getCustomData("doc_processing_style")&&e.hasAttribute("id")?e.removeAttribute("id"):b.setCustomData("doc_processing_style",1);return e}function r(a,b){var c=b._.definition,e=c.attributes,c=CKEDITOR.style.getStyleText(c);if(e)for(var d in e)a.setAttribute(d,e[d]);c&&a.setAttribute("style",c);a.getDocument().removeCustomData("doc_processing_style");
return a}function z(a,b){for(var c in a)a[c]=a[c].replace(I,function(a,c){return b[c]})}function t(a){if(a._.overrides)return a._.overrides;var b=a._.overrides={},c=a._.definition.overrides;if(c){CKEDITOR.tools.isArray(c)||(c=[c]);for(var e=0;e<c.length;e++){var d=c[e],g,f;"string"==typeof d?g=d.toLowerCase():(g=d.element?d.element.toLowerCase():a.element,f=d.attributes);d=b[g]||(b[g]={});if(f){var d=d.attributes=d.attributes||[],h;for(h in f)d.push([h.toLowerCase(),f[h]])}}}return b}function x(a,
b,c){var e=new CKEDITOR.dom.element("span");e[c?"setStyle":"setAttribute"](a,b);return e[c?"getStyle":"getAttribute"](a)}function A(a,b){function c(a,b){return"font-family"==b.toLowerCase()?a.replace(/["']/g,""):a}"string"==typeof a&&(a=CKEDITOR.tools.parseCssText(a));"string"==typeof b&&(b=CKEDITOR.tools.parseCssText(b,!0));for(var e in a)if(!(e in b)||c(b[e],e)!=c(a[e],e)&&"inherit"!=a[e]&&"inherit"!=b[e])return!1;return!0}function B(a,b,c){var e=a.getRanges();b=b?this.removeFromRange:this.applyToRange;
var d,g;if(a.isFake&&a.isInTable())for(d=[],g=0;g<e.length;g++)d.push(e[g].clone());for(var f=e.createIterator();g=f.getNextRange();)b.call(this,g,c);a.selectRanges(d||e)}var C={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},H={a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,
dd:1,form:1,audio:1,video:1},F=/\s*(?:;\s*|$)/,I=/#\((.+?)\)/g,J=CKEDITOR.dom.walker.bookmark(0,1),E=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a,b){if("string"==typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);var c=a.attributes;c&&c.style&&(a.styles=CKEDITOR.tools.extend({},a.styles,CKEDITOR.tools.parseCssText(c.style)),delete c.style);b&&(a=CKEDITOR.tools.clone(a),z(a.attributes,b),z(a.styles,b));c=this.element=a.element?"string"==typeof a.element?a.element.toLowerCase():
a.element:"*";this.type=a.type||(C[c]?CKEDITOR.STYLE_BLOCK:H[c]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);"object"==typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT);this._={definition:a}};CKEDITOR.style.prototype={apply:function(a){if(a instanceof CKEDITOR.dom.document)return B.call(this,a.getSelection());if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);B.call(this,a.getSelection(),0,a);this._.enterMode=b}},remove:function(a){if(a instanceof
CKEDITOR.dom.document)return B.call(this,a.getSelection(),1);if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);B.call(this,a.getSelection(),1,a);this._.enterMode=b}},applyToRange:function(a){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?b:this.type==CKEDITOR.STYLE_BLOCK?g:this.type==CKEDITOR.STYLE_OBJECT?l:null;return this.applyToRange(a)},removeFromRange:function(a){this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?c:this.type==CKEDITOR.STYLE_BLOCK?
h:this.type==CKEDITOR.STYLE_OBJECT?k:null;return this.removeFromRange(a)},applyToObject:function(a){r(a,this)},checkActive:function(a,b){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||a.blockLimit,!0,b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var c=a.elements,e=0,d;e<c.length;e++)if(d=c[e],this.type!=CKEDITOR.STYLE_INLINE||d!=a.block&&d!=a.blockLimit){if(this.type==CKEDITOR.STYLE_OBJECT){var g=d.getName();if(!("string"==typeof this.element?
g==this.element:g in this.element))continue}if(this.checkElementRemovable(d,!0,b))return!0}}return!1},checkApplicable:function(a,b,c){b&&b instanceof CKEDITOR.filter&&(c=b);if(c&&!c.check(this))return!1;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]}return!0},checkElementMatch:function(a,b){var c=this._.definition;if(!a||!c.ignoreReadonly&&a.isReadOnly())return!1;var e=a.getName();if("string"==typeof this.element?
e==this.element:e in this.element){if(!b&&!a.hasAttributes())return!0;if(e=c._AC)c=e;else{var e={},d=0,g=c.attributes;if(g)for(var f in g)d++,e[f]=g[f];if(f=CKEDITOR.style.getStyleText(c))e.style||d++,e.style=f;e._length=d;c=c._AC=e}if(c._length){for(var h in c)if("_length"!=h)if(e=a.getAttribute(h)||"","style"==h?A(c[h],e):c[h]==e){if(!b)return!0}else if(b)return!1;if(b)return!0}else return!0}return!1},checkElementRemovable:function(a,b,c){if(this.checkElementMatch(a,b,c))return!0;if(b=t(this)[a.getName()]){var e;
if(!(b=b.attributes))return!0;for(c=0;c<b.length;c++)if(e=b[c][0],e=a.getAttribute(e)){var d=b[c][1];if(null===d)return!0;if("string"==typeof d){if(e==d)return!0}else if(d.test(e))return!0}}return!1},buildPreview:function(a){var b=this._.definition,c=[],e=b.element;"bdo"==e&&(e="span");var c=["\x3c",e],d=b.attributes;if(d)for(var g in d)c.push(" ",g,'\x3d"',d[g],'"');(d=CKEDITOR.style.getStyleText(b))&&c.push(' style\x3d"',d,'"');c.push("\x3e",a||b.name,"\x3c/",e,"\x3e");return c.join("")},getDefinition:function(){return this._.definition}};
CKEDITOR.style.getStyleText=function(a){var b=a._ST;if(b)return b;var b=a.styles,c=a.attributes&&a.attributes.style||"",e="";c.length&&(c=c.replace(F,";"));for(var d in b){var g=b[d],f=(d+":"+g).replace(F,";");"inherit"==g?e+=f:c+=f}c.length&&(c=CKEDITOR.tools.normalizeCssText(c,!0));return a._ST=c+e};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(a){var b=function(a){this._={definition:a};this.setup&&this.setup(a)};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
{assignedTo:CKEDITOR.STYLE_OBJECT},a,!0);return this.customHandlers[a.type]=b};var L=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,G=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED}(),CKEDITOR.styleCommand=function(a,f){this.requiredContent=this.allowedContent=this.style=a;CKEDITOR.tools.extend(this,f,!0)},CKEDITOR.styleCommand.prototype.exec=function(a){a.focus();this.state==CKEDITOR.TRISTATE_OFF?a.applyStyle(this.style):
this.state==CKEDITOR.TRISTATE_ON&&a.removeStyle(this.style)},CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet"),CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet),CKEDITOR.loadStylesSet=function(a,f,b){CKEDITOR.stylesSet.addExternal(a,f,"");CKEDITOR.stylesSet.load(a,b)},CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(a,f){var b=this._.styleStateChangeCallbacks;b||(b=this._.styleStateChangeCallbacks=[],this.on("selectionChange",
function(a){for(var d=0;d<b.length;d++){var f=b[d],k=f.style.checkActive(a.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;f.fn.call(this,k)}}));b.push({style:a,fn:f})},applyStyle:function(a){a.apply(this)},removeStyle:function(a){a.remove(this)},getStylesSet:function(a){if(this._.stylesDefinitions)a(this._.stylesDefinitions);else{var f=this,b=f.config.stylesCombo_stylesSet||f.config.stylesSet;if(!1===b)a(null);else if(b instanceof Array)f._.stylesDefinitions=b,a(b);else{b||(b="default");
var b=b.split(":"),c=b[0];CKEDITOR.stylesSet.addExternal(c,b[1]?b.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),"");CKEDITOR.stylesSet.load(c,function(b){f._.stylesDefinitions=b[c];a(f._.stylesDefinitions)})}}}}),function(){if(window.Promise)CKEDITOR.tools.promise=Promise;else{var a=CKEDITOR.getUrl("vendor/promise.js");CKEDITOR.scriptLoader.load(a,function(f){f?CKEDITOR.tools.promise=ES6Promise:CKEDITOR.error("no-vendor-lib",{path:a})})}}(),CKEDITOR.dom.comment=function(a,f){"string"==typeof a&&
(a=(f?f.$:document).createComment(a));CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return"\x3c!--"+this.$.nodeValue+"--\x3e"}}),"use strict",function(){var a={},f={},b;for(b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list||(a[b]=1);for(b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit||b in CKEDITOR.dtd.$empty||(f[b]=1);CKEDITOR.dom.elementPath=
function(b,d){var l=null,k=null,g=[],h=b,m;d=d||b.getDocument().getBody();h||(h=d);do if(h.type==CKEDITOR.NODE_ELEMENT){g.push(h);if(!this.lastElement&&(this.lastElement=h,h.is(CKEDITOR.dtd.$object)||"false"==h.getAttribute("contenteditable")))continue;if(h.equals(d))break;if(!k&&(m=h.getName(),"true"==h.getAttribute("contenteditable")?k=h:!l&&f[m]&&(l=h),a[m])){if(m=!l&&"div"==m){a:{m=h.getChildren();for(var e=0,n=m.count();e<n;e++){var q=m.getItem(e);if(q.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[q.getName()]){m=
!0;break a}}m=!1}m=!m}m?l=h:k=h}}while(h=h.getParent());k||(k=d);this.block=l;this.blockLimit=k;this.root=d;this.elements=g}}(),CKEDITOR.dom.elementPath.prototype={compare:function(a){var f=this.elements;a=a&&a.elements;if(!a||f.length!=a.length)return!1;for(var b=0;b<f.length;b++)if(!f[b].equals(a[b]))return!1;return!0},contains:function(a,f,b){var c=0,d;"string"==typeof a&&(d=function(b){return b.getName()==a});a instanceof CKEDITOR.dom.element?d=function(b){return b.equals(a)}:CKEDITOR.tools.isArray(a)?
d=function(b){return-1<CKEDITOR.tools.indexOf(a,b.getName())}:"function"==typeof a?d=a:"object"==typeof a&&(d=function(b){return b.getName()in a});var l=this.elements,k=l.length;f&&(b?c+=1:--k);b&&(l=Array.prototype.slice.call(l,0),l.reverse());for(;c<k;c++)if(d(l[c]))return l[c];return null},isContextFor:function(a){var f;return a in CKEDITOR.dtd.$block?(f=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&this.block||this.blockLimit,!!f.getDtd()[a]):!0},direction:function(){return(this.block||
this.blockLimit||this.root).getDirection(1)}},CKEDITOR.dom.text=function(a,f){"string"==typeof a&&(a=(f?f.$:document).createTextNode(a));this.$=a},CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length},getText:function(){return this.$.nodeValue},setText:function(a){this.$.nodeValue=a},split:function(a){var f=this.$.parentNode,b=f.childNodes.length,c=this.getLength(),d=this.getDocument(),
l=new CKEDITOR.dom.text(this.$.splitText(a),d);f.childNodes.length==b&&(a>=c?(l=d.createText(""),l.insertAfter(this)):(a=d.createText(""),a.insertAfter(l),a.remove()));return l},substring:function(a,f){return"number"!=typeof f?this.$.nodeValue.substr(a):this.$.nodeValue.substring(a,f)}}),function(){function a(a,c,d){var f=a.serializable,k=c[d?"endContainer":"startContainer"],g=d?"endOffset":"startOffset",h=f?c.document.getById(a.startNode):a.startNode;a=f?c.document.getById(a.endNode):a.endNode;k.equals(h.getPrevious())?
(c.startOffset=c.startOffset-k.getLength()-a.getPrevious().getLength(),k=a.getNext()):k.equals(a.getPrevious())&&(c.startOffset-=k.getLength(),k=a.getNext());k.equals(h.getParent())&&c[g]++;k.equals(a.getParent())&&c[g]++;c[d?"endContainer":"startContainer"]=k;return c}CKEDITOR.dom.rangeList=function(a){if(a instanceof CKEDITOR.dom.rangeList)return a;a?a instanceof CKEDITOR.dom.range&&(a=[a]):a=[];return CKEDITOR.tools.extend(a,f)};var f={createIterator:function(){var a=this,c=CKEDITOR.dom.walker.bookmark(),
d=[],f;return{getNextRange:function(k){f=void 0===f?0:f+1;var g=a[f];if(g&&1<a.length){if(!f)for(var h=a.length-1;0<=h;h--)d.unshift(a[h].createBookmark(!0));if(k)for(var m=0;a[f+m+1];){var e=g.document;k=0;h=e.getById(d[m].endNode);for(e=e.getById(d[m+1].startNode);;){h=h.getNextSourceNode(!1);if(e.equals(h))k=1;else if(c(h)||h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary())continue;break}if(!k)break;m++}for(g.moveToBookmark(d.shift());m--;)h=a[++f],h.moveToBookmark(d.shift()),g.setEnd(h.endContainer,
h.endOffset)}return g}}},createBookmarks:function(b){for(var c=[],d,f=0;f<this.length;f++){c.push(d=this[f].createBookmark(b,!0));for(var k=f+1;k<this.length;k++)this[k]=a(d,this[k]),this[k]=a(d,this[k],!0)}return c},createBookmarks2:function(a){for(var c=[],d=0;d<this.length;d++)c.push(this[d].createBookmark2(a));return c},moveToBookmarks:function(a){for(var c=0;c<this.length;c++)this[c].moveToBookmark(a[c])}}}(),function(){function a(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||"skins/"+
CKEDITOR.skinName.split(",")[0]+"/")}function f(b){var c=CKEDITOR.skin["ua_"+b],d=CKEDITOR.env;if(c)for(var c=c.split(",").sort(function(a,b){return a>b?-1:1}),g=0,f;g<c.length;g++)if(f=c[g],d.ie&&(f.replace(/^ie/,"")==d.version||d.quirks&&"iequirks"==f)&&(f="ie"),d[f]){b+="_"+c[g];break}return CKEDITOR.getUrl(a()+b+".css")}function b(a,b){l[a]||(CKEDITOR.document.appendStyleSheet(f(a)),l[a]=1);b&&b()}function c(a){var b=a.getById(k);b||(b=a.getHead().append("style"),b.setAttribute("id",k),b.setAttribute("type",
"text/css"));return b}function d(a,b,c){var d,g,f;if(CKEDITOR.env.webkit)for(b=b.split("}").slice(0,-1),g=0;g<b.length;g++)b[g]=b[g].split("{");for(var h=0;h<a.length;h++)if(CKEDITOR.env.webkit)for(g=0;g<b.length;g++){f=b[g][1];for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);a[h].$.sheet.addRule(b[g][0],f)}else{f=b;for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);CKEDITOR.env.ie&&11>CKEDITOR.env.version?a[h].$.styleSheet.cssText+=f:a[h].$.innerHTML+=f}}var l={};CKEDITOR.skin={path:a,loadPart:function(c,
e){CKEDITOR.skin.name!=CKEDITOR.skinName.split(",")[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a()+"skin.js"),function(){b(c,e)}):b(c,e)},getPath:function(a){return CKEDITOR.getUrl(f(a))},icons:{},addIcon:function(a,b,c,d){a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b,offset:c||0,bgsize:d||"16px"})},getIconStyle:function(a,b,c,d,g){var f;a&&(a=a.toLowerCase(),b&&(f=this.icons[a+"-rtl"]),f||(f=this.icons[a]));a=c||f&&f.path||"";d=d||f&&f.offset;g=g||f&&f.bgsize||"16px";a&&(a=a.replace(/'/g,
"\\'"));return a&&"background-image:url('"+CKEDITOR.getUrl(a)+"');background-position:0 "+d+"px;background-size:"+g+";"}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){return this.uiColor},setUiColor:function(a){var b=c(CKEDITOR.document);return(this.setUiColor=function(a){this.uiColor=a;var c=CKEDITOR.skin.chameleon,f="",m="";"function"==typeof c&&(f=c(this,"editor"),m=c(this,"panel"));a=[[h,a]];d([b],f,a);d(g,m,a)}).call(this,a)}});var k="cke_ui_color",g=[],h=/\$color/g;
CKEDITOR.on("instanceLoaded",function(a){if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){var b=a.editor;a=function(a){a=(a.data[0]||a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();if(!a.getById("cke_ui_color")){var f=c(a);g.push(f);b.on("destroy",function(){g=CKEDITOR.tools.array.filter(g,function(a){return f!==a})});(a=b.getUiColor())&&d([f],CKEDITOR.skin.chameleon(b,"panel"),[[h,a]])}};b.on("panelShow",a);b.on("menuShow",a);b.config.uiColor&&b.setUiColor(b.config.uiColor)}})}(),
function(){if(CKEDITOR.env.webkit)CKEDITOR.env.hc=!1;else{var a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',CKEDITOR.document);a.appendTo(CKEDITOR.document.getHead());try{var f=a.getComputedStyle("border-top-color"),b=a.getComputedStyle("border-right-color");CKEDITOR.env.hc=!(!f||f!=b)}catch(c){CKEDITOR.env.hc=!1}a.remove()}CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=" cke_hc");CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
CKEDITOR.status="loaded";CKEDITOR.fireOnce("loaded");if(a=CKEDITOR._.pending)for(delete CKEDITOR._.pending,f=0;f<a.length;f++)CKEDITOR.editor.prototype.constructor.apply(a[f][0],a[f][1]),CKEDITOR.add(a[f][0])}(),CKEDITOR.skin.name="moono-lisa",CKEDITOR.skin.ua_editor="ie,iequirks,ie8,gecko",CKEDITOR.skin.ua_dialog="ie,iequirks,ie8",CKEDITOR.skin.chameleon=function(){var a=function(){return function(a,c){for(var d=a.match(/[^#]./g),f=0;3>f;f++){var k=f,g;g=parseInt(d[f],16);g=("0"+(0>c?0|g*(1+c):0|
g+(255-g)*c).toString(16)).slice(-2);d[k]=g}return"#"+d.join("")}}(),f={editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
return function(b,c){var d=a(b.uiColor,.4),d={id:"."+b.id,defaultBorder:a(d,-.2),toolbarElementsBorder:a(d,-.25),defaultBackground:d,lightBackground:a(d,.8),darkBackground:a(d,-.15),ckeButtonOn:a(d,.4),ckeResizer:a(d,-.4),ckeColorauto:a(d,.8),dialogBody:a(d,.7),dialogTab:a(d,.65),dialogTabSelected:"#FFF",dialogTabSelectedBorder:"#FFF",elementsPathColor:a(d,-.6),menubuttonHover:a(d,.1),menubuttonIcon:a(d,.5),menubuttonIconHover:a(d,.3)};return f[c].output(d).replace(/\[/g,"{").replace(/\]/g,"}")}}(),
CKEDITOR.plugins.add("dialogui",{onLoad:function(){var a=function(a){this._||(this._={});this._["default"]=this._.initValue=a["default"]||"";this._.required=a.required||!1;for(var b=[this._],c=1;c<arguments.length;c++)b.push(arguments[c]);b.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools,b);return this._},f={build:function(a,b,c){return new CKEDITOR.ui.dialog.textInput(a,b,c)}},b={build:function(a,b,c){return new CKEDITOR.ui.dialog[b.type](a,b,c)}},c={isChanged:function(){return this.getValue()!=
this.getInitValue()},reset:function(a){this.setValue(this.getInitValue(),a)},setInitValue:function(){this._.initValue=this.getValue()},resetInitValue:function(){this._.initValue=this._["default"]},getInitValue:function(){return this._.initValue}},d=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(a,b){this._.domOnChangeRegistered||(a.on("load",function(){this.getInputElement().on("change",function(){a.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()})},
this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},!0),l=/^on([A-Z]\w+)/,k=function(a){for(var b in a)(l.test(b)||"title"==b||"type"==b)&&delete a[b];return a},g=function(a){a=a.data.getKeystroke();a==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker("ltr"):a==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker("rtl")};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(b,c,e,d){if(!(4>arguments.length)){var g=a.call(this,c);g.labelId=CKEDITOR.tools.getNextId()+
"_label";this._.children=[];var f={role:c.role||"presentation"};c.includeLabel&&(f["aria-labelledby"]=g.labelId);CKEDITOR.ui.dialog.uiElement.call(this,b,c,e,"div",null,f,function(){var a=[],e=c.required?" cke_required":"";"horizontal"!=c.labelLayout?a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label'+e+'" ',' id\x3d"'+g.labelId+'"',g.inputId?' for\x3d"'+g.inputId+'"':"",(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",c.label,"\x3c/label\x3e",'\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
c.controlStyle?' style\x3d"'+c.controlStyle+'"':"",' role\x3d"presentation"\x3e',d.call(this,b,c),"\x3c/div\x3e"):(e={type:"hbox",widths:c.widths,padding:0,children:[{type:"html",html:'\x3clabel class\x3d"cke_dialog_ui_labeled_label'+e+'" id\x3d"'+g.labelId+'" for\x3d"'+g.inputId+'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e"+CKEDITOR.tools.htmlEncode(c.label)+"\x3c/label\x3e"},{type:"html",html:'\x3cspan class\x3d"cke_dialog_ui_labeled_content"'+(c.controlStyle?' style\x3d"'+c.controlStyle+
'"':"")+"\x3e"+d.call(this,b,c)+"\x3c/span\x3e"}]},CKEDITOR.dialog._.uiElementBuilders.hbox.build(b,e,a));return a.join("")})}},textInput:function(b,c,e){if(!(3>arguments.length)){a.call(this,c);var d=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",f={"class":"cke_dialog_ui_input_"+c.type,id:d,type:c.type};c.validate&&(this.validate=c.validate);c.maxLength&&(f.maxlength=c.maxLength);c.size&&(f.size=c.size);c.inputStyle&&(f.style=c.inputStyle);var k=this,l=!1;b.on("load",function(){k.getInputElement().on("keydown",
function(a){13==a.data.getKeystroke()&&(l=!0)});k.getInputElement().on("keyup",function(a){13==a.data.getKeystroke()&&l&&(b.getButton("ok")&&setTimeout(function(){b.getButton("ok").click()},0),l=!1);k.bidi&&g.call(k,a)},null,null,1E3)});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){var a=['\x3cdiv class\x3d"cke_dialog_ui_input_',c.type,'" role\x3d"presentation"'];c.width&&a.push('style\x3d"width:'+c.width+'" ');a.push("\x3e\x3cinput ");f["aria-labelledby"]=this._.labelId;this._.required&&
(f["aria-required"]=this._.required);for(var b in f)a.push(b+'\x3d"'+f[b]+'" ');a.push(" /\x3e\x3c/div\x3e");return a.join("")})}},textarea:function(b,c,e){if(!(3>arguments.length)){a.call(this,c);var d=this,f=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",k={};c.validate&&(this.validate=c.validate);k.rows=c.rows||5;k.cols=c.cols||20;k["class"]="cke_dialog_ui_input_textarea "+(c["class"]||"");"undefined"!=typeof c.inputStyle&&(k.style=c.inputStyle);c.dir&&(k.dir=c.dir);if(d.bidi)b.on("load",
function(){d.getInputElement().on("keyup",g)},d);CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){k["aria-labelledby"]=this._.labelId;this._.required&&(k["aria-required"]=this._.required);var a=['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"',f,'" '],b;for(b in k)a.push(b+'\x3d"'+CKEDITOR.tools.htmlEncode(k[b])+'" ');a.push("\x3e",CKEDITOR.tools.htmlEncode(d._["default"]),"\x3c/textarea\x3e\x3c/div\x3e");return a.join("")})}},checkbox:function(b,
c,e){if(!(3>arguments.length)){var d=a.call(this,c,{"default":!!c["default"]});c.validate&&(this.validate=c.validate);CKEDITOR.ui.dialog.uiElement.call(this,b,c,e,"span",null,null,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},!0),e=[],g=CKEDITOR.tools.getNextId()+"_label",f={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":g};k(a);c["default"]&&(f.checked="checked");"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);
d.checkbox=new CKEDITOR.ui.dialog.uiElement(b,a,e,"input",null,f);e.push(' \x3clabel id\x3d"',g,'" for\x3d"',f.id,'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",CKEDITOR.tools.htmlEncode(c.label),"\x3c/label\x3e");return e.join("")})}},radio:function(b,c,e){if(!(3>arguments.length)){a.call(this,c);this._["default"]||(this._["default"]=this._.initValue=c.items[0][1]);c.validate&&(this.validate=c.validate);var d=[],g=this;c.role="radiogroup";c.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,
b,c,e,function(){for(var a=[],e=[],f=(c.id?c.id:CKEDITOR.tools.getNextId())+"_radio",l=0;l<c.items.length;l++){var w=c.items[l],r=void 0!==w[2]?w[2]:w[0],z=void 0!==w[1]?w[1]:w[0],t=CKEDITOR.tools.getNextId()+"_radio_input",x=t+"_label",t=CKEDITOR.tools.extend({},c,{id:t,title:null,type:null},!0),r=CKEDITOR.tools.extend({},t,{title:r},!0),A={type:"radio","class":"cke_dialog_ui_radio_input",name:f,value:z,"aria-labelledby":x},B=[];g._["default"]==z&&(A.checked="checked");k(t);k(r);"undefined"!=typeof t.inputStyle&&
(t.style=t.inputStyle);t.keyboardFocusable=!0;d.push(new CKEDITOR.ui.dialog.uiElement(b,t,B,"input",null,A));B.push(" ");new CKEDITOR.ui.dialog.uiElement(b,r,B,"label",null,{id:x,"for":A.id},w[0]);a.push(B.join(""))}new CKEDITOR.ui.dialog.hbox(b,d,a,e);return e.join("")});this._.children=d}},button:function(b,c,e){if(arguments.length){"function"==typeof c&&(c=c(b.getParentEditor()));a.call(this,c,{disabled:c.disabled||!1});CKEDITOR.event.implementOn(this);var d=this;b.on("load",function(){var a=this.getElement();
(function(){a.on("click",function(a){d.click();a.data.preventDefault()});a.on("keydown",function(a){a.data.getKeystroke()in{32:1}&&(d.click(),a.data.preventDefault())})})();a.unselectable()},this);var g=CKEDITOR.tools.extend({},c);delete g.style;var f=CKEDITOR.tools.getNextId()+"_label";CKEDITOR.ui.dialog.uiElement.call(this,b,g,e,"a",null,{style:c.style,href:"javascript:void(0)",title:c.label,hidefocus:"true","class":c["class"],role:"button","aria-labelledby":f},'\x3cspan id\x3d"'+f+'" class\x3d"cke_dialog_ui_button"\x3e'+
CKEDITOR.tools.htmlEncode(c.label)+"\x3c/span\x3e")}},select:function(b,c,e){if(!(3>arguments.length)){var d=a.call(this,c);c.validate&&(this.validate=c.validate);d.inputId=CKEDITOR.tools.getNextId()+"_select";CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_select":CKEDITOR.tools.getNextId()+"_select"},!0),e=[],g=[],f={id:d.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
c.type,'" role\x3d"presentation"');c.width&&e.push('style\x3d"width:'+c.width+'" ');e.push("\x3e");void 0!==c.size&&(f.size=c.size);void 0!==c.multiple&&(f.multiple=c.multiple);k(a);for(var l=0,w;l<c.items.length&&(w=c.items[l]);l++)g.push('\x3coption value\x3d"',CKEDITOR.tools.htmlEncode(void 0!==w[1]?w[1]:w[0]).replace(/"/g,"\x26quot;"),'" /\x3e ',CKEDITOR.tools.htmlEncode(w[0]));"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);d.select=new CKEDITOR.ui.dialog.uiElement(b,a,e,"select",null,
f,g.join(""));e.push("\x3c/div\x3e");return e.join("")})}},file:function(b,c,e){if(!(3>arguments.length)){void 0===c["default"]&&(c["default"]="");var d=CKEDITOR.tools.extend(a.call(this,c),{definition:c,buttons:[]});c.validate&&(this.validate=c.validate);b.on("load",function(){CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file")});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){d.frameId=CKEDITOR.tools.getNextId()+"_fileInput";var a=['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
d.frameId,'" title\x3d"',c.label,'" src\x3d"javascript:void('];a.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0");a.push(')"\x3e\x3c/iframe\x3e');return a.join("")})}},fileButton:function(b,c,e){var d=this;if(!(3>arguments.length)){a.call(this,c);c.validate&&(this.validate=c.validate);var g=CKEDITOR.tools.extend({},c),f=g.onClick;g.className=(g.className?g.className+" ":"")+"cke_dialog_ui_button";g.onClick=function(a){var e=
c["for"];a=f?f.call(this,a):!1;!1!==a&&("xhr"!==a&&b.getContentElement(e[0],e[1]).submit(),this.disable())};b.on("load",function(){b.getContentElement(c["for"][0],c["for"][1])._.buttons.push(d)});CKEDITOR.ui.dialog.button.call(this,b,g,e)}},html:function(){var a=/^\s*<[\w:]+\s+([^>]*)?>/,b=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,c=/\/$/;return function(d,g,f){if(!(3>arguments.length)){var k=[],l=g.html;"\x3c"!=l.charAt(0)&&(l="\x3cspan\x3e"+l+"\x3c/span\x3e");var v=g.focus;if(v){var w=this.focus;
this.focus=function(){("function"==typeof v?v:w).call(this);this.fire("focus")};g.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0}CKEDITOR.ui.dialog.uiElement.call(this,d,g,k,"span",null,null,"");k=k.join("").match(a);l=l.match(b)||["","",""];c.test(l[1])&&(l[1]=l[1].slice(0,-1),l[2]="/"+l[2]);f.push([l[1]," ",k[1]||"",l[2]].join(""))}}}(),fieldset:function(a,b,c,d,g){var f=g.label;this._={children:b};CKEDITOR.ui.dialog.uiElement.call(this,a,g,d,"fieldset",null,null,function(){var a=
[];f&&a.push("\x3clegend"+(g.labelStyle?' style\x3d"'+g.labelStyle+'"':"")+"\x3e"+f+"\x3c/legend\x3e");for(var b=0;b<c.length;b++)a.push(c[b]);return a.join("")})}},!0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(a){var b=CKEDITOR.document.getById(this._.labelId);1>b.getChildCount()?(new CKEDITOR.dom.text(a,CKEDITOR.document)).appendTo(b):b.getChild(0).$.nodeValue=
a;return this},getLabel:function(){var a=CKEDITOR.document.getById(this._.labelId);return!a||1>a.getChildCount()?"":a.getChild(0).getText()},eventProcessors:d},!0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){return this._.disabled?!1:this.fire("click",{dialog:this._.dialog})},enable:function(){this._.disabled=!1;var a=this.getElement();a&&a.removeClass("cke_disabled")},disable:function(){this._.disabled=!0;this.getElement().addClass("cke_disabled")},
isVisible:function(){return this.getElement().getFirst().isVisible()},isEnabled:function(){return!this._.disabled},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(a,b){this.on("click",function(){b.apply(this,arguments)})}},!0),accessKeyUp:function(){this.click()},accessKeyDown:function(){this.focus()},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId)},
focus:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&b.$.focus()},0)},select:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&(b.$.focus(),b.$.select())},0)},accessKeyUp:function(){this.select()},setValue:function(a){if(this.bidi){var b=a&&a.charAt(0);(b="‪"==b?"ltr":"‫"==b?"rtl":null)&&(a=a.slice(1));this.setDirectionMarker(b)}a||(a="");return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments)},
getValue:function(){var a=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&a){var b=this.getDirectionMarker();b&&(a=("ltr"==b?"‪":"‫")+a)}return a},setDirectionMarker:function(a){var b=this.getInputElement();a?b.setAttributes({dir:a,"data-cke-dir-marker":a}):this.getDirectionMarker()&&b.removeAttributes(["dir","data-cke-dir-marker"])},getDirectionMarker:function(){return this.getInputElement().data("cke-dir-marker")},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.textarea.prototype=
new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return this._.select.getElement()},add:function(a,b,c){var d=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),g=this.getInputElement().$;d.$.text=a;d.$.value=void 0===b||null===b?a:b;void 0===c||null===c?CKEDITOR.env.ie?g.add(d.$):g.add(d.$,null):g.add(d.$,c);return this},remove:function(a){this.getInputElement().$.remove(a);
return this},clear:function(){for(var a=this.getInputElement().$;0<a.length;)a.remove(0);return this},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){return this._.checkbox.getElement()},setValue:function(a,b){this.getInputElement().$.checked=a;!b&&this.fire("change",{value:a})},getValue:function(){return this.getInputElement().$.checked},accessKeyUp:function(){this.setValue(!this.getValue())},eventProcessors:{onChange:function(a,
b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return d.onChange.apply(this,arguments);a.on("load",function(){var a=this._.checkbox.getElement();a.on("propertychange",function(b){b=b.data.$;"checked"==b.propertyName&&this.fire("change",{value:a.$.checked})},this)},this);this.on("change",b);return null}},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(a,b){for(var c=this._.children,d,g=0;g<c.length&&(d=c[g]);g++)d.getElement().$.checked=
d.getValue()==a;!b&&this.fire("change",{value:a})},getValue:function(){for(var a=this._.children,b=0;b<a.length;b++)if(a[b].getElement().$.checked)return a[b].getValue();return null},accessKeyUp:function(){var a=this._.children,b;for(b=0;b<a.length;b++)if(a[b].getElement().$.checked){a[b].getElement().focus();return}a[0].getElement().focus()},eventProcessors:{onChange:function(a,b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return d.onChange.apply(this,arguments);a.on("load",function(){for(var a=
this._.children,b=this,c=0;c<a.length;c++)a[c].getElement().on("propertychange",function(a){a=a.data.$;"checked"==a.propertyName&&this.$.checked&&b.fire("change",{value:this.getAttribute("value")})})},this);this.on("change",b);return null}}},c,!0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,c,{getInputElement:function(){var a=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<a.$.forms.length?new CKEDITOR.dom.element(a.$.forms[0].elements[0]):
this.getElement()},submit:function(){this.getInputElement().getParent().$.submit();return this},getAction:function(){return this.getInputElement().getParent().$.action},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,d=function(a,b,c,e){a.on("formLoaded",function(){a.getInputElement().on(c,e,a)})},g;for(g in a)if(c=g.match(b))this.eventProcessors[g]?this.eventProcessors[g].call(this,this._.dialog,a[g]):d(this,this._.dialog,c[1].toLowerCase(),a[g]);return this},reset:function(){function a(){c.$.open();
var h="";d.size&&(h=d.size-(CKEDITOR.env.ie?7:0));var r=b.frameId+"_input";c.$.write(['\x3chtml dir\x3d"'+l+'" lang\x3d"'+v+'"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e','\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"'+l+'" lang\x3d"'+v+'" action\x3d"',CKEDITOR.tools.htmlEncode(d.action),'"\x3e\x3clabel id\x3d"',b.labelId,'" for\x3d"',r,'" style\x3d"display:none"\x3e',CKEDITOR.tools.htmlEncode(d.label),
'\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"',r,'" aria-labelledby\x3d"',b.labelId,'" type\x3d"file" name\x3d"',CKEDITOR.tools.htmlEncode(d.id||"cke_upload"),'" size\x3d"',CKEDITOR.tools.htmlEncode(0<h?h:""),'" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+f+");","window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction("+k+")}","\x3c/script\x3e"].join(""));
c.$.close();for(h=0;h<g.length;h++)g[h].enable()}var b=this._,c=CKEDITOR.document.getById(b.frameId).getFrameDocument(),d=b.definition,g=b.buttons,f=this.formLoadedNumber,k=this.formUnloadNumber,l=b.dialog._.editor.lang.dir,v=b.dialog._.editor.langCode;f||(f=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire("formLoaded")},this),k=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData()},this),this.getDialog()._.editor.on("destroy",function(){CKEDITOR.tools.removeFunction(f);
CKEDITOR.tools.removeFunction(k)}));CKEDITOR.env.gecko?setTimeout(a,500):a()},getValue:function(){return this.getInputElement().$.value||""},setInitValue:function(){this._.initValue=""},eventProcessors:{onChange:function(a,b){this._.domOnChangeRegistered||(this.on("formLoaded",function(){this.getInputElement().on("change",function(){this.fire("change",{value:this.getValue()})},this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.fileButton.prototype=
new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement("text",f);CKEDITOR.dialog.addUIElement("password",f);CKEDITOR.dialog.addUIElement("tel",f);CKEDITOR.dialog.addUIElement("textarea",b);CKEDITOR.dialog.addUIElement("checkbox",b);CKEDITOR.dialog.addUIElement("radio",b);CKEDITOR.dialog.addUIElement("button",b);CKEDITOR.dialog.addUIElement("select",b);CKEDITOR.dialog.addUIElement("file",b);CKEDITOR.dialog.addUIElement("fileButton",
b);CKEDITOR.dialog.addUIElement("html",b);CKEDITOR.dialog.addUIElement("fieldset",{build:function(a,b,c){for(var d=b.children,g,f=[],k=[],l=0;l<d.length&&(g=d[l]);l++){var v=[];f.push(v);k.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a,g,v))}return new CKEDITOR.ui.dialog[b.type](a,k,f,c,b)}})}}),CKEDITOR.DIALOG_RESIZE_NONE=0,CKEDITOR.DIALOG_RESIZE_WIDTH=1,CKEDITOR.DIALOG_RESIZE_HEIGHT=2,CKEDITOR.DIALOG_RESIZE_BOTH=3,CKEDITOR.DIALOG_STATE_IDLE=1,CKEDITOR.DIALOG_STATE_BUSY=2,function(){function a(){for(var a=
this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId)+a,c=b-1;c>b-a;c--)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function f(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId),c=b+1;c<b+a;c++)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function b(a,b){for(var c=a.$.getElementsByTagName("input"),e=0,d=c.length;e<
d;e++){var g=new CKEDITOR.dom.element(c[e]);"text"==g.getAttribute("type").toLowerCase()&&(b?(g.setAttribute("value",g.getCustomData("fake_value")||""),g.removeCustomData("fake_value")):(g.setCustomData("fake_value",g.getAttribute("value")),g.setAttribute("value","")))}}function c(a,b){var c=this.getInputElement();c&&(a?c.removeAttribute("aria-invalid"):c.setAttribute("aria-invalid",!0));a||(this.select?this.select():this.focus());b&&alert(b);this.fire("validated",{valid:a,msg:b})}function d(){var a=
this.getInputElement();a&&a.removeAttribute("aria-invalid")}function l(a){var b=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",p).output({id:CKEDITOR.tools.getNextNumber(),editorId:a.id,langDir:a.lang.dir,langCode:a.langCode,editorDialogClass:"cke_editor_"+a.name.replace(/\./g,"\\.")+"_dialog",closeTitle:a.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),c=b.getChild([0,0,0,0,0]),e=c.getChild(0),d=c.getChild(1);a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
!CKEDITOR.env.ie||CKEDITOR.env.quirks||CKEDITOR.env.edge||(a="javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())",CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"'+a+'" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));e.unselectable();d.unselectable();return{element:b,parts:{dialog:b.getChild(0),title:e,close:d,tabs:c.getChild(2),contents:c.getChild([3,0,0,0]),
footer:c.getChild([3,0,1,0])}}}function k(a,b,c){this.element=b;this.focusIndex=c;this.tabIndex=0;this.isFocusable=function(){return!b.getAttribute("disabled")&&b.isVisible()};this.focus=function(){a._.currentFocusIndex=this.focusIndex;this.element.focus()};b.on("keydown",function(a){a.data.getKeystroke()in{32:1,13:1}&&this.fire("click")});b.on("focus",function(){this.fire("mouseover")});b.on("blur",function(){this.fire("mouseout")})}function g(a){function b(){a.layout()}var c=CKEDITOR.document.getWindow();
c.on("resize",b);a.on("hide",function(){c.removeListener("resize",b)})}function h(a,b){this._={dialog:a};CKEDITOR.tools.extend(this,b)}function m(a){function b(c){var k=a.getSize(),l=CKEDITOR.document.getWindow().getViewPaneSize(),m=c.data.$.screenX,n=c.data.$.screenY,r=m-e.x,t=n-e.y;e={x:m,y:n};d.x+=r;d.y+=t;a.move(d.x+h[3]<f?-h[3]:d.x-h[1]>l.width-k.width-f?l.width-k.width+("rtl"==g.lang.dir?0:h[1]):d.x,d.y+h[0]<f?-h[0]:d.y-h[2]>l.height-k.height-f?l.height-k.height+h[2]:d.y,1);c.data.preventDefault()}
function c(){CKEDITOR.document.removeListener("mousemove",b);CKEDITOR.document.removeListener("mouseup",c);if(CKEDITOR.env.ie6Compat){var a=B.getChild(0).getFrameDocument();a.removeListener("mousemove",b);a.removeListener("mouseup",c)}}var e=null,d=null,g=a.getParentEditor(),f=g.config.dialog_magnetDistance,h=CKEDITOR.skin.margins||[0,0,0,0];"undefined"==typeof f&&(f=20);a.parts.title.on("mousedown",function(g){e={x:g.data.$.screenX,y:g.data.$.screenY};CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",
c);d=a.getPosition();if(CKEDITOR.env.ie6Compat){var f=B.getChild(0).getFrameDocument();f.on("mousemove",b);f.on("mouseup",c)}g.data.preventDefault()},a)}function e(a){function b(c){var n="rtl"==g.lang.dir,r=m.width,t=m.height,v=r+(c.data.$.screenX-l.x)*(n?-1:1)*(a._.moved?1:2),q=t+(c.data.$.screenY-l.y)*(a._.moved?1:2),w=a._.element.getFirst(),w=n&&w.getComputedStyle("right"),z=a.getPosition();z.y+q>k.height&&(q=k.height-z.y);(n?w:z.x)+v>k.width&&(v=k.width-(n?w:z.x));if(d==CKEDITOR.DIALOG_RESIZE_WIDTH||
d==CKEDITOR.DIALOG_RESIZE_BOTH)r=Math.max(e.minWidth||0,v-f);if(d==CKEDITOR.DIALOG_RESIZE_HEIGHT||d==CKEDITOR.DIALOG_RESIZE_BOTH)t=Math.max(e.minHeight||0,q-h);a.resize(r,t);a._.moved||a.layout();c.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mouseup",c);CKEDITOR.document.removeListener("mousemove",b);n&&(n.remove(),n=null);if(CKEDITOR.env.ie6Compat){var a=B.getChild(0).getFrameDocument();a.removeListener("mouseup",c);a.removeListener("mousemove",b)}}var e=a.definition,d=e.resizable;
if(d!=CKEDITOR.DIALOG_RESIZE_NONE){var g=a.getParentEditor(),f,h,k,l,m,n,r=CKEDITOR.tools.addFunction(function(e){m=a.getSize();var d=a.parts.contents;d.$.getElementsByTagName("iframe").length&&(n=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'),d.append(n));h=m.height-a.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));f=m.width-a.parts.contents.getSize("width",
1);l={x:e.screenX,y:e.screenY};k=CKEDITOR.document.getWindow().getViewPaneSize();CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);CKEDITOR.env.ie6Compat&&(d=B.getChild(0).getFrameDocument(),d.on("mousemove",b),d.on("mouseup",c));e.preventDefault&&e.preventDefault()});a.on("load",function(){var b="";d==CKEDITOR.DIALOG_RESIZE_WIDTH?b=" cke_resizer_horizontal":d==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=" cke_resizer_vertical");b=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer'+
b+" cke_resizer_"+g.lang.dir+'" title\x3d"'+CKEDITOR.tools.htmlEncode(g.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+r+', event )"\x3e'+("ltr"==g.lang.dir?"◢":"◣")+"\x3c/div\x3e");a.parts.footer.append(b,1)});g.on("destroy",function(){CKEDITOR.tools.removeFunction(r)})}}function n(a){a.data.preventDefault(1)}function q(a){var b=CKEDITOR.document.getWindow(),c=a.config,e=CKEDITOR.skinName||a.config.skin,d=c.dialog_backgroundCoverColor||("moono-lisa"==e?"black":"white"),e=c.dialog_backgroundCoverOpacity,
g=c.baseFloatZIndex,c=CKEDITOR.tools.genKey(d,e,g),f=A[c];f?f.show():(g=['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ',CKEDITOR.env.ie6Compat?"absolute":"fixed","; z-index: ",g,"; top: 0px; left: 0px; ",CKEDITOR.env.ie6Compat?"":"background-color: "+d,'" class\x3d"cke_dialog_background_cover"\x3e'],CKEDITOR.env.ie6Compat&&(d="\x3chtml\x3e\x3cbody style\x3d\\'background-color:"+d+";\\'\x3e\x3c/body\x3e\x3c/html\x3e",g.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
g.push("void((function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.write( '"+d+"' );document.close();")+"})())"),g.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),g.push("\x3c/div\x3e"),f=CKEDITOR.dom.element.createFromHtml(g.join("")),f.setOpacity(void 0!==e?e:.5),f.on("keydown",n),f.on("keypress",n),f.on("keyup",n),f.appendTo(CKEDITOR.document.getBody()),
A[c]=f);a.focusManager.add(f);B=f;a=function(){var a=b.getViewPaneSize();f.setStyles({width:a.width+"px",height:a.height+"px"})};var h=function(){var a=b.getScrollPosition(),c=CKEDITOR.dialog._.currentTop;f.setStyles({left:a.x+"px",top:a.y+"px"});if(c){do a=c.getPosition(),c.move(a.x,a.y);while(c=c._.parentDialog)}};x=a;b.on("resize",a);a();CKEDITOR.env.mac&&CKEDITOR.env.webkit||f.focus();if(CKEDITOR.env.ie6Compat){var k=function(){h();k.prevScrollHandler.apply(this,arguments)};b.$.setTimeout(function(){k.prevScrollHandler=
window.onscroll||function(){};window.onscroll=k},0);h()}}function y(a){B&&(a.focusManager.remove(B),a=CKEDITOR.document.getWindow(),B.hide(),B=null,a.removeListener("resize",x),CKEDITOR.env.ie6Compat&&a.$.setTimeout(function(){window.onscroll=window.onscroll&&window.onscroll.prevScrollHandler||null},0),x=null)}var u=CKEDITOR.tools.cssLength,p='\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog '+
CKEDITOR.env.cssClass+' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
CKEDITOR.dialog=function(b,g){function h(){var a=x._.focusList;a.sort(function(a,b){return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex});for(var b=a.length,c=0;c<b;c++)a[c].focusIndex=c}function k(a){var b=x._.focusList;a=a||0;if(!(1>b.length)){var c=x._.currentFocusIndex;x._.tabBarMode&&0>a&&(c=0);try{b[c].getInputElement().$.blur()}catch(e){}var d=c,g=1<x._.pageCount;do{d+=a;if(g&&!x._.tabBarMode&&(d==b.length||-1==d)){x._.tabBarMode=!0;x._.tabs[x._.currentTabId][0].focus();
x._.currentFocusIndex=-1;return}d=(d+b.length)%b.length;if(d==c)break}while(a&&!b[d].isFocusable());b[d].focus();"text"==b[d].type&&b[d].select()}}function n(c){if(x==CKEDITOR.dialog._.currentTop){var e=c.data.getKeystroke(),d="rtl"==b.lang.dir,g=[37,38,39,40];u=p=0;if(9==e||e==CKEDITOR.SHIFT+9)k(e==CKEDITOR.SHIFT+9?-1:1),u=1;else if(e==CKEDITOR.ALT+121&&!x._.tabBarMode&&1<x.getPageCount())x._.tabBarMode=!0,x._.tabs[x._.currentTabId][0].focus(),x._.currentFocusIndex=-1,u=1;else if(-1!=CKEDITOR.tools.indexOf(g,
e)&&x._.tabBarMode)e=-1!=CKEDITOR.tools.indexOf([d?39:37,38],e)?a.call(x):f.call(x),x.selectPage(e),x._.tabs[e][0].focus(),u=1;else if(13!=e&&32!=e||!x._.tabBarMode)if(13==e)e=c.data.getTarget(),e.is("a","button","select","textarea")||e.is("input")&&"button"==e.$.type||((e=this.getButton("ok"))&&CKEDITOR.tools.setTimeout(e.click,0,e),u=1),p=1;else if(27==e)(e=this.getButton("cancel"))?CKEDITOR.tools.setTimeout(e.click,0,e):!1!==this.fire("cancel",{hide:!0}).hide&&this.hide(),p=1;else return;else this.selectPage(this._.currentTabId),
this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1),u=1;r(c)}}function r(a){u?a.data.preventDefault(1):p&&a.data.stopPropagation()}var q=CKEDITOR.dialog._.dialogDefinitions[g],w=CKEDITOR.tools.clone(v),z=b.config.dialog_buttonsOrder||"OS",A=b.lang.dir,B={},u,p;("OS"==z&&CKEDITOR.env.mac||"rtl"==z&&"ltr"==A||"ltr"==z&&"rtl"==A)&&w.buttons.reverse();q=CKEDITOR.tools.extend(q(b),w);q=CKEDITOR.tools.clone(q);q=new t(this,q);w=l(b);this._={editor:b,element:w.element,name:g,contentSize:{width:0,height:0},
size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],currentFocusIndex:0,hasFocus:!1};this.parts=w.parts;CKEDITOR.tools.setTimeout(function(){b.fire("ariaWidget",this.parts.contents)},0,this);w={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};w["rtl"==A?"right":"left"]=0;this.parts.dialog.setStyles(w);CKEDITOR.event.call(this);this.definition=q=CKEDITOR.fire("dialogDefinition",
{name:g,definition:q},b).definition;if(!("removeDialogTabs"in b._)&&b.config.removeDialogTabs){w=b.config.removeDialogTabs.split(";");for(A=0;A<w.length;A++)if(z=w[A].split(":"),2==z.length){var y=z[0];B[y]||(B[y]=[]);B[y].push(z[1])}b._.removeDialogTabs=B}if(b._.removeDialogTabs&&(B=b._.removeDialogTabs[g]))for(A=0;A<B.length;A++)q.removeContents(B[A]);if(q.onLoad)this.on("load",q.onLoad);if(q.onShow)this.on("show",q.onShow);if(q.onHide)this.on("hide",q.onHide);if(q.onOk)this.on("ok",function(a){b.fire("saveSnapshot");
setTimeout(function(){b.fire("saveSnapshot")},0);!1===q.onOk.call(this,a)&&(a.data.hide=!1)});this.state=CKEDITOR.DIALOG_STATE_IDLE;if(q.onCancel)this.on("cancel",function(a){!1===q.onCancel.call(this,a)&&(a.data.hide=!1)});var x=this,M=function(a){var b=x._.contents,c=!1,e;for(e in b)for(var d in b[e])if(c=a.call(this,b[e][d]))return};this.on("ok",function(a){M(function(b){if(b.validate){var e=b.validate(this),d="string"==typeof e||!1===e;d&&(a.data.hide=!1,a.stop());c.call(b,!d,"string"==typeof e?
e:void 0);return d}})},this,null,0);this.on("cancel",function(a){M(function(c){if(c.isChanged())return b.config.dialog_noConfirmCancel||confirm(b.lang.common.confirmCancel)||(a.data.hide=!1),!0})},this,null,0);this.parts.close.on("click",function(a){!1!==this.fire("cancel",{hide:!0}).hide&&this.hide();a.data.preventDefault()},this);this.changeFocus=k;var C=this._.element;b.focusManager.add(C,1);this.on("show",function(){C.on("keydown",n,this);if(CKEDITOR.env.gecko)C.on("keypress",r,this)});this.on("hide",
function(){C.removeListener("keydown",n);CKEDITOR.env.gecko&&C.removeListener("keypress",r);M(function(a){d.apply(a)})});this.on("iframeAdded",function(a){(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",n,this,null,0)});this.on("show",function(){h();var a=1<x._.pageCount;b.config.dialog_startupFocusTab&&a?(x._.tabBarMode=!0,x._.tabs[x._.currentTabId][0].focus(),x._.currentFocusIndex=-1):this._.hasFocus||(this._.currentFocusIndex=a?-1:this._.focusList.length-1,q.onFocus?
(a=q.onFocus.call(this))&&a.focus():k(1))},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on("load",function(){var a=this.getElement(),b=a.getFirst();b.remove();b.appendTo(a)},this);m(this);e(this);(new CKEDITOR.dom.text(q.title,CKEDITOR.document)).appendTo(this.parts.title);for(A=0;A<q.contents.length;A++)(B=q.contents[A])&&this.addPage(B);this.parts.tabs.on("click",function(a){var b=a.data.getTarget();b.hasClass("cke_dialog_tab")&&(b=b.$.id,this.selectPage(b.substring(4,b.lastIndexOf("_"))),
this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1)),a.data.preventDefault())},this);A=[];B=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:q.buttons},A).getChild();this.parts.footer.setHtml(A.join(""));for(A=0;A<B.length;A++)this._.buttons[B[A].id]=B[A]};CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove()},resize:function(){return function(a,b){this._.contentSize&&this._.contentSize.width==
a&&this._.contentSize.height==b||(CKEDITOR.dialog.fire("resize",{dialog:this,width:a,height:b},this._.editor),this.fire("resize",{width:a,height:b},this._.editor),this.parts.contents.setStyles({width:a+"px",height:b+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:a,height:b})}}(),getSize:function(){var a=this._.element.getFirst();
return{width:a.$.offsetWidth||0,height:a.$.offsetHeight||0}},move:function(a,b,c){var e=this._.element.getFirst(),d="rtl"==this._.editor.lang.dir,g="fixed"==e.getComputedStyle("position");CKEDITOR.env.ie&&e.setStyle("zoom","100%");g&&this._.position&&this._.position.x==a&&this._.position.y==b||(this._.position={x:a,y:b},g||(g=CKEDITOR.document.getWindow().getScrollPosition(),a+=g.x,b+=g.y),d&&(g=this.getSize(),a=CKEDITOR.document.getWindow().getViewPaneSize().width-g.width-a),b={top:(0<b?b:0)+"px"},
b[d?"right":"left"]=(0<a?a:0)+"px",e.setStyles(b),c&&(this._.moved=1))},getPosition:function(){return CKEDITOR.tools.extend({},this._.position)},show:function(){var a=this._.element,b=this.definition;a.getParent()&&a.getParent().equals(CKEDITOR.document.getBody())?a.setStyle("display","block"):a.appendTo(CKEDITOR.document.getBody());this.resize(this._.contentSize&&this._.contentSize.width||b.width||b.minWidth,this._.contentSize&&this._.contentSize.height||b.height||b.minHeight);this.reset();null===
this._.currentTabId&&this.selectPage(this.definition.contents[0].id);null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex);this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this,this._.parentDialog=null,q(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop,this._.parentDialog.getElement().getFirst().$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/
2),CKEDITOR.dialog._.currentTop=this);a.on("keydown",H);a.on("keyup",F);this._.hasFocus=!1;for(var c in b.contents)if(b.contents[c]){var a=b.contents[c],e=this._.tabs[a.id],d=a.requiredContent,f=0;if(e){for(var h in this._.contents[a.id]){var k=this._.contents[a.id][h];"hbox"!=k.type&&"vbox"!=k.type&&k.getInputElement()&&(k.requiredContent&&!this._.editor.activeFilter.check(k.requiredContent)?k.disable():(k.enable(),f++))}!f||d&&!this._.editor.activeFilter.check(d)?e[0].addClass("cke_dialog_tab_disabled"):
e[0].removeClass("cke_dialog_tab_disabled")}}CKEDITOR.tools.setTimeout(function(){this.layout();g(this);this.parts.dialog.setStyle("visibility","");this.fireOnce("load",{});CKEDITOR.ui.fire("ready",this);this.fire("show",{});this._.editor.fire("dialogShow",this);this._.parentDialog||this._.editor.focusManager.lock();this.foreach(function(a){a.setInitValue&&a.setInitValue()})},100,this)},layout:function(){var a=this.parts.dialog,b=this.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),e=
(c.width-b.width)/2,d=(c.height-b.height)/2;CKEDITOR.env.ie6Compat||(b.height+(0<d?d:0)>c.height||b.width+(0<e?e:0)>c.width?a.setStyle("position","absolute"):a.setStyle("position","fixed"));this.move(this._.moved?this._.position.x:e,this._.moved?this._.position.y:d)},foreach:function(a){for(var b in this._.contents)for(var c in this._.contents[b])a.call(this,this._.contents[b][c]);return this},reset:function(){var a=function(a){a.reset&&a.reset(1)};return function(){this.foreach(a);return this}}(),
setupContent:function(){var a=arguments;this.foreach(function(b){b.setup&&b.setup.apply(b,a)})},commitContent:function(){var a=arguments;this.foreach(function(b){CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b,a)})},hide:function(){if(this.parts.dialog.isVisible()){this.fire("hide",{});this._.editor.fire("dialogHide",this);this.selectPage(this._.tabIdList[0]);var a=this._.element;a.setStyle("display","none");this.parts.dialog.setStyle("visibility",
"hidden");for(J(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();if(this._.parentDialog){var b=this._.parentDialog.getElement().getFirst();b.setStyle("z-index",parseInt(b.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2))}else y(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=10;else{CKEDITOR.dialog._.currentZIndex=null;a.removeListener("keydown",H);a.removeListener("keyup",F);var c=this._.editor;
c.focus();setTimeout(function(){c.focusManager.unlock();CKEDITOR.env.iOS&&c.window.focus()},0)}delete this._.parentDialog;this.foreach(function(a){a.resetInitValue&&a.resetInitValue()});this.setState(CKEDITOR.DIALOG_STATE_IDLE)}},addPage:function(a){if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){for(var b=[],c=a.label?' title\x3d"'+CKEDITOR.tools.htmlEncode(a.label)+'"':"",e=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:"vbox",className:"cke_dialog_page_contents",
children:a.elements,expand:!!a.expand,padding:a.padding,style:a.style||"width: 100%;"},b),d=this._.contents[a.id]={},g=e.getChild(),f=0;e=g.shift();)e.notAllowed||"hbox"==e.type||"vbox"==e.type||f++,d[e.id]=e,"function"==typeof e.getChild&&g.push.apply(g,e.getChild());f||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(""));b.setAttribute("role","tabpanel");e=CKEDITOR.env;d="cke_"+a.id+"_"+CKEDITOR.tools.getNextNumber();c=CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
0<this._.pageCount?" cke_last":"cke_first",c,a.hidden?' style\x3d"display:none"':"",' id\x3d"',d,'"',e.gecko&&!e.hc?"":' href\x3d"javascript:void(0)"',' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e',a.label,"\x3c/a\x3e"].join(""));b.setAttribute("aria-labelledby",d);this._.tabs[a.id]=[c,b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;this._.lastTab=c;this.updateStyle();b.setAttribute("name",a.id);b.appendTo(this.parts.contents);c.unselectable();this.parts.tabs.append(c);a.accessKey&&
(I(this,this,"CTRL+"+a.accessKey,L,E),this._.accessKeyMap["CTRL+"+a.accessKey]=a.id)}},selectPage:function(a){if(this._.currentTabId!=a&&!this._.tabs[a][0].hasClass("cke_dialog_tab_disabled")&&!1!==this.fire("selectPage",{page:a,currentPage:this._.currentTabId})){for(var c in this._.tabs){var e=this._.tabs[c][0],d=this._.tabs[c][1];c!=a&&(e.removeClass("cke_dialog_tab_selected"),d.hide());d.setAttribute("aria-hidden",c!=a)}var g=this._.tabs[a];g[0].addClass("cke_dialog_tab_selected");CKEDITOR.env.ie6Compat||
CKEDITOR.env.ie7Compat?(b(g[1]),g[1].show(),setTimeout(function(){b(g[1],1)},0)):g[1].show();this._.currentTabId=a;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,a)}},updateStyle:function(){this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page")},hidePage:function(b){var c=this._.tabs[b]&&this._.tabs[b][0];c&&1!=this._.pageCount&&c.isVisible()&&(b==this._.currentTabId&&this.selectPage(a.call(this)),c.hide(),this._.pageCount--,this.updateStyle())},showPage:function(a){if(a=
this._.tabs[a]&&this._.tabs[a][0])a.show(),this._.pageCount++,this.updateStyle()},getElement:function(){return this._.element},getName:function(){return this._.name},getContentElement:function(a,b){var c=this._.contents[a];return c&&c[b]},getValueOf:function(a,b){return this.getContentElement(a,b).getValue()},setValueOf:function(a,b,c){return this.getContentElement(a,b).setValue(c)},getButton:function(a){return this._.buttons[a]},click:function(a){return this._.buttons[a].click()},disableButton:function(a){return this._.buttons[a].disable()},
enableButton:function(a){return this._.buttons[a].enable()},getPageCount:function(){return this._.pageCount},getParentEditor:function(){return this._.editor},getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement()},addFocusable:function(a,b){if("undefined"==typeof b)b=this._.focusList.length,this._.focusList.push(new k(this,a,b));else{this._.focusList.splice(b,0,new k(this,a,b));for(var c=b+1;c<this._.focusList.length;c++)this._.focusList[c].focusIndex++}},
setState:function(a){if(this.state!=a){this.state=a;if(a==CKEDITOR.DIALOG_STATE_BUSY){if(!this.parts.spinner){var b=this.getParentEditor().lang.dir,c={attributes:{"class":"cke_dialog_spinner"},styles:{"float":"rtl"==b?"right":"left"}};c.styles["margin-"+("rtl"==b?"left":"right")]="8px";this.parts.spinner=CKEDITOR.document.createElement("div",c);this.parts.spinner.setHtml("\x26#8987;");this.parts.spinner.appendTo(this.parts.title,1)}this.parts.spinner.show();this.getButton("ok").disable()}else a==
CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(),this.getButton("ok").enable());this.fire("state",a)}}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(a,b){this._.dialogDefinitions[a]&&"function"!=typeof b||(this._.dialogDefinitions[a]=b)},exists:function(a){return!!this._.dialogDefinitions[a]},getCurrent:function(){return CKEDITOR.dialog._.currentTop},isTabEnabled:function(a,b,c){a=a.config.removeDialogTabs;return!(a&&a.match(new RegExp("(?:^|;)"+b+":"+c+"(?:$|;)",
"i")))},okButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"ok",type:"button",label:a.lang.common.ok,"class":"cke_dialog_ui_button_ok",onClick:function(a){a=a.data.dialog;!1!==a.fire("ok",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),cancelButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"cancel",type:"button",label:a.lang.common.cancel,
"class":"cke_dialog_ui_button_cancel",onClick:function(a){a=a.data.dialog;!1!==a.fire("cancel",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),addUIElement:function(a,b){this._.uiElementBuilders[a]=b}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
var v={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},w=function(a,b,c){for(var e=0,d;d=a[e];e++)if(d.id==b||c&&d[c]&&(d=w(d[c],b,c)))return d;return null},r=function(a,b,c,e,d){if(c){for(var g=0,f;f=a[g];g++){if(f.id==c)return a.splice(g,0,b),b;if(e&&f[e]&&(f=r(f[e],b,c,e,!0)))return f}if(d)return null}a.push(b);return b},z=function(a,b,c){for(var e=0,d;d=a[e];e++){if(d.id==b)return a.splice(e,1);if(c&&d[c]&&(d=z(d[c],
b,c)))return d}return null},t=function(a,b){this.dialog=a;for(var c=b.contents,e=0,d;d=c[e];e++)c[e]=d&&new h(a,d);CKEDITOR.tools.extend(this,b)};t.prototype={getContents:function(a){return w(this.contents,a)},getButton:function(a){return w(this.buttons,a)},addContents:function(a,b){return r(this.contents,a,b)},addButton:function(a,b){return r(this.buttons,a,b)},removeContents:function(a){z(this.contents,a)},removeButton:function(a){z(this.buttons,a)}};h.prototype={get:function(a){return w(this.elements,
a,"children")},add:function(a,b){return r(this.elements,a,b,"children")},remove:function(a){z(this.elements,a,"children")}};var x,A={},B,C={},H=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,e=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);(b=C[(b?"CTRL+":"")+(c?"ALT+":"")+(e?"SHIFT+":"")+d])&&b.length&&(b=b[b.length-1],b.keydown&&b.keydown.call(b.uiElement,b.dialog,b.key),a.data.preventDefault())},F=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,
e=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);(b=C[(b?"CTRL+":"")+(c?"ALT+":"")+(e?"SHIFT+":"")+d])&&b.length&&(b=b[b.length-1],b.keyup&&(b.keyup.call(b.uiElement,b.dialog,b.key),a.data.preventDefault()))},I=function(a,b,c,e,d){(C[c]||(C[c]=[])).push({uiElement:a,dialog:b,key:c,keyup:d||a.accessKeyUp,keydown:e||a.accessKeyDown})},J=function(a){for(var b in C){for(var c=C[b],e=c.length-1;0<=e;e--)c[e].dialog!=a&&c[e].uiElement!=a||c.splice(e,1);0===c.length&&delete C[b]}},E=function(a,
b){a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b])},L=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(a,b,c,e,d,g,f){if(!(4>arguments.length)){var h=(e.call?e(b):e)||"div",k=["\x3c",h," "],l=(d&&d.call?d(b):d)||{},m=(g&&g.call?g(b):g)||{},n=(f&&f.call?f.call(this,a,b):f)||"",r=this.domId=m.id||CKEDITOR.tools.getNextId()+"_uiElement";b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(l.display="none",this.notAllowed=!0);m.id=r;var q={};b.type&&(q["cke_dialog_ui_"+
b.type]=1);b.className&&(q[b.className]=1);b.disabled&&(q.cke_disabled=1);for(var t=m["class"]&&m["class"].split?m["class"].split(" "):[],r=0;r<t.length;r++)t[r]&&(q[t[r]]=1);t=[];for(r in q)t.push(r);m["class"]=t.join(" ");b.title&&(m.title=b.title);q=(b.style||"").split(";");b.align&&(t=b.align,l["margin-left"]="left"==t?0:"auto",l["margin-right"]="right"==t?0:"auto");for(r in l)q.push(r+":"+l[r]);b.hidden&&q.push("display:none");for(r=q.length-1;0<=r;r--)""===q[r]&&q.splice(r,1);0<q.length&&(m.style=
(m.style?m.style+"; ":"")+q.join("; "));for(r in m)k.push(r+'\x3d"'+CKEDITOR.tools.htmlEncode(m[r])+'" ');k.push("\x3e",n,"\x3c/",h,"\x3e");c.push(k.join(""));(this._||(this._={})).dialog=a;"boolean"==typeof b.isChanged&&(this.isChanged=function(){return b.isChanged});"function"==typeof b.isChanged&&(this.isChanged=b.isChanged);"function"==typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(a){return function(c){a.call(this,b.setValue.call(this,c))}}));"function"==typeof b.getValue&&
(this.getValue=CKEDITOR.tools.override(this.getValue,function(a){return function(){return b.getValue.call(this,a.call(this))}}));CKEDITOR.event.implementOn(this);this.registerEvents(b);this.accessKeyUp&&this.accessKeyDown&&b.accessKey&&I(this,a,"CTRL+"+b.accessKey);var v=this;a.on("load",function(){var b=v.getInputElement();if(b){var c=v.type in{checkbox:1,ratio:1}&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?"cke_dialog_ui_focused":"";b.on("focus",function(){a._.tabBarMode=!1;a._.hasFocus=!0;v.fire("focus");
c&&this.addClass(c)});b.on("blur",function(){v.fire("blur");c&&this.removeClass(c)})}});CKEDITOR.tools.extend(this,b);this.keyboardFocusable&&(this.tabIndex=b.tabIndex||0,this.focusIndex=a._.focusList.push(this)-1,this.on("focus",function(){a._.currentFocusIndex=v.focusIndex}))}},hbox:function(a,b,c,e,d){if(!(4>arguments.length)){this._||(this._={});var g=this._.children=b,f=d&&d.widths||null,h=d&&d.height||null,k,l={role:"presentation"};d&&d.align&&(l.align=d.align);CKEDITOR.ui.dialog.uiElement.call(this,
a,d||{type:"hbox"},e,"table",{},l,function(){var a=['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];for(k=0;k<c.length;k++){var b="cke_dialog_ui_hbox_child",e=[];0===k&&(b="cke_dialog_ui_hbox_first");k==c.length-1&&(b="cke_dialog_ui_hbox_last");a.push('\x3ctd class\x3d"',b,'" role\x3d"presentation" ');f?f[k]&&e.push("width:"+u(f[k])):e.push("width:"+Math.floor(100/c.length)+"%");h&&e.push("height:"+u(h));d&&void 0!==d.padding&&e.push("padding:"+u(d.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&
g[k].align&&e.push("text-align:"+g[k].align);0<e.length&&a.push('style\x3d"'+e.join("; ")+'" ');a.push("\x3e",c[k],"\x3c/td\x3e")}a.push("\x3c/tr\x3e\x3c/tbody\x3e");return a.join("")})}},vbox:function(a,b,c,e,d){if(!(3>arguments.length)){this._||(this._={});var g=this._.children=b,f=d&&d.width||null,h=d&&d.heights||null;CKEDITOR.ui.dialog.uiElement.call(this,a,d||{type:"vbox"},e,"div",null,{role:"presentation"},function(){var b=['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
b.push('style\x3d"');d&&d.expand&&b.push("height:100%;");b.push("width:"+u(f||"100%"),";");CKEDITOR.env.webkit&&b.push("float:none;");b.push('"');b.push('align\x3d"',CKEDITOR.tools.htmlEncode(d&&d.align||("ltr"==a.getParentEditor().lang.dir?"left":"right")),'" ');b.push("\x3e\x3ctbody\x3e");for(var e=0;e<c.length;e++){var k=[];b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');f&&k.push("width:"+u(f||"100%"));h?k.push("height:"+u(h[e])):d&&d.expand&&k.push("height:"+Math.floor(100/c.length)+"%");
d&&void 0!==d.padding&&k.push("padding:"+u(d.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&g[e].align&&k.push("text-align:"+g[e].align);0<k.length&&b.push('style\x3d"',k.join("; "),'" ');b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e',c[e],"\x3c/td\x3e\x3c/tr\x3e")}b.push("\x3c/tbody\x3e\x3c/table\x3e");return b.join("")})}}}})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId)},getInputElement:function(){return this.getElement()},getDialog:function(){return this._.dialog},
setValue:function(a,b){this.getInputElement().setValue(a);!b&&this.fire("change",{value:a});return this},getValue:function(){return this.getInputElement().getValue()},isChanged:function(){return!1},selectParentTab:function(){for(var a=this.getInputElement();(a=a.getParent())&&-1==a.$.className.search("cke_dialog_page_contents"););if(!a)return this;a=a.getAttribute("name");this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this},focus:function(){this.selectParentTab().getInputElement().focus();
return this},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,e=function(a,b,c,e){b.on("load",function(){a.getInputElement().on(c,e,a)})},d;for(d in a)if(c=d.match(b))this.eventProcessors[d]?this.eventProcessors[d].call(this,this._.dialog,a[d]):e(this,this._.dialog,c[1].toLowerCase(),a[d]);return this},eventProcessors:{onLoad:function(a,b){a.on("load",b,this)},onShow:function(a,b){a.on("show",b,this)},onHide:function(a,b){a.on("hide",b,this)}},accessKeyDown:function(){this.focus()},accessKeyUp:function(){},
disable:function(){var a=this.getElement();this.getInputElement().setAttribute("disabled","true");a.addClass("cke_disabled")},enable:function(){var a=this.getElement();this.getInputElement().removeAttribute("disabled");a.removeClass("cke_disabled")},isEnabled:function(){return!this.getElement().hasClass("cke_disabled")},isVisible:function(){return this.getInputElement().isVisible()},isFocusable:function(){return this.isEnabled()&&this.isVisible()?!0:!1}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
{getChild:function(a){if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?this._.children[a[0]].getChild(a.slice(1,a.length)):null}},!0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){var a={build:function(a,b,c){for(var e=b.children,d,g=[],f=[],h=0;h<e.length&&(d=e[h]);h++){var k=[];g.push(k);f.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a,d,k))}return new CKEDITOR.ui.dialog[b.type](a,
f,g,c,b)}};CKEDITOR.dialog.addUIElement("hbox",a);CKEDITOR.dialog.addUIElement("vbox",a)})();CKEDITOR.dialogCommand=function(a,b){this.dialogName=a;CKEDITOR.tools.extend(this,b,!0)};CKEDITOR.dialogCommand.prototype={exec:function(a){var b=this.tabId;a.openDialog(this.dialogName,function(a){b&&a.selectPage(b)})},canUndo:!1,editorFocus:1};(function(){var a=/^([a]|[^a])+$/,b=/^\d*$/,c=/^\d*(?:\.\d+)?$/,e=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,d=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
g=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var a=arguments;return function(){var b=this&&this.getValue?this.getValue():a[0],c,e=CKEDITOR.VALIDATE_AND,d=[],g;for(g=0;g<a.length;g++)if("function"==typeof a[g])d.push(a[g]);else break;g<a.length&&"string"==typeof a[g]&&(c=a[g],g++);g<a.length&&"number"==typeof a[g]&&(e=a[g]);var f=e==CKEDITOR.VALIDATE_AND?!0:!1;for(g=0;g<d.length;g++)f=e==CKEDITOR.VALIDATE_AND?f&&
d[g](b):f||d[g](b);return f?!0:c}},regex:function(a,b){return function(c){c=this&&this.getValue?this.getValue():c;return a.test(c)?!0:b}},notEmpty:function(b){return this.regex(a,b)},integer:function(a){return this.regex(b,a)},number:function(a){return this.regex(c,a)},cssLength:function(a){return this.functions(function(a){return d.test(CKEDITOR.tools.trim(a))},a)},htmlLength:function(a){return this.functions(function(a){return e.test(CKEDITOR.tools.trim(a))},a)},inlineStyle:function(a){return this.functions(function(a){return g.test(CKEDITOR.tools.trim(a))},
a)},equals:function(a,b){return this.functions(function(b){return b==a},b)},notEqual:function(a,b){return this.functions(function(b){return b!=a},b)}};CKEDITOR.on("instanceDestroyed",function(a){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(var c in A)A[c].remove();A={}}a=a.editor._.storedDialogs;for(var e in a)a[e].destroy()})})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a,b){var c=null,e=CKEDITOR.dialog._.dialogDefinitions[a];
null===CKEDITOR.dialog._.currentTop&&q(this);if("function"==typeof e)c=this._.storedDialogs||(this._.storedDialogs={}),c=c[a]||(c[a]=new CKEDITOR.dialog(this,a)),b&&b.call(c,c),c.show();else{if("failed"==e)throw y(this),Error('[CKEDITOR.dialog.openDialog] Dialog "'+a+'" failed when loading definition.');"string"==typeof e&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e),function(){"function"!=typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]="failed");this.openDialog(a,
b)},this,0,1)}CKEDITOR.skin.loadPart("dialog");return c}})}(),CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(a){a.on("doubleclick",function(f){f.data.dialog&&a.openDialog(f.data.dialog)},null,null,999)}}),function(){CKEDITOR.plugins.add("a11yhelp",{requires:"dialog",availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-au":1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,fr:1,"fr-ca":1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,
ku:1,lt:1,lv:1,mk:1,mn:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},init:function(a){var f=this;a.addCommand("a11yHelp",{exec:function(){var b=a.langCode,b=f.availableLangs[b]?b:f.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path+"dialogs/lang/"+b+".js"),function(){a.lang.a11yhelp=f.langEntries[b];a.openDialog("a11yHelp")})},modes:{wysiwyg:1,source:1},
readOnly:1,canUndo:!1});a.setKeystroke(CKEDITOR.ALT+48,"a11yHelp");CKEDITOR.dialog.add("a11yHelp",this.path+"dialogs/a11yhelp.js");a.on("ariaEditorHelpLabel",function(b){b.data.label=a.lang.common.editorHelp})}})}(),CKEDITOR.plugins.add("about",{requires:"dialog",init:function(a){var f=a.addCommand("about",new CKEDITOR.dialogCommand("about"));f.modes={wysiwyg:1,source:1};f.canUndo=!1;f.readOnly=1;a.ui.addButton&&a.ui.addButton("About",{label:a.lang.about.dlgTitle,command:"about",toolbar:"about"});
CKEDITOR.dialog.add("about",this.path+"dialogs/about.js")}}),CKEDITOR.plugins.add("basicstyles",{init:function(a){var f=0,b=function(b,d,h,l){if(l){l=new CKEDITOR.style(l);var e=c[h];e.unshift(l);a.attachStyleStateChange(l,function(b){!a.readOnly&&a.getCommand(h).setState(b)});a.addCommand(h,new CKEDITOR.styleCommand(l,{contentForms:e}));a.ui.addButton&&a.ui.addButton(b,{label:d,command:h,toolbar:"basicstyles,"+(f+=10)})}},c={bold:["strong","b",["span",function(a){a=a.styles["font-weight"];return"bold"==
a||700<=+a}]],italic:["em","i",["span",function(a){return"italic"==a.styles["font-style"]}]],underline:["u",["span",function(a){return"underline"==a.styles["text-decoration"]}]],strike:["s","strike",["span",function(a){return"line-through"==a.styles["text-decoration"]}]],subscript:["sub"],superscript:["sup"]},d=a.config,l=a.lang.basicstyles;b("Bold",l.bold,"bold",d.coreStyles_bold);b("Italic",l.italic,"italic",d.coreStyles_italic);b("Underline",l.underline,"underline",d.coreStyles_underline);b("Strike",
l.strike,"strike",d.coreStyles_strike);b("Subscript",l.subscript,"subscript",d.coreStyles_subscript);b("Superscript",l.superscript,"superscript",d.coreStyles_superscript);a.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]])}}),CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"},CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"},CKEDITOR.config.coreStyles_underline={element:"u"},CKEDITOR.config.coreStyles_strike={element:"s",
overrides:"strike"},CKEDITOR.config.coreStyles_subscript={element:"sub"},CKEDITOR.config.coreStyles_superscript={element:"sup"},function(){var a={exec:function(a){var b=a.getCommand("blockquote").state,c=a.getSelection(),d=c&&c.getRanges()[0];if(d){var l=c.createBookmarks();if(CKEDITOR.env.ie){var k=l[0].startNode,g=l[0].endNode,h;if(k&&"blockquote"==k.getParent().getName())for(h=k;h=h.getNext();)if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){k.move(h,!0);break}if(g&&"blockquote"==g.getParent().getName())for(h=
g;h=h.getPrevious();)if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){g.move(h);break}}var m=d.createIterator();m.enlargeBr=a.config.enterMode!=CKEDITOR.ENTER_BR;if(b==CKEDITOR.TRISTATE_OFF){for(k=[];b=m.getNextParagraph();)k.push(b);1>k.length&&(b=a.document.createElement(a.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),g=l.shift(),d.insertNode(b),b.append(new CKEDITOR.dom.text("﻿",a.document)),d.moveToBookmark(g),d.selectNodeContents(b),d.collapse(!0),g=d.createBookmark(),k.push(b),l.unshift(g));
h=k[0].getParent();d=[];for(g=0;g<k.length;g++)b=k[g],h=h.getCommonAncestor(b.getParent());for(b={table:1,tbody:1,tr:1,ol:1,ul:1};b[h.getName()];)h=h.getParent();for(g=null;0<k.length;){for(b=k.shift();!b.getParent().equals(h);)b=b.getParent();b.equals(g)||d.push(b);g=b}for(;0<d.length;)if(b=d.shift(),"blockquote"==b.getName()){for(g=new CKEDITOR.dom.documentFragment(a.document);b.getFirst();)g.append(b.getFirst().remove()),k.push(g.getLast());g.replace(b)}else k.push(b);d=a.document.createElement("blockquote");
for(d.insertBefore(k[0]);0<k.length;)b=k.shift(),d.append(b)}else if(b==CKEDITOR.TRISTATE_ON){g=[];for(h={};b=m.getNextParagraph();){for(k=d=null;b.getParent();){if("blockquote"==b.getParent().getName()){d=b.getParent();k=b;break}b=b.getParent()}d&&k&&!k.getCustomData("blockquote_moveout")&&(g.push(k),CKEDITOR.dom.element.setMarker(h,k,"blockquote_moveout",!0))}CKEDITOR.dom.element.clearAllMarkers(h);b=[];k=[];for(h={};0<g.length;)m=g.shift(),d=m.getParent(),m.getPrevious()?m.getNext()?(m.breakParent(m.getParent()),
k.push(m.getNext())):m.remove().insertAfter(d):m.remove().insertBefore(d),d.getCustomData("blockquote_processed")||(k.push(d),CKEDITOR.dom.element.setMarker(h,d,"blockquote_processed",!0)),b.push(m);CKEDITOR.dom.element.clearAllMarkers(h);for(g=k.length-1;0<=g;g--){d=k[g];a:{h=d;for(var m=0,e=h.getChildCount(),n=void 0;m<e&&(n=h.getChild(m));m++)if(n.type==CKEDITOR.NODE_ELEMENT&&n.isBlockBoundary()){h=!1;break a}h=!0}h&&d.remove()}if(a.config.enterMode==CKEDITOR.ENTER_BR)for(d=!0;b.length;)if(m=b.shift(),
"div"==m.getName()){g=new CKEDITOR.dom.documentFragment(a.document);!d||!m.getPrevious()||m.getPrevious().type==CKEDITOR.NODE_ELEMENT&&m.getPrevious().isBlockBoundary()||g.append(a.document.createElement("br"));for(d=m.getNext()&&!(m.getNext().type==CKEDITOR.NODE_ELEMENT&&m.getNext().isBlockBoundary());m.getFirst();)m.getFirst().remove().appendTo(g);d&&g.append(a.document.createElement("br"));g.replace(m);d=!1}}c.selectBookmarks(l);a.focus()}},refresh:function(a,b){this.setState(a.elementPath(b.block||
b.blockLimit).contains("blockquote",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)},context:"blockquote",allowedContent:"blockquote",requiredContent:"blockquote"};CKEDITOR.plugins.add("blockquote",{init:function(f){f.blockless||(f.addCommand("blockquote",a),f.ui.addButton&&f.ui.addButton("Blockquote",{label:f.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}))}})}(),"use strict",function(){function a(a,c){CKEDITOR.tools.extend(this,c,{editor:a,id:"cke-"+CKEDITOR.tools.getUniqueId(),
area:a._.notificationArea});c.type||(this.type="info");this.element=this._createElement();a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)}function f(a){var c=this;this.editor=a;this.notifications=[];this.element=this._createElement();this._uiBuffer=CKEDITOR.tools.eventsBuffer(10,this._layout,this);this._changeBuffer=CKEDITOR.tools.eventsBuffer(500,this._layout,this);a.on("destroy",function(){c._removeListeners();c.element.remove()})}CKEDITOR.plugins.add("notification",
{init:function(a){function c(a){var b=new CKEDITOR.dom.element("div");b.setStyles({position:"fixed","margin-left":"-9999px"});b.setAttributes({"aria-live":"assertive","aria-atomic":"true"});b.setText(a);CKEDITOR.document.getBody().append(b);setTimeout(function(){b.remove()},100)}a._.notificationArea=new f(a);a.showNotification=function(c,f,k){var g,h;"progress"==f?g=k:h=k;c=new CKEDITOR.plugins.notification(a,{message:c,type:f,progress:g,duration:h});c.show();return c};a.on("key",function(d){if(27==
d.data.keyCode){var f=a._.notificationArea.notifications;f.length&&(c(a.lang.notification.closed),f[f.length-1].hide(),d.cancel())}})}});a.prototype={show:function(){!1!==this.editor.fire("notificationShow",{notification:this})&&(this.area.add(this),this._hideAfterTimeout())},update:function(a){var c=!0;!1===this.editor.fire("notificationUpdate",{notification:this,options:a})&&(c=!1);var d=this.element,f=d.findOne(".cke_notification_message"),k=d.findOne(".cke_notification_progress"),g=a.type;d.removeAttribute("role");
a.progress&&"progress"!=this.type&&(g="progress");g&&(d.removeClass(this._getClass()),d.removeAttribute("aria-label"),this.type=g,d.addClass(this._getClass()),d.setAttribute("aria-label",this.type),"progress"!=this.type||k?"progress"!=this.type&&k&&k.remove():(k=this._createProgressElement(),k.insertBefore(f)));void 0!==a.message&&(this.message=a.message,f.setHtml(this.message));void 0!==a.progress&&(this.progress=a.progress,k&&k.setStyle("width",this._getPercentageProgress()));c&&a.important&&(d.setAttribute("role",
"alert"),this.isVisible()||this.area.add(this));this.duration=a.duration;this._hideAfterTimeout()},hide:function(){!1!==this.editor.fire("notificationHide",{notification:this})&&this.area.remove(this)},isVisible:function(){return 0<=CKEDITOR.tools.indexOf(this.area.notifications,this)},_createElement:function(){var a=this,c,d,f=this.editor.lang.common.close;c=new CKEDITOR.dom.element("div");c.addClass("cke_notification");c.addClass(this._getClass());c.setAttributes({id:this.id,role:"alert","aria-label":this.type});
"progress"==this.type&&c.append(this._createProgressElement());d=new CKEDITOR.dom.element("p");d.addClass("cke_notification_message");d.setHtml(this.message);c.append(d);d=CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"'+f+'" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');c.append(d);d.on("click",function(){a.editor.focus();a.hide()});return c},_getClass:function(){return"progress"==
this.type?"cke_notification_info":"cke_notification_"+this.type},_createProgressElement:function(){var a=new CKEDITOR.dom.element("span");a.addClass("cke_notification_progress");a.setStyle("width",this._getPercentageProgress());return a},_getPercentageProgress:function(){return Math.round(100*(this.progress||0))+"%"},_hideAfterTimeout:function(){var a=this,c;this._hideTimeoutId&&clearTimeout(this._hideTimeoutId);if("number"==typeof this.duration)c=this.duration;else if("info"==this.type||"success"==
this.type)c="number"==typeof this.editor.config.notification_duration?this.editor.config.notification_duration:5E3;c&&(a._hideTimeoutId=setTimeout(function(){a.hide()},c))}};f.prototype={add:function(a){this.notifications.push(a);this.element.append(a.element);1==this.element.getChildCount()&&(CKEDITOR.document.getBody().append(this.element),this._attachListeners());this._layout()},remove:function(a){var c=CKEDITOR.tools.indexOf(this.notifications,a);0>c||(this.notifications.splice(c,1),a.element.remove(),
this.element.getChildCount()||(this._removeListeners(),this.element.remove()))},_createElement:function(){var a=this.editor,c=a.config,d=new CKEDITOR.dom.element("div");d.addClass("cke_notifications_area");d.setAttribute("id","cke_notifications_area_"+a.name);d.setStyle("z-index",c.baseFloatZIndex-2);return d},_attachListeners:function(){var a=CKEDITOR.document.getWindow(),c=this.editor;a.on("scroll",this._uiBuffer.input);a.on("resize",this._uiBuffer.input);c.on("change",this._changeBuffer.input);
c.on("floatingSpaceLayout",this._layout,this,null,20);c.on("blur",this._layout,this,null,20)},_removeListeners:function(){var a=CKEDITOR.document.getWindow(),c=this.editor;a.removeListener("scroll",this._uiBuffer.input);a.removeListener("resize",this._uiBuffer.input);c.removeListener("change",this._changeBuffer.input);c.removeListener("floatingSpaceLayout",this._layout);c.removeListener("blur",this._layout)},_layout:function(){function a(){c.setStyle("left",w(r+f.width-n-q))}var c=this.element,d=
this.editor,f=d.ui.contentsElement.getClientRect(),k=d.ui.contentsElement.getDocumentPosition(),g,h,m=c.getClientRect(),e,n=this._notificationWidth,q=this._notificationMargin;e=CKEDITOR.document.getWindow();var y=e.getScrollPosition(),u=e.getViewPaneSize(),p=CKEDITOR.document.getBody(),v=p.getDocumentPosition(),w=CKEDITOR.tools.cssLength;n&&q||(e=this.element.getChild(0),n=this._notificationWidth=e.getClientRect().width,q=this._notificationMargin=parseInt(e.getComputedStyle("margin-left"),10)+parseInt(e.getComputedStyle("margin-right"),
10));d.toolbar&&(g=d.ui.space("top"),h=g.getClientRect());g&&g.isVisible()&&h.bottom>f.top&&h.bottom<f.bottom-m.height?c.setStyles({position:"fixed",top:w(h.bottom)}):0<f.top?c.setStyles({position:"absolute",top:w(k.y)}):k.y+f.height-m.height>y.y?c.setStyles({position:"fixed",top:0}):c.setStyles({position:"absolute",top:w(k.y+f.height-m.height)});var r="fixed"==c.getStyle("position")?f.left:"static"!=p.getComputedStyle("position")?k.x-v.x:k.x;f.width<n+q?k.x+n+q>y.x+u.width?a():c.setStyle("left",
w(r)):k.x+n+q>y.x+u.width?c.setStyle("left",w(r)):k.x+f.width/2+n/2+q>y.x+u.width?c.setStyle("left",w(r-k.x+y.x+u.width-n-q)):0>f.left+f.width-n-q?a():0>f.left+f.width/2-n/2?c.setStyle("left",w(r-k.x+y.x)):c.setStyle("left",w(r+f.width/2-n/2-q/2))}};CKEDITOR.plugins.notification=a}(),function(){var a='\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href\x3d\"javascript:void('{titleJs}')\"")+' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var f="";CKEDITOR.env.ie&&(f='return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"'+f+'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"')+
'\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',b=CKEDITOR.addTemplate("buttonArrow",'\x3cspan class\x3d"cke_button_arrow"\x3e'+(CKEDITOR.env.hc?"\x26#9660;":"")+"\x3c/span\x3e"),c=CKEDITOR.addTemplate("button",a);CKEDITOR.plugins.add("button",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_BUTTON,
CKEDITOR.ui.button.handler)}});CKEDITOR.UI_BUTTON="button";CKEDITOR.ui.button=function(a){CKEDITOR.tools.extend(this,a,{title:a.label,click:a.click||function(b){b.execCommand(a.command)}});this._={}};CKEDITOR.ui.button.handler={create:function(a){return new CKEDITOR.ui.button(a)}};CKEDITOR.ui.button.prototype={render:function(a,f){function k(){var b=a.mode;b&&(b=this.modes[b]?void 0!==g[b]?g[b]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,b=a.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:
b,this.setState(b),this.refresh&&this.refresh())}var g=null,h=CKEDITOR.env,m=this._.id=CKEDITOR.tools.getNextId(),e="",n=this.command,q,y,u;this._.editor=a;var p={id:m,button:this,editor:a,focus:function(){CKEDITOR.document.getById(m).focus()},execute:function(){this.button.click(a)},attach:function(a){this.button.attach(a)}},v=CKEDITOR.tools.addFunction(function(a){if(p.onkey)return a=new CKEDITOR.dom.event(a),!1!==p.onkey(p,a.getKeystroke())}),w=CKEDITOR.tools.addFunction(function(a){var b;p.onfocus&&
(b=!1!==p.onfocus(p,new CKEDITOR.dom.event(a)));return b}),r=0;p.clickFn=q=CKEDITOR.tools.addFunction(function(){r&&(a.unlockSelection(1),r=0);p.execute();h.iOS&&a.focus()});this.modes?(g={},a.on("beforeModeUnload",function(){a.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(g[a.mode]=this._.state)},this),a.on("activeFilterChange",k,this),a.on("mode",k,this),!this.readOnly&&a.on("readOnly",k,this)):n&&(n=a.getCommand(n))&&(n.on("state",function(){this.setState(n.state)},this),e+=n.state==CKEDITOR.TRISTATE_ON?
"on":n.state==CKEDITOR.TRISTATE_DISABLED?"disabled":"off");var z;if(this.directional)a.on("contentDirChanged",function(b){var c=CKEDITOR.document.getById(this._.id),e=c.getFirst();b=b.data;b!=a.lang.dir?c.addClass("cke_"+b):c.removeClass("cke_ltr").removeClass("cke_rtl");e.setAttribute("style",CKEDITOR.skin.getIconStyle(z,"rtl"==b,this.icon,this.iconOffset))},this);n?(y=a.getCommandKeystroke(n))&&(u=CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,y)):e+="off";y=this.name||this.command;var t=
null,x=this.icon;z=y;this.icon&&!/\./.test(this.icon)?(z=this.icon,x=null):(this.icon&&(t=this.icon),CKEDITOR.env.hidpi&&this.iconHiDpi&&(t=this.iconHiDpi));t?(CKEDITOR.skin.addIcon(t,t),x=null):t=z;e={id:m,name:y,iconName:z,label:this.label,cls:(this.hasArrow?"cke_button_expandable ":"")+(this.className||""),state:e,ariaDisabled:"disabled"==e?"true":"false",title:this.title+(u?" ("+u.display+")":""),ariaShortcut:u?a.lang.common.keyboardShortcut+" "+u.aria:"",titleJs:h.gecko&&!h.hc?"":(this.title||
"").replace("'",""),hasArrow:"string"===typeof this.hasArrow&&this.hasArrow||(this.hasArrow?"true":"false"),keydownFn:v,focusFn:w,clickFn:q,style:CKEDITOR.skin.getIconStyle(t,"rtl"==a.lang.dir,x,this.iconOffset),arrowHtml:this.hasArrow?b.output():""};c.output(e,f);if(this.onRender)this.onRender();return p},setState:function(a){if(this._.state==a)return!1;this._.state=a;var b=CKEDITOR.document.getById(this._.id);return b?(b.setState(a,"cke_button"),b.setAttribute("aria-disabled",a==CKEDITOR.TRISTATE_DISABLED),
this.hasArrow?b.setAttribute("aria-expanded",a==CKEDITOR.TRISTATE_ON):a===CKEDITOR.TRISTATE_ON?b.setAttribute("aria-pressed",!0):b.removeAttribute("aria-pressed"),!0):!1},getState:function(){return this._.state},toFeature:function(a){if(this._.feature)return this._.feature;var b=this;this.allowedContent||this.requiredContent||!this.command||(b=a.getCommand(this.command)||b);return this._.feature=b}};CKEDITOR.ui.prototype.addButton=function(a,b){this.add(a,CKEDITOR.UI_BUTTON,b)}}(),function(){function a(a){function b(){for(var e=
c(),h=CKEDITOR.tools.clone(a.config.toolbarGroups)||f(a),m=0;m<h.length;m++){var l=h[m];if("/"!=l){"string"==typeof l&&(l=h[m]={name:l});var p,v=l.groups;if(v)for(var w=0;w<v.length;w++)p=v[w],(p=e[p])&&g(l,p);(p=e[l.name])&&g(l,p)}}return h}function c(){var b={},e,g,f;for(e in a.ui.items)g=a.ui.items[e],f=g.toolbar||"others",f=f.split(","),g=f[0],f=parseInt(f[1]||-1,10),b[g]||(b[g]=[]),b[g].push({name:e,order:f});for(g in b)b[g]=b[g].sort(function(a,b){return a.order==b.order?0:0>b.order?-1:0>a.order?
1:a.order<b.order?-1:1});return b}function g(b,c){if(c.length){b.items?b.items.push(a.ui.create("-")):b.items=[];for(var e;e=c.shift();)e="string"==typeof e?e:e.name,m&&-1!=CKEDITOR.tools.indexOf(m,e)||(e=a.ui.create(e))&&a.addFeature(e)&&b.items.push(e)}}function h(a){var b=[],c,e,d;for(c=0;c<a.length;++c)e=a[c],d={},"/"==e?b.push(e):CKEDITOR.tools.isArray(e)?(g(d,CKEDITOR.tools.clone(e)),b.push(d)):e.items&&(g(d,CKEDITOR.tools.clone(e.items)),d.name=e.name,b.push(d));return b}var m=a.config.removeButtons,
m=m&&m.split(","),e=a.config.toolbar;"string"==typeof e&&(e=a.config["toolbar_"+e]);return a.toolbar=e?h(e):b()}function f(a){return a._.toolbarGroups||(a._.toolbarGroups=[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker"]},{name:"forms"},"/",{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi"]},{name:"links"},{name:"insert"},
"/",{name:"styles"},{name:"colors"},{name:"tools"},{name:"others"},{name:"about"}])}var b=function(){this.toolbars=[];this.focusCommandExecuted=!1};b.prototype.focus=function(){for(var a=0,b;b=this.toolbars[a++];)for(var c=0,g;g=b.items[c++];)if(g.focus){g.focus();return}};var c={modes:{wysiwyg:1,source:1},readOnly:1,exec:function(a){a.toolbox&&(a.toolbox.focusCommandExecuted=!0,CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){a.toolbox.focus()},100):a.toolbox.focus())}};CKEDITOR.plugins.add("toolbar",
{requires:"button",init:function(d){var f,k=function(a,b){var c,e="rtl"==d.lang.dir,n=d.config.toolbarGroupCycling,q=e?37:39,e=e?39:37,n=void 0===n||n;switch(b){case 9:case CKEDITOR.SHIFT+9:for(;!c||!c.items.length;)if(c=9==b?(c?c.next:a.toolbar.next)||d.toolbox.toolbars[0]:(c?c.previous:a.toolbar.previous)||d.toolbox.toolbars[d.toolbox.toolbars.length-1],c.items.length)for(a=c.items[f?c.items.length-1:0];a&&!a.focus;)(a=f?a.previous:a.next)||(c=0);a&&a.focus();return!1;case q:c=a;do c=c.next,!c&&
n&&(c=a.toolbar.items[0]);while(c&&!c.focus);c?c.focus():k(a,9);return!1;case 40:return a.button&&a.button.hasArrow?a.execute():k(a,40==b?q:e),!1;case e:case 38:c=a;do c=c.previous,!c&&n&&(c=a.toolbar.items[a.toolbar.items.length-1]);while(c&&!c.focus);c?c.focus():(f=1,k(a,CKEDITOR.SHIFT+9),f=0);return!1;case 27:return d.focus(),!1;case 13:case 32:return a.execute(),!1}return!0};d.on("uiSpace",function(c){if(c.data.space==d.config.toolbarLocation){c.removeListener();d.toolbox=new b;var f=CKEDITOR.tools.getNextId(),
l=['\x3cspan id\x3d"',f,'" class\x3d"cke_voice_label"\x3e',d.lang.toolbar.toolbars,"\x3c/span\x3e",'\x3cspan id\x3d"'+d.ui.spaceId("toolbox")+'" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"',f,'" onmousedown\x3d"return false;"\x3e'],f=!1!==d.config.toolbarStartupExpanded,e,n;d.config.toolbarCanCollapse&&d.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&l.push('\x3cspan class\x3d"cke_toolbox_main"'+(f?"\x3e":' style\x3d"display:none"\x3e'));for(var q=d.toolbox.toolbars,y=a(d),u=y.length,
p=0;p<u;p++){var v,w=0,r,z=y[p],t="/"!==z&&("/"===y[p+1]||p==u-1),x;if(z)if(e&&(l.push("\x3c/span\x3e"),n=e=0),"/"===z)l.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');else{x=z.items||z;for(var A=0;A<x.length;A++){var B=x[A],C;if(B){var H=function(a){a=a.render(d,l);F=w.items.push(a)-1;0<F&&(a.previous=w.items[F-1],a.previous.next=a);a.toolbar=w;a.onkey=k;a.onfocus=function(){d.toolbox.focusCommandExecuted||d.focus()}};if(B.type==CKEDITOR.UI_SEPARATOR)n=e&&B;else{C=!1!==B.canGroup;
if(!w){v=CKEDITOR.tools.getNextId();w={id:v,items:[]};r=z.name&&(d.lang.toolbar.toolbarGroups[z.name]||z.name);l.push('\x3cspan id\x3d"',v,'" class\x3d"cke_toolbar'+(t?' cke_toolbar_last"':'"'),r?' aria-labelledby\x3d"'+v+'_label"':"",' role\x3d"toolbar"\x3e');r&&l.push('\x3cspan id\x3d"',v,'_label" class\x3d"cke_voice_label"\x3e',r,"\x3c/span\x3e");l.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');var F=q.push(w)-1;0<F&&(w.previous=q[F-1],w.previous.next=w)}C?e||(l.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'),
e=1):e&&(l.push("\x3c/span\x3e"),e=0);n&&(H(n),n=0);H(B)}}}e&&(l.push("\x3c/span\x3e"),n=e=0);w&&l.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')}}d.config.toolbarCanCollapse&&l.push("\x3c/span\x3e");if(d.config.toolbarCanCollapse&&d.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var I=CKEDITOR.tools.addFunction(function(){d.execCommand("toolbarCollapse")});d.on("destroy",function(){CKEDITOR.tools.removeFunction(I)});d.addCommand("toolbarCollapse",{readOnly:1,exec:function(a){var b=
a.ui.space("toolbar_collapser"),c=b.getPrevious(),e=a.ui.space("contents"),d=c.getParent(),g=parseInt(e.$.style.height,10),f=d.$.offsetHeight,h=b.hasClass("cke_toolbox_collapser_min");h?(c.show(),b.removeClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarCollapse)):(c.hide(),b.addClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarExpand));b.getFirst().setText(h?"▲":"◀");e.setStyle("height",g-(d.$.offsetHeight-f)+"px");a.fire("resize",{outerHeight:a.container.$.offsetHeight,
contentsHeight:e.$.offsetHeight,outerWidth:a.container.$.offsetWidth})},modes:{wysiwyg:1,source:1}});d.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109),"toolbarCollapse");l.push('\x3ca title\x3d"'+(f?d.lang.toolbar.toolbarCollapse:d.lang.toolbar.toolbarExpand)+'" id\x3d"'+d.ui.spaceId("toolbar_collapser")+'" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');f||l.push(" cke_toolbox_collapser_min");l.push('" onclick\x3d"CKEDITOR.tools.callFunction('+I+')"\x3e','\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e',
"\x3c/a\x3e")}l.push("\x3c/span\x3e");c.data.html+=l.join("")}});d.on("destroy",function(){if(this.toolbox){var a,b=0,c,e,d;for(a=this.toolbox.toolbars;b<a.length;b++)for(e=a[b].items,c=0;c<e.length;c++)d=e[c],d.clickFn&&CKEDITOR.tools.removeFunction(d.clickFn),d.keyDownFn&&CKEDITOR.tools.removeFunction(d.keyDownFn)}});d.on("uiReady",function(){var a=d.ui.space("toolbox");a&&d.focusManager.add(a,1)});d.addCommand("toolbarFocus",c);d.setKeystroke(CKEDITOR.ALT+121,"toolbarFocus");d.ui.add("-",CKEDITOR.UI_SEPARATOR,
{});d.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){return{render:function(a,b){b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');return{}}}}})}});CKEDITOR.ui.prototype.addToolbarGroup=function(a,b,c){var g=f(this.editor),h=0===b,m={name:a};if(c){if(c=CKEDITOR.tools.search(g,function(a){return a.name==c})){!c.groups&&(c.groups=[]);if(b&&(b=CKEDITOR.tools.indexOf(c.groups,b),0<=b)){c.groups.splice(b+1,0,a);return}h?c.groups.splice(0,0,a):c.groups.push(a);
return}b=null}b&&(b=CKEDITOR.tools.indexOf(g,function(a){return a.name==b}));h?g.splice(0,0,a):"number"==typeof b?g.splice(b+1,0,m):g.push(a)}}(),CKEDITOR.UI_SEPARATOR="separator",CKEDITOR.config.toolbarLocation="top","use strict",function(){function a(a,b,c){b.type||(b.type="auto");if(c&&!1===a.fire("beforePaste",b)||!b.dataValue&&b.dataTransfer.isEmpty())return!1;b.dataValue||(b.dataValue="");if(CKEDITOR.env.gecko&&"drop"==b.method&&a.toolbox)a.once("afterPaste",function(){a.toolbox.focus()});return a.fire("paste",
b)}function f(b){function c(){var a=b.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){var d=function(a){b.getSelection().isCollapsed()||(b.readOnly&&"cut"==a.name||C.initPasteDataTransfer(a,b),a.data.preventDefault())};a.on("copy",d);a.on("cut",d);a.on("cut",function(){b.readOnly||b.extractSelectedHtml()},null,null,999)}a.on(C.mainPasteEvent,function(a){"beforepaste"==C.mainPasteEvent&&H||x(a)});"beforepaste"==C.mainPasteEvent&&(a.on("paste",function(a){F||(f(),a.data.preventDefault(),
x(a),k("paste"))}),a.on("contextmenu",h,null,null,0),a.on("beforepaste",function(a){!a.data||a.data.$.ctrlKey||a.data.$.shiftKey||h()},null,null,0));a.on("beforecut",function(){!H&&l(b)});var g;a.attachListener(CKEDITOR.env.ie?a:b.document.getDocumentElement(),"mouseup",function(){g=setTimeout(A,0)});b.on("destroy",function(){clearTimeout(g)});a.on("keyup",A)}function d(a){return{type:a,canUndo:"cut"==a,startDisabled:!0,fakeKeystroke:"cut"==a?CKEDITOR.CTRL+88:CKEDITOR.CTRL+67,exec:function(){"cut"==
this.type&&l();var a;var c=this.type;if(CKEDITOR.env.ie)a=k(c);else try{a=b.document.$.execCommand(c,!1,null)}catch(d){a=!1}a||b.showNotification(b.lang.clipboard[this.type+"Error"]);return a}}}function g(){return{canUndo:!1,async:!0,fakeKeystroke:CKEDITOR.CTRL+86,exec:function(b,c){function e(c,f){f="undefined"!==typeof f?f:!0;c?(c.method="paste",c.dataTransfer||(c.dataTransfer=C.initPasteDataTransfer()),a(b,c,f)):g&&!b._.forcePasteDialog&&b.showNotification(k,"info",b.config.clipboard_notificationDuration);
b._.forcePasteDialog=!1;b.fire("afterCommandExec",{name:"paste",command:d,returnValue:!!c})}c="undefined"!==typeof c&&null!==c?c:{};var d=this,g="undefined"!==typeof c.notification?c.notification:!0,f=c.type,h=CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard,b.getCommandKeystroke(this)),k="string"===typeof g?g:b.lang.clipboard.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+h.aria+'"\x3e'+h.display+"\x3c/kbd\x3e"),h="string"===typeof c?c:c.dataValue;f&&!0!==b.config.forcePasteAsPlainText&&
"allow-word"!==b.config.forcePasteAsPlainText?b._.nextPasteType=f:delete b._.nextPasteType;"string"===typeof h?e({dataValue:h}):b.getClipboardData(e)}}}function f(){F=1;setTimeout(function(){F=0},100)}function h(){H=1;setTimeout(function(){H=0},10)}function k(a){var c=b.document,d=c.getBody(),g=!1,f=function(){g=!0};d.on(a,f);7<CKEDITOR.env.version?c.$.execCommand(a):c.$.selection.createRange().execCommand(a);d.removeListener(a,f);return g}function l(){if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){var a=
b.getSelection(),c,d,g;a.getType()==CKEDITOR.SELECTION_ELEMENT&&(c=a.getSelectedElement())&&(d=a.getRanges()[0],g=b.document.createText(""),g.insertBefore(c),d.setStartBefore(g),d.setEndAfter(c),a.selectRanges([d]),setTimeout(function(){c.getParent()&&(g.remove(),a.selectElement(c))},0))}}function m(a,c){var d=b.document,g=b.editable(),f=function(a){a.cancel()},h;if(!d.getById("cke_pastebin")){var k=b.getSelection(),l=k.createBookmarks();CKEDITOR.env.ie&&k.root.fire("selectionchange");var n=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&
!g.is("body")||CKEDITOR.env.ie?"div":"body",d);n.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});var r=0,d=d.getWindow();CKEDITOR.env.webkit?(g.append(n),n.addClass("cke_editable"),g.is("body")||(r="static"!=g.getComputedStyle("position")?g:CKEDITOR.dom.element.get(g.$.offsetParent),r=r.getDocumentPosition().y)):g.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(n);n.setStyles({position:"absolute",top:d.getScrollPosition().y-r+10+"px",width:"1px",height:Math.max(1,d.getViewPaneSize().height-
20)+"px",overflow:"hidden",margin:0,padding:0});CKEDITOR.env.safari&&n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","text"));(r=n.getParent().isReadOnly())?(n.setOpacity(0),n.setAttribute("contenteditable",!0)):n.setStyle("ltr"==b.config.contentsLangDirection?"left":"right","-10000px");b.on("selectionChange",f,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)h=g.once("blur",f,null,null,-100);r&&n.focus();r=new CKEDITOR.dom.range(n);r.selectNodeContents(n);var t=r.select();CKEDITOR.env.ie&&
(h=g.once("blur",function(){b.lockSelection(t)}));var q=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=q);h&&h.removeListener();CKEDITOR.env.ie&&g.focus();k.selectBookmarks(l);n.remove();var a;CKEDITOR.env.webkit&&(a=n.getFirst())&&a.is&&a.hasClass("Apple-style-span")&&(n=a);b.removeListener("selectionChange",f);c(n.getHtml())},0)}}function z(){if("paste"==C.mainPasteEvent)return b.fire("beforePaste",{type:"auto",
method:"paste"}),!1;b.focus();f();var a=b.focusManager;a.lock();if(b.editable().fire(C.mainPasteEvent)&&!k("paste"))return a.unlock(),!1;a.unlock();return!0}function t(a){if("wysiwyg"==b.mode)switch(a.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:a=b.editable();f();"paste"==C.mainPasteEvent&&a.fire("beforepaste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:b.fire("saveSnapshot"),setTimeout(function(){b.fire("saveSnapshot")},50)}}function x(c){var d={type:"auto",method:"paste",
dataTransfer:C.initPasteDataTransfer(c)};d.dataTransfer.cacheData();var g=!1!==b.fire("beforePaste",d);g&&C.canClipboardApiBeTrusted(d.dataTransfer,b)?(c.data.preventDefault(),setTimeout(function(){a(b,d)},0)):m(c,function(c){d.dataValue=c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");g&&a(b,d)})}function A(){if("wysiwyg"==b.mode){var a=B("paste");b.getCommand("cut").setState(B("cut"));b.getCommand("copy").setState(B("copy"));b.getCommand("paste").setState(a);b.fire("pasteState",a)}}function B(a){var c=
b.getSelection(),c=c&&c.getRanges()[0];if((b.readOnly||c&&c.checkReadOnly())&&a in{paste:1,cut:1})return CKEDITOR.TRISTATE_DISABLED;if("paste"==a)return CKEDITOR.TRISTATE_OFF;a=b.getSelection();c=a.getRanges();return a.getType()==CKEDITOR.SELECTION_NONE||1==c.length&&c[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF}var C=CKEDITOR.plugins.clipboard,H=0,F=0;(function(){b.on("key",t);b.on("contentDom",c);b.on("selectionChange",A);if(b.contextMenu){b.contextMenu.addListener(function(){return{cut:B("cut"),
copy:B("copy"),paste:B("paste")}});var a=null;b.on("menuShow",function(){a&&(a.removeListener(),a=null);var c=b.contextMenu.findItemByCommandName("paste");c&&c.element&&(a=c.element.on("touchend",function(){b._.forcePasteDialog=!0}))})}if(b.ui.addButton)b.once("instanceReady",function(){b._.pasteButtons&&CKEDITOR.tools.array.forEach(b._.pasteButtons,function(a){if(a=b.ui.get(a))if(a=CKEDITOR.document.getById(a._.id))a.on("touchend",function(){b._.forcePasteDialog=!0})})})})();(function(){function a(c,
d,g,f,h){var k=b.lang.clipboard[d];b.addCommand(d,g);b.ui.addButton&&b.ui.addButton(c,{label:k,command:d,toolbar:"clipboard,"+f});b.addMenuItems&&b.addMenuItem(d,{label:k,command:d,group:"clipboard",order:h})}a("Cut","cut",d("cut"),10,1);a("Copy","copy",d("copy"),20,4);a("Paste","paste",g(),30,8);b._.pasteButtons||(b._.pasteButtons=[]);b._.pasteButtons.push("Paste")})();b.getClipboardData=function(a,c){function d(a){a.removeListener();a.cancel();c(a.data)}function g(a){a.removeListener();a.cancel();
c({type:h,dataValue:a.data.dataValue,dataTransfer:a.data.dataTransfer,method:"paste"})}var f=!1,h="auto";c||(c=a,a=null);b.on("beforePaste",function(a){a.removeListener();f=!0;h=a.data.type},null,null,1E3);b.on("paste",d,null,null,0);!1===z()&&(b.removeListener("paste",d),b._.forcePasteDialog&&f&&b.fire("pasteDialog")?(b.on("pasteDialogCommit",g),b.on("dialogHide",function(a){a.removeListener();a.data.removeListener("pasteDialogCommit",g);a.data._.committed||c(null)})):c(null))}}function b(a){if(CKEDITOR.env.webkit){if(!a.match(/^[^<]*$/g)&&
!a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function c(a,b){function c(a){return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",~~(a/2))+(1==a%2?"\x3cbr\x3e":"")}b=b.replace(/(?!\u3000)\s+/g," ").replace(/> +</g,"\x3e\x3c").replace(/<br ?\/>/gi,
"\x3cbr\x3e");b=b.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(b.match(/^[^<]$/))return b;CKEDITOR.env.webkit&&-1<b.indexOf("\x3cdiv\x3e")&&(b=b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"\x3cdiv\x3e\x3c/div\x3e"),b.match(/<div>(<br>|)<\/div>/)&&(b="\x3cp\x3e"+b.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length+1)})+"\x3c/p\x3e"),b=b.replace(/<\/div><div>/g,"\x3cbr\x3e"),
b=b.replace(/<\/?div>/g,""));CKEDITOR.env.gecko&&a.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(b=b.replace(/^<br><br>$/,"\x3cbr\x3e")),-1<b.indexOf("\x3cbr\x3e\x3cbr\x3e")&&(b="\x3cp\x3e"+b.replace(/(<br>){2,}/g,function(a){return c(a.length/4)})+"\x3c/p\x3e"));return k(a,b)}function d(a){function b(){var a={},c;for(c in CKEDITOR.dtd)"$"!=c.charAt(0)&&"div"!=c&&"span"!=c&&(a[c]=1);return a}var c={};return{get:function(d){return"plain-text"==d?c.plainText||(c.plainText=new CKEDITOR.filter(a,
"br")):"semantic-content"==d?((d=c.semanticContent)||(d=new CKEDITOR.filter(a,{}),d.allow({$1:{elements:b(),attributes:!0,styles:!1,classes:!1}}),d=c.semanticContent=d),d):d?new CKEDITOR.filter(a,d):null}}}function l(a,b,c){b=CKEDITOR.htmlParser.fragment.fromHtml(b);var d=new CKEDITOR.htmlParser.basicWriter;c.applyTo(b,!0,!1,a.activeEnterMode);b.writeHtml(d);return d.getHtml()}function k(a,b){a.enterMode==CKEDITOR.ENTER_BR?b=b.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("\x3cbr\x3e",
a.length/7*2)}).replace(/<\/?p>/g,""):a.enterMode==CKEDITOR.ENTER_DIV&&(b=b.replace(/<(\/)?p>/g,"\x3c$1div\x3e"));return b}function g(a){a.data.preventDefault();a.data.$.dataTransfer.dropEffect="none"}function h(b){var c=CKEDITOR.plugins.clipboard;b.on("contentDom",function(){function d(c,g,f){g.select();a(b,{dataTransfer:f,method:"drop"},1);f.sourceEditor.fire("saveSnapshot");f.sourceEditor.editable().extractHtmlFromRange(c);f.sourceEditor.getSelection().selectRanges([c]);f.sourceEditor.fire("saveSnapshot")}
function g(d,f){d.select();a(b,{dataTransfer:f,method:"drop"},1);c.resetDragDataTransfer()}function f(a,c,d){var g={$:a.data.$,target:a.data.getTarget()};c&&(g.dragRange=c);d&&(g.dropRange=d);!1===b.fire(a.name,g)&&a.data.preventDefault()}function h(a){a.type!=CKEDITOR.NODE_ELEMENT&&(a=a.getParent());return a.getChildCount()}var k=b.editable(),l=CKEDITOR.plugins.clipboard.getDropTarget(b),m=b.ui.space("top"),z=b.ui.space("bottom");c.preventDefaultDropOnElement(m);c.preventDefaultDropOnElement(z);
k.attachListener(l,"dragstart",f);k.attachListener(b,"dragstart",c.resetDragDataTransfer,c,null,1);k.attachListener(b,"dragstart",function(a){c.initDragDataTransfer(a,b)},null,null,2);k.attachListener(b,"dragstart",function(){var a=c.dragRange=b.getSelection().getRanges()[0];CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(c.dragStartContainerChildCount=a?h(a.startContainer):null,c.dragEndContainerChildCount=a?h(a.endContainer):null)},null,null,100);k.attachListener(l,"dragend",f);k.attachListener(b,"dragend",
c.initDragDataTransfer,c,null,1);k.attachListener(b,"dragend",c.resetDragDataTransfer,c,null,100);k.attachListener(l,"dragover",function(a){if(CKEDITOR.env.edge)a.data.preventDefault();else{var b=a.data.getTarget();b&&b.is&&b.is("html")?a.data.preventDefault():CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&a.data.$.dataTransfer.types.contains("Files")&&a.data.preventDefault()}});k.attachListener(l,"drop",function(a){if(!a.data.$.defaultPrevented){a.data.preventDefault();var d=a.data.getTarget();
if(!d.isReadOnly()||d.type==CKEDITOR.NODE_ELEMENT&&d.is("html")){var d=c.getRangeAtDropPosition(a,b),g=c.dragRange;d&&f(a,g,d)}}},null,null,9999);k.attachListener(b,"drop",c.initDragDataTransfer,c,null,1);k.attachListener(b,"drop",function(a){if(a=a.data){var f=a.dropRange,h=a.dragRange,k=a.dataTransfer;k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){c.internalDrop(h,f,k,b)},0):k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?d(h,f,k):g(f,k)}},null,null,9999)})}
var m;CKEDITOR.plugins.add("clipboard",{requires:"dialog,notification,toolbar",init:function(a){var g,k=d(a);a.config.forcePasteAsPlainText?g="plain-text":a.config.pasteFilter?g=a.config.pasteFilter:!CKEDITOR.env.webkit||"pasteFilter"in a.config||(g="semantic-content");a.pasteFilter=k.get(g);f(a);h(a);CKEDITOR.dialog.add("paste",CKEDITOR.getUrl(this.path+"dialogs/paste.js"));if(CKEDITOR.env.gecko){var m=["image/png","image/jpeg","image/gif"],u;a.on("paste",function(b){var c=b.data,d=c.dataTransfer;
if(!c.dataValue&&"paste"==c.method&&d&&1==d.getFilesCount()&&u!=d.id&&(d=d.getFile(0),-1!=CKEDITOR.tools.indexOf(m,d.type))){var g=new FileReader;g.addEventListener("load",function(){b.data.dataValue='\x3cimg src\x3d"'+g.result+'" /\x3e';a.fire("paste",b.data)},!1);g.addEventListener("abort",function(){a.fire("paste",b.data)},!1);g.addEventListener("error",function(){a.fire("paste",b.data)},!1);g.readAsDataURL(d);u=c.dataTransfer.id;b.stop()}},null,null,1)}a.on("paste",function(b){b.data.dataTransfer||
(b.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer);if(!b.data.dataValue){var c=b.data.dataTransfer,d=c.getData("text/html");if(d)b.data.dataValue=d,b.data.type="html";else if(d=c.getData("text/plain"))b.data.dataValue=a.editable().transformPlainTextToHtml(d),b.data.type="text"}},null,null,1);a.on("paste",function(a){var b=a.data.dataValue,c=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,
function(a,b){return b.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;")})),-1<b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e')&&(a.data.startsWithEOL=1,a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var d,e,g=new CKEDITOR.dom.element("div");for(g.setHtml(b);1==g.getChildCount()&&(d=g.getFirst())&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasClass("cke_editable")||
d.hasClass("cke_contents"));)g=e=d;e&&(b=e.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,d){return d.toLowerCase()in c?(a.data.preSniffing="html","\x3c"+d):b}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,d){return d in c?(a.data.endsWithEOL=1,"\x3c/"+d+"\x3e"):b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);a.on("paste",function(d){d=d.data;var g=a._.nextPasteType||d.type,f=d.dataValue,
h,m=a.config.clipboard_defaultContentType||"html",n=d.dataTransfer.getTransferType(a)==CKEDITOR.DATA_TRANSFER_EXTERNAL,u=!0===a.config.forcePasteAsPlainText;h="html"==g||"html"==d.preSniffing?"html":b(f);delete a._.nextPasteType;"htmlifiedtext"==h&&(f=c(a.config,f));if("text"==g&&"html"==h)f=l(a,f,k.get("plain-text"));else if(n&&a.pasteFilter&&!d.dontFilter||u)f=l(a,f,a.pasteFilter);d.startsWithEOL&&(f='\x3cbr data-cke-eol\x3d"1"\x3e'+f);d.endsWithEOL&&(f+='\x3cbr data-cke-eol\x3d"1"\x3e');"auto"==
g&&(g="html"==h||"html"==m?"html":"text");d.type=g;d.dataValue=f;delete d.preSniffing;delete d.startsWithEOL;delete d.endsWithEOL},null,null,6);a.on("paste",function(b){b=b.data;b.dataValue&&(a.insertHtml(b.dataValue,b.type,b.range),setTimeout(function(){a.fire("afterPaste")},0))},null,null,1E3);a.on("pasteDialog",function(b){setTimeout(function(){a.openDialog("paste",b.data)},0)})}});CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:(!CKEDITOR.env.ie||16<=CKEDITOR.env.version)&&!CKEDITOR.env.iOS,
isCustomDataTypesSupported:!CKEDITOR.env.ie||16<=CKEDITOR.env.version,isFileApiSupported:!CKEDITOR.env.ie||9<CKEDITOR.env.version,mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?"beforepaste":"paste",addPasteButton:function(a,b,c){a.ui.addButton&&(a.ui.addButton(b,c),a._.pasteButtons||(a._.pasteButtons=[]),a._.pasteButtons.push(b))},canClipboardApiBeTrusted:function(a,b){return a.getTransferType(b)!=CKEDITOR.DATA_TRANSFER_EXTERNAL||CKEDITOR.env.chrome&&!a.isEmpty()||CKEDITOR.env.gecko&&(a.getData("text/html")||
a.getFilesCount())||CKEDITOR.env.safari&&603<=CKEDITOR.env.version&&!CKEDITOR.env.iOS||CKEDITOR.env.edge&&16<=CKEDITOR.env.version?!0:!1},getDropTarget:function(a){var b=a.editable();return CKEDITOR.env.ie&&9>CKEDITOR.env.version||b.isInline()?b:a.document},fixSplitNodesAfterDrop:function(a,b,c,d){function g(a,c,d){var e=a;e.type==CKEDITOR.NODE_TEXT&&(e=a.getParent());if(e.equals(c)&&d!=c.getChildCount())return a=b.startContainer.getChild(b.startOffset-1),c=b.startContainer.getChild(b.startOffset),
a&&a.type==CKEDITOR.NODE_TEXT&&c&&c.type==CKEDITOR.NODE_TEXT&&(d=a.getLength(),a.setText(a.getText()+c.getText()),c.remove(),b.setStart(a,d),b.collapse(!0)),!0}var f=b.startContainer;"number"==typeof d&&"number"==typeof c&&f.type==CKEDITOR.NODE_ELEMENT&&(g(a.startContainer,f,c)||g(a.endContainer,f,d))},isDropRangeAffectedByDragRange:function(a,b){var c=b.startContainer,d=b.endOffset;return a.endContainer.equals(c)&&a.endOffset<=d||a.startContainer.getParent().equals(c)&&a.startContainer.getIndex()<
d||a.endContainer.getParent().equals(c)&&a.endContainer.getIndex()<d?!0:!1},internalDrop:function(b,c,d,g){var f=CKEDITOR.plugins.clipboard,h=g.editable(),k,l;g.fire("saveSnapshot");g.fire("lockSnapshot",{dontUpdate:1});CKEDITOR.env.ie&&10>CKEDITOR.env.version&&this.fixSplitNodesAfterDrop(b,c,f.dragStartContainerChildCount,f.dragEndContainerChildCount);(l=this.isDropRangeAffectedByDragRange(b,c))||(k=b.createBookmark(!1));f=c.clone().createBookmark(!1);l&&(k=b.createBookmark(!1));b=k.startNode;c=
k.endNode;l=f.startNode;c&&b.getPosition(l)&CKEDITOR.POSITION_PRECEDING&&c.getPosition(l)&CKEDITOR.POSITION_FOLLOWING&&l.insertBefore(b);b=g.createRange();b.moveToBookmark(k);h.extractHtmlFromRange(b,1);c=g.createRange();f.startNode.getCommonAncestor(h)||(f=g.getSelection().createBookmarks()[0]);c.moveToBookmark(f);a(g,{dataTransfer:d,method:"drop",range:c},1);g.fire("unlockSnapshot")},getRangeAtDropPosition:function(a,b){var c=a.data.$,d=c.clientX,g=c.clientY,f=b.getSelection(!0).getRanges()[0],
h=b.createRange();if(a.data.testRange)return a.data.testRange;if(document.caretRangeFromPoint&&b.document.$.caretRangeFromPoint(d,g))c=b.document.$.caretRangeFromPoint(d,g),h.setStart(CKEDITOR.dom.node(c.startContainer),c.startOffset),h.collapse(!0);else if(c.rangeParent)h.setStart(CKEDITOR.dom.node(c.rangeParent),c.rangeOffset),h.collapse(!0);else{if(CKEDITOR.env.ie&&8<CKEDITOR.env.version&&f&&b.editable().hasFocus)return f;if(document.body.createTextRange){b.focus();c=b.document.getBody().$.createTextRange();
try{for(var k=!1,l=0;20>l&&!k;l++){if(!k)try{c.moveToPoint(d,g-l),k=!0}catch(m){}if(!k)try{c.moveToPoint(d,g+l),k=!0}catch(t){}}if(k){var x="cke-temp-"+(new Date).getTime();c.pasteHTML('\x3cspan id\x3d"'+x+'"\x3e​\x3c/span\x3e');var A=b.document.getById(x);h.moveToPosition(A,CKEDITOR.POSITION_BEFORE_START);A.remove()}else{var B=b.document.$.elementFromPoint(d,g),C=new CKEDITOR.dom.element(B),H;if(C.equals(b.editable())||"html"==C.getName())return f&&f.startContainer&&!f.startContainer.equals(b.editable())?
f:null;H=C.getClientRect();d<H.left?h.setStartAt(C,CKEDITOR.POSITION_AFTER_START):h.setStartAt(C,CKEDITOR.POSITION_BEFORE_END);h.collapse(!0)}}catch(F){return null}}else return null}return h},initDragDataTransfer:function(a,b){var c=a.data.$?a.data.$.dataTransfer:null,d=new this.dataTransfer(c,b);"dragstart"===a.name&&d.storeId();c?this.dragData&&d.id==this.dragData.id?d=this.dragData:this.dragData=d:this.dragData?d=this.dragData:this.dragData=d;a.data.dataTransfer=d},resetDragDataTransfer:function(){this.dragData=
null},initPasteDataTransfer:function(a,b){if(this.isCustomCopyCutSupported){if(a&&a.data&&a.data.$){var c=a.data.$.clipboardData,d=new this.dataTransfer(c,b);"copy"!==a.name&&"cut"!==a.name||d.storeId();this.copyCutData&&d.id==this.copyCutData.id?(d=this.copyCutData,d.$=c):this.copyCutData=d;return d}return new this.dataTransfer(null,b)}return new this.dataTransfer(CKEDITOR.env.edge&&a&&a.data.$&&a.data.$.clipboardData||null,b)},preventDefaultDropOnElement:function(a){a&&a.on("dragover",g)}};m=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?
"cke/id":"Text";CKEDITOR.plugins.clipboard.dataTransfer=function(a,b){a&&(this.$=a);this._={metaRegExp:/^<meta.*?>/i,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,fragmentRegExp:/\x3c!--(?:Start|End)Fragment--\x3e/g,data:{},files:[],nativeHtmlCache:"",normalizeType:function(a){a=a.toLowerCase();return"text"==a||"text/plain"==a?"Text":"url"==a?"URL":a}};this._.fallbackDataTransfer=new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);this.id=this.getData(m);this.id||(this.id="Text"==m?"":"cke-"+
CKEDITOR.tools.getUniqueId());b&&(this.sourceEditor=b,this.setData("text/html",b.getSelectedHtml(1)),"Text"==m||this.getData("text/plain")||this.setData("text/plain",b.getSelection().getSelectedText()))};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype={getData:function(a,b){a=this._.normalizeType(a);var c="text/html"==a&&b?this._.nativeHtmlCache:this._.data[a];if(void 0===c||null===c||""===
c){if(this._.fallbackDataTransfer.isRequired())c=this._.fallbackDataTransfer.getData(a,b);else try{c=this.$.getData(a)||""}catch(d){c=""}"text/html"!=a||b||(c=this._stripHtml(c))}"Text"==a&&CKEDITOR.env.gecko&&this.getFilesCount()&&"file://"==c.substring(0,7)&&(c="");if("string"===typeof c)var g=c.indexOf("\x3c/html\x3e"),c=-1!==g?c.substring(0,g+7):c;return c},setData:function(a,b){a=this._.normalizeType(a);"text/html"==a?(this._.data[a]=this._stripHtml(b),this._.nativeHtmlCache=b):this._.data[a]=
b;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||"URL"==a||"Text"==a)if("Text"==m&&"Text"==a&&(this.id=b),this._.fallbackDataTransfer.isRequired())this._.fallbackDataTransfer.setData(a,b);else try{this.$.setData(a,b)}catch(c){}},storeId:function(){"Text"!==m&&this.setData(m,this.id)},getTransferType:function(a){return this.sourceEditor?this.sourceEditor==a?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL},cacheData:function(){function a(c){c=
b._.normalizeType(c);var d=b.getData(c);"text/html"==c&&(b._.nativeHtmlCache=b.getData(c,!0),d=b._stripHtml(d));d&&(b._.data[c]=d)}if(this.$){var b=this,c,d;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(c=0;c<this.$.types.length;c++)a(this.$.types[c])}else a("Text"),a("URL");d=this._getImageFromClipboard();if(this.$&&this.$.files||d){this._.files=[];if(this.$.files&&this.$.files.length)for(c=0;c<this.$.files.length;c++)this._.files.push(this.$.files[c]);0===this._.files.length&&
d&&this._.files.push(d)}}},getFilesCount:function(){return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0},getFile:function(a){return this._.files.length?this._.files[a]:this.$&&this.$.files&&this.$.files.length?this.$.files[a]:0===a?this._getImageFromClipboard():void 0},isEmpty:function(){var a={},b;if(this.getFilesCount())return!1;CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data),function(b){a[b]=
1});if(this.$)if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(var c=0;c<this.$.types.length;c++)a[this.$.types[c]]=1}else a.Text=1,a.URL=1;"Text"!=m&&(a[m]=0);for(b in a)if(a[b]&&""!==this.getData(b))return!1;return!0},_getImageFromClipboard:function(){var a;try{if(this.$&&this.$.items&&this.$.items[0]&&(a=this.$.items[0].getAsFile())&&a.type)return a}catch(b){}},_stripHtml:function(a){if(a&&a.length){a=a.replace(this._.metaRegExp,"");var b=this._.bodyRegExp.exec(a);
b&&b.length&&(a=b[1],a=a.replace(this._.fragmentRegExp,""))}return a}};CKEDITOR.plugins.clipboard.fallbackDataTransfer=function(a){this._dataTransfer=a;this._customDataFallbackType="text/html"};CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported=null;CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes=[];CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype={isRequired:function(){var a=CKEDITOR.plugins.clipboard.fallbackDataTransfer,b=this._dataTransfer.$;if(null===
a._isCustomMimeTypeSupported)if(b){a._isCustomMimeTypeSupported=!1;if(CKEDITOR.env.edge&&17<=CKEDITOR.env.version)return!0;try{b.setData("cke/mimetypetest","cke test value"),a._isCustomMimeTypeSupported="cke test value"===b.getData("cke/mimetypetest"),b.clearData("cke/mimetypetest")}catch(c){}}else return!1;return!a._isCustomMimeTypeSupported},getData:function(a,b){var c=this._getData(this._customDataFallbackType,!0);if(b)return c;var c=this._extractDataComment(c),d=null,d=a===this._customDataFallbackType?
c.content:c.data&&c.data[a]?c.data[a]:this._getData(a,!0);return null!==d?d:""},setData:function(a,b){var c=a===this._customDataFallbackType;c&&(b=this._applyDataComment(b,this._getFallbackTypeData()));var d=b,g=this._dataTransfer.$;try{g.setData(a,d),c&&(this._dataTransfer._.nativeHtmlCache=d)}catch(f){if(this._isUnsupportedMimeTypeError(f)){c=CKEDITOR.plugins.clipboard.fallbackDataTransfer;-1===CKEDITOR.tools.indexOf(c._customTypes,a)&&c._customTypes.push(a);var c=this._getFallbackTypeContent(),
h=this._getFallbackTypeData();h[a]=d;try{d=this._applyDataComment(c,h),g.setData(this._customDataFallbackType,d),this._dataTransfer._.nativeHtmlCache=d}catch(k){d=""}}}return d},_getData:function(a,b){var c=this._dataTransfer._.data;if(!b&&c[a])return c[a];try{return this._dataTransfer.$.getData(a)}catch(d){return null}},_getFallbackTypeContent:function(){var a=this._dataTransfer._.data[this._customDataFallbackType];a||(a=this._extractDataComment(this._getData(this._customDataFallbackType,!0)).content);
return a},_getFallbackTypeData:function(){var a=CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,b=this._extractDataComment(this._getData(this._customDataFallbackType,!0)).data||{},c=this._dataTransfer._.data;CKEDITOR.tools.array.forEach(a,function(a){void 0!==c[a]?b[a]=c[a]:void 0!==b[a]&&(b[a]=b[a])},this);return b},_isUnsupportedMimeTypeError:function(a){return a.message&&-1!==a.message.search(/element not found/gi)},_extractDataComment:function(a){var b={data:null,content:a||""};if(a&&
16<a.length){var c;(c=/\x3c!--cke-data:(.*?)--\x3e/g.exec(a))&&c[1]&&(b.data=JSON.parse(decodeURIComponent(c[1])),b.content=a.replace(c[0],""))}return b},_applyDataComment:function(a,b){var c="";b&&CKEDITOR.tools.object.keys(b).length&&(c="\x3c!--cke-data:"+encodeURIComponent(JSON.stringify(b))+"--\x3e");return c+(a&&a.length?a:"")}}}(),CKEDITOR.config.clipboard_notificationDuration=1E4,function(){CKEDITOR.plugins.add("panel",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler)}});
CKEDITOR.UI_PANEL="panel";CKEDITOR.ui.panel=function(a,b){b&&CKEDITOR.tools.extend(this,b);CKEDITOR.tools.extend(this,{className:"",css:[]});this.id=CKEDITOR.tools.getNextId();this.document=a;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}}};CKEDITOR.ui.panel.handler={create:function(a){return new CKEDITOR.ui.panel(a)}};var a=CKEDITOR.addTemplate("panel",'\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
f=CKEDITOR.addTemplate("panel-frame",'\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),b=CKEDITOR.addTemplate("panel-frame-inner",'\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');CKEDITOR.ui.panel.prototype={render:function(c,
d){var l={editorId:c.id,id:this.id,langCode:c.langCode,dir:c.lang.dir,cls:this.className,frame:"",env:CKEDITOR.env.cssClass,"z-index":c.config.baseFloatZIndex+1};this.getHolderElement=function(){var a=this._.holder;if(!a){if(this.isFramed){var a=this.document.getById(this.id+"_frame"),c=a.getParent(),a=a.getFrameDocument();CKEDITOR.env.iOS&&c.setStyles({overflow:"scroll","-webkit-overflow-scrolling":"touch"});c=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){this.isLoaded=!0;if(this.onLoad)this.onLoad()},
this));a.write(b.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:"window.parent.CKEDITOR.tools.callFunction("+c+");"},l)));a.getWindow().$.CKEDITOR=CKEDITOR;a.on("keydown",function(a){var b=a.data.getKeystroke(),c=this.document.getById(this.id).getAttribute("dir");if("input"!==a.data.getTarget().getName()||37!==b&&39!==b)this._.onKeyDown&&!1===this._.onKeyDown(b)?"input"===a.data.getTarget().getName()&&32===b||a.data.preventDefault():(27==b||b==("rtl"==c?39:37))&&
this.onEscape&&!1===this.onEscape(b)&&a.data.preventDefault()},this);a=a.getBody();a.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(c)}else a=this.document.getById(this.id);this._.holder=a}return a};if(this.isFramed){var k=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie&&!CKEDITOR.env.edge?"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())":"";l.frame=f.output({id:this.id+"_frame",src:k})}k=a.output(l);d&&
d.push(k);return k},addBlock:function(a,b){b=this._.blocks[a]=b instanceof CKEDITOR.ui.panel.block?b:new CKEDITOR.ui.panel.block(this.getHolderElement(),b);this._.currentBlock||this.showBlock(a);return b},getBlock:function(a){return this._.blocks[a]},showBlock:function(a){a=this._.blocks[a];var b=this._.currentBlock,f=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+"_frame");b&&b.hide();this._.currentBlock=a;CKEDITOR.fire("ariaWidget",f);a._.focusIndex=-1;this._.onKeyDown=
a.onKeyDown&&CKEDITOR.tools.bind(a.onKeyDown,a);a.show();return a},destroy:function(){this.element&&this.element.remove()}};CKEDITOR.ui.panel.block=CKEDITOR.tools.createClass({$:function(a,b){this.element=a.append(a.getDocument().createElement("div",{attributes:{tabindex:-1,"class":"cke_panel_block"},styles:{display:"none"}}));b&&CKEDITOR.tools.extend(this,b);this.element.setAttributes({role:this.attributes.role||"presentation","aria-label":this.attributes["aria-label"],title:this.attributes.title||
this.attributes["aria-label"]});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu()},_:{markItem:function(a){-1!=a&&(a=this._.getItems().getItem(this._.focusIndex=a),CKEDITOR.env.webkit&&a.getDocument().getWindow().focus(),a.focus(),this.onMark&&this.onMark(a))},markFirstDisplayed:function(a){for(var b=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"none"==a.getStyle("display")},f=this._.getItems(),k,g,h=f.count()-1;0<=h;h--)if(k=f.getItem(h),k.getAscendant(b)||(g=k,this._.focusIndex=
h),"true"==k.getAttribute("aria-selected")){g=k;this._.focusIndex=h;break}g&&(a&&a(),CKEDITOR.env.webkit&&g.getDocument().getWindow().focus(),g.focus(),this.onMark&&this.onMark(g))},getItems:function(){return this.element.find("a,input")}},proto:{show:function(){this.element.setStyle("display","")},hide:function(){this.onHide&&!0===this.onHide.call(this)||this.element.setStyle("display","none")},onKeyDown:function(a,b){var f=this.keys[a];switch(f){case "next":for(var k=this._.focusIndex,f=this._.getItems(),
g;g=f.getItem(++k);)if(g.getAttribute("_cke_focus")&&g.$.offsetWidth){this._.focusIndex=k;g.focus(!0);break}return g||b?!1:(this._.focusIndex=-1,this.onKeyDown(a,1));case "prev":k=this._.focusIndex;for(f=this._.getItems();0<k&&(g=f.getItem(--k));){if(g.getAttribute("_cke_focus")&&g.$.offsetWidth){this._.focusIndex=k;g.focus(!0);break}g=null}return g||b?!1:(this._.focusIndex=f.count(),this.onKeyDown(a,1));case "click":case "mouseup":return k=this._.focusIndex,(g=0<=k&&this._.getItems().getItem(k))&&
(g.$[f]?g.$[f]():g.$["on"+f]()),!1}return!0}}})}(),CKEDITOR.plugins.add("floatpanel",{requires:"panel"}),function(){function a(a,c,d,l,k){k=CKEDITOR.tools.genKey(c.getUniqueId(),d.getUniqueId(),a.lang.dir,a.uiColor||"",l.css||"",k||"");var g=f[k];g||(g=f[k]=new CKEDITOR.ui.panel(c,l),g.element=d.append(CKEDITOR.dom.element.createFromHtml(g.render(a),c)),g.element.setStyles({display:"none",position:"absolute"}));return g}var f={};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(b,c,d,
f){function k(){e.hide()}d.forceIFrame=1;d.toolbarRelated&&b.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(c=CKEDITOR.document.getById("cke_"+b.name));var g=c.getDocument();f=a(b,g,c,d,f||0);var h=f.element,m=h.getFirst(),e=this;h.disableContextMenu();this.element=h;this._={editor:b,panel:f,parentElement:c,definition:d,document:g,iframe:m,children:[],dir:b.lang.dir,showBlockParams:null,markFirst:void 0!==d.markFirst?d.markFirst:!0};b.on("mode",k);b.on("resize",k);g.getWindow().on("resize",function(){this.reposition()},
this)},proto:{addBlock:function(a,c){return this._.panel.addBlock(a,c)},addListBlock:function(a,c){return this._.panel.addListBlock(a,c)},getBlock:function(a){return this._.panel.getBlock(a)},showBlock:function(a,c,d,f,k,g){var h=this._.panel,m=h.showBlock(a);this._.showBlockParams=[].slice.call(arguments);this.allowBlur(!1);var e=this._.editor.editable();this._.returnFocus=e.hasFocus?e:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var n=this.element,e=this._.iframe,
e=CKEDITOR.env.ie&&!CKEDITOR.env.edge?e:new CKEDITOR.dom.window(e.$.contentWindow),q=n.getDocument(),y=this._.parentElement.getPositionedAncestor(),u=c.getDocumentPosition(q),q=y?y.getDocumentPosition(q):{x:0,y:0},p="rtl"==this._.dir,v=u.x+(f||0)-q.x,w=u.y+(k||0)-q.y;!p||1!=d&&4!=d?p||2!=d&&3!=d||(v+=c.$.offsetWidth-1):v+=c.$.offsetWidth;if(3==d||4==d)w+=c.$.offsetHeight-1;this._.panel._.offsetParentId=c.getId();n.setStyles({top:w+"px",left:0,display:""});n.setOpacity(0);n.getFirst().removeStyle("width");
this._.editor.focusManager.add(e);this._.blurSet||(CKEDITOR.event.useCapture=!0,e.on("blur",function(a){function b(){delete this._.returnFocus;this.hide()}this.allowBlur()&&a.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&this.visible&&!this._.activeChild&&(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(b,0,this)):b.call(this))},this),e.on("focus",function(){this._.focused=!0;this.hideChild();this.allowBlur(!0)},this),CKEDITOR.env.iOS&&(e.on("touchstart",function(){clearTimeout(this._.hideTimeout)},
this),e.on("touchend",function(){this._.hideTimeout=0;this.focus()},this)),CKEDITOR.event.useCapture=!1,this._.blurSet=1);h.onEscape=CKEDITOR.tools.bind(function(a){if(this.onEscape&&!1===this.onEscape(a))return!1},this);CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.tools.bind(function(){var a=n;a.removeStyle("width");if(m.autoSize){var b=m.element.getDocument(),b=(CKEDITOR.env.webkit||CKEDITOR.env.edge?m.element:b.getBody()).$.scrollWidth;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetWidth||
0)-(a.$.clientWidth||0)+3);a.setStyle("width",b+10+"px");b=m.element.$.scrollHeight;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetHeight||0)-(a.$.clientHeight||0)+3);a.setStyle("height",b+"px");h._.currentBlock.element.setStyle("display","none").removeStyle("display")}else a.removeStyle("height");p&&(v-=n.$.offsetWidth);n.setStyle("left",v+"px");var b=h.element.getWindow(),a=n.$.getBoundingClientRect(),b=b.getViewPaneSize(),c=a.width||a.right-a.left,d=a.height||a.bottom-a.top,e=p?a.right:
b.width-a.left,f=p?b.width-a.right:a.left;p?e<c&&(v=f>c?v+c:b.width>c?v-a.left:v-a.right+b.width):e<c&&(v=f>c?v-c:b.width>c?v-a.right+b.width:v-a.left);c=a.top;b.height-a.top<d&&(w=c>d?w-d:b.height>d?w-a.bottom+b.height:w-a.top);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&(b=a=new CKEDITOR.dom.element(n.$.offsetParent),"html"==b.getName()&&(b=b.getDocument().getBody()),"rtl"==b.getComputedStyle("direction")&&(v=CKEDITOR.env.ie8Compat?v-2*n.getDocument().getDocumentElement().$.scrollLeft:v-(a.$.scrollWidth-
a.$.clientWidth)));var a=n.getFirst(),k;(k=a.getCustomData("activePanel"))&&k.onHide&&k.onHide.call(this,1);a.setCustomData("activePanel",this);n.setStyles({top:w+"px",left:v+"px"});n.setOpacity(1);g&&g()},this);h.isLoaded?a():h.onLoad=a;CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();m.element.focus();CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=a);this.allowBlur(!0);this._.markFirst&&(CKEDITOR.env.ie?
CKEDITOR.tools.setTimeout(function(){m.markFirstDisplayed?m.markFirstDisplayed():m._.markFirstDisplayed()},0):m.markFirstDisplayed?m.markFirstDisplayed():m._.markFirstDisplayed());this._.editor.fire("panelShow",this)},0,this)},CKEDITOR.env.air?200:0,this);this.visible=1;this.onShow&&this.onShow.call(this)},reposition:function(){var a=this._.showBlockParams;this.visible&&this._.showBlockParams&&(this.hide(),this.showBlock.apply(this,a))},focus:function(){if(CKEDITOR.env.webkit){var a=CKEDITOR.document.getActive();
a&&!a.equals(this._.iframe)&&a.$.blur()}(this._.lastFocused||this._.iframe.getFrameDocument().getWindow()).focus()},blur:function(){var a=this._.iframe.getFrameDocument().getActive();a&&a.is("a")&&(this._.lastFocused=a)},hide:function(a){if(this.visible&&(!this.onHide||!0!==this.onHide.call(this))){this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle("display","none");this.visible=0;this.element.getFirst().removeCustomData("activePanel");
if(a=a&&this._.returnFocus)CKEDITOR.env.webkit&&a.type&&a.getWindow().$.focus(),a.focus();delete this._.lastFocused;this._.showBlockParams=null;this._.editor.fire("panelHide",this)}},allowBlur:function(a){var c=this._.panel;void 0!==a&&(c.allowBlur=a);return c.allowBlur},showAsChild:function(a,c,d,f,k,g){if(this._.activeChild!=a||a._.panel._.offsetParentId!=d.getId())this.hideChild(),a.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){this._.focused||this.hide()},0,this)},
this),this._.activeChild=a,this._.focused=!1,a.showBlock(c,d,f,k,g),this.blur(),(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){a.element.getChild(0).$.style.cssText+=""},100)},hideChild:function(a){var c=this._.activeChild;c&&(delete c.onHide,delete this._.activeChild,c.hide(),a&&this.focus())}}});CKEDITOR.on("instanceDestroyed",function(){var a=CKEDITOR.tools.isEmpty(CKEDITOR.instances),c;for(c in f){var d=f[c];a?d.destroy():d.element.hide()}a&&(f={})})}(),CKEDITOR.plugins.add("menu",
{requires:"floatpanel",beforeInit:function(a){for(var f=a.config.menu_groups.split(","),b=a._.menuGroups={},c=a._.menuItems={},d=0;d<f.length;d++)b[f[d]]=d+1;a.addMenuGroup=function(a,c){b[a]=c||100};a.addMenuItem=function(a,d){b[d.group]&&(c[a]=new CKEDITOR.menuItem(this,a,d))};a.addMenuItems=function(a){for(var b in a)this.addMenuItem(b,a[b])};a.getMenuItem=function(a){return c[a]};a.removeMenuItem=function(a){delete c[a]}}}),function(){function a(a){a.sort(function(a,b){return a.group<b.group?
-1:a.group>b.group?1:a.order<b.order?-1:a.order>b.order?1:0})}var f='\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&
(f+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(f+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');var f=f+(' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),b=CKEDITOR.addTemplate("menuItem",f+'\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
c=CKEDITOR.addTemplate("menuArrow",'\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),d=CKEDITOR.addTemplate("menuShortcut",'\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(a,b){b=this._.definition=b||{};this.id=CKEDITOR.tools.getNextId();this.editor=a;this.items=[];this._.listeners=[];this._.level=b.level||1;var c=CKEDITOR.tools.extend({},b.panel,{css:[CKEDITOR.skin.getPath("editor")],
level:this._.level-1,block:{}}),d=c.block.attributes=c.attributes||{};!d.role&&(d.role="menu");this._.panelDefinition=c},_:{onShow:function(){var a=this.editor.getSelection(),b=a&&a.getStartElement(),c=this.editor.elementPath(),d=this._.listeners;this.removeAll();for(var f=0;f<d.length;f++){var e=d[f](b,a,c);if(e)for(var n in e){var q=this.editor.getMenuItem(n);!q||q.command&&!this.editor.getCommand(q.command).state||(q.state=e[n],this.add(q))}}},onClick:function(a){this.hide();if(a.onClick)a.onClick();
else a.command&&this.editor.execCommand(a.command)},onEscape:function(a){var b=this.parent;b?b._.panel.hideChild(1):27==a&&this.hide(1);return!1},onHide:function(){this.onHide&&this.onHide()},showSubMenu:function(a){var b=this._.subMenu,c=this.items[a];if(c=c.getItems&&c.getItems()){b?b.removeAll():(b=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},!0)),b.parent=this,b._.onClick=CKEDITOR.tools.bind(this._.onClick,this));for(var d in c){var f=
this.editor.getMenuItem(d);f&&(f.state=c[d],b.add(f))}var e=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+String(a));setTimeout(function(){b.show(e,2)},0)}else this._.panel.hideChild(1)}},proto:{add:function(a){a.order||(a.order=this.items.length);this.items.push(a)},removeAll:function(){this.items=[]},show:function(b,c,d,f){if(!this.parent&&(this._.onShow(),!this.items.length))return;c=c||("rtl"==this.editor.lang.dir?2:1);var m=this.items,e=this.editor,n=this._.panel,q=this._.element;
if(!n){n=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level);n.onEscape=CKEDITOR.tools.bind(function(a){if(!1===this._.onEscape(a))return!1},this);n.onShow=function(){n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")};n.onHide=CKEDITOR.tools.bind(function(){this._.onHide&&this._.onHide()},this);q=n.addBlock(this.id,this._.panelDefinition.block);q.autoSize=!0;var y=q.keys;y[40]="next";y[9]="next";y[38]=
"prev";y[CKEDITOR.SHIFT+9]="prev";y["rtl"==e.lang.dir?37:39]=CKEDITOR.env.ie?"mouseup":"click";y[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(y[13]="mouseup");q=this._.element=q.element;y=q.getDocument();y.getBody().setStyle("overflow","hidden");y.getElementsByTag("html").getItem(0).setStyle("overflow","hidden");this._.itemOverFn=CKEDITOR.tools.addFunction(function(a){clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,e.config.menu_subMenuDelay||
400,this,[a])},this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){clearTimeout(this._.showSubTimeout)},this);this._.itemClickFn=CKEDITOR.tools.addFunction(function(a){var b=this.items[a];if(b.state==CKEDITOR.TRISTATE_DISABLED)this.hide(1);else if(b.getItems)this._.showSubMenu(a);else this._.onClick(b)},this)}a(m);for(var y=e.elementPath(),y=['\x3cdiv class\x3d"cke_menu'+(y&&y.direction()!=e.lang.dir?" cke_mixed_dir_content":"")+'" role\x3d"presentation"\x3e'],u=m.length,p=u&&m[0].group,
v=0;v<u;v++){var w=m[v];p!=w.group&&(y.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),p=w.group);w.render(this,v,y)}y.push("\x3c/div\x3e");q.setHtml(y.join(""));CKEDITOR.ui.fire("ready",this);this.parent?this.parent._.panel.showAsChild(n,this.id,b,c,d,f):n.showBlock(this.id,b,c,d,f);e.fire("menuShow",[n])},addListener:function(a){this._.listeners.push(a)},hide:function(a){this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(a)},findItemByCommandName:function(a){var b=
CKEDITOR.tools.array.filter(this.items,function(b){return a===b.command});return b.length?(b=b[0],{item:b,element:this._.element.findOne("."+b.className)}):null}}});CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(a,b,c){CKEDITOR.tools.extend(this,c,{order:0,className:"cke_menubutton__"+b});this.group=a._.menuGroups[this.group];this.editor=a;this.name=b},proto:{render:function(a,f,g){var h=a.id+String(f),m="undefined"==typeof this.state?CKEDITOR.TRISTATE_OFF:this.state,e="",n=this.editor,
q,y,u=m==CKEDITOR.TRISTATE_ON?"on":m==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";this.role in{menuitemcheckbox:1,menuitemradio:1}&&(e=' aria-checked\x3d"'+(m==CKEDITOR.TRISTATE_ON?"true":"false")+'"');var p=this.getItems,v="\x26#"+("rtl"==this.editor.lang.dir?"9668":"9658")+";",w=this.name;this.icon&&!/\./.test(this.icon)&&(w=this.icon);this.command&&(q=n.getCommand(this.command),(q=n.getCommandKeystroke(q))&&(y=CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard,q)));a={id:h,name:this.name,
iconName:w,label:this.label,cls:this.className||"",state:u,hasPopup:p?"true":"false",disabled:m==CKEDITOR.TRISTATE_DISABLED,title:this.label+(y?" ("+y.display+")":""),ariaShortcut:y?n.lang.common.keyboardShortcut+" "+y.aria:"",href:"javascript:void('"+(this.label||"").replace("'")+"')",hoverFn:a._.itemOverFn,moveOutFn:a._.itemOutFn,clickFn:a._.itemClickFn,index:f,iconStyle:CKEDITOR.skin.getIconStyle(w,"rtl"==this.editor.lang.dir,w==this.icon?null:this.icon,this.iconOffset),shortcutHtml:y?d.output({shortcut:y.display}):
"",arrowHtml:p?c.output({label:v}):"",role:this.role?this.role:"menuitem",ariaChecked:e};b.output(a,g)}}})}(),CKEDITOR.config.menu_groups="clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu",{requires:"menu",onLoad:function(){CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu,$:function(a){this.base.call(this,a,{panel:{css:a.config.contextmenu_contentsCss,
className:"cke_menu_panel",attributes:{"aria-label":a.lang.contextmenu.options}}})},proto:{addTarget:function(a,f){function b(){d=!1}var c,d;a.on("contextmenu",function(a){a=a.data;var b=CKEDITOR.env.webkit?c:CKEDITOR.env.mac?a.$.metaKey:a.$.ctrlKey;if(!f||!b)if(a.preventDefault(),!d){if(CKEDITOR.env.mac&&CKEDITOR.env.webkit){var b=this.editor,h=(new CKEDITOR.dom.elementPath(a.getTarget(),b.editable())).contains(function(a){return a.hasAttribute("contenteditable")},!0);h&&"false"==h.getAttribute("contenteditable")&&
b.getSelection().fake(h)}var h=a.getTarget().getDocument(),m=a.getTarget().getDocument().getDocumentElement(),b=!h.equals(CKEDITOR.document),h=h.getWindow().getScrollPosition(),e=b?a.$.clientX:a.$.pageX||h.x+a.$.clientX,l=b?a.$.clientY:a.$.pageY||h.y+a.$.clientY;CKEDITOR.tools.setTimeout(function(){this.open(m,null,e,l)},CKEDITOR.env.ie?200:0,this)}},this);if(CKEDITOR.env.webkit){var l=function(){c=0};a.on("keydown",function(a){c=CKEDITOR.env.mac?a.data.$.metaKey:a.data.$.ctrlKey});a.on("keyup",l);
a.on("contextmenu",l)}CKEDITOR.env.gecko&&!CKEDITOR.env.mac&&(a.on("keydown",function(a){a.data.$.shiftKey&&121===a.data.$.keyCode&&(d=!0)},null,null,0),a.on("keyup",b),a.on("contextmenu",b))},open:function(a,f,b,c){!1!==this.editor.config.enableContextMenu&&this.editor.getSelection().getType()!==CKEDITOR.SELECTION_NONE&&(this.editor.focus(),a=a||CKEDITOR.document.getDocumentElement(),this.editor.selectionChange(1),this.show(a,f,b,c))}}})},beforeInit:function(a){var f=a.contextMenu=new CKEDITOR.plugins.contextMenu(a);
a.on("contentDom",function(){f.addTarget(a.editable(),!1!==a.config.browserContextMenuOnCtrl)});a.addCommand("contextMenu",{exec:function(a){var c=0,d=0,f=a.getSelection().getRanges(),f=f[f.length-1].getClientRects(a.editable().isInline());if(f=f[f.length-1])c=f["rtl"===a.lang.dir?"left":"right"],d=f.bottom;a.contextMenu.open(a.document.getBody().getParent(),null,c,d)}});a.setKeystroke(CKEDITOR.SHIFT+121,"contextMenu");a.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121,"contextMenu")}}),function(){function a(a,
b){function k(b){b=e.list[b];var c;b.equals(a.editable())||"true"==b.getAttribute("contenteditable")?(c=a.createRange(),c.selectNodeContents(b),c=c.select()):(c=a.getSelection(),c.selectElement(b));CKEDITOR.env.ie&&a.fire("selectionChange",{selection:c,path:new CKEDITOR.dom.elementPath(b)});a.focus()}function g(){m&&m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');delete e.list}var h=a.ui.spaceId("path"),m,e=a._.elementsPath,n=e.idBase;b.html+='\x3cspan id\x3d"'+h+'_label" class\x3d"cke_voice_label"\x3e'+
a.lang.elementspath.eleLabel+'\x3c/span\x3e\x3cspan id\x3d"'+h+'" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"'+h+'_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';a.on("uiReady",function(){var b=a.ui.space("path");b&&a.focusManager.add(b,1)});e.onClick=k;var q=CKEDITOR.tools.addFunction(k),y=CKEDITOR.tools.addFunction(function(b,c){var g=e.idBase,f;c=new CKEDITOR.dom.event(c);f="rtl"==a.lang.dir;switch(c.getKeystroke()){case f?39:37:case 9:return(f=
CKEDITOR.document.getById(g+(b+1)))||(f=CKEDITOR.document.getById(g+"0")),f.focus(),!1;case f?37:39:case CKEDITOR.SHIFT+9:return(f=CKEDITOR.document.getById(g+(b-1)))||(f=CKEDITOR.document.getById(g+(e.list.length-1))),f.focus(),!1;case 27:return a.focus(),!1;case 13:case 32:return k(b),!1}return!0});a.on("selectionChange",function(b){for(var g=[],f=e.list=[],k=[],l=e.filters,z=!0,t=b.data.path.elements,x=t.length;x--;){var A=t[x],B=0;b=A.data("cke-display-name")?A.data("cke-display-name"):A.data("cke-real-element-type")?
A.data("cke-real-element-type"):A.getName();(z=A.hasAttribute("contenteditable")?"true"==A.getAttribute("contenteditable"):z)||A.hasAttribute("contenteditable")||(B=1);for(var C=0;C<l.length;C++){var H=l[C](A,b);if(!1===H){B=1;break}b=H||b}B||(f.unshift(A),k.unshift(b))}f=f.length;for(l=0;l<f;l++)b=k[l],z=a.lang.elementspath.eleTitle.replace(/%1/,b),b=c.output({id:n+l,label:z,text:b,jsTitle:"javascript:void('"+b+"')",index:l,keyDownFn:y,clickFn:q}),g.unshift(b);m||(m=CKEDITOR.document.getById(h));
k=m;k.setHtml(g.join("")+'\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');a.fire("elementsPathUpdate",{space:k})});a.on("readOnly",g);a.on("contentDomUnload",g);a.addCommand("elementsPathFocus",f.toolbarFocus);a.setKeystroke(CKEDITOR.ALT+122,"elementsPathFocus")}var f={toolbarFocus:{editorFocus:!1,readOnly:1,exec:function(a){(a=CKEDITOR.document.getById(a._.elementsPath.idBase+"0"))&&a.focus(CKEDITOR.env.ie||CKEDITOR.env.air)}}},b="";CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(b+=' onkeypress\x3d"return false;"');
CKEDITOR.env.gecko&&(b+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var c=CKEDITOR.addTemplate("pathItem",'\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"'+b+' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
CKEDITOR.plugins.add("elementspath",{init:function(b){b._.elementsPath={idBase:"cke_elementspath_"+CKEDITOR.tools.getNextNumber()+"_",filters:[]};b.on("uiSpace",function(c){"bottom"==c.data.space&&a(b,c.data)})}})}(),function(){function a(a,d){var l,k;d.on("refresh",function(a){var c=[f],d;for(d in a.data.states)c.push(a.data.states[d]);this.setState(CKEDITOR.tools.search(c,b)?b:f)},d,null,100);d.on("exec",function(b){l=a.getSelection();k=l.createBookmarks(1);b.data||(b.data={});b.data.done=!1},d,
null,0);d.on("exec",function(){a.forceNextSelectionCheck();l.selectBookmarks(k)},d,null,100)}var f=CKEDITOR.TRISTATE_DISABLED,b=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indent",{init:function(b){var d=CKEDITOR.plugins.indent.genericDefinition;a(b,b.addCommand("indent",new d(!0)));a(b,b.addCommand("outdent",new d));b.ui.addButton&&(b.ui.addButton("Indent",{label:b.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),b.ui.addButton("Outdent",{label:b.lang.indent.outdent,command:"outdent",
directional:!0,toolbar:"indent,10"}));b.on("dirChanged",function(a){var d=b.createRange(),g=a.data.node;d.setStartBefore(g);d.setEndAfter(g);for(var f=new CKEDITOR.dom.walker(d),m;m=f.next();)if(m.type==CKEDITOR.NODE_ELEMENT)if(!m.equals(g)&&m.getDirection())d.setStartAfter(m),f=new CKEDITOR.dom.walker(d);else{var e=b.config.indentClasses;if(e)for(var n="ltr"==a.data.dir?["_rtl",""]:["","_rtl"],q=0;q<e.length;q++)m.hasClass(e[q]+n[0])&&(m.removeClass(e[q]+n[0]),m.addClass(e[q]+n[1]));e=m.getStyle("margin-right");
n=m.getStyle("margin-left");e?m.setStyle("margin-left",e):m.removeStyle("margin-left");n?m.setStyle("margin-right",n):m.removeStyle("margin-right")}})}});CKEDITOR.plugins.indent={genericDefinition:function(a){this.isIndent=!!a;this.startDisabled=!this.isIndent},specificDefinition:function(a,b,f){this.name=b;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!f;this.relatedGlobal=f?"indent":"outdent";this.indentKey=f?9:CKEDITOR.SHIFT+9;this.database={}},registerCommands:function(a,
b){a.on("pluginsLoaded",function(){for(var a in b)(function(a,b){var c=a.getCommand(b.relatedGlobal),d;for(d in b.jobs)c.on("exec",function(c){c.data.done||(a.fire("lockSnapshot"),b.execJob(a,d)&&(c.data.done=!0),a.fire("unlockSnapshot"),CKEDITOR.dom.element.clearAllMarkers(b.database))},this,null,d),c.on("refresh",function(c){c.data.states||(c.data.states={});c.data.states[b.name+"@"+d]=b.refreshJob(a,d,c.data.path)},this,null,d);a.addFeature(b)})(this,b[a])})}};CKEDITOR.plugins.indent.genericDefinition.prototype=
{context:"p",exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a,b){var l=this.jobs[b];if(l.state!=f)return l.exec.call(this,a)},refreshJob:function(a,b,l){b=this.jobs[b];a.activeFilter.checkFeature(this)?b.state=b.refresh.call(this,a,l):b.state=f;return b.state},getContext:function(a){return a.contains(this.context)}}}(),function(){function a(a){function c(f){for(var h=l.startContainer,r=l.endContainer;h&&!h.getParent().equals(f);)h=h.getParent();for(;r&&!r.getParent().equals(f);)r=
r.getParent();if(!h||!r)return!1;for(var z=[],t=!1;!t;)h.equals(r)&&(t=!0),z.push(h),h=h.getNext();if(1>z.length)return!1;h=f.getParents(!0);for(r=0;r<h.length;r++)if(h[r].getName&&k[h[r].getName()]){f=h[r];break}for(var h=d.isIndent?1:-1,r=z[0],z=z[z.length-1],t=CKEDITOR.plugins.list.listToArray(f,e),x=t[z.getCustomData("listarray_index")].indent,r=r.getCustomData("listarray_index");r<=z.getCustomData("listarray_index");r++)if(t[r].indent+=h,0<h){for(var A=t[r].parent,B=r-1;0<=B;B--)if(t[B].indent===
h){A=t[B].parent;break}t[r].parent=new CKEDITOR.dom.element(A.getName(),A.getDocument())}for(r=z.getCustomData("listarray_index")+1;r<t.length&&t[r].indent>x;r++)t[r].indent+=h;h=CKEDITOR.plugins.list.arrayToList(t,e,null,a.config.enterMode,f.getDirection());if(!d.isIndent){var C;if((C=f.getParent())&&C.is("li"))for(var z=h.listNode.getChildren(),u=[],p,r=z.count()-1;0<=r;r--)(p=z.getItem(r))&&p.is&&p.is("li")&&u.push(p)}h&&h.listNode.replace(f);if(u&&u.length)for(r=0;r<u.length;r++){for(p=f=u[r];(p=
p.getNext())&&p.is&&p.getName()in k;)CKEDITOR.env.needsNbspFiller&&!f.getFirst(b)&&f.append(l.document.createText(" ")),f.append(p);f.insertAfter(C)}h&&a.fire("contentDomInvalidated");return!0}for(var d=this,e=this.database,k=this.context,l,y=a.getSelection(),y=(y&&y.getRanges()).createIterator();l=y.getNextRange();){for(var u=l.getCommonAncestor();u&&(u.type!=CKEDITOR.NODE_ELEMENT||!k[u.getName()]);){if(a.editable().equals(u)){u=!1;break}u=u.getParent()}u||(u=l.startPath().contains(k))&&l.setEndAt(u,
CKEDITOR.POSITION_BEFORE_END);if(!u){var p=l.getEnclosedNode();p&&p.type==CKEDITOR.NODE_ELEMENT&&p.getName()in k&&(l.setStartAt(p,CKEDITOR.POSITION_AFTER_START),l.setEndAt(p,CKEDITOR.POSITION_BEFORE_END),u=p)}u&&l.startContainer.type==CKEDITOR.NODE_ELEMENT&&l.startContainer.getName()in k&&(p=new CKEDITOR.dom.walker(l),p.evaluator=f,l.startContainer=p.next());u&&l.endContainer.type==CKEDITOR.NODE_ELEMENT&&l.endContainer.getName()in k&&(p=new CKEDITOR.dom.walker(l),p.evaluator=f,l.endContainer=p.previous());
if(u)return c(u)}return 0}function f(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.is("li")}function b(a){return c(a)&&d(a)}var c=CKEDITOR.dom.walker.whitespaces(!0),d=CKEDITOR.dom.walker.bookmark(!1,!0),l=CKEDITOR.TRISTATE_DISABLED,k=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(b){function c(b){d.specificDefinition.apply(this,arguments);this.requiredContent=["ul","ol"];b.on("key",function(a){var c=b.elementPath();if("wysiwyg"==b.mode&&a.data.keyCode==this.indentKey&&
c){var d=this.getContext(c);!d||this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,c,d)||(b.execCommand(this.relatedGlobal),a.cancel())}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(a,b){var c=this.getContext(b),d=CKEDITOR.plugins.indentList.firstItemInPath(this.context,b,c);return c&&this.isIndent&&!d?k:l}:function(a,b){return!this.getContext(b)||this.isIndent?l:k},exec:CKEDITOR.tools.bind(a,this)}}var d=CKEDITOR.plugins.indent;d.registerCommands(b,{indentlist:new c(b,
"indentlist",!0),outdentlist:new c(b,"outdentlist")});CKEDITOR.tools.extend(c.prototype,d.specificDefinition.prototype,{context:{ol:1,ul:1}})}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(a,b,c){var d=b.contains(f);c||(c=b.contains(a));return c&&d&&d.equals(c.getFirst(f))}}(),function(){function a(a,b,c,d){for(var e=CKEDITOR.plugins.list.listToArray(b.root,c),g=[],f=0;f<b.contents.length;f++){var h=b.contents[f];(h=h.getAscendant("li",!0))&&!h.getCustomData("list_item_processed")&&
(g.push(h),CKEDITOR.dom.element.setMarker(c,h,"list_item_processed",!0))}for(var h=b.root.getDocument(),k,l,f=0;f<g.length;f++){var m=g[f].getCustomData("listarray_index");k=e[m].parent;k.is(this.type)||(l=h.createElement(this.type),k.copyAttributes(l,{start:1,type:1}),l.removeStyle("list-style-type"),e[m].parent=l)}c=CKEDITOR.plugins.list.arrayToList(e,c,null,a.config.enterMode);for(var n,e=c.listNode.getChildCount(),f=0;f<e&&(n=c.listNode.getChild(f));f++)n.getName()==this.type&&d.push(n);c.listNode.replace(b.root);
a.fire("contentDomInvalidated")}function f(a,b,c){var d=b.contents,e=b.root.getDocument(),g=[];if(1==d.length&&d[0].equals(b.root)){var f=e.createElement("div");d[0].moveChildren&&d[0].moveChildren(f);d[0].append(f);d[0]=f}b=b.contents[0].getParent();for(f=0;f<d.length;f++)b=b.getCommonAncestor(d[f].getParent());a=a.config.useComputedState;var h,k;a=void 0===a||a;for(f=0;f<d.length;f++)for(var l=d[f],m;m=l.getParent();){if(m.equals(b)){g.push(l);!k&&l.getDirection()&&(k=1);l=l.getDirection(a);null!==
h&&(h=h&&h!=l?null:l);break}l=m}if(!(1>g.length)){d=g[g.length-1].getNext();f=e.createElement(this.type);for(c.push(f);g.length;)c=g.shift(),a=e.createElement("li"),l=c,l.is("pre")||u.test(l.getName())||"false"==l.getAttribute("contenteditable")?c.appendTo(a):(c.copyAttributes(a),h&&c.getDirection()&&(a.removeStyle("direction"),a.removeAttribute("dir")),c.moveChildren(a),c.remove()),a.appendTo(f);h&&k&&f.setAttribute("dir",h);d?f.insertBefore(d):f.appendTo(b)}}function b(a,b,c){function d(c){if(!(!(l=
k[c?"getFirst":"getLast"]())||l.is&&l.isBlockBoundary()||!(m=b.root[c?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))||m.is&&m.isBlockBoundary({br:1})))a.document.createElement("br")[c?"insertBefore":"insertAfter"](l)}for(var e=CKEDITOR.plugins.list.listToArray(b.root,c),g=[],f=0;f<b.contents.length;f++){var h=b.contents[f];(h=h.getAscendant("li",!0))&&!h.getCustomData("list_item_processed")&&(g.push(h),CKEDITOR.dom.element.setMarker(c,h,"list_item_processed",!0))}h=null;for(f=0;f<g.length;f++)h=
g[f].getCustomData("listarray_index"),e[h].indent=-1;for(f=h+1;f<e.length;f++)if(e[f].indent>e[f-1].indent+1){g=e[f-1].indent+1-e[f].indent;for(h=e[f].indent;e[f]&&e[f].indent>=h;)e[f].indent+=g,f++;f--}var k=CKEDITOR.plugins.list.arrayToList(e,c,null,a.config.enterMode,b.root.getAttribute("dir")).listNode,l,m;d(!0);d();k.replace(b.root);a.fire("contentDomInvalidated")}function c(a,b){this.name=a;this.context=this.type=b;this.allowedContent=b+" li";this.requiredContent=b}function d(a,b,c,d){for(var e,
g;e=a[d?"getLast":"getFirst"](p);)(g=e.getDirection(1))!==b.getDirection(1)&&e.setAttribute("dir",g),e.remove(),c?e[d?"insertBefore":"insertAfter"](c):b.append(e,d),c=e}function l(a){function b(c){var e=a[c?"getPrevious":"getNext"](q);e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is(a.getName())&&(d(a,e,null,!c),a.remove(),a=e)}b();b(1)}function k(a){return a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in CKEDITOR.dtd.$block||a.getName()in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[a.getName()]["#"]}function g(a,b,
c){a.fire("saveSnapshot");c.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var e=c.extractContents();b.trim(!1,!0);var g=b.createBookmark(),f=new CKEDITOR.dom.elementPath(b.startContainer),k=f.block,f=f.lastElement.getAscendant("li",1)||k,m=new CKEDITOR.dom.elementPath(c.startContainer),n=m.contains(CKEDITOR.dtd.$listItem),m=m.contains(CKEDITOR.dtd.$list);k?(k=k.getBogus())&&k.remove():m&&(k=m.getPrevious(q))&&y(k)&&k.remove();(k=e.getLast())&&k.type==CKEDITOR.NODE_ELEMENT&&k.is("br")&&k.remove();(k=
b.startContainer.getChild(b.startOffset))?e.insertBefore(k):b.startContainer.append(e);n&&(e=h(n))&&(f.contains(n)?(d(e,n.getParent(),n),e.remove()):f.append(e));for(;c.checkStartOfBlock()&&c.checkEndOfBlock();){m=c.startPath();e=m.block;if(!e)break;e.is("li")&&(f=e.getParent(),e.equals(f.getLast(q))&&e.equals(f.getFirst(q))&&(e=f));c.moveToPosition(e,CKEDITOR.POSITION_BEFORE_START);e.remove()}c=c.clone();e=a.editable();c.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(c);c.evaluator=
function(a){return q(a)&&!y(a)};(c=c.next())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in CKEDITOR.dtd.$list&&l(c);b.moveToBookmark(g);b.select();a.fire("saveSnapshot")}function h(a){return(a=a.getLast(q))&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in m?a:null}var m={ol:1,ul:1},e=CKEDITOR.dom.walker.whitespaces(),n=CKEDITOR.dom.walker.bookmark(),q=function(a){return!(e(a)||n(a))},y=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(a,b,c,d,e){if(!m[a.getName()])return[];d||(d=
0);c||(c=[]);for(var g=0,f=a.getChildCount();g<f;g++){var h=a.getChild(g);h.type==CKEDITOR.NODE_ELEMENT&&h.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(h,b,c,d+1);if("li"==h.$.nodeName.toLowerCase()){var k={parent:a,indent:d,element:h,contents:[]};e?k.grandparent=e:(k.grandparent=a.getParent(),k.grandparent&&"li"==k.grandparent.$.nodeName.toLowerCase()&&(k.grandparent=k.grandparent.getParent()));b&&CKEDITOR.dom.element.setMarker(b,h,"listarray_index",c.length);c.push(k);for(var l=
0,n=h.getChildCount(),q;l<n;l++)q=h.getChild(l),q.type==CKEDITOR.NODE_ELEMENT&&m[q.getName()]?CKEDITOR.plugins.list.listToArray(q,b,c,d+1,k.grandparent):k.contents.push(q)}}return c},arrayToList:function(a,b,c,d,e){c||(c=0);if(!a||a.length<c+1)return null;for(var g,f=a[c].parent.getDocument(),h=new CKEDITOR.dom.documentFragment(f),k=null,l=c,u=Math.max(a[c].indent,0),p=null,y,E,L=d==CKEDITOR.ENTER_P?"p":"div";;){var G=a[l];g=G.grandparent;y=G.element.getDirection(1);if(G.indent==u){k&&a[l].parent.getName()==
k.getName()||(k=a[l].parent.clone(!1,1),e&&k.setAttribute("dir",e),h.append(k));p=k.append(G.element.clone(0,1));y!=k.getDirection(1)&&p.setAttribute("dir",y);for(g=0;g<G.contents.length;g++)p.append(G.contents[g].clone(1,1));l++}else if(G.indent==Math.max(u,0)+1)G=a[l-1].element.getDirection(1),l=CKEDITOR.plugins.list.arrayToList(a,null,l,d,G!=y?y:null),!p.getChildCount()&&CKEDITOR.env.needsNbspFiller&&7>=f.$.documentMode&&p.append(f.createText(" ")),p.append(l.listNode),l=l.nextIndex;else if(-1==
G.indent&&!c&&g){m[g.getName()]?(p=G.element.clone(!1,!0),y!=g.getDirection(1)&&p.setAttribute("dir",y)):p=new CKEDITOR.dom.documentFragment(f);var k=g.getDirection(1)!=y,D=G.element,N=D.getAttribute("class"),Q=D.getAttribute("style"),O=p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(d!=CKEDITOR.ENTER_BR||k||Q||N),K,W=G.contents.length,R;for(g=0;g<W;g++)if(K=G.contents[g],n(K)&&1<W)O?R=K.clone(1,1):p.append(K.clone(1,1));else if(K.type==CKEDITOR.NODE_ELEMENT&&K.isBlockBoundary()){k&&!K.getDirection()&&
K.setAttribute("dir",y);E=K;var Z=D.getAttribute("style");Z&&E.setAttribute("style",Z.replace(/([^;])$/,"$1;")+(E.getAttribute("style")||""));N&&K.addClass(N);E=null;R&&(p.append(R),R=null);p.append(K.clone(1,1))}else O?(E||(E=f.createElement(L),p.append(E),k&&E.setAttribute("dir",y)),Q&&E.setAttribute("style",Q),N&&E.setAttribute("class",N),R&&(E.append(R),R=null),E.append(K.clone(1,1))):p.append(K.clone(1,1));R&&((E||p).append(R),R=null);p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&l!=a.length-1&&(CKEDITOR.env.needsBrFiller&&
(y=p.getLast())&&y.type==CKEDITOR.NODE_ELEMENT&&y.is("br")&&y.remove(),(y=p.getLast(q))&&y.type==CKEDITOR.NODE_ELEMENT&&y.is(CKEDITOR.dtd.$block)||p.append(f.createElement("br")));y=p.$.nodeName.toLowerCase();"div"!=y&&"p"!=y||p.appendBogus();h.append(p);k=null;l++}else return null;E=null;if(a.length<=l||Math.max(a[l].indent,0)<u)break}if(b)for(a=h.getFirst();a;){if(a.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(b,a),a.getName()in CKEDITOR.dtd.$listItem&&(c=a,f=e=d=void 0,d=c.getDirection()))){for(e=
c.getParent();e&&!(f=e.getDirection());)e=e.getParent();d==f&&c.removeAttribute("dir")}a=a.getNextSourceNode()}return{listNode:h,nextIndex:l}}};var u=/^h[1-6]$/,p=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);c.prototype={exec:function(c){function d(a){return m[a.root.getName()]&&!e(a.root,[CKEDITOR.NODE_COMMENT])}function e(a,b){return CKEDITOR.tools.array.filter(a.getChildren().toArray(),function(a){return-1===CKEDITOR.tools.array.indexOf(b,a.type)}).length}function g(a){var b=!0;if(0===a.getChildCount())return!1;
a.forEach(function(a){if(a.type!==CKEDITOR.NODE_COMMENT)return b=!1},null,!0);return b}this.refresh(c,c.elementPath());var h=c.config,k=c.getSelection(),n=k&&k.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var B=c.editable();if(B.getFirst(q)){var p=1==n.length&&n[0];(h=p&&p.getEnclosedNode())&&h.is&&this.type==h.getName()&&this.setState(CKEDITOR.TRISTATE_ON)}else h.enterMode==CKEDITOR.ENTER_BR?B.appendBogus():n[0].fixBlock(1,h.enterMode==CKEDITOR.ENTER_P?"p":"div"),k.selectRanges(n)}for(var h=
k.createBookmarks(!0),B=[],u={},n=n.createIterator(),y=0;(p=n.getNextRange())&&++y;){var I=p.getBoundaryNodes(),J=I.startNode,E=I.endNode;J.type==CKEDITOR.NODE_ELEMENT&&"td"==J.getName()&&p.setStartAt(I.startNode,CKEDITOR.POSITION_AFTER_START);E.type==CKEDITOR.NODE_ELEMENT&&"td"==E.getName()&&p.setEndAt(I.endNode,CKEDITOR.POSITION_BEFORE_END);p=p.createIterator();for(p.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;I=p.getNextParagraph();)if(!I.getCustomData("list_block")&&!g(I)){CKEDITOR.dom.element.setMarker(u,
I,"list_block",1);for(var L=c.elementPath(I),J=L.elements,E=0,L=L.blockLimit,G,D=J.length-1;0<=D&&(G=J[D]);D--)if(m[G.getName()]&&L.contains(G)){L.removeCustomData("list_group_object_"+y);(J=G.getCustomData("list_group_object"))?J.contents.push(I):(J={root:G,contents:[I]},B.push(J),CKEDITOR.dom.element.setMarker(u,G,"list_group_object",J));E=1;break}E||(E=L,E.getCustomData("list_group_object_"+y)?E.getCustomData("list_group_object_"+y).contents.push(I):(J={root:E,contents:[I]},CKEDITOR.dom.element.setMarker(u,
E,"list_group_object_"+y,J),B.push(J)))}}for(G=[];0<B.length;)J=B.shift(),this.state==CKEDITOR.TRISTATE_OFF?d(J)||(m[J.root.getName()]?a.call(this,c,J,u,G):f.call(this,c,J,G)):this.state==CKEDITOR.TRISTATE_ON&&m[J.root.getName()]&&!d(J)&&b.call(this,c,J,u);for(D=0;D<G.length;D++)l(G[D]);CKEDITOR.dom.element.clearAllMarkers(u);k.selectBookmarks(h);c.focus()},refresh:function(a,b){var c=b.contains(m,1),d=b.blockLimit||b.root;c&&d.contains(c)?this.setState(c.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):
this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("list",{requires:"indentlist",init:function(a){a.blockless||(a.addCommand("numberedlist",new c("numberedlist","ol")),a.addCommand("bulletedlist",new c("bulletedlist","ul")),a.ui.addButton&&(a.ui.addButton("NumberedList",{label:a.lang.list.numberedlist,command:"numberedlist",directional:!0,toolbar:"list,10"}),a.ui.addButton("BulletedList",{label:a.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),a.on("key",
function(b){var c=b.data.domEvent.getKey(),d;if("wysiwyg"==a.mode&&c in{8:1,46:1}){var e=a.getSelection().getRanges()[0],f=e&&e.startPath();if(e&&e.collapsed){var l=8==c,n=a.editable(),p=new CKEDITOR.dom.walker(e.clone());p.evaluator=function(a){return q(a)&&!y(a)};p.guard=function(a,b){return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("table"))};c=e.clone();if(l){var u;(u=f.contains(m))&&e.checkBoundaryOfElement(u,CKEDITOR.START)&&(u=u.getParent())&&u.is("li")&&(u=h(u))?(d=u,u=u.getPrevious(q),c.moveToPosition(u&&
y(u)?u:d,CKEDITOR.POSITION_BEFORE_START)):(p.range.setStartAt(n,CKEDITOR.POSITION_AFTER_START),p.range.setEnd(e.startContainer,e.startOffset),(u=p.previous())&&u.type==CKEDITOR.NODE_ELEMENT&&(u.getName()in m||u.is("li"))&&(u.is("li")||(p.range.selectNodeContents(u),p.reset(),p.evaluator=k,u=p.previous()),d=u,c.moveToElementEditEnd(d),c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END)));if(d)g(a,c,e),b.cancel();else{var F=f.contains(m);F&&e.checkBoundaryOfElement(F,CKEDITOR.START)&&(d=
F.getFirst(q),e.checkBoundaryOfElement(d,CKEDITOR.START)&&(u=F.getPrevious(q),h(d)?u&&(e.moveToElementEditEnd(u),e.select()):a.execCommand("outdent"),b.cancel()))}}else if(d=f.contains("li")){if(p.range.setEndAt(n,CKEDITOR.POSITION_BEFORE_END),l=(n=d.getLast(q))&&k(n)?n:d,f=0,(u=p.next())&&u.type==CKEDITOR.NODE_ELEMENT&&u.getName()in m&&u.equals(n)?(f=1,u=p.next()):e.checkBoundaryOfElement(l,CKEDITOR.END)&&(f=2),f&&u){e=e.clone();e.moveToElementEditStart(u);if(1==f&&(c.optimize(),!c.startContainer.equals(d))){for(d=
c.startContainer;d.is(CKEDITOR.dtd.$inline);)F=d,d=d.getParent();F&&c.moveToPosition(F,CKEDITOR.POSITION_AFTER_END)}2==f&&(c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END),e.endPath().block&&e.moveToPosition(e.endPath().block,CKEDITOR.POSITION_AFTER_START));g(a,c,e);b.cancel()}}else p.range.setEndAt(n,CKEDITOR.POSITION_BEFORE_END),(u=p.next())&&u.type==CKEDITOR.NODE_ELEMENT&&u.is(m)&&(u=u.getFirst(q),f.block&&e.checkStartOfBlock()&&e.checkEndOfBlock()?(f.block.remove(),e.moveToElementEditStart(u),
e.select()):h(u)?(e.moveToElementEditStart(u),e.select()):(e=e.clone(),e.moveToElementEditStart(u),g(a,c,e)),b.cancel());setTimeout(function(){a.selectionChange(1)})}}}))}})}(),function(){function a(a,b,c){c=a.config.forceEnterMode||c;if("wysiwyg"==a.mode){b||(b=a.activeEnterMode);var d=a.elementPath();d&&!d.isContextFor("p")&&(b=CKEDITOR.ENTER_BR,c=1);a.fire("saveSnapshot");b==CKEDITOR.ENTER_BR?k(a,b,null,c):g(a,b,null,c);a.fire("saveSnapshot")}}function f(a){a=a.getSelection().getRanges(!0);for(var b=
a.length-1;0<b;b--)a[b].deleteContents();return a[0]}function b(a){var b=a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"true"==a.getAttribute("contenteditable")},!0);if(a.root.equals(b))return a;b=new CKEDITOR.dom.range(b);b.moveToRange(a);return b}CKEDITOR.plugins.add("enterkey",{init:function(b){b.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b)}});b.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b,b.activeShiftEnterMode,
1)}});b.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+13,"shiftEnter"]])}});var c=CKEDITOR.dom.walker.whitespaces(),d=CKEDITOR.dom.walker.bookmark(),l,k,g,h;CKEDITOR.plugins.enterkey={enterBlock:function(a,e,g,l){function y(a){var b;if(a===CKEDITOR.ENTER_BR||-1===CKEDITOR.tools.indexOf(["td","th"],w.lastElement.getName())||1!==w.lastElement.getChildCount())return!1;a=w.lastElement.getChild(0).clone(!0);(b=a.getBogus())&&b.remove();return a.getText().length?!1:!0}if(g=g||f(a)){g=b(g);var u=g.document,
p=g.checkStartOfBlock(),v=g.checkEndOfBlock(),w=a.elementPath(g.startContainer),r=w.block,z=e==CKEDITOR.ENTER_DIV?"div":"p",t;if(r&&p&&v){p=r.getParent();if(p.is("li")&&1<p.getChildCount()){u=new CKEDITOR.dom.element("li");t=a.createRange();u.insertAfter(p);r.remove();t.setStart(u,0);a.getSelection().selectRanges([t]);return}if(r.is("li")||r.getParent().is("li")){r.is("li")||(r=r.getParent(),p=r.getParent());t=p.getParent();g=!r.hasPrevious();var x=!r.hasNext();l=a.getSelection();var z=l.createBookmarks(),
A=r.getDirection(1),v=r.getAttribute("class"),B=r.getAttribute("style"),C=t.getDirection(1)!=A;a=a.enterMode!=CKEDITOR.ENTER_BR||C||B||v;if(t.is("li"))g||x?(g&&x&&p.remove(),r[x?"insertAfter":"insertBefore"](t)):r.breakParent(t);else{if(a)if(w.block.is("li")?(t=u.createElement(e==CKEDITOR.ENTER_P?"p":"div"),C&&t.setAttribute("dir",A),B&&t.setAttribute("style",B),v&&t.setAttribute("class",v),r.moveChildren(t)):t=w.block,g||x)t[g?"insertBefore":"insertAfter"](p);else r.breakParent(p),t.insertAfter(p);
else if(r.appendBogus(!0),g||x)for(;u=r[g?"getFirst":"getLast"]();)u[g?"insertBefore":"insertAfter"](p);else for(r.breakParent(p);u=r.getLast();)u.insertAfter(p);r.remove()}l.selectBookmarks(z);return}if(r&&r.getParent().is("blockquote")){r.breakParent(r.getParent());r.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||r.getPrevious().remove();r.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||r.getNext().remove();g.moveToElementEditStart(r);g.select();return}}else if(r&&r.is("pre")&&
!v){k(a,e,g,l);return}if(B=g.splitBlock(z)){a=B.previousBlock;r=B.nextBlock;p=B.wasStartOfBlock;v=B.wasEndOfBlock;r?(x=r.getParent(),x.is("li")&&(r.breakParent(x),r.move(r.getNext(),1))):a&&(x=a.getParent())&&x.is("li")&&(a.breakParent(x),x=a.getNext(),g.moveToElementEditStart(x),a.move(a.getPrevious()));if(p||v)if(y(e))g.moveToElementEditStart(g.getTouchedStartNode());else{if(a){if(a.is("li")||!h.test(a.getName())&&!a.is("pre"))t=a.clone()}else r&&(t=r.clone());t?l&&!t.is("li")&&t.renameNode(z):
x&&x.is("li")?t=x:(t=u.createElement(z),a&&(A=a.getDirection())&&t.setAttribute("dir",A));if(u=B.elementPath)for(e=0,l=u.elements.length;e<l;e++){z=u.elements[e];if(z.equals(u.block)||z.equals(u.blockLimit))break;CKEDITOR.dtd.$removeEmpty[z.getName()]&&(z=z.clone(),t.moveChildren(z),t.append(z))}t.appendBogus();t.getParent()||g.insertNode(t);t.is("li")&&t.removeAttribute("value");!CKEDITOR.env.ie||!p||v&&a.getChildCount()||(g.moveToElementEditStart(v?a:t),g.select());g.moveToElementEditStart(p&&!v?
r:t)}else r.is("li")&&(t=g.clone(),t.selectNodeContents(r),t=new CKEDITOR.dom.walker(t),t.evaluator=function(a){return!(d(a)||c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in CKEDITOR.dtd.$inline&&!(a.getName()in CKEDITOR.dtd.$empty))},(x=t.next())&&x.type==CKEDITOR.NODE_ELEMENT&&x.is("ul","ol")&&(CKEDITOR.env.needsBrFiller?u.createElement("br"):u.createText(" ")).insertBefore(x)),r&&g.moveToElementEditStart(r);g.select();g.scrollIntoView()}}},enterBr:function(a,b,c,d){if(c=c||f(a)){var k=c.document,
l=c.checkEndOfBlock(),p=new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),v=p.block,w=v&&p.block.getName();d||"li"!=w?(!d&&l&&h.test(w)?(l=v.getDirection())?(k=k.createElement("div"),k.setAttribute("dir",l),k.insertAfter(v),c.setStart(k,0)):(k.createElement("br").insertAfter(v),CKEDITOR.env.gecko&&k.createText("").insertAfter(v),c.setStartAt(v.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(a="pre"==w&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?
k.createText("\r"):k.createElement("br"),c.deleteContents(),c.insertNode(a),CKEDITOR.env.needsBrFiller?(k.createText("﻿").insertAfter(a),l&&(v||p.blockLimit).appendBogus(),a.getNext().$.nodeValue="",c.setStartAt(a.getNext(),CKEDITOR.POSITION_AFTER_START)):c.setStartAt(a,CKEDITOR.POSITION_AFTER_END)),c.collapse(!0),c.select(),c.scrollIntoView()):g(a,b,c,d)}}};l=CKEDITOR.plugins.enterkey;k=l.enterBr;g=l.enterBlock;h=/^h[1-6]$/}(),function(){function a(a,b){var c={},d=[],l={nbsp:" ",shy:"­",gt:"\x3e",
lt:"\x3c",amp:"\x26",apos:"'",quot:'"'};a=a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(a,e){var g=b?"\x26"+e+";":l[e];c[g]=b?l[e]:"\x26"+e+";";d.push(g);return""});a=a.replace(/,$/,"");if(!b&&a){a=a.split(",");var k=document.createElement("div"),g;k.innerHTML="\x26"+a.join(";\x26")+";";g=k.innerHTML;k=null;for(k=0;k<g.length;k++){var h=g.charAt(k);c[h]="\x26"+a[k]+";";d.push(h)}}c.regex=d.join(b?"|":"");return c}CKEDITOR.plugins.add("entities",{afterInit:function(f){function b(a){return h[a]}
function c(a){return"force"!=d.entities_processNumerical&&k[a]?k[a]:"\x26#"+a.charCodeAt(0)+";"}var d=f.config;if(f=(f=f.dataProcessor)&&f.htmlFilter){var l=[];!1!==d.basicEntities&&l.push("nbsp,gt,lt,amp");d.entities&&(l.length&&l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
d.entities_latin&&l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),d.entities_greek&&l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
d.entities_additional&&l.push(d.entities_additional));var k=a(l.join(",")),g=k.regex?"["+k.regex+"]":"a^";delete k.regex;d.entities&&d.entities_processNumerical&&(g="[^ -~]|"+g);var g=new RegExp(g,"g"),h=a("nbsp,gt,lt,amp,shy",!0),m=new RegExp(h.regex,"g");f.addRules({text:function(a){return a.replace(m,b).replace(g,c)}},{applyToAll:!0,excludeNestedEditable:!0})}}})}(),CKEDITOR.config.basicEntities=!0,CKEDITOR.config.entities=!0,CKEDITOR.config.entities_latin=!0,CKEDITOR.config.entities_greek=!0,
CKEDITOR.config.entities_additional="#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(a,f,b,c){f=f||"80%";b=b||"70%";"string"==typeof f&&1<f.length&&"%"==f.substr(f.length-1,1)&&(f=parseInt(window.screen.width*parseInt(f,10)/100,10));"string"==typeof b&&1<b.length&&"%"==b.substr(b.length-1,1)&&(b=parseInt(window.screen.height*parseInt(b,10)/100,10));640>f&&(f=640);420>b&&(b=420);var d=parseInt((window.screen.height-b)/2,10),l=parseInt((window.screen.width-
f)/2,10);c=(c||"location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes")+",width\x3d"+f+",height\x3d"+b+",top\x3d"+d+",left\x3d"+l;var k=window.open("",null,c,!0);if(!k)return!1;try{-1==navigator.userAgent.toLowerCase().indexOf(" chrome/")&&(k.moveTo(l,d),k.resizeTo(f,b)),k.focus(),k.location.href=a}catch(g){window.open(a,null,c,!0)}return!0}}),"use strict",function(){function a(a){this.editor=a;this.loaders=
[]}function f(a,c,f){var g=a.config.fileTools_defaultFileName;this.editor=a;this.lang=a.lang;"string"===typeof c?(this.data=c,this.file=b(this.data),this.loaded=this.total=this.file.size):(this.data=null,this.file=c,this.total=this.file.size,this.loaded=0);f?this.fileName=f:this.file.name?this.fileName=this.file.name:(a=this.file.type.split("/"),g&&(a[0]=g),this.fileName=a.join("."));this.uploaded=0;this.responseData=this.uploadTotal=null;this.status="created";this.abort=function(){this.changeStatus("abort")}}
function b(a){var b=a.match(c)[1];a=a.replace(c,"");a=atob(a);var f=[],g,h,m,e;for(g=0;g<a.length;g+=512){h=a.slice(g,g+512);m=Array(h.length);for(e=0;e<h.length;e++)m[e]=h.charCodeAt(e);h=new Uint8Array(m);f.push(h)}return new Blob(f,{type:b})}CKEDITOR.plugins.add("filetools",{beforeInit:function(b){b.uploadRepository=new a(b);b.on("fileUploadRequest",function(a){var b=a.data.fileLoader;b.xhr.open("POST",b.uploadUrl,!0);a.data.requestData.upload={file:b.file,name:b.fileName}},null,null,5);b.on("fileUploadRequest",
function(a){var c=a.data.fileLoader,g=new FormData;a=a.data.requestData;var f=b.config.fileTools_requestHeaders,m,e;for(e in a){var n=a[e];"object"===typeof n&&n.file?g.append(e,n.file,n.name):g.append(e,n)}g.append("ckCsrfToken",CKEDITOR.tools.getCsrfToken());if(f)for(m in f)c.xhr.setRequestHeader(m,f[m]);c.xhr.send(g)},null,null,999);b.on("fileUploadResponse",function(a){var b=a.data.fileLoader,c=b.xhr,d=a.data;try{var f=JSON.parse(c.responseText);f.error&&f.error.message&&(d.message=f.error.message);
if(f.uploaded)for(var e in f)d[e]=f[e];else a.cancel()}catch(n){d.message=b.lang.filetools.responseError,CKEDITOR.warn("filetools-response-error",{responseText:c.responseText}),a.cancel()}},null,null,999)}});a.prototype={create:function(a,b,c){c=c||f;var g=this.loaders.length;a=new c(this.editor,a,b);a.id=g;this.loaders[g]=a;this.fire("instanceCreated",a);return a},isFinished:function(){for(var a=0;a<this.loaders.length;++a)if(!this.loaders[a].isFinished())return!1;return!0}};f.prototype={loadAndUpload:function(a,
b){var c=this;this.once("loaded",function(g){g.cancel();c.once("update",function(a){a.cancel()},null,null,0);c.upload(a,b)},null,null,0);this.load()},load:function(){var a=this,b=this.reader=new FileReader;a.changeStatus("loading");this.abort=function(){a.reader.abort()};b.onabort=function(){a.changeStatus("abort")};b.onerror=function(){a.message=a.lang.filetools.loadError;a.changeStatus("error")};b.onprogress=function(b){a.loaded=b.loaded;a.update()};b.onload=function(){a.loaded=a.total;a.data=b.result;
a.changeStatus("loaded")};b.readAsDataURL(this.file)},upload:function(a,b){var c=b||{};a?(this.uploadUrl=a,this.xhr=new XMLHttpRequest,this.attachRequestListeners(),this.editor.fire("fileUploadRequest",{fileLoader:this,requestData:c})&&this.changeStatus("uploading")):(this.message=this.lang.filetools.noUrlError,this.changeStatus("error"))},attachRequestListeners:function(){function a(){"error"!=c.status&&(c.message=c.lang.filetools.networkError,c.changeStatus("error"))}function b(){"abort"!=c.status&&
c.changeStatus("abort")}var c=this,g=this.xhr;c.abort=function(){g.abort();b()};g.onerror=a;g.onabort=b;g.upload?(g.upload.onprogress=function(a){a.lengthComputable&&(c.uploadTotal||(c.uploadTotal=a.total),c.uploaded=a.loaded,c.update())},g.upload.onerror=a,g.upload.onabort=b):(c.uploadTotal=c.total,c.update());g.onload=function(){c.update();if("abort"!=c.status)if(c.uploaded=c.uploadTotal,200>g.status||299<g.status)c.message=c.lang.filetools["httpError"+g.status],c.message||(c.message=c.lang.filetools.httpError.replace("%1",
g.status)),c.changeStatus("error");else{for(var a={fileLoader:c},b=["message","fileName","url"],d=c.editor.fire("fileUploadResponse",a),f=0;f<b.length;f++){var l=b[f];"string"===typeof a[l]&&(c[l]=a[l])}c.responseData=a;delete c.responseData.fileLoader;!1===d?c.changeStatus("error"):c.changeStatus("uploaded")}}},changeStatus:function(a){this.status=a;if("error"==a||"abort"==a||"loaded"==a||"uploaded"==a)this.abort=function(){};this.fire(a);this.update()},update:function(){this.fire("update")},isFinished:function(){return!!this.status.match(/^(?:loaded|uploaded|error|abort)$/)}};
CKEDITOR.event.implementOn(a.prototype);CKEDITOR.event.implementOn(f.prototype);var c=/^data:(\S*?);base64,/;CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools,{uploadRepository:a,fileLoader:f,getUploadUrl:function(a,b){var c=CKEDITOR.tools.capitalize;return b&&a[b+"UploadUrl"]?a[b+"UploadUrl"]:a.uploadUrl?a.uploadUrl:b&&a["filebrowser"+c(b,1)+"UploadUrl"]?a["filebrowser"+c(b,1)+"UploadUrl"]+"\x26responseType\x3djson":a.filebrowserUploadUrl?a.filebrowserUploadUrl+
"\x26responseType\x3djson":null},isTypeSupported:function(a,b){return!!a.type.match(b)},isFileUploadSupported:"function"===typeof FileReader&&"function"===typeof(new FileReader).readAsDataURL&&"function"===typeof FormData&&"function"===typeof(new FormData).append&&"function"===typeof XMLHttpRequest&&"function"===typeof Blob})}(),function(){function a(a,b){var c=[];if(b)for(var d in b)c.push(d+"\x3d"+encodeURIComponent(b[d]));else return a;return a+(-1!=a.indexOf("?")?"\x26":"?")+c.join("\x26")}function f(b){return!b.match(/command=QuickUpload/)||
b.match(/(\?|&)responseType=json/)?b:a(b,{responseType:"json"})}function b(a){a+="";return a.charAt(0).toUpperCase()+a.substr(1)}function c(){var c=this.getDialog(),d=c.getParentEditor();d._.filebrowserSe=this;var e=d.config["filebrowser"+b(c.getName())+"WindowWidth"]||d.config.filebrowserWindowWidth||"80%",c=d.config["filebrowser"+b(c.getName())+"WindowHeight"]||d.config.filebrowserWindowHeight||"70%",g=this.filebrowser.params||{};g.CKEditor=d.name;g.CKEditorFuncNum=d._.filebrowserFn;g.langCode||
(g.langCode=d.langCode);g=a(this.filebrowser.url,g);d.popup(g,e,c,d.config.filebrowserWindowFeatures||d.config.fileBrowserWindowFeatures)}function d(a){var b=new CKEDITOR.dom.element(a.$.form);b&&((a=b.$.elements.ckCsrfToken)?a=new CKEDITOR.dom.element(a):(a=new CKEDITOR.dom.element("input"),a.setAttributes({name:"ckCsrfToken",type:"hidden"}),b.append(a)),a.setAttribute("value",CKEDITOR.tools.getCsrfToken()))}function l(){var a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return a.getContentElement(this["for"][0],
this["for"][1]).getInputElement().$.value&&a.getContentElement(this["for"][0],this["for"][1]).getAction()?!0:!1}function k(b,c,d){var e=d.params||{};e.CKEditor=b.name;e.CKEditorFuncNum=b._.filebrowserFn;e.langCode||(e.langCode=b.langCode);c.action=a(d.url,e);c.filebrowser=d}function g(a,m,y,u){if(u&&u.length)for(var p,v=u.length;v--;)if(p=u[v],"hbox"!=p.type&&"vbox"!=p.type&&"fieldset"!=p.type||g(a,m,y,p.children),p.filebrowser)if("string"==typeof p.filebrowser&&(p.filebrowser={action:"fileButton"==
p.type?"QuickUpload":"Browse",target:p.filebrowser}),"Browse"==p.filebrowser.action){var w=p.filebrowser.url;void 0===w&&(w=a.config["filebrowser"+b(m)+"BrowseUrl"],void 0===w&&(w=a.config.filebrowserBrowseUrl));w&&(p.onClick=c,p.filebrowser.url=w,p.hidden=!1)}else if("QuickUpload"==p.filebrowser.action&&p["for"]&&(w=p.filebrowser.url,void 0===w&&(w=a.config["filebrowser"+b(m)+"UploadUrl"],void 0===w&&(w=a.config.filebrowserUploadUrl)),w)){var r=p.onClick;p.onClick=function(b){var c=b.sender,g=c.getDialog().getContentElement(this["for"][0],
this["for"][1]).getInputElement(),k=CKEDITOR.fileTools&&CKEDITOR.fileTools.isFileUploadSupported;if(r&&!1===r.call(c,b))return!1;if(l.call(c,b)){if("form"!==a.config.filebrowserUploadMethod&&k)return b=a.uploadRepository.create(g.$.files[0]),b.on("uploaded",function(a){var b=a.sender.responseData;e.call(a.sender.editor,b.url,b.message)}),b.on("error",h.bind(this)),b.on("abort",h.bind(this)),b.loadAndUpload(f(w)),"xhr";d(g);return!0}return!1};p.filebrowser.url=w;p.hidden=!1;k(a,y.getContents(p["for"][0]).get(p["for"][1]),
p.filebrowser)}}function h(a){var b={};try{b=JSON.parse(a.sender.xhr.response)||{}}catch(c){}this.enable();alert(b.error?b.error.message:a.sender.message)}function m(a,b,c){if(-1!==c.indexOf(";")){c=c.split(";");for(var d=0;d<c.length;d++)if(m(a,b,c[d]))return!0;return!1}return(a=a.getContents(b).get(c).filebrowser)&&a.url}function e(a,b){var c=this._.filebrowserSe.getDialog(),d=this._.filebrowserSe["for"],e=this._.filebrowserSe.filebrowser.onSelect;d&&c.getContentElement(d[0],d[1]).reset();if("function"!=
typeof b||!1!==b.call(this._.filebrowserSe))if(!e||!1!==e.call(this._.filebrowserSe,a,b))if("string"==typeof b&&b&&alert(b),a&&(d=this._.filebrowserSe,c=d.getDialog(),d=d.filebrowser.target||null))if(d=d.split(":"),e=c.getContentElement(d[0],d[1]))e.setValue(a),c.selectPage(d[0])}CKEDITOR.plugins.add("filebrowser",{requires:"popup,filetools",init:function(a){a._.filebrowserFn=CKEDITOR.tools.addFunction(e,a);a.on("destroy",function(){CKEDITOR.tools.removeFunction(this._.filebrowserFn)})}});CKEDITOR.on("dialogDefinition",
function(a){if(a.editor.plugins.filebrowser)for(var b=a.data.definition,c,d=0;d<b.contents.length;++d)if(c=b.contents[d])g(a.editor,a.data.name,b,c.elements),c.hidden&&c.filebrowser&&(c.hidden=!m(b,c.id,c.filebrowser))})}(),function(){function a(a){var d=a.config,l=a.fire("uiSpace",{space:"top",html:""}).html,k=function(){function e(a,c,d){h.setStyle(c,b(d));h.setStyle("position",a)}function g(a){var b=m.getDocumentPosition();switch(a){case "top":e("absolute","top",b.y-r-x);break;case "pin":e("fixed",
"top",B);break;case "bottom":e("absolute","top",b.y+(v.height||v.bottom-v.top)+x)}l=a}var l,m,p,v,w,r,z,t=d.floatSpaceDockedOffsetX||0,x=d.floatSpaceDockedOffsetY||0,A=d.floatSpacePinnedOffsetX||0,B=d.floatSpacePinnedOffsetY||0;return function(e){if(m=a.editable()){var n=e&&"focus"==e.name;n&&h.show();a.fire("floatingSpaceLayout",{show:n});h.removeStyle("left");h.removeStyle("right");p=h.getClientRect();v=m.getClientRect();w=f.getViewPaneSize();r=p.height;z="pageXOffset"in f.$?f.$.pageXOffset:CKEDITOR.document.$.documentElement.scrollLeft;
l?(r+x<=v.top?g("top"):r+x>w.height-v.bottom?g("pin"):g("bottom"),e=w.width/2,e=d.floatSpacePreferRight?"right":0<v.left&&v.right<w.width&&v.width>p.width?"rtl"==d.contentsLangDirection?"right":"left":e-v.left>v.right-e?"left":"right",p.width>w.width?(e="left",n=0):(n="left"==e?0<v.left?v.left:0:v.right<w.width?w.width-v.right:0,n+p.width>w.width&&(e="left"==e?"right":"left",n=0)),h.setStyle(e,b(("pin"==l?A:t)+n+("pin"==l?0:"left"==e?z:-z)))):(l="pin",g("pin"),k(e))}}}();if(l){var g=new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} '+
CKEDITOR.env.cssClass+'" dir\x3d"{langDir}" title\x3d"'+(CKEDITOR.env.gecko?" ":"")+'" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':" ")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':" ")+'\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),h=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(g.output({content:l,
id:a.id,langDir:a.lang.dir,langCode:a.langCode,name:a.name,style:"display:none;z-index:"+(d.baseFloatZIndex-1),topId:a.ui.spaceId("top"),voiceLabel:a.title}))),m=CKEDITOR.tools.eventsBuffer(500,k),e=CKEDITOR.tools.eventsBuffer(100,k);h.unselectable();h.on("mousedown",function(a){a=a.data;a.getTarget().hasAscendant("a",1)||a.preventDefault()});a.on("focus",function(b){k(b);a.on("change",m.input);f.on("scroll",e.input);f.on("resize",e.input)});a.on("blur",function(){h.hide();a.removeListener("change",
m.input);f.removeListener("scroll",e.input);f.removeListener("resize",e.input)});a.on("destroy",function(){f.removeListener("scroll",e.input);f.removeListener("resize",e.input);h.clearCustomData();h.remove()});a.focusManager.hasFocus&&h.show();a.focusManager.add(h,1)}}var f=CKEDITOR.document.getWindow(),b=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add("floatingspace",{init:function(b){b.on("loaded",function(){a(this)},null,null,20)}})}(),CKEDITOR.plugins.add("listblock",{requires:"panel",onLoad:function(){var a=
CKEDITOR.addTemplate("panel-list",'\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),f=CKEDITOR.addTemplate("panel-list-item",'\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
b=CKEDITOR.addTemplate("panel-list-group",'\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),c=/\'/g;CKEDITOR.ui.panel.prototype.addListBlock=function(a,b){return this.addBlock(a,new CKEDITOR.ui.listBlock(this.getHolderElement(),b))};CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block,$:function(a,b){b=b||{};var c=b.attributes||(b.attributes={});(this.multiSelect=!!b.multiSelect)&&
(c["aria-multiselectable"]=!0);!c.role&&(c.role="listbox");this.base.apply(this,arguments);this.element.setAttribute("role",c.role);c=this.keys;c[40]="next";c[9]="next";c[38]="prev";c[CKEDITOR.SHIFT+9]="prev";c[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(c[13]="mouseup");this._.pendingHtml=[];this._.pendingList=[];this._.items={};this._.groups={}},_:{close:function(){if(this._.started){var b=a.output({items:this._.pendingList.join("")});this._.pendingList=[];this._.pendingHtml.push(b);
delete this._.started}},getClick:function(){this._.click||(this._.click=CKEDITOR.tools.addFunction(function(a){var b=this.toggle(a);if(this.onClick)this.onClick(a,b)},this));return this._.click}},proto:{add:function(a,b,k){var g=CKEDITOR.tools.getNextId();this._.started||(this._.started=1,this._.size=this._.size||0);this._.items[a]=g;var h;h=CKEDITOR.tools.htmlEncodeAttr(a).replace(c,"\\'");a={id:g,val:h,onclick:CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick",clickFn:this._.getClick(),
title:CKEDITOR.tools.htmlEncodeAttr(k||a),text:b||a};this._.pendingList.push(f.output(a))},startGroup:function(a){this._.close();var c=CKEDITOR.tools.getNextId();this._.groups[a]=c;this._.pendingHtml.push(b.output({id:c,label:a}))},commit:function(){this._.close();this.element.appendHtml(this._.pendingHtml.join(""));delete this._.size;this._.pendingHtml=[]},toggle:function(a){var b=this.isMarked(a);b?this.unmark(a):this.mark(a);return!b},hideGroup:function(a){var b=(a=this.element.getDocument().getById(this._.groups[a]))&&
a.getNext();a&&(a.setStyle("display","none"),b&&"ul"==b.getName()&&b.setStyle("display","none"))},hideItem:function(a){this.element.getDocument().getById(this._.items[a]).setStyle("display","none")},showAll:function(){var a=this._.items,b=this._.groups,c=this.element.getDocument(),g;for(g in a)c.getById(a[g]).setStyle("display","");for(var f in b)a=c.getById(b[f]),g=a.getNext(),a.setStyle("display",""),g&&"ul"==g.getName()&&g.setStyle("display","")},mark:function(a){this.multiSelect||this.unmarkAll();
a=this._.items[a];var b=this.element.getDocument().getById(a);b.addClass("cke_selected");this.element.getDocument().getById(a+"_option").setAttribute("aria-selected",!0);this.onMark&&this.onMark(b)},markFirstDisplayed:function(){var a=this;this._.markFirstDisplayed(function(){a.multiSelect||a.unmarkAll()})},unmark:function(a){var b=this.element.getDocument();a=this._.items[a];var c=b.getById(a);c.removeClass("cke_selected");b.getById(a+"_option").removeAttribute("aria-selected");this.onUnmark&&this.onUnmark(c)},
unmarkAll:function(){var a=this._.items,b=this.element.getDocument(),c;for(c in a){var g=a[c];b.getById(g).removeClass("cke_selected");b.getById(g+"_option").removeAttribute("aria-selected")}this.onUnmark&&this.onUnmark()},isMarked:function(a){return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")},focus:function(a){this._.focusIndex=-1;var b=this.element.getElementsByTag("a"),c,g=-1;if(a)for(c=this.element.getDocument().getById(this._.items[a]).getFirst();a=b.getItem(++g);){if(a.equals(c)){this._.focusIndex=
g;break}}else this.element.focus();c&&setTimeout(function(){c.focus()},0)}}})}}),CKEDITOR.plugins.add("richcombo",{requires:"floatpanel,listblock,button",beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,CKEDITOR.ui.richCombo.handler)}}),function(){var a='\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"'+
(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href\x3d\"javascript:void('{titleJs}')\"")+' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?
'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e'+(CKEDITOR.env.hc?"\x26#9660;":CKEDITOR.env.air?"\x26nbsp;":"")+"\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),f=CKEDITOR.addTemplate("combo",a);CKEDITOR.UI_RICHCOMBO="richcombo";CKEDITOR.ui.richCombo=
CKEDITOR.tools.createClass({$:function(a){CKEDITOR.tools.extend(this,a,{canGroup:!1,title:a.label,modes:{wysiwyg:1},editorFocus:1});a=this.panel||{};delete this.panel;this.id=CKEDITOR.tools.getNextNumber();this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.className="cke_combopanel";a.block={multiSelect:a.multiSelect,attributes:a.attributes};a.toolbarRelated=!0;this._={panelDefinition:a,items:{},listeners:[]}},proto:{renderHtml:function(a){var c=[];this.render(a,c);return c.join("")},
render:function(a,c){function d(){if(this.getState()!=CKEDITOR.TRISTATE_ON){var c=this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;a.readOnly&&!this.readOnly&&(c=CKEDITOR.TRISTATE_DISABLED);this.setState(c);this.setValue("");c!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh()}}var l=CKEDITOR.env,k="cke_"+this.id,g=CKEDITOR.tools.addFunction(function(c){q&&(a.unlockSelection(1),q=0);m.execute(c)},this),h=this,m={id:k,combo:this,focus:function(){CKEDITOR.document.getById(k).getChild(1).focus()},
execute:function(c){var d=h._;if(d.state!=CKEDITOR.TRISTATE_DISABLED)if(h.createPanel(a),d.on)d.panel.hide();else{h.commit();var e=h.getValue();e?d.list.mark(e):d.list.unmarkAll();d.panel.showBlock(h.id,new CKEDITOR.dom.element(c),4)}},clickFn:g};this._.listeners.push(a.on("activeFilterChange",d,this));this._.listeners.push(a.on("mode",d,this));this._.listeners.push(a.on("selectionChange",d,this));!this.readOnly&&this._.listeners.push(a.on("readOnly",d,this));var e=CKEDITOR.tools.addFunction(function(a,
b){a=new CKEDITOR.dom.event(a);var c=a.getKeystroke();switch(c){case 13:case 32:case 40:CKEDITOR.tools.callFunction(g,b);break;default:m.onkey(m,c)}a.preventDefault()}),n=CKEDITOR.tools.addFunction(function(){m.onfocus&&m.onfocus()}),q=0;m.keyDownFn=e;l={id:k,name:this.name||this.command,label:this.label,title:this.title,cls:this.className||"",titleJs:l.gecko&&!l.hc?"":(this.title||"").replace("'",""),keydownFn:e,focusFn:n,clickFn:g};f.output(l,c);if(this.onRender)this.onRender();return m},createPanel:function(a){if(!this._.panel){var c=
this._.panelDefinition,d=this._.panelDefinition.block,f=c.parent||CKEDITOR.document.getBody(),k="cke_combopanel__"+this.name,g=new CKEDITOR.ui.floatPanel(a,f,c),c=g.addListBlock(this.id,d),h=this;g.onShow=function(){this.element.addClass(k);h.setState(CKEDITOR.TRISTATE_ON);h._.on=1;h.editorFocus&&!a.focusManager.hasFocus&&a.focus();if(h.onOpen)h.onOpen()};g.onHide=function(c){this.element.removeClass(k);h.setState(h.modes&&h.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);h._.on=0;
if(!c&&h.onClose)h.onClose()};g.onEscape=function(){g.hide(1)};c.onClick=function(a,b){h.onClick&&h.onClick.call(h,a,b);g.hide()};this._.panel=g;this._.list=c;g.getBlock(this.id).onHide=function(){h._.on=0;h.setState(CKEDITOR.TRISTATE_OFF)};this.init&&this.init()}},setValue:function(a,c){this._.value=a;var d=this.document.getById("cke_"+this.id+"_text");d&&(a||c?d.removeClass("cke_combo_inlinelabel"):(c=this.label,d.addClass("cke_combo_inlinelabel")),d.setText("undefined"!=typeof c?c:a))},getValue:function(){return this._.value||
""},unmarkAll:function(){this._.list.unmarkAll()},mark:function(a){this._.list.mark(a)},hideItem:function(a){this._.list.hideItem(a)},hideGroup:function(a){this._.list.hideGroup(a)},showAll:function(){this._.list.showAll()},add:function(a,c,d){this._.items[a]=d||a;this._.list.add(a,c,d)},startGroup:function(a){this._.list.startGroup(a)},commit:function(){this._.committed||(this._.list.commit(),this._.committed=1,CKEDITOR.ui.fire("ready",this));this._.committed=1},setState:function(a){if(this._.state!=
a){var c=this.document.getById("cke_"+this.id);c.setState(a,"cke_combo");a==CKEDITOR.TRISTATE_DISABLED?c.setAttribute("aria-disabled",!0):c.removeAttribute("aria-disabled");this._.state=a}},getState:function(){return this._.state},enable:function(){this._.state==CKEDITOR.TRISTATE_DISABLED&&this.setState(this._.lastState)},disable:function(){this._.state!=CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state,this.setState(CKEDITOR.TRISTATE_DISABLED))},destroy:function(){CKEDITOR.tools.array.forEach(this._.listeners,
function(a){a.removeListener()});this._.listeners=[]}},statics:{handler:{create:function(a){return new CKEDITOR.ui.richCombo(a)}}}});CKEDITOR.ui.prototype.addRichCombo=function(a,c){this.add(a,CKEDITOR.UI_RICHCOMBO,c)}}(),CKEDITOR.plugins.add("format",{requires:"richcombo",init:function(a){if(!a.blockless){for(var f=a.config,b=a.lang.format,c=f.format_tags.split(";"),d={},l=0,k=[],g=0;g<c.length;g++){var h=c[g],m=new CKEDITOR.style(f["format_"+h]);if(!a.filter.customConfig||a.filter.check(m))l++,
d[h]=m,d[h]._.enterMode=a.config.enterMode,k.push(m)}0!==l&&a.ui.addRichCombo("Format",{label:b.label,title:b.panelTitle,toolbar:"styles,20",allowedContent:k,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),multiSelect:!1,attributes:{"aria-label":b.panelTitle}},init:function(){this.startGroup(b.panelTitle);for(var a in d){var c=b["tag_"+a];this.add(a,d[a].buildPreview(c),c)}},onClick:function(b){a.focus();a.fire("saveSnapshot");b=d[b];var c=a.elementPath();b.checkActive(c,a)||a.applyStyle(b);
setTimeout(function(){a.fire("saveSnapshot")},0)},onRender:function(){a.on("selectionChange",function(b){var c=this.getValue();b=b.data.path;this.refresh();for(var g in d)if(d[g].checkActive(b,a)){g!=c&&this.setValue(g,a.lang.format["tag_"+g]);return}this.setValue("")},this)},onOpen:function(){this.showAll();for(var b in d)a.activeFilter.check(d[b])||this.hideItem(b)},refresh:function(){var b=a.elementPath();if(b){if(b.isContextFor("p"))for(var c in d)if(a.activeFilter.check(d[c]))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}}})}}}),
CKEDITOR.config.format_tags="p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p={element:"p"},CKEDITOR.config.format_div={element:"div"},CKEDITOR.config.format_pre={element:"pre"},CKEDITOR.config.format_address={element:"address"},CKEDITOR.config.format_h1={element:"h1"},CKEDITOR.config.format_h2={element:"h2"},CKEDITOR.config.format_h3={element:"h3"},CKEDITOR.config.format_h4={element:"h4"},CKEDITOR.config.format_h5={element:"h5"},CKEDITOR.config.format_h6={element:"h6"},function(){var a=
{canUndo:!1,exec:function(a){var b=a.document.createElement("hr");a.insertElement(b)},allowedContent:"hr",requiredContent:"hr"};CKEDITOR.plugins.add("horizontalrule",{init:function(f){f.blockless||(f.addCommand("horizontalrule",a),f.ui.addButton&&f.ui.addButton("HorizontalRule",{label:f.lang.horizontalrule.toolbar,command:"horizontalrule",toolbar:"insert,40"}))}})}(),CKEDITOR.plugins.add("htmlwriter",{init:function(a){var f=new CKEDITOR.htmlWriter;f.forceSimpleAmpersand=a.config.forceSimpleAmpersand;
f.indentationChars=a.config.dataIndentationChars||"\t";a.dataProcessor.writer=f}}),CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter,$:function(){this.base();this.indentationChars="\t";this.selfClosingEnd=" /\x3e";this.lineBreakChars="\n";this.sortAttributes=1;this._.indent=0;this._.indentation="";this._.inPre=0;this._.rules={};var a=CKEDITOR.dtd,f;for(f in CKEDITOR.tools.extend({},a.$nonBodyContent,a.$block,a.$listItem,a.$tableContent))this.setRules(f,{indent:!a[f]["#"],
breakBeforeOpen:1,breakBeforeClose:!a[f]["#"],breakAfterClose:1,needsSpace:f in a.$block&&!(f in{li:1,dt:1,dd:1})});this.setRules("br",{breakAfterOpen:1});this.setRules("title",{indent:0,breakAfterOpen:0});this.setRules("style",{indent:0,breakBeforeClose:1});this.setRules("pre",{breakAfterOpen:1,indent:0})},proto:{openTag:function(a){var f=this._.rules[a];this._.afterCloser&&f&&f.needsSpace&&this._.needsSpace&&this._.output.push("\n");this._.indent?this.indentation():f&&f.breakBeforeOpen&&(this.lineBreak(),
this.indentation());this._.output.push("\x3c",a);this._.afterCloser=0},openTagClose:function(a,f){var b=this._.rules[a];f?(this._.output.push(this.selfClosingEnd),b&&b.breakAfterClose&&(this._.needsSpace=b.needsSpace)):(this._.output.push("\x3e"),b&&b.indent&&(this._.indentation+=this.indentationChars));b&&b.breakAfterOpen&&this.lineBreak();"pre"==a&&(this._.inPre=1)},attribute:function(a,f){"string"==typeof f&&(f=CKEDITOR.tools.htmlEncodeAttr(f),this.forceSimpleAmpersand&&(f=f.replace(/&amp;/g,"\x26")));
this._.output.push(" ",a,'\x3d"',f,'"')},closeTag:function(a){var f=this._.rules[a];f&&f.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length));this._.indent?this.indentation():f&&f.breakBeforeClose&&(this.lineBreak(),this.indentation());this._.output.push("\x3c/",a,"\x3e");"pre"==a&&(this._.inPre=0);f&&f.breakAfterClose&&(this.lineBreak(),this._.needsSpace=f.needsSpace);this._.afterCloser=1},text:function(a){this._.indent&&(this.indentation(),!this._.inPre&&(a=CKEDITOR.tools.ltrim(a)));
this._.output.push(a)},comment:function(a){this._.indent&&this.indentation();this._.output.push("\x3c!--",a,"--\x3e")},lineBreak:function(){!this._.inPre&&0<this._.output.length&&this._.output.push(this.lineBreakChars);this._.indent=1},indentation:function(){!this._.inPre&&this._.indentation&&this._.output.push(this._.indentation);this._.indent=0},reset:function(){this._.output=[];this._.indent=0;this._.indentation="";this._.afterCloser=0;this._.inPre=0;this._.needsSpace=0},setRules:function(a,f){var b=
this._.rules[a];b?CKEDITOR.tools.extend(b,f,!0):this._.rules[a]=f}}}),function(){function a(a,c){c||(c=a.getSelection().getSelectedElement());if(c&&c.is("img")&&!c.data("cke-realelement")&&!c.isReadOnly())return c}function f(a){var c=a.getStyle("float");if("inherit"==c||"none"==c)c=0;c||(c=a.getAttribute("align"));return c}CKEDITOR.plugins.add("image",{requires:"dialog",init:function(b){if(!b.plugins.detectConflict("image",["easyimage","image2"])){CKEDITOR.dialog.add("image",this.path+"dialogs/image.js");
var c="img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";CKEDITOR.dialog.isTabEnabled(b,"image","advanced")&&(c="img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");b.addCommand("image",new CKEDITOR.dialogCommand("image",{allowedContent:c,requiredContent:"img[alt,src]",contentTransformations:[["img{width}: sizeToStyle","img[width]: sizeToAttribute"],["img{float}: alignmentToStyle","img[align]: alignmentToAttribute"]]}));b.ui.addButton&&
b.ui.addButton("Image",{label:b.lang.common.image,command:"image",toolbar:"insert,10"});b.on("doubleclick",function(a){var b=a.data.element;!b.is("img")||b.data("cke-realelement")||b.isReadOnly()||(a.data.dialog="image")});b.addMenuItems&&b.addMenuItems({image:{label:b.lang.image.menu,command:"image",group:"image"}});b.contextMenu&&b.contextMenu.addListener(function(c){if(a(b,c))return{image:CKEDITOR.TRISTATE_OFF}})}},afterInit:function(b){function c(c){var l=b.getCommand("justify"+c);if(l){if("left"==
c||"right"==c)l.on("exec",function(k){var g=a(b),h;g&&(h=f(g),h==c?(g.removeStyle("float"),c==f(g)&&g.removeAttribute("align")):g.setStyle("float",c),k.cancel())});l.on("refresh",function(k){var g=a(b);g&&(g=f(g),this.setState(g==c?CKEDITOR.TRISTATE_ON:"right"==c||"left"==c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),k.cancel())})}}b.plugins.image2||(c("left"),c("right"),c("center"),c("block"))}})}(),CKEDITOR.config.image_removeLinkByEmptyURL=!0,function(){function a(a,b){var d=c.exec(a),f=
c.exec(b);if(d){if(!d[2]&&"px"==f[2])return f[1];if("px"==d[2]&&!f[2])return f[1]+"px"}return b}var f=CKEDITOR.htmlParser.cssStyle,b=CKEDITOR.tools.cssLength,c=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,d={elements:{$:function(b){var c=b.attributes;if((c=(c=(c=c&&c["data-cke-realelement"])&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c)))&&c.children[0])&&b.attributes["data-cke-resizable"]){var d=(new f(b)).rules;b=c.attributes;var h=d.width,d=d.height;h&&(b.width=a(b.width,h));d&&(b.height=
a(b.height,d))}return c}}};CKEDITOR.plugins.add("fakeobjects",{init:function(a){a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}","fakeobjects")},afterInit:function(a){(a=(a=a.dataProcessor)&&a.htmlFilter)&&a.addRules(d,{applyToAll:!0})}});CKEDITOR.editor.prototype.createFakeElement=function(a,c,d,h){var m=this.lang.fakeobjects,m=m[d]||m.unknown;c={"class":c,"data-cke-realelement":encodeURIComponent(a.getOuterHtml()),"data-cke-real-node-type":a.type,alt:m,title:m,align:a.getAttribute("align")||
""};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);h&&(c["data-cke-resizable"]=h,d=new f,h=a.getAttribute("width"),a=a.getAttribute("height"),h&&(d.rules.width=b(h)),a&&(d.rules.height=b(a)),d.populate(c));return this.document.createElement("img",{attributes:c})};CKEDITOR.editor.prototype.createFakeParserElement=function(a,c,d,h){var m=this.lang.fakeobjects,m=m[d]||m.unknown,e;e=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(e);e=e.getHtml();c=
{"class":c,"data-cke-realelement":encodeURIComponent(e),"data-cke-real-node-type":a.type,alt:m,title:m,align:a.attributes.align||""};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);h&&(c["data-cke-resizable"]=h,h=a.attributes,a=new f,d=h.width,h=h.height,void 0!==d&&(a.rules.width=b(d)),void 0!==h&&(a.rules.height=b(h)),a.populate(c));return new CKEDITOR.htmlParser.element("img",c)};CKEDITOR.editor.prototype.restoreRealElement=function(b){if(b.data("cke-real-node-type")!=
CKEDITOR.NODE_ELEMENT)return null;var c=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")),this.document);if(b.data("cke-resizable")){var d=b.getStyle("width");b=b.getStyle("height");d&&c.setAttribute("width",a(c.getAttribute("width"),d));b&&c.setAttribute("height",a(c.getAttribute("height"),b))}return c}}(),"use strict",function(){function a(a){return a.replace(/'/g,"\\$\x26")}function f(a){for(var b,c=a.length,d=[],e=0;e<c;e++)b=a.charCodeAt(e),d.push(b);return"String.fromCharCode("+
d.join(",")+")"}function b(b,c){var d=b.plugins.link,e=d.compiledProtectionFunction.params,g,f;f=[d.compiledProtectionFunction.name,"("];for(var h=0;h<e.length;h++)d=e[h].toLowerCase(),g=c[d],0<h&&f.push(","),f.push("'",g?a(encodeURIComponent(c[d])):"","'");f.push(")");return f.join("")}function c(a){a=a.config.emailProtection||"";var b;a&&"encode"!=a&&(b={},a.replace(/^([^(]+)\(([^)]+)\)$/,function(a,c,d){b.name=c;b.params=[];d.replace(/[^,\s]+/g,function(a){b.params.push(a)})}));return b}CKEDITOR.plugins.add("link",
{requires:"dialog,fakeobjects",onLoad:function(){function a(b){return c.replace(/%1/g,"rtl"==b?"right":"left").replace(/%2/g,"cke_contents_"+b)}var b="background:url("+CKEDITOR.getUrl(this.path+"images"+(CKEDITOR.env.hidpi?"/hidpi":"")+"/anchor.png")+") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",c=".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{"+b+"padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{"+b+"width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
CKEDITOR.addCss(a("ltr")+a("rtl"))},init:function(a){var b="a[!href]";CKEDITOR.dialog.isTabEnabled(a,"link","advanced")&&(b=b.replace("]",",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));CKEDITOR.dialog.isTabEnabled(a,"link","target")&&(b=b.replace("]",",target,onclick]"));a.addCommand("link",new CKEDITOR.dialogCommand("link",{allowedContent:b,requiredContent:"a[href]"}));a.addCommand("anchor",new CKEDITOR.dialogCommand("anchor",{allowedContent:"a[!name,id]",requiredContent:"a[name]"}));
a.addCommand("unlink",new CKEDITOR.unlinkCommand);a.addCommand("removeAnchor",new CKEDITOR.removeAnchorCommand);a.setKeystroke(CKEDITOR.CTRL+76,"link");a.setKeystroke(CKEDITOR.CTRL+75,"link");a.ui.addButton&&(a.ui.addButton("Link",{label:a.lang.link.toolbar,command:"link",toolbar:"links,10"}),a.ui.addButton("Unlink",{label:a.lang.link.unlink,command:"unlink",toolbar:"links,20"}),a.ui.addButton("Anchor",{label:a.lang.link.anchor.toolbar,command:"anchor",toolbar:"links,30"}));CKEDITOR.dialog.add("link",
this.path+"dialogs/link.js");CKEDITOR.dialog.add("anchor",this.path+"dialogs/anchor.js");a.on("doubleclick",function(b){var c=b.data.element.getAscendant({a:1,img:1},!0);c&&!c.isReadOnly()&&(c.is("a")?(b.data.dialog=!c.getAttribute("name")||c.getAttribute("href")&&c.getChildCount()?"link":"anchor",b.data.link=c):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,c)&&(b.data.dialog="anchor"))},null,null,0);a.on("doubleclick",function(b){b.data.dialog in{link:1,anchor:1}&&b.data.link&&a.getSelection().selectElement(b.data.link)},
null,null,20);a.addMenuItems&&a.addMenuItems({anchor:{label:a.lang.link.anchor.menu,command:"anchor",group:"anchor",order:1},removeAnchor:{label:a.lang.link.anchor.remove,command:"removeAnchor",group:"anchor",order:5},link:{label:a.lang.link.menu,command:"link",group:"link",order:1},unlink:{label:a.lang.link.unlink,command:"unlink",group:"link",order:5}});a.contextMenu&&a.contextMenu.addListener(function(b){if(!b||b.isReadOnly())return null;b=CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,b);if(!b&&
!(b=CKEDITOR.plugins.link.getSelectedLink(a)))return null;var c={};b.getAttribute("href")&&b.getChildCount()&&(c={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF});b&&b.hasAttribute("name")&&(c.anchor=c.removeAnchor=CKEDITOR.TRISTATE_OFF);return c});this.compiledProtectionFunction=c(a)},afterInit:function(a){a.dataProcessor.dataFilter.addRules({elements:{a:function(b){return b.attributes.name?b.children.length?null:a.createFakeParserElement(b,"cke_anchor","anchor"):null}}});var b=a._.elementsPath&&
a._.elementsPath.filters;b&&b.push(function(b,c){if("a"==c&&(CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,b)||b.getAttribute("name")&&(!b.getAttribute("href")||!b.getChildCount())))return"anchor"})}});var d=/^javascript:/,l=/^mailto:([^?]+)(?:\?(.+))?$/,k=/subject=([^;?:@&=$,\/]*)/i,g=/body=([^;?:@&=$,\/]*)/i,h=/^#(.*)$/,m=/^((?:http|https|ftp|news):\/\/)?(.*)$/,e=/^(_(?:self|top|parent|blank))$/,n=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,q=/^javascript:([^(]+)\(([^)]+)\)$/,
y=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,u=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,p=/^tel:(.*)$/,v={id:"advId",dir:"advLangDir",accessKey:"advAccessKey",name:"advName",lang:"advLangCode",tabindex:"advTabIndex",title:"advTitle",type:"advContentType","class":"advCSSClasses",charset:"advCharset",style:"advStyles",rel:"advRel"};CKEDITOR.plugins.link={getSelectedLink:function(a,b){var c=a.getSelection(),d=c.getSelectedElement(),e=c.getRanges(),
g=[],f;if(!b&&d&&d.is("a"))return d;for(d=0;d<e.length;d++)if(f=c.getRanges()[d],f.shrink(CKEDITOR.SHRINK_ELEMENT,!0,{skipBogus:!0}),(f=a.elementPath(f.getCommonAncestor()).contains("a",1))&&b)g.push(f);else if(f)return f;return b?g:null},getEditorAnchors:function(a){for(var b=a.editable(),c=b.isInline()&&!a.plugins.divarea?a.document:b,b=c.getElementsByTag("a"),c=c.getElementsByTag("img"),d=[],e=0,g;g=b.getItem(e++);)(g.data("cke-saved-name")||g.hasAttribute("name"))&&d.push({name:g.data("cke-saved-name")||
g.getAttribute("name"),id:g.getAttribute("id")});for(e=0;g=c.getItem(e++);)(g=this.tryRestoreFakeAnchor(a,g))&&d.push({name:g.getAttribute("name"),id:g.getAttribute("id")});return d},fakeAnchor:!0,tryRestoreFakeAnchor:function(a,b){if(b&&b.data("cke-real-element-type")&&"anchor"==b.data("cke-real-element-type")){var c=a.restoreRealElement(b);if(c.data("cke-saved-name"))return c}},parseLinkAttributes:function(a,b){var c=b&&(b.data("cke-saved-href")||b.getAttribute("href"))||"",f=a.plugins.link.compiledProtectionFunction,
x=a.config.emailProtection,A,B={};c.match(d)&&("encode"==x?c=c.replace(n,function(a,b,c){c=c||"";return"mailto:"+String.fromCharCode.apply(String,b.split(","))+c.replace(/\\'/g,"'")}):x&&c.replace(q,function(a,b,c){if(b==f.name){B.type="email";a=B.email={};b=/(^')|('$)/g;c=c.match(/[^,\s]+/g);for(var d=c.length,e,g,h=0;h<d;h++)e=decodeURIComponent,g=c[h].replace(b,"").replace(/\\'/g,"'"),g=e(g),e=f.params[h].toLowerCase(),a[e]=g;a.address=[a.name,a.domain].join("@")}}));if(!B.type)if(x=c.match(h))B.type=
"anchor",B.anchor={},B.anchor.name=B.anchor.id=x[1];else if(x=c.match(p))B.type="tel",B.tel=x[1];else if(x=c.match(l)){A=c.match(k);c=c.match(g);B.type="email";var C=B.email={};C.address=x[1];A&&(C.subject=decodeURIComponent(A[1]));c&&(C.body=decodeURIComponent(c[1]))}else c&&(A=c.match(m))&&(B.type="url",B.url={},B.url.protocol=A[1],B.url.url=A[2]);if(b){if(c=b.getAttribute("target"))B.target={type:c.match(e)?c:"frame",name:c};else if(c=(c=b.data("cke-pa-onclick")||b.getAttribute("onclick"))&&c.match(y))for(B.target=
{type:"popup",name:c[1]};x=u.exec(c[2]);)"yes"!=x[2]&&"1"!=x[2]||x[1]in{height:1,width:1,top:1,left:1}?isFinite(x[2])&&(B.target[x[1]]=x[2]):B.target[x[1]]=!0;null!==b.getAttribute("download")&&(B.download=!0);var c={},H;for(H in v)(x=b.getAttribute(H))&&(c[v[H]]=x);if(H=b.data("cke-saved-name")||c.advName)c.advName=H;CKEDITOR.tools.isEmpty(c)||(B.advanced=c)}return B},getLinkAttributes:function(c,d){var e=c.config.emailProtection||"",g={};switch(d.type){case "url":var e=d.url&&void 0!==d.url.protocol?
d.url.protocol:"http://",h=d.url&&CKEDITOR.tools.trim(d.url.url)||"";g["data-cke-saved-href"]=0===h.indexOf("/")?h:e+h;break;case "anchor":e=d.anchor&&d.anchor.id;g["data-cke-saved-href"]="#"+(d.anchor&&d.anchor.name||e||"");break;case "email":var k=d.email,h=k.address;switch(e){case "":case "encode":var l=encodeURIComponent(k.subject||""),m=encodeURIComponent(k.body||""),k=[];l&&k.push("subject\x3d"+l);m&&k.push("body\x3d"+m);k=k.length?"?"+k.join("\x26"):"";"encode"==e?(e=["javascript:void(location.href\x3d'mailto:'+",
f(h)],k&&e.push("+'",a(k),"'"),e.push(")")):e=["mailto:",h,k];break;default:e=h.split("@",2),k.name=e[0],k.domain=e[1],e=["javascript:",b(c,k)]}g["data-cke-saved-href"]=e.join("");break;case "tel":g["data-cke-saved-href"]="tel:"+d.tel}if(d.target)if("popup"==d.target.type){for(var e=["window.open(this.href, '",d.target.name||"","', '"],n="resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "),h=n.length,l=function(a){d.target[a]&&n.push(a+"\x3d"+d.target[a])},k=0;k<
h;k++)n[k]+=d.target[n[k]]?"\x3dyes":"\x3dno";l("width");l("left");l("height");l("top");e.push(n.join(","),"'); return false;");g["data-cke-pa-onclick"]=e.join("")}else"notSet"!=d.target.type&&d.target.name&&(g.target=d.target.name);d.download&&(g.download="");if(d.advanced){for(var q in v)(e=d.advanced[v[q]])&&(g[q]=e);g.name&&(g["data-cke-saved-name"]=g.name)}g["data-cke-saved-href"]&&(g.href=g["data-cke-saved-href"]);q={target:1,onclick:1,"data-cke-pa-onclick":1,"data-cke-saved-name":1,download:1};
d.advanced&&CKEDITOR.tools.extend(q,v);for(var p in g)delete q[p];return{set:g,removed:CKEDITOR.tools.object.keys(q)}},showDisplayTextForElement:function(a,b){var c={img:1,table:1,tbody:1,thead:1,tfoot:1,input:1,select:1,textarea:1},d=b.getSelection();return b.widgets&&b.widgets.focused||d&&1<d.getRanges().length?!1:!a||!a.getName||!a.is(c)}};CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(a){if(CKEDITOR.env.ie){var b=a.getSelection().getRanges()[0],c=b.getPreviousEditableNode()&&
b.getPreviousEditableNode().getAscendant("a",!0)||b.getNextEditableNode()&&b.getNextEditableNode().getAscendant("a",!0),d;b.collapsed&&c&&(d=b.createBookmark(),b.selectNodeContents(c),b.select())}c=new CKEDITOR.style({element:"a",type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});a.removeStyle(c);d&&(b.moveToBookmark(d),b.select())},refresh:function(a,b){var c=b.lastElement&&b.lastElement.getAscendant("a",!0);c&&"a"==c.getName()&&c.getAttribute("href")&&c.getChildCount()?this.setState(CKEDITOR.TRISTATE_OFF):
this.setState(CKEDITOR.TRISTATE_DISABLED)},contextSensitive:1,startDisabled:1,requiredContent:"a[href]",editorFocus:1};CKEDITOR.removeAnchorCommand=function(){};CKEDITOR.removeAnchorCommand.prototype={exec:function(a){var b=a.getSelection(),c=b.createBookmarks(),d;if(b&&(d=b.getSelectedElement())&&(d.getChildCount()?d.is("a"):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,d)))d.remove(1);else if(d=CKEDITOR.plugins.link.getSelectedLink(a))d.hasAttribute("href")?(d.removeAttributes({name:1,"data-cke-saved-name":1}),
d.removeClass("cke_anchor")):d.remove(1);b.selectBookmarks(c)},requiredContent:"a[name]"};CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:!0,linkShowTargetTab:!0})}(),"use strict",function(){function a(a,b,c){return n(b)&&n(c)&&c.equals(b.getNext(function(a){return!(P(a)||S(a)||q(a))}))}function f(a){this.upper=a[0];this.lower=a[1];this.set.apply(this,a.slice(2))}function b(a){var b=a.element;if(b&&n(b)&&(b=b.getAscendant(a.triggers,!0))&&a.editable.contains(b)){var c=k(b);if("true"==c.getAttribute("contenteditable"))return b;
if(c.is(a.triggers))return c}return null}function c(a,b,c){t(a,b);t(a,c);a=b.size.bottom;c=c.size.top;return a&&c?0|(a+c)/2:a||c}function d(a,b,c){return b=b[c?"getPrevious":"getNext"](function(b){return b&&b.type==CKEDITOR.NODE_TEXT&&!P(b)||n(b)&&!q(b)&&!e(a,b)})}function l(a,b,c){return a>b&&a<c}function k(a,b){if(a.data("cke-editable"))return null;for(b||(a=a.getParent());a&&!a.data("cke-editable");){if(a.hasAttribute("contenteditable"))return a;a=a.getParent()}return null}function g(a){var b=
a.doc,c=F('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"'+ca+"position:absolute;border-top:1px dashed "+a.boxColor+'"\x3e\x3c/span\x3e',b),d=CKEDITOR.getUrl(this.path+"images/"+(I.hidpi?"hidpi/":"")+"icon"+(a.rtl?"-rtl":"")+".png");C(c,{attach:function(){this.wrap.getParent()||this.wrap.appendTo(a.editable,!0);return this},lineChildren:[C(F('\x3cspan title\x3d"'+a.editor.lang.magicline.title+'" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',b),{base:ca+"height:17px;width:17px;"+
(a.rtl?"left":"right")+":17px;background:url("+d+") center no-repeat "+a.boxColor+";cursor:pointer;"+(I.hc?"font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;":"")+(I.hidpi?"background-size: 9px 10px;":""),looks:["top:-8px; border-radius: 2px;","top:-17px; border-radius: 2px 2px 0px 0px;","top:-1px; border-radius: 0px 0px 2px 2px;"]}),C(F(M,b),{base:V+"left:0px;border-left-color:"+a.boxColor+";",looks:["border-width:8px 0 8px 8px;top:-8px","border-width:8px 0 0 8px;top:-8px",
"border-width:0 0 8px 8px;top:0px"]}),C(F(M,b),{base:V+"right:0px;border-right-color:"+a.boxColor+";",looks:["border-width:8px 8px 8px 0;top:-8px","border-width:8px 8px 0 0;top:-8px","border-width:0 8px 8px 0;top:0px"]})],detach:function(){this.wrap.getParent()&&this.wrap.remove();return this},mouseNear:function(){t(a,this);var b=a.holdDistance,c=this.size;return c&&l(a.mouse.y,c.top-b,c.bottom+b)&&l(a.mouse.x,c.left-b,c.right+b)?!0:!1},place:function(){var b=a.view,c=a.editable,d=a.trigger,e=d.upper,
g=d.lower,f=e||g,h=f.getParent(),k={};this.trigger=d;e&&t(a,e,!0);g&&t(a,g,!0);t(a,h,!0);a.inInlineMode&&x(a,!0);h.equals(c)?(k.left=b.scroll.x,k.right=-b.scroll.x,k.width=""):(k.left=f.size.left-f.size.margin.left+b.scroll.x-(a.inInlineMode?b.editable.left+b.editable.border.left:0),k.width=f.size.outerWidth+f.size.margin.left+f.size.margin.right+b.scroll.x,k.right="");e&&g?k.top=e.size.margin.bottom===g.size.margin.top?0|e.size.bottom+e.size.margin.bottom/2:e.size.margin.bottom<g.size.margin.top?
e.size.bottom+e.size.margin.bottom:e.size.bottom+e.size.margin.bottom-g.size.margin.top:e?g||(k.top=e.size.bottom+e.size.margin.bottom):k.top=g.size.top-g.size.margin.top;d.is(O)||l(k.top,b.scroll.y-15,b.scroll.y+5)?(k.top=a.inInlineMode?0:b.scroll.y,this.look(O)):d.is(K)||l(k.top,b.pane.bottom-5,b.pane.bottom+15)?(k.top=a.inInlineMode?b.editable.height+b.editable.padding.top+b.editable.padding.bottom:b.pane.bottom-1,this.look(K)):(a.inInlineMode&&(k.top-=b.editable.top+b.editable.border.top),this.look(W));
a.inInlineMode&&(k.top--,k.top+=b.editable.scroll.top,k.left+=b.editable.scroll.left);for(var m in k)k[m]=CKEDITOR.tools.cssLength(k[m]);this.setStyles(k)},look:function(a){if(this.oldLook!=a){for(var b=this.lineChildren.length,c;b--;)(c=this.lineChildren[b]).setAttribute("style",c.base+c.looks[0|a/2]);this.oldLook=a}},wrap:new H("span",a.doc)});for(b=c.lineChildren.length;b--;)c.lineChildren[b].appendTo(c);c.look(W);c.appendTo(c.wrap);c.unselectable();c.lineChildren[0].on("mouseup",function(b){c.detach();
h(a,function(b){var c=a.line.trigger;b[c.is(G)?"insertBefore":"insertAfter"](c.is(G)?c.lower:c.upper)},!0);a.editor.focus();I.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();b.data.preventDefault(!0)});c.on("mousedown",function(a){a.data.preventDefault(!0)});a.line=c}function h(a,b,c){var d=new CKEDITOR.dom.range(a.doc),e=a.editor,g;I.ie&&a.enterMode==CKEDITOR.ENTER_BR?g=a.doc.createText(R):(g=(g=k(a.element,!0))&&g.data("cke-enter-mode")||a.enterMode,g=new H(L[g],a.doc),g.is("br")||
a.doc.createText(R).appendTo(g));c&&e.fire("saveSnapshot");b(g);d.moveToPosition(g,CKEDITOR.POSITION_AFTER_START);e.getSelection().selectRanges([d]);a.hotNode=g;c&&e.fire("saveSnapshot")}function m(a,c){return{canUndo:!0,modes:{wysiwyg:1},exec:function(){function e(b){var d=I.ie&&9>I.version?" ":R,g=a.hotNode&&a.hotNode.getText()==d&&a.element.equals(a.hotNode)&&a.lastCmdDirection===!!c;h(a,function(d){g&&a.hotNode&&a.hotNode.remove();d[c?"insertAfter":"insertBefore"](b);d.setAttributes({"data-cke-magicline-hot":1,
"data-cke-magicline-dir":!!c});a.lastCmdDirection=!!c});I.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();a.line.detach()}return function(g){g=g.getSelection().getStartElement();var f;g=g.getAscendant(U,1);if(!p(a,g)&&g&&!g.equals(a.editable)&&!g.contains(a.editable)){(f=k(g))&&"false"==f.getAttribute("contenteditable")&&(g=f);a.element=g;f=d(a,g,!c);var h;n(f)&&f.is(a.triggers)&&f.is(X)&&(!d(a,f,!c)||(h=d(a,f,!c))&&n(h)&&h.is(a.triggers))?e(f):(h=b(a,g),n(h)&&(d(a,h,!c)?(g=d(a,h,!c))&&
n(g)&&g.is(a.triggers)&&e(h):e(h)))}}}()}}function e(a,b){if(!b||b.type!=CKEDITOR.NODE_ELEMENT||!b.$)return!1;var c=a.line;return c.wrap.equals(b)||c.wrap.contains(b)}function n(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.$}function q(a){if(!n(a))return!1;var b;(b=y(a))||(n(a)?(b={left:1,right:1,center:1},b=!(!b[a.getComputedStyle("float")]&&!b[a.getAttribute("align")])):b=!1);return b}function y(a){return!!{absolute:1,fixed:1}[a.getComputedStyle("position")]}function u(a,b){return n(b)?b.is(a.triggers):
null}function p(a,b){if(!b)return!1;for(var c=b.getParents(1),d=c.length;d--;)for(var e=a.tabuList.length;e--;)if(c[d].hasAttribute(a.tabuList[e]))return!0;return!1}function v(a,b,c){b=b[c?"getLast":"getFirst"](function(b){return a.isRelevant(b)&&!b.is(ha)});if(!b)return!1;t(a,b);return c?b.size.top>a.mouse.y:b.size.bottom<a.mouse.y}function w(a){var b=a.editable,c=a.mouse,d=a.view,g=a.triggerOffset;x(a);var h=c.y>(a.inInlineMode?d.editable.top+d.editable.height/2:Math.min(d.editable.height,d.pane.height)/
2),b=b[h?"getLast":"getFirst"](function(a){return!(P(a)||S(a))});if(!b)return null;e(a,b)&&(b=a.line.wrap[h?"getPrevious":"getNext"](function(a){return!(P(a)||S(a))}));if(!n(b)||q(b)||!u(a,b))return null;t(a,b);return!h&&0<=b.size.top&&l(c.y,0,b.size.top+g)?(a=a.inInlineMode||0===d.scroll.y?O:W,new f([null,b,G,Q,a])):h&&b.size.bottom<=d.pane.height&&l(c.y,b.size.bottom-g,d.pane.height)?(a=a.inInlineMode||l(b.size.bottom,d.pane.height-g,d.pane.height)?K:W,new f([b,null,D,Q,a])):null}function r(a){var c=
a.mouse,e=a.view,g=a.triggerOffset,h=b(a);if(!h)return null;t(a,h);var g=Math.min(g,0|h.size.outerHeight/2),k=[],m,r;if(l(c.y,h.size.top-1,h.size.top+g))r=!1;else if(l(c.y,h.size.bottom-g,h.size.bottom+1))r=!0;else return null;if(q(h)||v(a,h,r)||h.getParent().is(Z))return null;var M=d(a,h,!r);if(M){if(M&&M.type==CKEDITOR.NODE_TEXT)return null;if(n(M)){if(q(M)||!u(a,M)||M.getParent().is(Z))return null;k=[M,h][r?"reverse":"concat"]().concat([N,Q])}}else h.equals(a.editable[r?"getLast":"getFirst"](a.isRelevant))?
(x(a),r&&l(c.y,h.size.bottom-g,e.pane.height)&&l(h.size.bottom,e.pane.height-g,e.pane.height)?m=K:l(c.y,0,h.size.top+g)&&(m=O)):m=W,k=[null,h][r?"reverse":"concat"]().concat([r?D:G,Q,m,h.equals(a.editable[r?"getLast":"getFirst"](a.isRelevant))?r?K:O:W]);return 0 in k?new f(k):null}function z(a,b,c,d){for(var e=b.getDocumentPosition(),g={},f={},h={},k={},l=Y.length;l--;)g[Y[l]]=parseInt(b.getComputedStyle.call(b,"border-"+Y[l]+"-width"),10)||0,h[Y[l]]=parseInt(b.getComputedStyle.call(b,"padding-"+
Y[l]),10)||0,f[Y[l]]=parseInt(b.getComputedStyle.call(b,"margin-"+Y[l]),10)||0;c&&!d||A(a,d);k.top=e.y-(c?0:a.view.scroll.y);k.left=e.x-(c?0:a.view.scroll.x);k.outerWidth=b.$.offsetWidth;k.outerHeight=b.$.offsetHeight;k.height=k.outerHeight-(h.top+h.bottom+g.top+g.bottom);k.width=k.outerWidth-(h.left+h.right+g.left+g.right);k.bottom=k.top+k.outerHeight;k.right=k.left+k.outerWidth;a.inInlineMode&&(k.scroll={top:b.$.scrollTop,left:b.$.scrollLeft});return C({border:g,padding:h,margin:f,ignoreScroll:c},
k,!0)}function t(a,b,c){if(!n(b))return b.size=null;if(!b.size)b.size={};else if(b.size.ignoreScroll==c&&b.size.date>new Date-ba)return null;return C(b.size,z(a,b,c),{date:+new Date},!0)}function x(a,b){a.view.editable=z(a,a.editable,b,!0)}function A(a,b){a.view||(a.view={});var c=a.view;if(!(!b&&c&&c.date>new Date-ba)){var d=a.win,c=d.getScrollPosition(),d=d.getViewPaneSize();C(a.view,{scroll:{x:c.x,y:c.y,width:a.doc.$.documentElement.scrollWidth-d.width,height:a.doc.$.documentElement.scrollHeight-
d.height},pane:{width:d.width,height:d.height,bottom:d.height+c.y},date:+new Date},!0)}}function B(a,b,c,d){for(var e=d,g=d,h=0,k=!1,l=!1,m=a.view.pane.height,n=a.mouse;n.y+h<m&&0<n.y-h;){k||(k=b(e,d));l||(l=b(g,d));!k&&0<n.y-h&&(e=c(a,{x:n.x,y:n.y-h}));!l&&n.y+h<m&&(g=c(a,{x:n.x,y:n.y+h}));if(k&&l)break;h+=2}return new f([e,g,null,null])}CKEDITOR.plugins.add("magicline",{init:function(a){var c=a.config,k=c.magicline_triggerOffset||30,l={editor:a,enterMode:c.enterMode,triggerOffset:k,holdDistance:0|
k*(c.magicline_holdDistance||.5),boxColor:c.magicline_color||"#ff0000",rtl:"rtl"==c.contentsLangDirection,tabuList:["data-cke-hidden-sel"].concat(c.magicline_tabuList||[]),triggers:c.magicline_everywhere?U:{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}},M,v,t;l.isRelevant=function(a){return n(a)&&!e(l,a)&&!q(a)};a.on("contentDom",function(){var k=a.editable(),n=a.document,q=a.window;C(l,{editable:k,inInlineMode:k.isInline(),doc:n,win:q,hotNode:null},!0);l.boundary=l.inInlineMode?l.editable:
l.doc.getDocumentElement();k.is(E.$inline)||(l.inInlineMode&&!y(k)&&k.setStyles({position:"relative",top:null,left:null}),g.call(this,l),A(l),k.attachListener(a,"beforeUndoImage",function(){l.line.detach()}),k.attachListener(a,"beforeGetData",function(){l.line.wrap.getParent()&&(l.line.detach(),a.once("getData",function(){l.line.attach()},null,null,1E3))},null,null,0),k.attachListener(l.inInlineMode?n:n.getWindow().getFrame(),"mouseout",function(b){if("wysiwyg"==a.mode)if(l.inInlineMode){var c=b.data.$.clientX;
b=b.data.$.clientY;A(l);x(l,!0);var d=l.view.editable,e=l.view.scroll;c>d.left-e.x&&c<d.right-e.x&&b>d.top-e.y&&b<d.bottom-e.y||(clearTimeout(t),t=null,l.line.detach())}else clearTimeout(t),t=null,l.line.detach()}),k.attachListener(k,"keyup",function(){l.hiddenMode=0}),k.attachListener(k,"keydown",function(b){if("wysiwyg"==a.mode)switch(b.data.getKeystroke()){case 2228240:case 16:l.hiddenMode=1,l.line.detach()}}),k.attachListener(l.inInlineMode?k:n,"mousemove",function(b){v=!0;if("wysiwyg"==a.mode&&
!a.readOnly&&!t){var c={x:b.data.$.clientX,y:b.data.$.clientY};t=setTimeout(function(){l.mouse=c;t=l.trigger=null;A(l);v&&!l.hiddenMode&&a.focusManager.hasFocus&&!l.line.mouseNear()&&(l.element=aa(l,!0))&&((l.trigger=w(l)||r(l)||T(l))&&!p(l,l.trigger.upper||l.trigger.lower)?l.line.attach().place():(l.trigger=null,l.line.detach()),v=!1)},30)}}),k.attachListener(q,"scroll",function(){"wysiwyg"==a.mode&&(l.line.detach(),I.webkit&&(l.hiddenMode=1,clearTimeout(M),M=setTimeout(function(){l.mouseDown||(l.hiddenMode=
0)},50)))}),k.attachListener(J?n:q,"mousedown",function(){"wysiwyg"==a.mode&&(l.line.detach(),l.hiddenMode=1,l.mouseDown=1)}),k.attachListener(J?n:q,"mouseup",function(){l.hiddenMode=0;l.mouseDown=0}),a.addCommand("accessPreviousSpace",m(l)),a.addCommand("accessNextSpace",m(l,!0)),a.setKeystroke([[c.magicline_keystrokePrevious,"accessPreviousSpace"],[c.magicline_keystrokeNext,"accessNextSpace"]]),a.on("loadSnapshot",function(){var b,c,d,e;for(e in{p:1,br:1,div:1})for(b=a.document.getElementsByTag(e),
d=b.count();d--;)if((c=b.getItem(d)).data("cke-magicline-hot")){l.hotNode=c;l.lastCmdDirection="true"===c.data("cke-magicline-dir")?!0:!1;return}}),a._.magiclineBackdoor={accessFocusSpace:h,boxTrigger:f,isLine:e,getAscendantTrigger:b,getNonEmptyNeighbour:d,getSize:z,that:l,triggerEdge:r,triggerEditable:w,triggerExpand:T})},this)}});var C=CKEDITOR.tools.extend,H=CKEDITOR.dom.element,F=H.createFromHtml,I=CKEDITOR.env,J=CKEDITOR.env.ie&&9>CKEDITOR.env.version,E=CKEDITOR.dtd,L={},G=128,D=64,N=32,Q=16,
O=4,K=2,W=1,R=" ",Z=E.$listItem,ha=E.$tableContent,X=C({},E.$nonEditable,E.$empty),U=E.$block,ba=100,ca="width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",V=ca+"border-color:transparent;display:block;border-style:solid;",M="\x3cspan\x3e"+R+"\x3c/span\x3e";L[CKEDITOR.ENTER_BR]="br";L[CKEDITOR.ENTER_P]="p";L[CKEDITOR.ENTER_DIV]="div";f.prototype={set:function(a,b,c){this.properties=a+b+(c||W);return this},is:function(a){return(this.properties&
a)==a}};var aa=function(){function a(b,c){var d=b.$.elementFromPoint(c.x,c.y);return d&&d.nodeType?new CKEDITOR.dom.element(d):null}return function(b,c,d){if(!b.mouse)return null;var g=b.doc,f=b.line.wrap;d=d||b.mouse;var h=a(g,d);c&&e(b,h)&&(f.hide(),h=a(g,d),f.show());return!h||h.type!=CKEDITOR.NODE_ELEMENT||!h.$||I.ie&&9>I.version&&!b.boundary.equals(h)&&!b.boundary.contains(h)?null:h}}(),P=CKEDITOR.dom.walker.whitespaces(),S=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),T=function(){function b(e){var g=
e.element,f,h,k;if(!n(g)||g.contains(e.editable)||g.isReadOnly())return null;k=B(e,function(a,b){return!b.equals(a)},function(a,b){return aa(a,!0,b)},g);f=k.upper;h=k.lower;if(a(e,f,h))return k.set(N,8);if(f&&g.contains(f))for(;!f.getParent().equals(g);)f=f.getParent();else f=g.getFirst(function(a){return d(e,a)});if(h&&g.contains(h))for(;!h.getParent().equals(g);)h=h.getParent();else h=g.getLast(function(a){return d(e,a)});if(!f||!h)return null;t(e,f);t(e,h);if(!l(e.mouse.y,f.size.top,h.size.bottom))return null;
for(var g=Number.MAX_VALUE,m,r,M,q;h&&!h.equals(f)&&(r=f.getNext(e.isRelevant));)m=Math.abs(c(e,f,r)-e.mouse.y),m<g&&(g=m,M=f,q=r),f=r,t(e,f);if(!M||!q||!l(e.mouse.y,M.size.top,q.size.bottom))return null;k.upper=M;k.lower=q;return k.set(N,8)}function d(a,b){return!(b&&b.type==CKEDITOR.NODE_TEXT||S(b)||q(b)||e(a,b)||b.type==CKEDITOR.NODE_ELEMENT&&b.$&&b.is("br"))}return function(c){var d=b(c),e;if(e=d){e=d.upper;var g=d.lower;e=!e||!g||q(g)||q(e)||g.equals(e)||e.equals(g)||g.contains(e)||e.contains(g)?
!1:u(c,e)&&u(c,g)&&a(c,e,g)?!0:!1}return e?d:null}}(),Y=["top","left","right","bottom"]}(),CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51,CKEDITOR.config.magicline_keystrokeNext=CKEDITOR.CTRL+CKEDITOR.SHIFT+52,function(){function a(a){if(!a||a.type!=CKEDITOR.NODE_ELEMENT||"form"!=a.getName())return[];for(var b=[],c=["style","className"],d=0;d<c.length;d++){var f=a.$.elements.namedItem(c[d]);f&&(f=new CKEDITOR.dom.element(f),b.push([f,f.nextSibling]),f.remove())}return b}
function f(a,b){if(a&&a.type==CKEDITOR.NODE_ELEMENT&&"form"==a.getName()&&0<b.length)for(var c=b.length-1;0<=c;c--){var d=b[c][0],f=b[c][1];f?d.insertBefore(f):d.appendTo(a)}}function b(b,c){var d=a(b),h={},m=b.$;c||(h["class"]=m.className||"",m.className="");h.inline=m.style.cssText||"";c||(m.style.cssText="position: static; overflow: visible");f(d);return h}function c(b,c){var d=a(b),h=b.$;"class"in c&&(h.className=c["class"]);"inline"in c&&(h.style.cssText=c.inline);f(d)}function d(a){if(!a.editable().isInline()){var b=
CKEDITOR.instances,c;for(c in b){var d=b[c];"wysiwyg"!=d.mode||d.readOnly||(d=d.document.getBody(),d.setAttribute("contentEditable",!1),d.setAttribute("contentEditable",!0))}a.editable().hasFocus&&(a.toolbox.focus(),a.focus())}}CKEDITOR.plugins.add("maximize",{init:function(a){function f(){var b=m.getViewPaneSize();a.resize(b.width,b.height,null,!0)}if(a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var g=a.lang,h=CKEDITOR.document,m=h.getWindow(),e,n,q,y=CKEDITOR.TRISTATE_OFF;a.addCommand("maximize",
{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:!1,exec:function(){var u=a.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}),p=a.ui.space("contents");if("wysiwyg"==a.mode){var v=a.getSelection();e=v&&v.getRanges();n=m.getScrollPosition()}else{var w=a.editable().$;e=!CKEDITOR.env.ie&&[w.selectionStart,w.selectionEnd];n=[w.scrollLeft,w.scrollTop]}if(this.state==CKEDITOR.TRISTATE_OFF){m.on("resize",f);q=m.getScrollPosition();
for(v=a.container;v=v.getParent();)v.setCustomData("maximize_saved_styles",b(v)),v.setStyle("z-index",a.config.baseFloatZIndex-5);p.setCustomData("maximize_saved_styles",b(p,!0));u.setCustomData("maximize_saved_styles",b(u,!0));p={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};h.getDocumentElement().setStyles(p);!CKEDITOR.env.gecko&&h.getDocumentElement().setStyle("position","fixed");CKEDITOR.env.gecko&&CKEDITOR.env.quirks||h.getBody().setStyles(p);CKEDITOR.env.ie?setTimeout(function(){m.$.scrollTo(0,
0)},0):m.$.scrollTo(0,0);u.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute");u.$.offsetLeft;u.setStyles({"z-index":a.config.baseFloatZIndex-5,left:"0px",top:"0px"});u.addClass("cke_maximized");f();p=u.getDocumentPosition();u.setStyles({left:-1*p.x+"px",top:-1*p.y+"px"});CKEDITOR.env.gecko&&d(a)}else if(this.state==CKEDITOR.TRISTATE_ON){m.removeListener("resize",f);for(var v=[p,u],r=0;r<v.length;r++)c(v[r],v[r].getCustomData("maximize_saved_styles")),v[r].removeCustomData("maximize_saved_styles");
for(v=a.container;v=v.getParent();)c(v,v.getCustomData("maximize_saved_styles")),v.removeCustomData("maximize_saved_styles");CKEDITOR.env.ie?setTimeout(function(){m.$.scrollTo(q.x,q.y)},0):m.$.scrollTo(q.x,q.y);u.removeClass("cke_maximized");CKEDITOR.env.webkit&&(u.setStyle("display","inline"),setTimeout(function(){u.setStyle("display","block")},0));a.fire("resize",{outerHeight:a.container.$.offsetHeight,contentsHeight:p.$.offsetHeight,outerWidth:a.container.$.offsetWidth})}this.toggleState();if(v=
this.uiItems[0])p=this.state==CKEDITOR.TRISTATE_OFF?g.maximize.maximize:g.maximize.minimize,v=CKEDITOR.document.getById(v._.id),v.getChild(1).setHtml(p),v.setAttribute("title",p),v.setAttribute("href",'javascript:void("'+p+'");');"wysiwyg"==a.mode?e?(CKEDITOR.env.gecko&&d(a),a.getSelection().selectRanges(e),(w=a.getSelection().getStartElement())&&w.scrollIntoView(!0)):m.$.scrollTo(n.x,n.y):(e&&(w.selectionStart=e[0],w.selectionEnd=e[1]),w.scrollLeft=n[0],w.scrollTop=n[1]);e=n=null;y=this.state;a.fire("maximize",
this.state)},canUndo:!1});a.ui.addButton&&a.ui.addButton("Maximize",{label:g.maximize.maximize,command:"maximize",toolbar:"tools,10"});a.on("mode",function(){var b=a.getCommand("maximize");b.setState(b.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:y)},null,null,100)}}})}(),function(){function a(a,b,c){var d=CKEDITOR.cleanWord;d?c():(a=CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile||b+"filter/default.js"),CKEDITOR.scriptLoader.load(a,c,null,!0));return!d}CKEDITOR.plugins.add("pastefromword",
{requires:"clipboard",init:function(f){function b(a){var b=CKEDITOR.plugins.pastefromword&&CKEDITOR.plugins.pastefromword.images,c,d=[];if(b&&a.editor.filter.check("img[src]")&&(c=b.extractTagsFromHtml(a.data.dataValue),0!==c.length&&(b=b.extractFromRtf(a.data.dataTransfer["text/rtf"]),0!==b.length&&(CKEDITOR.tools.array.forEach(b,function(a){d.push(a.type?"data:"+a.type+";base64,"+CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)):null)},this),c.length===d.length))))for(b=
0;b<c.length;b++)0===c[b].indexOf("file://")&&d[b]&&(a.data.dataValue=a.data.dataValue.replace(c[b],d[b]))}var c=0,d=this.path,l=void 0===f.config.pasteFromWord_inlineImages?!0:f.config.pasteFromWord_inlineImages;f.addCommand("pastefromword",{canUndo:!1,async:!0,exec:function(a,b){c=1;a.execCommand("paste",{type:"html",notification:b&&"undefined"!==typeof b.notification?b.notification:!0})}});CKEDITOR.plugins.clipboard.addPasteButton(f,"PasteFromWord",{label:f.lang.pastefromword.toolbar,command:"pastefromword",
toolbar:"clipboard,50"});f.on("paste",function(b){var g=b.data,h=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?g.dataTransfer.getData("text/html",!0):null,l=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?g.dataTransfer.getData("text/rtf"):null,h=h||g.dataValue,e={dataValue:h,dataTransfer:{"text/rtf":l}},l=/(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,l=/<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(h)||l.test(h);if(h&&
(c||l)&&(!1!==f.fire("pasteFromWord",e)||c)){g.dontFilter=!0;var n=a(f,d,function(){if(n)f.fire("paste",g);else if(!f.config.pasteFromWordPromptCleanup||c||confirm(f.lang.pastefromword.confirmCleanup))e.dataValue=CKEDITOR.cleanWord(e.dataValue,f),f.fire("afterPasteFromWord",e),g.dataValue=e.dataValue,!0===f.config.forcePasteAsPlainText?g.type="text":CKEDITOR.plugins.clipboard.isCustomCopyCutSupported||"allow-word"!==f.config.forcePasteAsPlainText||(g.type="html");c=0});n&&b.cancel()}},null,null,3);
if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported&&l)f.on("afterPasteFromWord",b)}})}(),function(){var a={canUndo:!1,async:!0,exec:function(a,b){var c=a.lang,d=CKEDITOR.tools.keystrokeToString(c.common.keyboard,a.getCommandKeystroke(CKEDITOR.env.ie?a.commands.paste:this)),l=b&&"undefined"!==typeof b.notification?b.notification:!b||!b.from||"keystrokeHandler"===b.from&&CKEDITOR.env.ie,c=l&&"string"===typeof l?l:c.pastetext.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+d.aria+'"\x3e'+
d.display+"\x3c/kbd\x3e");a.execCommand("paste",{type:"text",notification:l?c:!1})}};CKEDITOR.plugins.add("pastetext",{requires:"clipboard",init:function(f){var b=CKEDITOR.env.safari?CKEDITOR.CTRL+CKEDITOR.ALT+CKEDITOR.SHIFT+86:CKEDITOR.CTRL+CKEDITOR.SHIFT+86;f.addCommand("pastetext",a);f.setKeystroke(b,"pastetext");CKEDITOR.plugins.clipboard.addPasteButton(f,"PasteText",{label:f.lang.pastetext.button,command:"pastetext",toolbar:"clipboard,40"});if(f.config.forcePasteAsPlainText)f.on("beforePaste",
function(a){"html"!=a.data.type&&(a.data.type="text")});f.on("pasteState",function(a){f.getCommand("pastetext").setState(a.data)})}})}(),CKEDITOR.plugins.add("removeformat",{init:function(a){a.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat);a.ui.addButton&&a.ui.addButton("RemoveFormat",{label:a.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"})}}),CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(a){for(var f=a._.removeFormatRegex||
(a._.removeFormatRegex=new RegExp("^(?:"+a.config.removeFormatTags.replace(/,/g,"|")+")$","i")),b=a._.removeAttributes||(a._.removeAttributes=a.config.removeFormatAttributes.split(",")),c=CKEDITOR.plugins.removeformat.filter,d=a.getSelection().getRanges().createIterator(),l=function(a){return a.type==CKEDITOR.NODE_ELEMENT},k=[],g;g=d.getNextRange();){var h=g.createBookmark();g=a.createRange();g.setStartBefore(h.startNode);h.endNode&&g.setEndAfter(h.endNode);g.collapsed||g.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var m=g.createBookmark(),e=m.startNode,n=m.endNode,q=function(b){for(var d=a.elementPath(b),e=d.elements,g=1,h;(h=e[g])&&!h.equals(d.block)&&!h.equals(d.blockLimit);g++)f.test(h.getName())&&c(a,h)&&b.breakParent(h)};q(e);if(n)for(q(n),e=e.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);e&&!e.equals(n);)if(e.isReadOnly()){if(e.getPosition(n)&CKEDITOR.POSITION_CONTAINS)break;e=e.getNext(l)}else q=e.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT),"img"==e.getName()&&e.data("cke-realelement")||e.hasAttribute("data-cke-bookmark")||
!c(a,e)||(f.test(e.getName())?e.remove(1):(e.removeAttributes(b),a.fire("removeFormatCleanup",e))),e=q;m.startNode.remove();m.endNode&&m.endNode.remove();g.moveToBookmark(h);k.push(g)}a.forceNextSelectionCheck();a.getSelection().selectRanges(k)}}},filter:function(a,f){for(var b=a._.removeFormatFilters||[],c=0;c<b.length;c++)if(!1===b[c](f))return!1;return!0}},CKEDITOR.editor.prototype.addRemoveFormatFilter=function(a){this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(a)},
CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize",{init:function(a){function f(b){var d=h.width,f=h.height,k=d+(b.data.$.screenX-g.x)*("rtl"==l?-1:1);b=f+(b.data.$.screenY-g.y);m&&(d=Math.max(c.resize_minWidth,Math.min(k,c.resize_maxWidth)));e&&(f=Math.max(c.resize_minHeight,Math.min(b,c.resize_maxHeight)));
a.resize(m?d:null,f)}function b(){CKEDITOR.document.removeListener("mousemove",f);CKEDITOR.document.removeListener("mouseup",b);a.document&&(a.document.removeListener("mousemove",f),a.document.removeListener("mouseup",b))}var c=a.config,d=a.ui.spaceId("resizer"),l=a.element?a.element.getDirection(1):"ltr";!c.resize_dir&&(c.resize_dir="vertical");void 0===c.resize_maxWidth&&(c.resize_maxWidth=3E3);void 0===c.resize_maxHeight&&(c.resize_maxHeight=3E3);void 0===c.resize_minWidth&&(c.resize_minWidth=
750);void 0===c.resize_minHeight&&(c.resize_minHeight=250);if(!1!==c.resize_enabled){var k=null,g,h,m=("both"==c.resize_dir||"horizontal"==c.resize_dir)&&c.resize_minWidth!=c.resize_maxWidth,e=("both"==c.resize_dir||"vertical"==c.resize_dir)&&c.resize_minHeight!=c.resize_maxHeight,n=CKEDITOR.tools.addFunction(function(d){k||(k=a.getResizable());h={width:k.$.offsetWidth||0,height:k.$.offsetHeight||0};g={x:d.screenX,y:d.screenY};c.resize_minWidth>h.width&&(c.resize_minWidth=h.width);c.resize_minHeight>
h.height&&(c.resize_minHeight=h.height);CKEDITOR.document.on("mousemove",f);CKEDITOR.document.on("mouseup",b);a.document&&(a.document.on("mousemove",f),a.document.on("mouseup",b));d.preventDefault&&d.preventDefault()});a.on("destroy",function(){CKEDITOR.tools.removeFunction(n)});a.on("uiSpace",function(b){if("bottom"==b.data.space){var c="";m&&!e&&(c=" cke_resizer_horizontal");!m&&e&&(c=" cke_resizer_vertical");var g='\x3cspan id\x3d"'+d+'" class\x3d"cke_resizer'+c+" cke_resizer_"+l+'" title\x3d"'+
CKEDITOR.tools.htmlEncode(a.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+n+', event)"\x3e'+("ltr"==l?"◢":"◣")+"\x3c/span\x3e";"ltr"==l&&"ltr"==c?b.data.html+=g:b.data.html=g+b.data.html}},a,null,100);a.on("maximize",function(b){a.ui.space("resizer")[b.data==CKEDITOR.TRISTATE_ON?"hide":"show"]()})}}}),CKEDITOR.plugins.add("menubutton",{requires:"button,menu",onLoad:function(){var a=function(a){var b=this._,c=b.menu;b.state!==CKEDITOR.TRISTATE_DISABLED&&(b.on&&c?c.hide():(b.previousState=
b.state,c||(c=b.menu=new CKEDITOR.menu(a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.common.options}}}),c.onHide=CKEDITOR.tools.bind(function(){var c=this.command?a.getCommand(this.command).modes:this.modes;this.setState(!c||c[a.mode]?b.previousState:CKEDITOR.TRISTATE_DISABLED);b.on=0},this),this.onMenu&&c.addListener(this.onMenu)),this.setState(CKEDITOR.TRISTATE_ON),b.on=1,setTimeout(function(){c.show(CKEDITOR.document.getById(b.id),4)},0)))};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,
$:function(f){delete f.panel;this.base(f);this.hasArrow="menu";this.click=a},statics:{handler:{create:function(a){return new CKEDITOR.ui.menuButton(a)}}}})},beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler)}}),CKEDITOR.UI_MENUBUTTON="menubutton","use strict",CKEDITOR.plugins.add("scayt",{requires:"menubutton,dialog",tabToOpen:null,dialogName:"scaytDialog",onLoad:function(a){"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path+
"skins/"+CKEDITOR.skin.name+"/scayt.css"));CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path+"dialogs/dialog.css"))},init:function(a){var f=this,b=CKEDITOR.plugins.scayt;this.bindEvents(a);this.parseConfig(a);this.addRule(a);CKEDITOR.dialog.add(this.dialogName,CKEDITOR.getUrl(this.path+"dialogs/options.js"));this.addMenuItems(a);var c=a.lang.scayt,d=CKEDITOR.env;a.ui.add("Scayt",CKEDITOR.UI_MENUBUTTON,{label:c.text_title,title:a.plugins.wsc?a.lang.wsc.title:c.text_title,modes:{wysiwyg:!(d.ie&&
(8>d.version||d.quirks))},toolbar:"spellchecker,20",refresh:function(){var c=a.ui.instances.Scayt.getState();a.scayt&&(c=b.state.scayt[a.name]?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);a.fire("scaytButtonState",c)},onRender:function(){var b=this;a.on("scaytButtonState",function(a){void 0!==typeof a.data&&b.setState(a.data)})},onMenu:function(){var c=a.scayt;a.getMenuItem("scaytToggle").label=a.lang.scayt[c&&b.state.scayt[a.name]?"btn_disable":"btn_enable"];var d={scaytToggle:CKEDITOR.TRISTATE_OFF,
scaytOptions:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytLangs:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytAbout:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,WSC:a.plugins.wsc?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};a.config.scayt_uiTabs[0]||delete d.scaytOptions;a.config.scayt_uiTabs[1]||delete d.scaytLangs;a.config.scayt_uiTabs[2]||delete d.scaytDict;c&&!CKEDITOR.plugins.scayt.isNewUdSupported(c)&&
(delete d.scaytDict,a.config.scayt_uiTabs[2]=0,CKEDITOR.plugins.scayt.alarmCompatibilityMessage());return d}});a.contextMenu&&a.addMenuItems&&(a.contextMenu.addListener(function(b,c){var d=a.scayt,h,m;d&&(m=d.getSelectionNode())&&(h=f.menuGenerator(a,m),d.showBanner("."+a.contextMenu._.definition.panel.className.split(" ").join(" .")));return h}),a.contextMenu._.onHide=CKEDITOR.tools.override(a.contextMenu._.onHide,function(b){return function(){var c=a.scayt;c&&c.hideBanner();return b.apply(this)}}))},
addMenuItems:function(a){var f=this,b=CKEDITOR.plugins.scayt;a.addMenuGroup("scaytButton");for(var c=a.config.scayt_contextMenuItemsOrder.split("|"),d=0;d<c.length;d++)c[d]="scayt_"+c[d];if((c=["grayt_description","grayt_suggest","grayt_control"].concat(c))&&c.length)for(d=0;d<c.length;d++)a.addMenuGroup(c[d],d-10);a.addCommand("scaytToggle",{exec:function(a){var c=a.scayt;b.state.scayt[a.name]=!b.state.scayt[a.name];!0===b.state.scayt[a.name]?c||b.createScayt(a):c&&b.destroy(a)}});a.addCommand("scaytAbout",
{exec:function(a){a.scayt.tabToOpen="about";b.openDialog(f.dialogName,a)}});a.addCommand("scaytOptions",{exec:function(a){a.scayt.tabToOpen="options";b.openDialog(f.dialogName,a)}});a.addCommand("scaytLangs",{exec:function(a){a.scayt.tabToOpen="langs";b.openDialog(f.dialogName,a)}});a.addCommand("scaytDict",{exec:function(a){a.scayt.tabToOpen="dictionaries";b.openDialog(f.dialogName,a)}});c={scaytToggle:{label:a.lang.scayt.btn_enable,group:"scaytButton",command:"scaytToggle"},scaytAbout:{label:a.lang.scayt.btn_about,
group:"scaytButton",command:"scaytAbout"},scaytOptions:{label:a.lang.scayt.btn_options,group:"scaytButton",command:"scaytOptions"},scaytLangs:{label:a.lang.scayt.btn_langs,group:"scaytButton",command:"scaytLangs"},scaytDict:{label:a.lang.scayt.btn_dictionaries,group:"scaytButton",command:"scaytDict"}};a.plugins.wsc&&(c.WSC={label:a.lang.wsc.toolbar,group:"scaytButton",onClick:function(){var b=CKEDITOR.plugins.scayt,c=a.scayt,d=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();
(d=d.replace(/\s/g,""))?(c&&b.state.scayt[a.name]&&c.setMarkupPaused&&c.setMarkupPaused(!0),a.lockSelection(),a.execCommand("checkspell")):alert("Nothing to check!")}});a.addMenuItems(c)},bindEvents:function(a){var f=CKEDITOR.plugins.scayt,b=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE,c=function(){f.destroy(a)},d=function(){!f.state.scayt[a.name]||a.readOnly||a.scayt||f.createScayt(a)},l=function(){var c=a.editable();c.attachListener(c,"focus",function(c){CKEDITOR.plugins.scayt&&!a.scayt&&setTimeout(d,
0);c=CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[a.name]&&a.scayt;var g,e;if((b||c)&&a._.savedSelection){c=a._.savedSelection.getSelectedElement();c=!c&&a._.savedSelection.getRanges();for(var f=0;f<c.length;f++)e=c[f],"string"===typeof e.startContainer.$.nodeValue&&(g=e.startContainer.getText().length,(g<e.startOffset||g<e.endOffset)&&a.unlockSelection(!1))}},this,null,-10)},k=function(){b?a.config.scayt_inlineModeImmediateMarkup?d():(a.on("blur",function(){setTimeout(c,0)}),a.on("focus",
d),a.focusManager.hasFocus&&d()):d();l();var g=a.editable();g.attachListener(g,"mousedown",function(b){b=b.data.getTarget();var c=a.widgets&&a.widgets.getByElement(b);c&&(c.wrapper=b.getAscendant(function(a){return a.hasAttribute("data-cke-widget-wrapper")},!0))},this,null,-10)};a.on("contentDom",k);a.on("beforeCommandExec",function(b){var c=a.scayt,d=!1,e=!1,k=!0;b.data.name in f.options.disablingCommandExec&&"wysiwyg"==a.mode?c&&(f.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED)):
"bold"!==b.data.name&&"italic"!==b.data.name&&"underline"!==b.data.name&&"strike"!==b.data.name&&"subscript"!==b.data.name&&"superscript"!==b.data.name&&"enter"!==b.data.name&&"cut"!==b.data.name&&"language"!==b.data.name||!c||("cut"===b.data.name&&(k=!1,e=!0),"language"===b.data.name&&(e=d=!0),a.fire("reloadMarkupScayt",{removeOptions:{removeInside:k,forceBookmark:e,language:d},timeout:0}))});a.on("beforeSetMode",function(b){if("source"==b.data){if(b=a.scayt)f.destroy(a),a.fire("scaytButtonState",
CKEDITOR.TRISTATE_DISABLED);a.document&&a.document.getBody().removeAttribute("_jquid")}});a.on("afterCommandExec",function(b){"wysiwyg"!=a.mode||"undo"!=b.data.name&&"redo"!=b.data.name||setTimeout(function(){f.reloadMarkup(a.scayt)},250)});a.on("readOnly",function(b){var c;b&&(c=a.scayt,!0===b.editor.readOnly?c&&c.fire("removeMarkupInDocument",{}):c?f.reloadMarkup(c):"wysiwyg"==b.editor.mode&&!0===f.state.scayt[b.editor.name]&&(f.createScayt(a),b.editor.fire("scaytButtonState",CKEDITOR.TRISTATE_ON)))});
a.on("beforeDestroy",c);a.on("setData",function(){c();(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE||a.plugins.divarea)&&k()},this,null,50);a.on("reloadMarkupScayt",function(b){var c=b.data&&b.data.removeOptions,d=b.data&&b.data.timeout,e=b.data&&b.data.language,k=a.scayt;k&&setTimeout(function(){e&&(c.selectionNode=a.plugins.language.getCurrentLangElement(a),c.selectionNode=c.selectionNode&&c.selectionNode.$||null);k.removeMarkupInSelectionNode(c);f.reloadMarkup(k)},d||0)});a.on("insertElement",function(){a.fire("reloadMarkupScayt",
{removeOptions:{forceBookmark:!0}})},this,null,50);a.on("insertHtml",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("insertText",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("scaytDialogShown",function(b){b.data.selectPage(a.scayt.tabToOpen)})},parseConfig:function(a){var f=CKEDITOR.plugins.scayt;f.replaceOldOptionsNames(a.config);"boolean"!==typeof a.config.scayt_autoStartup&&
(a.config.scayt_autoStartup=!1);f.state.scayt[a.name]=a.config.scayt_autoStartup;"boolean"!==typeof a.config.grayt_autoStartup&&(a.config.grayt_autoStartup=!1);"boolean"!==typeof a.config.scayt_inlineModeImmediateMarkup&&(a.config.scayt_inlineModeImmediateMarkup=!1);f.state.grayt[a.name]=a.config.grayt_autoStartup;a.config.scayt_contextCommands||(a.config.scayt_contextCommands="ignoreall|add");a.config.scayt_contextMenuItemsOrder||(a.config.scayt_contextMenuItemsOrder="suggest|moresuggest|control");
a.config.scayt_sLang||(a.config.scayt_sLang="en_US");if(void 0===a.config.scayt_maxSuggestions||"number"!=typeof a.config.scayt_maxSuggestions||0>a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions=3;if(void 0===a.config.scayt_minWordLength||"number"!=typeof a.config.scayt_minWordLength||1>a.config.scayt_minWordLength)a.config.scayt_minWordLength=3;if(void 0===a.config.scayt_customDictionaryIds||"string"!==typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds="";if(void 0===
a.config.scayt_userDictionaryName||"string"!==typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName=null;if("string"===typeof a.config.scayt_uiTabs&&3===a.config.scayt_uiTabs.split(",").length){var b=[],c=[];a.config.scayt_uiTabs=a.config.scayt_uiTabs.split(",");CKEDITOR.tools.search(a.config.scayt_uiTabs,function(a){1===Number(a)||0===Number(a)?(c.push(!0),b.push(Number(a))):c.push(!1)});null===CKEDITOR.tools.search(c,!1)?a.config.scayt_uiTabs=b:a.config.scayt_uiTabs=[1,1,1]}else a.config.scayt_uiTabs=
[1,1,1];"string"!=typeof a.config.scayt_serviceProtocol&&(a.config.scayt_serviceProtocol=null);"string"!=typeof a.config.scayt_serviceHost&&(a.config.scayt_serviceHost=null);"string"!=typeof a.config.scayt_servicePort&&(a.config.scayt_servicePort=null);"string"!=typeof a.config.scayt_servicePath&&(a.config.scayt_servicePath=null);a.config.scayt_moreSuggestions||(a.config.scayt_moreSuggestions="on");"string"!==typeof a.config.scayt_customerId&&(a.config.scayt_customerId="1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
"string"!==typeof a.config.scayt_customPunctuation&&(a.config.scayt_customPunctuation="-");"string"!==typeof a.config.scayt_srcUrl&&(f=document.location.protocol,f=-1!=f.search(/https?:/)?f:"http:",a.config.scayt_srcUrl=f+"//svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js");"boolean"!==typeof CKEDITOR.config.scayt_handleCheckDirty&&(CKEDITOR.config.scayt_handleCheckDirty=!0);"boolean"!==typeof CKEDITOR.config.scayt_handleUndoRedo&&(CKEDITOR.config.scayt_handleUndoRedo=!0);CKEDITOR.config.scayt_handleUndoRedo=
CKEDITOR.plugins.undo?CKEDITOR.config.scayt_handleUndoRedo:!1;"boolean"!==typeof a.config.scayt_multiLanguageMode&&(a.config.scayt_multiLanguageMode=!1);"object"!==typeof a.config.scayt_multiLanguageStyles&&(a.config.scayt_multiLanguageStyles={});a.config.scayt_ignoreAllCapsWords&&"boolean"!==typeof a.config.scayt_ignoreAllCapsWords&&(a.config.scayt_ignoreAllCapsWords=!1);a.config.scayt_ignoreDomainNames&&"boolean"!==typeof a.config.scayt_ignoreDomainNames&&(a.config.scayt_ignoreDomainNames=!1);a.config.scayt_ignoreWordsWithMixedCases&&
"boolean"!==typeof a.config.scayt_ignoreWordsWithMixedCases&&(a.config.scayt_ignoreWordsWithMixedCases=!1);a.config.scayt_ignoreWordsWithNumbers&&"boolean"!==typeof a.config.scayt_ignoreWordsWithNumbers&&(a.config.scayt_ignoreWordsWithNumbers=!1);if(a.config.scayt_disableOptionsStorage){var f=CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage)?a.config.scayt_disableOptionsStorage:"string"===typeof a.config.scayt_disableOptionsStorage?[a.config.scayt_disableOptionsStorage]:void 0,d="all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
l=["lang","ignore-all-caps-words","ignore-domain-names","ignore-words-with-mixed-cases","ignore-words-with-numbers"],k=CKEDITOR.tools.search,g=CKEDITOR.tools.indexOf;a.config.scayt_disableOptionsStorage=function(a){for(var b=[],c=0;c<a.length;c++){var f=a[c],q=!!k(a,"options");if(!k(d,f)||q&&k(l,function(a){if("lang"===a)return!1}))return;k(l,f)&&l.splice(g(l,f),1);if("all"===f||q&&k(a,"lang"))return[];"options"===f&&(l=["lang"])}return b=b.concat(l)}(f)}a.config.scayt_disableCache&&"boolean"!==typeof a.config.scayt_disableCache&&
(a.config.scayt_disableCache=!1);if(void 0===a.config.scayt_cacheSize||"number"!=typeof a.config.scayt_cacheSize||1>a.config.scayt_cacheSize)a.config.scayt_cacheSize=4E3},addRule:function(a){var f=CKEDITOR.plugins.scayt,b=a.dataProcessor,c=b&&b.htmlFilter,d=a._.elementsPath&&a._.elementsPath.filters,b=b&&b.dataFilter,l=a.addRemoveFormatFilter,k=function(b){if(a.scayt&&(b.hasAttribute(f.options.data_attribute_name)||b.hasAttribute(f.options.problem_grammar_data_attribute)))return!1},g=function(b){var c=
!0;a.scayt&&(b.hasAttribute(f.options.data_attribute_name)||b.hasAttribute(f.options.problem_grammar_data_attribute))&&(c=!1);return c};d&&d.push(k);b&&b.addRules({elements:{span:function(a){var b=a.hasClass(f.options.misspelled_word_class)&&a.attributes[f.options.data_attribute_name],c=a.hasClass(f.options.problem_grammar_class)&&a.attributes[f.options.problem_grammar_data_attribute];f&&(b||c)&&delete a.name;return a}}});c&&c.addRules({elements:{span:function(a){var b=a.hasClass(f.options.misspelled_word_class)&&
a.attributes[f.options.data_attribute_name],c=a.hasClass(f.options.problem_grammar_class)&&a.attributes[f.options.problem_grammar_data_attribute];f&&(b||c)&&delete a.name;return a}}});l&&l.call(a,g)},scaytMenuDefinition:function(a){var f=this,b=CKEDITOR.plugins.scayt;a=a.scayt;return{scayt:{scayt_ignore:{label:a.getLocal("btn_ignore"),group:"scayt_control",order:1,exec:function(a){a.scayt.ignoreWord()}},scayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"scayt_control",order:2,exec:function(a){a.scayt.ignoreAllWords()}},
scayt_add:{label:a.getLocal("btn_addWord"),group:"scayt_control",order:3,exec:function(a){var b=a.scayt;setTimeout(function(){b.addWordToUserDictionary()},10)}},scayt_option:{label:a.getLocal("btn_options"),group:"scayt_control",order:4,exec:function(a){a.scayt.tabToOpen="options";b.openDialog(f.dialogName,a)},verification:function(a){return 1==a.config.scayt_uiTabs[0]?!0:!1}},scayt_language:{label:a.getLocal("btn_langs"),group:"scayt_control",order:5,exec:function(a){a.scayt.tabToOpen="langs";b.openDialog(f.dialogName,
a)},verification:function(a){return 1==a.config.scayt_uiTabs[1]?!0:!1}},scayt_dictionary:{label:a.getLocal("btn_dictionaries"),group:"scayt_control",order:6,exec:function(a){a.scayt.tabToOpen="dictionaries";b.openDialog(f.dialogName,a)},verification:function(a){return 1==a.config.scayt_uiTabs[2]?!0:!1}},scayt_about:{label:a.getLocal("btn_about"),group:"scayt_control",order:7,exec:function(a){a.scayt.tabToOpen="about";b.openDialog(f.dialogName,a)}}},grayt:{grayt_problemdescription:{label:"Grammar problem description",
group:"grayt_description",order:1,state:CKEDITOR.TRISTATE_DISABLED,exec:function(a){}},grayt_ignore:{label:a.getLocal("btn_ignore"),group:"grayt_control",order:2,exec:function(a){a.scayt.ignorePhrase()}},grayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"grayt_control",order:3,exec:function(a){a.scayt.ignoreAllPhrases()}}}}},buildSuggestionMenuItems:function(a,f,b){var c={},d={},l=b?"word":"phrase",k=b?"startGrammarCheck":"startSpellCheck",g=a.scayt;if(0<f.length&&"no_any_suggestions"!==f[0])if(b)for(b=
0;b<f.length;b++){var h="scayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_");a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],l,k));b<a.config.scayt_maxSuggestions?(a.addMenuItem(h,{label:f[b],command:h,group:"scayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF):(a.addMenuItem(h,{label:f[b],command:h,group:"scayt_moresuggest",order:b+1}),d[h]=CKEDITOR.TRISTATE_OFF,"on"===a.config.scayt_moreSuggestions&&(a.addMenuItem("scayt_moresuggest",{label:g.getLocal("btn_moreSuggestions"),
group:"scayt_moresuggest",order:10,getItems:function(){return d}}),c.scayt_moresuggest=CKEDITOR.TRISTATE_OFF))}else for(b=0;b<f.length;b++)h="grayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_"),a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],l,k)),a.addMenuItem(h,{label:f[b],command:h,group:"grayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF;else c.no_scayt_suggest=CKEDITOR.TRISTATE_DISABLED,a.addCommand("no_scayt_suggest",{exec:function(){}}),a.addMenuItem("no_scayt_suggest",
{label:g.getLocal("btn_noSuggestions")||"no_scayt_suggest",command:"no_scayt_suggest",group:"scayt_suggest",order:0});return c},menuGenerator:function(a,f){var b=a.scayt,c=this.scaytMenuDefinition(a),d={},l=a.config.scayt_contextCommands.split("|"),k=f.getAttribute(b.getLangAttribute())||b.getLang(),g,h,m,e;h=b.isScaytNode(f);m=b.isGraytNode(f);h?(c=c.scayt,g=f.getAttribute(b.getScaytNodeAttributeName()),b.fire("getSuggestionsList",{lang:k,word:g}),d=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,
h)):m&&(c=c.grayt,d=f.getAttribute(b.getGraytNodeAttributeName()),b.getGraytNodeRuleAttributeName?(g=f.getAttribute(b.getGraytNodeRuleAttributeName()),b.getProblemDescriptionText(d,g,k)):b.getProblemDescriptionText(d,k),e=b.getProblemDescriptionText(d,g,k),c.grayt_problemdescription&&e&&(e=e.replace(/([.!?])\s/g,"$1\x3cbr\x3e"),c.grayt_problemdescription.label=e),b.fire("getGrammarSuggestionsList",{lang:k,phrase:d,rule:g}),d=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,h));if(h&&
"off"==a.config.scayt_contextCommands)return d;for(var n in c)h&&-1==CKEDITOR.tools.indexOf(l,n.replace("scayt_",""))&&"all"!=a.config.scayt_contextCommands||m&&"grayt_problemdescription"!==n&&-1==CKEDITOR.tools.indexOf(l,n.replace("grayt_",""))&&"all"!=a.config.scayt_contextCommands||(d[n]="undefined"!=typeof c[n].state?c[n].state:CKEDITOR.TRISTATE_OFF,"function"!==typeof c[n].verification||c[n].verification(a)||delete d[n],a.addCommand(n,{exec:c[n].exec}),a.addMenuItem(n,{label:a.lang.scayt[c[n].label]||
c[n].label,command:n,group:c[n].group,order:c[n].order}));return d},createCommand:function(a,f,b){return{exec:function(c){c=c.scayt;var d={};d[f]=a;c.replaceSelectionNode(d);"startGrammarCheck"===b&&c.removeMarkupInSelectionNode({grammarOnly:!0});c.fire(b)}}}}),CKEDITOR.plugins.scayt={charsToObserve:[{charName:"cke-fillingChar",charCode:function(){var a=CKEDITOR.version.match(/^\d(\.\d*)*/),a=a&&a[0],f;if(a){f="4.5.7";var b,a=a.replace(/\./g,"");f=f.replace(/\./g,"");b=a.length-f.length;b=0<=b?b:
0;f=parseInt(a)>=parseInt(f)*Math.pow(10,b)}return f?Array(7).join(String.fromCharCode(8203)):String.fromCharCode(8203)}()}],state:{scayt:{},grayt:{}},warningCounter:0,suggestions:[],options:{disablingCommandExec:{source:!0,newpage:!0,templates:!0},data_attribute_name:"data-scayt-word",misspelled_word_class:"scayt-misspell-word",problem_grammar_data_attribute:"data-grayt-phrase",problem_grammar_class:"gramm-problem"},backCompatibilityMap:{scayt_service_protocol:"scayt_serviceProtocol",scayt_service_host:"scayt_serviceHost",
scayt_service_port:"scayt_servicePort",scayt_service_path:"scayt_servicePath",scayt_customerid:"scayt_customerId"},openDialog:function(a,f){var b=f.scayt;b.isAllModulesReady&&!1===b.isAllModulesReady()||(f.lockSelection(),f.openDialog(a))},alarmCompatibilityMessage:function(){5>this.warningCounter&&(console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
this.warningCounter+=1)},isNewUdSupported:function(a){return a.getUserDictionary?!0:!1},reloadMarkup:function(a){var f;a&&(f=a.getScaytLangList(),a.reloadMarkup?a.reloadMarkup():(this.alarmCompatibilityMessage(),f&&f.ltr&&f.rtl&&a.fire("startSpellCheck, startGrammarCheck")))},replaceOldOptionsNames:function(a){for(var f in a)f in this.backCompatibilityMap&&(a[this.backCompatibilityMap[f]]=a[f],delete a[f])},createScayt:function(a){var f=this,b=CKEDITOR.plugins.scayt;this.loadScaytLibrary(a,function(a){function d(a){return new SCAYT.CKSCAYT(a,
function(){},function(){})}var l;a.window&&(l="BODY"==a.editable().$.nodeName?a.window.getFrame():a.editable());if(l){l={lang:a.config.scayt_sLang,container:l.$,customDictionary:a.config.scayt_customDictionaryIds,userDictionaryName:a.config.scayt_userDictionaryName,localization:a.langCode,customer_id:a.config.scayt_customerId,customPunctuation:a.config.scayt_customPunctuation,debug:a.config.scayt_debug,data_attribute_name:f.options.data_attribute_name,misspelled_word_class:f.options.misspelled_word_class,
problem_grammar_data_attribute:f.options.problem_grammar_data_attribute,problem_grammar_class:f.options.problem_grammar_class,"options-to-restore":a.config.scayt_disableOptionsStorage,focused:a.editable().hasFocus,ignoreElementsRegex:a.config.scayt_elementsToIgnore,ignoreGraytElementsRegex:a.config.grayt_elementsToIgnore,minWordLength:a.config.scayt_minWordLength,multiLanguageMode:a.config.scayt_multiLanguageMode,multiLanguageStyles:a.config.scayt_multiLanguageStyles,graytAutoStartup:a.config.grayt_autoStartup,
disableCache:a.config.scayt_disableCache,cacheSize:a.config.scayt_cacheSize,charsToObserve:b.charsToObserve};a.config.scayt_serviceProtocol&&(l.service_protocol=a.config.scayt_serviceProtocol);a.config.scayt_serviceHost&&(l.service_host=a.config.scayt_serviceHost);a.config.scayt_servicePort&&(l.service_port=a.config.scayt_servicePort);a.config.scayt_servicePath&&(l.service_path=a.config.scayt_servicePath);"boolean"===typeof a.config.scayt_ignoreAllCapsWords&&(l["ignore-all-caps-words"]=a.config.scayt_ignoreAllCapsWords);
"boolean"===typeof a.config.scayt_ignoreDomainNames&&(l["ignore-domain-names"]=a.config.scayt_ignoreDomainNames);"boolean"===typeof a.config.scayt_ignoreWordsWithMixedCases&&(l["ignore-words-with-mixed-cases"]=a.config.scayt_ignoreWordsWithMixedCases);"boolean"===typeof a.config.scayt_ignoreWordsWithNumbers&&(l["ignore-words-with-numbers"]=a.config.scayt_ignoreWordsWithNumbers);var k;try{k=d(l)}catch(g){f.alarmCompatibilityMessage(),delete l.charsToObserve,k=d(l)}k.subscribe("suggestionListSend",
function(a){for(var b={},c=[],d=0;d<a.suggestionList.length;d++)b["word_"+a.suggestionList[d]]||(b["word_"+a.suggestionList[d]]=a.suggestionList[d],c.push(a.suggestionList[d]));CKEDITOR.plugins.scayt.suggestions=c});k.subscribe("selectionIsChanged",function(b){a.getSelection().isLocked&&"restoreSelection"!==b.action&&a.lockSelection();"restoreSelection"===b.action&&a.selectionChange(!0)});k.subscribe("graytStateChanged",function(d){b.state.grayt[a.name]=d.state});k.addMarkupHandler&&k.addMarkupHandler(function(b){var d=
a.editable(),e=d.getCustomData(b.charName);e&&(e.$=b.node,d.setCustomData(b.charName,e))});a.scayt=k;a.fire("scaytButtonState",a.readOnly?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_ON)}else b.state.scayt[a.name]=!1})},destroy:function(a){a.scayt&&a.scayt.destroy();delete a.scayt;a.fire("scaytButtonState",CKEDITOR.TRISTATE_OFF)},loadScaytLibrary:function(a,f){var b,c=function(){CKEDITOR.fireOnce("scaytReady");a.scayt||"function"===typeof f&&f(a)};"undefined"===typeof window.SCAYT||"function"!==typeof window.SCAYT.CKSCAYT?
(b=a.config.scayt_srcUrl,CKEDITOR.scriptLoader.load(b,function(a){a&&c()})):window.SCAYT&&"function"===typeof window.SCAYT.CKSCAYT&&c()}},CKEDITOR.on("dialogDefinition",function(a){var f=a.data.name;a=a.data.definition.dialog;"scaytDialog"!==f&&"checkspell"!==f&&(a.on("show",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!0)}),a.on("hide",function(a){a=a.sender&&a.sender.getParentEditor();var c=
CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!1)}));if("scaytDialog"===f)a.on("cancel",function(a){return!1},this,null,-1);if("checkspell"===f)a.on("cancel",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!1);a.unlockSelection()},this,null,-2);if("link"===f)a.on("ok",function(a){var c=a.sender&&a.sender.getParentEditor();c&&setTimeout(function(){c.fire("reloadMarkupScayt",
{removeOptions:{removeInside:!0,forceBookmark:!0},timeout:0})},0)});if("replace"===f)a.on("hide",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;a&&setTimeout(function(){d&&(d.fire("removeMarkupInDocument",{}),c.reloadMarkup(d))},0)})}),CKEDITOR.on("scaytReady",function(){if(!0===CKEDITOR.config.scayt_handleCheckDirty){var a=CKEDITOR.editor.prototype;a.checkDirty=CKEDITOR.tools.override(a.checkDirty,function(a){return function(){var c=null,d=this.scayt;if(CKEDITOR.plugins.scayt&&
CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt){if(c="ready"==this.status)var f=d.removeMarkupFromString(this.getSnapshot()),d=d.removeMarkupFromString(this._.previousValue),c=c&&d!==f}else c=a.call(this);return c}});a.resetDirty=CKEDITOR.tools.override(a.resetDirty,function(a){return function(){var c=this.scayt;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt?this._.previousValue=c.removeMarkupFromString(this.getSnapshot()):a.call(this)}})}if(!0===CKEDITOR.config.scayt_handleUndoRedo){var a=
CKEDITOR.plugins.undo.Image.prototype,f="function"==typeof a.equalsContent?"equalsContent":"equals";a[f]=CKEDITOR.tools.override(a[f],function(a){return function(c){var d=c.editor.scayt,f=this.contents,k=c.contents,g=null;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[c.editor.name]&&c.editor.scayt&&(this.contents=d.removeMarkupFromString(f)||"",c.contents=d.removeMarkupFromString(k)||"");g=a.apply(this,arguments);this.contents=f;c.contents=k;return g}})}}),function(){var a={preserveState:!0,
editorFocus:!1,readOnly:1,exec:function(a){this.toggleState();this.refresh(a)},refresh:function(a){if(a.document){var b=this.state==CKEDITOR.TRISTATE_ON?"attachClass":"removeClass";a.editable()[b]("cke_show_borders")}}};CKEDITOR.plugins.add("showborders",{modes:{wysiwyg:1},onLoad:function(){var a;a=(CKEDITOR.env.ie6Compat?[".%1 table.%2,",".%1 table.%2 td, .%1 table.%2 th","{","border : #d3d3d3 1px dotted","}"]:".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
"cke_show_border").replace(/%1/g,"cke_show_borders ");CKEDITOR.addCss(a)},init:function(f){var b=f.addCommand("showborders",a);b.canUndo=!1;!1!==f.config.startupShowBorders&&b.setState(CKEDITOR.TRISTATE_ON);f.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(f)},null,null,100);f.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(f)});f.on("removeFormatCleanup",function(a){a=a.data;f.getCommand("showborders").state==CKEDITOR.TRISTATE_ON&&a.is("table")&&(!a.hasAttribute("border")||
0>=parseInt(a.getAttribute("border"),10))&&a.addClass("cke_show_border")})},afterInit:function(a){var b=a.dataProcessor;a=b&&b.dataFilter;b=b&&b.htmlFilter;a&&a.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"],f=parseInt(a.border,10);f&&!(0>=f)||b&&-1!=b.indexOf("cke_show_border")||(a["class"]=(b||"")+" cke_show_border")}}});b&&b.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"];b&&(a["class"]=b.replace("cke_show_border","").replace(/\s{2}/," ").replace(/^\s+|\s+$/,
""))}}})}});CKEDITOR.on("dialogDefinition",function(a){var b=a.data.name;if("table"==b||"tableProperties"==b)if(a=a.data.definition,b=a.getContents("info").get("txtBorder"),b.commit=CKEDITOR.tools.override(b.commit,function(a){return function(b,f){a.apply(this,arguments);var k=parseInt(this.getValue(),10);f[!k||0>=k?"addClass":"removeClass"]("cke_show_border")}}),a=(a=a.getContents("advanced"))&&a.get("advCSSClasses"))a.setup=CKEDITOR.tools.override(a.setup,function(a){return function(){a.apply(this,
arguments);this.setValue(this.getValue().replace(/cke_show_border/,""))}}),a.commit=CKEDITOR.tools.override(a.commit,function(a){return function(b,f){a.apply(this,arguments);parseInt(f.getAttribute("border"),10)||f.addClass("cke_show_border")}})})}(),function(){CKEDITOR.plugins.add("sourcearea",{init:function(f){function b(){var a=d&&this.equals(CKEDITOR.document.getActive());this.hide();this.setStyle("height",this.getParent().$.clientHeight+"px");this.setStyle("width",this.getParent().$.clientWidth+
"px");this.show();a&&this.focus()}if(f.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var c=CKEDITOR.plugins.sourcearea;f.addMode("source",function(c){var d=f.ui.space("contents").getDocument().createElement("textarea");d.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?"99%":"100%",height:"100%",resize:"none",outline:"none","text-align":"left"},CKEDITOR.tools.cssVendorPrefix("tab-size",f.config.sourceAreaTabSize||4)));d.setAttribute("dir","ltr");d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
f.ui.space("contents").append(d);d=f.editable(new a(f,d));d.setData(f.getData(1));CKEDITOR.env.ie&&(d.attachListener(f,"resize",b,d),d.attachListener(CKEDITOR.document.getWindow(),"resize",b,d),CKEDITOR.tools.setTimeout(b,0,d));f.fire("ariaWidget",this);c()});f.addCommand("source",c.commands.source);f.ui.addButton&&f.ui.addButton("Source",{label:f.lang.sourcearea.toolbar,command:"source",toolbar:"mode,10"});f.on("mode",function(){f.getCommand("source").setState("source"==f.mode?CKEDITOR.TRISTATE_ON:
CKEDITOR.TRISTATE_OFF)});var d=CKEDITOR.env.ie&&9==CKEDITOR.env.version}}});var a=CKEDITOR.tools.createClass({base:CKEDITOR.editable,proto:{setData:function(a){this.setValue(a);this.status="ready";this.editor.fire("dataReady")},getData:function(){return this.getValue()},insertHtml:function(){},insertElement:function(){},insertText:function(){},setReadOnly:function(a){this[(a?"set":"remove")+"Attribute"]("readOnly","readonly")},detach:function(){a.baseProto.detach.call(this);this.clearCustomData();
this.remove()}}})}(),CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,source:1},editorFocus:!1,readOnly:1,exec:function(a){"wysiwyg"==a.mode&&a.fire("saveSnapshot");a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);a.setMode("source"==a.mode?"wysiwyg":"source")},canUndo:!1}}},CKEDITOR.plugins.add("specialchar",{availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-au":1,"en-ca":1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fr:1,"fr-ca":1,
gl:1,he:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},requires:"dialog",init:function(a){var f=this;CKEDITOR.dialog.add("specialchar",this.path+"dialogs/specialchar.js");a.addCommand("specialchar",{exec:function(){var b=a.langCode,b=f.availableLangs[b]?b:f.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path+
"dialogs/lang/"+b+".js"),function(){CKEDITOR.tools.extend(a.lang.specialchar,f.langEntries[b]);a.openDialog("specialchar")})},modes:{wysiwyg:1},canUndo:!1});a.ui.addButton&&a.ui.addButton("SpecialChar",{label:a.lang.specialchar.toolbar,command:"specialchar",toolbar:"insert,50"})}}),CKEDITOR.config.specialChars="! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
function(){CKEDITOR.plugins.add("stylescombo",{requires:"richcombo",init:function(a){var f=a.config,b=a.lang.stylescombo,c={},d=[],l=[];a.on("stylesSet",function(b){if(b=b.data.styles){for(var g,h,m,e=0,n=b.length;e<n;e++)(g=b[e],a.blockless&&g.element in CKEDITOR.dtd.$block||"string"==typeof g.type&&!CKEDITOR.style.customHandlers[g.type]||(h=g.name,g=new CKEDITOR.style(g),a.filter.customConfig&&!a.filter.check(g)))||(g._name=h,g._.enterMode=f.enterMode,g._.type=m=g.assignedTo||g.type,g._.weight=
e+1E3*(m==CKEDITOR.STYLE_OBJECT?1:m==CKEDITOR.STYLE_BLOCK?2:3),c[h]=g,d.push(g),l.push(g));d.sort(function(a,b){return a._.weight-b._.weight})}});a.ui.addRichCombo("Styles",{label:b.label,title:b.panelTitle,toolbar:"styles,10",allowedContent:l,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),multiSelect:!0,attributes:{"aria-label":b.panelTitle}},init:function(){var a,c,f,l,e,n;e=0;for(n=d.length;e<n;e++)a=d[e],c=a._name,l=a._.type,l!=f&&(this.startGroup(b["panelTitle"+String(l)]),
f=l),this.add(c,a.type==CKEDITOR.STYLE_OBJECT?c:a.buildPreview(),c);this.commit()},onClick:function(b){a.focus();a.fire("saveSnapshot");b=c[b];var d=a.elementPath();if(b.group&&b.removeStylesFromSameGroup(a))a.applyStyle(b);else a[b.checkActive(d,a)?"removeStyle":"applyStyle"](b);a.fire("saveSnapshot")},onRender:function(){a.on("selectionChange",function(b){var d=this.getValue();b=b.data.path.elements;for(var f=0,l=b.length,e;f<l;f++){e=b[f];for(var n in c)if(c[n].checkElementRemovable(e,!0,a)){n!=
d&&this.setValue(n);return}}this.setValue("")},this)},onOpen:function(){var d=a.getSelection(),d=d.getSelectedElement()||d.getStartElement()||a.editable(),d=a.elementPath(d),g=[0,0,0,0];this.showAll();this.unmarkAll();for(var f in c){var l=c[f],e=l._.type;l.checkApplicable(d,a,a.activeFilter)?g[e]++:this.hideItem(f);l.checkActive(d,a)&&this.mark(f)}g[CKEDITOR.STYLE_BLOCK]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_BLOCK)]);g[CKEDITOR.STYLE_INLINE]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_INLINE)]);
g[CKEDITOR.STYLE_OBJECT]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_OBJECT)])},refresh:function(){var b=a.elementPath();if(b){for(var d in c)if(c[d].checkApplicable(b,a,a.activeFilter))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}},reset:function(){c={};d=[]}})}})}(),function(){function a(a){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(b){if(b.editable().hasFocus){var c=b.getSelection(),g;if(g=(new CKEDITOR.dom.elementPath(c.getCommonAncestor(),c.root)).contains({td:1,
th:1},1)){var c=b.createRange(),f=CKEDITOR.tools.tryThese(function(){var b=g.getParent().$.cells[g.$.cellIndex+(a?-1:1)];b.parentNode.parentNode;return b},function(){var b=g.getParent(),b=b.getAscendant("table").$.rows[b.$.rowIndex+(a?-1:1)];return b.cells[a?b.cells.length-1:0]});if(f||a)if(f)f=new CKEDITOR.dom.element(f),c.moveToElementEditStart(f),c.checkStartOfBlock()&&c.checkEndOfBlock()||c.selectNodeContents(f);else return!0;else{for(var m=g.getAscendant("table").$,f=g.getParent().$.cells,m=
new CKEDITOR.dom.element(m.insertRow(-1),b.document),e=0,n=f.length;e<n;e++)m.append((new CKEDITOR.dom.element(f[e],b.document)).clone(!1,!1)).appendBogus();c.moveToElementEditStart(m)}c.select(!0);return!0}}return!1}}}var f={editorFocus:!1,modes:{wysiwyg:1,source:1}},b={exec:function(a){a.container.focusNext(!0,a.tabIndex)}},c={exec:function(a){a.container.focusPrevious(!0,a.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(d){for(var l=!1!==d.config.enableTabKeyTools,k=d.config.tabSpaces||0,
g="";k--;)g+=" ";if(g)d.on("key",function(a){9==a.data.keyCode&&(d.insertText(g),a.cancel())});if(l)d.on("key",function(a){(9==a.data.keyCode&&d.execCommand("selectNextCell")||a.data.keyCode==CKEDITOR.SHIFT+9&&d.execCommand("selectPreviousCell"))&&a.cancel()});d.addCommand("blur",CKEDITOR.tools.extend(b,f));d.addCommand("blurBack",CKEDITOR.tools.extend(c,f));d.addCommand("selectNextCell",a());d.addCommand("selectPreviousCell",a(!0))}})}(),CKEDITOR.dom.element.prototype.focusNext=function(a,f){var b=
void 0===f?this.getTabIndex():f,c,d,l,k,g,h;if(0>=b)for(g=this.getNextSourceNode(a,CKEDITOR.NODE_ELEMENT);g;){if(g.isVisible()&&0===g.getTabIndex()){l=g;break}g=g.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(g=this.getDocument().getBody().getFirst();g=g.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!d&&g.equals(this)){if(d=!0,a){if(!(g=g.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else d&&!this.contains(g)&&(c=1);if(g.isVisible()&&!(0>(h=g.getTabIndex()))){if(c&&h==b){l=
g;break}h>b&&(!l||!k||h<k)?(l=g,k=h):l||0!==h||(l=g,k=h)}}l&&l.focus()},CKEDITOR.dom.element.prototype.focusPrevious=function(a,f){for(var b=void 0===f?this.getTabIndex():f,c,d,l,k=0,g,h=this.getDocument().getBody().getLast();h=h.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!d&&h.equals(this)){if(d=!0,a){if(!(h=h.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else d&&!this.contains(h)&&(c=1);if(h.isVisible()&&!(0>(g=h.getTabIndex())))if(0>=b){if(c&&0===g){l=h;break}g>k&&
(l=h,k=g)}else{if(c&&g==b){l=h;break}g<b&&(!l||g>k)&&(l=h,k=g)}}l&&l.focus()},CKEDITOR.plugins.add("table",{requires:"dialog",init:function(a){function f(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}if(!a.blockless){var b=a.lang.table;a.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];"+
(a.plugins.dialogadvtab?"table"+a.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"],["td: splitBorderShorthand"],[{element:"table",right:function(a){if(a.styles){var b;if(a.styles.border)b=CKEDITOR.tools.style.parse.border(a.styles.border);else if(CKEDITOR.env.ie&&8===CKEDITOR.env.version){var f=a.styles;f["border-left"]&&f["border-left"]===f["border-right"]&&f["border-right"]===f["border-top"]&&
f["border-top"]===f["border-bottom"]&&(b=CKEDITOR.tools.style.parse.border(f["border-top"]))}b&&b.style&&"solid"===b.style&&b.width&&0!==parseFloat(b.width)&&(a.attributes.border=1);"collapse"==a.styles["border-collapse"]&&(a.attributes.cellspacing=0)}}}]]}));a.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",f()));a.addCommand("tableDelete",f({exec:function(a){var b=a.elementPath().contains("table",1);if(b){var f=b.getParent(),k=a.editable();1!=f.getChildCount()||f.is("td",
"th")||f.equals(k)||(b=f);a=a.createRange();a.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);b.remove();a.select()}}}));a.ui.addButton&&a.ui.addButton("Table",{label:b.toolbar,command:"table",toolbar:"insert,30"});CKEDITOR.dialog.add("table",this.path+"dialogs/table.js");CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js");a.addMenuItems&&a.addMenuItems({table:{label:b.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:b.deleteTable,command:"tableDelete",group:"table",
order:1}});a.on("doubleclick",function(a){a.data.element.is("table")&&(a.data.dialog="tableProperties")});a.contextMenu&&a.contextMenu.addListener(function(){return{tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF}})}}}),function(){function a(a,b){function c(a){return b?b.contains(a)&&a.getAscendant("table",!0).equals(b):!0}function d(a){0<e.length||a.type!=CKEDITOR.NODE_ELEMENT||!u.test(a.getName())||a.getCustomData("selected_cell")||(CKEDITOR.dom.element.setMarker(g,a,"selected_cell",
!0),e.push(a))}var e=[],g={};if(!a)return e;for(var f=a.getRanges(),h=0;h<f.length;h++){var k=f[h];if(k.collapsed)(k=k.getCommonAncestor().getAscendant({td:1,th:1},!0))&&c(k)&&e.push(k);else{var k=new CKEDITOR.dom.walker(k),l;for(k.guard=d;l=k.next();)l.type==CKEDITOR.NODE_ELEMENT&&l.is(CKEDITOR.dtd.table)||(l=l.getAscendant({td:1,th:1},!0))&&!l.getCustomData("selected_cell")&&c(l)&&(CKEDITOR.dom.element.setMarker(g,l,"selected_cell",!0),e.push(l))}}CKEDITOR.dom.element.clearAllMarkers(g);return e}
function f(b,c){for(var d=p(b)?b:a(b),e=d[0],g=e.getAscendant("table"),e=e.getDocument(),f=d[0].getParent(),h=f.$.rowIndex,d=d[d.length-1],k=d.getParent().$.rowIndex+d.$.rowSpan-1,d=new CKEDITOR.dom.element(g.$.rows[k]),h=c?h:k,f=c?f:d,d=CKEDITOR.tools.buildTableMap(g),g=d[h],h=c?d[h-1]:d[h+1],d=d[0].length,e=e.createElement("tr"),k=0;g[k]&&k<d;k++){var l;1<g[k].rowSpan&&h&&g[k]==h[k]?(l=g[k],l.rowSpan+=1):(l=(new CKEDITOR.dom.element(g[k])).clone(),l.removeAttribute("rowSpan"),l.appendBogus(),e.append(l),
l=l.$);k+=l.colSpan-1}c?e.insertBefore(f):e.insertAfter(f);return e}function b(c){if(c instanceof CKEDITOR.dom.selection){var d=c.getRanges(),e=a(c),g=e[0].getAscendant("table"),f=CKEDITOR.tools.buildTableMap(g),h=e[0].getParent().$.rowIndex,e=e[e.length-1],k=e.getParent().$.rowIndex+e.$.rowSpan-1,e=[];c.reset();for(c=h;c<=k;c++){for(var l=f[c],m=new CKEDITOR.dom.element(g.$.rows[c]),n=0;n<l.length;n++){var q=new CKEDITOR.dom.element(l[n]),p=q.getParent().$.rowIndex;1==q.$.rowSpan?q.remove():(--q.$.rowSpan,
p==c&&(p=f[c+1],p[n-1]?q.insertAfter(new CKEDITOR.dom.element(p[n-1])):(new CKEDITOR.dom.element(g.$.rows[c+1])).append(q,1)));n+=q.$.colSpan-1}e.push(m)}f=g.$.rows;d[0].moveToPosition(g,CKEDITOR.POSITION_BEFORE_START);h=new CKEDITOR.dom.element(f[k+1]||(0<h?f[h-1]:null)||g.$.parentNode);for(c=e.length;0<=c;c--)b(e[c]);return g.$.parentNode?h:(d[0].select(),null)}c instanceof CKEDITOR.dom.element&&(g=c.getAscendant("table"),1==g.$.rows.length?g.remove():c.remove());return null}function c(a){for(var b=
a.getParent().$.cells,c=0,d=0;d<b.length;d++){var e=b[d],c=c+e.colSpan;if(e==a.$)break}return c-1}function d(a,b){for(var d=b?Infinity:0,e=0;e<a.length;e++){var g=c(a[e]);if(b?g<d:g>d)d=g}return d}function l(b,c){for(var e=p(b)?b:a(b),g=e[0].getAscendant("table"),f=d(e,1),e=d(e),h=c?f:e,k=CKEDITOR.tools.buildTableMap(g),g=[],f=[],e=[],l=k.length,m=0;m<l;m++)g.push(k[m][h]),f.push(c?k[m][h-1]:k[m][h+1]);for(m=0;m<l;m++)g[m]&&(1<g[m].colSpan&&f[m]==g[m]?(k=g[m],k.colSpan+=1):(h=new CKEDITOR.dom.element(g[m]),
k=h.clone(),k.removeAttribute("colSpan"),k.appendBogus(),k[c?"insertBefore":"insertAfter"].call(k,h),e.push(k),k=k.$),m+=k.rowSpan-1);return e}function k(b){function c(a){var b,d,e;b=a.getRanges();if(1!==b.length)return a;b=b[0];if(b.collapsed||0!==b.endOffset)return a;d=b.endContainer;e=d.getName().toLowerCase();if("td"!==e&&"th"!==e)return a;for((e=d.getPrevious())||(e=d.getParent().getPrevious().getLast());e.type!==CKEDITOR.NODE_TEXT&&"br"!==e.getName().toLowerCase();)if(e=e.getLast(),!e)return a;
b.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);return b.select()}CKEDITOR.env.webkit&&!b.isFake&&(b=c(b));var d=b.getRanges(),e=a(b),g=e[0],f=e[e.length-1],e=g.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(e),k,l,m=[];b.reset();var n=0;for(b=h.length;n<b;n++)for(var q=0,p=h[n].length;q<p;q++)void 0===k&&h[n][q]==g.$&&(k=q),h[n][q]==f.$&&(l=q);for(n=k;n<=l;n++)for(q=0;q<h.length;q++)f=h[q],g=new CKEDITOR.dom.element(e.$.rows[q]),f=new CKEDITOR.dom.element(f[n]),f.$&&(1==f.$.colSpan?f.remove():--f.$.colSpan,
q+=f.$.rowSpan-1,g.$.cells.length||m.push(g));k=h[0].length-1>l?new CKEDITOR.dom.element(h[0][l+1]):k&&-1!==h[0][k-1].cellIndex?new CKEDITOR.dom.element(h[0][k-1]):new CKEDITOR.dom.element(e.$.parentNode);m.length==b&&(d[0].moveToPosition(e,CKEDITOR.POSITION_AFTER_END),d[0].select(),e.remove());return k}function g(a,b){var c=a.getStartElement().getAscendant({td:1,th:1},!0);if(c){var d=c.clone();d.appendBogus();b?d.insertBefore(c):d.insertAfter(c)}}function h(b){if(b instanceof CKEDITOR.dom.selection){var c=
b.getRanges(),d=a(b),e=d[0]&&d[0].getAscendant("table"),g;a:{var f=0;g=d.length-1;for(var k={},l,n;l=d[f++];)CKEDITOR.dom.element.setMarker(k,l,"delete_cell",!0);for(f=0;l=d[f++];)if((n=l.getPrevious())&&!n.getCustomData("delete_cell")||(n=l.getNext())&&!n.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(k);g=n;break a}CKEDITOR.dom.element.clearAllMarkers(k);f=d[0].getParent();(f=f.getPrevious())?g=f.getLast():(f=d[g].getParent(),g=(f=f.getNext())?f.getChild(0):null)}b.reset();for(b=
d.length-1;0<=b;b--)h(d[b]);g?m(g,!0):e&&(c[0].moveToPosition(e,CKEDITOR.POSITION_BEFORE_START),c[0].select(),e.remove())}else b instanceof CKEDITOR.dom.element&&(c=b.getParent(),1==c.getChildCount()?c.remove():b.remove())}function m(a,b){var c=a.getDocument(),d=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(d.focus(),c.focus());c=new CKEDITOR.dom.range(c);c["moveToElementEdit"+(b?"End":"Start")](a)||(c.selectNodeContents(a),c.collapse(b?!1:!0));c.select(!0)}function e(a,b,c){a=a[b];
if("undefined"==typeof c)return a;for(b=0;a&&b<a.length;b++){if(c.is&&a[b]==c.$)return b;if(b==c)return new CKEDITOR.dom.element(a[b])}return c.is?-1:null}function n(b,c,d){var g=a(b),f;if((c?1!=g.length:2>g.length)||(f=b.getCommonAncestor())&&f.type==CKEDITOR.NODE_ELEMENT&&f.is("table"))return!1;var h;b=g[0];f=b.getAscendant("table");var k=CKEDITOR.tools.buildTableMap(f),l=k.length,m=k[0].length,n=b.getParent().$.rowIndex,q=e(k,n,b);if(c){var p;try{var u=parseInt(b.getAttribute("rowspan"),10)||1;
h=parseInt(b.getAttribute("colspan"),10)||1;p=k["up"==c?n-u:"down"==c?n+u:n]["left"==c?q-h:"right"==c?q+h:q]}catch(y){return!1}if(!p||b.$==p)return!1;g["up"==c||"left"==c?"unshift":"push"](new CKEDITOR.dom.element(p))}c=b.getDocument();var L=n,u=p=0,G=!d&&new CKEDITOR.dom.documentFragment(c),D=0;for(c=0;c<g.length;c++){h=g[c];var N=h.getParent(),Q=h.getFirst(),O=h.$.colSpan,K=h.$.rowSpan,N=N.$.rowIndex,W=e(k,N,h),D=D+O*K,u=Math.max(u,W-q+O);p=Math.max(p,N-n+K);d||(O=h,(K=O.getBogus())&&K.remove(),
O.trim(),h.getChildren().count()&&(N==L||!Q||Q.isBlockBoundary&&Q.isBlockBoundary({br:1})||(L=G.getLast(CKEDITOR.dom.walker.whitespaces(!0)),!L||L.is&&L.is("br")||G.append("br")),h.moveChildren(G)),c?h.remove():h.setHtml(""));L=N}if(d)return p*u==D;G.moveChildren(b);b.appendBogus();u>=m?b.removeAttribute("rowSpan"):b.$.rowSpan=p;p>=l?b.removeAttribute("colSpan"):b.$.colSpan=u;d=new CKEDITOR.dom.nodeList(f.$.rows);g=d.count();for(c=g-1;0<=c;c--)f=d.getItem(c),f.$.cells.length||(f.remove(),g++);return b}
function q(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],g=d.getParent(),f=g.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(f),k=g.$.rowIndex,l=e(h,k,d),m=d.$.rowSpan,n;if(1<m){n=Math.ceil(m/2);for(var m=Math.floor(m/2),g=k+n,f=new CKEDITOR.dom.element(f.$.rows[g]),h=e(h,g),q,g=d.clone(),k=0;k<h.length;k++)if(q=h[k],q.parentNode==f.$&&k>l){g.insertBefore(new CKEDITOR.dom.element(q));break}else q=null;q||f.append(g)}else for(m=n=1,f=g.clone(),f.insertAfter(g),f.append(g=d.clone()),
q=e(h,k),l=0;l<q.length;l++)q[l].rowSpan++;g.appendBogus();d.$.rowSpan=n;g.$.rowSpan=m;1==n&&d.removeAttribute("rowSpan");1==m&&g.removeAttribute("rowSpan");return g}function y(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],g=d.getParent(),f=g.getAscendant("table"),f=CKEDITOR.tools.buildTableMap(f),h=e(f,g.$.rowIndex,d),k=d.$.colSpan;if(1<k)g=Math.ceil(k/2),k=Math.floor(k/2);else{for(var k=g=1,l=[],m=0;m<f.length;m++){var n=f[m];l.push(n[h]);1<n[h].rowSpan&&(m+=n[h].rowSpan-1)}for(f=
0;f<l.length;f++)l[f].colSpan++}f=d.clone();f.insertAfter(d);f.appendBogus();d.$.colSpan=g;f.$.colSpan=k;1==g&&d.removeAttribute("colSpan");1==k&&f.removeAttribute("colSpan");return f}var u=/^(?:td|th)$/,p=CKEDITOR.tools.isArray;CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(c){function d(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains({td:1,th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}function e(a,
b){var d=c.addCommand(a,b);c.addFeature(d)}var p=c.lang.table,u=CKEDITOR.tools.style.parse,x="td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" ");e("cellProperties",new CKEDITOR.dialogCommand("cellProperties",d({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",requiredContent:x,contentTransformations:[[{element:"td",left:function(a){return a.styles.background&&
u.background(a.styles.background).color},right:function(a){a.styles["background-color"]=u.background(a.styles.background).color}},{element:"td",check:"td{vertical-align}",left:function(a){return a.attributes&&a.attributes.valign},right:function(a){a.styles["vertical-align"]=a.attributes.valign;delete a.attributes.valign}}],[{element:"tr",check:"td{height}",left:function(a){return a.styles&&a.styles.height},right:function(a){CKEDITOR.tools.array.forEach(a.children,function(b){b.name in{td:1,th:1}&&
(b.attributes["cke-row-height"]=a.styles.height)});delete a.styles.height}}],[{element:"td",check:"td{height}",left:function(a){return(a=a.attributes)&&a["cke-row-height"]},right:function(a){a.styles.height=a.attributes["cke-row-height"];delete a.attributes["cke-row-height"]}}]]})));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");e("rowDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();(a=b(a))&&m(a)}}));e("rowInsertBefore",d({requiredContent:"table",exec:function(b){b=
b.getSelection();b=a(b);f(b,!0)}}));e("rowInsertAfter",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);f(b)}}));e("columnDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();(a=k(a))&&m(a,!0)}}));e("columnInsertBefore",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);l(b,!0)}}));e("columnInsertAfter",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);l(b)}}));e("cellDelete",d({requiredContent:"table",exec:function(a){a=
a.getSelection();h(a)}}));e("cellMerge",d({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(a,b){b.cell=n(a.getSelection());m(b.cell,!0)}}));e("cellMergeRight",d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a,b){b.cell=n(a.getSelection(),"right");m(b.cell,!0)}}));e("cellMergeDown",d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a,b){b.cell=n(a.getSelection(),"down");m(b.cell,!0)}}));e("cellVerticalSplit",
d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){m(y(a.getSelection()))}}));e("cellHorizontalSplit",d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){m(q(a.getSelection()))}}));e("cellInsertBefore",d({requiredContent:"table",exec:function(a){a=a.getSelection();g(a,!0)}}));e("cellInsertAfter",d({requiredContent:"table",exec:function(a){a=a.getSelection();g(a)}}));c.addMenuItems&&c.addMenuItems({tablecell:{label:p.cell.menu,group:"tablecell",
order:1,getItems:function(){var b=c.getSelection(),d=a(b),b={tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:n(b,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:n(b,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:n(b,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:y(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,
tablecell_split_horizontal:q(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};c.filter.check(x)&&(b.tablecell_properties=0<d.length?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);return b}},tablecell_insertBefore:{label:p.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:p.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:p.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:p.cell.merge,
group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:p.cell.mergeRight,group:"tablecell",command:"cellMergeRight",order:17},tablecell_merge_down:{label:p.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:p.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:p.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:p.cell.title,
group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:p.row.menu,group:"tablerow",order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:p.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:p.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:p.row.deleteRow,
group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:p.column.menu,group:"tablecolumn",order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:p.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:p.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:p.column.deleteColumn,
group:"tablecolumn",command:"columnDelete",order:15}});c.contextMenu&&c.contextMenu.addListener(function(a,b,c){return(a=c.contains({td:1,th:1},1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null})},getCellColIndex:c,insertRow:f,insertColumn:l,getSelectedCells:a};CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)}(),CKEDITOR.tools.buildTableMap=function(a,f,b,c,d){a=a.$.rows;b=b||0;c="number"===typeof c?c:a.length-
1;d="number"===typeof d?d:-1;var l=-1,k=[];for(f=f||0;f<=c;f++){l++;!k[l]&&(k[l]=[]);for(var g=-1,h=b;h<=(-1===d?a[f].cells.length-1:d);h++){var m=a[f].cells[h];if(!m)break;for(g++;k[l][g];)g++;for(var e=isNaN(m.colSpan)?1:m.colSpan,m=isNaN(m.rowSpan)?1:m.rowSpan,n=0;n<m&&!(f+n>c);n++){k[l+n]||(k[l+n]=[]);for(var q=0;q<e;q++)k[l+n][g+q]=a[f].cells[h]}g+=e-1;if(-1!==d&&g>=d)break}}return k},function(){function a(a){return CKEDITOR.plugins.widget&&CKEDITOR.plugins.widget.isDomWidget(a)}function f(a,
b){var c=a.getAscendant("table"),d=b.getAscendant("table"),e=CKEDITOR.tools.buildTableMap(c),g=m(a),f=m(b),h=[],k={},l,n;c.contains(d)&&(b=b.getAscendant({td:1,th:1}),f=m(b));g>f&&(c=g,g=f,f=c,c=a,a=b,b=c);for(c=0;c<e[g].length;c++)if(a.$===e[g][c]){l=c;break}for(c=0;c<e[f].length;c++)if(b.$===e[f][c]){n=c;break}l>n&&(c=l,l=n,n=c);for(c=g;c<=f;c++)for(g=l;g<=n;g++)d=new CKEDITOR.dom.element(e[c][g]),d.$&&!d.getCustomData("selected_cell")&&(h.push(d),CKEDITOR.dom.element.setMarker(k,d,"selected_cell",
!0));CKEDITOR.dom.element.clearAllMarkers(k);return h}function b(a){if(a)return a=a.clone(),a.enlarge(CKEDITOR.ENLARGE_ELEMENT),(a=a.getEnclosedNode())&&a.is&&a.is(CKEDITOR.dtd.$tableContent)}function c(a){return(a=a.editable().findOne(".cke_table-faked-selection"))&&a.getAscendant("table")}function d(a,b){var c=a.editable().find(".cke_table-faked-selection"),d=a.editable().findOne("[data-cke-table-faked-selection-table]"),e;a.fire("lockSnapshot");a.editable().removeClass("cke_table-faked-selection-editor");
for(e=0;e<c.count();e++)c.getItem(e).removeClass("cke_table-faked-selection");d&&d.data("cke-table-faked-selection-table",!1);a.fire("unlockSnapshot");b&&(v={active:!1},a.getSelection().isInTable()&&a.getSelection().reset())}function l(a,b){var c=[],d,e;for(e=0;e<b.length;e++)d=a.createRange(),d.setStartBefore(b[e]),d.setEndAfter(b[e]),c.push(d);a.getSelection().selectRanges(c)}function k(a){var b=a.editable().find(".cke_table-faked-selection");1>b.count()||(b=f(b.getItem(0),b.getItem(b.count()-1)),
l(a,b))}function g(b,c,e){var g=r(b.getSelection(!0));c=c.is("table")?null:c;var h;(h=v.active&&!v.first)&&!(h=c)&&(h=b.getSelection().getRanges(),h=1<g.length||h[0]&&!h[0].collapsed?!0:!1);if(h)v.first=c||g[0],v.dirty=c?!1:1!==g.length;else if(v.active&&c&&v.first.getAscendant("table").equals(c.getAscendant("table"))){g=f(v.first,c);if(!v.dirty&&1===g.length&&!a(e.data.getTarget()))return d(b,"mouseup"===e.name);v.dirty=!0;v.last=c;l(b,g)}}function h(a){var b=(a=a.editor||a.sender.editor)&&a.getSelection(),
c=b&&b.getRanges()||[],e=c&&c[0].getEnclosedNode(),e=e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is("img"),g;if(b&&(d(a),b.isInTable()&&b.isFake))if(e)a.getSelection().reset();else if(!c[0]._getTableElement({table:1}).hasAttribute("data-cke-tableselection-ignored")){1===c.length&&c[0]._getTableElement()&&c[0]._getTableElement().is("table")&&(g=c[0]._getTableElement());g=r(b,g);a.fire("lockSnapshot");for(b=0;b<g.length;b++)g[b].addClass("cke_table-faked-selection");0<g.length&&(a.editable().addClass("cke_table-faked-selection-editor"),
g[0].getAscendant("table").data("cke-table-faked-selection-table",""));a.fire("unlockSnapshot")}}function m(a){return a.getAscendant("tr",!0).$.rowIndex}function e(b){function f(a,b){return a&&b?a.equals(b)||a.contains(b)||b.contains(a)||a.getCommonAncestor(b).is(r):!1}function h(a){return!a.getAscendant("table",!0)&&a.getDocument().equals(m.document)}function l(a,b,c,d){if("mousedown"===a.name&&(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT||!d))return!0;if(b=a.name===(CKEDITOR.env.gecko?
"mousedown":"mouseup")&&!h(a.data.getTarget()))a=a.data.getTarget().getAscendant({td:1,th:1},!0),b=!(a&&a.hasClass("cke_table-faked-selection"));return b}if(b.data.getTarget().getName&&("mouseup"===b.name||!a(b.data.getTarget()))){var m=b.editor||b.listenerData.editor,n=m.getSelection(1),q=c(m),p=b.data.getTarget(),u=p&&p.getAscendant({td:1,th:1},!0),p=p&&p.getAscendant("table",!0),r={table:1,thead:1,tbody:1,tfoot:1,tr:1,td:1,th:1};p&&p.hasAttribute("data-cke-tableselection-ignored")||(l(b,n,q,p)&&
d(m,!0),!v.active&&"mousedown"===b.name&&CKEDITOR.tools.getMouseButton(b)===CKEDITOR.MOUSE_BUTTON_LEFT&&p&&(v={active:!0},CKEDITOR.document.on("mouseup",e,null,{editor:m})),(u||p)&&g(m,u||p,b),"mouseup"===b.name&&(CKEDITOR.tools.getMouseButton(b)===CKEDITOR.MOUSE_BUTTON_LEFT&&(h(b.data.getTarget())||f(q,p))&&k(m),v={active:!1},CKEDITOR.document.removeListener("mouseup",e)))}}function n(a){var b=a.data.getTarget().getAscendant("table",!0);b&&b.hasAttribute("data-cke-tableselection-ignored")||(b=a.data.getTarget().getAscendant({td:1,
th:1},!0))&&!b.hasClass("cke_table-faked-selection")&&(a.cancel(),a.data.preventDefault())}function q(a,b){function c(a){a.cancel()}var d=a.getSelection(),e=d.createBookmarks(),g=a.document,f=a.createRange(),h=g.getDocumentElement().$,k=CKEDITOR.env.ie&&9>CKEDITOR.env.version,l=a.blockless||CKEDITOR.env.ie?"span":"div",m,n,p,q;g.getById("cke_table_copybin")||(m=g.createElement(l),n=g.createElement(l),n.setAttributes({id:"cke_table_copybin","data-cke-temp":"1"}),m.setStyles({position:"absolute",width:"1px",
height:"1px",overflow:"hidden"}),m.setStyle("ltr"==a.config.contentsLangDirection?"left":"right","-5000px"),m.setHtml(a.getSelectedHtml(!0)),a.fire("lockSnapshot"),n.append(m),a.editable().append(n),q=a.on("selectionChange",c,null,null,0),k&&(p=h.scrollTop),f.selectNodeContents(m),f.select(),k&&(h.scrollTop=p),setTimeout(function(){n.remove();d.selectBookmarks(e);q.removeListener();a.fire("unlockSnapshot");b&&(a.extractSelectedHtml(),a.fire("saveSnapshot"))},100))}function y(a){var b=a.editor||a.sender.editor,
c=b.getSelection();c.isInTable()&&(c.getRanges()[0]._getTableElement({table:1}).hasAttribute("data-cke-tableselection-ignored")||q(b,"cut"===a.name))}function u(a){this._reset();a&&this.setSelectedCells(a)}function p(a,b,c){a.on("beforeCommandExec",function(c){-1!==CKEDITOR.tools.array.indexOf(b,c.data.name)&&(c.data.selectedCells=r(a.getSelection()))});a.on("afterCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&c(a,d.data)})}var v={active:!1},w,r,z,t,x;u.prototype={};u.prototype._reset=
function(){this.cells={first:null,last:null,all:[]};this.rows={first:null,last:null}};u.prototype.setSelectedCells=function(a){this._reset();a=a.slice(0);this._arraySortByDOMOrder(a);this.cells.all=a;this.cells.first=a[0];this.cells.last=a[a.length-1];this.rows.first=a[0].getAscendant("tr");this.rows.last=this.cells.last.getAscendant("tr")};u.prototype.getTableMap=function(){var a=z(this.cells.first),b;a:{b=this.cells.last;var c=b.getAscendant("table"),d=m(b),c=CKEDITOR.tools.buildTableMap(c),e;for(e=
0;e<c[d].length;e++)if((new CKEDITOR.dom.element(c[d][e])).equals(b)){b=e;break a}b=void 0}return CKEDITOR.tools.buildTableMap(this._getTable(),m(this.rows.first),a,m(this.rows.last),b)};u.prototype._getTable=function(){return this.rows.first.getAscendant("table")};u.prototype.insertRow=function(a,b,c){if("undefined"===typeof a)a=1;else if(0>=a)return;for(var d=this.cells.first.$.cellIndex,e=this.cells.last.$.cellIndex,g=c?[]:this.cells.all,f,h=0;h<a;h++)f=t(c?this.cells.all:g,b),f=CKEDITOR.tools.array.filter(f.find("td, th").toArray(),
function(a){return c?!0:a.$.cellIndex>=d&&a.$.cellIndex<=e}),g=b?f.concat(g):g.concat(f);this.setSelectedCells(g)};u.prototype.insertColumn=function(a){function b(a){a=m(a);return a>=e&&a<=g}if("undefined"===typeof a)a=1;else if(0>=a)return;for(var c=this.cells,d=c.all,e=m(c.first),g=m(c.last),c=0;c<a;c++)d=d.concat(CKEDITOR.tools.array.filter(x(d),b));this.setSelectedCells(d)};u.prototype.emptyCells=function(a){a=a||this.cells.all;for(var b=0;b<a.length;b++)a[b].setHtml("")};u.prototype._arraySortByDOMOrder=
function(a){a.sort(function(a,b){return a.getPosition(b)&CKEDITOR.POSITION_PRECEDING?-1:1})};var A={onPaste:function(a){function c(a){return Math.max.apply(null,CKEDITOR.tools.array.map(a,function(a){return a.length},0))}function d(a){var b=e.createRange();b.selectNodeContents(a);b.select()}var e=a.editor,g=e.getSelection(),h=g.getRanges(),h=h.length&&h[0]._getTableElement({table:1});if(!h||!h.hasAttribute("data-cke-tableselection-ignored")){var k=r(g),h=this.findTableInPastedContent(e,a.data.dataValue),
m=g.isInTable(!0)&&this.isBoundarySelection(g),n,p;!k.length||1===k.length&&!b(g.getRanges()[0])&&!m||m&&!h||(k=k[0].getAscendant("table"),n=new u(r(g,k)),e.once("afterPaste",function(){var a;if(p){a=new CKEDITOR.dom.element(p[0][0]);var b=p[p.length-1];a=f(a,new CKEDITOR.dom.element(b[b.length-1]))}else a=n.cells.all;l(e,a)}),h?(a.stop(),m?(n.insertRow(1,1===m,!0),g.selectElement(n.rows.first)):(n.emptyCells(),l(e,n.cells.all)),a=n.getTableMap(),p=CKEDITOR.tools.buildTableMap(h),n.insertRow(p.length-
a.length),n.insertColumn(c(p)-c(a)),a=n.getTableMap(),this.pasteTable(n,a,p),e.fire("saveSnapshot"),setTimeout(function(){e.fire("afterPaste")},0)):(d(n.cells.first),e.once("afterPaste",function(){e.fire("lockSnapshot");n.emptyCells(n.cells.all.slice(1));l(e,n.cells.all);e.fire("unlockSnapshot")})))}},isBoundarySelection:function(a){a=a.getRanges()[0];var b=a.endContainer.getAscendant("tr",!0);if(b&&a.collapsed){if(a.checkBoundaryOfElement(b,CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b,
CKEDITOR.END))return 2}return 0},findTableInPastedContent:function(a,b){var c=a.dataProcessor,d=new CKEDITOR.dom.element("body");c||(c=new CKEDITOR.htmlDataProcessor(a));d.setHtml(c.toHtml(b),{fixForBody:!1});return 1<d.getChildCount()?null:d.findOne("table")},pasteTable:function(a,b,c){var d,e=z(a.cells.first),g=a._getTable(),f={},h,k,l,m;for(l=0;l<c.length;l++)for(h=new CKEDITOR.dom.element(g.$.rows[a.rows.first.$.rowIndex+l]),m=0;m<c[l].length;m++)if(k=new CKEDITOR.dom.element(c[l][m]),d=b[l]&&
b[l][m]?new CKEDITOR.dom.element(b[l][m]):null,k&&!k.getCustomData("processed")){if(d&&d.getParent())k.replace(d);else if(0===m||c[l][m-1])(d=0!==m?new CKEDITOR.dom.element(c[l][m-1]):null)&&h.equals(d.getParent())?k.insertAfter(d):0<e?h.$.cells[e]?k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])):h.append(k):h.append(k,!0);CKEDITOR.dom.element.setMarker(f,k,"processed",!0)}else k.getCustomData("processed")&&d&&d.remove();CKEDITOR.dom.element.clearAllMarkers(f)}};CKEDITOR.plugins.tableselection=
{getCellsBetween:f,keyboardIntegration:function(a){function b(a){var c=a.getEnclosedNode();c&&"function"===typeof c.is&&c.is({td:1,th:1})?c.setText(""):a.deleteContents();CKEDITOR.tools.array.forEach(a._find("td"),function(a){a.appendBogus()})}var c=a.editable();c.attachListener(c,"keydown",function(a){function c(b,d){if(!d.length)return null;var g=a.createRange(),f=CKEDITOR.dom.range.mergeRanges(d);CKEDITOR.tools.array.forEach(f,function(a){a.enlarge(CKEDITOR.ENLARGE_ELEMENT)});var h=f[0].getBoundaryNodes(),
k=h.startNode,h=h.endNode;if(k&&k.is&&k.is(e)){for(var l=k.getAscendant("table",!0),m=k.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,l),n=!1,p=function(a){return!k.contains(a)&&a.is&&a.is("td","th")};m&&!p(m);)m=m.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,l);!m&&h&&h.is&&!h.is("table")&&h.getNext()&&(m=h.getNext().findOne("td, th"),n=!0);if(m)g["moveToElementEdit"+(n?"Start":"End")](m);else g.setStartBefore(k.getAscendant("table",!0)),g.collapse(!0);f[0].deleteContents();return[g]}if(k)return g.moveToElementEditablePosition(k),
[g]}var d={37:1,38:1,39:1,40:1,8:1,46:1,13:1},e=CKEDITOR.tools.extend({table:1},CKEDITOR.dtd.$tableContent);delete e.td;delete e.th;return function(e){var g=e.data.getKey(),f=e.data.getKeystroke(),h,k=37===g||38==g,l,m,n;if(d[g]&&!a.readOnly&&(h=a.getSelection())&&h.isInTable()&&h.isFake){l=h.getRanges();m=l[0]._getTableElement();n=l[l.length-1]._getTableElement();if(13!==g||a.plugins.enterkey)e.data.preventDefault(),e.cancel();if(36<g&&41>g)l[0].moveToElementEditablePosition(k?m:n,!k),h.selectRanges([l[0]]);
else if(13!==g||13===f||f===CKEDITOR.SHIFT+13){for(e=0;e<l.length;e++)b(l[e]);(e=c(m,l))?l=e:l[0].moveToElementEditablePosition(m);h.selectRanges(l);13===g&&a.plugins.enterkey?(a.fire("lockSnapshot"),13===f?a.execCommand("enter"):a.execCommand("shiftEnter"),a.fire("unlockSnapshot"),a.fire("saveSnapshot")):13!==g&&a.fire("saveSnapshot")}}}}(a),null,null,-1);c.attachListener(c,"keypress",function(c){var d=a.getSelection(),e=c.data.$.charCode||13===c.data.getKey(),g;if(!a.readOnly&&d&&d.isInTable()&&
d.isFake&&e&&!(c.data.getKeystroke()&CKEDITOR.CTRL)){c=d.getRanges();e=c[0].getEnclosedNode().getAscendant({td:1,th:1},!0);for(g=0;g<c.length;g++)b(c[g]);e&&(c[0].moveToElementEditablePosition(e),d.selectRanges([c[0]]))}},null,null,-1)}};CKEDITOR.plugins.add("tableselection",{requires:"clipboard,tabletools",isSupportedEnvironment:function(){return!(CKEDITOR.env.ie&&11>CKEDITOR.env.version)},onLoad:function(){w=CKEDITOR.plugins.tabletools;r=w.getSelectedCells;z=w.getCellColIndex;t=w.insertRow;x=w.insertColumn;
CKEDITOR.document.appendStyleSheet(this.path+"styles/tableselection.css")},init:function(a){this.isSupportedEnvironment()&&(a.addContentsCss&&a.addContentsCss(this.path+"styles/tableselection.css"),a.on("contentDom",function(){var b=a.editable(),c=b.isInline()?b:a.document,d={editor:a};b.attachListener(c,"mousedown",e,null,d);b.attachListener(c,"mousemove",e,null,d);b.attachListener(c,"mouseup",e,null,d);b.attachListener(b,"dragstart",n);b.attachListener(a,"selectionCheck",h);CKEDITOR.plugins.tableselection.keyboardIntegration(a);
CKEDITOR.plugins.clipboard&&!CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(b.attachListener(b,"cut",y),b.attachListener(b,"copy",y))}),a.on("paste",A.onPaste,A),p(a,"rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "),function(a,b){l(a,b.selectedCells)}),p(a,["cellMerge","cellMergeRight","cellMergeDown"],function(a,b){l(a,[b.commandData.cell])}),p(a,["cellDelete"],function(a){d(a,!0)}))}})}(),"use strict",function(){var a=[CKEDITOR.CTRL+
90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],f={8:1,46:1};CKEDITOR.plugins.add("undo",{init:function(c){function d(a){e.enabled&&!1!==a.data.command.canUndo&&e.save()}function f(){e.enabled=c.readOnly?!1:"wysiwyg"==c.mode;e.onChange()}var e=c.undoManager=new b(c),k=e.editingHandler=new l(e),q=c.addCommand("undo",{exec:function(){e.undo()&&(c.selectionChange(),this.fire("afterUndo"))},startDisabled:!0,canUndo:!1}),y=c.addCommand("redo",{exec:function(){e.redo()&&(c.selectionChange(),this.fire("afterRedo"))},
startDisabled:!0,canUndo:!1});c.setKeystroke([[a[0],"undo"],[a[1],"redo"],[a[2],"redo"]]);e.onChange=function(){q.setState(e.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);y.setState(e.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)};c.on("beforeCommandExec",d);c.on("afterCommandExec",d);c.on("saveSnapshot",function(a){e.save(a.data&&a.data.contentOnly)});c.on("contentDom",k.attachListeners,k);c.on("instanceReady",function(){c.fire("saveSnapshot")});c.on("beforeModeUnload",
function(){"wysiwyg"==c.mode&&e.save(!0)});c.on("mode",f);c.on("readOnly",f);c.ui.addButton&&(c.ui.addButton("Undo",{label:c.lang.undo.undo,command:"undo",toolbar:"undo,10"}),c.ui.addButton("Redo",{label:c.lang.undo.redo,command:"redo",toolbar:"undo,20"}));c.resetUndo=function(){e.reset();c.fire("saveSnapshot")};c.on("updateSnapshot",function(){e.currentImage&&e.update()});c.on("lockSnapshot",function(a){a=a.data;e.lock(a&&a.dontUpdate,a&&a.forceUpdate)});c.on("unlockSnapshot",e.unlock,e)}});CKEDITOR.plugins.undo=
{};var b=CKEDITOR.plugins.undo.UndoManager=function(a){this.strokesRecorded=[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this.editor=a;this.reset()};b.prototype={type:function(a,c){var d=b.getKeyGroup(a),e=this.strokesRecorded[d]+1;c=c||e>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0,this.hasRedo=!1,this.onChange());c?(e=0,this.editor.fire("saveSnapshot")):this.editor.fire("change");this.strokesRecorded[d]=e;this.previousKeyGroup=
d},keyGroupChanged:function(a){return b.getKeyGroup(a)!=this.previousKeyGroup},reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType()},resetType:function(){this.strokesRecorded=[0,0];this.typing=!1;this.previousKeyGroup=-1},refreshState:function(){this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange()},save:function(a,b,d){var e=this.editor;if(this.locked||"ready"!=e.status||
"wysiwyg"!=e.mode)return!1;var f=e.editable();if(!f||"ready"!=f.status)return!1;f=this.snapshots;b||(b=new c(e));if(!1===b.contents)return!1;if(this.currentImage)if(b.equalsContent(this.currentImage)){if(a||b.equalsSelection(this.currentImage))return!1}else!1!==d&&e.fire("change");f.splice(this.index+1,f.length-this.index-1);f.length==this.limit&&f.shift();this.index=f.push(b)-1;this.currentImage=b;!1!==d&&this.refreshState();return!0},restoreImage:function(a){var b=this.editor,c;a.bookmarks&&(b.focus(),
c=b.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);a.bookmarks?c.selectBookmarks(a.bookmarks):CKEDITOR.env.ie&&(c=this.editor.document.getBody().$.createTextRange(),c.collapse(!0),c.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();b.fire("change")},getNextImage:function(a){var b=this.snapshots,c=this.currentImage,d;if(c)if(a)for(d=this.index-1;0<=d;d--){if(a=b[d],!c.equalsContent(a))return a.index=
d,a}else for(d=this.index+1;d<b.length;d++)if(a=b[d],!c.equalsContent(a))return a.index=d,a;return null},redoable:function(){return this.enabled&&this.hasRedo},undoable:function(){return this.enabled&&this.hasUndo},undo:function(){if(this.undoable()){this.save(!0);var a=this.getNextImage(!0);if(a)return this.restoreImage(a),!0}return!1},redo:function(){if(this.redoable()&&(this.save(!0),this.redoable())){var a=this.getNextImage(!1);if(a)return this.restoreImage(a),!0}return!1},update:function(a){if(!this.locked){a||
(a=new c(this.editor));for(var b=this.index,d=this.snapshots;0<b&&this.currentImage.equalsContent(d[b-1]);)--b;d.splice(b,this.index-b+1,a);this.index=b;this.currentImage=a}},updateSelection:function(a){if(!this.snapshots.length)return!1;var b=this.snapshots,c=b[b.length-1];return c.equalsContent(a)&&!c.equalsSelection(a)?(this.currentImage=b[b.length-1]=a,!0):!1},lock:function(a,b){if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{var d=null;if(b)d=!0;else{var e=new c(this.editor,
!0);this.currentImage&&this.currentImage.equalsContent(e)&&(d=e)}this.locked={update:d,level:1}}},unlock:function(){if(this.locked&&!--this.locked.level){var a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){var b=new c(this.editor,!0);a.equalsContent(b)||this.update()}}}};b.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};b.keyGroups={PRINTABLE:0,FUNCTIONAL:1};b.isNavigationKey=function(a){return!!b.navigationKeyCodes[a]};b.getKeyGroup=function(a){var c=b.keyGroups;
return f[a]?c.FUNCTIONAL:c.PRINTABLE};b.getOppositeKeyGroup=function(a){var c=b.keyGroups;return a==c.FUNCTIONAL?c.PRINTABLE:c.FUNCTIONAL};b.ieFunctionalKeysBug=function(a){return CKEDITOR.env.ie&&b.getKeyGroup(a)==b.keyGroups.FUNCTIONAL};var c=CKEDITOR.plugins.undo.Image=function(a,b){this.editor=a;a.fire("beforeUndoImage");var c=a.getSnapshot();CKEDITOR.env.ie&&c&&(c=c.replace(/\s+data-cke-expando=".*?"/g,""));this.contents=c;b||(this.bookmarks=(c=c&&a.getSelection())&&c.createBookmarks2(!0));a.fire("afterUndoImage")},
d=/\b(?:href|src|name)="[^"]*?"/gi;c.prototype={equalsContent:function(a){var b=this.contents;a=a.contents;CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(b=b.replace(d,""),a=a.replace(d,""));return b!=a?!1:!0},equalsSelection:function(a){var b=this.bookmarks;a=a.bookmarks;if(b||a){if(!b||!a||b.length!=a.length)return!1;for(var c=0;c<b.length;c++){var d=b[c],f=a[c];if(d.startOffset!=f.startOffset||d.endOffset!=f.endOffset||!CKEDITOR.tools.arrayCompare(d.start,f.start)||!CKEDITOR.tools.arrayCompare(d.end,
f.end))return!1}}return!0}};var l=CKEDITOR.plugins.undo.NativeEditingHandler=function(a){this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new k;this.lastKeydownImage=null};l.prototype={onKeydown:function(d){var f=d.data.getKey();if(229!==f)if(-1<CKEDITOR.tools.indexOf(a,d.data.getKeystroke()))d.data.preventDefault();else if(this.keyEventsStack.cleanUp(d),d=this.undoManager,this.keyEventsStack.getLast(f)||this.keyEventsStack.push(f),this.lastKeydownImage=new c(d.editor),b.isNavigationKey(f)||
this.undoManager.keyGroupChanged(f))if(d.strokesRecorded[0]||d.strokesRecorded[1])d.save(!1,this.lastKeydownImage,!1),d.resetType()},onInput:function(){if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{var a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode,!0),this.keyEventsStack.resetInputs())}},onKeyup:function(a){var d=this.undoManager;
a=a.data.getKey();var f=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(a);if(!(b.ieFunctionalKeysBug(a)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new c(d.editor,!0))))if(0<f)d.type(a);else if(b.isNavigationKey(a))this.onNavigationKey(!0)},onNavigationKey:function(a){var b=this.undoManager;!a&&b.save(!0,null,!1)||b.updateSelection(new c(b.editor));b.resetType()},ignoreInputEventListener:function(){this.ignoreInputEvent=!0},activateInputEventListener:function(){this.ignoreInputEvent=
!1},attachListeners:function(){var a=this.undoManager.editor,c=a.editable(),d=this;c.attachListener(c,"keydown",function(a){d.onKeydown(a);if(b.ieFunctionalKeysBug(a.data.getKey()))d.onInput()},null,null,999);c.attachListener(c,CKEDITOR.env.ie?"keypress":"input",d.onInput,d,null,999);c.attachListener(c,"keyup",d.onKeyup,d,null,999);c.attachListener(c,"paste",d.ignoreInputEventListener,d,null,999);c.attachListener(c,"drop",d.ignoreInputEventListener,d,null,999);a.on("afterPaste",d.activateInputEventListener,
d,null,999);c.attachListener(c.isInline()?c:a.document.getDocumentElement(),"click",function(){d.onNavigationKey()},null,null,999);c.attachListener(this.undoManager.editor,"blur",function(){d.keyEventsStack.remove(9)},null,null,999)}};var k=CKEDITOR.plugins.undo.KeyEventsStack=function(){this.stack=[]};k.prototype={push:function(a){a=this.stack.push({keyCode:a,inputs:0});return this.stack[a-1]},getLastIndex:function(a){if("number"!=typeof a)return this.stack.length-1;for(var b=this.stack.length;b--;)if(this.stack[b].keyCode==
a)return b;return-1},getLast:function(a){a=this.getLastIndex(a);return-1!=a?this.stack[a]:null},increment:function(a){this.getLast(a).inputs++},remove:function(a){a=this.getLastIndex(a);-1!=a&&this.stack.splice(a,1)},resetInputs:function(a){if("number"==typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0},getTotalInputs:function(){for(var a=this.stack.length,b=0;a--;)b+=this.stack[a].inputs;return b},cleanUp:function(a){a=a.data.$;a.ctrlKey||a.metaKey||this.remove(17);
a.shiftKey||this.remove(16);a.altKey||this.remove(18)}}}(),"use strict",function(){function a(a,b){CKEDITOR.tools.extend(this,{editor:a,editable:a.editable(),doc:a.document,win:a.window},b,!0);this.inline=this.editable.isInline();this.inline||(this.frame=this.win.getFrame());this.target=this[this.inline?"editable":"doc"]}function f(a,b){CKEDITOR.tools.extend(this,b,{editor:a},!0)}function b(a,b){var c=a.editable();CKEDITOR.tools.extend(this,{editor:a,editable:c,inline:c.isInline(),doc:a.document,
win:a.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},b,!0);this.hidden={};this.visible={};this.inline||(this.frame=this.win.getFrame());this.queryViewport();var f=CKEDITOR.tools.bind(this.queryViewport,this),g=CKEDITOR.tools.bind(this.hideVisible,this),k=CKEDITOR.tools.bind(this.removeAll,this);c.attachListener(this.winTop,"resize",f);c.attachListener(this.winTop,"scroll",f);c.attachListener(this.winTop,"resize",g);c.attachListener(this.win,"scroll",g);c.attachListener(this.inline?
c:this.frame,"mouseout",function(a){var b=a.data.$.clientX;a=a.data.$.clientY;this.queryViewport();(b<=this.rect.left||b>=this.rect.right||a<=this.rect.top||a>=this.rect.bottom)&&this.hideVisible();(0>=b||b>=this.winTopPane.width||0>=a||a>=this.winTopPane.height)&&this.hideVisible()},this);c.attachListener(a,"resize",f);c.attachListener(a,"mode",k);a.on("destroy",k);this.lineTpl=(new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
l,this.lineStyle,!0)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,!0)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,!0))})}function c(a){var b;if(b=a&&a.type==CKEDITOR.NODE_ELEMENT)b=!(k[a.getComputedStyle("float")]||k[a.getAttribute("align")]);return b&&
!g[a.getComputedStyle("position")]}CKEDITOR.plugins.add("lineutils");CKEDITOR.LINEUTILS_BEFORE=1;CKEDITOR.LINEUTILS_AFTER=2;CKEDITOR.LINEUTILS_INSIDE=4;a.prototype={start:function(a){var b=this,c=this.editor,d=this.doc,f,g,k,l,v=CKEDITOR.tools.eventsBuffer(50,function(){c.readOnly||"wysiwyg"!=c.mode||(b.relations={},(g=d.$.elementFromPoint(k,l))&&g.nodeType&&(f=new CKEDITOR.dom.element(g),b.traverseSearch(f),isNaN(k+l)||b.pixelSearch(f,k,l),a&&a(b.relations,k,l)))});this.listener=this.editable.attachListener(this.target,
"mousemove",function(a){k=a.data.$.clientX;l=a.data.$.clientY;v.input()});this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){v.reset()})},stop:function(){this.listener&&this.listener.removeListener()},getRange:function(){var a={};a[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START;a[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END;a[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START;return function(b){var c=this.editor.createRange();c.moveToPosition(this.relations[b.uid].element,
a[b.type]);return c}}(),store:function(){function a(b,c,d){var f=b.getUniqueId();f in d?d[f].type|=c:d[f]={element:b,type:c}}return function(b,d){var f;d&CKEDITOR.LINEUTILS_AFTER&&c(f=b.getNext())&&f.isVisible()&&(a(f,CKEDITOR.LINEUTILS_BEFORE,this.relations),d^=CKEDITOR.LINEUTILS_AFTER);d&CKEDITOR.LINEUTILS_INSIDE&&c(f=b.getFirst())&&f.isVisible()&&(a(f,CKEDITOR.LINEUTILS_BEFORE,this.relations),d^=CKEDITOR.LINEUTILS_INSIDE);a(b,d,this.relations)}}(),traverseSearch:function(a){var b,d,f;do if(f=a.$["data-cke-expando"],
!(f&&f in this.relations)){if(a.equals(this.editable))break;if(c(a))for(b in this.lookups)(d=this.lookups[b](a))&&this.store(a,d)}while((!a||a.type!=CKEDITOR.NODE_ELEMENT||"true"!=a.getAttribute("contenteditable"))&&(a=a.getParent()))},pixelSearch:function(){function a(d,f,g,h,k){for(var l=0,v;k(g);){g+=h;if(25==++l)break;if(v=this.doc.$.elementFromPoint(f,g))if(v==d)l=0;else if(b(d,v)&&(l=0,c(v=new CKEDITOR.dom.element(v))))return v}}var b=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(a,b){return a.contains(b)}:
function(a,b){return!!(a.compareDocumentPosition(b)&16)};return function(b,d,f){var g=this.win.getViewPaneSize().height,k=a.call(this,b.$,d,f,-1,function(a){return 0<a});d=a.call(this,b.$,d,f,1,function(a){return a<g});if(k)for(this.traverseSearch(k);!k.getParent().equals(b);)k=k.getParent();if(d)for(this.traverseSearch(d);!d.getParent().equals(b);)d=d.getParent();for(;k||d;){k&&(k=k.getNext(c));if(!k||k.equals(d))break;this.traverseSearch(k);d&&(d=d.getPrevious(c));if(!d||d.equals(k))break;this.traverseSearch(d)}}}(),
greedySearch:function(){this.relations={};for(var a=this.editable.getElementsByTag("*"),b=0,d,f,g;d=a.getItem(b++);)if(!d.equals(this.editable)&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasAttribute("contenteditable")||!d.isReadOnly())&&c(d)&&d.isVisible())for(g in this.lookups)(f=this.lookups[g](d))&&this.store(d,f);return this.relations}};f.prototype={locate:function(){function a(b,d){var f=b.element[d===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();return f&&c(f)?(b.siblingRect=f.getClientRect(),
d==CKEDITOR.LINEUTILS_BEFORE?(b.siblingRect.bottom+b.elementRect.top)/2:(b.elementRect.bottom+b.siblingRect.top)/2):d==CKEDITOR.LINEUTILS_BEFORE?b.elementRect.top:b.elementRect.bottom}return function(b){var c;this.locations={};for(var d in b)c=b[d],c.elementRect=c.element.getClientRect(),c.type&CKEDITOR.LINEUTILS_BEFORE&&this.store(d,CKEDITOR.LINEUTILS_BEFORE,a(c,CKEDITOR.LINEUTILS_BEFORE)),c.type&CKEDITOR.LINEUTILS_AFTER&&this.store(d,CKEDITOR.LINEUTILS_AFTER,a(c,CKEDITOR.LINEUTILS_AFTER)),c.type&
CKEDITOR.LINEUTILS_INSIDE&&this.store(d,CKEDITOR.LINEUTILS_INSIDE,(c.elementRect.top+c.elementRect.bottom)/2);return this.locations}}(),sort:function(){var a,b,c,d;return function(f,g){a=this.locations;b=[];for(var k in a)for(var l in a[k])if(c=Math.abs(f-a[k][l]),b.length){for(d=0;d<b.length;d++)if(c<b[d].dist){b.splice(d,0,{uid:+k,type:l,dist:c});break}d==b.length&&b.push({uid:+k,type:l,dist:c})}else b.push({uid:+k,type:l,dist:c});return"undefined"!=typeof g?b.slice(0,g):b}}(),store:function(a,
b,c){this.locations[a]||(this.locations[a]={});this.locations[a][b]=c}};var d={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},l={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999};b.prototype={removeAll:function(){for(var a in this.hidden)this.hidden[a].remove(),delete this.hidden[a];for(a in this.visible)this.visible[a].remove(),delete this.visible[a]},hideLine:function(a){var b=a.getUniqueId();
a.hide();this.hidden[b]=a;delete this.visible[b]},showLine:function(a){var b=a.getUniqueId();a.show();this.visible[b]=a;delete this.hidden[b]},hideVisible:function(){for(var a in this.visible)this.hideLine(this.visible[a])},placeLine:function(a,b){var c,d,f;if(c=this.getStyle(a.uid,a.type)){for(f in this.visible)if(this.visible[f].getCustomData("hash")!==this.hash){d=this.visible[f];break}if(!d)for(f in this.hidden)if(this.hidden[f].getCustomData("hash")!==this.hash){this.showLine(d=this.hidden[f]);
break}d||this.showLine(d=this.addLine());d.setCustomData("hash",this.hash);this.visible[d.getUniqueId()]=d;d.setStyles(c);b&&b(d)}},getStyle:function(a,b){var c=this.relations[a],d=this.locations[a][b],f={};f.width=c.siblingRect?Math.max(c.siblingRect.width,c.elementRect.width):c.elementRect.width;f.top=this.inline?d+this.winTopScroll.y-this.rect.relativeY:this.rect.top+this.winTopScroll.y+d;if(f.top-this.winTopScroll.y<this.rect.top||f.top-this.winTopScroll.y>this.rect.bottom)return!1;this.inline?
f.left=c.elementRect.left-this.rect.relativeX:(0<c.elementRect.left?f.left=this.rect.left+c.elementRect.left:(f.width+=c.elementRect.left,f.left=this.rect.left),0<(c=f.left+f.width-(this.rect.left+this.winPane.width))&&(f.width-=c));f.left+=this.winTopScroll.x;for(var g in f)f[g]=CKEDITOR.tools.cssLength(f[g]);return f},addLine:function(){var a=CKEDITOR.dom.element.createFromHtml(this.lineTpl);a.appendTo(this.container);return a},prepare:function(a,b){this.relations=a;this.locations=b;this.hash=Math.random()},
cleanup:function(){var a,b;for(b in this.visible)a=this.visible[b],a.getCustomData("hash")!==this.hash&&this.hideLine(a)},queryViewport:function(){this.winPane=this.win.getViewPaneSize();this.winTopScroll=this.winTop.getScrollPosition();this.winTopPane=this.winTop.getViewPaneSize();this.rect=this.getClientRect(this.inline?this.editable:this.frame)},getClientRect:function(a){a=a.getClientRect();var b=this.container.getDocumentPosition(),c=this.container.getComputedStyle("position");a.relativeX=a.relativeY=
0;"static"!=c&&(a.relativeY=b.y,a.relativeX=b.x,a.top-=a.relativeY,a.bottom-=a.relativeY,a.left-=a.relativeX,a.right-=a.relativeX);return a}};var k={left:1,right:1,center:1},g={absolute:1,fixed:1};CKEDITOR.plugins.lineutils={finder:a,locator:f,liner:b}}(),function(){function a(a){return a.getName&&!a.hasAttribute("data-cke-temp")}CKEDITOR.plugins.add("widgetselection",{init:function(a){if(CKEDITOR.env.webkit){var b=CKEDITOR.plugins.widgetselection;a.on("contentDom",function(a){a=a.editor;var d=a.editable();
d.attachListener(d,"keydown",function(a){a.data.getKeystroke()==CKEDITOR.CTRL+65&&CKEDITOR.tools.setTimeout(function(){b.addFillers(d)||b.removeFillers(d)},0)},null,null,-1);a.on("selectionCheck",function(a){b.removeFillers(a.editor.editable())});a.on("paste",function(a){a.data.dataValue=b.cleanPasteData(a.data.dataValue)});"selectall"in a.plugins&&b.addSelectAllIntegration(a)})}}});CKEDITOR.plugins.widgetselection={startFiller:null,endFiller:null,fillerAttribute:"data-cke-filler-webkit",fillerContent:"\x26nbsp;",
fillerTagName:"div",addFillers:function(f){var b=f.editor;if(!this.isWholeContentSelected(f)&&0<f.getChildCount()){var c=f.getFirst(a),d=f.getLast(a);c&&c.type==CKEDITOR.NODE_ELEMENT&&!c.isEditable()&&(this.startFiller=this.createFiller(),f.append(this.startFiller,1));d&&d.type==CKEDITOR.NODE_ELEMENT&&!d.isEditable()&&(this.endFiller=this.createFiller(!0),f.append(this.endFiller,0));if(this.hasFiller(f))return b=b.createRange(),b.selectNodeContents(f),b.select(),!0}return!1},removeFillers:function(a){if(this.hasFiller(a)&&
!this.isWholeContentSelected(a)){var b=a.findOne(this.fillerTagName+"["+this.fillerAttribute+"\x3dstart]"),c=a.findOne(this.fillerTagName+"["+this.fillerAttribute+"\x3dend]");this.startFiller&&b&&this.startFiller.equals(b)?this.removeFiller(this.startFiller,a):this.startFiller=b;this.endFiller&&c&&this.endFiller.equals(c)?this.removeFiller(this.endFiller,a):this.endFiller=c}},cleanPasteData:function(a){a&&a.length&&(a=a.replace(this.createFillerRegex(),"").replace(this.createFillerRegex(!0),""));
return a},isWholeContentSelected:function(a){var b=a.editor.getSelection().getRanges()[0];return!b||b&&b.collapsed?!1:(b=b.clone(),b.enlarge(CKEDITOR.ENLARGE_ELEMENT),!!(b&&a&&b.startContainer&&b.endContainer&&0===b.startOffset&&b.endOffset===a.getChildCount()&&b.startContainer.equals(a)&&b.endContainer.equals(a)))},hasFiller:function(a){return 0<a.find(this.fillerTagName+"["+this.fillerAttribute+"]").count()},createFiller:function(a){var b=new CKEDITOR.dom.element(this.fillerTagName);b.setHtml(this.fillerContent);
b.setAttribute(this.fillerAttribute,a?"end":"start");b.setAttribute("data-cke-temp",1);b.setStyles({display:"block",width:0,height:0,padding:0,border:0,margin:0,position:"absolute",top:0,left:"-9999px",opacity:0,overflow:"hidden"});return b},removeFiller:function(a,b){if(a){var c=b.editor,d=b.editor.getSelection().getRanges()[0].startPath(),l=c.createRange(),k,g;d.contains(a)&&(k=a.getHtml(),g=!0);d="start"==a.getAttribute(this.fillerAttribute);a.remove();k&&0<k.length&&k!=this.fillerContent?(b.insertHtmlIntoRange(k,
c.getSelection().getRanges()[0]),l.setStartAt(b.getChild(b.getChildCount()-1),CKEDITOR.POSITION_BEFORE_END),c.getSelection().selectRanges([l])):g&&(d?l.setStartAt(b.getFirst().getNext(),CKEDITOR.POSITION_AFTER_START):l.setEndAt(b.getLast().getPrevious(),CKEDITOR.POSITION_BEFORE_END),b.editor.getSelection().selectRanges([l]))}},createFillerRegex:function(a){var b=this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi,'style\x3d"[^"]*"').replace(/>[^<]*</gi,"\x3e[^\x3c]*\x3c");return new RegExp((a?
"":"^")+b+(a?"$":""))},addSelectAllIntegration:function(a){var b=this;a.editable().attachListener(a,"beforeCommandExec",function(c){var d=a.editable();"selectAll"==c.data.name&&d&&b.addFillers(d)},null,null,9999)}}}(),"use strict",function(){function a(a){this.editor=a;this.registered={};this.instances={};this.selected=[];this.widgetHoldingFocusedEditable=this.focused=null;this._={nextId:0,upcasts:[],upcastCallbacks:[],filters:{}};H(this);C(this);this.on("checkWidgets",k);this.editor.on("contentDomInvalidated",
this.checkWidgets,this);B(this);t(this);x(this);z(this);A(this)}function f(a,b,c,d,e){var g=a.editor;CKEDITOR.tools.extend(this,d,{editor:g,id:b,inline:"span"==c.getParent().getName(),element:c,data:CKEDITOR.tools.extend({},"function"==typeof d.defaults?d.defaults():d.defaults),dataReady:!1,inited:!1,ready:!1,edit:f.prototype.edit,focusedEditable:null,definition:d,repository:a,draggable:!1!==d.draggable,_:{downcastFn:d.downcast&&"string"==typeof d.downcast?d.downcasts[d.downcast]:d.downcast}},!0);
a.fire("instanceCreated",this);ha(this,d);this.init&&this.init();this.inited=!0;(a=this.element.data("cke-widget-data"))&&this.setData(JSON.parse(decodeURIComponent(a)));e&&this.setData(e);this.data.classes||this.setData("classes",this.getClasses());this.dataReady=!0;U(this);this.fire("data",this.data);this.isInited()&&g.editable().contains(this.wrapper)&&(this.ready=!0,this.fire("ready"))}function b(a,b,c){CKEDITOR.dom.element.call(this,b.$);this.editor=a;this._={};b=this.filter=c.filter;CKEDITOR.dtd[this.getName()].p?
(this.enterMode=b?b.getAllowedEnterMode(a.enterMode):a.enterMode,this.shiftEnterMode=b?b.getAllowedEnterMode(a.shiftEnterMode,!0):a.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR}function c(a,b){a.addCommand(b.name,{exec:function(a,c){function d(){a.widgets.finalizeCreation(h)}var e=a.widgets.focused;if(e&&e.name==b.name)e.edit();else if(b.insert)b.insert({editor:a,commandData:c});else if(b.template){var e="function"==typeof b.defaults?b.defaults():b.defaults,e=CKEDITOR.dom.element.createFromHtml(b.template.output(e)),
f,g=a.widgets.wrapElement(e,b.name),h=new CKEDITOR.dom.documentFragment(g.getDocument());h.append(g);(f=a.widgets.initOn(e,b,c&&c.startupData))?(e=f.once("edit",function(b){if(b.data.dialog)f.once("dialog",function(b){b=b.data;var c,e;c=b.once("ok",d,null,null,20);e=b.once("cancel",function(b){b.data&&!1===b.data.hide||a.widgets.destroy(f,!0)});b.once("hide",function(){c.removeListener();e.removeListener()})});else d()},null,null,999),f.edit(),e.removeListener()):d()}},allowedContent:b.allowedContent,
requiredContent:b.requiredContent,contentForms:b.contentForms,contentTransformations:b.contentTransformations})}function d(a,b){function c(a,d){var e=b.upcast.split(","),f,g;for(g=0;g<e.length;g++)if(f=e[g],f===a.name)return b.upcasts[f].call(this,a,d);return!1}function d(b,c,e){var f=CKEDITOR.tools.getIndex(a._.upcasts,function(a){return a[2]>e});0>f&&(f=a._.upcasts.length);a._.upcasts.splice(f,0,[CKEDITOR.tools.bind(b,c),c.name,e])}var e=b.upcast,f=b.upcastPriority||10;e&&("string"==typeof e?d(c,
b,f):d(e,b,f))}function l(a,b){a.focused=null;if(b.isInited()){var c=b.editor.checkDirty();a.fire("widgetBlurred",{widget:b});b.setFocused(!1);!c&&b.editor.resetDirty()}}function k(a){a=a.data;if("wysiwyg"==this.editor.mode){var b=this.editor.editable(),c=this.instances,d,e,g,h;if(b){for(d in c)c[d].isReady()&&!b.contains(c[d].wrapper)&&this.destroy(c[d],!0);if(a&&a.initOnlyNew)c=this.initOnAll();else{var k=b.find(".cke_widget_wrapper"),c=[];d=0;for(e=k.count();d<e;d++){g=k.getItem(d);if(h=!this.getByElement(g,
!0)){a:{h=p;for(var l=g;l=l.getParent();)if(h(l)){h=!0;break a}h=!1}h=!h}h&&b.contains(g)&&(g.addClass("cke_widget_new"),c.push(this.initOn(g.getFirst(f.isDomWidgetElement))))}}a&&a.focusInited&&1==c.length&&c[0].focus()}}}function g(a){if("undefined"!=typeof a.attributes&&a.attributes["data-widget"]){var b=h(a),c=m(a),d=!1;b&&b.value&&b.value.match(/^\s/g)&&(b.parent.attributes["data-cke-white-space-first"]=1,b.value=b.value.replace(/^\s/g,"\x26nbsp;"),d=!0);c&&c.value&&c.value.match(/\s$/g)&&(c.parent.attributes["data-cke-white-space-last"]=
1,c.value=c.value.replace(/\s$/g,"\x26nbsp;"),d=!0);d&&(a.attributes["data-cke-widget-white-space"]=1)}}function h(a){return a.find(function(a){return 3===a.type},!0).shift()}function m(a){return a.find(function(a){return 3===a.type},!0).pop()}function e(a,b,c){if(!c.allowedContent&&!c.disallowedContent)return null;var d=this._.filters[a];d||(this._.filters[a]=d={});a=d[b];a||(a=c.allowedContent?new CKEDITOR.filter(c.allowedContent):this.editor.filter.clone(),d[b]=a,c.disallowedContent&&a.disallow(c.disallowedContent));
return a}function n(a){var b=[],c=a._.upcasts,d=a._.upcastCallbacks;return{toBeWrapped:b,iterator:function(a){var e,g,h,k,l;if("data-cke-widget-wrapper"in a.attributes)return(a=a.getFirst(f.isParserWidgetElement))&&b.push([a]),!1;if("data-widget"in a.attributes)return b.push([a]),!1;if(l=c.length){if(a.attributes["data-cke-widget-upcasted"])return!1;k=0;for(e=d.length;k<e;++k)if(!1===d[k](a))return;for(k=0;k<l;++k)if(e=c[k],h={},g=e[0](a,h))return g instanceof CKEDITOR.htmlParser.element&&(a=g),a.attributes["data-cke-widget-data"]=
encodeURIComponent(JSON.stringify(h)),a.attributes["data-cke-widget-upcasted"]=1,b.push([a,e[1]]),!1}}}}function q(a,b){return{tabindex:-1,contenteditable:"false","data-cke-widget-wrapper":1,"data-cke-filter":"off","class":"cke_widget_wrapper cke_widget_new cke_widget_"+(a?"inline":"block")+(b?" cke_widget_"+b:"")}}function y(a,b,c){if(a.type==CKEDITOR.NODE_ELEMENT){var d=CKEDITOR.dtd[a.name];if(d&&!d[c.name]){var d=a.split(b),e=a.parent;b=d.getIndex();a.children.length||(--b,a.remove());d.children.length||
d.remove();return y(e,b,c)}}a.add(c,b)}function u(a,b){return"boolean"==typeof a.inline?a.inline:!!CKEDITOR.dtd.$inline[b]}function p(a){return a.hasAttribute("data-cke-temp")}function v(a,b,c,d){var e=a.editor;e.fire("lockSnapshot");c?(d=c.data("cke-widget-editable"),d=b.editables[d],a.widgetHoldingFocusedEditable=b,b.focusedEditable=d,c.addClass("cke_widget_editable_focused"),d.filter&&e.setActiveFilter(d.filter),e.setActiveEnterMode(d.enterMode,d.shiftEnterMode)):(d||b.focusedEditable.removeClass("cke_widget_editable_focused"),
b.focusedEditable=null,a.widgetHoldingFocusedEditable=null,e.setActiveFilter(null),e.setActiveEnterMode(null,null));e.fire("unlockSnapshot")}function w(a){a.contextMenu&&a.contextMenu.addListener(function(b){if(b=a.widgets.getByElement(b,!0))return b.fire("contextMenu",{})})}function r(a,b){return CKEDITOR.tools.trim(b)}function z(a){var b=a.editor,c=CKEDITOR.plugins.lineutils;b.on("dragstart",function(c){var d=c.data.target;f.isDomDragHandler(d)&&(d=a.getByElement(d),c.data.dataTransfer.setData("cke/widget-id",
d.id),b.focus(),d.focus())});b.on("drop",function(c){var d=c.data.dataTransfer,e=d.getData("cke/widget-id"),f=d.getTransferType(b),d=b.createRange();""!==e&&f===CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?c.cancel():""!==e&&f==CKEDITOR.DATA_TRANSFER_INTERNAL&&(e=a.instances[e])&&(d.setStartBefore(e.wrapper),d.setEndAfter(e.wrapper),c.data.dragRange=d,delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount,delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,c.data.dataTransfer.setData("text/html",
b.editable().getHtmlFromRange(d).getHtml()),b.widgets.destroy(e,!0))});b.on("contentDom",function(){var d=b.editable();CKEDITOR.tools.extend(a,{finder:new c.finder(b,{lookups:{"default":function(b){if(!b.is(CKEDITOR.dtd.$listItem)&&b.is(CKEDITOR.dtd.$block)&&!f.isDomNestedEditable(b)&&!a._.draggedWidget.wrapper.contains(b)){var c=f.getNestedEditable(d,b);if(c){b=a._.draggedWidget;if(a.getByElement(c)==b)return;c=CKEDITOR.filter.instances[c.data("cke-filter")];b=b.requiredContent;if(c&&b&&!c.check(b))return}return CKEDITOR.LINEUTILS_BEFORE|
CKEDITOR.LINEUTILS_AFTER}}}}),locator:new c.locator(b),liner:new c.liner(b,{lineStyle:{cursor:"move !important","border-top-color":"#666"},tipLeftStyle:{"border-left-color":"#666"},tipRightStyle:{"border-right-color":"#666"}})},!0)})}function t(a){var b=a.editor;b.on("contentDom",function(){var c=b.editable(),d=c.isInline()?c:b.document,e,g;c.attachListener(d,"mousedown",function(c){var d=c.data.getTarget();e=d instanceof CKEDITOR.dom.element?a.getByElement(d):null;g=0;e&&(e.inline&&d.type==CKEDITOR.NODE_ELEMENT&&
d.hasAttribute("data-cke-widget-drag-handler")?(g=1,a.focused!=e&&b.getSelection().removeAllRanges()):f.getNestedEditable(e.wrapper,d)?e=null:(c.data.preventDefault(),CKEDITOR.env.ie||e.focus()))});c.attachListener(d,"mouseup",function(){g&&e&&e.wrapper&&(g=0,e.focus())});CKEDITOR.env.ie&&c.attachListener(d,"mouseup",function(){setTimeout(function(){e&&e.wrapper&&c.contains(e.wrapper)&&(e.focus(),e=null)})})});b.on("doubleclick",function(b){var c=a.getByElement(b.data.element);if(c&&!f.getNestedEditable(c.wrapper,
b.data.element))return c.fire("doubleclick",{element:b.data.element})},null,null,1)}function x(a){a.editor.on("key",function(b){var c=a.focused,d=a.widgetHoldingFocusedEditable,e;c?e=c.fire("key",{keyCode:b.data.keyCode}):d&&(c=b.data.keyCode,b=d.focusedEditable,c==CKEDITOR.CTRL+65?(c=b.getBogus(),d=d.editor.createRange(),d.selectNodeContents(b),c&&d.setEndAt(c,CKEDITOR.POSITION_BEFORE_START),d.select(),e=!1):8==c||46==c?(e=d.editor.getSelection().getRanges(),d=e[0],e=!(1==e.length&&d.collapsed&&
d.checkBoundaryOfElement(b,CKEDITOR[8==c?"START":"END"]))):e=void 0);return e},null,null,1)}function A(a){function b(c){a.focused&&E(a.focused,"cut"==c.name)}var c=a.editor;c.on("contentDom",function(){var a=c.editable();a.attachListener(a,"copy",b);a.attachListener(a,"cut",b)})}function B(a){var b=a.editor;b.on("selectionCheck",function(){a.fire("checkSelection")});a.on("checkSelection",a.checkSelection,a);b.on("selectionChange",function(c){var d=(c=f.getNestedEditable(b.editable(),c.data.selection.getStartElement()))&&
a.getByElement(c),e=a.widgetHoldingFocusedEditable;e?e===d&&e.focusedEditable.equals(c)||(v(a,e,null),d&&c&&v(a,d,c)):d&&c&&v(a,d,c)});b.on("dataReady",function(){F(a).commit()});b.on("blur",function(){var b;(b=a.focused)&&l(a,b);(b=a.widgetHoldingFocusedEditable)&&v(a,b,null)})}function C(a){var b=a.editor,c={};b.on("toDataFormat",function(b){var d=CKEDITOR.tools.getNextNumber(),e=[];b.data.downcastingSessionId=d;c[d]=e;b.data.dataValue.forEach(function(b){var c=b.attributes,d;if("data-cke-widget-white-space"in
c){d=h(b);var g=m(b);d.parent.attributes["data-cke-white-space-first"]&&(d.value=d.value.replace(/^&nbsp;/g," "));g.parent.attributes["data-cke-white-space-last"]&&(g.value=g.value.replace(/&nbsp;$/g," "))}if("data-cke-widget-id"in c){if(c=a.instances[c["data-cke-widget-id"]])d=b.getFirst(f.isParserWidgetElement),e.push({wrapper:b,element:d,widget:c,editables:{}}),"1"!=d.attributes["data-cke-widget-keep-attr"]&&delete d.attributes["data-widget"]}else if("data-cke-widget-editable"in c)return 0<e.length&&
(e[e.length-1].editables[c["data-cke-widget-editable"]]=b),!1},CKEDITOR.NODE_ELEMENT,!0)},null,null,8);b.on("toDataFormat",function(a){if(a.data.downcastingSessionId){a=c[a.data.downcastingSessionId];for(var b,d,e,f,g,h;b=a.shift();){d=b.widget;e=b.element;f=d._.downcastFn&&d._.downcastFn.call(d,e);for(h in b.editables)g=b.editables[h],delete g.attributes.contenteditable,g.setHtml(d.editables[h].getData());f||(f=e);b.wrapper.replaceWith(f)}}},null,null,13);b.on("contentDomUnload",function(){a.destroyAll(!0)})}
function H(a){var b=a.editor,c,d;b.on("toHtml",function(b){var d=n(a),e;for(b.data.dataValue.forEach(d.iterator,CKEDITOR.NODE_ELEMENT,!0);e=d.toBeWrapped.pop();){var g=e[0],h=g.parent;h.type==CKEDITOR.NODE_ELEMENT&&h.attributes["data-cke-widget-wrapper"]&&h.replaceWith(g);a.wrapElement(e[0],e[1])}c=b.data.protectedWhitespaces?3==b.data.dataValue.children.length&&f.isParserWidgetWrapper(b.data.dataValue.children[1]):1==b.data.dataValue.children.length&&f.isParserWidgetWrapper(b.data.dataValue.children[0])},
null,null,8);b.on("dataReady",function(){if(d)for(var c=b.editable().find(".cke_widget_wrapper"),e,g,h=0,k=c.count();h<k;++h)e=c.getItem(h),g=e.getFirst(f.isDomWidgetElement),g.type==CKEDITOR.NODE_ELEMENT&&g.data("widget")?(g.replace(e),a.wrapElement(g)):e.remove();d=0;a.destroyAll(!0);a.initOnAll()});b.on("loadSnapshot",function(b){/data-cke-widget/.test(b.data)&&(d=1);a.destroyAll(!0)},null,null,9);b.on("paste",function(a){a=a.data;a.dataValue=a.dataValue.replace(ca,r);a.range&&(a=f.getNestedEditable(b.editable(),
a.range.startContainer))&&(a=CKEDITOR.filter.instances[a.data("cke-filter")])&&b.setActiveFilter(a)});b.on("afterInsertHtml",function(d){d.data.intoRange?a.checkWidgets({initOnlyNew:!0}):(b.fire("lockSnapshot"),a.checkWidgets({initOnlyNew:!0,focusInited:c}),b.fire("unlockSnapshot"))})}function F(a){var b=a.selected,c=[],d=b.slice(0),e=null;return{select:function(a){0>CKEDITOR.tools.indexOf(b,a)&&c.push(a);a=CKEDITOR.tools.indexOf(d,a);0<=a&&d.splice(a,1);return this},focus:function(a){e=a;return this},
commit:function(){var f=a.focused!==e,g,h;a.editor.fire("lockSnapshot");for(f&&(g=a.focused)&&l(a,g);g=d.pop();)b.splice(CKEDITOR.tools.indexOf(b,g),1),g.isInited()&&(h=g.editor.checkDirty(),g.setSelected(!1),!h&&g.editor.resetDirty());f&&e&&(h=a.editor.checkDirty(),a.focused=e,a.fire("widgetFocused",{widget:e}),e.setFocused(!0),!h&&a.editor.resetDirty());for(;g=c.pop();)b.push(g),g.setSelected(!0);a.editor.fire("unlockSnapshot")}}}function I(a,b,c){var d=0;b=L(b);var e=a.data.classes||{},f;if(b){for(e=
CKEDITOR.tools.clone(e);f=b.pop();)c?e[f]||(d=e[f]=1):e[f]&&(delete e[f],d=1);d&&a.setData("classes",e)}}function J(a){a.cancel()}function E(a,b){var c=a.editor,d=c.document,e=CKEDITOR.env.edge&&16<=CKEDITOR.env.version;if(!d.getById("cke_copybin")){var f=!c.blockless&&!CKEDITOR.env.ie||e?"div":"span",e=d.createElement(f),g=d.createElement(f),f=CKEDITOR.env.ie&&9>CKEDITOR.env.version;g.setAttributes({id:"cke_copybin","data-cke-temp":"1"});e.setStyles({position:"absolute",width:"1px",height:"1px",
overflow:"hidden"});e.setStyle("ltr"==c.config.contentsLangDirection?"left":"right","-5000px");var h=c.createRange();h.setStartBefore(a.wrapper);h.setEndAfter(a.wrapper);e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e'+c.editable().getHtmlFromRange(h).getHtml()+'\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');c.fire("saveSnapshot");c.fire("lockSnapshot");g.append(e);c.editable().append(g);var k=c.on("selectionChange",J,null,null,0),l=a.repository.on("checkSelection",J,
null,null,0);if(f)var m=d.getDocumentElement().$,n=m.scrollTop;h=c.createRange();h.selectNodeContents(e);h.select();f&&(m.scrollTop=n);setTimeout(function(){b||a.focus();g.remove();k.removeListener();l.removeListener();c.fire("unlockSnapshot");b&&!c.readOnly&&(a.repository.del(a),c.fire("saveSnapshot"))},100)}}function L(a){return(a=(a=a.getDefinition().attributes)&&a["class"])?a.split(/\s+/):null}function G(){var a=CKEDITOR.document.getActive(),b=this.editor,c=b.editable();(c.isInline()?c:b.document.getWindow().getFrame()).equals(a)&&
b.focusManager.focus(c)}function D(){CKEDITOR.env.gecko&&this.editor.unlockSelection();CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),this.editor.selectionChange(1))}function N(a){var b=null;a.on("data",function(){var a=this.data.classes,c;if(b!=a){for(c in b)a&&a[c]||this.removeClass(c);for(c in a)this.addClass(c);b=a}})}function Q(a){a.on("data",function(){if(a.wrapper){var b=this.getLabel?this.getLabel():this.editor.lang.widget.label.replace(/%1/,this.pathName||this.element.getName());
a.wrapper.setAttribute("role","region");a.wrapper.setAttribute("aria-label",b)}},null,null,9999)}function O(a){if(a.draggable){var b=a.editor,c=a.wrapper.getLast(f.isDomDragHandlerContainer),d;c?d=c.findOne("img"):(c=new CKEDITOR.dom.element("span",b.document),c.setAttributes({"class":"cke_reset cke_widget_drag_handler_container",style:"background:rgba(220,220,220,0.5);background-image:url("+b.plugins.widget.path+"images/handle.png)"}),d=new CKEDITOR.dom.element("img",b.document),d.setAttributes({"class":"cke_reset cke_widget_drag_handler",
"data-cke-widget-drag-handler":"1",src:CKEDITOR.tools.transparentImageData,width:15,title:b.lang.widget.move,height:15,role:"presentation"}),a.inline&&d.setAttribute("draggable","true"),c.append(d),a.wrapper.append(c));a.wrapper.on("dragover",function(a){a.data.preventDefault()});a.wrapper.on("mouseenter",a.updateDragHandlerPosition,a);setTimeout(function(){a.on("data",a.updateDragHandlerPosition,a)},50);if(!a.inline&&(d.on("mousedown",K,a),CKEDITOR.env.ie&&9>CKEDITOR.env.version))d.on("dragstart",
function(a){a.data.preventDefault(!0)});a.dragHandlerContainer=c}}function K(a){function b(){var c;for(p.reset();c=h.pop();)c.removeListener();var d=k;c=a.sender;var e=this.repository.finder,f=this.repository.liner,g=this.editor,l=this.editor.editable();CKEDITOR.tools.isEmpty(f.visible)||(d=e.getRange(d[0]),this.focus(),g.fire("drop",{dropRange:d,target:d.startContainer}));l.removeClass("cke_widget_dragging");f.hideVisible();g.fire("dragend",{target:c})}if(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT){var c=
this.repository.finder,d=this.repository.locator,e=this.repository.liner,f=this.editor,g=f.editable(),h=[],k=[],l,m;this.repository._.draggedWidget=this;var n=c.greedySearch(),p=CKEDITOR.tools.eventsBuffer(50,function(){l=d.locate(n);k=d.sort(m,1);k.length&&(e.prepare(n,l),e.placeLine(k[0]),e.cleanup())});g.addClass("cke_widget_dragging");h.push(g.on("mousemove",function(a){m=a.data.$.clientY;p.input()}));f.fire("dragstart",{target:a.sender});h.push(f.document.once("mouseup",b,this));g.isInline()||
h.push(CKEDITOR.document.once("mouseup",b,this))}}function W(a){var b,c,d=a.editables;a.editables={};if(a.editables)for(b in d)c=d[b],a.initEditable(b,"string"==typeof c?{selector:c}:c)}function R(a){if(a.mask){var b=a.wrapper.findOne(".cke_widget_mask");b||(b=new CKEDITOR.dom.element("img",a.editor.document),b.setAttributes({src:CKEDITOR.tools.transparentImageData,"class":"cke_reset cke_widget_mask"}),a.wrapper.append(b));a.mask=b}}function Z(a){if(a.parts){var b={},c,d;for(d in a.parts)c=a.wrapper.findOne(a.parts[d]),
b[d]=c;a.parts=b}}function ha(a,b){X(a);Z(a);W(a);R(a);O(a);N(a);Q(a);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)a.wrapper.on("dragstart",function(b){var c=b.data.getTarget();f.getNestedEditable(a,c)||a.inline&&f.isDomDragHandler(c)||b.data.preventDefault()});a.wrapper.removeClass("cke_widget_new");a.element.addClass("cke_widget_element");a.on("key",function(b){b=b.data.keyCode;if(13==b)a.edit();else{if(b==CKEDITOR.CTRL+67||b==CKEDITOR.CTRL+88){E(a,b==CKEDITOR.CTRL+88);return}if(b in V||CKEDITOR.CTRL&
b||CKEDITOR.ALT&b)return}return!1},null,null,999);a.on("doubleclick",function(b){a.edit()&&b.cancel()});if(b.data)a.on("data",b.data);if(b.edit)a.on("edit",b.edit)}function X(a){(a.wrapper=a.element.getParent()).setAttribute("data-cke-widget-id",a.id)}function U(a){a.element.data("cke-widget-data",encodeURIComponent(JSON.stringify(a.data)))}function ba(){function a(){}function b(a,c,d){return d&&this.checkElement(a)?(a=d.widgets.getByElement(a,!0))&&a.checkStyleActive(this):!1}function c(a){function b(a,
c,d){for(var e=a.length,f=0;f<e;){if(c.call(d,a[f],f,a))return a[f];f++}}function e(a){function b(a,c){var d=CKEDITOR.tools.object.keys(a),e=CKEDITOR.tools.object.keys(c);if(d.length!==e.length)return!1;for(var f in a)if(("object"!==typeof a[f]||"object"!==typeof c[f]||!b(a[f],c[f]))&&a[f]!==c[f])return!1;return!0}return function(c){return b(a.getDefinition(),c.getDefinition())}}var f=a.widget,g;d[f]||(d[f]={});for(var h=0,k=a.group.length;h<k;h++)g=a.group[h],d[f][g]||(d[f][g]=[]),g=d[f][g],b(g,
e(a))||g.push(a)}var d={};CKEDITOR.style.addCustomHandler({type:"widget",setup:function(a){this.widget=a.widget;(this.group="string"==typeof a.group?[a.group]:a.group)&&c(this)},apply:function(a){var b;a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&(b=a.widgets.focused,this.group&&this.removeStylesFromSameGroup(a),b.applyStyle(this))},remove:function(a){a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&a.widgets.focused.removeStyle(this)},removeStylesFromSameGroup:function(a){var b,
c,e=!1;if(!(a instanceof CKEDITOR.editor))return!1;c=a.elementPath();if(this.checkApplicable(c,a))for(var f=0,g=this.group.length;f<g;f++){b=d[this.widget][this.group[f]];for(var h=0;h<b.length;h++)b[h]!==this&&b[h].checkActive(c,a)&&(a.widgets.focused.removeStyle(b[h]),e=!0)}return e},checkActive:function(a,b){return this.checkElementMatch(a.lastElement,0,b)},checkApplicable:function(a,b){return b instanceof CKEDITOR.editor?this.checkElement(a.lastElement):!1},checkElementMatch:b,checkElementRemovable:b,
checkElement:function(a){return f.isDomWidgetWrapper(a)?(a=a.getFirst(f.isDomWidgetElement))&&a.data("widget")==this.widget:!1},buildPreview:function(a){return a||this._.definition.name},toAllowedContentRules:function(a){if(!a)return null;a=a.widgets.registered[this.widget];var b,c={};if(!a)return null;if(a.styleableElements){b=this.getClassesArray();if(!b)return null;c[a.styleableElements]={classes:b,propertiesOnly:!0};return c}return a.styleToAllowedContentRules?a.styleToAllowedContentRules(this):
null},getClassesArray:function(){var a=this._.definition.attributes&&this._.definition.attributes["class"];return a?CKEDITOR.tools.trim(a).split(/\s+/):null},applyToRange:a,removeFromRange:a,applyToObject:a})}CKEDITOR.plugins.add("widget",{requires:"lineutils,clipboard,widgetselection",onLoad:function(){void 0!==CKEDITOR.document.$.querySelectorAll&&(CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"),
ba())},beforeInit:function(b){void 0!==CKEDITOR.document.$.querySelectorAll&&(b.widgets=new a(b))},afterInit:function(a){if(void 0!==CKEDITOR.document.$.querySelectorAll){var b=a.widgets.registered,c,d,e;for(d in b)c=b[d],(e=c.button)&&a.ui.addButton&&a.ui.addButton(CKEDITOR.tools.capitalize(c.name,!0),{label:e,command:c.name,toolbar:"insert,10"});w(a)}}});a.prototype={MIN_SELECTION_CHECK_INTERVAL:500,add:function(a,b){b=CKEDITOR.tools.prototypedCopy(b);b.name=a;b._=b._||{};this.editor.fire("widgetDefinition",
b);b.template&&(b.template=new CKEDITOR.template(b.template));c(this.editor,b);d(this,b);return this.registered[a]=b},addUpcastCallback:function(a){this._.upcastCallbacks.push(a)},checkSelection:function(){var a=this.editor.getSelection(),b=a.getSelectedElement(),c=F(this),d;if(b&&(d=this.getByElement(b,!0)))return c.focus(d).select(d).commit();a=a.getRanges()[0];if(!a||a.collapsed)return c.commit();a=new CKEDITOR.dom.walker(a);for(a.evaluator=f.isDomWidgetWrapper;b=a.next();)c.select(this.getByElement(b));
c.commit()},checkWidgets:function(a){this.fire("checkWidgets",CKEDITOR.tools.copy(a||{}))},del:function(a){if(this.focused===a){var b=a.editor,c=b.createRange(),d;(d=c.moveToClosestEditablePosition(a.wrapper,!0))||(d=c.moveToClosestEditablePosition(a.wrapper,!1));d&&b.getSelection().selectRanges([c])}a.wrapper.remove();this.destroy(a,!0)},destroy:function(a,b){this.widgetHoldingFocusedEditable===a&&v(this,a,null,b);a.destroy(b);delete this.instances[a.id];this.fire("instanceDestroyed",a)},destroyAll:function(a,
b){var c,d,e=this.instances;if(b&&!a){d=b.find(".cke_widget_wrapper");for(var e=d.count(),f=0;f<e;++f)(c=this.getByElement(d.getItem(f),!0))&&this.destroy(c)}else for(d in e)c=e[d],this.destroy(c,a)},finalizeCreation:function(a){(a=a.getFirst())&&f.isDomWidgetWrapper(a)&&(this.editor.insertElement(a),a=this.getByElement(a),a.ready=!0,a.fire("ready"),a.focus())},getByElement:function(){function a(c){return c.is(b)&&c.data("cke-widget-id")}var b={div:1,span:1};return function(b,c){if(!b)return null;
var d=a(b);if(!c&&!d){var e=this.editor.editable();do b=b.getParent();while(b&&!b.equals(e)&&!(d=a(b)))}return this.instances[d]||null}}(),initOn:function(a,b,c){b?"string"==typeof b&&(b=this.registered[b]):b=this.registered[a.data("widget")];if(!b)return null;var d=this.wrapElement(a,b.name);return d?d.hasClass("cke_widget_new")?(a=new f(this,this._.nextId++,a,b,c),a.isInited()?this.instances[a.id]=a:null):this.getByElement(a):null},initOnAll:function(a){a=(a||this.editor.editable()).find(".cke_widget_new");
for(var b=[],c,d=a.count();d--;)(c=this.initOn(a.getItem(d).getFirst(f.isDomWidgetElement)))&&b.push(c);return b},onWidget:function(a){var b=Array.prototype.slice.call(arguments);b.shift();for(var c in this.instances){var d=this.instances[c];d.name==a&&d.on.apply(d,b)}this.on("instanceCreated",function(c){c=c.data;c.name==a&&c.on.apply(c,b)})},parseElementClasses:function(a){if(!a)return null;a=CKEDITOR.tools.trim(a).split(/\s+/);for(var b,c={},d=0;b=a.pop();)-1==b.indexOf("cke_")&&(c[b]=d=1);return d?
c:null},wrapElement:function(a,b){var c=null,d,e;if(a instanceof CKEDITOR.dom.element){b=b||a.data("widget");d=this.registered[b];if(!d)return null;if((c=a.getParent())&&c.type==CKEDITOR.NODE_ELEMENT&&c.data("cke-widget-wrapper"))return c;a.hasAttribute("data-cke-widget-keep-attr")||a.data("cke-widget-keep-attr",a.data("widget")?1:0);a.data("widget",b);(e=u(d,a.getName()))&&g(a);c=new CKEDITOR.dom.element(e?"span":"div");c.setAttributes(q(e,b));c.data("cke-display-name",d.pathName?d.pathName:a.getName());
a.getParent(!0)&&c.replace(a);a.appendTo(c)}else if(a instanceof CKEDITOR.htmlParser.element){b=b||a.attributes["data-widget"];d=this.registered[b];if(!d)return null;if((c=a.parent)&&c.type==CKEDITOR.NODE_ELEMENT&&c.attributes["data-cke-widget-wrapper"])return c;"data-cke-widget-keep-attr"in a.attributes||(a.attributes["data-cke-widget-keep-attr"]=a.attributes["data-widget"]?1:0);b&&(a.attributes["data-widget"]=b);(e=u(d,a.name))&&g(a);c=new CKEDITOR.htmlParser.element(e?"span":"div",q(e,b));c.attributes["data-cke-display-name"]=
d.pathName?d.pathName:a.name;d=a.parent;var f;d&&(f=a.getIndex(),a.remove());c.add(a);d&&y(d,f,c)}return c},_tests_createEditableFilter:e};CKEDITOR.event.implementOn(a.prototype);f.prototype={addClass:function(a){this.element.addClass(a);this.wrapper.addClass(f.WRAPPER_CLASS_PREFIX+a)},applyStyle:function(a){I(this,a,1)},checkStyleActive:function(a){a=L(a);var b;if(!a)return!1;for(;b=a.pop();)if(!this.hasClass(b))return!1;return!0},destroy:function(a){this.fire("destroy");if(this.editables)for(var b in this.editables)this.destroyEditable(b,
a);a||("0"==this.element.data("cke-widget-keep-attr")&&this.element.removeAttribute("data-widget"),this.element.removeAttributes(["data-cke-widget-data","data-cke-widget-keep-attr"]),this.element.removeClass("cke_widget_element"),this.element.replace(this.wrapper));this.wrapper=null},destroyEditable:function(a,b){var c=this.editables[a],d=!0;c.removeListener("focus",D);c.removeListener("blur",G);this.editor.focusManager.remove(c);if(c.filter){for(var e in this.repository.instances){var f=this.repository.instances[e];
f.editables&&(f=f.editables[a])&&f!==c&&c.filter===f.filter&&(d=!1)}d&&(c.filter.destroy(),(d=this.repository._.filters[this.name])&&delete d[a])}b||(this.repository.destroyAll(!1,c),c.removeClass("cke_widget_editable"),c.removeClass("cke_widget_editable_focused"),c.removeAttributes(["contenteditable","data-cke-widget-editable","data-cke-enter-mode"]));delete this.editables[a]},edit:function(){var a={dialog:this.dialog},b=this;if(!1===this.fire("edit",a)||!a.dialog)return!1;this.editor.openDialog(a.dialog,
function(a){var c,d;!1!==b.fire("dialog",a)&&(c=a.on("show",function(){a.setupContent(b)}),d=a.on("ok",function(){var c,d=b.on("data",function(a){c=1;a.cancel()},null,null,0);b.editor.fire("saveSnapshot");a.commitContent(b);d.removeListener();c&&(b.fire("data",b.data),b.editor.fire("saveSnapshot"))}),a.once("hide",function(){c.removeListener();d.removeListener()}))});return!0},getClasses:function(){return this.repository.parseElementClasses(this.element.getAttribute("class"))},hasClass:function(a){return this.element.hasClass(a)},
initEditable:function(a,c){var d=this._findOneNotNested(c.selector);return d&&d.is(CKEDITOR.dtd.$editable)?(d=new b(this.editor,d,{filter:e.call(this.repository,this.name,a,c)}),this.editables[a]=d,d.setAttributes({contenteditable:"true","data-cke-widget-editable":a,"data-cke-enter-mode":d.enterMode}),d.filter&&d.data("cke-filter",d.filter.id),d.addClass("cke_widget_editable"),d.removeClass("cke_widget_editable_focused"),c.pathName&&d.data("cke-display-name",c.pathName),this.editor.focusManager.add(d),
d.on("focus",D,this),CKEDITOR.env.ie&&d.on("blur",G,this),d._.initialSetData=!0,d.setData(d.getHtml()),!0):!1},_findOneNotNested:function(a){a=this.wrapper.find(a);for(var b,c,d=0;d<a.count();d++)if(b=a.getItem(d),c=b.getAscendant(f.isDomWidgetWrapper),this.wrapper.equals(c))return b;return null},isInited:function(){return!(!this.wrapper||!this.inited)},isReady:function(){return this.isInited()&&this.ready},focus:function(){var a=this.editor.getSelection();if(a){var b=this.editor.checkDirty();a.fake(this.wrapper);
!b&&this.editor.resetDirty()}this.editor.focus()},removeClass:function(a){this.element.removeClass(a);this.wrapper.removeClass(f.WRAPPER_CLASS_PREFIX+a)},removeStyle:function(a){I(this,a,0)},setData:function(a,b){var c=this.data,d=0;if("string"==typeof a)c[a]!==b&&(c[a]=b,d=1);else{var e=a;for(a in e)c[a]!==e[a]&&(d=1,c[a]=e[a])}d&&this.dataReady&&(U(this),this.fire("data",c));return this},setFocused:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_focused");this.fire(a?"focus":"blur");
return this},setSelected:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_selected");this.fire(a?"select":"deselect");return this},updateDragHandlerPosition:function(){var a=this.editor,b=this.element.$,c=this._.dragHandlerOffset,b={x:b.offsetLeft,y:b.offsetTop-15};c&&b.x==c.x&&b.y==c.y||(c=a.checkDirty(),a.fire("lockSnapshot"),this.dragHandlerContainer.setStyles({top:b.y+"px",left:b.x+"px",display:"block"}),a.fire("unlockSnapshot"),!c&&a.resetDirty(),this._.dragHandlerOffset=b)}};
CKEDITOR.event.implementOn(f.prototype);f.getNestedEditable=function(a,b){return!b||b.equals(a)?null:f.isDomNestedEditable(b)?b:f.getNestedEditable(a,b.getParent())};f.isDomDragHandler=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-drag-handler")};f.isDomDragHandlerContainer=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_widget_drag_handler_container")};f.isDomNestedEditable=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-editable")};
f.isDomWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-widget")};f.isDomWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-wrapper")};f.isDomWidget=function(a){return a?this.isDomWidgetWrapper(a)||this.isDomWidgetElement(a):!1};f.isParserWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-widget"]};f.isParserWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-cke-widget-wrapper"]};
f.WRAPPER_CLASS_PREFIX="cke_widget_wrapper_";b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype),{setData:function(a){this._.initialSetData||this.editor.widgets.destroyAll(!1,this);this._.initialSetData=!1;a=this.editor.dataProcessor.toHtml(a,{context:this.getName(),filter:this.filter,enterMode:this.enterMode});this.setHtml(a);this.editor.widgets.initOnAll(this)},getData:function(){return this.editor.dataProcessor.toDataFormat(this.getHtml(),{context:this.getName(),
filter:this.filter,enterMode:this.enterMode})}});var ca=/^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,V={37:1,38:1,39:1,40:1,8:1,46:1};V[CKEDITOR.SHIFT+121]=1;CKEDITOR.plugins.widget=f;f.repository=a;f.nestedEditable=b}(),function(){function a(a,c,d){this.editor=
a;this.notification=null;this._message=new CKEDITOR.template(c);this._singularMessage=d?new CKEDITOR.template(d):null;this._tasks=[];this._doneTasks=this._doneWeights=this._totalWeights=0}function f(a){this._weight=a||1;this._doneWeight=0;this._isCanceled=!1}CKEDITOR.plugins.add("notificationaggregator",{requires:"notification"});a.prototype={createTask:function(a){a=a||{};var c=!this.notification,d;c&&(this.notification=this._createNotification());d=this._addTask(a);d.on("updated",this._onTaskUpdate,
this);d.on("done",this._onTaskDone,this);d.on("canceled",function(){this._removeTask(d)},this);this.update();c&&this.notification.show();return d},update:function(){this._updateNotification();this.isFinished()&&this.fire("finished")},getPercentage:function(){return 0===this.getTaskCount()?1:this._doneWeights/this._totalWeights},isFinished:function(){return this.getDoneTaskCount()===this.getTaskCount()},getTaskCount:function(){return this._tasks.length},getDoneTaskCount:function(){return this._doneTasks},
_updateNotification:function(){this.notification.update({message:this._getNotificationMessage(),progress:this.getPercentage()})},_getNotificationMessage:function(){var a=this.getTaskCount(),c={current:this.getDoneTaskCount(),max:a,percentage:Math.round(100*this.getPercentage())};return(1==a&&this._singularMessage?this._singularMessage:this._message).output(c)},_createNotification:function(){return new CKEDITOR.plugins.notification(this.editor,{type:"progress"})},_addTask:function(a){a=new f(a.weight);
this._tasks.push(a);this._totalWeights+=a._weight;return a},_removeTask:function(a){var c=CKEDITOR.tools.indexOf(this._tasks,a);-1!==c&&(a._doneWeight&&(this._doneWeights-=a._doneWeight),this._totalWeights-=a._weight,this._tasks.splice(c,1),this.update())},_onTaskUpdate:function(a){this._doneWeights+=a.data;this.update()},_onTaskDone:function(){this._doneTasks+=1;this.update()}};CKEDITOR.event.implementOn(a.prototype);f.prototype={done:function(){this.update(this._weight)},update:function(a){if(!this.isDone()&&
!this.isCanceled()){a=Math.min(this._weight,a);var c=a-this._doneWeight;this._doneWeight=a;this.fire("updated",c);this.isDone()&&this.fire("done")}},cancel:function(){this.isDone()||this.isCanceled()||(this._isCanceled=!0,this.fire("canceled"))},isDone:function(){return this._weight===this._doneWeight},isCanceled:function(){return this._isCanceled}};CKEDITOR.event.implementOn(f.prototype);CKEDITOR.plugins.notificationAggregator=a;CKEDITOR.plugins.notificationAggregator.task=f}(),"use strict",function(){CKEDITOR.plugins.add("uploadwidget",
{requires:"widget,clipboard,filetools,notificationaggregator",init:function(a){a.filter.allow("*[!data-widget,!data-cke-upload-id]")},isSupportedEnvironment:function(){return CKEDITOR.plugins.clipboard.isFileApiSupported}});CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools,{addUploadWidget:function(a,f,b){var c=CKEDITOR.fileTools,d=a.uploadRepository,l=b.supportedTypes?10:20;if(b.fileToElement)a.on("paste",function(b){b=b.data;var g=a.widgets.registered[f],h=b.dataTransfer,
l=h.getFilesCount(),e=g.loadMethod||"loadAndUpload",n,q;if(!b.dataValue&&l)for(q=0;q<l;q++)if(n=h.getFile(q),!g.supportedTypes||c.isTypeSupported(n,g.supportedTypes)){var y=g.fileToElement(n);n=d.create(n,void 0,g.loaderType);y&&(n[e](g.uploadUrl,g.additionalRequestParameters),CKEDITOR.fileTools.markElement(y,f,n.id),"loadAndUpload"!=e&&"upload"!=e||g.skipNotifications||CKEDITOR.fileTools.bindNotifications(a,n),b.dataValue+=y.getOuterHtml())}},null,null,l);CKEDITOR.tools.extend(b,{downcast:function(){return new CKEDITOR.htmlParser.text("")},
init:function(){var b=this,c=this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),f=d.loaders[c],l=CKEDITOR.tools.capitalize,e,n;f.on("update",function(d){if("abort"===f.status&&"function"===typeof b.onAbort)b.onAbort(f);if(b.wrapper&&b.wrapper.getParent()){a.fire("lockSnapshot");d="on"+l(f.status);if("abort"===f.status||"function"!==typeof b[d]||!1!==b[d](f))n="cke_upload_"+f.status,b.wrapper&&n!=e&&(e&&b.wrapper.removeClass(e),b.wrapper.addClass(n),e=n),"error"!=f.status&&"abort"!=
f.status||a.widgets.del(b);a.fire("unlockSnapshot")}else CKEDITOR.instances[a.name]&&a.editable().find('[data-cke-upload-id\x3d"'+c+'"]').count()||f.abort(),d.removeListener()});f.update()},replaceWith:function(b,c){if(""===b.trim())a.widgets.del(this);else{var d=this==a.widgets.focused,f=a.editable(),e=a.createRange(),l,q;d||(q=a.getSelection().createBookmarks());e.setStartBefore(this.wrapper);e.setEndAfter(this.wrapper);d&&(l=e.createBookmark());f.insertHtmlIntoRange(b,e,c);a.widgets.checkWidgets({initOnlyNew:!0});
a.widgets.destroy(this,!0);d?(e.moveToBookmark(l),e.select()):a.getSelection().selectBookmarks(q)}},_getLoader:function(){var a=this.wrapper.findOne("[data-cke-upload-id]");return a?this.editor.uploadRepository.loaders[a.data("cke-upload-id")]:null}});a.widgets.add(f,b)},markElement:function(a,f,b){a.setAttributes({"data-cke-upload-id":b,"data-widget":f})},bindNotifications:function(a,f){function b(){c=a._.uploadWidgetNotificaionAggregator;if(!c||c.isFinished())c=a._.uploadWidgetNotificaionAggregator=
new CKEDITOR.plugins.notificationAggregator(a,a.lang.uploadwidget.uploadMany,a.lang.uploadwidget.uploadOne),c.once("finished",function(){var b=c.getTaskCount();0===b?c.notification.hide():c.notification.update({message:1==b?a.lang.uploadwidget.doneOne:a.lang.uploadwidget.doneMany.replace("%1",b),type:"success",important:1})})}var c,d=null;f.on("update",function(){!d&&f.uploadTotal&&(b(),d=c.createTask({weight:f.uploadTotal}));d&&"uploading"==f.status&&d.update(f.uploaded)});f.on("uploaded",function(){d&&
d.done()});f.on("error",function(){d&&d.cancel();a.showNotification(f.message,"warning")});f.on("abort",function(){d&&d.cancel();CKEDITOR.instances[a.name]&&a.showNotification(a.lang.uploadwidget.abort,"info")})}})}(),"use strict",function(){function a(a){9>=a&&(a="0"+a);return String(a)}function f(c){var d=new Date,d=[d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()];b+=1;return"image-"+CKEDITOR.tools.array.map(d,a).join("")+"-"+b+"."+c}var b=0;CKEDITOR.plugins.add("uploadimage",
{requires:"uploadwidget",onLoad:function(){CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}")},isSupportedEnvironment:function(){return CKEDITOR.plugins.clipboard.isFileApiSupported},init:function(a){if(this.isSupportedEnvironment()){var b=CKEDITOR.fileTools,l=b.getUploadUrl(a.config,"image");l&&(b.addUploadWidget(a,"uploadimage",{supportedTypes:/image\/(jpeg|png|gif|bmp)/,uploadUrl:l,fileToElement:function(){var a=new CKEDITOR.dom.element("img");a.setAttribute("src","data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d");
return a},parts:{img:"img"},onUploading:function(a){this.parts.img.setAttribute("src",a.data)},onUploaded:function(a){var b=this.parts.img.$;this.replaceWith('\x3cimg src\x3d"'+a.url+'" width\x3d"'+(a.responseData.width||b.naturalWidth)+'" height\x3d"'+(a.responseData.height||b.naturalHeight)+'"\x3e')}}),a.on("paste",function(k){if(k.data.dataValue.match(/<img[\s\S]+data:/i)){k=k.data;var g=document.implementation.createHTMLDocument(""),g=new CKEDITOR.dom.element(g.body),h,m,e;g.data("cke-editable",
1);g.appendHtml(k.dataValue);h=g.find("img");for(e=0;e<h.count();e++){m=h.getItem(e);var n=m.getAttribute("src"),q=n&&"data:"==n.substring(0,5),y=null===m.data("cke-realelement");q&&y&&!m.data("cke-upload-id")&&!m.isReadOnly(1)&&(q=(q=n.match(/image\/([a-z]+?);/i))&&q[1]||"jpg",n=a.uploadRepository.create(n,f(q)),n.upload(l),b.markElement(m,"uploadimage",n.id),b.bindNotifications(a,n))}k.dataValue=g.getHtml()}}))}}})}(),CKEDITOR.plugins.add("wsc",{requires:"dialog",parseApi:function(a){a.config.wsc_onFinish=
"function"===typeof a.config.wsc_onFinish?a.config.wsc_onFinish:function(){};a.config.wsc_onClose="function"===typeof a.config.wsc_onClose?a.config.wsc_onClose:function(){}},parseConfig:function(a){a.config.wsc_customerId=a.config.wsc_customerId||CKEDITOR.config.wsc_customerId||"1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";a.config.wsc_customDictionaryIds=a.config.wsc_customDictionaryIds||CKEDITOR.config.wsc_customDictionaryIds||"";a.config.wsc_userDictionaryName=a.config.wsc_userDictionaryName||
CKEDITOR.config.wsc_userDictionaryName||"";a.config.wsc_customLoaderScript=a.config.wsc_customLoaderScript||CKEDITOR.config.wsc_customLoaderScript;a.config.wsc_interfaceLang=a.config.wsc_interfaceLang;CKEDITOR.config.wsc_cmd=a.config.wsc_cmd||CKEDITOR.config.wsc_cmd||"spell";CKEDITOR.config.wsc_version="v4.3.0-master-d769233";CKEDITOR.config.wsc_removeGlobalVariable=!0},onLoad:function(a){"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path+
"skins/"+CKEDITOR.skin.name+"/wsc.css"))},init:function(a){var f=CKEDITOR.env;this.parseConfig(a);this.parseApi(a);a.addCommand("checkspell",new CKEDITOR.dialogCommand("checkspell")).modes={wysiwyg:!CKEDITOR.env.opera&&!CKEDITOR.env.air&&document.domain==window.location.hostname&&!(f.ie&&(8>f.version||f.quirks))};"undefined"==typeof a.plugins.scayt&&a.ui.addButton&&a.ui.addButton("SpellChecker",{label:a.lang.wsc.toolbar,click:function(a){var c=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():
a.document.getBody().getText();(c=c.replace(/\s/g,""))?a.execCommand("checkspell"):alert("Nothing to check!")},toolbar:"spellchecker,10"});CKEDITOR.dialog.add("checkspell",this.path+(CKEDITOR.env.ie&&7>=CKEDITOR.env.version?"dialogs/wsc_ie.js":window.postMessage?"dialogs/wsc.js":"dialogs/wsc_ie.js"))}}),function(){function a(a){function b(a){var c=!1;e.attachListener(e,"keydown",function(){var b=g.getBody().getElementsByTag(a);if(!c){for(var d=0;d<b.count();d++)b.getItem(d).setCustomData("retain",
!0);c=!0}},null,null,1);e.attachListener(e,"keyup",function(){var b=g.getElementsByTag(a);c&&(1==b.count()&&!b.getItem(0).getCustomData("retain")&&CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes())&&b.getItem(0).remove(1),c=!1)})}var c=this.editor,g=a.document,h=g.body,m=g.getElementById("cke_actscrpt");m&&m.parentNode.removeChild(m);(m=g.getElementById("cke_shimscrpt"))&&m.parentNode.removeChild(m);(m=g.getElementById("cke_basetagscrpt"))&&m.parentNode.removeChild(m);h.contentEditable=!0;CKEDITOR.env.ie&&
(h.hideFocus=!0,h.disabled=!0,h.removeAttribute("disabled"));delete this._.isLoadingData;this.$=h;g=new CKEDITOR.dom.document(g);this.setup();this.fixInitialSelection();var e=this;CKEDITOR.env.ie&&!CKEDITOR.env.edge&&g.getDocumentElement().addClass(g.$.compatMode);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&c.enterMode!=CKEDITOR.ENTER_P?b("p"):CKEDITOR.env.edge&&15>CKEDITOR.env.version&&c.enterMode!=CKEDITOR.ENTER_DIV&&b("div");if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&10<CKEDITOR.env.version)g.getDocumentElement().on("mousedown",
function(a){a.data.getTarget().is("html")&&setTimeout(function(){c.editable().focus()})});f(c);try{c.document.$.execCommand("2D-position",!1,!0)}catch(n){}(CKEDITOR.env.gecko||CKEDITOR.env.ie&&"CSS1Compat"==c.document.$.compatMode)&&this.attachListener(this,"keydown",function(a){var b=a.data.getKeystroke();if(33==b||34==b)if(CKEDITOR.env.ie)setTimeout(function(){c.getSelection().scrollIntoView()},0);else if(c.window.$.innerHeight>this.$.offsetHeight){var d=c.createRange();d[33==b?"moveToElementEditStart":
"moveToElementEditEnd"](this);d.select();a.data.preventDefault()}});CKEDITOR.env.ie&&this.attachListener(g,"blur",function(){try{g.$.selection.empty()}catch(a){}});CKEDITOR.env.iOS&&this.attachListener(g,"touchend",function(){a.focus()});h=c.document.getElementsByTag("title").getItem(0);h.data("cke-title",h.getText());CKEDITOR.env.ie&&(c.document.$.title=this._.docTitle);CKEDITOR.tools.setTimeout(function(){"unloaded"==this.status&&(this.status="ready");c.fire("contentDom");this._.isPendingFocus&&
(c.focus(),this._.isPendingFocus=!1);setTimeout(function(){c.fire("dataReady")},0)},0,this)}function f(a){function b(){var f;a.editable().attachListener(a,"selectionChange",function(){var b=a.getSelection().getSelectedElement();b&&(f&&(f.detachEvent("onresizestart",c),f=null),b.$.attachEvent("onresizestart",c),f=b.$)})}function c(a){a.returnValue=!1}if(CKEDITOR.env.gecko)try{var f=a.document.$;f.execCommand("enableObjectResizing",!1,!a.config.disableObjectResizing);f.execCommand("enableInlineTableEditing",
!1,!a.config.disableNativeTableHandles)}catch(h){}else CKEDITOR.env.ie&&11>CKEDITOR.env.version&&a.config.disableObjectResizing&&b(a)}function b(){var a=[];if(8<=CKEDITOR.document.$.documentMode){a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");var b=[],c;for(c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat "+c+"[contenteditable\x3dfalse]");a.push(b.join(",")+"{display:inline-block}")}else CKEDITOR.env.gecko&&(a.push("html{height:100% !important}"),a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
a.push("html{cursor:text;*cursor:auto}");a.push("img,input,textarea{cursor:default}");return a.join("\n")}var c;CKEDITOR.plugins.add("wysiwygarea",{init:function(a){a.config.fullPage&&a.addFeature({allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",requiredContent:"body"});a.addMode("wysiwyg",function(b){function f(e){e&&e.removeListener();a.editable(new c(a,h.$.contentWindow.document.body));a.setData(a.getData(1),b)}var g="document.open();"+(CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+
")();":"")+"document.close();",g=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie&&!CKEDITOR.env.edge?"javascript:void(function(){"+encodeURIComponent(g)+"}())":"",h=CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"'+g+'" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');h.setStyles({width:"100%",height:"100%"});h.addClass("cke_wysiwyg_frame").addClass("cke_reset");g=a.ui.space("contents");g.append(h);var m=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.gecko;if(m)h.on("load",f);var e=a.title,
n=a.fire("ariaEditorHelpLabel",{}).label;e&&(CKEDITOR.env.ie&&n&&(e+=", "+n),h.setAttribute("title",e));if(n){var e=CKEDITOR.tools.getNextId(),q=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+e+'" class\x3d"cke_voice_label"\x3e'+n+"\x3c/span\x3e");g.append(q,1);h.setAttribute("aria-describedby",e)}a.on("beforeModeUnload",function(a){a.removeListener();q&&q.remove()});h.setAttributes({tabIndex:a.tabIndex,allowTransparency:"true"});!m&&f();a.fire("ariaWidget",h)})}});CKEDITOR.editor.prototype.addContentsCss=
function(a){var b=this.config,c=b.contentsCss;CKEDITOR.tools.isArray(c)||(b.contentsCss=c?[c]:[]);b.contentsCss.push(a)};c=CKEDITOR.tools.createClass({$:function(){this.base.apply(this,arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(b){CKEDITOR.tools.setTimeout(a,0,this,b)},this);this._.docTitle=this.getWindow().getFrame().getAttribute("title")},base:CKEDITOR.editable,proto:{setData:function(a,c){var f=this.editor;if(c)this.setHtml(a),this.fixInitialSelection(),f.fire("dataReady");
else{this._.isLoadingData=!0;f._.dataStore={id:1};var g=f.config,h=g.fullPage,m=g.docType,e=CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/,'\x3cstyle data-cke-temp\x3d"1"\x3e');h||(e+=CKEDITOR.tools.buildStyleHtml(f.config.contentsCss));var n=g.baseHref?'\x3cbase href\x3d"'+g.baseHref+'" data-cke-temp\x3d"1" /\x3e':"";h&&(a=a.replace(/<!DOCTYPE[^>]*>/i,function(a){f.docType=m=a;return""}).replace(/<\?xml\s[^\?]*\?>/i,function(a){f.xmlDeclaration=a;return""}));a=f.dataProcessor.toHtml(a);h?(/<body[\s|>]/.test(a)||
(a="\x3cbody\x3e"+a),/<html[\s|>]/.test(a)||(a="\x3chtml\x3e"+a+"\x3c/html\x3e"),/<head[\s|>]/.test(a)?/<title[\s|>]/.test(a)||(a=a.replace(/<head[^>]*>/,"$\x26\x3ctitle\x3e\x3c/title\x3e")):a=a.replace(/<html[^>]*>/,"$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),n&&(a=a.replace(/<head[^>]*?>/,"$\x26"+n)),a=a.replace(/<\/head\s*>/,e+"$\x26"),a=m+a):a=g.docType+'\x3chtml dir\x3d"'+g.contentsLangDirection+'" lang\x3d"'+(g.contentsLanguage||f.langCode)+'"\x3e\x3chead\x3e\x3ctitle\x3e'+
this._.docTitle+"\x3c/title\x3e"+n+e+"\x3c/head\x3e\x3cbody"+(g.bodyId?' id\x3d"'+g.bodyId+'"':"")+(g.bodyClass?' class\x3d"'+g.bodyClass+'"':"")+"\x3e"+a+"\x3c/body\x3e\x3c/html\x3e";CKEDITOR.env.gecko&&(a=a.replace(/<body/,'\x3cbody contenteditable\x3d"true" '),2E4>CKEDITOR.env.version&&(a=a.replace(/<body[^>]*>/,"$\x26\x3c!-- cke-content-start --\x3e")));g='\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"'+(CKEDITOR.env.ie?' defer\x3d"defer" ':"")+"\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction("+
this._.frameLoadedHandler+",window);wasLoaded\x3d1;}"+(CKEDITOR.env.ie?"onload();":'document.addEventListener("DOMContentLoaded", onload, false );')+"\x3c/script\x3e";CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(g+='\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');n&&CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(g+='\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
a=a.replace(/(?=\s*<\/(:?head)>)/,g);this.clearCustomData();this.clearListeners();f.fire("contentDomUnload");var q=this.getDocument();try{q.write(a)}catch(y){setTimeout(function(){q.write(a)},0)}}},getData:function(a){if(a)return this.getHtml();a=this.editor;var b=a.config,c=b.fullPage,f=c&&a.docType,h=c&&a.xmlDeclaration,m=this.getDocument(),c=c?m.getDocumentElement().getOuterHtml():m.getBody().getHtml();CKEDITOR.env.gecko&&b.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/<br>(?=\s*(:?$|<\/body>))/,
""));c=a.dataProcessor.toDataFormat(c);h&&(c=h+"\n"+c);f&&(c=f+"\n"+c);return c},focus:function(){this._.isLoadingData?this._.isPendingFocus=!0:c.baseProto.focus.call(this)},detach:function(){var a=this.editor,b=a.document,f;try{f=a.window.getFrame()}catch(g){}c.baseProto.detach.call(this);this.clearCustomData();b.getDocumentElement().clearCustomData();CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);f&&f.getParent()?(f.clearCustomData(),(a=f.removeCustomData("onResize"))&&a.removeListener(),
f.remove()):CKEDITOR.warn("editor-destroy-iframe")}}})}(),CKEDITOR.config.disableObjectResizing=!1,CKEDITOR.config.disableNativeTableHandles=!0,CKEDITOR.config.disableNativeSpellChecker=!0,CKEDITOR.config.plugins="dialogui,dialog,a11yhelp,about,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filetools,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",
CKEDITOR.config.skin="moono-lisa",function(){var a=function(a,b){var c=CKEDITOR.getUrl("plugins/"+b);a=a.split(",");for(var d=0;d<a.length;d++)CKEDITOR.skin.icons[a[d]]={path:c,offset:-a[++d],bgsize:a[++d]}};CKEDITOR.env.hidpi?a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,emojipanel,768,,find-rtl,792,,find,816,,replace,840,,flash,864,,button,888,,checkbox,912,,form,936,,hiddenfield,960,,imagebutton,984,,radio,1008,,select-rtl,1032,,select,1056,,textarea-rtl,1080,,textarea,1104,,textfield-rtl,1128,,textfield,1152,,horizontalrule,1176,,iframe,1200,,image,1224,,indent-rtl,1248,,indent,1272,,outdent-rtl,1296,,outdent,1320,,justifyblock,1344,,justifycenter,1368,,justifyleft,1392,,justifyright,1416,,language,1440,,anchor-rtl,1464,,anchor,1488,,link,1512,,unlink,1536,,bulletedlist-rtl,1560,,bulletedlist,1584,,numberedlist-rtl,1608,,numberedlist,1632,,mathjax,1656,,maximize,1680,,newpage-rtl,1704,,newpage,1728,,pagebreak-rtl,1752,,pagebreak,1776,,pastefromword-rtl,1800,,pastefromword,1824,,pastetext-rtl,1848,,pastetext,1872,,placeholder,1896,,preview-rtl,1920,,preview,1944,,print,1968,,removeformat,1992,,save,2016,,scayt,2040,,selectall,2064,,showblocks-rtl,2088,,showblocks,2112,,smiley,2136,,source-rtl,2160,,source,2184,,sourcedialog-rtl,2208,,sourcedialog,2232,,specialchar,2256,,table,2280,,templates-rtl,2304,,templates,2328,,uicolor,2352,,redo-rtl,2376,,redo,2400,,undo-rtl,2424,,undo,2448,,simplebox,4944,auto,spellchecker,2496,",
"icons_hidpi.png"):a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,emojipanel,768,auto,find-rtl,792,auto,find,816,auto,replace,840,auto,flash,864,auto,button,888,auto,checkbox,912,auto,form,936,auto,hiddenfield,960,auto,imagebutton,984,auto,radio,1008,auto,select-rtl,1032,auto,select,1056,auto,textarea-rtl,1080,auto,textarea,1104,auto,textfield-rtl,1128,auto,textfield,1152,auto,horizontalrule,1176,auto,iframe,1200,auto,image,1224,auto,indent-rtl,1248,auto,indent,1272,auto,outdent-rtl,1296,auto,outdent,1320,auto,justifyblock,1344,auto,justifycenter,1368,auto,justifyleft,1392,auto,justifyright,1416,auto,language,1440,auto,anchor-rtl,1464,auto,anchor,1488,auto,link,1512,auto,unlink,1536,auto,bulletedlist-rtl,1560,auto,bulletedlist,1584,auto,numberedlist-rtl,1608,auto,numberedlist,1632,auto,mathjax,1656,auto,maximize,1680,auto,newpage-rtl,1704,auto,newpage,1728,auto,pagebreak-rtl,1752,auto,pagebreak,1776,auto,pastefromword-rtl,1800,auto,pastefromword,1824,auto,pastetext-rtl,1848,auto,pastetext,1872,auto,placeholder,1896,auto,preview-rtl,1920,auto,preview,1944,auto,print,1968,auto,removeformat,1992,auto,save,2016,auto,scayt,2040,auto,selectall,2064,auto,showblocks-rtl,2088,auto,showblocks,2112,auto,smiley,2136,auto,source-rtl,2160,auto,source,2184,auto,sourcedialog-rtl,2208,auto,sourcedialog,2232,auto,specialchar,2256,auto,table,2280,auto,templates-rtl,2304,auto,templates,2328,auto,uicolor,2352,auto,redo-rtl,2376,auto,redo,2400,auto,undo-rtl,2424,auto,undo,2448,auto,simplebox,2472,auto,spellchecker,2496,auto",
"icons.png")}())})();

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");
var _ckeditor = __webpack_require__(/*! ckeditor */ "./node_modules/ckeditor/ckeditor.js");
// Add this line

// Make it globally available (optional, but helps with blade scripts)
window.ClassicEditor = _ckeditor.ClassicEditor;

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
window.axios = _axios.default;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;