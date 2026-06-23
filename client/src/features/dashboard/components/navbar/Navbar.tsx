import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import { updateSidebarOpenState } from '../../states/dashboardSlice';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { useProfileSelector } from '../../../profile/states/profileSelectors';
import { UserMenu } from '../user-menu/UserMenu';


export const Navbar = () => {
    const { dashboard } = useSelector((store: RootState) => store);
    const { profile } = useProfileSelector();
    const dispatch = useDispatch<AppDispatch>();

    const toggle =  () =>  {
      dispatch(updateSidebarOpenState())
    }

    useEffect(() => {

    }, [dashboard, profile]);
    
    return (
     <nav className="navbar">
        <div className="navbar__container">

            <button
            type="button"
            className="navbar__toggle"
            onClick={toggle}
            >
            <FaAlignLeft />
            </button>

            <h1 className="navbar__logo">
            FlowBoard
            </h1>
            <UserMenu profile={profile}/>
        </div>
        </nav>
    )
}

