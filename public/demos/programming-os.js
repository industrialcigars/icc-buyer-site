/* Programming OS demo — theme in, monthly plan out. The live tool generates with AI; this demo uses pre-written samples. */
ICC_DEMOS['programming-os'] = {
  intro: 'Pick a theme or type your own and click Generate. The live tool builds this plan with AI; the three presets below are pre-written samples of that output.',
  mount: function (root) {
    var PLANS = {
      'Whiskey & Smoke Week': { tag: 'Pairing-forward month built around bourbon, rye and bold cigars.',
        ev: [{ d: 4, t: 'Rye Flight Night', k: 'm' }, { d: 11, t: 'Distiller Meet & Pour', k: 'p' }, { d: 18, t: 'Blind Pairing Challenge', k: 'm' }, { d: 25, t: 'Barrel Pick Release', k: 'p' }],
        retail: 'Feature 3 full-bodied cigars next to the whiskey wall; bundle a cigar with a pour card.',
        mkt: 'Lead with the Distiller Meet & Pour as the public hero event; members-only teasers for the two private nights.',
        hooks: ['Two things that were made for each other.', 'Your next favorite pairing is on the shelf.', 'Pour. Light. Repeat.'], seg: ['Whiskey buyers, last 90 days', 'Members, no event in 60 days', 'Gift-card holders'] },
      'Founders Month': { tag: 'A month that honors the people and the story behind the room.',
        ev: [{ d: 2, t: 'Founders\' Table Dinner', k: 'm' }, { d: 9, t: 'Story Night', k: 'p' }, { d: 16, t: 'Member Appreciation', k: 'm' }, { d: 23, t: 'Anniversary Release', k: 'p' }],
        retail: 'Anniversary humidor feature and a limited house blend; thank-you gift with purchase for members.',
        mkt: 'Story-led content: founder voices, behind-the-scenes, and member shout-outs. One public night to bring new faces in.',
        hooks: ['Every room has a beginning.', 'Meet the family behind the humidor.', 'Thank you for nine years.'], seg: ['Longest-tenured members', 'First-time guests', 'Email openers, last 30 days'] },
      'Summer Patio Series': { tag: 'Outdoor-first month: light pairings, long evenings.',
        ev: [{ d: 6, t: 'Patio Opening Night', k: 'p' }, { d: 13, t: 'Sunset Sessions', k: 'm' }, { d: 20, t: 'Cocktail & Cigar Social', k: 'p' }, { d: 27, t: 'Member Patio Takeover', k: 'm' }],
        retail: 'Milder, shorter smokes up front; cocktail card pairings at the register.',
        mkt: 'Sunset photography and patio-weather triggers; two public socials, two member nights.',
        hooks: ['The patio is open.', 'Golden hour, your favorite chair.', 'Bring a friend, keep the evening going.'], seg: ['Patio visitors', 'Cocktail buyers', 'Members with open guest passes'] }
    };
    var chosen = 'Whiskey & Smoke Week';
    root.innerHTML =
      '<div class="d-chips" id="po-chips">' + Object.keys(PLANS).map(function (k) { return '<button type="button" class="d-chip' + (k === chosen ? ' on' : '') + '" data-k="' + dEsc(k) + '">' + dEsc(k) + '</button>'; }).join('') + '</div>' +
      '<div class="d-row"><div class="d-col"><label class="d-label" for="po-theme">Theme</label><input class="d-input" id="po-theme" value="' + chosen + '" style="width:100%"></div><div><button class="d-btn" id="po-go" type="button">Generate monthly plan</button></div></div>' +
      '<div id="po-out"></div>';
    var themeEl = root.querySelector('#po-theme');
    root.querySelector('#po-chips').addEventListener('click', function (e) {
      var k = e.target.getAttribute('data-k'); if (!k) return; themeEl.value = k;
      [].forEach.call(root.querySelectorAll('.d-chip'), function (c) { c.classList.toggle('on', c.getAttribute('data-k') === k); }); gen();
    });
    root.querySelector('#po-go').addEventListener('click', gen);

    async function gen() {
      var out = root.querySelector('#po-out'), theme = themeEl.value.trim() || 'Untitled theme';
      out.innerHTML = '<p style="color:#767470">Generating…</p>'; await dSleep(600);
      var p = PLANS[theme] || { tag: 'A month built around "' + theme + '".',
        ev: [{ d: 5, t: theme + ' Kickoff', k: 'p' }, { d: 12, t: 'Members\' Night: ' + theme, k: 'm' }, { d: 19, t: theme + ' Pairing Social', k: 'p' }, { d: 26, t: theme + ' Finale', k: 'm' }],
        retail: 'Build a retail display around ' + theme + ' and highlight three tie-in products.',
        mkt: 'Announce ' + theme + ' two weeks ahead; alternate public and members-only invitations.',
        hooks: ['This month: ' + theme + '.', 'Your next night out is on the calendar.', 'Save the date.'], seg: ['Members, no event in 60 days', 'Recent first-time guests', 'Email openers, last 30 days'] };
      var cal = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (d) { return '<div class="dow">' + d + '</div>'; }).join('');
      for (var d = 1; d <= 30; d++) { var e = p.ev.filter(function (x) { return x.d === d; })[0]; cal += '<div>' + d + (e ? '<div class="ev ' + (e.k === 'p' ? 'pub' : '') + '">' + dEsc(e.t) + '</div>' : '') + '</div>'; }
      out.innerHTML = '<div class="d-grid">' +
        '<div class="d-card"><h4>Theme</h4><p><b>' + dEsc(theme) + '</b><br>' + dEsc(p.tag) + '</p><h4>Retail brief</h4><p>' + dEsc(p.retail) + '</p><h4>Marketing direction</h4><p>' + dEsc(p.mkt) + '</p></div>' +
        '<div class="d-card"><h4>Social hooks</h4><ul class="plain" style="margin:0 0 12px">' + p.hooks.map(function (h) { return '<li>' + dEsc(h) + '</li>'; }).join('') + '</ul><h4>Klaviyo segments</h4><ul class="plain" style="margin:0">' + p.seg.map(function (s) { return '<li>' + dEsc(s) + '</li>'; }).join('') + '</ul></div></div>' +
        '<h4 style="margin-top:16px">Calendar <span class="d-pill ink">members</span> <span class="d-pill red">public</span></h4><div class="d-cal">' + cal + '</div>' +
        '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="d-btn ghost small" type="button" disabled>Push to Notion</button><button class="d-btn ghost small" type="button" disabled>Push to Google Calendar</button><button class="d-btn ghost small" type="button" disabled>Email monthly PDF brief</button></div>';
    }
    gen();
  }
};
