/* Guest Pass demo — front-desk check-in, tier allotments, overage alert and automated emails, on invented members. */
ICC_DEMOS['guest-pass'] = {
  intro: 'Pick a member and log guests. Each tier has a monthly allotment. Go past it and an overage alert fires to Slack. Both emails send on their own.',
  mount: function (root) {
    var MEM = [{ n: 'Marcus T.', t: 'Atabey', cap: 3 }, { n: 'Priya S.', t: 'Apex', cap: 4 }, { n: 'Dan R.', t: 'Atabey', cap: 3 }];
    var used = [0, 0, 0], hist = [];
    var GUESTS = ['Alex Rivera', 'Sam Okafor', 'Jamie Chen', 'Taylor Brooks', 'Morgan Diaz', 'Casey Patel', 'Riley Nguyen'];
    root.innerHTML =
      '<div class="d-row">' +
        '<div><label class="d-label" for="gp-m">Member</label><select class="d-select" id="gp-m">' + MEM.map(function (m, i) { return '<option value="' + i + '">' + m.n + ' (' + m.t + ', ' + m.cap + ' passes)</option>'; }).join('') + '</select></div>' +
        '<div><label class="d-label" for="gp-g">Guest name</label><input class="d-input" id="gp-g" value="' + GUESTS[0] + '"></div>' +
        '<div><button class="d-btn" id="gp-log" type="button">Log guest check-in</button> <button class="d-btn ghost" id="gp-reset" type="button">Reset</button></div>' +
      '</div>' +
      '<div class="d-grid"><div class="d-card"><h4>This month</h4><div id="gp-status"></div></div><div class="d-card"><h4>Check-ins</h4><div id="gp-hist" style="font-size:13px"></div></div></div>' +
      '<div id="gp-auto" style="margin-top:14px"></div>';
    var sel = root.querySelector('#gp-m'), gin = root.querySelector('#gp-g'), nextG = 1;

    function status() {
      var i = +sel.value, m = MEM[i], u = used[i], dots = '';
      for (var k = 0; k < Math.max(m.cap, u); k++) dots += '<i class="' + (k >= m.cap ? 'over' : (k < u ? 'on' : '')) + '"></i>';
      var over = Math.max(0, u - m.cap);
      root.querySelector('#gp-status').innerHTML = '<div class="d-dots" style="margin-bottom:8px">' + dots + '</div><div>' + Math.min(u, m.cap) + ' of ' + m.cap + ' passes used' + (over ? ' <span class="d-pill red">' + over + ' over &middot; ' + dMoney(over * 35) + ' overage</span>' : '') + '</div>';
      root.querySelector('#gp-hist').innerHTML = hist.filter(function (h) { return h.i === i; }).map(function (h) { return '<div>' + h.g + (h.over ? ' <span class="d-pill red">overage</span>' : '') + '</div>'; }).join('') || '<span style="color:#767470">No guests logged yet.</span>';
    }
    sel.addEventListener('change', status);
    root.querySelector('#gp-reset').addEventListener('click', function () { used = [0, 0, 0]; hist = []; root.querySelector('#gp-auto').innerHTML = ''; nextG = 1; gin.value = GUESTS[0]; status(); });
    root.querySelector('#gp-log').addEventListener('click', function () {
      var i = +sel.value, m = MEM[i], g = gin.value.trim() || 'Guest'; used[i]++;
      var over = used[i] > m.cap; hist.push({ i: i, g: g, over: over });
      var html = '<div class="d-grid">' +
        '<div class="d-card"><h4>Email to ' + dEsc(m.n) + '</h4><p>Thanks for bringing ' + dEsc(g) + ' to the lounge. You have used ' + Math.min(used[i], m.cap) + ' of ' + m.cap + ' passes this month.</p></div>' +
        '<div class="d-card"><h4>Email to ' + dEsc(g) + '</h4><p>Welcome. You were invited by ' + dEsc(m.n) + '. Here is how to learn more about membership.</p></div></div>';
      if (over) html += '<div class="d-slack" style="margin-top:12px"><b>#icc-membership-alerts</b><br>Guest pass overage: <b>' + dEsc(m.n) + '</b> (' + m.t + ') is at ' + used[i] + ' of ' + m.cap + ' passes. Overage charge: ' + dMoney((used[i] - m.cap) * 35) + '. Guest: ' + dEsc(g) + '.</div>';
      root.querySelector('#gp-auto').innerHTML = '<h4>Sent automatically</h4>' + html;
      gin.value = GUESTS[nextG++ % GUESTS.length]; status();
    });
    status();
  }
};
