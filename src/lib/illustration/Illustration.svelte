<script lang="ts">

    import {type IllustrationName, illustrations} from '$lib/illustration/illustrationDefinition.js';
    import type {SVGAttributes} from 'svelte/elements';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from './Illustration.module.sass';

    interface Props extends SVGAttributes<SVGSVGElement> {
        /**
         * The name of the illustration to display
         */
        icon: IllustrationName;

        /**
         * An optional title to show when hovering the illustration
         */
        title?: string;
    }

    const {
        icon: illustrationName,
        title,
        ...restProps
    }: Props = $props();
    const icon = $derived(illustrations.get(illustrationName)!);
    const uniqueId = $props.id();
</script>

<svg xmlns="http://www.w3.org/2000/svg"
     {...mergeProps(
         {
             width: 50,
             height: 50,
             viewBox: `0 0 50 50`,
             class: style.icon
         },
         restProps
     )}
     aria-labelledby="title"
>
    <title id="title">{title || `Illustration: ${icon.t}`}</title>
    <g id={uniqueId}>
        {@html icon?.c || `<rect width="50" height="50" fill="none"/>`}
    </g>
</svg>
