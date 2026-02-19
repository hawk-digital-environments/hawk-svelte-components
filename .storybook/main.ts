import type {StorybookConfig} from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|ts|svelte)'
  ],
  addons: [
    '@storybook/addon-svelte-csf',
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  staticDirs: [{from: './assets', to: '/storybook-assets'}],
  core: {
    disableTelemetry: true
  },
  viteFinal(config) {
    config.server!.allowedHosts = true;
    return config;
  }
};
export default config;
