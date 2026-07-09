import { useDispatch } from "react-redux";
import "./_navbar.scss";
import { PiTextOutdentBold } from "react-icons/pi";
import { updateSidebarOpenState } from "../../states/dashboardSlice";
import { type AppDispatch } from "../../../../redux/store";
import { useProfileSelector } from "../../../profile/states/profileSelectors";
import { UserMenu } from "../user-menu/UserMenu";

export const Navbar = () => {
  const { profile } = useProfileSelector();
  const dispatch = useDispatch<AppDispatch>();

  const toggle = () => {
    dispatch(updateSidebarOpenState());
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <button
            type="button"
            className="navbar__toggle"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <PiTextOutdentBold />
          </button>

          <div className="navbar__brand">
            <h1 className="navbar__logo">FlowBoard</h1>
            <p className="navbar__subtitle">Agile project management</p>
          </div>
        </div>

        <div className="navbar__right">
          <UserMenu profile={profile} />
        </div>
      </div>
    </nav>
  );
};