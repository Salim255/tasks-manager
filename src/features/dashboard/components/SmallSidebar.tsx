import './_smallSideBar.scss';

import { useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { NavLinks } from './NavLinks';

export const SmallSidebar = () => {
    const [isSideBarOpen, setSideBarIsOpen] = useState<boolean>(false);
    const { dashoboar } = useSelector((store) => store);

    function toggle() {
        setSideBarIsOpen(!isSideBarOpen);
        console.log()
    }

    console.log(dashoboar)
    return (
      <section className={!isSideBarOpen ? 'sidebar-container sidebar-container--show ': 'sidebar-container'}>
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