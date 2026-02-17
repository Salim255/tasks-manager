import './_smallSideBar.scss';

import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { NavLinks } from './NavLinks';
import { updateSidebarOpenState } from './dashboardSlice';
import type { RootState } from '../../../redux/store';

export const SmallSidebar = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    const dispatch = useDispatch();
    function toggle() {
        //setSideBarIsOpen(isSideBarOpen);
         dispatch(updateSidebarOpenState())
        console.log()
    }

    useEffect(() => {
        console.log(isSideBarIsOpen);
    }, [])

    return (
      <section className={isSideBarIsOpen ? 'sidebar-container sidebar-container--show ': 'sidebar-container'}>
        <div className="content">
            <button className="close-btn" onClick={toggle}>
                <FaTimes></FaTimes>
            </button>
            <header>
                logo
            </header>
            <NavLinks toggleSidebar={toggle}/>
        </div>
      </section>
    )
}