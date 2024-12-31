/**
 * PetPal Mechanics (No Login)
 */

// Grab relevant DOM elements
const petContainer = document.getElementById("petContainer");
const petDisplay = document.getElementById("petDisplay");
const feedBtn = document.getElementById("feedBtn");
const statusMessage = document.getElementById("statusMessage");

// Health bar
const healthBar = document.getElementById("healthBar");
let currentHealth = 100;       // current health value
const maxHealth = 100;         // maximum health
const sickThreshold = 30;      // below this, pet is sick

// Interval for decreasing health over time
let healthDecreaseInterval;

// Once the page loads, initialize the pet
window.addEventListener("load", function() {
    initPet();
});

// Food effects (health values)
const foodEffects = {
    apple: 10,    // Apple restores 10 health
    orange: 20,   // Orange restores 20 health
    banana: 30    // Banana restores 30 health
};
function initPet() {
    // Start with full health
    currentHealth = maxHealth;
    updateHealthBar();

    // Example: decrease health every second
    // (Adjust to a slower or faster rate as you prefer)
    healthDecreaseInterval = setInterval(() => {
        decreaseHealth(1); // Decrease by 1 each interval
    }, 100);
}

/**
 * Decrease the pet's health
 * @param {number} amount 
 */
function decreaseHealth(amount) {
    currentHealth -= amount;
    if (currentHealth < 0) {
        currentHealth = 0;
    }
    updateHealthBar();
}

/**
 * Increase the pet's health (Feed the pet)
 */
feedBtn.addEventListener("click", function() {
    // Get the selected food from the dropdown
    const selectedFood = foodSelector.value;

    // Get the health effect of the selected food
    const healthIncrease = foodEffects[selectedFood] || 0; // Default to 0 if not found

    // Increase the pet's health based on the food
    currentHealth += healthIncrease;
    if (currentHealth > maxHealth) {
        currentHealth = maxHealth;
    }

    // Temporarily switch to "eating" image
    petDisplay.style.backgroundImage = "url('bf0.jpg')";
    setTimeout(() => {
        petDisplay.style.backgroundImage = "url('150.jpg')";
    }, 500);

    updateHealthBar();
});

/**
 * Update the health bar width and check if the pet is sick
 */
function updateHealthBar() {
    const healthPercent = (currentHealth / maxHealth) * 100;
    healthBar.style.width = healthPercent + "%";

    // Pet is sick if below threshold
    if (currentHealth < sickThreshold) {
        statusMessage.style.display = "block";
    } else {
        statusMessage.style.display = "none";
    }
}
