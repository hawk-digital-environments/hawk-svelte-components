<script lang="ts" module>
    export type FormLabelPosition = 'right' | 'left';
</script>
<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './FormLabelWrap.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';

    /**
     * Handles the position of a form label in relation to its element.
     * This is only used if the label is not "floating".
     */
    interface Props extends HTMLAttributes<HTMLDivElement> {
        labelPosition?: FormLabelPosition;
    }

    const {children, labelPosition, ...restProps}: Props = $props();
</script>
<div {...mergeProps(
    restProps,
    {
        class: [
            style.wrap,
            labelPosition === 'right' && style.labelRight
        ]
    },
)}>
    {@render children?.()}
</div>
