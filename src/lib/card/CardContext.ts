import {Context} from 'runed';

interface CardContext {
    /**
     * If given can decide if the border between card content and details should be highlighted.
     */
    isDetailsBorderHighlighted?: () => boolean,
}

export const cardContext = new Context<CardContext>('card');
