/* ICCU demo — a qualifier an employee takes, auto-graded, with a badge and a live manager view. Generic sample content. */
ICC_DEMOS['iccu'] = {
  intro: 'Take the short qualifier as a new hire, then switch to the manager view. Grading, the badge and the progress board all update on their own, with no one signing anything off.',
  mount: function (root) {
    var Q = [
      { q: 'A guest walks in for the first time. What comes first?', a: ['Offer them the membership pitch', 'Greet them warmly and ask how you can help', 'Point them to the humidor and step back'], c: 1 },
      { q: 'A guest asks for a recommendation but is new to cigars. What do you do?', a: ['Suggest the strongest cigar in the house', 'Ask about their taste and suggest something mild', 'Tell them to browse on their own'], c: 1 },
      { q: 'You notice an open humidor door. What is the right move?', a: ['Close it and tell a manager if it was open long', 'Leave it, someone else will notice', 'Wait until the end of the shift'], c: 0 }
    ];
    var STAFF = [{ n: 'Alex M.', p: 100, b: 'Gold' }, { n: 'Riley T.', p: 80, b: 'Red' }, { n: 'Jordan P.', p: 60, b: 'Red' }, { n: 'Casey L.', p: 40, b: 'None' }];
    var me = { p: 0, b: 'None' }, tab = 'emp';
    root.innerHTML = '<div class="d-chips"><button type="button" class="d-chip on" data-t="emp">Employee view</button><button type="button" class="d-chip" data-t="mgr">Manager view</button></div><div id="ic-body"></div>';
    var body = root.querySelector('#ic-body');
    root.querySelector('.d-chips').addEventListener('click', function (e) { var t = e.target.getAttribute('data-t'); if (!t) return; tab = t; [].forEach.call(root.querySelectorAll('.d-chip'), function (c) { c.classList.toggle('on', c.getAttribute('data-t') === t); }); render(); });

    function render() {
      if (tab === 'emp') {
        body.innerHTML = '<h4>Level 1 qualifier: Guest Greeting Standard</h4><div class="d-meter" style="margin-bottom:14px"><i style="width:' + me.p + '%"></i></div>' +
          Q.map(function (x, i) { return '<div class="d-card" style="margin-bottom:10px"><p><b>' + (i + 1) + '. ' + dEsc(x.q) + '</b></p>' + x.a.map(function (a, j) { return '<label style="display:block;margin:4px 0"><input type="radio" name="q' + i + '" value="' + j + '"> ' + dEsc(a) + '</label>'; }).join('') + '</div>'; }).join('') +
          '<button class="d-btn" id="ic-sub" type="button">Submit qualifier</button><div id="ic-res" style="margin-top:12px"></div>';
        body.querySelector('#ic-sub').addEventListener('click', function () {
          var score = 0, answered = 0;
          Q.forEach(function (x, i) { var r = body.querySelector('input[name=q' + i + ']:checked'); if (r) { answered++; if (+r.value === x.c) score++; } });
          var res = body.querySelector('#ic-res');
          if (answered < Q.length) { res.innerHTML = '<span class="d-pill red">Answer all questions to submit</span>'; return; }
          if (score >= 2) { me.p = 100; me.b = 'Red'; res.innerHTML = '<div class="d-card"><span class="d-pill ok">Passed</span> Score ' + score + '/' + Q.length + '. <b>Red badge earned.</b> Graded and assigned automatically.</div>'; body.querySelector('.d-meter > i').style.width = '100%'; }
          else res.innerHTML = '<div class="d-card"><span class="d-pill red">Not yet</span> Score ' + score + '/' + Q.length + '. You need 2 of 3. Review and try again.</div>';
        });
      } else {
        var rows = STAFF.concat([{ n: 'You (new hire)', p: me.p, b: me.b }]);
        body.innerHTML = '<h4>Team progress, Level 1 Foundations</h4><table class="d-table"><thead><tr><th>Employee</th><th>Progress</th><th>Badge</th></tr></thead><tbody>' +
          rows.map(function (r) { return '<tr><td>' + r.n + '</td><td style="min-width:140px"><div class="d-meter"><i style="width:' + r.p + '%"></i></div></td><td><span class="d-pill ' + (r.b === 'Gold' ? 'ok' : (r.b === 'Red' ? 'red' : '')) + '">' + r.b + '</span></td></tr>'; }).join('') + '</tbody></table>' +
          '<p style="margin-top:10px;color:#767470;font-size:12.5px">Gold is approved by an admin only; Red is assigned automatically when all Level 1 modules are complete.</p>';
      }
    }
    render();
  }
};
