const reviewBtn = document.getElementById("reviewBtn");
const bugBtn = document.getElementById("bugBtn");
const output = document.getElementById("output");
const codeInput = document.getElementById("code");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const languageSelect = document.getElementById("language");
const statusIndicator = document.getElementById("statusIndicator");
const statusText = document.getElementById("statusText");

// Get API URL from environment or use default
const API_BASE_URL = window.API_BASE_URL || localStorage.getItem('API_BASE_URL') || "http://localhost:5000";

// Function to get language-specific review UI language (different from programming language)
function getReviewUILanguage() {
    // For now, always use English for UI
    // Later can add a separate UI language selector
    return 'en';
}

// Check backend connection status
async function checkBackendStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/message`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            statusIndicator.className = 'status-indicator status-online';
            statusText.textContent = '✓ Backend Connected';
            statusText.style.color = '#10b981';
            return true;
        } else {
            throw new Error('Backend not responding');
        }
    } catch (error) {
        statusIndicator.className = 'status-indicator status-offline';
        statusText.textContent = '✗ Backend Offline';
        statusText.style.color = '#dc2626';
        return false;
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    console.error('Error:', message);
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = '✓ ' + message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

// Hide messages
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Clear output
function clearOutput() {
    output.innerHTML = '';
}

// Show loading state
function showLoading() {
    clearOutput();
    output.innerHTML = '<div class="loading">Processing your code</div>';
}

// Review Code
reviewBtn.addEventListener("click", async () => {
    const code = codeInput.value.trim();
    const programmingLanguage = languageSelect.value;
    const reviewUILanguage = getReviewUILanguage();

    if (!code) {
        showError("Please paste some code to review");
        return;
    }

    if (code.length < 10) {
        showError("Code is too short. Please paste at least 10 characters");
        return;
    }

    hideMessages();
    showLoading();

    try {
        // Check backend connection first
        const isConnected = await checkBackendStatus();
        if (!isConnected) {
            showError("Cannot connect to backend server. Make sure it's running on port 5000");
            output.innerHTML = '<div style="padding: 15px; background: #1f2937; border-radius: 8px; color: #a1a1a1;"><p>💡 To start the backend:</p><ol><li>Open Command Prompt/PowerShell</li><li>Navigate to Backend App folder</li><li>Run: <code>npm start</code></li></ol></div>';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/review-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                code: code,
                language: reviewUILanguage,
                programmingLanguage: programmingLanguage
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();

        // Check if we have review data
        if (!data.review || data.review.length === 0) {
            showError("No review data received from server. Please check your Llama API key in .env");
            output.innerHTML = '<div style="padding: 15px; background: #1f2937; border-radius: 8px; color: #a1a1a1;"><p>Make sure your Llama API key is valid in Backend App/.env</p></div>';
            return;
        }

        showSuccess(`Code review completed (${data.review.length} items)`);
        output.innerHTML = "<h3>📋 Code Review</h3>";

        data.review.forEach((item, index) => {
            const emoji = {
                'error': '❌',
                'warning': '⚠️',
                'improvement': '💡',
                'feedback': '📝'
            }[item.type] || '📌';

            output.innerHTML += `
                <div class="card ${item.type}" style="margin: 10px 0; padding: 15px; background: #334155; border-left: 4px solid ${getTypeColor(item.type)}; border-radius: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span>${emoji}</span>
                        <strong style="color: ${getTypeColor(item.type)}; text-transform: capitalize;">${item.type}</strong>
                    </div>
                    <p style="margin: 0; color: #e2e8f0;">${item.message}</p>
                </div>
            `;
        });

        output.style.marginTop = '20px';

    } catch (err) {
        const errorMsg = err.message || "Error connecting to backend";
        showError(errorMsg);
        output.innerHTML = `
            
        `;
        console.error("Full error:", err);
    }
});

// Detect Bugs
bugBtn.addEventListener("click", async () => {
    const code = codeInput.value.trim();
    const programmingLanguage = languageSelect.value;
    const reviewUILanguage = getReviewUILanguage();

    if (!code) {
        showError("Please paste some code to analyze");
        return;
    }

    if (code.length < 10) {
        showError("Code is too short. Please paste at least 10 characters"); 
        return;
    }

    hideMessages();
    showLoading();

    try {
        // Check backend connection first
        const isConnected = await checkBackendStatus();
        if (!isConnected) {
            showError("Cannot connect to backend server. Make sure it's running on port 5000");
            output.innerHTML = '<div style="padding: 15px; background: #1f2937; border-radius: 8px; color: #a1a1a1;"><p>💡 To start the backend:</p><ol><li>Open Command Prompt/PowerShell</li><li>Navigate to Backend App folder</li><li>Run: <code>npm start</code></li></ol></div>';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/detect-bugs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                code: code,
                language: reviewUILanguage,
                programmingLanguage: programmingLanguage
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();

        // Check if we have bugs data
        if (!data.bugs || data.bugs.length === 0) {
            showSuccess("No bugs found! Your code looks good.");
            output.innerHTML = '<div style="padding: 15px; background: #1f2937; border: 1px solid #10b981; border-radius: 8px; color: #a7f3d0;"><p>✓ No bugs detected in your code!</p></div>';
            return;
        }

        showSuccess(`Found ${data.bugs.length} bug(s) with patches`);
        output.innerHTML = "<h3>🐛 Bugs Found</h3>";

        data.bugs.forEach((bug, index) => {
            output.innerHTML += `
                <div class="card bug" style="margin: 10px 0; padding: 15px; background: #7f1d1d; border-left: 4px solid #dc2626; border-radius: 6px;">
                    <div style="color: #fecaca; margin-bottom: 8px;">
                        <strong>Bug #${index + 1}</strong> 
                        <span style="color: #a1a1a1;">(Line: ${bug.line})</span>
                    </div>
                    <p style="margin: 8px 0; color: #fecaca;"><strong>Issue:</strong> ${bug.issue}</p>
                    <p style="margin: 8px 0; color: #fecaca;"><strong>Fix:</strong> ${bug.fix}</p>
                </div>
            `;
        });

        if (data.patches && data.patches.length > 0) {
            output.innerHTML += "<h3>🔧 Suggested Patches</h3>";
            data.patches.forEach((patch, index) => {
                output.innerHTML += `
                    <div class="card patch" style="margin: 10px 0; padding: 15px; background: #1f2937; border-left: 4px solid #10b981; border-radius: 6px;">
                        <p style="color: #a1a1a1; margin-top: 0;"><strong>Patch #${index + 1}:</strong> ${patch.description || 'See corrected code below'}</p>
                        <pre style="background: #0f172a; padding: 12px; border-radius: 4px; overflow-x: auto; color: #e2e8f0; font-size: 12px;">${escapeHtml(patch.updated_code)}</pre>
                    </div>
                `;
            });
        }

        output.style.marginTop = '20px';

    } catch (err) {
        const errorMsg = err.message || "Error connecting to backend";
        showError(errorMsg);
        output.innerHTML = `
            <div style="padding: 15px; background: #1f2937; border: 1px solid #dc2626; border-radius: 8px; color: #fecaca;">
                <p><strong>Troubleshooting:</strong></p>
                <ul>
                    <li>Check if backend is running: npm start from Backend App folder</li>
                    <li>Verify port 5000 is not blocked by firewall</li>
                    <li>Check Llama API key in Backend App/.env</li>
                    <li>Check browser console for more details (F12)</li>
                </ul>
            </div>
        `;
        console.error("Full error:", err);
    }
});

// Helper function to get color based on bug type
function getTypeColor(type) {
    const colors = {
        'error': '#dc2626',
        'warning': '#f59e0b',
        'improvement': '#3b82f6',
        'feedback': '#8b5cf6',
        'bug': '#dc2626'
    };
    return colors[type] || '#6b7280';
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Check backend status when page loads
window.addEventListener('load', () => {
    checkBackendStatus();
    // Recheck every 10 seconds
    setInterval(checkBackendStatus, 10000);
    
    // Load saved API URL
    const apiUrlInput = document.getElementById('apiUrlInput');
    if (apiUrlInput) {
        apiUrlInput.value = API_BASE_URL;
    }
});

// Settings functionality
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const apiUrlInput = document.getElementById('apiUrlInput');

if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        apiUrlInput.value = API_BASE_URL || localStorage.getItem('API_BASE_URL') || "http://localhost:5000";
    });
}

if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
}

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
        const newUrl = apiUrlInput.value.trim();
        if (newUrl) {
            localStorage.setItem('API_BASE_URL', newUrl);
            window.location.reload();
        } else {
            showError('Please enter a valid API URL');
        }
    });
}

// Close modal when clicking outside
if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
}

// Allow Enter key to submit review
codeInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        reviewBtn.click();
    }
});
