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
        <section className="nav-container">
            <button onClick={onShowNavLinks}>
                <FaAlignLeft/>
            </button>
            <div>
               <h1> tasker </h1>
            </div>
            <div className='btn-container'>
                <button>
                    <FaUserCircle />
                    salim
                    <FaCaretDown  />
                </button>
                <div className="bto">
                    <button>
                        logout
                    </button>
                </div>
            </div>
            
        </section>
    )
}