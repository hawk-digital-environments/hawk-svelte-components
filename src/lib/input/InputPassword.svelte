<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import {Icon, Input} from '$lib';
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from './InputPassword.module.sass';
    import type {Props as InputProps} from '$lib/input/Input.svelte';
    import type {HTMLInputAttributes} from 'svelte/elements';

    type Props = {} & Omit<InputProps, 'iconLeft' | 'iconRight'> & HTMLInputAttributes;

    let {
        value = $bindable(''),
        ...restProps
    }: Props = $props();

    let showPassword = $state(false);

    const togglePasswordVisibility = () => {
        showPassword = !showPassword;
    };

    const inputType = $derived(showPassword ? 'text' : 'password');
</script>

{#snippet afterInput()}
    <button type="button" class={style.toggleButton} onclick={togglePasswordVisibility}>
        <Icon icon={showPassword ? 'eyeOff' : 'eye'} size="small"/>
    </button>
{/snippet}

<Input
        bind:value={value}
        {...mergeProps(
            restProps,
            {
                iconLeft: 'lock',
                containerProps: {
                    afterInput
                }
            }
        )}
        type={inputType}
>
</Input>
