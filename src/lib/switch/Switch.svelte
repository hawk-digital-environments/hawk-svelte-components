<script lang="ts">
    import FormLabel from '$lib/util/formLabel/FormLabel.svelte';
    import Icon from '$lib/icon/Icon.svelte';
    import style from './Switch.module.sass';
    import type {Snippet} from 'svelte';
    import type {FormEventHandler, HTMLAttributes} from 'svelte/elements';
    import FormLabelWrap, {type FormLabelPosition} from '$lib/util/formLabelWrap/FormLabelWrap.svelte';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import {mergeProps} from '$lib/util/mergeProps.js';

    /**
     * This interface is used to prevent the "onchange" attribute from being inherited
     * from the div element, because we will actually bind it on our internal input field instead.
     */
    interface NonCollidingAttributes extends HTMLAttributes<HTMLDivElement> {
        onchange?: any;
    }

    interface Props extends NonCollidingAttributes {
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
         * The label of the switch. Maybe a string or a snippet
         */
        label?: string | Snippet;

        /**
         * The position of the label relative to the switch
         */
        labelPosition?: FormLabelPosition;

        /**
         * An event handler that is called when the switch value changes
         * @param event
         */
        onchange?: FormEventHandler<HTMLInputElement>;

        /**
         * Can be used to override the default icon in the "off" state of the switch.
         * If not set, the "close" icon will be used.
         */
        iconOff?: IconName;

        /**
         * Can be used to override the default icon in the "on" state of the switch.
         * If not set, the "check" icon will be used.
         */
        iconOn?: IconName;
    }

    let {
        checked = $bindable(),
        required = false,
        disabled = false,
        label,
        labelPosition = "left",
        onchange,
        iconOff = 'close',
        iconOn = 'check',
        ...restProps
    }: Props = $props();

    const id = $props.id();
</script>
<div {...mergeProps(
    restProps,
    {
        class: [
            style.wrapper,
            labelPosition === "right" && style.labelRight,
            disabled && style.disabled,
        ]
    }
)}>
    <FormLabelWrap {labelPosition}>
        <FormLabel children={label} for={id} disabled={disabled}/>
        <div class={style.slider}>
            <input
                    class={[style.input]}
                    bind:checked
                    type="checkbox"
                    role="switch"
                    id={id}
                    {required}
                    {disabled}
                    {onchange}
            />
            <span class={style.handle}>
                <Icon icon={iconOn} class={style.iconOn}
                      gradient={disabled ? undefined : 'default'}/>
                <Icon icon={iconOff} class={style.iconOff}/>
            </span>
        </div>
    </FormLabelWrap>
</div>
