/* Hiring Automation demo — a candidate pipeline and the automation that fires at each stage. Invented candidates. */
ICC_DEMOS['hiring'] = {
  intro: 'Move candidates through the pipeline with Advance. At every stage, the system sends the emails, logs the outcome and creates the next record. Add a new application to see the first step.',
  mount: function (root) {
    var COLS = ['Applied', 'Interview booked', 'Interviewed', 'Pre-hire check', 'Hired'];
    var AUTO = [
      'Application received: candidate emailed, ops team notified',
      'Interview booked: confirmation sent with the standing video link',
      'Interview outcome logged: passed, status email sent',
      'Pre-hire checkpoint cleared by the family reviewer',
      'Training record created in ICCU automatically'
    ];
    var C = [{ n: 'Maya R.', r: 'Cigar Specialist', c: 0 }, { n: 'Devon K.', r: 'Bartender', c: 1 }, { n: 'Lena O.', r: 'Server', c: 2 }, { n: 'Omar B.', r: 'Host', c: 3 }, { n: 'Sasha T.', r: 'Cook', c: 0 }];
    var feed = [], newN = ['Ivy C.', 'Noah F.', 'Zara H.'], ni = 0, roles = ['Barback', 'Runner', 'Server'];
    root.innerHTML = '<div class="d-row"><div><button class="d-btn ghost" id="hr-new" type="button">+ New application</button></div></div><div style="overflow-x:auto"><div class="d-kan" id="hr-board"></div></div><h4 style="margin-top:16px">Automation feed</h4><div class="d-log" id="hr-feed"><span class="skip">Advance a candidate to see what fires.</span></div>';
    var board = root.querySelector('#hr-board');
    function render() {
      board.innerHTML = COLS.map(function (name, k) {
        return '<div class="col"><h5>' + name + '</h5>' + C.map(function (x, i) { return x.c === k ? '<div class="d-card"><b>' + dEsc(x.n) + '</b><br><span style="color:#767470">' + dEsc(x.r) + '</span>' + (k < 4 ? '<br><button class="d-btn small" data-i="' + i + '" type="button" style="margin-top:6px">Advance &rarr;</button>' : '<br><span class="d-pill ok" style="margin-top:6px">in ICCU</span>') + '</div>' : ''; }).join('') + '</div>';
      }).join('');
    }
    function log(t) { var f = root.querySelector('#hr-feed'); if (f.querySelector('.skip')) f.innerHTML = ''; f.insertAdjacentHTML('beforeend', '<div><span class="ok">&#10003;</span> ' + dEsc(t) + '</div>'); f.scrollTop = f.scrollHeight; }
    board.addEventListener('click', function (e) { var i = e.target.getAttribute('data-i'); if (i === null) return; var x = C[+i]; x.c++; log(x.n + ': ' + AUTO[x.c]); render(); });
    root.querySelector('#hr-new').addEventListener('click', function () { var n = newN[ni % newN.length], r = roles[ni % roles.length]; ni++; C.push({ n: n, r: r, c: 0 }); log(n + ': ' + AUTO[0]); render(); });
    render();
  }
};
