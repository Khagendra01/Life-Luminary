

import logo from '../assets/logo.png';

const navItems = [
    { link: "Overview", path: "home" },
    { link: "Features", path: "features" },
    { link: "Pricing", path: "pricing" },
    { link: "About", path: "about" },
]

function Navbar() {
    return (
        <nav className='bg-gray-900 text-white py-4 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'> {/* 2xl:px-64 is for 2xl screens and above */}
            <div>
                <div>
                    <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                        <img src={logo} alt="logo" /> <span>XYZ</span>
                    </a>

                    <ul className='md:flex space-x-12'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href={`#${item.path}`} className='block hover:text-gray-300'>{item.link}</a>
                            </li>
                        ))}
                    </ul>
                    {/* language and signup */}
                    <div className='hidden md:flex items-center space-x-12'>
                        <button className='bg-primary text-white px-4 py-2 rounded-md'>Sign Up</button>
                        <select className='bg-primary text-white px-4 py-2 rounded-md'>
                            <option>English</option>
                            <option>French</option>
                            <option>Spanish</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;