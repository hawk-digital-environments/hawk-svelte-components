<script lang="ts">
    import type {HTMLFieldsetAttributes, HTMLInputAttributes} from 'svelte/elements';
    import type {Snippet} from 'svelte';
    import style from './RadioGroup.module.sass';
    import FormRadioCheckGroup, {
        type FormRadioCheckOrientation
    } from '$lib/util/formRadioCheckGroup/FormRadioCheckGroup.svelte';
    import FormLabelWrap, {type FormLabelPosition} from '$lib/util/formLabelWrap/FormLabelWrap.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import FormLabel from '$lib/util/formLabel/FormLabel.svelte';

    interface Props extends HTMLFieldsetAttributes {
        /**
         * Defines the options of the radio group that can be selected
         */
        options: Array<{ value: string, label: string | Snippet, disabled?: boolean } & HTMLInputAttributes>;

        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        value?: string;

        /**
         * Defines the visual orientation of the items inside the radio group.
         * @default 'vertical'
         */
        orientation?: FormRadioCheckOrientation;

        /**
         * Defines the position of the label relative to the radio fields.
         * @default 'right'
         */
        labelPosition?: FormLabelPosition;
    }

    const {
        options = [],
        value = $bindable(''),
        orientation = 'vertical',
        labelPosition = 'right',
        id,
        ...restProps
    }: Props = $props();

    const uniqueId = $props.id();
    const baseId = id ?? uniqueId;
</script>

<FormRadioCheckGroup id={id} {orientation} {...restProps}>
    {#each options as {label, value: optionValue, ...option}}
        <FormLabelWrap {labelPosition}>
            <FormLabel children={label} for={baseId + '-' + optionValue} disabled={option.disabled}/>
            <input {...mergeProps(
                option,
                {
                    class: style.input,
                    name: baseId,
                    type: 'radio',
                    value: optionValue,
                    checked: optionValue === value,
                    id: baseId + '-' + optionValue,
                    disabled: option.disabled,
                })}/>
        </FormLabelWrap>
    {/each}
</FormRadioCheckGroup>
