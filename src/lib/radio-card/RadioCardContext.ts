import { Context } from "runed";

export const radioContext= new Context<{   
    getValue: () => string,
    setValue: (newValue: string) => void
    }>("radio")


    



