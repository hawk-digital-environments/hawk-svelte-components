<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from "./Drawer.module.sass";
    import { mergeProps } from "$lib/util/mergeProps.js";
    import { Drawer } from "vaul-svelte";
    import Headline from "$lib/headline/Headline.svelte";
    import Icon from "$lib/icon/Icon.svelte";

    export interface Props extends HTMLAttributes<HTMLDivElement> {
        heading?: string;
        state?: "open" | "closed";
    }

    let {
        children,
        heading,
        state = "open",

        ...restProps
    }: Props = $props();
</script>

<div>
    <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>

        <Drawer.Portal>
            <Drawer.Overlay class={style.drawer_overlay} />
            <Drawer.Content class={style.drawer_content}>
                <div class={style.drawer_drag}></div>
                <div class={style.drawer_title}>
                    <Headline>{heading ? heading : ""}</Headline>
                    <Drawer.Close class={style.drawer_close}><Icon icon="close" size="large"></Icon></Drawer.Close
                    >
                </div>
                <div class={style.drawer_body}>
                    {@render children?.()}
                </div>
            </Drawer.Content>
       
        </Drawer.Portal>

    </Drawer.Root>
</div>
