
import { useQuickActionIsOpen } from "../states/quickActionsSelectors";

export const AppModals = () => {
    const quickActionIsOpen = useQuickActionIsOpen();
    console.log("Hello from AppModals", quickActionIsOpen)

    return <>

    </>
        
    
    


}