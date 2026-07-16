import "./_small-side-bar.scss";

import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import type { RootState } from '../../../../redux/store';
import { updateSidebarOpenState } from '../../states/dashboardSlice';
import { NavLinks } from '../nav-links/NavLinks';

export const SmallSidebar = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    const dispatch = useDispatch();
    function toggle() {
        dispatch(updateSidebarOpenState())
    }

    return (
    
       <div className={`sm-aside ${isSideBarIsOpen ? "sm-aside--show-sidebar" : ""}`}>
    <div className="sm-aside__sidebar-container">

        <aside className="sm-aside__content">

            <header className="sm-aside__header">

                <h2 className="sm-aside__title">
                    FlowBoard
                </h2>

                <button
                    type="button"
                    className="sm-aside__close"
                    onClick={toggle}
                >
                    <FaTimes />
                </button>

            </header>

            <nav className="sm-aside__nav">
                <NavLinks toggleSidebar={toggle} />
            </nav>

        </aside>

    </div>
</div>
    )
}