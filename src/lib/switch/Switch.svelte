<script lang="ts">
    import FormLabel from '$lib/util/formLabel/FormLabel.svelte';
    import Icon from '$lib/icon/Icon.svelte';
    import style from './Switch.module.sass';
    import type {Snippet} from 'svelte';
    import type {ChangeEventHandler} from 'svelte/elements';

    interface Props {
        /**
         * Bindable value for the switch
         */
        checked?: boolean;
        /**
         * If set to true, the switch will be disabled
         */
        disabled?: boolean;
        /**
         * If set to true, the switch will be required
         */
        required?: boolean;
        /**
         * The label of the switch. May be a string or a snippet
         */
        label?: string | Snippet;
        /**
         * The position of the label relative to the switch
         */
        labelPosition?: "left" | "right";
        /**
         * An event handler that is called when the switch value changes
         * @param event
         */
        onchange?: ChangeEventHandler<HTMLInputElement>
    }

    let {
        checked = $bindable(),
        required = false,
        disabled = false,
        label,
        labelPosition = "left",
        onchange
    }: Props = $props();

    const switchWrapperClasses = $derived({
        [style.wrapper]: true,
        [style.labelRight]: labelPosition === "right",
        [style.disabled]: disabled
    });

    const id = $props.id();
</script>

<div class={switchWrapperClasses}>
    {#if label}
        <FormLabel required={required} for={id} disabled={disabled}>
            {#if typeof label === "string"}
                {label}
            {:else}
                {@render label()}
            {/if}
        </FormLabel>
    {/if}
    <div class={style.slider}>
        <input
                class={[
                  style.input
          ]}
                bind:checked
                type="checkbox"
                role="switch"
                id={id}
                {required}
                {disabled}
                {onchange}
        />
        <span class={style.handle}>
            <Icon icon="check" class={style.iconOn}
                  gradient={disabled ? undefined : ['var(--sgs, aqua)', 'var(--sge)']}/>
            <Icon icon="close" class={style.iconOff}/>
        </span>
    </div>
</div>
