const items = [
    { id: 'item-1', name: 'VALISE 2', icon: '🧳' },
    { id: 'item-2', name: 'PORTABLE BAGS', icon: '🎒' },
    { id: 'item-3', name: 'SHOES TWO PAIRS', icon: '👟' },
    { id: 'item-4', name: 'TOWELS 2', icon: '🛁' },
    { id: 'item-5', name: 'AMASHUKA 1 PAIR', icon: '🛏️' },
    { id: 'item-6', name: 'CLOTHES(AMAPINJAMA ETC)', icon: '👕' },
    { id: 'item-7', name: 'DECORATIONS', icon: '🎉' }
];

const listContainer = document.getElementById('shopping-list');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const themeToggleBtn = document.getElementById('theme-toggle');
const resetBtn = document.getElementById('reset-btn');

// Load state from local storage
let boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || [];
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Initialize Theme
if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Render the list
function renderList() {
    listContainer.innerHTML = '';
    
    items.forEach((item, index) => {
        const isBought = boughtItems.includes(item.id);
        
        const li = document.createElement('li');
        li.className = `list-item ${isBought ? 'bought' : ''}`;
        li.style.animationDelay = `${index * 0.1}s`;
        li.dataset.id = item.id;
        
        li.innerHTML = `
            <div class="checkbox-container">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div class="item-content">
                <span class="item-icon">${item.icon}</span>
                <span class="item-text">${item.name}</span>
            </div>
        `;
        
        li.addEventListener('click', () => toggleItem(item.id));
        listContainer.appendChild(li);
    });
    
    updateProgress();
}

// Toggle an item's bought status
function toggleItem(id) {
    const index = boughtItems.indexOf(id);
    if (index > -1) {
        boughtItems.splice(index, 1); // Remove if exists
    } else {
        boughtItems.push(id); // Add if doesn't exist
    }
    
    // Save and re-render
    localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
    renderList();
}

// Update the progress bar
function updateProgress() {
    const total = items.length;
    const bought = boughtItems.length;
    const percentage = (bought / total) * 100;
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${bought}/${total} Bought`;
}

// Toggle theme
themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Reset items
resetBtn.addEventListener('click', () => {
    // Optional: add a confirmation dialogue
    if(confirm('Are you sure you want to reset the list?')) {
        boughtItems = [];
        localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
        renderList();
    }
});

// Initial render
renderList();
