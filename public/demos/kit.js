/* Shared helpers for the interactive system demos. Everything here runs on invented sample data. */
window.ICC_DEMOS = window.ICC_DEMOS || {};
window.dMoney = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
window.dEsc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
window.dSleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
