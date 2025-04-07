/**
 * Parse URL args string into a JavaScript object
 * @param {string} argsString - The args string from the URL (e.g., "style:rounded;size:100")
 * @returns {Object} The parsed args object
 */
function parseUrlArgs(argsString: string) {
    if (!argsString) return {};

    const result = {};
    const pairs = argsString.split(';');

    for (const pair of pairs) {
        const [keyPath, rawValue] = pair.split(':');
        if (!keyPath || rawValue === undefined) continue;

        // Parse the value
        let value;

        // Handle special values
        if (rawValue.startsWith('!')) {
            if (rawValue === '!null') {
                value = null;
            } else if (rawValue === '!undefined') {
                value = undefined;
            } else if (rawValue.startsWith('!date(') && rawValue.endsWith(')')) {
                const dateStr = rawValue.slice(6, -1);
                value = new Date(dateStr);
            } else if (rawValue.startsWith('!hex(') && rawValue.endsWith(')')) {
                value = rawValue.slice(5, -1);
            } else if (rawValue.startsWith('!rgba(') && rawValue.endsWith(')')) {
                value = 'rgba(' + rawValue.slice(6, -1) + ')';
            } else if (rawValue.startsWith('!hsla(') && rawValue.endsWith(')')) {
                value = 'hsla(' + rawValue.slice(6, -1) + ')';
            } else {
                value = rawValue; // Unknown format, keep as is
            }
        } else {
            // Handle boolean values
            if (rawValue === 'true') {
                value = true;
            } else if (rawValue === 'false') {
                value = false;
            } else {
                // Try to parse as number if possible
                const numberValue = parseFloat(rawValue);
                value = !isNaN(numberValue) && numberValue.toString() === rawValue
                    ? numberValue
                    : rawValue;
            }
        }

        // Handle nested objects and arrays
        setNestedValue(result, keyPath, value);
    }

    return result;
}

/**
 * Set a value at a nested path in an object
 * @param {Object} obj - The object to modify
 * @param {string} path - The path (e.g., "obj.key" or "arr[0]")
 * @param {any} value - The value to set
 */
function setNestedValue(obj: Record<string, any>, path: string, value: any) {
    const parts = path.replace(/\[(\w+)]/g, '.$1').split('.');

    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];

        if (!current[key]) {
            const nextKey = parts[i + 1];
            const isNextKeyArrayIndex = /^\d+$/.test(nextKey);

            current[key] = isNextKeyArrayIndex ? [] : {};
        }

        current = current[key];
    }

    const lastKey = parts[parts.length - 1];
    current[lastKey] = value;
}

/**
 * Extract args from URL and enhance the context with them
 * @param {Object} context - The storybook context
 * @returns {Object} Enhanced context with URL args
 */
export function enhanceContextWithUrlArgs(context: { initialArgs?: Record<string, any> }): Record<string, any> {
    if (typeof window === 'undefined') {
        return context.initialArgs ?? {};
    }

    // Get the current URL
    const url = new URL(window.location.href);
    const argsParam = url.searchParams.get('args');

    if (!argsParam) return context;

    const urlArgs = parseUrlArgs(argsParam);

    const enhancedArgs = {...context.initialArgs};

    for (const [key, value] of Object.entries(urlArgs)) {
        if (!(key in enhancedArgs)) {
            enhancedArgs[key] = value;
        }
    }

    return enhancedArgs;
}
