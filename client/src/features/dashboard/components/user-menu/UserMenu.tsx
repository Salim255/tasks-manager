import "./_user-menu.scss";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "../../../profile/model/profile.model";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "../../../../shared/hooks/useClickOutside";
import { useUserData } from "../../../auth/states/authSelectors";
import { logout } from "../../../auth/states/logout";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";

export const UserMenu = ({ profile }: { profile?: Profile }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userData = useUserData();

  const ref = useRef<HTMLDivElement>(null!);
  const { register, unregister } = useClickOutside();

  const isAuthenticatedUser = !!profile;

  const handleLogout = () => {
    setOpen(false);
    logout(dispatch);
  };

  useEffect(() => {
    if (!ref.current) return;

    register(ref, () => setOpen(false));

    return () => {
      unregister(ref);
    };
  }, [register, unregister]);

  return (
    <div className="user-menu" ref={ref}>
      {/* TRIGGER */}
      <button
        type="button"
        className="user-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          if (!isAuthenticatedUser) {
            handleLogout();
            return;
          }
          setOpen((prev) => !prev);
        }}
      >
        <FaUserCircle className="user-menu__icon" />

        <span className="user-menu__name">
          { 
            userData?.isDemo
            ? "Demo account"
            : profile?.firstName ?? "User"
          }
        </span>

        {
          isAuthenticatedUser 
          && (
            <FaCaretDown
              className={`user-menu__caret ${
                open ? "user-menu__caret--open" : ""
              }`}
            />
          )
        }
      </button>

      {/* DROPDOWN */}
      <div
        className={`user-menu__dropdown ${
          open ? "user-menu__dropdown--open" : ""
        }`}
      >
        <NavLink
          to="/profile"
          className="user-menu__item"
          onClick={() => setOpen(false)}
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
  );
};