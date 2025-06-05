import {defineConfig} from 'vite';
import {VitePluginIcons} from './.vite/VitePluginIcons.js';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    resolve: {
        alias: {
            $lib: '/src/lib'
        }
    },
    build: {
        outDir: 'dist/_custom-elements',
        lib: {
            entry: 'src/custom-elements.ts',
            name: 'SvelteCustomElements'
        }
    },
    plugins: [
        svelte(),
        VitePluginIcons(),
        dtsPlugin({rollupTypes: true})
    ],
    css: {
        modules: false,
        preprocessorOptions: {
            sass: {
                outputStyle: 'compressed',
                verbose: false
            }
        }
    }
});
