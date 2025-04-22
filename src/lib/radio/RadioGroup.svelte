<script lang="ts">
    import type {HTMLFieldsetAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import type {Snippet} from 'svelte';
    import style from './RadioGroup.module.sass';

    interface Props extends HTMLFieldsetAttributes {
        options: Array<{ value: string, label: string | Snippet, disabled?: boolean }>;
        value: string | undefined;
        orientation: 'horizontal' | 'vertical';
        labelPosition: 'left' | 'right';
    }

    const {
        options = [],
        value = $bindable(''),
        orientation = 'vertical',
        labelPosition = 'right',
        id,
        ...restProps
    }: Props = $props();

    const uniqueId = $props.id();
    const baseId = id ?? uniqueId;
</script>

<fieldset {...mergeProps(
    restProps,
    {
        class: [
            style.container,
            orientation === 'horizontal' && style.horizontal,
            labelPosition === 'right' && style.labelRight,
        ]
    })}>
    {#each options as option}
        <div class={style.set}>
            <FormLabel children={option.label} for={baseId + '-' + option.value} disabled={option.disabled}/>
            <input type="radio"
                   class={style.input}
                   name={baseId}
                   value={option.value}
                   checked={option.value === value}
                   id={baseId + '-' + option.value}
                   disabled={option.disabled}/>
        </div>
    {/each}
</fieldset>
