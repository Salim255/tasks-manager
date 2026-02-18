import { useDispatch, useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { updateSidebarOpenState } from "./dashboardSlice";
import type { RootState } from "../../../redux/store";

export const BigSidebar = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    const dispatch = useDispatch();
    function toggle() {
        //setSideBarIsOpen(isSideBarOpen);
        dispatch(updateSidebarOpenState())
        console.log()
    }
    return (
        <section className={isSideBarIsOpen ? 'sidebar-container sidebar-container--show ': 'sidebar-container'}>
            <div className="content">
                <header>
                    logo
                </header>
                <NavLinks toggleSidebar={toggle}></NavLinks>
            </div>
        </section>
    )
}