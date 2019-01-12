// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"createTheme/ants/readJson.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJsonAnt = readJsonAnt;

var _path = require("path");

var _fs = require("fs");

const BASE = (0, _path.resolve)(__dirname, '..');

function readJsonAnt(filePath) {
  const resolvedPath = (0, _path.resolve)(BASE, filePath);
  const content = (0, _fs.readFileSync)(resolvedPath).toString();
  return JSON.parse(content);
}
},{}],"createTheme/ants/gradStop.js":[function(require,module,exports) {
!function a(b, c, d) {
  function e(g, h) {
    if (!c[g]) {
      if (!b[g]) {
        const i = typeof require === 'function' && require;

        if (!h && i) {
          return i(g, !0);
        }

        if (f) {
          return f(g, !0);
        }

        const j = new Error('Cannot find module \'' + g + '\'');
        throw j.code = 'MODULE_NOT_FOUND', j;
      }

      const k = c[g] = {
        exports: {}
      };
      b[g][0].call(k.exports, a => {
        const c = b[g][1][a];
        return e(c ? c : a);
      }, k, k.exports, a, b, c, d);
    }

    return c[g].exports;
  }

  for (var f = typeof require === 'function' && require, g = 0; g < d.length; g++) {
    e(d[g]);
  }

  return e;
}({
  1: [function (a, b, c) {
    'use strict';

    Object.defineProperty(c, '__esModule', {
      value: !0
    });
    const d = {
      inputFormat: 'hex',
      stops: 5,
      colorArray: ['#fff', '#000']
    };
    c.default = d;
  }, {}],
  2: [function (a, b, c) {
    (function (b) {
      'use strict';

      function c(a) {
        return a && a.__esModule ? a : {
          default: a
        };
      }

      let d = function () {
        function a(a, b) {
          let c = [],
              d = !0,
              e = !1,
              f = void 0;

          try {
            for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0) {
              ;
            }
          } catch (a) {
            e = !0, f = a;
          } finally {
            try {
              !d && h.return && h.return();
            } finally {
              if (e) {
                throw f;
              }
            }
          }

          return c;
        }

        return function (b, c) {
          if (Array.isArray(b)) {
            return b;
          }

          if (Symbol.iterator in Object(b)) {
            return a(b, c);
          }

          throw new TypeError('Invalid attempt to destructure non-iterable instance');
        };
      }(),
          e = a('./polyfill'),
          f = a('./utils'),
          g = a('./defaultOptions'),
          h = c(g);

      !function (a) {
        function b(a) {
          if (a = (0, e.objectAssign)({}, this.options, a), a.stops < a.colorArray.length) {
            throw 'Number of stops cannot be less than colorArray.length';
          }

          return this.computeStops(a);
        }

        b.prototype.options = h.default, b.prototype.computeStops = function (a) {
          let b = [],
              c = function (a) {
            switch (a.inputFormat) {
              case 'hex':
                return (0, f.extractHEX)(a.colorArray);

              case 'rgb':
                return (0, f.extractRGB)(a.colorArray);

              case 'hsl':
                return (0, f.extractHSL)(a.colorArray);
            }
          },
              e = function (a) {
            for (let c = a.colorArray, e = 1 / (a.stops - 1), g = 0, h = 0; h < a.stops; h++) {
              if (a.inputFormat == 'hex' || a.inputFormat == 'rgb') {
                let i = (0, f.propBezInterpolate)(['r', 'g', 'b'])(c)(g),
                    j = d(i, 3),
                    k = j[0],
                    l = j[1],
                    m = j[2];
                b.push((0, f.returnRGBStr)([k, l, m]));
              } else if (a.inputFormat == 'hsl') {
                let n = (0, f.propBezInterpolate)(['h', 's', 'l'])(c)(g),
                    o = d(n, 3),
                    p = o[0],
                    q = o[1],
                    r = o[2];
                b.push((0, f.returnHSLStr)([p, q, r]));
              }

              g += e;
            }
          };

          return a.colorArray = c(a), e(a), b;
        }, a.gradStop = function (a) {
          return new b(a);
        };
      }(typeof window !== 'undefined' ? window : b);
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
  }, {
    './defaultOptions': 1,
    './polyfill': 3,
    './utils': 4
  }],
  3: [function (a, b, c) {
    'use strict';

    Object.defineProperty(c, '__esModule', {
      value: !0
    });
    c.mathTrunc = function () {
      return Math.trunc ? Math.trunc : function (a) {
        return a === 0 ? a : a < 0 ? Math.ceil(a) : Math.floor(a);
      };
    }(), c.objectAssign = function () {
      return Object.assign ? Object.assign : function (a) {
        if (void 0 === a || a === null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        for (var b = Object(a), c = 1; c < arguments.length; c++) {
          const d = arguments[c];

          if (void 0 !== d && d !== null) {
            for (const e in d) {
              d.hasOwnProperty(e) && (b[e] = d[e]);
            }
          }
        }

        return b;
      };
    }();
  }, {}],
  4: [function (a, b, c) {
    'use strict';

    Object.defineProperty(c, '__esModule', {
      value: !0
    }), c.returnHSLStr = c.returnRGBStr = c.extractHSL = c.extractRGB = c.extractHEX = c.propBezInterpolate = void 0;

    let d = function () {
      function a(a, b) {
        let c = [],
            d = !0,
            e = !1,
            f = void 0;

        try {
          for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0) {
            ;
          }
        } catch (a) {
          e = !0, f = a;
        } finally {
          try {
            !d && h.return && h.return();
          } finally {
            if (e) {
              throw f;
            }
          }
        }

        return c;
      }

      return function (b, c) {
        if (Array.isArray(b)) {
          return b;
        }

        if (Symbol.iterator in Object(b)) {
          return a(b, c);
        }

        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      };
    }(),
        e = a('./polyfill'),
        f = function (a) {
      let b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),
          c = b.map(a => parseInt(a, 16)),
          e = d(c, 4),
          f = e[1],
          g = e[2],
          h = e[3];
      return b ? {
        r: f,
        g: g,
        b: h
      } : null;
    },
        g = function (a, b, c) {
      return a.split('').slice(b, c).join('');
    },
        h = function (a) {
      return a.map(a => a.length === 4 ? '#' + (a[1] + a[1] + a[2] + a[2] + a[3] + a[3]) : a.length === 7 ? a : void 0);
    };

    c.propBezInterpolate = function (a) {
      return function (b) {
        return function (c) {
          let d = 1 - c,
              f = void 0;
          return a.map(a => b.length == 2 ? f = d * b[0][a] + c * b[1][a] : b.length == 3 ? f = Math.pow(d, 2) * b[0][a] + 2 * d * c * b[1][a] + Math.pow(c, 2) * b[2][a] : b.length == 4 && (f = Math.pow(d, 3) * b[0][a] + 3 * Math.pow(d, 2) * c * b[1][a] + 3 * d * Math.pow(c, 2) * b[2][a] + Math.pow(c, 3) * b[3][a]), (0, e.mathTrunc)(f));
        };
      };
    }, c.extractHEX = function (a) {
      return h(a).map(a => f(a));
    }, c.extractRGB = function (a) {
      return a.map(a => {
        let b = g(a, 4, -1).split(','),
            c = d(b, 3),
            e = c[0],
            f = c[1],
            h = c[2];
        return {
          r: e,
          g: f,
          b: h
        };
      });
    }, c.extractHSL = function (a) {
      return a.map(a => {
        a = g(a, 4, -1).split(',');
        let b = a[0],
            c = g(a[1], 0, -1),
            d = g(a[2], 0, -1);
        return {
          h: b,
          s: c,
          l: d
        };
      });
    }, c.returnRGBStr = function (a) {
      return 'rgb(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
    }, c.returnHSLStr = function (a) {
      return 'hsl(' + a[0] + ', ' + a[1] + '%, ' + a[2] + '%)';
    };
  }, {
    './polyfill': 3
  }]
}, {}, [1, 2, 3, 4]);
},{}],"createTheme/bees/getGradient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGradientBee = getGradientBee;

var _rambdax = require("rambdax");

require('../ants/gradStop');

const rgbHex = require('rgb-hex');

const parseGradient = input => {
  const str = (0, _rambdax.replace)(/rgb\(|\)/g, '', input);
  return (0, _rambdax.map)(val => Number(val.trim()), (0, _rambdax.split)(',', str));
};

function getGradientBee(from, to, levels = 5) {
  let gradient;

  try {
    gradient = gradStop({
      stops: levels,
      inputFormat: 'hex',
      colorArray: [from, to]
    });
  } catch (e) {
    console.log({
      from,
      to
    });
    throw e;
  }

  gradient = gradient.map(val => parseGradient(val));
  gradient = gradient.map(val => `#${rgbHex(...val)}`);
  return gradient;
}
},{"../ants/gradStop":"createTheme/ants/gradStop.js"}],"createTheme/bees/createTheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createThemeBee = createThemeBee;

var _rambdax = require("rambdax");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createThemeBee(rules, originTheme) {
  const keys = Object.keys(rules);
  return (0, _rambdax.range)(0, rules[keys[0]].length).map(i => {
    const newThemeColors = {};
    keys.forEach(path => {
      newThemeColors[path] = rules[path][i];
    });
    return _objectSpread({}, originTheme, {
      colors: _objectSpread({}, originTheme.colors, newThemeColors)
    });
  });
}
},{}],"createTheme/ants/writeJson.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeJsonAnt = writeJsonAnt;

var _path = require("path");

var _fs = require("fs");

const BASE = (0, _path.resolve)(__dirname, '..');

function writeJsonAnt(filePath, obj) {
  const resolvedPath = (0, _path.resolve)(BASE, filePath);
  (0, _fs.writeFileSync)(resolvedPath, JSON.stringify(obj, null, 2));
}
},{}],"createTheme/bees/saveTheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveThemeBee = saveThemeBee;

var _writeJson = require("../ants/writeJson");

var _stringFn = require("string-fn");

const namesHash = ['baboon', 'bear', 'bee', 'bull', 'butterfly', 'cell', 'deep'];

function saveThemeBee(theme, i) {
  const label = (0, _stringFn.titleCase)(namesHash[i]);
  (0, _writeJson.writeJsonAnt)(`./src/createTheme/output/${label}.json`, theme);
  return label;
}
},{"../ants/writeJson":"createTheme/ants/writeJson.js"}],"createTheme/bees/publishTheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishTheme = publishTheme;

var _stringFn = require("string-fn");

var _readJson = require("../ants/readJson");

var _writeJson = require("../ants/writeJson");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function publishTheme(source, label, base) {
  const name = (0, _stringFn.pascalCase)(`${base}.${label}`);
  const theme = (0, _readJson.readJsonAnt)(source);
  (0, _writeJson.writeJsonAnt)(`./themes/${name}.json`, _objectSpread({}, theme, {
    name
  }));
  return name;
}
},{"../ants/readJson":"createTheme/ants/readJson.js","../ants/writeJson":"createTheme/ants/writeJson.js"}],"createTheme/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTheme = createTheme;

var _rambdax = require("rambdax");

var _readJson = require("./ants/readJson");

var _getGradient = require("./bees/getGradient");

var _createTheme = require("./bees/createTheme");

var _saveTheme = require("./bees/saveTheme");

var _publishTheme = require("./bees/publishTheme");

function createTheme({
  filePath,
  rules,
  levels = 5,
  mode = 'light',
  base = false,
  labels
}) {
  (0, _rambdax.ok)(_readJson.readJsonAnt, rules)(String, Object);
  const originTheme = (0, _readJson.readJsonAnt)(filePath);
  const rulesWithColors = (0, _rambdax.map)(([from, to]) => (0, _getGradient.getGradientBee)(from, to, levels), rules);
  console.log({
    rulesWithColors
  });
  const newThemes = (0, _createTheme.createThemeBee)(rulesWithColors, originTheme);
  const tempLabels = newThemes.map(_saveTheme.saveThemeBee);
  const partialJson = tempLabels.map(label => ({
    label: `Ant${label}`,
    uiTheme: mode === 'light' ? 'vs' : 'vs-dark',
    path: `./src/createTheme/output/${label}.json`
  }));

  if (!base) {
    return console.log(JSON.stringify(partialJson, null, 2));
  }

  const exportedLabels = labels.map((label, i) => (0, _publishTheme.publishTheme)(partialJson[i].path, label, base));
  console.log({
    exportedLabels
  });
  const packageJsonPartial = exportedLabels.map(label => ({
    label,
    uiTheme: mode === 'light' ? 'vs' : 'vs-dark',
    path: `./themes/${label}.json`
  }));
  console.log(JSON.stringify(packageJsonPartial, null, 2));
}
},{"./ants/readJson":"createTheme/ants/readJson.js","./bees/getGradient":"createTheme/bees/getGradient.js","./bees/createTheme":"createTheme/bees/createTheme.js","./bees/saveTheme":"createTheme/bees/saveTheme.js","./bees/publishTheme":"createTheme/bees/publishTheme.js"}],"createTheme/prove.js":[function(require,module,exports) {
"use strict";

var _ = require("./");

const filePath = './themes/izorra.json';
const rules = {
  'editor.wordHighlightBackground': ['#DDE6E0', '#E2E4F8'],
  'editor.selectionBackground': ['#DDE6E0', '#fafafa'],
  'editor.selectionHighlightBackground': ['#87A190', '#faaaaa'],
  'editor.background': ['#f2ebe3', '#E5F5EB']
};
(0, _.createTheme)({
  filePath,
  rules,
  levels: 3,
  base: 'bee',
  labels: ['kangaroo', 'solid', 'wall']
});
},{"./":"createTheme/index.js"}],"index.js":[function(require,module,exports) {
// process.env.DISABLE_LOG_FLAG === 'true'
console.log = process.env.DISABLE_LOG_FLAG === 'true' ? () => {} : console.log;

require('./createTheme/prove'); // import { rabbitHole } from './_modules/rabbitHole'
// rabbitHole()
},{"./createTheme/prove":"createTheme/prove.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map