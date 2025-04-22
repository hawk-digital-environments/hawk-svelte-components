/**
 * Helper method to do an opinionated merge of component props.
 * Event listeners and classes will be merged, all other props will be overwritten.
 * The last value of each prop object will be used.
 *
 * Usage:
 * ```ts
 * // In a Svelte component
 * <Component
 *   {...mergeProps(
 *     // Base props
 *     {
 *       id: 'my-component',
 *       class: 'base-class',
 *       onclick: (e) => console.log('Base click')
 *     },
 *     // Props from parent (spread operator)
 *     restProps,
 *     // Override props with specific values
 *     {
 *       id: 'my-component-override', // The id will override
 *       // Class and event listeners will be merged!
 *       class: [style.component, type === 'special' && style.special],
 *       onclick: () => console.log('Additional click handler')
 *     }
 *   )}
 * />
 * ```
 *
 * @param a First props object
 * @param b Second props object
 * @param c Optional third props object
 * @param d Optional fourth props object
 * @param e Optional fifth props object
 * @param f Optional sixth props object
 */
export function mergeProps<TA = any, TB = any, TC = any, TD = any, TE = any, TF = any>(a: TA, b: TB, c?: TC, d?: TD, e?: TE, f?: TF): TA & TB & TC & TD & TE & TF {
    const result: any = {};
    const mergeSet = [a, b, c, d, e, f].filter(Boolean);
    for (const obj of mergeSet) {
        if (obj === undefined || typeof obj !== 'object') {
            continue;
        }

        for (const key in obj) {
            const valueA = result[key];
            const valueB = obj[key];

            // Result does not have property -> use value as is
            if (valueA !== undefined) {
                if (mergeEvents(result, key, valueA, valueB)) {
                    continue;
                }
                if (mergeClasses(result, key, valueA, valueB)) {
                    continue;
                }
            }

            result[key] = valueB;
        }
    }

    return result;
}

function mergeEvents(result: Record<any, any>, key: string, a: any, b: any): boolean {
    if (!key.startsWith('on') || typeof a !== 'function' || typeof b !== 'function') {
        return false;
    }
    result[key] = (e: any) => {
        a(e);
        b(e);
    };
    return true;
}

function mergeClasses(result: Record<any, any>, key: string, a: any, b: any): boolean {
    if (key !== 'class') {
        return false;
    }

    result[key] = [a, b].filter(Boolean);
    return true;
}
