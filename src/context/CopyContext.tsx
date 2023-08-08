import { createContextId } from "@builder.io/qwik";

export interface CopyAlert {
    visible: boolean;
}
export const CopyAlertContext = createContextId<CopyAlert>('CopyAlert');


