export const passwordValidationErrors = {
    length: 'Password must be at least 8 characters long',
    case: 'Password must contain both upper and lower case letters',
    number: 'Password must contain at least one number',
    special: 'Password must contain at least one special character',
};


export function validatePassword(password) {
    if (password.length < 8) {
        return {
            success: false,
            error: passwordValidationErrors.length,
        };
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return {
            success: false,
            error: passwordValidationErrors.case,
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            success: false,
            error: passwordValidationErrors.number,
        };
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return {
            success: false,
            error: passwordValidationErrors.special,
        };
    }

    return {
        success: true,
        error: null,
    };
}
