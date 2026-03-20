import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { updateSidebarOpenState } from '../../states/dashboardSlice';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { clearUser } from '../../../auth/states/authSlice';
import { NavLink } from 'react-router-dom';
import { useProfileSelector } from '../../../profile/states/profileSelectors';
import { useClickOutside } from '../../../../shared/hooks/useClickOutside';


export const Navbar = () => {

    const [showLogout, setShowLogout] = useState(false);
    const { dashboard } = useSelector((store: RootState) => store);
    const { profile } = useProfileSelector();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(clearUser());
    }

    const toggle =  () =>  {
      dispatch(updateSidebarOpenState())
    }

    const ref = useRef<HTMLDivElement>(null!);
    const { register, unregister } = useClickOutside();
    useEffect(() => {
        if (ref.current) {
          register(ref, () => setShowLogout(false));
        }
        return () => unregister(ref);
    }, [dashboard, profile, register, unregister, showLogout]);
    
    return (
      <nav className='navbar'>
        <div className='navbar__nav-center'>
            <button type='button' className='toggle-btn' onClick={toggle}>
                <FaAlignLeft />
            </button>
            <div>
                <h4 className='logo-text'>FlowBoard</h4>
            </div>
            <div className='btn-container'>
                <button
                    type='button'
                    className='btn'
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUserCircle />
                    {/* {user?.name} */}
                     {profile?.firstName}
                    <FaCaretDown />
                </button>
                <div ref={ref} className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button
                    type='button'
                    className='dropdown-btn'
                    onClick={handleLogout}>
                        logout
                    </button>
                    <NavLink 
                        to={"/profile"} 
                        className='dropdown-btn btn-container__user-profile'>
                        profile
                    </NavLink>
                </div>
            </div>
        </div>
      </nav>
    )
}

