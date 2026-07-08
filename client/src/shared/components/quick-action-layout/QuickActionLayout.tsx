import { type ReactNode } from "react";
import "./_quick-action-layout.scss";
import { Group,  Panel, Separator  } from "react-resizable-panels";
import { QuickActionHeader } from "../quick-action-header/QuickActionHeader";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
};

export const QuickActionLayout = ({
  children,
  isOpen = false,
}: Props) => {
  const onClose = () => {};
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
            maxSize={1000}
            defaultSize={300}
            minSize={300}
          groupResizeBehavior="preserve-pixel-size"
        >

          <div className="quick-action-layout__panel">
             <QuickActionHeader
  title="Create task"
  description="Add a new task to this project and capture the key details before assigning it."
  onClose={onClose}
/>
            <div className="quick-action-layout__children">
              {children}
            </div>
          </div>

        </Panel>


      </Group>

    </aside>
  );
};