import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { updateSidebarOpenState } from './dashboardSlice';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { dashboard } = useSelector((store) => store);
    const dispatch = useDispatch();
    function onShowNavLinks () {
      dispatch(updateSidebarOpenState())
    }
    useEffect(() => {
        console.log(dashboard);
    }, [dashboard])
    return (
      <nav>
        <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={onShowNavLinks}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
             onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            salim
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