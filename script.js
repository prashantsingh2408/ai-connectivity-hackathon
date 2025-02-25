// Theme configuration
const CONFIG = {
    DEFAULT_THEME: 'light'
};

// Add these variables at the top
const THEME_CYCLE_INTERVAL = 8000; // Time between theme changes (8 seconds)
let autoThemeInterval = null;
window.rainEffect = null; // Make it globally accessible

// Theme handling
function applyTheme(theme, isAuto = false) {
    // If switching to auto theme
    if (theme === 'auto') {
        // Toggle auto theme
        if (autoThemeInterval) {
            clearInterval(autoThemeInterval);
            autoThemeInterval = null;
            document.body.removeAttribute('data-theme-auto');
            // Revert to previous theme or default
            const savedTheme = localStorage.getItem('selected-theme') || CONFIG.DEFAULT_THEME;
            applyTheme(savedTheme);
        } else {
            startAutoTheme();
        }
        return;
    }

    // If switching to a specific theme, stop auto cycling
    if (!isAuto && autoThemeInterval) {
        clearInterval(autoThemeInterval);
        autoThemeInterval = null;
        document.body.removeAttribute('data-theme-auto');
    }

    // Add transition class before changing theme
    document.body.classList.add('theme-transition');
    
    // Remove all existing theme classes
    document.body.classList.remove('theme-dark', 'theme-green', 'theme-blue');
    
    // Remove all data-theme attributes
    document.body.removeAttribute('data-theme');
    
    // Apply the new theme
    if (theme === 'dark' || theme === 'green' || theme === 'blue') {
        document.body.classList.add(`theme-${theme}`);
    } else {
        // For other themes, use data-theme attribute
        document.body.setAttribute('data-theme', theme);
    }
    
    // Add theme switch animation
    document.body.classList.add('theme-switch');
    
    // Store the selected theme
    localStorage.setItem('selected-theme', theme);
    
    // Update theme options
    updateThemeOptions();
    
    // Remove transition classes after animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition', 'theme-switch');
    }, 500);
}

// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selected-theme') || CONFIG.DEFAULT_THEME;
    applyTheme(savedTheme);
});

// Add these functions to your script.js
function toggleThemeDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    dropdown.classList.toggle('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('theme-dropdown');
    const themeButton = event.target.closest('.theme-btn');
    
    if (!themeButton && !event.target.closest('#theme-dropdown')) {
        dropdown.classList.add('hidden');
    }
});

// Update theme option styles when theme changes
function updateThemeOptions() {
    const currentTheme = localStorage.getItem('selected-theme') || CONFIG.DEFAULT_THEME;
    const options = document.querySelectorAll('.theme-option');
    const isAutoMode = autoThemeInterval !== null;
    
    options.forEach(option => {
        // Reset all options
        option.classList.remove('active', 'theme-selected');
        
        // Get theme from onclick attribute
        const themeMatch = option.getAttribute('onclick').match(/applyTheme\('(.+?)'\)/);
        const optionTheme = themeMatch ? themeMatch[1] : null;
        
        // Add active class to current theme or auto button
        if ((isAutoMode && optionTheme === 'auto') || (!isAutoMode && optionTheme === currentTheme)) {
            option.classList.add('active', 'theme-selected');
        }
    });
}

// Add hover effect for the main theme button
document.querySelector('.theme-btn').addEventListener('mouseover', function() {
    this.querySelector('i').style.transform = 'rotate(180deg)';
});

document.querySelector('.theme-btn').addEventListener('mouseout', function() {
    this.querySelector('i').style.transform = 'rotate(0deg)';
});

// Add this function to handle auto theme cycling
function startAutoTheme() {
    const themes = [
        'dark', 'dark-2', 'purple', 'blue', 'ocean',
        'sunset', 'rose', 'forest', 'midnight',
        'coral', 'mint', 'amber', 'nordic',
        'sakura', 'cyber', 'autumn'
    ];
    let currentIndex = 0;

    // Mark body as in auto mode
    document.body.setAttribute('data-theme-auto', 'true');
    
    // Store auto as the selected theme
    localStorage.setItem('selected-theme', 'auto');
    
    // Initial theme
    applyTheme(themes[currentIndex], true);

    // Start cycling with ultra-smooth fade effect
    autoThemeInterval = setInterval(() => {
        document.body.style.opacity = '0.99';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % themes.length;
            document.body.classList.add('theme-auto-transition');
            applyTheme(themes[currentIndex], true);
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 500);
        }, 1000);
    }, THEME_CYCLE_INTERVAL);

    // Update theme options to show auto as active
    updateThemeOptions();
}

// Add this function to handle rain toggle
function toggleRainEffect() {
    const rainStatus = document.querySelector('.rain-status');
    if (!window.rainEffect) {
        // Initialize rain effect if not already created
        window.rainEffect = new RainEffect();
        rainStatus.classList.remove('hidden');
    } else {
        // Toggle existing rain effect
        window.rainEffect.toggle();
        rainStatus.classList.toggle('hidden', !window.rainEffect.isActive);
    }
} 