<script lang="ts" module>
    import {tabbable} from 'tabbable';

    /**
     * Adds keyboard focus handling to a list of items.
     * It ensures that all focusable elements inside the list are not available by "tabbing", but
     * can be focused by arrow keys. This allows for screen reader users to navigate the list
     * without tabbing through every single element.
     *
     * Usage:
     * ```svelte
     * <script>
     *     import {FocusList} from './FocusList.svelte';
     *     const focusList = new FocusList();
     * </ script>
     * <div {...focusList.list}>
     *     <button>Item 1</button>
     *     <button>Item 2</button>
     * </div>
     * ```
     */
    export class FocusList {
        public get list() {
            return {
                onkeydown: (e: KeyboardEvent) => {
                    if (e.key === 'Tab') {
                        if (document.activeElement instanceof HTMLElement
                            && e.currentTarget instanceof HTMLElement
                            && e.currentTarget.contains(document.activeElement)) {

                            // By setting the inert attribute to true we prevent the element from being tabbed to
                            // This will force the browser to figure out the next focusable element (this works in both
                            // directions)
                            const target = e.currentTarget;
                            target.inert = true;
                            setTimeout(() => target.inert = false, 0);
                        }
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') {
                        findNextFocusableElementIn(e.currentTarget as HTMLElement, 'previous')?.focus();
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'End') {
                        findNextFocusableElementIn(e.currentTarget as HTMLElement, 'next')?.focus();
                    }
                }
            };
        }
    }

    function findNextFocusableElementIn(container: HTMLElement, direction: 'next' | 'previous'): HTMLElement | SVGElement | undefined {
        const allTabbables = tabbable(container);
        let index: number = 0;
        const focused = document.activeElement;
        if (focused instanceof HTMLElement) {
            const focusedIndex = allTabbables.indexOf(focused);
            if (focusedIndex !== -1) {
                index = focusedIndex;
            }
        }

        if (direction === 'next') {
            index++;
            if (index >= allTabbables.length) {
                index = 0;
            }
        } else if (direction === 'previous') {
            index--;
            if (index < 0) {
                index = allTabbables.length - 1;
            }
        }

        return allTabbables[index];
    }
</script>
