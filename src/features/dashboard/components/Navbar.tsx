import './_navbar.scss';
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
export const Navbar = () => {
    return (
        <section className="nav-container">
            <button>
                <FaAlignLeft/>
            </button>
            <div>
               <h1> dashboard </h1>
            </div>
            <div>
                <button>
                    <FaUserCircle />
                    <FaCaretDown  />
                </button>
            </div>
            
        </section>
    )
}