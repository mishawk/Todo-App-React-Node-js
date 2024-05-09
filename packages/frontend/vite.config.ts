import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteAliases } from 'vite-aliases';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/Todo-App-React-Node-js/',
	plugins: [react(), svgr(), ViteAliases(), EnvironmentPlugin('all')],
});
