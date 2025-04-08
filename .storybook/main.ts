import type {StorybookConfig} from '@storybook/sveltekit';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/sveltekit",
    "options": {}
  },
  staticDirs: [{from: './assets', to: '/storybook-assets'}],
  core: {
    disableTelemetry: true
  },
  viteFinal(config) {
    config.server.allowedHosts = true;
    return config;
  }
};
export default config;
