/**
 * =========================================================
 * 1. Global Setup and DOM Element Selection
 * =========================================================
 */
// Select the form and feedback elements
const form = document.getElementById('cosmicSurveyForm');
const nameInput = document.getElementById('explorerName');
const emailInput = document.getElementById('explorerEmail');
const planetInput = document.getElementById('favoritePlanet');
const formFeedback = document.getElementById('formFeedback');

// Select the interactive elements
const modeToggleButton = document.getElementById('modeToggleButton');
const starCountSlider = document.getElementById('starCountSlider');
const starCountDisplay = document.getElementById('starCountDisplay');
const calculateGravityButton = document.getElementById('calculateGravityButton');
const earthJumpHeightInput = document.getElementById('earthJumpHeight');
const jupiterJumpResult = document.getElementById('jupiterJumpResult');


/**
 * =========================================================
 * 2. Form Validation Utility Functions (Core Logic)
 * =========================================================
 */

/**
 * Validates the Explorer Name.
 * Must be at least 3 characters long and contain only letters and spaces.
 * @param {string} name - The name string from the input.
 * @returns {string|null} The error message or null if valid.
 */
function validateName(name) {
    if (name.length < 3) {
        return "Name must be at least 3 characters long.";
    }
    // Regex to allow letters (a-z, A-Z) and spaces
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return "Name can only contain letters and spaces.";
    }
    return null;
}

/**
 * Validates the Explorer Email.
 * Basic regex check for a common email format (user@domain.ext).
 * @param {string} email - The email string from the input.
 * @returns {string|null} The error message or null if valid.
 */
function validateEmail(email) {
    // A simple, non-perfect, but effective email regex check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address (e.g., name@domain.com).";
    }
    return null;
}

/**
 * Validates the Favorite Celestial Body.
 * Must be at least 2 characters and cannot contain numbers.
 * @param {string} planet - The planet name string from the input.
 * @returns {string|null} The error message or null if valid.
 */
function validatePlanet(planet) {
    if (planet.length < 2) {
        return "Planet/Moon name must be at least 2 characters long.";
    }
    // Simple check to ensure no digits are included
    if (/\d/.test(planet)) {
        return "Planet/Moon name cannot contain numbers.";
    }
    return null;
}

/**
 * Helper function to show/clear error messages on the DOM.
 * @param {HTMLElement} element - The error message div element.
 * @param {string|null} message - The error message to display.
 */
function displayError(element, message) {
    element.textContent = message || '';
    element.style.display = message ? 'block' : 'none';
}


/**
 * =========================================================
 * 3. Custom Form Validation and Submission Handler
 * =========================================================
 */
form.addEventListener('submit', function(event) {
    // Prevent the default HTML form submission
    event.preventDefault();

    let isValid = true;
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let planet = planetInput.value.trim();

    // 1. Validate Name
    const nameError = validateName(name);
    displayError(document.getElementById('nameError'), nameError);
    if (nameError) isValid = false;

    // 2. Validate Email
    const emailError = validateEmail(email);
    displayError(document.getElementById('emailError'), emailError);
    if (emailError) isValid = false;
    
    // 3. Validate Planet
    const planetError = validatePlanet(planet);
    displayError(document.getElementById('planetError'), planetError);
    if (planetError) isValid = false;

    // Final check and feedback
    if (isValid) {
        // Form is fully valid, show success message
        formFeedback.textContent = `Success, ${name}! Your cosmic data has been transmitted.`;
        formFeedback.style.color = 'green';
        form.reset(); // Clear the form after submission
    } else {
        // Form failed validation
        formFeedback.textContent = 'Validation failed. Please correct the errors above.';
        formFeedback.style.color = 'red';
    }
});


/**
 * =========================================================
 * 4. Interactive Feature 1: Light/Dark Mode Toggle (Event Handling)
 * =========================================================
 */
modeToggleButton.addEventListener('click', function() {
    // Toggle the 'dark-mode' class on the body
    document.body.classList.toggle('dark-mode');

    // Change button text based on the current mode
    if (document.body.classList.contains('dark-mode')) {
        modeToggleButton.textContent = 'Toggle Light Mode';
    } else {
        modeToggleButton.textContent = 'Toggle Dark Mode';
    }
});


/**
 * =========================================================
 * 5. Interactive Feature 2: Star Count Adjuster (Custom Feature from scratch)
 * =========================================================
 */
starCountSlider.addEventListener('input', function() {
    // Get the current value from the slider
    const starCount = starCountSlider.value;
    
    // Format the number with commas for better readability (e.g., 5000 -> 5,000)
    const formattedCount = new Intl.NumberFormat('en-US').format(starCount);

    // Update the display element with the new, formatted count
    starCountDisplay.textContent = formattedCount;
});


/**
 * =========================================================
 * 6. Interactive Feature 3: Gravity Calculator (Custom Feature from scratch)
 * =========================================================
 */
calculateGravityButton.addEventListener('click', function() {
    // Define the gravity difference factor (Jupiter's gravity is about 2.5 times Earth's)
    const gravityFactor = 2.5;

    // Get the input value and convert it to a floating-point number
    const earthHeight = parseFloat(earthJumpHeightInput.value);

    // Check if the input is a valid positive number
    if (isNaN(earthHeight) || earthHeight <= 0) {
        jupiterJumpResult.textContent = 'Please enter a valid jump height.';
        return;
    }

    // Calculation: Jump height is inversely proportional to gravity (h_jupiter = h_earth / gravityFactor)
    const jupiterHeight = earthHeight / gravityFactor;

    // Display the result, formatted to 2 decimal places
    jupiterJumpResult.innerHTML = `<strong>${jupiterHeight.toFixed(2)} meters</strong>`;
});
