<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from './RadioCard.module.sass';
    import Card from "$lib/card/Card.svelte";
    import { radioContext } from "./RadioCardContext";

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

    const { children, 
        disabled, name, value, ...restProps }: Props = $props();

    // const realKey = $derived(key || value);
    let ctx = radioContext.get();
</script>

<Card
    onclick={disabled
        ? undefined
        : () => {
              ctx.setValue(value);
          }}
>
<div  class={style.radio_card} >
    <div>  {@render children?.()}</div>


    <input
        class={style.radio_input}
        type="radio"
        {name}
        {value}
        {disabled}
        checked={value === ctx.getValue()}
        id={value}
        tabindex="-1"
        readonly
    />
</div>
</Card>
