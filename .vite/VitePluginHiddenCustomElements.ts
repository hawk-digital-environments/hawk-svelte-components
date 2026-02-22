import type {Plugin} from 'vite';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Vite plugin to generate CSS that hides custom elements until they are loaded
 * This prevents FOUC (Flash of Unstyled Content) for custom elements
 */
export function VitePluginHiddenCustomElements(): Plugin {
    let generatedCss = '';

    return {
        name: 'vite-plugin-hidden-custom-elements',
        apply: 'build',
        enforce: 'pre',

        buildStart() {
            // Read the custom-elements.ts file
            const customElementsPath = path.resolve(process.cwd(), 'src/custom-elements.ts');

            if (!fs.existsSync(customElementsPath)) {
                console.warn('VitePluginHiddenCustomElements: custom-elements.ts not found');
                return;
            }

            const content = fs.readFileSync(customElementsPath, 'utf-8');

            // Extract custom element tags from autoloadCustomElements calls
            const tags = new Set<string>();

            // Match the object passed to autoloadCustomElements
            const autoloadMatch = content.match(/autoloadCustomElements\s*\(\s*\{([^}]+)}/s);

            if (autoloadMatch) {
                // Extract tag names (keys in the object)
                const objectContent = autoloadMatch[1];
                const tagMatches = objectContent.matchAll(/['"]([^'"]+)['"]\s*:/g);

                for (const match of tagMatches) {
                    tags.add(match[1]);
                }
            }

            if (tags.size === 0) {
                console.warn('VitePluginHiddenCustomElements: No custom element tags found');
                return;
            }

            // Generate CSS that hides all custom elements
            const cssRules =
                Array.from(tags).join(',') + '{ opacity: 0; transition: opacity 0.3s ease-in-out; }'
                + '\n' +
                Array.from(tags).map(v => `${v}:defined`).join(',') + ' {opacity: 1;}';

            generatedCss = `/* Auto-generated CSS to hide custom elements until loaded */\n${cssRules}\n`;

            console.log(`Generated custom elements hidden CSS with ${tags.size} tags`);
        },

        generateBundle() {
            if (!generatedCss) {
                return;
            }

            // Emit the CSS as an asset in the build output
            this.emitFile({
                type: 'asset',
                fileName: 'custom-elements-fouc.css',
                source: generatedCss
            });
        }
    };
}
