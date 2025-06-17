/**
 * Validates a credit card number using the Luhn algorithm and determines the card brand.
 * @param {string} cardNumber - The credit card number to validate.
 * @returns {object} - An object containing validation status and card brand.
 */
function validateCreditCard(cardNumber) {
    // Check if the card number contains only digits
    if (!/^\d+$/.test(cardNumber)) {
        return {
            isValid: false,
            brand: "Invalid",
            message: "Card number must contain only digits.",
        };
    }

    const cardBrands = {
        visa: /^4[0-9]{11,15}$/, // VISA card numbers can be between 12 and 16 digits
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, // Example for Diners Club
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/, // Example for JCB
    };

    // Luhn Algorithm to validate the card number
    const isValid = luhnCheck(cardNumber);

    // Determine the card brand
    let brand = "Unknown";
    for (const [key, regex] of Object.entries(cardBrands)) {
        if (regex.test(cardNumber)) {
            brand = key;
            break;
        }
    }

    return {
        isValid,
        brand,
    };
}

/**
 * Luhn Algorithm implementation to validate a credit card number.
 * @param {string} cardNumber - The credit card number to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Process digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Example usage
const cardNumber = "4111111111111111"; // Replace with a test card number
const result = validateCreditCard(cardNumber);
console.log(`Card Number: ${cardNumber}`);
console.log(`Valid: ${result.isValid}`);
console.log(`Brand: ${result.brand}`);
if (result.message) {
    console.log(`Message: ${result.message}`);
}