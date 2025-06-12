<script lang="ts">

    import {mergeProps} from '$lib/util/mergeProps.js';
    import type {HTMLInputAttributes} from 'svelte/elements';
    import style from './RawRadioInput.module.sass';

    interface Props extends HTMLInputAttributes {
        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        bindValue?: string;
    }

    let {
        bindValue = $bindable(''),
        name,
        ...restProps
    }: Props = $props();

</script>

<input bind:group={bindValue} name={name} {...mergeProps(
    {
        class: style.input,
        type: 'radio',
    },
    restProps
)}/>
