

import { useContext, useState } from 'react';
import logo from '../assets/logo.png';

import { FaUser } from 'react-icons/fa';


import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar = () => {

    const { user, setUser } = useContext(AuthContext) || {};

    const [dropdownVisible, setDropdownVisible] = useState(false);

    //const user = false;

    const navItems = user ? [
        { link: "Feed", path: "Feed" },
        { link: "Bed Time", path: "bedtime" },
        { link: "Activity", path: "activity" },
        { link: "About", path: "about" },
        { link: "Contact-Us", path: "contact" },
    ] : [
        { link: "Feed", path: "Feed" },
        { link: "About", path: "about" },
        { link: "Contact-Us", path: "contact" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUser(null)
    }

    const navigate = useNavigate();

    return (
        <>
            <nav className='bg-gradient-to-r from-primary to-secondary text-white py-4 px-0 md:px-8 lg:px-16 xl:px-24 2xl:px-64 fixed top-0 right-0 left-0'>
                <div className='flex justify-between items-center'>
                    {/* mobile menu */}
                    <div className='flex px-4 justify-between'>
                        <div className='md:hidden flex items-center justify-end mr-4'>
                            <button className='mobile-menu-button' onClick={toggleMenu}>
                                {isMenuOpen ? (
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                    </svg>
                                ) : (
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {/* logo */}
                        <div className='flex items-center space-x-3 '>
                            <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-white'>
                                <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} /><span className='md:block hidden'>Life Luminary</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <ul className='hidden md:flex space-x-12 mx-auto'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a href={`${item.path}`} className='block hover:text-gray-300'>{item.link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='hidden md:flex items-center space-x-4'>
                        {user ? (
                            <div className="relative inline-block text-left" onClick={() => setDropdownVisible(!dropdownVisible)}>
                                <div>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                        <FaUser />
                                    </button>
                                </div>

                                <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownVisible ? '' : 'hidden'}`}>
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button onClick={() => navigate('/profile')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</button>
                                        <button onClick={() => navigate('/settings')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</button>
                                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</button>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/register')}
                                    className='bg-primary text-white w-24 h-10 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500'
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='text-white w-24 h-10 px-4 py-2 rounded-md border border-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>


                    {/* mobile menu */}
                    <div className='md:hidden mr-5 flex items-center justify-end'>
                        {user ? (
                            <div className="relative inline-block text-left" onClick={() => setDropdownVisible(!dropdownVisible)}>
                                <div>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                        <FaUser />
                                    </button>
                                </div>

                                <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownVisible ? '' : 'hidden'}`}>
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button onClick={() => navigate('/profile')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</button>
                                        <button onClick={() => navigate('/settings')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</button>
                                        <button onClick={() => { }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</button>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <button
                                onClick={() => navigate('/register')}
                                className='bg-primary text-white w-24 h-10 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500'
                            >
                                Sign Up
                            </button>)}
                    </div>
                </div>
            </nav>

            {/* mobile menu */}
            <div className={`space-y-4 px-4 pt-24 pb-5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
    {navItems.map((item, index) => (
        <div key={index}>
            <a href={`${item.path}`} className='block text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200'>{item.link}</a>
            <hr />
        </div>
    ))}
</div>






        </>
    );
}

export default Navbar;