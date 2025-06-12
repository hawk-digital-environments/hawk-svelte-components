<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './RadioCardGroup.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import {radioCardContext} from './RadioCardContext';
    import {FocusList} from '$lib/util/focusList/FocusList.js';

    interface NonConflictingProps extends HTMLAttributes<HTMLDivElement> {
        onchange?: any;
    }

    interface Props extends NonConflictingProps {
        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        value?: string;
        /**
         * If true, all radio cards in the group will be disabled.
         */
        disabled?: boolean;

        /**
         * Executed when the value of the radio group changes.
         * @param newValue
         */
        onchange?: (newValue: string) => void;
    }

    let {
        value = $bindable(""),
        children,
        onchange,
        disabled = false,
        ...restProps
    }: Props = $props();

    radioCardContext.set({
        getValue: () => value,
        setValue: (newValue: string) => {
            if (value === newValue) {
                return;
            }
            onchange?.(newValue);
            value = newValue;
        },
        isDisabled: () => disabled
    });

    const focus = new FocusList();
</script>

<div {...mergeProps(
    {
        class: [style.radio_group, disabled && style.disabled],
    },
    restProps,
    focus.list
)}>
    {@render children?.()}
</div>
