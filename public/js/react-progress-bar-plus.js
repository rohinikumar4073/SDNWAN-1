!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactProgressBarPlus=t(require("react")):e.ReactProgressBarPlus=t(e.React)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),a=n(o);t["default"]=a["default"],e.exports=t["default"]},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=function(e,t,r){for(var n=!0;n;){var o=e,a=t,i=r;n=!1,null===o&&(o=Function.prototype);var u=Object.getOwnPropertyDescriptor(o,a);if(void 0!==u){if("value"in u)return u.value;var s=u.get;if(void 0===s)return;return s.call(i)}var p=Object.getPrototypeOf(o);if(null===p)return;e=p,t=a,r=i,n=!0,u=p=void 0}},p=r(2),c=n(p),l=r(3),f=n(l),d=function(e){function t(){var e=this;a(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments),this.state={percent:this.props.percent},this.componentDidMount=function(){e.handleProps(e.props)},this.componentWillReceiveProps=function(t){e.interval&&clearInterval(e.interval),e.timeout&&clearTimeout(e.timeout),e.handleProps(t)},this.componentWillUnmount=function(){e.interval&&clearInterval(e.interval),e.timeout&&clearTimeout(e.timeout)},this.increment=function(){var t=e.state.percent;t+=Math.random()+1-Math.random(),t=99>t?t:99,e.setState({percent:t})},this.handleProps=function(t){t.autoIncrement&&t.percent>=0&&t.percent<99&&(e.interval=setInterval(e.increment,t.intervalTime)),t.percent>=100?e.setState({percent:99.9},function(){e.timeout=setTimeout(function(){e.setState({percent:-1})},400)}):e.setState({percent:t.percent})}}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.onTop,r=e.spinner,n=e.className,a=this.state.percent;n=(0,f["default"])("react-progress-bar",n,{"react-progress-bar-on-top":t,"react-progress-bar-hide":0>a||a>=100});var i={width:(0>a?0:a)+"%"},u=(0,f["default"])("react-progress-bar-spinner",o({},"react-progress-bar-spinner-"+r,r));return c["default"].createElement("div",{className:n},c["default"].createElement("div",{className:"react-progress-bar-percent",style:i}),r?c["default"].createElement("div",{className:u},c["default"].createElement("div",{className:"react-progress-bar-spinner-icon"})):null)}}],[{key:"propTypes",value:{className:c["default"].PropTypes.string,percent:c["default"].PropTypes.number.isRequired,onTop:c["default"].PropTypes.bool,autoIncrement:c["default"].PropTypes.bool,intervalTime:c["default"].PropTypes.number,spinner:c["default"].PropTypes.oneOf([!1,"left","right"])},enumerable:!0},{key:"defaultProps",value:{percent:-1,onTop:!1,autoIncrement:!1,intervalTime:200,spinner:"left"},enumerable:!0}]),t}(c["default"].Component);t["default"]=d,e.exports=t["default"]},function(t,r){t.exports=e},function(e,t,r){var n,o;!function(){"use strict";function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n))e.push(r.apply(null,n));else if("object"===o)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=r:(n=[],o=function(){return r}.apply(t,n),!(void 0!==o&&(e.exports=o)))}()}])});
