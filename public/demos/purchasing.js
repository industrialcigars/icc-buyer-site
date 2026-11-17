/* Purchasing / OTB demo — mirrors the real engine's rules on invented vendors and SKUs:
   velocity from recent sales, rounded to whole boxes, Tier 1 vendors funded first, hard budget cap, dead SKUs excluded. */
ICC_DEMOS['purchasing'] = {
  intro: 'Set a weekly budget and click Run. The engine reads the sales and stock below, rounds to whole boxes, funds top-tier vendors first and stops at the budget. Move the slider and run it again.',
  mount: function (root) {
    var VENDORS = { 'Harbor Leaf Co.': 1, 'Northgate Tobacco': 1, 'Summit Cigar Group': 2, 'Ridgeline Imports': 3 };
    var SKUS = [
      { v: 'Harbor Leaf Co.', n: 'Harbor Reserve Toro', box: 20, c: 9.5, oh: 20, s30: 180, s60: 340 },
      { v: 'Harbor Leaf Co.', n: 'Harbor Maduro Robusto', box: 20, c: 8.75, oh: 30, s30: 150, s60: 290 },
      { v: 'Harbor Leaf Co.', n: 'Harbor Lancero', box: 10, c: 11, oh: 8, s30: 60, s60: 110 },
      { v: 'Northgate Tobacco', n: 'Northgate Corojo Toro', box: 20, c: 7.4, oh: 40, s30: 170, s60: 330 },
      { v: 'Northgate Tobacco', n: 'Northgate Churchill', box: 20, c: 8.2, oh: 10, s30: 130, s60: 250 },
      { v: 'Northgate Tobacco', n: 'Northgate Limited Edition', box: 10, c: 14, oh: 6, s30: 40, s60: 80 },
      { v: 'Summit Cigar Group', n: 'Summit Connecticut Robusto', box: 25, c: 6.1, oh: 60, s30: 220, s60: 420 },
      { v: 'Summit Cigar Group', n: 'Summit Habano Gordo', box: 25, c: 6.8, oh: 25, s30: 140, s60: 270 },
      { v: 'Summit Cigar Group', n: 'Summit Vintage Belicoso', box: 20, c: 12, oh: 18, s30: 0, s60: 0 },
      { v: 'Ridgeline Imports', n: 'Ridgeline Sumatra Toro', box: 20, c: 5.9, oh: 35, s30: 120, s60: 230 },
      { v: 'Ridgeline Imports', n: 'Ridgeline Torpedo', box: 20, c: 6.3, oh: 10, s30: 90, s60: 170 },
      { v: 'Ridgeline Imports', n: 'Ridgeline Discontinued Blend', box: 20, c: 5.0, oh: 11, s30: 0, s60: 0 }
    ];
    var last = null;

    root.innerHTML =
      '<div class="d-row">' +
        '<div class="d-col"><label class="d-label" for="pu-budget">Weekly buying budget: <b id="pu-bv">$4,000</b></label><input id="pu-budget" type="range" min="1500" max="8000" step="250" value="4000" style="width:100%"></div>' +
        '<div><label class="d-label" for="pu-cover">Weeks of cover</label><select class="d-select" id="pu-cover"><option value="2">2 weeks</option><option value="3" selected>3 weeks</option><option value="4">4 weeks</option></select></div>' +
        '<div><button class="d-btn" id="pu-run" type="button">Run buying engine</button></div>' +
      '</div>' +
      '<h4>Inputs: last 30 days of sales and current stock</h4>' +
      '<table class="d-table"><thead><tr><th>Vendor</th><th>Item</th><th class="n">On hand</th><th class="n">Sold 30d</th><th class="n">Sold 60d</th><th class="n">Box</th></tr></thead><tbody>' +
        SKUS.map(function (k) { return '<tr><td>' + k.v + ' <span class="d-pill">T' + VENDORS[k.v] + '</span></td><td>' + k.n + '</td><td class="n">' + k.oh + '</td><td class="n">' + k.s30 + '</td><td class="n">' + k.s60 + '</td><td class="n">' + k.box + '</td></tr>'; }).join('') +
      '</tbody></table>' +
      '<div id="pu-out" style="margin-top:18px"></div>';

    var budget = root.querySelector('#pu-budget');
    budget.addEventListener('input', function () { root.querySelector('#pu-bv').textContent = dMoney(budget.value); });
    root.querySelector('#pu-run').addEventListener('click', run);

    function run() {
      var B = +budget.value, cover = +root.querySelector('#pu-cover').value, remaining = B;
      var dead = SKUS.filter(function (k) { return k.s30 === 0 && k.s60 === 0; });
      var live = SKUS.filter(function (k) { return !(k.s30 === 0 && k.s60 === 0); }).map(function (k) {
        var vel = k.s30 / 4.3, need = Math.ceil(vel * cover) - k.oh, r = need > 0 ? Math.round(need / k.box) : 0;
        return { k: k, vel: vel, boxes: r < 1 ? 0 : r, cut: '' };
      });
      var vendors = Object.keys(VENDORS).sort(function (a, b) { return VENDORS[a] - VENDORS[b]; });
      var pos = [], cutCount = 0, rows = [];
      vendors.forEach(function (v) {
        var lines = live.filter(function (l) { return l.k.v === v && l.boxes > 0; }).sort(function (a, b) { return b.vel - a.vel; });
        var po = { v: v, lines: [], total: 0 };
        lines.forEach(function (l) {
          var unitCost = l.k.box * l.k.c, cost = l.boxes * unitCost, note = '';
          if (cost > remaining) {
            var fit = Math.floor(remaining / unitCost);
            if (fit >= 1) { l.boxes = fit; cost = fit * unitCost; note = 'trimmed to budget'; }
            else { cutCount++; po.lines.push({ l: l, boxes: 0, cost: 0, note: 'cut: over budget' }); return; }
          }
          remaining -= cost; po.total += cost; po.lines.push({ l: l, boxes: l.boxes, cost: cost, note: note });
        });
        if (po.lines.length) pos.push(po);
      });
      last = pos;
      var used = B - remaining;
      var html =
        '<div class="d-grid" style="margin-bottom:14px">' +
          '<div class="d-tile"><div class="k">Budget</div><div class="v">' + dMoney(B) + '</div></div>' +
          '<div class="d-tile"><div class="k">Allocated</div><div class="v">' + dMoney(used) + '</div></div>' +
          '<div class="d-tile"><div class="k">Purchase orders</div><div class="v">' + pos.filter(function (p) { return p.total > 0; }).length + '</div></div>' +
          '<div class="d-tile"><div class="k">Lines cut by budget</div><div class="v">' + cutCount + '</div></div>' +
        '</div>' +
        pos.map(function (p) {
          return '<div class="d-card" style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><h4 style="margin:0">PO: ' + p.v + ' <span class="d-pill ink">Tier ' + VENDORS[p.v] + '</span></h4><b>' + dMoney(p.total) + '</b></div>' +
            '<table class="d-table"><thead><tr><th>Item</th><th class="n">Boxes</th><th class="n">Units</th><th class="n">Cost</th><th></th></tr></thead><tbody>' +
            p.lines.map(function (x) { return '<tr><td>' + x.l.k.n + '</td><td class="n">' + x.boxes + '</td><td class="n">' + x.boxes * x.l.k.box + '</td><td class="n">' + dMoney(x.cost) + '</td><td>' + (x.note ? '<span class="d-pill red">' + x.note + '</span>' : '') + '</td></tr>'; }).join('') +
            '</tbody></table></div>';
        }).join('') +
        '<div class="d-card alt"><b>Excluded as dead stock</b> (no sales in 60 days): ' + dead.map(function (d) { return d.n; }).join(', ') + '. The engine never reorders these.</div>' +
        '<div style="margin-top:12px"><button class="d-btn ghost" id="pu-csv" type="button">Download POs as CSV</button></div>';
      var out = root.querySelector('#pu-out'); out.innerHTML = html;
      out.querySelector('#pu-csv').addEventListener('click', csv);
    }

    function csv() {
      var lines = ['Vendor,Item,Boxes,Units,UnitCost,LineTotal'];
      (last || []).forEach(function (p) { p.lines.forEach(function (x) { if (x.boxes > 0) lines.push([p.v, x.l.k.n, x.boxes, x.boxes * x.l.k.box, x.l.k.c, x.cost.toFixed(2)].join(',')); }); });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
      a.download = 'sample-purchase-orders.csv'; a.click();
    }
    run();
  }
};
