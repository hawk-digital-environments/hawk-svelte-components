import adapter from '@sveltejs/adapter-auto';
import {sass as sassPreprocessor, typescript} from 'svelte-preprocess';
import path from 'path';
import {fileURLToPath} from 'url';
import {sassModuleImportProcessor} from './.svelte/SassModuleImportProcessor.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('svelte-preprocess').scss.Options} */
const sassPreprocessorOptions = {
    prependData: `@use "${path.resolve(__dirname, 'src/lib/_style/mixins.sass')}" as *;`,
    outputStyle: 'compact',
    sourceMap: false
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        typescript(),
        sassPreprocessor(sassPreprocessorOptions),
        sassModuleImportProcessor(sassPreprocessorOptions),
    ],
    kit: {
        adapter: adapter()
    }
};
export default config;
