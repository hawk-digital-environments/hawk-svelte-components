<script lang="ts">
    import {type IconName, icons} from './iconDefinition';
    import type {SVGAttributes} from 'svelte/elements';

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
    }

    const {
        icon: iconName,
        type = 'outline',
        size = 'medium',
        fill = 'none',
        ...restProps
    }: Props = $props();

    const icon = $derived(icons.get(iconName)[type])
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
</script>

<svg xmlns="http://www.w3.org/2000/svg"
     class:icon
     width="{sizes.w}"
     height="{sizes.h}"
     viewBox={viewBox}
     fill={fill}
     aria-labelledby="title"
     {...restProps}>
    <title id="title">Icon: {icon.t}</title>
    {@html icon.c}
</svg>

<style lang="sass">
  .icon
    display: inline-block
    color: currentColor
</style>
