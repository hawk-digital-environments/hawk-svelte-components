import {defineConfig} from 'vite';
import fs from 'fs';
import path from 'path';

const theme = process.env.VITE_THEME || process.env.VITE_THEME_RESET || null;
if (!theme) {
    throw new Error('No theme specified. Please set the VITE_THEME environment variable.');
}
const resetSuffix = process.env.VITE_THEME_RESET ? '-reset' : '';
export default defineConfig({
    resolve: {
        alias: {
            $lib: '/src/lib'
        }
    },
    build: {
        outDir: 'dist/_themes',
        emptyOutDir: false,
        lib: {
            entry: `src/lib/_style/theme/${theme}/theme-${theme}${resetSuffix}.ts`,
            name: 'SvelteCustomElements',
            cssFileName: `theme-${theme}${resetSuffix}`,
            fileName: `dummy`,
            formats: ['es']
        }
    },
    plugins: [
        {
            name: 'remove-dummy-when-done',
            closeBundle() {
                // Remove the dummy file created by Vite
                const dummyFilePath = path.join('dist/_themes', 'dummy.js');
                if (fs.existsSync(dummyFilePath)) {
                    fs.unlinkSync(dummyFilePath);
                }
            }
        }
    ]
});
