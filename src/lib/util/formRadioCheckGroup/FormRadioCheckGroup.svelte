<script lang="ts" module>
    export type FormRadioCheckOrientation = 'vertical' | 'horizontal';
</script>
<script lang="ts">
    import {mergeProps} from '../mergeProps.js';
    import type {HTMLFieldsetAttributes} from 'svelte/elements';
    import style from './FormRadioCheckGroup.module.sass';

    interface Props extends HTMLFieldsetAttributes {
        orientation: FormRadioCheckOrientation;
    }

    const {
        orientation = 'vertical',
        children,
        ...restProps
    }: Props = $props();
</script>
<fieldset {...mergeProps(
    restProps,
    {
        class: [
            style.group,
            orientation === 'horizontal' && style.horizontal
        ]
    })}>
    {@render children?.()}
</fieldset>
