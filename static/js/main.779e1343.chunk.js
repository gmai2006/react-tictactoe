(this.webpackJsonptitactoe=this.webpackJsonptitactoe||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(3),c=n.n(i),o=(n(9),n(1));var u=function(e){return a.a.createElement("button",{className:"square",onClick:e.onClick},e.value)};var l=function(e){var t=function(t){return a.a.createElement(u,{value:e.squares[t],onClick:function(){return e.onClick(t)}})};return a.a.createElement("div",null,a.a.createElement("div",{className:"board-row"},t(0),t(1),t(2)),a.a.createElement("div",{className:"board-row"},t(3),t(4),t(5)),a.a.createElement("div",{className:"board-row"},t(6),t(7),t(8)))},s=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],f={history:[{squares:Array(9).fill(void 0)}],nextStep:0,isNext:!0},v=function(e){return[e.slice(0,1).concat(e.slice(4,5)).concat(e.slice(8,9))]},m=function(e){return-1===e?-1:0===e?0:1===e?4:8},d=function(e){return x(e,"O")},h=function(e){return x(e,"X")},x=function(e,t){var n=E(function(e){return[e.slice(0,3),e.slice(3,6),e.slice(6,9)]}(e),t);if(n>=0)return n;var r,a=-1===(r=E(function(e){return[e.slice(0,1).concat(e.slice(3,4)).concat(e.slice(6,7)),e.slice(1,2).concat(e.slice(4,5)).concat(e.slice(7,8)),e.slice(2,3).concat(e.slice(5,6)).concat(e.slice(8,9))]}(e),t))?-1:r%3*3+Math.floor(r/3);if(a>=0)return a;var i=m(E(v(e),t));if(console.log(m(E(v(e),t))),i>=0)return i;var c=function(e){return-1===e?-1:0===e?2:1===e?4:6}(E(function(e){return[e.slice(2,3).concat(e.slice(4,5)).concat(e.slice(6,7))]}(e),t));return c>=0?c:-1},E=function(e,t){var n=e.map((function(e,n){return N(e,n,t)})).filter((function(e){return e>=0})).filter((function(e){return e>=0}));return n.length<=0?-1:n[0]},N=function(e,t,n){var r=2===e.filter((function(e){return e===n})).length,a=1===e.filter((function(e){return void 0===e})).length;return r&&a?3*t+e.findIndex((function(e){return void 0===e})):-1},p=function(e){if(e.length<=0)return null;var t=s.filter((function(t){var n=Object(o.a)(t,3),r=n[0],a=n[1],i=n[2];return e[r]&&e[r]===e[a]&&e[r]===e[i]}));return t.length>0?t[0]:null},g=function(e){return e.filter((function(e){return void 0!==e})).length===e.length};var y=function(){var e=Object(r.useState)(f),t=Object(o.a)(e,2),n=t[0],i=t[1],c=function(e){var t=n.history,r=t[t.length-1],a=r.squares.slice();g(r.squares)||p(a)||(a[e]=n.isNext?"X":"O",i({history:n.history.concat([{squares:a}]),nextStep:n.history.length,isNext:!n.isNext}))};Object(r.useEffect)((function(){n.isNext||c(function(e){var t=d(e);if(t>-1)return t;var n=h(e);return n>-1?n:e.findIndex((function(e){return void 0===e}))}(n.history[n.nextStep].squares))}));var u=n.history.map((function(e,t){var n=t?"Go to move #"+t:"Go to game start";return a.a.createElement("li",{key:t},a.a.createElement("button",{onClick:function(){return s(t)}},n))})),s=function(e){i({history:n.history,nextStep:e,isNext:!n.isNext})},v=n.history[n.nextStep],m=function(){var e=n.history[n.nextStep];return p(e.squares)?"Winner "+(n.isNext?"O":"X"):g(e.squares)?"Game is draw!!! ":"Next player: "+(n.isNext?"X":"O")}();return a.a.createElement("div",{className:"game"},a.a.createElement("div",{className:"game-board"},a.a.createElement(l,{squares:v.squares,onClick:function(e){return c(e)}})),a.a.createElement("div",{className:"game-info"},a.a.createElement("div",null,m),a.a.createElement("ol",null,u)))};n(10);var b={squares:Array(9).fill(null),isNext:!0};a.a.createContext(b);var q=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(y,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.779e1343.chunk.js.map