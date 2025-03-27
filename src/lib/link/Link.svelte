<script lang="ts">
    import type {HTMLAnchorAttributes} from 'svelte/elements';
    import * as svelte from 'svelte';

    /**
     * Maybe I can document this?
     */
    interface Props extends HTMLAnchorAttributes {
        /**
         * The link to navigate to
         */
        href?: string;

        /**
         * The target of the link, defaults to "_self"
         */
        target?: string;

        /**
         * The rel attribute of the link. Automatically set to "noopener noreferrer" when target is "_blank" (and no rel is provided) to prevent tabnabbing
         */
        rel?: string;

        /**
         * The onclick event handler
         */
        onclick?: (event: MouseEvent) => void;

        /**
         * The children to render inside the link
         */
        children?: svelte.Snippet;

        /**
         * Disables the link if set to true (both visually and functionally)
         */
        disabled?: boolean;
    }

    const {
        href: hrefRaw = '',
        target = '_self',
        rel: relRaw = '',
        onclick: onclickRaw,
        children,
        disabled,
        class: classNames,
        ...restProps
    }: Props = $props();

    const href = $derived.by(() => {
        if (!hrefRaw || disabled) {
            return 'javascript:void(0)';
        }
        return hrefRaw;
    });

    const rel = $derived.by(() => {
        if (relRaw) {
            return relRaw;
        }
        if (target === '_blank') {
            return 'noopener noreferrer';
        }
        return '';
    });

    const onclick = $derived.by(() => {
        if (disabled) {
            return (event: MouseEvent) => {
                event.preventDefault();
            };
        }
        return onclickRaw;
    })
</script>

<a href="{href}"
   class={classNames}
   class:link={true}
   class:disabled={disabled}
   target="{target}"
   rel="{rel}"
   onclick="{onclick}"
   {...restProps}>
    {@render children?.()}
</a>
