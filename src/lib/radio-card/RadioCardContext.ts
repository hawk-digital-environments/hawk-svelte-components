import {Context} from 'runed';

interface RadioCardContext {
    getValue: () => string,
    setValue: (newValue: string) => void
    isDisabled: () => boolean
}

export const radioCardContext = new Context<RadioCardContext>('radio');
