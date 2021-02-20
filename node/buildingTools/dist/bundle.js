
        (function (modules, mType) {
            function require (id) {
                var module = { exports: {}}
                var module_id = require_moduleId(mType, id)
                modules[module_id](module, module.exports, require)
                return module.exports
            }
            require('./entry/index.js')
        })({0: function (module, exports, require) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require("./add.js");

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sum = (0, _add2.default)(1, 2); // es6  index.js
exports.default = sum;},1: function (module, exports, require) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = add = function add(a, b) {
  return a + b;
};},},[{"filePath":"./entry/index.js","deps":["./add.js"],"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _add = require(\"./add.js\");\n\nvar _add2 = _interopRequireDefault(_add);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar sum = (0, _add2.default)(1, 2); // es6  index.js\nexports.default = sum;","id":0},{"filePath":"entry\\add.js","deps":[],"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = add = function add(a, b) {\n  return a + b;\n};","id":1,"reletivePaht":"./add.js"}]);
        function require_moduleId (typelist, id) {
            var module_id
            typelist.forEach(function (item) {
                if(id === item.filePath || id === item.reletivePaht){
                    module_id = item.id
                }
            })
            return module_id
        }
    