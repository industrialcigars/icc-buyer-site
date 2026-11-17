/* Bakery + Cigar Pairing Email demo — picks the trailing-7-day best-seller with repeat-avoidance, builds the email, asks for approval. Invented items and sales. */
ICC_DEMOS['pairing-email'] = {
  intro: 'Choose the day\'s bakery item and click Build. The system picks last week\'s best-selling cigar that has not been featured recently, assembles the email, and asks for one-click approval in Slack.',
  mount: function (root) {
    var BAKE = { 'Almond croissant': 'flaky, buttery, with a toasted-almond finish', 'Lemon tart': 'bright and tart over a crisp shortbread base', 'Pecan sticky bun': 'warm, sweet and caramelized' };
    var CIG = [
      { n: 'Maduro Toro', u: 64, recent: true, note: 'rich cocoa and espresso' }, { n: 'Connecticut Robusto', u: 58, recent: false, note: 'smooth, creamy and mild' },
      { n: 'Corojo Churchill', u: 51, recent: false, note: 'toasted cedar with light spice' }, { n: 'Habano Gordo', u: 44, recent: true, note: 'bold pepper and earth' },
      { n: 'Sumatra Lancero', u: 39, recent: false, note: 'sweet spice and leather' }, { n: 'Torpedo Reserve', u: 27, recent: false, note: 'dark fruit and cream' }
    ];
    root.innerHTML = '<div class="d-row"><div><label class="d-label" for="pe-item">Today\'s bakery item</label><select class="d-select" id="pe-item">' + Object.keys(BAKE).map(function (k) { return '<option>' + k + '</option>'; }).join('') + '</select></div><div><button class="d-btn" id="pe-go" type="button">Build today\'s email</button></div></div><div id="pe-out"></div>';
    root.querySelector('#pe-go').addEventListener('click', async function () {
      var item = root.querySelector('#pe-item').value, out = root.querySelector('#pe-out');
      out.innerHTML = '<p style="color:#767470">Reading the last 7 days of cigar sales…</p>'; await dSleep(600);
      var pick = CIG.filter(function (c) { return !c.recent; })[0];
      out.innerHTML =
        '<div class="d-row" style="align-items:flex-start"><div class="d-col"><h4>1. Best sellers, last 7 days</h4><table class="d-table"><thead><tr><th>Cigar</th><th class="n">Units</th><th>Status</th></tr></thead><tbody>' +
        CIG.map(function (c) { return '<tr><td>' + c.n + '</td><td class="n">' + c.u + '</td><td>' + (c === pick ? '<span class="d-pill ok">picked</span>' : (c.recent ? '<span class="d-pill">featured in last 8 weeks</span>' : '')) + '</td></tr>'; }).join('') + '</tbody></table>' +
        '<p style="font-size:12.5px;color:#767470;margin-top:8px">Top seller skipped because it was featured recently. The pick is the best seller that wasn\'t.</p></div>' +
        '<div class="d-col"><h4>2. The email</h4><div class="d-email"><div class="d-hero">AI-composed hero: ' + dEsc(item) + ' + ' + dEsc(pick.n) + '</div><div class="eb"><b>Today\'s pairing: ' + dEsc(item) + ' &amp; ' + dEsc(pick.n) + '</b><p style="margin-top:8px">' + dEsc(item) + ': ' + dEsc(BAKE[item]) + '. Pair it with our ' + dEsc(pick.n) + ', with notes of ' + dEsc(pick.note) + '.</p><p style="margin:0;color:#cc2026"><b>Stop in today.</b></p></div></div></div></div>' +
        '<h4 style="margin-top:14px">3. Approval</h4><div class="d-slack"><b>#communications</b><br>Today\'s pairing email is ready: <b>' + dEsc(item) + ' &amp; ' + dEsc(pick.n) + '</b>.<br><button class="d-btn small" id="pe-ok" type="button" style="margin-top:8px">Approve &amp; send</button></div><div id="pe-sent" style="margin-top:10px"></div>';
      out.querySelector('#pe-ok').addEventListener('click', function () { this.disabled = true; out.querySelector('#pe-sent').innerHTML = '<span class="d-pill ok">Sent</span> Campaign scheduled in the email platform.'; });
    });
  }
};
