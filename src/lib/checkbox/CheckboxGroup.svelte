<script lang="ts">

    import type {ComponentProps} from 'svelte';
    import type {HTMLFieldsetAttributes} from 'svelte/elements';
    import Checkbox from '$lib/checkbox/Checkbox.svelte';
    import FormRadioCheckGroup, {
        type FormRadioCheckOrientation
    } from '$lib/util/formRadioCheckGroup/FormRadioCheckGroup.svelte';
    import type {FormLabelPosition} from '$lib/util/formLabelWrap/FormLabelWrap.svelte';
    import {FocusList} from '$lib/util/focusList/FocusList.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface Props extends HTMLFieldsetAttributes {
        /**
         * Defines the options of the checkbox group that can be selected
         */
        options: Array<ComponentProps<typeof Checkbox>>;

        /**
         * Sets the value of the checkbox group.
         * If the value is not set, the checkbox group will be uncontrolled.
         */
        value?: Array<string>;

        /**
         * Defines the visual orientation of the items inside the checkbox group.
         * @default 'vertical'
         */
        orientation?: FormRadioCheckOrientation;

        /**
         * Defines the position of the label relative to the checkbox fields.
         * @default 'right'
         */
        labelPosition?: FormLabelPosition;
    }

    const {
        options = [],
        value = $bindable([]),
        orientation = 'vertical',
        labelPosition = 'right',
        id,
        ...restProps
    }: Props = $props();

    const uniqueId = $props.id();
    const baseId = id ?? uniqueId;

    const focusList = new FocusList();
</script>

<FormRadioCheckGroup id={id} {orientation} {...mergeProps(
    focusList.list,
    restProps
)}>
    {#each options as option}
        <Checkbox {...mergeProps(
            {
                name: baseId + '[]',
                labelPosition,
                checked: value.includes(option.value ?? ''),
            },
            option
        )}/>
    {/each}
</FormRadioCheckGroup>
