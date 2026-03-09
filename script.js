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