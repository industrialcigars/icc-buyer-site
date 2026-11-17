/* Bottle Pricing demo — uses the same formula and tier structure as the live pricing engine, on invented bottles. */
ICC_DEMOS['bottle-pricing'] = {
  intro: 'Enter a bottle\'s cost and size to see every price the engine builds. Then edit a tier multiplier in the policy table and watch the whole catalog reprice at once.',
  mount: function (root) {
    var CFG = { ml: 59.15, tax: 0.08, dbl: 1.5, bonus: 0.2, conc: 1.4,
      tiers: [{ n: 'Well', max: 20, m: 8.5 }, { n: 'Call', max: 45, m: 5.0 }, { n: 'Premium', max: 100, m: 4.5 }, { n: 'Top Shelf', max: 200, m: 4.0 }, { n: 'Ultra/Rare', max: null, m: 3.5 }] };
    var CAT = [
      { n: 'House Bourbon', cost: 14, ml: 750, a: false }, { n: 'Small-Batch Rye', cost: 32, ml: 750, a: false },
      { n: 'Single Malt 12', cost: 58, ml: 750, a: false }, { n: 'Reserve Cognac', cost: 92, ml: 750, a: false },
      { n: 'Limited Release Bourbon', cost: 165, ml: 750, a: true }, { n: 'Rare Single Barrel', cost: 310, ml: 750, a: true }
    ];
    function tierOf(cost) { for (var i = 0; i < CFG.tiers.length; i++) { var t = CFG.tiers[i]; if (t.max === null || cost < t.max) return t; } }
    function price(cost, ml, alloc) {
      var pours = ml / CFG.ml, cpp = cost / pours, t = tierOf(cost), mult = t.m + (alloc ? CFG.bonus : 0);
      var single = Math.ceil(cpp * mult * (1 + CFG.tax));
      return { tier: t.n, mult: mult, cpp: cpp, single: single, dbl: single * CFG.dbl, conc: Math.ceil(cost * CFG.conc) };
    }

    root.innerHTML =
      '<h4>Price a bottle</h4>' +
      '<div class="d-row">' +
        '<div><label class="d-label" for="bp-cost">Bottle cost ($)</label><input class="d-input" id="bp-cost" type="number" min="1" step="1" value="95" style="width:110px"></div>' +
        '<div><label class="d-label" for="bp-size">Size</label><select class="d-select" id="bp-size"><option value="750">750 ml</option><option value="1000">1 L</option><option value="1750">1.75 L</option></select></div>' +
        '<label style="padding-bottom:8px"><input type="checkbox" id="bp-alloc"> Allocated / limited release</label>' +
      '</div>' +
      '<div class="d-grid" id="bp-out"></div>' +
      '<h4 style="margin-top:24px">Pricing policy</h4>' +
      '<p>The whole policy is one set of numbers. Change a tier multiplier:</p>' +
      '<div class="d-row" id="bp-tiers"></div>' +
      '<div style="overflow-x:auto"><table class="d-table" id="bp-cat"></table></div>';

    var costEl = root.querySelector('#bp-cost'), sizeEl = root.querySelector('#bp-size'), allocEl = root.querySelector('#bp-alloc');
    root.querySelector('#bp-tiers').innerHTML = CFG.tiers.map(function (t, i) {
      return '<div><label class="d-label" for="bp-t' + i + '">' + t.n + (t.max ? ' (&lt; $' + t.max + ')' : ' ($200+)') + '</label><input class="d-input" id="bp-t' + i + '" data-i="' + i + '" type="number" step="0.1" min="1" value="' + t.m + '" style="width:80px"></div>';
    }).join('');

    function render() {
      var c = Math.max(+costEl.value || 0, 0.01), p = price(c, +sizeEl.value, allocEl.checked);
      root.querySelector('#bp-out').innerHTML =
        '<div class="d-tile"><div class="k">Tier</div><div class="v">' + p.tier + ' <span style="font-size:13px;color:#767470">' + p.mult.toFixed(1) + 'x</span></div></div>' +
        '<div class="d-tile"><div class="k">Cost per pour</div><div class="v">$' + p.cpp.toFixed(2) + '</div></div>' +
        '<div class="d-tile"><div class="k">Single pour</div><div class="v">' + dMoney(p.single) + '</div></div>' +
        '<div class="d-tile"><div class="k">Double pour</div><div class="v">$' + p.dbl.toFixed(0) + '</div></div>' +
        '<div class="d-tile"><div class="k">Bottle concierge</div><div class="v">' + dMoney(p.conc) + '</div></div>';
      root.querySelector('#bp-cat').innerHTML = '<thead><tr><th>Bottle</th><th class="n">Cost</th><th>Tier</th><th class="n">Single</th><th class="n">Double</th><th class="n">Concierge</th></tr></thead><tbody>' +
        CAT.map(function (b) { var x = price(b.cost, b.ml, b.a); return '<tr><td>' + b.n + (b.a ? ' <span class="d-pill red">allocated</span>' : '') + '</td><td class="n">' + dMoney(b.cost) + '</td><td>' + x.tier + '</td><td class="n">' + dMoney(x.single) + '</td><td class="n">$' + x.dbl.toFixed(0) + '</td><td class="n">' + dMoney(x.conc) + '</td></tr>'; }).join('') + '</tbody>';
    }
    [costEl, sizeEl, allocEl].forEach(function (e) { e.addEventListener('input', render); e.addEventListener('change', render); });
    root.querySelector('#bp-tiers').addEventListener('input', function (e) { var i = e.target.getAttribute('data-i'); if (i !== null && +e.target.value >= 1) { CFG.tiers[+i].m = +e.target.value; render(); } });
    render();
  }
};
