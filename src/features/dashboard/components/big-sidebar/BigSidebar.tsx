
import "./_big-sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { updateSidebarOpenState } from "./dashboardSlice";
import type { RootState } from "../../../redux/store";
import { useEffect } from "react";

export const BigSidebar = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    const dispatch = useDispatch();
    function toggle() {
        //setSideBarIsOpen(isSideBarOpen);
        dispatch(updateSidebarOpenState())
    }

    useEffect(() => {
        console.log(isSideBarIsOpen)
    }, [isSideBarIsOpen])
    return (
        <aside className="bg-aside" >
             <div className={ isSideBarIsOpen ? 
                "bg-aside__sidebar-container bg-aside--show-sidebar"
                : "bg-aside__sidebar-container" }>
                <div className='bg-aside__content'>
                    <header>
                        logo
                    </header>
                    <NavLinks toggleSidebar={toggle} />
                </div>
            </div> 
        </aside>
    )
}