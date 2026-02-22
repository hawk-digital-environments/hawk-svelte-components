import {defineConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';
import {VitePluginIcons} from './.vite/VitePluginIcons.js';
import {VitePluginIllustrations} from './.vite/VitePluginIllustrations.js';

export default defineConfig({
    plugins: [
        sveltekit(),
        VitePluginIcons(),
        VitePluginIllustrations()
    ],
    server: {
        port: parseInt(process?.env?.DOCKER_PROJECT_PORT || '8000') || 8000,
    },
    css: {
        modules: false,
        preprocessorOptions: {
            sass: {
                verbose: false
            }
        }
    }
});
