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
})({"data.json":[function(require,module,exports) {
module.exports = {
  "multi": ["Afterglow", "azure", "Better_JS", "Birds_of_Paradise", "bold", "BoxUK", "Grunge", "Humble", "Juicy", "KoralGreen", "MarsPeacock", "Mellow", "Zeus-Sublime-Text", "Cake", "Github"],
  "multiLight": ["BoxUK", "Github"],
  "base2": ["cave-light", "lake-light", "sea-light", "desert-dark", "space-dark"],
  "base16": ["atelierlakeside-light", "default-light", "solarized-light", "harmonic16-light", "ocean-light", "ocean-dark", "tomorrow-dark"],
  "rainglow": ["bold-light", "kiwi-light", "monzo-light", "tetra-light", "jumper-light", "absent", "yitzchok", "peacocks-in-space"],
  "others": {
    "nebula": "https://github.com/eating-coleslaw/vscode-nebula-theme/blob/master/themes/Nebula-color-theme.json",
    "plastic": "https://github.com/will-stone/plastic/blob/master/themes/theme.json",
    "horizon": "https://github.com/jolaleye/horizon-theme-vscode/blob/master/themes/horizon.json"
  }
};
},{}],"_modules/multiThemeFetcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiThemeFetcher = multiThemeFetcher;

var _data = require("../data.json");

var _fs = require("fs");

var _path = require("path");

var _stringFn = require("string-fn");

/**
 * The line below means that 
 * Insiders must have `multitheme` installed
 */
const LOCATION = `/home/s/.vscode-insiders/extensions/arturoarevalo.multi-theme-0.0.2/themes`;
const OUTPUT = (0, _path.resolve)(__dirname, '../themes');

function multiThemeFetcher() {
  const list = _data.multi.map(name => {
    const output = `${(0, _stringFn.kebabCase)(name)}.tmTheme`;
    (0, _fs.copyFileSync)(`${LOCATION}/${name}.tmTheme`, `${OUTPUT}/${output}`);
    const uiTheme = _data.multiLight.includes(name) ? 'vs' : 'vs-dark';
    return {
      label: `Niketa${(0, _stringFn.pascalCase)(name)}`,
      uiTheme,
      path: `./themes/${output}`
    };
  });

  return list;
}
},{"../data.json":"data.json"}],"_modules/requestThemeJson.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestThemeJson = requestThemeJson;
exports.schema = void 0;

var _rambdax = require("rambdax");

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = {
  name: 'string'
};
exports.schema = schema;

async function requestThemeJson(url, fallbackName) {
  try {
    const response = await (0, _requestPromise.default)(url);
    const content = JSON.parse(response);

    if (!(0, _rambdax.pass)(content)(schema) && !fallbackName) {
      throw new Error('no name');
    }

    if (!(0, _rambdax.pass)(content)(schema) && fallbackName) {
      content.name = fallbackName;
    }

    return content;
  } catch (error) {
    console.log(error, url);
    return false;
  }
}
},{}],"_modules/toBase16Url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBase16Url = toBase16Url;

var _rambdax = require("rambdax");

function toBase16Url(tag) {
  return (0, _rambdax.glue)(`
    https://raw.githubusercontent.com
    riesinger
    base16-vscode
    master
    themes
    ${tag}.json
  `, '/');
}
},{}],"_modules/toBase2Url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBase2Url = toBase2Url;

var _rambdax = require("rambdax");

var _stringFn = require("string-fn");

function toBase2Url(tag) {
  return (0, _rambdax.glue)(`
    https://raw.githubusercontent.com
    atelierbram
    Base2Tone-VSCode-Themes
    master
    themes
    Base2Tone_${(0, _stringFn.pascalCase)(tag)}-color-theme.json
  `, '/');
}
},{}],"_modules/toRainglowUrl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRainglowUrl = toRainglowUrl;

var _rambdax = require("rambdax");

function toRainglowUrl(tag) {
  return (0, _rambdax.glue)(`
    https://raw.githubusercontent.com
    rainglow
    vscode
    master
    themes
    ${tag}.json
  `, '/');
}
},{}],"_modules/toRawUrl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRawUrl = toRawUrl;

var _rambdax = require("rambdax");

const rawHead = 'https://raw.githubusercontent.com/';

function toRawUrl(url) {
  (0, _rambdax.s)();
  return url.s((0, _rambdax.split)('/blob/')).s(([a, b]) => [(0, _rambdax.remove)('https://github.com/', a), b]).s((0, _rambdax.join)('/')).s((0, _rambdax.prepend)(rawHead));
}
},{}],"_modules/rabbitHole.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rabbitHole = rabbitHole;

var _rambdax = require("rambdax");

var _multiThemeFetcher = require("./multiThemeFetcher");

var _stringFn = require("string-fn");

var _data = require("../data.json");

var _requestThemeJson = require("./requestThemeJson");

var _toBase16Url = require("./toBase16Url");

var _toBase2Url = require("./toBase2Url");

var _toRainglowUrl = require("./toRainglowUrl");

var _toRawUrl = require("./toRawUrl");

var _fsExtra = require("fs-extra");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const LOCATION = `${process.cwd()}/package.json`;
const NIKETA = 'Niketa';

async function rabbitHole() {
  const rainglowList = await (0, _rambdax.mapAsync)(async x => {
    const data = await (0, _requestThemeJson.requestThemeJson)((0, _toRainglowUrl.toRainglowUrl)(x));
    return {
      data,
      name: (0, _stringFn.dotCase)(x)
    };
  })(_data.rainglow);
  const base16List = await (0, _rambdax.mapAsync)(async x => {
    const data = await (0, _requestThemeJson.requestThemeJson)((0, _toBase16Url.toBase16Url)(x));
    return {
      data,
      name: (0, _stringFn.dotCase)(x)
    };
  })(_data.base16);
  const base2List = await (0, _rambdax.mapAsync)(async x => {
    const data = await (0, _requestThemeJson.requestThemeJson)((0, _toBase2Url.toBase2Url)(x));
    return {
      data,
      name: (0, _stringFn.dotCase)(x)
    };
  })(_data.base2);
  const othersList = await (0, _rambdax.mapAsync)(async ([name, url]) => {
    const data = await (0, _requestThemeJson.requestThemeJson)((0, _toRawUrl.toRawUrl)(url), name);
    return {
      data,
      name: (0, _stringFn.dotCase)(name)
    };
  })(Object.entries(_data.others));
  const list = [...rainglowList, ...base2List, ...base16List, ...othersList];
  const packageJsonData = list.map(x => {
    const uiTheme = x.data.type === 'light' ? 'vs' : 'vs-dark';
    const label = (0, _stringFn.pascalCase)(`${NIKETA}.${x.name}`);

    const newData = _objectSpread({}, x.data, {
      name: label
    });

    const fileName = (0, _stringFn.camelCase)(x.name);
    const filePath = `./imported/${fileName}.json`;
    (0, _fsExtra.writeJsonSync)(filePath, newData, {
      spaces: 2
    });
    return {
      label,
      uiTheme,
      path: filePath
    };
  });
  const packageJson = (0, _fsExtra.readJsonSync)(LOCATION);
  const themes = [...getNiketaData(), ...packageJsonData, ...(0, _multiThemeFetcher.multiThemeFetcher)()];
  const newPackageJson = (0, _rambdax.change)(packageJson, 'contributes', {
    themes
  });
  (0, _fsExtra.writeJsonSync)(LOCATION, newPackageJson, {
    spaces: 2
  });
  return newPackageJson.contributes.themes;
}

function getNiketaData() {
  return [{
    label: 'NiketaLight',
    uiTheme: 'vs',
    path: './themes/niketa-light.json'
  }, {
    label: 'NiketaYellow',
    uiTheme: 'vs',
    path: './themes/niketa-yellow.json'
  }, {
    label: 'NiketaDark',
    uiTheme: 'vs-dark',
    path: './themes/niketa-dark.json'
  }, {
    label: 'NiketaGruvboxHard',
    uiTheme: 'vs',
    path: './themes/light-hard.tmTheme'
  }, {
    label: 'NiketaGruvboxLight',
    uiTheme: 'vs',
    path: './themes/light-soft.tmTheme'
  }];
}
},{"./multiThemeFetcher":"_modules/multiThemeFetcher.js","../data.json":"data.json","./requestThemeJson":"_modules/requestThemeJson.js","./toBase16Url":"_modules/toBase16Url.js","./toBase2Url":"_modules/toBase2Url.js","./toRainglowUrl":"_modules/toRainglowUrl.js","./toRawUrl":"_modules/toRawUrl.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _rabbitHole = require("./_modules/rabbitHole");

(0, _rabbitHole.rabbitHole)();
},{"./_modules/rabbitHole":"_modules/rabbitHole.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map