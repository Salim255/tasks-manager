import './_navbar.scss';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
export const Navbar = () => {
    return (
        <section className="nav-container">
            <button>
                <FaAlignLeft/>
            </button>
            <div>
               <h1> dashboard </h1>
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