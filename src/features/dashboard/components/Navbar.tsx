import { useDispatch, useSelector } from 'react-redux';
import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { updateSidebarOpenState } from './dashboardSlice';
import { useEffect } from 'react';

export const Navbar = () => {
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
        <section className="nav-center">
            <button onClick={onShowNavLinks}>
                <FaAlignLeft/>
            </button>
            <div>
               <h3 className='logo-text'> tasker </h3>
            </div>
            <div className='btn-container'>
                <button
                className='btn'>
                    <FaUserCircle />
                      salim
                    <FaCaretDown />
                </button>
                <div className="bto">
                    <button
                    className='dropdown-btn'
                    >
                      logout
                    </button>
                </div>
            </div>
        </section>
      </nav>
    )
}