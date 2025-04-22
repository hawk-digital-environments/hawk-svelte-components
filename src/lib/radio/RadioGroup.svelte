<script lang="ts">
    import type {HTMLFieldsetAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import type {Snippet} from 'svelte';
    import style from './RadioGroup.module.sass';

    interface Props extends HTMLFieldsetAttributes {
        /**
         * Defines the options of the radio group that can be selected
         */
        options: Array<{ value: string, label: string | Snippet, disabled?: boolean }>;

        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        value: string | undefined;

        /**
         * Defines the visual orientation of the radio group.
         * @default 'vertical'
         */
        orientation: 'horizontal' | 'vertical';

        /**
         * Defines the position of the label relative to the radio group.
         * @default 'right'
         */
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
