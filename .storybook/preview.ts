import type {Preview} from '@storybook/svelte';
import '../src/lib/_style/reset.css';
// @ts-ignore
import handsonCss from '../src/lib/_style/handson.css?raw';
// @ts-ignore
import hawkCss from '../src/lib/_style/hawk.css?raw';
import {enhanceContextWithUrlArgs} from './enhanceContextWithUrlArgs.ts';
import {useEffect} from '@storybook/preview-api';
import {DecoratorHelpers} from '@storybook/addon-themes';

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
    },
    decorators: [
        (() => {
            const defaultTheme = 'HAWK';
            const themes = {
                'HAWK': hawkCss,
                'HANDSON': handsonCss
            };
            DecoratorHelpers.initializeThemeState(Object.keys(themes), defaultTheme);

            const setTheme = (theme: string) => {
                const themeMarker = 'data-theme-name';
                const currentThemes = document.head.querySelectorAll(`style[${themeMarker}]`);
                currentThemes.forEach(theme => theme.remove());

                const themeStyle = document.createElement('style');
                themeStyle.setAttribute(themeMarker, theme);
                themeStyle.innerHTML = themes[theme] ?? themes[defaultTheme];
                document.head.appendChild(themeStyle);
            };

            return (storyFn, context) => {
                useEffect(() => {
                    const selectedTheme = DecoratorHelpers.pluckThemeFromContext(context);
                    const {themeOverride} = context.parameters.themes ?? {};

                    const selected = themeOverride || selectedTheme || 'HAWK';

                    setTheme(selected);
                });

                return storyFn();
            };
        })()
    ]
};

export default preview;
