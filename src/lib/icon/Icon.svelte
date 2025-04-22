<script lang="ts">
    import {type IconName, icons} from './iconDefinition.ts';
    import type {SVGAttributes} from 'svelte/elements';
    import style from './Icon.module.sass';
    import {mergeProps} from '../util/mergeProps.ts';

    interface Props extends SVGAttributes<SVGSVGElement> {
        /**
         * The name of the icon to display
         */
        icon: IconName;
        /**
         * The type of the icon (default: outline)
         */
        type?: 'filled' | 'outline';
        /**
         * The size of the icon (default: medium)
         * Sizes: small: 16x16, medium: 20x20, large: 24x24
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * Sets a gradient for the icon (works both for outline and filled icons)
         * The gradient is always applied horizontally, the first value is the left color, the second the right color.
         * This works with css variables, too!
         * If "default" is passed, the default gradient colors are used, so the same as: ['var(--clr-gradient-start)', 'var(--clr-gradient-end)']
         */
        gradient?: [string, string] | 'default';

        /**
         * An optional title to show when hovering the icon
         */
        title?: string;
    }

    const {
        icon: iconName,
        type = 'outline',
        size = 'medium',
        fill = 'none',
        gradient,
        title,
        ...restProps
    }: Props = $props();

    const icon = $derived(icons.get(iconName)![type])
    const viewBox = $derived(`0 0 ${icon.w} ${icon.h}`);
    const sizes = $derived.by(() => {
        switch (size) {
            case 'small':
                return {w: '16', h: '16'};
            case 'large':
                return {w: '24', h: '24'};
            case 'medium':
            default:
                return {w: '20', h: '20'};
        }
    });

    const uniqueId = $props.id();

    const gradientMarkup = $derived.by(() => {
        let _gradient = gradient;
        if (_gradient === 'default') {
            _gradient = ['var(--clr-gradient-start)', 'var(--clr-gradient-end)'];
        }

        if (!_gradient || _gradient.length !== 2) {
            return '';
        }

        const gradientId = uniqueId + '-gradient';
        const style = '<' + 'style>#' + uniqueId + ' * {fill: url(#' + gradientId + ');}</' + 'style>';

        return `
${style}
<defs>
    <linearGradient id="${gradientId}">
        <stop offset="0%" stop-color="${_gradient[0]}"/>
        <stop offset="100%" stop-color="${_gradient[1]}"/>
    </linearGradient>
</defs>
`;
    });
</script>

<svg xmlns="http://www.w3.org/2000/svg"
     {...mergeProps(
         {
             width: sizes.w,
             height: sizes.h,
             viewBox,
             fill
         },
         restProps,
         {
             class: [style.icon, type === 'filled' && style.filled]
         }
     )}
     aria-labelledby="title"
>
    {@html gradientMarkup}
    <title id="title">{title || `Icon: ${icon.t}`}</title>
    <g id={uniqueId}>
        {@html icon.c}
    </g>
</svg>
