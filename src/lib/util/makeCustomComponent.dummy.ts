export function makeCustomComponent(baseClass: new () => HTMLElement): new () => HTMLElement {
    return baseClass;
}
