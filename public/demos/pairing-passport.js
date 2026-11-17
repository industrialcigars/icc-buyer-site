/* Pairing Passport demo — stamp pairings as a member; see the usage data the lounge gets. Invented pairings and counts. */
ICC_DEMOS['pairing-passport'] = {
  intro: 'You\'re a member holding a passport. Tap a pairing to stamp it, as if you scanned its QR code. Then look at the right-hand panel: that is the data the lounge gets from every stamp.',
  mount: function (root) {
    var P = [
      { n: 'Maduro Toro + Rye Old Fashioned', base: 18 }, { n: 'Connecticut Robusto + Espresso Martini', base: 12 }, { n: 'Corojo Churchill + Single Malt', base: 15 },
      { n: 'Habano Gordo + Aged Rum', base: 9 }, { n: 'Sumatra Lancero + Bourbon Neat', base: 14 }, { n: 'Maduro Robusto + Stout', base: 7 },
      { n: 'Connecticut Toro + Gin Martini', base: 5 }, { n: 'Torpedo + Cognac', base: 11 }, { n: 'Corojo Robusto + Margarita', base: 4 }
    ];
    var on = P.map(function () { return false; }), GOAL = 5;
    root.innerHTML = '<div class="d-row"><div class="d-col" style="flex-basis:340px"><h4>Your passport <span id="pp-count" class="d-pill ink">0 / ' + GOAL + '</span></h4><div class="d-meter" style="margin-bottom:12px"><i id="pp-bar"></i></div><div class="d-grid" id="pp-grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"></div><div id="pp-msg" style="margin-top:12px"></div></div>' +
      '<div class="d-col" style="flex-basis:300px"><h4>What the lounge sees</h4><div id="pp-data"></div></div></div>';
    var grid = root.querySelector('#pp-grid');
    function render() {
      var n = on.filter(Boolean).length;
      grid.innerHTML = P.map(function (p, i) { return '<div class="d-stamp' + (on[i] ? ' on' : '') + '" data-i="' + i + '" role="button" tabindex="0">' + (on[i] ? '&#10003; ' : '') + dEsc(p.n) + '</div>'; }).join('');
      root.querySelector('#pp-count').textContent = n + ' / ' + GOAL;
      root.querySelector('#pp-bar').style.width = Math.min(100, n / GOAL * 100) + '%';
      root.querySelector('#pp-msg').innerHTML = n >= GOAL ? '<div class="d-card"><span class="d-pill ok">Milestone unlocked</span> Milestone rewards are configurable by the lounge.</div>' : '<span style="color:#767470;font-size:12.5px">Stamp ' + (GOAL - n) + ' more to reach the milestone.</span>';
      var rows = P.map(function (p, i) { return { n: p.n, c: p.base + (on[i] ? 1 : 0) }; }).sort(function (a, b) { return b.c - a.c; }), max = rows[0].c;
      root.querySelector('#pp-data').innerHTML = rows.map(function (r) { return '<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px"><span>' + dEsc(r.n) + '</span><b>' + r.c + '</b></div><div class="d-meter"><i style="width:' + (r.c / max * 100) + '%"></i></div></div>'; }).join('') +
        '<p style="font-size:12px;color:#767470">Stamps this month, all members. Your taps are added live.</p>';
    }
    function toggle(e) { var i = e.target.getAttribute('data-i'); if (i === null) return; on[+i] = !on[+i]; render(); }
    grid.addEventListener('click', toggle);
    grid.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } });
    render();
  }
};
