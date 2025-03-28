import type {Preview} from '@storybook/svelte'
import '../src/lib/_style/reset.css';
import '../src/lib/_style/handson.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
