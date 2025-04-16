<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Formwrap.module.sass';

    interface Props extends HTMLAttributes<HTMLFieldSetElement> {
        children: Snippet;
    }

    const {
        children
    }: Props = $props();
</script>

<fieldset class={style.formwrap}>
    {@render children?.()}
</fieldset>
