// Random ASCII Art Selector
// This script randomly selects and displays ASCII art from text files in the ascii folder

class AsciiSelector {
    constructor() {
        // List of ASCII art files in your ascii folder
        this.asciiFiles = [
            'ascii/teddy.txt',
            'ascii/mark.txt',
            'ascii/window.txt',
        ];
        
        this.currentAscii = '';
    }

    // Method to check if device is desktop (not mobile/tablet)
    isDesktop() {
        // Check screen width (desktop typically > 1024px)
        const screenWidth = window.innerWidth;
        
        // Check user agent for mobile indicators
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent);
        
        // Consider desktop if screen width > 1024px AND not mobile user agent
        return screenWidth > 1024 && !isMobile;
    }
    
    // Method to randomly select an ASCII file
    getRandomAsciiFile() {
        const randomIndex = Math.floor(Math.random() * this.asciiFiles.length);
        return this.asciiFiles[randomIndex];
    }

    // Method to fetch and display ASCII art
    async loadRandomAscii() {
        try {
            const selectedFile = this.getRandomAsciiFile();
            console.log(`Loading ASCII from: ${selectedFile}`);
            
            const response = await fetch(selectedFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const asciiText = await response.text();
            this.currentAscii = asciiText;
            
            return asciiText;
        } catch (error) {
            console.error('Error loading ASCII art:', error);
            // Fallback ASCII if files can't be loaded
            return this.getFallbackAscii();
        }
    }

// Method to display ASCII in a specific element
    async displayAscii(elementId = 'ascii-display') {
        const element = document.getElementById(elementId);
        
        if (!element) {
            console.error(`Element with ID '${elementId}' not found`);
            return;
        }
        
        // Only show ASCII art on desktop devices
        if (!this.isDesktop()) {
            element.style.display = 'none';
            return;
        }
        
        const ascii = await this.loadRandomAscii();
        element.style.display = 'block';
        element.textContent = ascii;
        element.style.fontFamily = 'monospace';
        element.style.whiteSpace = 'pre';
        element.style.fontSize = '0.7rem';
        element.style.textAlign = 'center';
    }

    // Fallback ASCII art if files can't be loaded
    getFallbackAscii() {
        const fallbackOptions = [
            `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
            `,
            `
██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
███████║███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
            `,
            `
███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝ 
╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝  
███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║   
╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝   
            `
        ];
        
        const randomIndex = Math.floor(Math.random() * fallbackOptions.length);
        return fallbackOptions[randomIndex];
    }

    // Method to cycle through ASCII art at intervals
    startRotation(elementId = 'ascii-display', intervalMs = 5000) {
        this.displayAscii(elementId);
        
        return setInterval(() => {
            this.displayAscii(elementId);
        }, intervalMs);
    }
    // Method to get current ASCII content
    getCurrentAscii() {
        return this.currentAscii;
    }
}

// Usage Examples:

// Initialize the ASCII selector
const asciiSelector = new AsciiSelector();

// Load and display random ASCII art
asciiSelector.displayAscii('ascii-art');

// Start automatic rotation every 5 seconds
// const rotationInterval = asciiSelector.startRotation('ascii-art', 5000);

// Stop rotation
// clearInterval(rotationInterval);

// Add custom ASCII files
// asciiSelector.addAsciiFile('ascii/custom.txt');

// Load ASCII programmatically
// asciiSelector.loadRandomAscii().then(ascii => {
//     console.log('Loaded ASCII:', ascii);
// });

// Example HTML structure needed:
/*
<div id="ascii-art" class="ascii-display"></div>
*/

// Example CSS for styling:
/*
.ascii-display {
    font-family: 'Courier New', monospace;
    white-space: pre;
    color: #FF9700;
    font-size: 0.7rem;
    text-align: center;
    line-height: 1;
}
*/