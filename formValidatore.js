class FormValidator {
    constructor() {
        this.rules = {};
    }

    addRule(fieldName, rule, message) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push({ rule, message });
    }

    validate(formData) {
        const errors = {};
        for (const [fieldName, rules] of Object.entries(this.rules)) {
            for (const { rule, message } of rules) {
                if (!rule(formData[fieldName])) {
                    errors[fieldName] = message;
                }
            }
        }
        return errors;
    }
}

// Example usage:
const validator = new FormValidator();
validator.addRule('email', (value) => /\S+@\S+\.\S+/.test(value), 'Invalid email address');
validator.addRule('password', (value) => value.length >= 6, 'Password must be at least 6 characters long');

const formData = { email: 'test@example', password: '123' };
const errors = validator.validate(formData);
console.log(errors);  // { email: 'Invalid email address', password: 'Password must be at least 6 characters long' }

module.exports = FormValidator;
