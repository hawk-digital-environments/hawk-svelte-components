<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './RadioCard.module.sass';
    import Card from '$lib/card/Card.svelte';
    import {radioCardContext} from './RadioCardContext';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import RawRadioInput from '$lib/radio/RawRadioInput.svelte';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The value of the radio-card.
         */
        value: string;

        /**
         * If set to true, the tab will be disabled.
         * This will also disable the tab trigger.
         */
        disabled?: boolean;

        /**
         * The name of the radio-card
         */
        name?: string;
    }

    const {
        children,
        disabled: givenDisabled = false,
        name,
        value,
        ...restProps
    }: Props = $props();

    let ctx = radioCardContext.get();
    const disabled = $derived(givenDisabled || ctx.isDisabled());
</script>

<Card {...mergeProps(
    {
        onclick: () => ctx.setValue(value),
        disabled
    },
    restProps
)}
>
    <div class={style.radio_card}>
        <div>{@render children?.()}</div>
        <RawRadioInput
                bindValue={ctx.getValue()}
                {name}
                {value}
                {disabled}
                tabindex={-1}
                readonly/>
    </div>
</Card>
