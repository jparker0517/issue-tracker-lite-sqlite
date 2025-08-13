const API = '/api/issues';
const listEl = document.getElementById('list');
const form = document.getElementById('issueForm');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchIssues() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

function render(issues) {
  listEl.innerHTML = '';
  if (!issues.length) {
    listEl.innerHTML = '<p>No issues yet. Add one above.</p>';
    return;
  }
  issues.forEach(issue => {
    const div = document.createElement('div');
    div.className = 'issue';
    div.innerHTML = `
      <div class="${issue.resolved ? 'resolved' : ''}"><strong>${escapeHtml(issue.title)}</strong></div>
      <div>${escapeHtml(issue.description)}</div>
      <div class="meta">Priority: ${issue.priority} • Created: ${new Date(issue.createdAt).toLocaleString()}</div>
      <div class="actions">
        <button data-id="${issue.id}" data-action="toggle">${issue.resolved ? 'Reopen' : 'Resolve'}</button>
        <button data-id="${issue.id}" data-action="delete">Delete</button>
      </div>
    `;
    div.addEventListener('click', async (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      if (action === 'toggle') {
        await fetch(`${API}/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({}) });
      } else if (action === 'delete') {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
      }
      fetchIssues();
    });
    listEl.appendChild(div);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.getElementById('priority').value;
  if (!title || !description) return;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, priority })
  });
  form.reset();
  fetchIssues();
});

refreshBtn.addEventListener('click', fetchIssues);

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

fetchIssues();
