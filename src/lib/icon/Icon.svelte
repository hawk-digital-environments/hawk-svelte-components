<script lang="ts">
    import {type IconName, icons} from './iconDefinition.ts';
    import type {SVGAttributes} from 'svelte/elements';
    import style from './Icon.module.sass';

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
         * Sizes: small: 16x16, medium: 20x20
         */
        size?: 'small' | 'medium';
        /**
         * Sets a gradient for the icon (works both for outline and filled icons)
         * The gradient is always applied horizontally, the first value is the left color, the second the right color
         */
        gradient?: [string, string];
    }

    const {
        icon: iconName,
        type = 'outline',
        size = 'medium',
        fill = 'none',
        class: classNames,
        className: className,
        gradient,
        ...restProps
    }: Props = $props();

    const icon = $derived(icons.get(iconName)![type])
    const viewBox = $derived(`0 0 ${icon.w} ${icon.h}`);
    const sizes = $derived.by(() => {
        switch (size) {
            case 'small':
                return {w: '16', h: '16'};
            case 'medium':
            default:
                return {w: '20', h: '20'};
        }
    });

    const uniqueId = $props.id();

    const gradientMarkup = $derived.by(() => {
        if (!gradient || gradient.length !== 2) {
            return '';
        }

        const gradientId = uniqueId + '-gradient';

        return `
<style>
#${uniqueId} * {fill: url(#${gradientId});}
</style>
<defs>
    <linearGradient id="${gradientId}">
        <stop offset="0%" stop-color="${gradient[0]}"/>
        <stop offset="100%" stop-color="${gradient[1]}"/>
    </linearGradient>
</defs>
`;
    });
</script>

<svg xmlns="http://www.w3.org/2000/svg"
     class={[style.icon, type === 'filled' && style.filled, classNames, className]}
     width="{sizes.w}"
     height="{sizes.h}"
     viewBox={viewBox}
     fill={fill}
     aria-labelledby="title"
     {...restProps}>
    {@html gradientMarkup}
    <title id="title">Icon: {icon.t}</title>
    <g id={uniqueId}>
        {@html icon.c}
    </g>
</svg>
