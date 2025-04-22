<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLAttributes, HTMLInputAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import style from './Checkbox.module.sass';
    import Icon from '../icon/Icon.svelte';
    import FormLabelWrap, {type FormLabelPosition} from '../util/formLabelWrap/FormLabelWrap.svelte';

    interface Props extends HTMLInputAttributes {
        /**
         * The label of the checkbox. Can be either a plain string or a Svelte snippet.
         */
        label: string | Snippet;

        /**
         * The value of the checkbox.
         * If not provided, the id will be used as value.
         */
        value?: string;

        /**
         * The checked state of the checkbox.
         * If not provided, the checkbox will be unchecked at first.
         * Can be bound using `bind:checked` from the parent component.
         *
         * @default false
         */
        checked?: boolean;

        /**
         * If true, the checkbox will be marked as required.
         * This will add an asterisk to the label.
         */
        required?: boolean;

        /**
         * If true, the checkbox will be disabled.
         */
        disabled?: boolean;

        /**
         * The position of the label relative to the checkbox.
         * @default 'right'
         */
        labelPosition?: FormLabelPosition;

        /**
         * Additional props to apply to the wrapper div around the input and description/error.
         */
        containerProps?: HTMLAttributes<HTMLDivElement>;
    }

    const {
        label,
        value = $bindable(),
        checked = $bindable(false),
        required,
        disabled,
        labelPosition = 'right',
        id,
        containerProps,
        ...restProps
    }: Props = $props();

    const uniqueId = $props.id();
    const baseId = id ?? uniqueId;
</script>

<FormLabelWrap {...mergeProps(
    containerProps,
    {
        labelPosition,
        id
    }
)}>
    <FormLabel children={label} for={baseId + '-value'} disabled={disabled} {required}/>
    <div class={style.wrap}>
        <input {...mergeProps(
            {
                name: baseId
            },
            restProps,
            {
                class: [style.input],
                type: 'checkbox',
                value: value ?? baseId,
                checked,
                id: baseId + '-value',
                disabled: disabled,
            })}/>
        <Icon icon="check" class={style.icon} size="small"/>
    </div>
</FormLabelWrap>
