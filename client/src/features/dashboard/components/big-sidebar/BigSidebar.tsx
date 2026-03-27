import "./_big-sidebar.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../../../redux/store";
import { NavLinks } from "../nav-links/NavLinks";
import { DiScrum } from "react-icons/di";

export const BigSidebar = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);

    useEffect(() => {
    }, [isSideBarIsOpen])
    return (
        <aside className="bg-aside" >
             <div className={ isSideBarIsOpen ? 
                "bg-aside__sidebar-container bg-aside--show-sidebar"
                : "bg-aside__sidebar-container" }>
                <div className='bg-aside__content'>
                    <header>
                        <DiScrum/>
                        {/* <img src="/img/logos/logo.png" alt="logo" className="bg-aside__logo"/> */}

                    </header>
                    <NavLinks/>
                </div>
            </div> 
        </aside>
    )
}