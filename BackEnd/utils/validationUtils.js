// validationUtils.ts
class ValidationUtils {
    // Validate if a string is empty or not
    static validateString(input) {
        return input.trim() !== '';
    }
    // Validate if a number is a valid positive integer
    static validatePositiveInteger(input) {
        return Number.isInteger(input) && input > 0;
    }
    // Validate if an email address is valid
    // public static validateEmail(email: string): boolean {
    //     // Regular expression for validating email addresses
    //     const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    //     return emailRegex.test(email);
    // }
    // Validate if a phone number is valid
    static validatePhoneNumber(phoneNumber) {
        // Regular expression for validating phone numbers
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }
}
export default ValidationUtils;
