/* Live Profit Dashboard demo — a week of invented POS data. Shows daily tiles, a trend, and the labor-hours definition used for sales per labor hour. */
ICC_DEMOS['profit-dashboard'] = {
  intro: 'Pick a day. Revenue, labor, sales per labor hour and voids come straight from the POS. Flip the hours toggle to see why the live tool counts only bar and kitchen hours in the productivity number.',
  mount: function (root) {
    var WAGE = { Bartender: 15, 'Kitchen Seat': 17, Server: 9, 'Shift Manager (salaried)': 0 };
    var D = [
      { d: 'Mon', rev: 1420, v: 42, h: { Bartender: 11, 'Kitchen Seat': 9, Server: 8, 'Shift Manager (salaried)': 8 } },
      { d: 'Tue', rev: 1180, v: 18, h: { Bartender: 10, 'Kitchen Seat': 8, Server: 6, 'Shift Manager (salaried)': 8 } },
      { d: 'Wed', rev: 1980, v: 65, h: { Bartender: 14, 'Kitchen Seat': 10, Server: 10, 'Shift Manager (salaried)': 8 } },
      { d: 'Thu', rev: 2350, v: 88, h: { Bartender: 16, 'Kitchen Seat': 12, Server: 12, 'Shift Manager (salaried)': 8 } },
      { d: 'Fri', rev: 3320, v: 120, h: { Bartender: 20, 'Kitchen Seat': 14, Server: 16, 'Shift Manager (salaried)': 8 } },
      { d: 'Sat', rev: 3860, v: 134, h: { Bartender: 22, 'Kitchen Seat': 16, Server: 18, 'Shift Manager (salaried)': 8 } },
      { d: 'Sun', rev: 1650, v: 36, h: { Bartender: 10, 'Kitchen Seat': 9, Server: 8, 'Shift Manager (salaried)': 8 } }
    ];
    var sel = 4, barKitchenOnly = true;
    root.innerHTML = '<div class="d-chips" id="pd-days">' + D.map(function (x, i) { return '<button type="button" class="d-chip' + (i === sel ? ' on' : '') + '" data-i="' + i + '">' + x.d + '</button>'; }).join('') + '</div>' +
      '<label style="display:block;margin-bottom:12px"><input type="checkbox" id="pd-tog" checked> Count only bar and kitchen hours in sales per labor hour</label><div id="pd-out"></div>';
    function render() {
      var x = D[sel], tot = 0, bk = 0, cost = 0;
      Object.keys(x.h).forEach(function (r) { tot += x.h[r]; cost += x.h[r] * WAGE[r]; if (r === 'Bartender' || r === 'Kitchen Seat') bk += x.h[r]; });
      var splh = x.rev / (barKitchenOnly ? bk : tot), max = Math.max.apply(null, D.map(function (y) { return y.rev; }));
      var bars = D.map(function (y, i) { var h = Math.round(y.rev / max * 90); return '<rect x="' + (i * 46 + 8) + '" y="' + (100 - h) + '" width="32" height="' + h + '" fill="' + (i === sel ? '#cc2026' : '#171717') + '" rx="2"></rect><text x="' + (i * 46 + 24) + '" y="114" font-size="10" text-anchor="middle" fill="#767470">' + y.d + '</text>'; }).join('');
      root.querySelector('#pd-out').innerHTML = '<div class="d-grid" style="margin-bottom:14px">' +
        '<div class="d-tile"><div class="k">Revenue</div><div class="v">' + dMoney(x.rev) + '</div></div>' +
        '<div class="d-tile"><div class="k">Labor cost</div><div class="v">' + dMoney(cost) + '</div></div>' +
        '<div class="d-tile"><div class="k">Sales / labor hour</div><div class="v">' + dMoney(splh) + '</div></div>' +
        '<div class="d-tile"><div class="k">Voids</div><div class="v">' + dMoney(x.v) + ' <span style="font-size:12px;color:#767470">' + (x.v / x.rev * 100).toFixed(1) + '%</span></div></div>' +
        '<div class="d-tile dashed"><div class="k">Margin</div><div style="font-size:12.5px">Not tracked yet. Arrives with recipe costing, and is never estimated in the meantime.</div></div></div>' +
        '<div class="d-row"><div class="d-col"><h4>7-day revenue</h4><svg viewBox="0 0 330 120" width="100%" style="max-width:420px">' + bars + '</svg></div>' +
        '<div class="d-col"><h4>Hours worked, ' + x.d + '</h4><table class="d-table"><tbody>' + Object.keys(x.h).map(function (r) { var c = (r === 'Bartender' || r === 'Kitchen Seat'); return '<tr><td>' + r + '</td><td class="n">' + x.h[r] + ' hrs</td><td>' + (c ? '<span class="d-pill ok">counted</span>' : (barKitchenOnly ? '<span class="d-pill">excluded</span>' : '<span class="d-pill ok">counted</span>')) + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
        '<p style="font-size:12px;color:#767470">Counting a salaried manager\'s hours in the denominator drags productivity down without telling you anything about service. Toggle it to compare.</p>';
    }
    root.querySelector('#pd-days').addEventListener('click', function (e) { var i = e.target.getAttribute('data-i'); if (i === null) return; sel = +i; [].forEach.call(root.querySelectorAll('.d-chip'), function (c, k) { c.classList.toggle('on', k === sel); }); render(); });
    root.querySelector('#pd-tog').addEventListener('change', function (e) { barKitchenOnly = e.target.checked; render(); });
    render();
  }
};
