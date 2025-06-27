<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from "./Drawer.module.sass";
    import Headline from "$lib/headline/Headline.svelte";
    import Icon from "$lib/icon/Icon.svelte";
    import { mergeProps } from "$lib/util/mergeProps.js";
    import * as Vaul from "vaul-svelte";

    const Drawer = Vaul.Drawer;

    export interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * Content to be displayed inside the drawer.
         */
        heading?: string;
        /**
         * The state of the drawer, which determines its size.
         * Can be "small", "medium", or "large".
         */
        state?: "small" | "medium" | "large";
        /**
         * Whether the drawer should always be open.
         * If true, the drawer will not be dismissible.
         */
        alwaysOpen?: boolean;

        /**
         * Direction of the drawer.
         * Can be "left", "right", "top", or "bottom".
         */
        direction?: "left" | "right" | "top" | "bottom";
    }

    let {
        alwaysOpen = true,
        children,
        heading,
        state = "large",
        direction = "bottom",

        ...restProps
    }: Props = $props();

    const snapPoints = $derived([
        direction === "bottom" || direction === "top" ? "100px" : "50px",
        0.5,
        1,
    ]); //$derived(snapPointPresets[state]);

    const stateToSnapPoint = $derived({
        small: snapPoints[0],
        medium: snapPoints[1],
        large: snapPoints[2],
    });

    // CSS-Classes for direction -> used in the Drawer.Content
    const directionClassMap: Record<typeof direction, string> = {
        left: style.drawer_from_left,
        right: style.drawer_from_right,
        top: style.drawer_from_top,
        bottom: style.drawer_from_bottom,
    };

    //let activeSnapPoint = $derived(snapPoints[0]);

    let activeSnapPoint = $derived(stateToSnapPoint[state]);

    $effect(() => {
        if (state === "small") {
            activeSnapPoint = stateToSnapPoint.small;
        } else if (state === "medium") {
            activeSnapPoint = stateToSnapPoint.medium;
        } else if (state === "large") {
            activeSnapPoint = stateToSnapPoint.large;
        }
    });
</script>

<Drawer.Root dismissible={!alwaysOpen} {direction} {snapPoints} bind:activeSnapPoint open={alwaysOpen}>
    <Drawer.Trigger>Open</Drawer.Trigger>

    <Drawer.Portal>
        {#if activeSnapPoint === stateToSnapPoint["large"] || !alwaysOpen}
            <Drawer.Overlay class={style.drawer_overlay} />
        {/if}
        <Drawer.Content
            onInteractOutside={(event) => {
                if (alwaysOpen) {
                    event.preventDefault();
                }
            }}
            interactOutsideBehavior={alwaysOpen?"close":"close"}
            class={[style.drawer_content, directionClassMap[direction]]}
        >
            <div class={style.drawer_drag}></div>
            <div class={style.drawer_title}>
                <Headline>{heading ? heading : ""}</Headline>
                {#if !alwaysOpen}
                    <Drawer.Close class={style.drawer_close}
                        ><Icon icon="close" size="large"></Icon></Drawer.Close
                    >
                {/if}
            </div>
            <div class={style.drawer_body} data-vaul-no-drag>
                {state}
                {@render children?.()}
            </div>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>
