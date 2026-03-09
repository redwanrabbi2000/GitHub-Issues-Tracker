// 1. GLOBAL STATE (50 Issues from your JSON)
let allIssues = [
    {
        "id": 1,
        "title": "Fix navigation menu on mobile devices",
        "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        "status": "open",
        "labels": ["bug", "help wanted"],
        "priority": "high",
        "author": "john_doe",
        "createdAt": "2024-01-15T10:30:00Z"
    },
    // ... Paste your remaining 49 issue objects here
];

// 2. AUTHENTICATION
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        fetchIssues(); 
    } else {
        alert('Invalid Credentials! Use admin / admin123');
    }
});
// 3. DATA FETCHING
async function fetchIssues() {
    toggleLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); 

    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues', {
            signal: controller.signal
        });
        if (!res.ok) throw new Error("API Offline");
        const json = await res.json();
        allIssues = json.data || json; 
    } catch (err) {
        console.warn("Using local 50-issue fallback data.");
    } finally {
        clearTimeout(timeoutId);
        renderIssues(allIssues);
        toggleLoading(false);
    }
}
// 4. RENDERING (Grid and Cards)
function renderIssues(issues) {
    const grid = document.getElementById('issues-grid');
    const countText = document.getElementById('issue-count');
    grid.innerHTML = '';
    
    // Updates "50 Issues" header
    countText.innerText = `${issues.length || 0} Issues`;

    issues.forEach(issue => {
        const issueId = issue._id || issue.id;
        const borderColor = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-600';
        
        // Priority Color Logic
        const p = issue.priority.toLowerCase();
        let priorityClass = 'bg-gray-100 text-gray-500'; // Low (Gray)
        if (p === 'high') priorityClass = 'bg-red-50 text-red-500'; // High (Red)
        if (p === 'medium') priorityClass = 'bg-yellow-50 text-yellow-600'; // Medium (Yellow)

        const card = document.createElement('div');
        card.className = `bg-white border border-gray-200 border-t-4 ${borderColor} rounded-lg p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between`;
        card.onclick = () => showDetails(issueId);

        const labelHtml = (issue.labels || []).map(label => {
            const isBug = label.toLowerCase().includes('bug');
            const colorClass = isBug ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600';
            const icon = isBug ? '🐞' : '🙋';
            return `<span class="${colorClass} text-[10px] font-bold px-2 py-1 rounded uppercase">${icon} ${label}</span>`;
        }).join('');

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="${priorityClass} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        ${issue.priority}
                    </span>
                </div>
                <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">${issue.title}</h3>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">${issue.description}</p>
            </div>
            <div class="mt-auto">
                <div class="flex flex-wrap gap-2 mb-4">
                    ${labelHtml}
                </div>
                <div class="text-[11px] text-gray-400 border-t pt-3">
                    <p>#${issueId} by ${issue.author}</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 5. FILTERING
function filterIssues(status) {
    const buttons = ['all', 'open', 'closed'];
    buttons.forEach(b => {
        const el = document.getElementById(`btn-${b}`);
        if (el) {
            el.className = "px-8 py-4 font-medium transition border-b-2 " + 
                (b === status ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-600 border-transparent hover:bg-gray-100');
        }
    });

    const filtered = status === 'all' ? allIssues : allIssues.filter(i => i.status === status);
    renderIssues(filtered);
}

// 6. SEARCH
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allIssues.filter(i => 
        i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)
    );
    renderIssues(filtered);
});

// 7. MODAL (Popup)
async function showDetails(id) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    modal.classList.replace('hidden', 'flex');
    
    const issue = allIssues.find(i => (i._id || i.id).toString() === id.toString());

    if (issue) {
        // Modal Priority Color
        const p = issue.priority.toLowerCase();
        let modalPriorityClass = 'bg-gray-400'; 
        if (p === 'high') modalPriorityClass = 'bg-red-500'; 
        if (p === 'medium') modalPriorityClass = 'bg-yellow-500'; 

        content.innerHTML = `
            <h2 class="text-3xl font-bold text-gray-800 mb-2">${issue.title}</h2>
            <div class="flex items-center gap-2 mb-6 text-sm">
                <span class="bg-green-600 text-white px-3 py-1 rounded-full font-medium">${issue.status}</span>
                <span class="text-gray-400">• Opened by <span class="text-gray-700 font-semibold">${issue.author}</span> • ${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <p class="text-gray-600 leading-relaxed mb-8">${issue.description}</p>
            <div class="bg-gray-50 rounded-xl p-6 flex justify-between items-center">
                <div>
                    <p class="text-xs text-gray-400 uppercase font-bold mb-1">Assignee:</p>
                    <p class="font-bold text-gray-800">${issue.assignee || issue.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-400 uppercase font-bold mb-1">Priority:</p>
                    <span class="${modalPriorityClass} text-white px-4 py-1 rounded text-xs font-bold uppercase">
                        ${issue.priority}
                    </span>
                </div>
            </div>
        `;
    }
}

function closeModal() {
    document.getElementById('modal').classList.replace('flex', 'hidden');
}

function toggleLoading(show) {
    const loader = document.getElementById('loading');
    if (loader) loader.classList.toggle('hidden', !show);
}