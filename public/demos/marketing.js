/* Marketing Command Center demo — approval queue for AI-drafted campaign assets. Invented event and copy. */
ICC_DEMOS['marketing'] = {
  intro: 'Programming OS confirms an event; the Command Center drafts the campaign. Nothing goes out until a person approves it. Approve, edit or reject each asset, or sync a new event to draft another batch.',
  mount: function (root) {
    var Q = [
      { ch: 'Email', ev: 'Rye Flight Night', t: 'Subject: Four ryes, one evening. Reserve your seat.', s: 'pending' },
      { ch: 'Instagram', ev: 'Rye Flight Night', t: 'Four ryes. One table. Thursday at 7. Link in bio.', s: 'pending' },
      { ch: 'SMS', ev: 'Rye Flight Night', t: 'ICC: Rye Flight Night is Thursday at 7. Seats are limited. Reply YES to save yours.', s: 'pending' },
      { ch: 'Story', ev: 'Rye Flight Night', t: 'Countdown sticker + "Who is bringing a friend?" poll', s: 'pending' }
    ];
    var synced = false, editing = -1;
    root.innerHTML = '<div class="d-row"><div id="mk-stats" class="d-col"></div><div><button class="d-btn ghost" id="mk-sync" type="button">Sync events from Programming OS</button></div></div><div id="mk-list"></div>';
    var list = root.querySelector('#mk-list');
    function stats() {
      var a = Q.filter(function (x) { return x.s === 'approved'; }).length, r = Q.filter(function (x) { return x.s === 'rejected'; }).length, p = Q.length - a - r;
      root.querySelector('#mk-stats').innerHTML = '<span class="d-pill">' + p + ' awaiting review</span> <span class="d-pill ok">' + a + ' approved</span> <span class="d-pill red">' + r + ' rejected</span>';
    }
    function render() {
      list.innerHTML = Q.map(function (x, i) {
        var body = editing === i ? '<textarea class="d-input" data-edit="' + i + '" rows="2" style="width:100%">' + dEsc(x.t) + '</textarea>' : '<p style="margin:0 0 8px">' + dEsc(x.t) + '</p>';
        var btns = x.s === 'pending' ? (editing === i ? '<button class="d-btn small" data-a="save" data-i="' + i + '" type="button">Save</button>' :
          '<button class="d-btn small" data-a="ok" data-i="' + i + '" type="button">Approve</button> <button class="d-btn ghost small" data-a="edit" data-i="' + i + '" type="button">Edit</button> <button class="d-btn ghost small" data-a="no" data-i="' + i + '" type="button">Reject</button>') :
          '<span class="d-pill ' + (x.s === 'approved' ? 'ok' : 'red') + '">' + x.s + '</span> <button class="d-btn ghost small" data-a="undo" data-i="' + i + '" type="button">Undo</button>';
        return '<div class="d-card" style="margin-bottom:10px"><div style="display:flex;gap:8px;margin-bottom:6px"><span class="d-pill ink">' + x.ch + '</span><span style="color:#767470;font-size:12px">' + dEsc(x.ev) + '</span></div>' + body + btns + '</div>';
      }).join('');
      stats();
    }
    list.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-a'), i = +e.target.getAttribute('data-i'); if (!a) return;
      if (a === 'ok') Q[i].s = 'approved'; else if (a === 'no') Q[i].s = 'rejected'; else if (a === 'undo') Q[i].s = 'pending';
      else if (a === 'edit') editing = i; else if (a === 'save') { Q[i].t = list.querySelector('[data-edit="' + i + '"]').value; editing = -1; }
      render();
    });
    root.querySelector('#mk-sync').addEventListener('click', function () {
      if (synced) return; synced = true; this.disabled = true; this.textContent = 'Synced: 1 new event found';
      Q.push({ ch: 'Email', ev: 'Sunset Cigar & Cocktail Social', t: 'Subject: Golden hour on the patio. Join us Saturday.', s: 'pending' }, { ch: 'Instagram', ev: 'Sunset Cigar & Cocktail Social', t: 'Saturday. Sunset. A cocktail and a cigar. See you there.', s: 'pending' });
      render();
    });
    render();
  }
};
