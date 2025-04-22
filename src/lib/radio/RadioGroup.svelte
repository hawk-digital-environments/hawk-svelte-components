<script lang="ts">
    import type {HTMLFieldsetAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import type {Snippet} from 'svelte';
    import style from './RadioGroup.module.sass';
    import FormRadioCheckGroup, {
        type FormRadioCheckOrientation
    } from '../util/formRadioCheckGroup/FormRadioCheckGroup.svelte';
    import FormLabelWrap from '../util/formLabelWrap/FormLabelWrap.svelte';

    interface Props extends HTMLFieldsetAttributes {
        /**
         * Defines the options of the radio group that can be selected
         */
        options: Array<{ value: string, label: string | Snippet, disabled?: boolean }>;

        /**
         * Sets the value of the radio group.
         * If the value is not set, the radio group will be uncontrolled.
         */
        value: string | undefined;

        /**
         * Defines the visual orientation of the items inside the radio group.
         * @default 'vertical'
         */
        orientation: FormRadioCheckOrientation;

        /**
         * Defines the position of the label relative to the radio fields.
         * @default 'right'
         */
        labelPosition: FormRadioCheckLabelPosition;

        /**
         * Additional attributes that will be merged into every input element.
         */
        inputProps?: HTMLInputAttributes;
    }

    const {
        options = [],
        value = $bindable(''),
        orientation = 'vertical',
        labelPosition = 'right',
        id,
        inputProps,
        ...restProps
    }: Props = $props();

    const uniqueId = $props.id();
    const baseId = id ?? uniqueId;
</script>

<FormRadioCheckGroup id={id} {orientation} {...restProps}>
    {#each options as option}
        <FormLabelWrap {labelPosition}>
            <FormLabel children={option.label} for={baseId + '-' + option.value} disabled={option.disabled}/>
            <input {...mergeProps(
                inputProps,
                {
                    class: style.input,
                    name: baseId,
                    type: 'radio',
                    value: option.value,
                    checked: option.value === value,
                    id: baseId + '-' + option.value,
                    disabled: option.disabled,
                })}/>
        </FormLabelWrap>
    {/each}
</FormRadioCheckGroup>
