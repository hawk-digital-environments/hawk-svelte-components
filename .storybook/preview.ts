import type {Preview} from '@storybook/svelte';
import '../src/lib/_style/reset.css';
import '../src/lib/_style/handson.css';
import {enhanceContextWithUrlArgs} from './enhanceContextWithUrlArgs.ts';

const preview: Preview = {
    /**
     * This argument enhancer is a workaround for the fact that Storybook does currently not
     * support passing URL arguments for svelte components. Should it be in the way, you can
     * remove it, but make sure that you can still pass the arguments in the URL.
     */
    argsEnhancers: [enhanceContextWithUrlArgs],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
