import './_user-menu.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../../auth/states/logout';
import type { AppDispatch } from '../../../../redux/store';
import { useEffect, useRef, useState } from 'react';
import type { Profile } from '../../../profile/model/profile.model';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useClickOutside } from '../../../../shared/hooks/useClickOutside';
import { useUserData } from '../../../auth/states/authSelectors';

export const UserMenu = ({ profile }:{ profile: Profile | undefined }) => {
  const [showLogout, setShowLogout] = useState(false);
  const userData = useUserData();
  
  const ref = useRef<HTMLDivElement>(null!);
  const dispatch = useDispatch<AppDispatch>();


   const { register, unregister } = useClickOutside();

  const handleLogout = () => logout(dispatch);

  
  useEffect(() => {
    console.log('isDemo:', userData?.isDemo);
      if (ref.current) {
        register(ref, () => setShowLogout(false));
      }
      return () => unregister(ref);
  }, [ profile, register, unregister, showLogout]);

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={() =>
          profile
            ? setShowLogout(!showLogout)
            : handleLogout()
        }
      >
        <FaUserCircle className="user-menu__icon" />

        <span className="user-menu__name">
         { userData?.isDemo ? "Demo account" : profile?.firstName }
        </span>

        { profile && (
          <FaCaretDown
            className={`user-menu__caret ${
              showLogout
                ? "user-menu__caret--open"
                : ""
            }`}
          />
        ) }
      </button>

      <div
        className={`user-menu__dropdown ${
          showLogout
            ? "user-menu__dropdown--open"
            : ""
        }`}
      >
        <NavLink
          to="/profile"
          className="user-menu__item"
          onClick={() => setShowLogout(false)}
        >
          Profile
        </NavLink>

        <button
          type="button"
          className="user-menu__item"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}