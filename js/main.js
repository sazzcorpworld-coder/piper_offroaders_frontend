// Common functionality for all pages

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // Check if user is trying to access protected pages without authentication
    const protectedPages = ['dashboard.html', 'drives.html', 'marketplace.html', 'forum.html', 'voting.html', 'admin.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (protectedPages.includes(currentPage) && (!token || !user)) {
        window.location.href = 'login.html';
        return;
    }
    
    // If user is authenticated, update UI accordingly
    if (token && user) {
        updateUserInterface();
    }
}

function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userMenu = document.getElementById('userMenu');
    const authButtons = document.getElementById('authButtons');
    
    // Hide auth buttons and show user menu
    if (authButtons) {
        authButtons.classList.add('hidden');
    }
    
    if (userMenu) {
        userMenu.classList.remove('hidden');
        
        // Show/hide role-specific links
        const votingLink = document.getElementById('votingLink');
        const adminLink = document.getElementById('adminLink');
        
        if (votingLink && (user.role === 'marshal' || user.role === 'admin')) {
            votingLink.classList.remove('hidden');
        }
        
        if (adminLink && user.role === 'admin') {
            adminLink.classList.remove('hidden');
        }
    }
}

function logout() {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getRoleColor(role) {
    const colors = {
        'newbie': 'bg-green-100 text-green-800',
        'intermediate': 'bg-blue-100 text-blue-800',
        'advanced': 'bg-purple-100 text-purple-800',
        'marshal': 'bg-red-100 text-red-800',
        'admin': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
}

function getStatusColor(status) {
    const colors = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-gray-100 text-gray-800',
        'banned': 'bg-red-100 text-red-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'available': 'bg-green-100 text-green-800',
        'sold': 'bg-red-100 text-red-800',
        'upcoming': 'bg-blue-100 text-blue-800',
        'ongoing': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800',
        'open': 'bg-blue-100 text-blue-800',
        'closed': 'bg-gray-100 text-gray-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Error handling
function handleError(error, customMessage = 'An error occurred') {
    console.error('Error:', error);
    
    let message = customMessage;
    
    if (error.response) {
        // Server responded with error
        message = error.response.data.message || customMessage;
        
        // Handle specific error codes
        if (error.response.status === 401) {
            // Unauthorized - clear auth and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            return;
        } else if (error.response.status === 403) {
            message = 'Access denied. You do not have permission to perform this action.';
        } else if (error.response.status === 404) {
            message = 'Resource not found.';
        } else if (error.response.status === 500) {
            message = 'Server error. Please try again later.';
        }
    } else if (error.request) {
        // Request made but no response
        message = 'Unable to connect to server. Please check your connection.';
    }
    
    // Show error message to user
    showNotification(message, 'error');
}

// Success notification
function showSuccess(message) {
    showNotification(message, 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
    const colors = {
        'success': 'bg-green-500 text-white',
        'error': 'bg-red-500 text-white',
        'warning': 'bg-yellow-500 text-white',
        'info': 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Loading state management
function showLoading(elementId = 'loadingState') {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
}

function hideLoading(elementId = 'loadingState') {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

// API request helpers
async function apiRequest(method, url, data = null, requiresAuth = true) {
    const config = {
        method: method,
        url: url,
        headers: {}
    };
    
    if (requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    
    if (data) {
        if (data instanceof FormData) {
            config.data = data;
        } else {
            config.data = data;
            config.headers['Content-Type'] = 'application/json';
        }
    }
    
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Validate file upload
function validateFile(file, allowedTypes = ['image/*'], maxSize = 5 * 1024 * 1024) {
    if (!file) {
        return { valid: false, message: 'No file selected' };
    }
    
    // Check file type
    const allowed = allowedTypes.some(type => {
        if (type.endsWith('/*')) {
            return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
    });
    
    if (!allowed) {
        return { valid: false, message: 'Invalid file type' };
    }
    
    // Check file size
    if (file.size > maxSize) {
        return { 
            valid: false, 
            message: `File size too large. Maximum size is ${formatFileSize(maxSize)}` 
        };
    }
    
    return { valid: true };
}

// Initialize tooltips (if using a tooltip library)
function initializeTooltips() {
    // This would be implemented based on your tooltip library of choice
    // Example for Tippy.js:
    // tippy('[data-tooltip]');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
});

// Export functions for use in other scripts
window.PiperOffroaders = {
    checkAuthStatus,
    logout,
    formatDate,
    getRoleColor,
    getStatusColor,
    handleError,
    showSuccess,
    showNotification,
    showLoading,
    hideLoading,
    validateEmail,
    validatePassword,
    saveToStorage,
    loadFromStorage,
    apiRequest,
    debounce,
    formatFileSize,
    validateFile
};