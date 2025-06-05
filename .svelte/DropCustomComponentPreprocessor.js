/**
 * In order to keep out our custom component helper code from being shipped in svelte only apps,
 * we replace the import of `makeCustomComponent` with a no-op function, that will be silently ignored.
 */
export function dropCustomComponentPreprocessor() {
    return {
        markup: async ({content}) => {
            const customComponentImportRegex = /import\s+{[^}]*makeCustomComponent}[^;]*from\s+['"]\$\w*lib\/util\/makeCustomComponent\.js['"];/gm;
            if (content.match(customComponentImportRegex)) {
                content = content.replace(customComponentImportRegex, 'const makeCustomComponent = (c: any) => c;');
            }
            return {
                code: content,
                map: null
            };
        }
    };
}
