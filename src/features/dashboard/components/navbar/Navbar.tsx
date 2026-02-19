import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { updateSidebarOpenState } from './dashboardSlice';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { dashboard } = useSelector((store) => store);
    const dispatch = useDispatch();
    function toggle () {
      dispatch(updateSidebarOpenState())
    }
    useEffect(() => {
        console.log(dashboard);
    }, [dashboard])
    return (
      <nav className='navbar'>
        <div className='navbar__nav-center'>
            <button type='button' className='toggle-btn' onClick={toggle}>
                <FaAlignLeft />
            </button>
            <div>
                logo
                <h3 className='logo-text'>dashboard</h3>
            </div>
            <div className='btn-container'>
                <button
                    type='button'
                    className='btn'
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUserCircle />
                    {/* {user?.name} */}
                    Salim
                    <FaCaretDown />
                </button>
                <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button
                    type='button'
                    className='dropdown-btn'
                    >
                    logout
                    </button>
                </div>
            </div>
        </div>
      </nav>
    )
}

