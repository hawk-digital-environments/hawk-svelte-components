<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import type {IconName} from '../../icon/iconDefinition.ts';
    import type {ComponentProps, Snippet} from 'svelte';
    import Icon from '../../icon/Icon.svelte';
    import style from './FloatingFormContainer.module.sass';
    import FormMessages from '../formMessages/FormMessages.svelte';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The label to render for the input. The snippet will receive a list of CSS classes
         * to apply to the <label> element.
         */
        label: Snippet<[string]>;

        /**
         * The input to render. The snippet will receive a list of CSS classes
         * to apply to the <input> element.
         */
        input: Snippet<[string]>;

        /**
         * An optional icon to display to the left of the input
         */
        iconLeft?: IconName;

        /**
         * Additional props that can be passed to the icon on the left side.
         * If "iconLeft" is not set, this will be ignored
         */
        iconLeftProps?: Omit<ComponentProps<typeof Icon>, 'icon'>;

        /**
         * An optional icon to display to the right of the input
         */
        iconRight?: IconName;

        /**
         * Additional props that can be passed to the icon on the right side.
         * If "iconRight" is not set, this will be ignored
         */
        iconRightProps?: Omit<ComponentProps<typeof Icon>, 'icon'>;

        /**
         * By default, the input field will match the width of the label/input.
         * If this is set to true, it will take up the full width of the container
         */
        block?: boolean;

        /**
         * If true, the label will float above the input.
         * This should be true if there is a cursor in the field, a placeholder, or a value set
         */
        float?: boolean;

        /**
         * An optional description to display below the label. Can be either a string or a snippet
         */
        description?: string | Snippet;

        /**
         * An optional error message to display below the input. Can be either a string or a snippet
         * If the error is set, the input will be rendered in an error state
         */
        error?: string | Snippet;

        /**
         * True to render the container in a disabled state
         */
        disabled?: boolean;
    }

    const {
        label,
        input,
        class: className,
        iconLeft,
        iconLeftProps,
        iconRight,
        iconRightProps,
        block,
        float,
        error,
        description,
        disabled,
        ...restProps
    }: Props = $props();

    let container: HTMLDivElement;
    $effect(() => {
        if (container) {
            container.addEventListener('click', e => {
                if (e.target instanceof HTMLDivElement || e.target instanceof HTMLSpanElement || (e.target as any)?.tagName === 'svg') {
                    (container.querySelector('input,select,textarea') as HTMLElement)?.focus();
                }
            });
        }
    });

    const iconLeftClass = $derived(iconLeftProps?.class);
    const iconRightClass = $derived(iconRightProps?.class);
</script>

<div class={[
    className,
    style.container,
    block && style.block
    ]} {...restProps}>
    <div class={[
        style.layoutWrap,
        !!iconLeft && style.hasIconLeft,
        !!iconRight && style.hasIconRight,
        float && style.float,
        error && style.error,
        disabled && style.disabled
    ]} bind:this={container}>
        {#if !!iconLeft}
            <Icon icon={iconLeft} {...iconLeftProps} class={[iconLeftClass, style.iconLeft]}/>
        {/if}
        <div class={style.inputLabelWrap}>
            {@render label?.(style.label)}
            {@render input?.(style.input)}
        </div>
        {#if !!iconRight}
            <Icon icon={iconRight} {...iconRightProps} class={[iconRightClass, style.iconRight]}/>
        {/if}
    </div>
    <FormMessages {description} {error} {disabled}/>
</div>
