import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { updateSidebarOpenState } from '../../states/dashboardSlice';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { clearUser } from '../../../auth/states/authSlice';

export const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { dashboard } = useSelector((store: RootState) => store);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(clearUser());
    }

    const toggle =  () =>  {
      dispatch(updateSidebarOpenState())
    }

    useEffect(() => {
    }, [dashboard]);
    
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
                    onClick={handleLogout}
                    >
                    logout
                    </button>
                </div>
            </div>
        </div>
      </nav>
    )
}

