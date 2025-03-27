import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {defineConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: parseInt(process?.env?.DOCKER_PROJECT_PORT || '8000') || 8000
	}
    plugins: [
        sveltekit(),
    ],
    server: {
        port: parseInt(process?.env?.DOCKER_PROJECT_PORT || '8000') || 8000,
    }
});
