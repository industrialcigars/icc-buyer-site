/* Member Monthly Credit Cron demo — simulates the 1st-of-the-month run on invented members. */
ICC_DEMOS['credit-cron'] = {
  intro: 'Toggle a member to paused, then click Run. This is the job that fires at 6:00 AM on the 1st of every month: it checks status, issues the credit and sends the email with no one touching it.',
  mount: function (root) {
    var CREDIT = { Atabey: 15, Apex: 25 };
    var M = [
      { n: 'Marcus T.', t: 'Atabey', on: true }, { n: 'Priya S.', t: 'Apex', on: true }, { n: 'Dan R.', t: 'Atabey', on: true },
      { n: 'Elena V.', t: 'Atabey', on: true }, { n: 'Chris W.', t: 'Apex', on: true }, { n: 'Jordan K.', t: 'Atabey', on: true },
      { n: 'Sam L.', t: 'Atabey', on: true }, { n: 'Tasha M.', t: 'Apex', on: true }, { n: 'Greg H.', t: 'Atabey', on: false }, { n: 'Nina P.', t: 'Atabey', on: true }
    ];
    var running = false;
    root.innerHTML =
      '<div class="d-row"><div class="d-col">' +
        '<h4>Membership roster (sample)</h4>' +
        '<table class="d-table"><thead><tr><th>Member</th><th>Tier</th><th>Status</th></tr></thead><tbody>' +
        M.map(function (m, i) { return '<tr><td>' + m.n + '</td><td>' + m.t + '</td><td><label><input type="checkbox" data-i="' + i + '"' + (m.on ? ' checked' : '') + '> Active</label></td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<div class="d-col"><h4>Job log</h4><div class="d-log" id="cc-log"><span class="skip">Waiting for the 1st of the month…</span></div>' +
        '<div style="margin-top:10px"><button class="d-btn" id="cc-run" type="button">Run the monthly job</button></div>' +
        '<div id="cc-out" style="margin-top:14px"></div></div></div>';
    var log = root.querySelector('#cc-log'), btn = root.querySelector('#cc-run'), out = root.querySelector('#cc-out');
    root.addEventListener('change', function (e) { var i = e.target.getAttribute('data-i'); if (i !== null) M[+i].on = e.target.checked; });

    function line(html) { log.insertAdjacentHTML('beforeend', '<div>' + html + '</div>'); log.scrollTop = log.scrollHeight; }
    function code() { var c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = ''; for (var i = 0; i < 12; i++) { s += c[Math.floor(Math.random() * c.length)]; if (i % 4 === 3 && i < 11) s += '-'; } return 'ICC-' + s; }

    btn.addEventListener('click', async function () {
      if (running) return; running = true; btn.disabled = true; log.innerHTML = ''; out.innerHTML = '';
      var sec = 0; function ts() { sec++; return '6:00:' + (sec < 10 ? '0' : '') + sec + ' AM'; }
      line('<span class="hl">' + ts() + '  Job started</span>'); await dSleep(350);
      line(ts() + '  Fetched ' + M.length + ' members from the membership system'); await dSleep(350);
      var issued = 0, total = 0, first = null;
      for (var i = 0; i < M.length; i++) {
        var m = M[i];
        if (!m.on) { line('<span class="skip">' + ts() + '  – ' + m.n + ' skipped (membership paused)</span>'); await dSleep(160); continue; }
        var amt = CREDIT[m.t], c = code(); issued++; total += amt; if (!first) first = { m: m, amt: amt, code: c };
        line('<span class="ok">' + ts() + '  ✓ ' + m.n + ' (' + m.t + ') credit created, email sent</span>'); await dSleep(160);
      }
      line('<span class="hl">' + ts() + '  Done: ' + issued + ' credits issued (' + dMoney(total) + '), ' + (M.length - issued) + ' skipped</span>');
      if (first) {
        out.innerHTML = '<h4>What ' + dEsc(first.m.n) + ' receives</h4><div class="d-email"><div class="eh">Your monthly credit is here</div><div class="eb">' +
          '<p>Hi ' + dEsc(first.m.n.split(' ')[0]) + ', your ' + first.m.t + ' credit of <b>$' + first.amt + '.00</b> is ready to use in the lounge store.</p>' +
          '<div class="d-barcode"></div><div style="font-family:ui-monospace,Menlo,monospace;font-size:12px">' + first.code + '</div>' +
          '<p style="margin:10px 0 0;font-size:12px;color:#767470">Expires at the end of this month.</p></div></div>';
      }
      running = false; btn.disabled = false;
    });
  }
};
