import adapter from '@sveltejs/adapter-auto';
import {sveltePreprocess} from 'svelte-preprocess';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: sveltePreprocess({
        typescript: false,
        sass: {
            prependData: `@use "${path.resolve(__dirname, 'src/lib/_style/mixins.sass')}" as *;`,
            renderSync: true,
            outputStyle: 'compressed'
        }
    }),

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter()
    }
};

export default config;
