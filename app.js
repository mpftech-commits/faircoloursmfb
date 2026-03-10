/* =====================================================
   DailySave — app.js
   ===================================================== */

/* ── USERS (in a real app these come from a backend) ── */
const USERS = {
  admin:    { password: 'admin123', role: 'admin',   name: 'Super Admin', avatar: 'SA' },
  jessica:  { password: 'pass123',  role: 'cashier', name: 'Jessica',     avatar: 'JE', territory: 'Bariga'  },
  bolu:     { password: 'pass123',  role: 'cashier', name: 'Bolu',        avatar: 'BO', territory: 'Arena'   },
  princess: { password: 'pass123',  role: 'cashier', name: 'Princess',    avatar: 'PR', territory: 'Island'  },
};

/* ── APPLICATION STATE ────────────────────────────────── */
let state = {
  currentUser:      null,
  customers:        [],   // approved customers
  pendingCustomers: [],   // submitted by cashiers, awaiting admin approval
  transactions:     [],
  loans:            [],
  expenses:         [],
  dailyRecords:     [],
  selectedCustomerId: null,
  _modalCid:        null,
  _rejectId:        null,   // id being rejected
};

/* ── PERSISTENCE ────────────────────────────────────── */
function saveData() {
  localStorage.setItem('dailysave_v2', JSON.stringify({
    customers:        state.customers,
    pendingCustomers: state.pendingCustomers,
    transactions:     state.transactions,
    loans:            state.loans,
    expenses:         state.expenses,
    dailyRecords:     state.dailyRecords,
  }));
}

function initData() {
  const raw = localStorage.getItem('dailysave_v2');
  if (raw) {
    try {
      const d = JSON.parse(raw);
      Object.assign(state, d);
      return;
    } catch (e) { /* fall through to seed */ }
  }

  /* ── Seed / demo data ── */
  state.customers = [
    { id: 'c1', name: 'Obasanjo Omoge',   phone: '08023411200', address: '12 Lagos St, Bariga',    cashier: 'jessica',  balance: 42000, created: '2025-01-27' },
    { id: 'c2', name: 'Alhaji Idris',     phone: '07034567890', address: '5 Idimu Rd, Bariga',     cashier: 'jessica',  balance: 18000, created: '2025-07-09' },
    { id: 'c3', name: 'Ngozi Adeyemi',    phone: '08099887766', address: '3 Alhaji St, Bariga',    cashier: 'jessica',  balance: 27500, created: '2025-01-03' },
    { id: 'c4', name: 'Jekalo Fashola',   phone: '08011223344', address: '22 Broad St, Bariga',    cashier: 'jessica',  balance: 9500,  created: '2025-01-04' },
    { id: 'c5', name: 'Favour Ogbanta',   phone: '08055667788', address: '11 Arena Rd, Arena',     cashier: 'bolu',     balance: 62000, created: '2025-04-08' },
    { id: 'c6', name: 'Hannah Okonkwo',   phone: '07012345678', address: '9 Arena Close, Arena',   cashier: 'bolu',     balance: 15000, created: '2025-01-05' },
    { id: 'c7', name: 'Maxwell Bello',    phone: '09012345678', address: '4 Island Way, V/I',      cashier: 'princess', balance: 33000, created: '2025-04-01' },
    { id: 'c8', name: 'Balikisu Ishola',  phone: '08033445566', address: '7 Broad St, Island',     cashier: 'princess', balance: 11000, created: '2024-02-09' },
    { id: 'c9', name: 'Safieu Muritala',  phone: '07098765432', address: 'Oloye Bolaji, Island',   cashier: 'princess', balance: 8500,  created: '2024-12-01' },
  ];

  state.pendingCustomers = [
    /* example: a cashier has already submitted one */
    { id: 'p1', name: 'Amaka Obi', phone: '08166778899', address: '15 Bariga Rd', cashier: 'jessica', submittedAt: '2025-01-10', status: 'pending' },
  ];

  state.transactions = [
    { id: 't1',  customerId: 'c1', type: 'deposit',    amount: 6000,  date: '2025-01-27', cashier: 'jessica'  },
    { id: 't2',  customerId: 'c1', type: 'deposit',    amount: 2000,  date: '2025-01-28', cashier: 'jessica'  },
    { id: 't3',  customerId: 'c3', type: 'withdrawal', amount: 11500, date: '2025-01-03', cashier: 'jessica'  },
    { id: 't4',  customerId: 'c4', type: 'withdrawal', amount: 4000,  date: '2025-01-04', cashier: 'jessica'  },
    { id: 't5',  customerId: 'c5', type: 'deposit',    amount: 48000, date: '2025-04-08', cashier: 'bolu'     },
    { id: 't6',  customerId: 'c5', type: 'deposit',    amount: 3000,  date: '2025-04-14', cashier: 'bolu'     },
    { id: 't7',  customerId: 'c6', type: 'withdrawal', amount: 6000,  date: '2025-01-05', cashier: 'jessica'  },
    { id: 't8',  customerId: 'c2', type: 'deposit',    amount: 1000,  date: '2025-07-09', cashier: 'jessica'  },
    { id: 't9',  customerId: 'c7', type: 'deposit',    amount: 15000, date: '2025-04-01', cashier: 'princess' },
    { id: 't10', customerId: 'c8', type: 'deposit',    amount: 5470,  date: '2024-02-17', cashier: 'princess' },
  ];

  state.loans = [
    { id: 'l1', customerId: 'c8', amount: 100000, weeklyPay: 6670, totalRepaid: 130000, date: '2024-02-09' },
  ];

  state.expenses = [
    { id: 'e1', date: '2025-01-06', item: 'Soap',          amount: 17800, comment: 'Detergent for customers' },
    { id: 'e2', date: '2025-01-06', item: 'Exercise Book', amount: 500,   comment: '' },
    { id: 'e3', date: '2025-01-06', item: 'Transportation', amount: 200,  comment: 'Gift' },
  ];

  state.dailyRecords = [
    { date: '2025-05-01', savingsCash: 188800, savingsTransfer: 84800, loanCash: 44250, loanTransfer: 7000 },
    { date: '2025-05-02', savingsCash: 248700, savingsTransfer: 47800, loanCash: 52850, loanTransfer: 30000 },
    { date: '2025-05-03', savingsCash: 329000, savingsTransfer: 51100, loanCash: 27450, loanTransfer: 12000 },
  ];

  saveData();
}

/* ── UTILITIES ─────────────────────────────────────── */
function fmt(n)         { return '₦' + Number(n).toLocaleString(); }
function today()        { return new Date().toISOString().split('T')[0]; }
function uid()          { return 'x' + Math.random().toString(36).slice(2, 9); }
function getInitials(n) { return n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(); }

function custTransactions(cid) {
  return state.transactions.filter(t => t.customerId === cid).sort((a, b) => b.date.localeCompare(a.date));
}

function pendingCount() {
  return state.pendingCustomers.filter(p => p.status === 'pending').length;
}

/* ── AUTH ──────────────────────────────────────────── */
function doLogin() {
  const u = document.getElementById('login-user').value.trim().toLowerCase();
  const p = document.getElementById('login-pass').value;
  const user = USERS[u];
  if (!user || user.password !== p) {
    const err = document.getElementById('login-err');
    err.textContent = 'Invalid username or password.';
    err.style.display = 'block';
    return;
  }
  state.currentUser = { ...user, username: u };
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  setupSidebar();
  if (user.role === 'admin') showPage('page-admin-dash');
  else showPage('page-cashier-dash');
}

function doLogout() {
  state.currentUser = null;
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-err').style.display = 'none';
}

document.addEventListener('keypress', e => {
  if (e.key === 'Enter' && document.getElementById('login-screen').style.display !== 'none') doLogin();
});

/* ── SIDEBAR ───────────────────────────────────────── */
function setupSidebar() {
  const u = state.currentUser;
  document.getElementById('sb-avatar').textContent = u.avatar;
  document.getElementById('sb-name').textContent   = u.name;
  document.getElementById('sb-role').textContent   = u.role === 'admin' ? 'Super Admin' : `Cashier · ${u.territory}`;

  const adminNav = [
    { icon: '🏠', label: 'Dashboard',     page: 'page-admin-dash', dot: true  },
    { icon: '👤', label: 'Cashiers',      page: 'page-cashiers',   dot: false },
    { icon: '🏦', label: 'Loans',         page: 'page-loans',      dot: false },
    { icon: '📊', label: 'Daily Records', page: 'page-reports',    dot: false },
    { icon: '📋', label: 'Expenses',      page: 'page-expenses',   dot: false },
  ];
  const cashierNav = [
    { icon: '🏠', label: 'My Dashboard', page: 'page-cashier-dash', dot: false },
    { icon: '📋', label: 'Expenses',     page: 'page-expenses',     dot: false },
  ];

  const nav = u.role === 'admin' ? adminNav : cashierNav;
  const pc  = pendingCount();

  document.getElementById('nav-menu').innerHTML =
    '<div class="nav-section">Navigation</div>' +
    nav.map(n => {
      const showDot = n.dot && pc > 0 && u.role === 'admin';
      return `<div class="nav-item" data-page="${n.page}" onclick="showPage('${n.page}')">
        <span class="icon">${n.icon}</span>
        <span>${n.label}</span>
        ${showDot ? `<span class="nav-dot" title="${pc} pending approval"></span>` : ''}
      </div>`;
    }).join('');
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

/* ── PAGES ─────────────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  setActiveNav(page);
  if (page === 'page-admin-dash')    renderAdminDash();
  else if (page === 'page-cashier-dash') renderCashierDash();
  else if (page === 'page-cashiers')     renderCashiers();
  else if (page === 'page-loans')        renderLoans();
  else if (page === 'page-reports')      renderReports();
  else if (page === 'page-expenses')     renderExpenses();
}

function goBackFromDetail() {
  const u = state.currentUser;
  if (u.role === 'admin') showPage('page-admin-dash');
  else showPage('page-cashier-dash');
}

/* ── STAT CARD HELPER ──────────────────────────────── */
function statCard(label, value, icon, color) {
  return `<div class="stat-card" style="--accent-color:${color}">
    <div class="stat-label">${label}</div>
    <div class="stat-value">${value}</div>
    <div class="stat-icon">${icon}</div>
  </div>`;
}

/* ═══════════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════════ */
function renderAdminDash() {
  /* Pending approvals banner */
  const pending = state.pendingCustomers.filter(p => p.status === 'pending');
  const banner  = document.getElementById('pending-banner');

  if (pending.length > 0) {
    banner.style.display = 'block';
    document.getElementById('pending-count-badge').textContent = `${pending.length} awaiting`;
    document.getElementById('pending-table').innerHTML = pending.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td class="mono" style="font-size:12px">${p.phone}</td>
        <td>${p.address || '—'}</td>
        <td><span class="badge badge-blue">${USERS[p.cashier]?.name || p.cashier}</span></td>
        <td class="mono" style="font-size:12px">${p.submittedAt}</td>
        <td style="display:flex;gap:8px;padding:14px 0">
          <button class="btn-sm success" onclick="approveCustomer('${p.id}')">✓ Approve</button>
          <button class="btn-sm danger"  onclick="openRejectModal('${p.id}')">✗ Reject</button>
        </td>
      </tr>`).join('');
  } else {
    banner.style.display = 'none';
  }

  /* Update sidebar dot */
  setupSidebar();
  setActiveNav('page-admin-dash');

  /* Stats */
  const all      = state.customers;
  const txs      = state.transactions;
  const totalDep = txs.filter(t => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
  const totalWd  = txs.filter(t => t.type === 'withdrawal').reduce((s, t) => s + t.amount, 0);
  const totalBal = all.reduce((s, c) => s + c.balance, 0);

  document.getElementById('admin-stats').innerHTML = `
    ${statCard('Total Customers', all.length,         '👥', '#3d9eff')}
    ${statCard('Pending Approval', pending.length,    '⏳', '#f5c842')}
    ${statCard('Total Deposits',   fmt(totalDep),     '💰', '#2ecc71')}
    ${statCard('Total Withdrawals',fmt(totalWd),      '💸', '#e74c3c')}
    ${statCard('Total Balance',    fmt(totalBal),     '🏦', '#f5c842')}
    ${statCard('Loans',            state.loans.length,'📄', '#9b59b6')}
  `;

  renderAdminCustomerTable(all);

  /* Recent transactions */
  const recentTx = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
  document.getElementById('admin-tx-table').innerHTML = recentTx.map(t => {
    const c = state.customers.find(x => x.id === t.customerId);
    return `<tr>
      <td class="mono" style="font-size:12px">${t.date}</td>
      <td>${c ? c.name : '—'}</td>
      <td><span class="badge ${t.type === 'deposit' ? 'badge-green' : 'badge-red'}">${t.type}</span></td>
      <td class="amt" style="color:${t.type === 'deposit' ? 'var(--green)' : 'var(--red)'}">${fmt(t.amount)}</td>
      <td><span class="badge badge-blue">${USERS[t.cashier]?.name || t.cashier}</span></td>
    </tr>`;
  }).join('');
}

function renderAdminCustomerTable(list) {
  document.getElementById('admin-cust-table').innerHTML = list.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td class="mono" style="font-size:12px">${c.phone}</td>
      <td><span class="badge badge-blue">${USERS[c.cashier]?.name || c.cashier}</span></td>
      <td class="amt">${fmt(c.balance)}</td>
      <td><span class="badge badge-green">Active</span></td>
      <td><button class="btn-sm outline" style="font-size:11px" onclick="openCustomerAdminView('${c.id}')">View</button></td>
    </tr>`).join('');
}

function filterAdminCustomers(q) {
  q = q.toLowerCase();
  const list = q
    ? state.customers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.address || '').toLowerCase().includes(q))
    : state.customers;
  renderAdminCustomerTable(list);
}

function openCustomerAdminView(cid) {
  state.selectedCustomerId = cid;
  renderCustomerDetail(cid);
  showPage('page-customer-detail');
}

/* ── ADD CUSTOMER: Admin (immediately active) ──────── */
function addCustomerAdmin() {
  const name    = document.getElementById('nc-name').value.trim();
  const phone   = document.getElementById('nc-phone').value.trim();
  const addr    = document.getElementById('nc-addr').value.trim();
  const cashier = document.getElementById('nc-cashier').value;
  const msgEl   = document.getElementById('nc-msg');

  if (!name || !phone) {
    msgEl.innerHTML = '<div class="alert alert-err">Name and phone are required.</div>';
    return;
  }

  state.customers.push({ id: uid(), name, phone, address: addr, cashier, balance: 0, created: today() });
  saveData();
  closeModal('modal-add-customer');

  /* reset form */
  ['nc-name','nc-phone','nc-addr'].forEach(id => document.getElementById(id).value = '');
  msgEl.innerHTML = '';

  renderAdminDash();
}

/* ─────────────────────────────────────────────────────
   CUSTOMER APPROVAL WORKFLOW
───────────────────────────────────────────────────── */

/* Cashier opens the submit form */
function openCashierAddCustomer() {
  ['cnc-name','cnc-phone','cnc-addr'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('cnc-msg').innerHTML = '';
  openModal('modal-cashier-add-customer');
}

/* Cashier submits: goes to pendingCustomers queue */
function submitCustomerForApproval() {
  const name  = document.getElementById('cnc-name').value.trim();
  const phone = document.getElementById('cnc-phone').value.trim();
  const addr  = document.getElementById('cnc-addr').value.trim();
  const msgEl = document.getElementById('cnc-msg');

  if (!name || !phone) {
    msgEl.innerHTML = '<div class="alert alert-err">Name and phone are required.</div>';
    return;
  }

  state.pendingCustomers.push({
    id:          uid(),
    name,
    phone,
    address:     addr,
    cashier:     state.currentUser.username,
    submittedAt: today(),
    status:      'pending',
  });

  saveData();
  closeModal('modal-cashier-add-customer');
  renderCashierDash();   // refreshes the pending list on cashier view
}

/* Admin approves a pending customer */
function approveCustomer(pid) {
  const idx = state.pendingCustomers.findIndex(p => p.id === pid);
  if (idx === -1) return;

  const p = state.pendingCustomers[idx];
  p.status = 'approved';

  /* Move to active customers */
  state.customers.push({
    id:      uid(),
    name:    p.name,
    phone:   p.phone,
    address: p.address,
    cashier: p.cashier,
    balance: 0,
    created: today(),
  });

  saveData();
  renderAdminDash();
}

/* Admin opens reject modal */
function openRejectModal(pid) {
  state._rejectId = pid;
  document.getElementById('reject-reason').value = '';
  openModal('modal-reject');
}

/* Admin confirms rejection */
function confirmReject() {
  const pid    = state._rejectId;
  const reason = document.getElementById('reject-reason').value.trim();
  const p      = state.pendingCustomers.find(x => x.id === pid);
  if (p) {
    p.status = 'rejected';
    p.rejectReason = reason;
  }
  saveData();
  closeModal('modal-reject');
  renderAdminDash();
}

/* ═══════════════════════════════════════════════════
   CASHIER DASHBOARD
═══════════════════════════════════════════════════ */
function renderCashierDash() {
  const u        = state.currentUser;
  const myCusts  = state.customers.filter(c => c.cashier === u.username);
  const myTxs    = state.transactions.filter(t => t.cashier === u.username);
  const totalDep = myTxs.filter(t => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
  const totalWd  = myTxs.filter(t => t.type === 'withdrawal').reduce((s, t) => s + t.amount, 0);
  const totalBal = myCusts.reduce((s, c) => s + c.balance, 0);

  document.getElementById('cashier-greeting').textContent = `Welcome, ${u.name}`;
  document.getElementById('cashier-sub').textContent      = `${u.territory} Territory — ${myCusts.length} customers`;

  document.getElementById('cashier-stats').innerHTML = `
    ${statCard('My Customers',      myCusts.length, '👥', '#3d9eff')}
    ${statCard('Total Deposits',    fmt(totalDep),  '💰', '#2ecc71')}
    ${statCard('Total Withdrawals', fmt(totalWd),   '💸', '#e74c3c')}
    ${statCard('Total Balance',     fmt(totalBal),  '🏦', '#f5c842')}
  `;

  renderCashierCustomerTable(myCusts);

  /* My pending submissions */
  const myPending = state.pendingCustomers.filter(p => p.cashier === u.username);
  const pendingSection = document.getElementById('cashier-pending-section');

  if (myPending.length > 0) {
    pendingSection.style.display = 'block';
    document.getElementById('cashier-pending-table').innerHTML = myPending.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td class="mono" style="font-size:12px">${p.phone}</td>
        <td>${p.address || '—'}</td>
        <td class="mono" style="font-size:12px">${p.submittedAt}</td>
        <td>
          ${p.status === 'pending'
            ? '<span class="badge badge-yellow">⏳ Pending</span>'
            : p.status === 'approved'
              ? '<span class="badge badge-green">✓ Approved</span>'
              : `<span class="badge badge-red" title="${p.rejectReason || ''}">✗ Rejected</span>`}
        </td>
      </tr>`).join('');
  } else {
    pendingSection.style.display = 'none';
  }
}

function renderCashierCustomerTable(list) {
  const lastActivity = cid => {
    const txs = custTransactions(cid);
    return txs.length ? txs[0].date : 'N/A';
  };
  document.getElementById('cashier-cust-table').innerHTML = list.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td class="mono" style="font-size:12px">${c.phone}</td>
      <td class="amt" style="color:var(--green)">${fmt(c.balance)}</td>
      <td class="mono" style="font-size:12px">${lastActivity(c.id)}</td>
      <td><span class="badge badge-green">Active</span></td>
      <td>
        <button class="btn-sm" style="font-size:11px" onclick="openCustomer('${c.id}')">Manage</button>
      </td>
    </tr>`).join('');
}

function filterCashierCustomers(q) {
  const u = state.currentUser;
  let list = state.customers.filter(c => c.cashier === u.username);
  if (q) {
    q = q.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }
  renderCashierCustomerTable(list);
}

/* ═══════════════════════════════════════════════════
   CUSTOMER DETAIL
═══════════════════════════════════════════════════ */
function openCustomer(cid) {
  state.selectedCustomerId = cid;
  renderCustomerDetail(cid);
  showPage('page-customer-detail');
}

function renderCustomerDetail(cid) {
  const c = state.customers.find(x => x.id === cid);
  if (!c) return;

  const txs      = custTransactions(cid);
  const totalDep = txs.filter(t => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
  const totalWd  = txs.filter(t => t.type === 'withdrawal').reduce((s, t) => s + t.amount, 0);

  const txRows = txs.map(t => `
    <div class="tx-item">
      <div class="tx-left">
        <div class="tx-icon ${t.type === 'deposit' ? 'dep' : 'wd'}">${t.type === 'deposit' ? '📥' : '📤'}</div>
        <div>
          <div class="tx-name">${t.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</div>
          <div class="tx-date">${t.date}</div>
        </div>
      </div>
      <div class="tx-amount ${t.type === 'deposit' ? 'dep' : 'wd'}">${t.type === 'deposit' ? '+' : '-'}${fmt(t.amount)}</div>
    </div>`).join('') || '<div style="padding:24px;color:var(--muted);text-align:center">No transactions yet</div>';

  document.getElementById('customer-detail-content').innerHTML = `
    <div class="customer-header">
      <div class="cust-avatar">${getInitials(c.name)}</div>
      <div class="cust-info">
        <div class="cust-name">${c.name}</div>
        <div class="cust-meta">
          📞 ${c.phone}<br>
          📍 ${c.address || 'N/A'}<br>
          🏦 Cashier: ${USERS[c.cashier]?.name || c.cashier}
        </div>
      </div>
      <div class="balance-chip">${fmt(c.balance)}</div>
    </div>
    <div class="stats-grid" style="margin-bottom:24px">
      ${statCard('Current Balance',  fmt(c.balance), '💰', '#2ecc71')}
      ${statCard('Total Deposited',  fmt(totalDep),  '📥', '#3d9eff')}
      ${statCard('Total Withdrawn',  fmt(totalWd),   '📤', '#e74c3c')}
      ${statCard('Transactions',     txs.length,     '📋', '#f5c842')}
    </div>
    <div class="action-row">
      <button class="btn-sm success" onclick="openDepositModal('${cid}')">💰 Deposit</button>
      <button class="btn-sm danger"  onclick="openWithdrawModal('${cid}')">💸 Withdraw</button>
    </div>
    <div class="section">
      <div class="section-header"><div class="section-title">Transaction History</div></div>
      <div class="tx-list">${txRows}</div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════
   DEPOSITS & WITHDRAWALS
═══════════════════════════════════════════════════ */
function openDepositModal(cid) {
  const c = state.customers.find(x => x.id === cid);
  document.getElementById('deposit-cust-info').textContent = `Customer: ${c.name}  |  Balance: ${fmt(c.balance)}`;
  document.getElementById('dep-amount').value = '';
  document.getElementById('dep-date').value   = today();
  state._modalCid = cid;
  openModal('modal-deposit');
}

function doDeposit() {
  const cid    = state._modalCid;
  const amount = parseInt(document.getElementById('dep-amount').value);
  const date   = document.getElementById('dep-date').value;
  if (!amount || amount <= 0) { alert('Enter a valid amount'); return; }

  const c = state.customers.find(x => x.id === cid);
  c.balance += amount;
  state.transactions.push({ id: uid(), customerId: cid, type: 'deposit', amount, date, cashier: c.cashier });
  saveData();
  closeModal('modal-deposit');
  renderCustomerDetail(cid);

  if (state.currentUser.role === 'admin') renderAdminDash();
  else renderCashierDash();
}

function openWithdrawModal(cid) {
  const c = state.customers.find(x => x.id === cid);
  document.getElementById('withdraw-cust-info').textContent = `Customer: ${c.name}  |  Balance: ${fmt(c.balance)}`;
  document.getElementById('wd-amount').value = '';
  document.getElementById('wd-date').value   = today();
  document.getElementById('wd-err').innerHTML = '';
  state._modalCid = cid;
  openModal('modal-withdraw');
}

function doWithdraw() {
  const cid    = state._modalCid;
  const amount = parseInt(document.getElementById('wd-amount').value);
  const date   = document.getElementById('wd-date').value;
  if (!amount || amount <= 0) return;

  const c = state.customers.find(x => x.id === cid);
  if (amount > c.balance) {
    document.getElementById('wd-err').innerHTML = '<div class="alert alert-err">Insufficient balance!</div>';
    return;
  }

  c.balance -= amount;
  state.transactions.push({ id: uid(), customerId: cid, type: 'withdrawal', amount, date, cashier: c.cashier });
  saveData();
  closeModal('modal-withdraw');
  renderCustomerDetail(cid);

  if (state.currentUser.role === 'admin') renderAdminDash();
  else renderCashierDash();
}

/* ═══════════════════════════════════════════════════
   CASHIER MANAGEMENT (Admin only)
═══════════════════════════════════════════════════ */
function renderCashiers() {
  const cashiers = ['jessica', 'bolu', 'princess'];

  document.getElementById('cashier-table').innerHTML = cashiers.map(cu => {
    const u    = USERS[cu];
    const custs = state.customers.filter(c => c.cashier === cu);
    const txs  = state.transactions.filter(t => t.cashier === cu);
    const dep  = txs.filter(t => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
    const wd   = txs.filter(t => t.type === 'withdrawal').reduce((s, t) => s + t.amount, 0);
    return `<tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.territory}</td>
      <td>${custs.length}</td>
      <td class="amt" style="color:var(--green)">${fmt(dep)}</td>
      <td class="amt" style="color:var(--red)">${fmt(wd)}</td>
    </tr>`;
  }).join('');

  document.getElementById('transfer-cust').innerHTML =
    '<option value="">Select customer…</option>' +
    state.customers.map(c => `<option value="${c.id}">${c.name} (${USERS[c.cashier]?.name})</option>`).join('');

  document.getElementById('transfer-to').innerHTML =
    '<option value="">Select cashier…</option>' +
    cashiers.map(cu => `<option value="${cu}">${USERS[cu].name} (${USERS[cu].territory})</option>`).join('');
}

function doTransfer() {
  const cid = document.getElementById('transfer-cust').value;
  const to  = document.getElementById('transfer-to').value;
  const msg = document.getElementById('transfer-msg');

  if (!cid || !to) {
    msg.innerHTML = '<div class="alert alert-err">Please select both a customer and a cashier.</div>';
    return;
  }
  const c = state.customers.find(x => x.id === cid);
  if (c.cashier === to) {
    msg.innerHTML = '<div class="alert alert-err">Customer is already assigned to this cashier.</div>';
    return;
  }
  c.cashier = to;
  saveData();
  msg.innerHTML = `<div class="alert alert-ok">✅ ${c.name} transferred to ${USERS[to].name}.</div>`;
  renderCashiers();
  setTimeout(() => { msg.innerHTML = ''; }, 3000);
}

/* ═══════════════════════════════════════════════════
   LOANS
═══════════════════════════════════════════════════ */
function renderLoans() {
  const totalDisb   = state.loans.reduce((s, l) => s + l.amount, 0);
  const totalRepaid = state.loans.reduce((s, l) => s + l.totalRepaid, 0);

  document.getElementById('loan-stats').innerHTML = `
    ${statCard('Total Loans',    state.loans.length, '📄', '#9b59b6')}
    ${statCard('Total Disbursed',fmt(totalDisb),     '💸', '#e74c3c')}
    ${statCard('Total Repaid',   fmt(totalRepaid),   '✅', '#2ecc71')}
  `;

  document.getElementById('loan-table').innerHTML = state.loans.map(l => {
    const c    = state.customers.find(x => x.id === l.customerId);
    const bal  = l.amount - l.totalRepaid;
    const done = l.totalRepaid >= l.amount;
    return `<tr>
      <td><strong>${c ? c.name : 'Unknown'}</strong></td>
      <td class="amt">${fmt(l.amount)}</td>
      <td class="mono">${fmt(l.weeklyPay)}/wk</td>
      <td class="amt" style="color:var(--green)">${fmt(l.totalRepaid)}</td>
      <td class="amt" style="color:${done ? 'var(--green)' : 'var(--red)'}">${done ? '₦0' : fmt(bal)}</td>
      <td><span class="badge ${done ? 'badge-green' : 'badge-yellow'}">${done ? 'Cleared' : 'Active'}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:24px">No loans yet</td></tr>';

  const sel = document.getElementById('loan-cust-sel');
  sel.innerHTML = state.customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('loan-date').value = today();
}

function addLoan() {
  const cid    = document.getElementById('loan-cust-sel').value;
  const amount = parseInt(document.getElementById('loan-amount').value);
  const weekly = parseInt(document.getElementById('loan-weekly').value);
  const date   = document.getElementById('loan-date').value;
  if (!amount || !weekly) { alert('Fill in all fields'); return; }
  state.loans.push({ id: uid(), customerId: cid, amount, weeklyPay: weekly, totalRepaid: 0, date });
  saveData();
  closeModal('modal-add-loan');
  renderLoans();
}

/* ═══════════════════════════════════════════════════
   REPORTS
═══════════════════════════════════════════════════ */
function renderReports() {
  document.getElementById('daily-table').innerHTML = state.dailyRecords.map(r => {
    const total = r.savingsCash + r.savingsTransfer + r.loanCash + r.loanTransfer;
    return `<tr>
      <td class="mono" style="font-size:12px">${r.date}</td>
      <td class="amt">${fmt(r.savingsCash)}</td>
      <td class="amt">${fmt(r.savingsTransfer)}</td>
      <td class="amt">${fmt(r.loanCash)}</td>
      <td class="amt">${fmt(r.loanTransfer)}</td>
      <td class="amt" style="color:var(--accent)">${fmt(total)}</td>
    </tr>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════
   EXPENSES
═══════════════════════════════════════════════════ */
function renderExpenses() {
  document.getElementById('expense-table').innerHTML = state.expenses.map(e => `
    <tr>
      <td class="mono" style="font-size:12px">${e.date}</td>
      <td>${e.item}</td>
      <td class="amt">${fmt(e.amount)}</td>
      <td style="color:var(--muted);font-size:13px">${e.comment || '—'}</td>
    </tr>`).join('');
  document.getElementById('exp-date').value = today();
}

function addExpense() {
  const date    = document.getElementById('exp-date').value;
  const item    = document.getElementById('exp-item').value.trim();
  const amount  = parseInt(document.getElementById('exp-amount').value);
  const comment = document.getElementById('exp-comment').value.trim();
  if (!item || !amount) return;
  state.expenses.push({ id: uid(), date, item, amount, comment });
  saveData();
  closeModal('modal-add-expense');
  renderExpenses();
}

/* ═══════════════════════════════════════════════════
   MODALS
═══════════════════════════════════════════════════ */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* Close on backdrop click */
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
initData();
