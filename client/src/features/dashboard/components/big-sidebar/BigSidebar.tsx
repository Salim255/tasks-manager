import "./_big-sidebar.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../../../redux/store";

export const BigSidebar = ({ children }: { children: React.ReactNode }) => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);

    useEffect(() => {
    }, [isSideBarIsOpen])

    return (
        <aside
            className={
                isSideBarIsOpen
                ? "bg-aside bg-aside--show-sidebar"
                : "bg-aside"
            }
            >
            <div className="bg-aside__sidebar-container">
                <div className="bg-aside__content">
                {children}
                </div>
            </div>
       </aside>
    )
}