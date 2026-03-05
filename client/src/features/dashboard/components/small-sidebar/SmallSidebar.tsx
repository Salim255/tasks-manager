import './_smallSideBar.scss';

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
    console.log(isSideBarIsOpen);
    return (
      <aside className='sm-aside'>
            <div className={isSideBarIsOpen ? 'sm-aside__sidebar-container  sm-aside--show-sidebar'
                : 'sm-aside__sidebar-container'} >
                <div className="sm-aside__content">
                    <button type="button" className="close-btn" onClick={toggle}>
                        <FaTimes />
                    </button>

                    <header>logo from samll sidebar</header>

                    <NavLinks toggleSidebar={toggle} />
                </div>
            </div>
        </aside>
    )
}