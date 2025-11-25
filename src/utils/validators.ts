type FormValues = { [key: string]: unknown };
type ValidatorFunction = (
  value: unknown,
  params: string[],
  allValues: FormValues
) => string;


const customRules: Record<string, ValidatorFunction> = {};


const customMessages: Record<string, string | ((params: string[]) => string)> =
  {};

/**
 * Register a custom validation rule
 * @param name - Rule name to use in rules string (e.g., 'phone')
 * @param validator - Function that returns error message or empty string
 * @example
 * registerRule('phone', (value) => {
 *   if (!/^(\+84|0)[0-9]{9}$/.test(String(value))) {
 *     return 'Invalid phone number';
 *   }
 *   return '';
 * });
 */
export function registerRule(name: string, validator: ValidatorFunction) {
  customRules[name] = validator;
}

/**
 * Override default error message for a built-in or custom rule
 * @param ruleName - Name of the rule
 * @param message - Custom message string or function
 * @example
 * setMessage('required', 'This field is required');
 * setMessage('min', (params) => `Minimum ${params[0]} characters`);
 */
export function setMessage(
  ruleName: string,
  message: string | ((params: string[]) => string)
) {
  customMessages[ruleName] = message;
}

/**
 * Get custom message for a rule
 */
function getMessage(ruleName: string, params: string[]): string | null {
  const customMsg = customMessages[ruleName];
  if (customMsg) {
    return typeof customMsg === "function" ? customMsg(params) : customMsg;
  }
  return null;
}

export function validate(
  value: unknown,
  rules: string,
  allValues: FormValues
): string {
  const ruleParts = rules.split("|");

  for (const rule of ruleParts) {
    if (!rule) continue;

    const [ruleName, ...params] = rule.split(":");

    
    if (customRules[ruleName]) {
      const error = customRules[ruleName](value, params, allValues);
      if (error) return error;
      continue;
    }

    
    let error = "";

    switch (ruleName) {
      case "required":
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          error = getMessage(ruleName, params) || "This field is required.";
        }
        break;

      case "min":
        if (String(value).length < Number(params[0])) {
          error =
            getMessage(ruleName, params) ||
            `Must be at least ${params[0]} characters.`;
        }
        break;

      case "max":
        if (String(value).length > Number(params[0])) {
          error =
            getMessage(ruleName, params) ||
            `Must not exceed ${params[0]} characters.`;
        }
        break;

      case "between": {
        const len = String(value).length;
        if (len < Number(params[0]) || len > Number(params[1])) {
          error =
            getMessage(ruleName, params) ||
            `Must be between ${params[0]} and ${params[1]} characters.`;
        }
        break;
      }

      case "password": {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;
        if (!passwordRegex.test(String(value))) {
          error =
            getMessage(ruleName, params) ||
            "Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers.";
        }
        break;
      }

      case "same": {
        const otherValue = allValues[params[0]];
        if (value !== otherValue) {
          error =
            getMessage(ruleName, params) ||
            `Values must match with ${params[0]}.`;
        }
        break;
      }

      case "different": {
        const otherValue = allValues[params[0]];
        if (value === otherValue) {
          error =
            getMessage(ruleName, params) ||
            `Values must be different from ${params[0]}.`;
        }
        break;
      }

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))) {
          error =
            getMessage(ruleName, params) ||
            "Please enter a valid email address.";
        }
        break;
      }
    }

    if (error) return error;
  }

  return ""; 
}
