<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from "./RadioCardGroup.module.sass";
    import { mergeProps } from "$lib/util/mergeProps.js";
    import { radioContext } from "./RadioCardContext";

    interface NonConflictingProps extends HTMLAttributes<HTMLDivElement> {
        onchange?: any;
    }

    interface Props extends NonConflictingProps {
        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        value?: string;
        onchange?: (newValue: string) => void;
    }

    let {
        value = $bindable(""),
        children,
        onchange,
        ...restProps
    }: Props = $props();

    radioContext.set({
        getValue: () => value,
        setValue: (newValue: string) => {
            if (value === newValue) return;
            value = newValue;
            onchange?.(newValue);
        },
    });
</script>

{value}
<div {...mergeProps({ class: style.radio_group }, restProps)}>
    {@render children?.()}
</div>
