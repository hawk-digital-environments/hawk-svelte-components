<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLAttributes, HTMLInputAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import style from './Checkbox.module.sass';
    import Icon from '../icon/Icon.svelte';
    import FormLabelWrap, {type FormLabelPosition} from '../util/formLabelWrap/FormLabelWrap.svelte';

    interface Props extends HTMLInputAttributes {
        label: string | Snippet;
        value: string | undefined;
        checked: boolean;
        required?: boolean;
        disabled?: boolean;
        labelPosition: FormLabelPosition;

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
            restProps,
            {
                class: [style.input],
                name: baseId,
                type: 'checkbox',
                value: value,
                checked,
                id: baseId + '-value',
                disabled: disabled,
            })}/>
        <Icon icon="check" class={style.icon} size="small"/>
    </div>
</FormLabelWrap>
