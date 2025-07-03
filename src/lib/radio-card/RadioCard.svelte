<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from "./RadioCard.module.sass";
    import Card from "$lib/card/Card.svelte";
    import { radioCardContext } from "./RadioCardContext";
    import { mergeProps } from "$lib/util/mergeProps.js";
    import RawRadioInput from "$lib/radio/RawRadioInput.svelte";
    import type { Snippet } from "svelte";
    import {cardContext} from '$lib/card/CardContext.js';

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

        /**
         * An optional area for additional details.
         * This can be a string or a function returning a string or Svelte component.
         */
        details?: Snippet | string;
    }

    const {
        children,
        disabled: givenDisabled = false,
        name,
        value,
        details,

        ...restProps
    }: Props = $props();

    let ctx = radioCardContext.get();
    const disabled = $derived(givenDisabled || ctx.isDisabled());
    const isCurrentlySelected = $derived(ctx.getValue() === value);

    cardContext.set({
        isDetailsBorderHighlighted: () => isCurrentlySelected
    })
</script>

<Card
    {...mergeProps(
        {
            onclick: () => ctx.setValue(value),
            disabled,
            details
        },
        restProps,
    )}
>
    <div class={style.radio_card}>
        {@render children?.()}
        <RawRadioInput
            {name}
            {value}
            {disabled}
            checked={isCurrentlySelected}
            tabindex={-1}
            readonly
        />
    </div>
</Card>
