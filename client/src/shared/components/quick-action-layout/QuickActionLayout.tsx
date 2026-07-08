import { type ReactNode } from "react";
import "./_quick-action-layout.scss";
import { Group,  Panel, Separator  } from "react-resizable-panels";
import { QuickActionHeader } from "../quick-action-header/QuickActionHeader";
import { useQuickActionIsOpen } from "../../modals/states/quickActionsSelectors";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
};

export const QuickActionLayout = ({
  children
}: Props) => {
    const isOpen = useQuickActionIsOpen();
   
    return (
        <aside
        className={`
            quick-action-layout
            ${isOpen ? "quick-action-layout--open" : ""}
        `}
        aria-hidden={!isOpen}
        >

        <div className="quick-action-layout__backdrop" />


        <Group
        
            orientation="horizontal"
            className="quick-action-layout__group"
        >

            <Panel
            groupResizeBehavior="preserve-pixel-size"
            
            />

            <Separator className="quick-action-layout__separator" />


            <Panel
                maxSize={600}
                defaultSize={450}
                minSize={450}
            groupResizeBehavior="preserve-pixel-size"
            >

            <div className="quick-action-layout__panel ">
                <QuickActionHeader/>
                <div className="quick-action-layout__children">
                {children}
                </div>
            </div>

            </Panel>


        </Group>

        </aside>
    );
};