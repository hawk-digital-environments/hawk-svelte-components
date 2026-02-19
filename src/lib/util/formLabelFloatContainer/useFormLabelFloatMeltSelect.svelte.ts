import FormLabelFloatContainer from '$lib/util/formLabelFloatContainer/FormLabelFloatContainer.svelte';
import type {UseFloatingConfig} from 'melt';

/**
 * A companion hook for the FormLabelFloatContainer, which provides the necessary
 * configuration for a Melt Select/Combobox component to work properly with the floating label.
 *
 * The main purpose of this hook is to ensure that the floating label is correctly positioned relative
 * to the Select component, even when the Select's dropdown is open.
 * It achieves this by using the `onCompute` callback of the `useFloating` configuration to adjust the
 * position of the floating element based on the dimensions and position of the Select component.
 */
export function useFormLabelFloatMeltSelect() {
    let container = $state<ReturnType<typeof FormLabelFloatContainer> | null>(null);
    let referenceEl = $state<Element | null>(null);
    let floatingEl = $state<HTMLElement | null>(null);

    const selectFloatingConfig: UseFloatingConfig = {
        offset: {
            mainAxis: 0
        },
        onCompute: function (args) {
            const {floatingApply, arrowApply, placement} = args;
            floatingApply();
            arrowApply();

            if (!floatingEl) {
                console.log('No floating element found');
                return;
            }

            const realRef = container?.getLayoutWrapElement();
            if (!realRef) {
                console.log('No container element found for the floating element');
                return;
            }

            const inputRef = referenceEl;
            if (!inputRef) {
                console.log('No reference element found for the actually used reference element (which is the input element)');
                return;
            }

            const realRefRect = realRef.getBoundingClientRect();
            const realRefStyle = getComputedStyle(realRef);
            let offsetY = parseFloat(realRefStyle.paddingBottom) + parseFloat(realRefStyle.borderBottomWidth);

            if (placement === 'top' || placement === 'top-start' || placement === 'top-end') {
                offsetY = -offsetY - 15; // The 15 are extra padding so we do not overlap our own label.
            }

            const inputRefRect = inputRef.getBoundingClientRect();

            const offsetX = realRefRect.x - inputRefRect.x;

            Object.assign(floatingEl.style, {
                width: `${realRefRect.width}px`,
                x: `${realRefRect.x}px`,
                y: 0,
                marginLeft: `${offsetX}px`,
                marginTop: `${offsetY}px`
            });
        },
        computePosition: {
            middleware: [
                {
                    name: 'captureFloatingAndRefElements',
                    fn({elements}) {
                        floatingEl = elements.floating;
                        referenceEl = elements.reference as Element;
                        return {};
                    }
                }
            ]
        }
    };

    return {
        get container() {
            return container;
        },
        set container(value) {
            container = value;
        },
        floatingConfig: selectFloatingConfig
    };
}
