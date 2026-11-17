/*
  ICC technology data — single source for the Systems hub (systems.html)
  and every detail page (system.html?id=...).

  TO EDIT NUMBERS: change `hoursPerMonth` and `rate` on any tool below.
  `rate` is an assumed fully-loaded hourly labor cost (wages + payroll tax + overhead).
  Set `hoursPerMonth: null` to hide the savings figures for a tool.
  All hours are modeled estimates of the manual work each system replaces, not tracked actuals.
*/
const ICC_TECH = [
  /* ---------------- The 8 platforms ---------------- */
  {
    id: 'programming-os', group: 'platform', num: '01', status: 'Live',
    name: 'Programming OS',
    tagline: 'Runs every event start to finish, all in one place.',
    problem: 'Event programming used to live in texts, spreadsheets and memory. Every month meant starting a plan from a blank page, then re-entering the same events into the calendar, Notion and the marketing brief by hand.',
    does: [
      'Type a theme and it generates the full monthly plan: theme, events, retail brief, marketing direction, social hooks and Klaviyo segments.',
      'Month, season and year views of the whole programming calendar, with confirmed events already loaded.',
      'Two-way sync with the Notion programming schedule, and a push to a tier-color-coded Google Calendar.',
      'A monthly PDF brief builds itself on the 1st and is emailed to the team.'
    ],
    replaces: 'The monthly planning session and the manual re-keying of events across tools.',
    specialist: 'a part-time programming coordinator',
    hoursPerMonth: 12, rate: 30,
    basis: 'Monthly planning plus re-entering events across the calendar, Notion and the monthly brief.'
  },
  {
    id: 'iccu', group: 'platform', num: '02', status: 'Live',
    name: 'ICCU — ICC Academy',
    tagline: 'AI-powered training that gets every new hire to the ICC standard.',
    problem: 'Training new hires pulled a manager off the floor to teach the same material again and again, and quality depended on who happened to do the teaching that week.',
    does: [
      'Employees work through training modules, pass qualifiers and earn badges as they go.',
      'AI drafts new modules and qualifier tests in a fixed, structured format, so adding training takes minutes.',
      'Qualifiers are graded automatically and badges are assigned without anyone signing off.',
      'Managers see progress by person and role, and the same platform tracks the shared-success program.'
    ],
    replaces: 'One-on-one shadowing and manager-led teaching for every new hire.',
    specialist: 'a part-time trainer or training coordinator',
    hoursPerMonth: 15, rate: 30,
    basis: 'Manager time spent building and delivering training and checking staff off.'
  },
  {
    id: 'credit-cron', group: 'platform', num: '03', status: 'Live',
    name: 'Member Monthly Credit Cron',
    tagline: 'Monthly retail credit that issues itself.',
    problem: 'Every member is owed a retail credit each month. Done by hand, that means checking who is active, creating a credit for each, and emailing it, on the 1st, every month, without fail.',
    does: [
      'Runs automatically at 6:00 AM on the 1st of every month.',
      'Reads active membership status and tier from the membership system.',
      'Creates the credit in the POS and fires a branded email with the redemption barcode and expiry date.',
      'No one has to remember it, and no member gets missed.'
    ],
    replaces: 'A recurring administrative task that used to depend on someone remembering to do it.',
    specialist: 'a part-time membership administrator',
    hoursPerMonth: 7, rate: 22,
    basis: 'Verifying members, issuing a credit and sending an email for each of roughly 130 members.'
  },
  {
    id: 'pairing-passport', group: 'platform', num: '04', status: 'Live',
    name: 'Pairing Passport',
    tagline: 'A QR-based collection that turns one visit into a habit.',
    problem: 'A visit used to end at the door. There was no record of what members tried, no reason to come back for the next pairing, and no data on what was actually being enjoyed together.',
    does: [
      'Members scan a QR code to log a pairing and build a personal collection over time.',
      'Gives members a reason to keep coming back.',
      'Gives the business real usage data on which pairings are actually being enjoyed.'
    ],
    replaces: 'Guesswork about which pairings resonate, and a missed repeat-visit driver.',
    specialist: null,
    hoursPerMonth: null, rate: 0,
    basis: ''
  },
  {
    id: 'purchasing', group: 'platform', num: '05', status: 'Live',
    name: 'Purchasing / OTB Calculator',
    tagline: 'Live POS data drives exact order quantities and vendor POs.',
    problem: 'Weekly buying meant pulling reports from the POS, working out sell-through by hand, deciding what to reorder, splitting a budget across vendors and keying purchase orders. It was slow, and the quality of the buy depended on the buyer\'s gut and mood that week.',
    does: [
      'An open-to-buy calculator sets the weekly budget.',
      'Three POS exports are uploaded and the buying engine does the rest: sales velocity, brand grouping and budget allocation with top-tier items first.',
      'Per-vendor purchase orders are generated as branded PDFs and as CSVs in the POS\'s own import format.',
      'The weekly report goes out by email, with vendor performance, dead-SKU and aged-PO reporting built in.'
    ],
    replaces: 'The weekly buying ritual, from spreadsheet math to hand-built purchase orders.',
    specialist: 'a part-time buyer or inventory analyst',
    hoursPerMonth: 26, rate: 35,
    basis: 'About 6 hours a week pulling reports, calculating velocity, allocating budget and building purchase orders.'
  },
  {
    id: 'guest-pass', group: 'platform', num: '06', status: 'Live',
    name: 'Guest Pass Program',
    tagline: 'Automated guest tracking, alerts and follow-up.',
    problem: 'Members bring guests, and each tier has a monthly allotment. Keeping count, noticing overages and following up with guests used to rely on someone manually policing who came in on whose pass.',
    does: [
      'Front-desk staff log a guest check-in in seconds, behind a staff PIN.',
      'Monthly allotments are tracked by tier against the live member list.',
      'A Slack alert fires the moment a member goes over their allotment.',
      'Automated emails thank the member and welcome the guest as a prospect.'
    ],
    replaces: 'Manual counting, overage policing and follow-up emails.',
    specialist: 'a part-time front-desk or membership coordinator',
    hoursPerMonth: 5, rate: 22,
    basis: 'Tracking allotments, chasing overages and sending follow-ups.'
  },
  {
    id: 'marketing', group: 'platform', num: '07', status: 'In final build',
    name: 'Marketing Command Center',
    tagline: 'Plan, launch and track marketing in one place, with an AI agent.',
    problem: 'Marketing lived in someone\'s head and across a dozen disconnected tools: events in one place, copy in another, assets in a third, results in a fourth.',
    does: [
      'Reads confirmed events from Programming OS automatically and turns them into campaigns across channels.',
      'Two-stage AI generation: first a plan, then the assets, all written in the ICC brand voice.',
      'A three-column approve/reject workflow keeps a person in control of everything that goes out.',
      'Campaign calendar, asset library and email-flow manager, with Klaviyo and Meta performance in the same view.'
    ],
    replaces: 'Hand-building each campaign, and chasing assets and results across tools.',
    specialist: 'a part-time marketing coordinator',
    hoursPerMonth: 20, rate: 35,
    basis: 'Campaign planning, asset prep, scheduling and approvals.'
  },
  {
    id: 'bottle-pricing', group: 'platform', num: '08', status: 'In final build',
    name: 'Bottle Concierge Pricing Tool',
    tagline: 'Consistent bar margin without doing the math by hand.',
    problem: 'Bar pricing lived in a spreadsheet where a markup multiplier was typed in bottle by bottle. Prices broke when a bottle size changed, and cost increases went unnoticed.',
    does: [
      'Enter a bottle\'s cost and size; the tool works out cost per pour and applies a tiered markup automatically.',
      'Returns single-pour, double-pour and bottle-concierge prices, with tax built in.',
      'Rules live in one configuration file, so changing the pricing policy takes one edit, not hundreds.'
    ],
    replaces: 'A manual bar-pricing spreadsheet.',
    specialist: 'a bar manager or beverage analyst',
    hoursPerMonth: 4, rate: 35,
    basis: 'Re-pricing bottles and checking cost changes by hand.'
  },

  /* ---------------- Also built ---------------- */
  {
    id: 'profit-dashboard', group: 'also', num: '', status: 'In build',
    name: 'Live Profit Dashboard',
    tagline: 'Daily sales, labor and voids pulled straight from the POS.',
    problem: 'The numbers that run the business arrived weeks late. The bookkeeper\'s close lagged well behind the month, so nobody could tell on any given day whether a shift made money.',
    does: [
      'Pulls sales by item, labor and voids from the F&B POS on a schedule.',
      'Shows daily revenue, labor cost, sales per labor hour and voids, with a 7-day trend.',
      'Sales per labor hour is calculated on bar and kitchen hours only, so the number reflects service, not management time.',
      'Recipe-level margin is the next layer; until it is in, the dashboard says so rather than faking it.'
    ],
    replaces: 'Assembling sales, labor and void reports by hand each week.',
    specialist: 'a part-time bookkeeper or financial analyst',
    hoursPerMonth: 8, rate: 35,
    basis: 'Pulling and reconciling weekly sales, labor and void reports.'
  },
  {
    id: 'hiring', group: 'also', num: '', status: 'Built',
    name: 'Hiring Automation',
    tagline: 'From job application to first-day training record.',
    problem: 'Hiring ran on a third-party form, manual scheduling emails and a chain of hand-offs after every interview.',
    does: [
      'A careers page and native application form feed a candidate pipeline dashboard.',
      'Candidates book interview slots themselves; confirmation and status emails fire automatically.',
      'Interview outcomes are logged, with a built-in pre-hire checkpoint before an offer.',
      'When a candidate passes, their training record is created in ICCU automatically.'
    ],
    replaces: 'A form tool, manual scheduling emails and the post-interview hand-offs.',
    specialist: 'a part-time recruiting coordinator',
    hoursPerMonth: 10, rate: 25,
    basis: 'Scheduling, status emails and hand-offs for each candidate.'
  },
  {
    id: 'pairing-email', group: 'also', num: '', status: 'Built',
    name: 'Bakery + Cigar Pairing Email',
    tagline: 'A branded pairing email, twice a week, mostly on its own.',
    problem: 'A twice-weekly email pairing the day\'s bakery items with a cigar meant choosing a cigar, shooting and editing photos, building the campaign and getting it approved, every time.',
    does: [
      'Staff submit the day\'s bakery items and photos; the system takes it from there.',
      'It picks the best-selling cigar of the past seven days and avoids repeating a recent one.',
      'Photos are cleaned up and an AI-composed hero image is built, then a branded campaign is assembled in Klaviyo.',
      'A Slack post sends it for review and one-click approval before it goes out.'
    ],
    replaces: 'Hand-building each pairing email, from cigar selection to layout.',
    specialist: 'a part-time email or content coordinator',
    hoursPerMonth: 9, rate: 28,
    basis: 'About an hour per email, twice a week.'
  }
];

/* ---------- helpers shared by the hub and the detail page ---------- */
function iccMoney(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
function iccAnnual(t) { return t.hoursPerMonth ? t.hoursPerMonth * 12 * t.rate : 0; }
function iccFindTech(id) { return ICC_TECH.find(function (t) { return t.id === id; }); }

function iccRenderGrid(group, containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ICC_TECH.filter(function (t) { return t.group === group; }).map(function (t) {
    var foot = t.hoursPerMonth
      ? 'Est. ' + t.hoursPerMonth + ' hrs/mo replaced'
      : 'See how it works';
    return '<a class="tech-card" href="system.html?id=' + t.id + '">' +
      '<div class="pc-top"><span class="pc-num">' + (t.num || 'Also built') + '</span><span class="pc-status">' + t.status + '</span></div>' +
      '<h3>' + t.name + '</h3>' +
      '<p>' + t.tagline + '</p>' +
      '<span class="tech-card-foot"><span>' + foot + '</span><span aria-hidden="true">&rarr;</span></span>' +
      '</a>';
  }).join('');
}

function iccRenderSummary(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var hours = 0, dollars = 0;
  ICC_TECH.forEach(function (t) { hours += t.hoursPerMonth || 0; dollars += iccAnnual(t); });
  el.innerHTML =
    '<div><p class="stat-num">' + ICC_TECH.length + '</p><p class="stat-label">systems built</p></div>' +
    '<div><p class="stat-num">' + hours + '</p><p class="stat-label">est. staff hours a month replaced</p></div>' +
    '<div><p class="stat-num">' + iccMoney(dollars) + '</p><p class="stat-label">est. a year in staff time</p></div>';
}
