import { useDispatch } from "react-redux";
import { NavLinks } from "./NavLinks";
import { updateSidebarOpenState } from "./dashboardSlice";

export const BigSidebar = () => {
    const dispatch = useDispatch();
    function toggle() {
        //setSideBarIsOpen(isSideBarOpen);
        dispatch(updateSidebarOpenState())
        console.log()
    }
    return (
        <section>
          <NavLinks toggleSidebar={toggle}></NavLinks>
        </section>
    )
}