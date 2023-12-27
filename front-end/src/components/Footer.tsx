
import { navItems } from "./Navbar";

import '@fortawesome/fontawesome-free/css/all.css';

const Footer = () => {

    return (
        <footer className="bg-gray-800 text-white py-10 mt-10">
            <div className="container mx-auto px-4">
                <div className="lg:flex justify-between">

                    <div className="mb-6 lg:mb-0 lg:w-1/4 lg:mr-20">
                        <h2 className="text-lg font-semibold">About Us</h2>
                        <p className="mt-4 text-gray-400">Life Luminary is a simple app that lets you record the highlight of your day, particularly instances where you've helped someone else or yourself. The main objective of Life Luminary is to make the world a better place through simple acts of kindness.</p>
                    </div>
                    <div className="mb-6 lg:mb-0 lg:w-1/4">
                        <h2 className="text-lg font-semibold">Quick Links</h2>
                        <ul className="mt-4 text-sm text-gray-400">
                            {navItems.map((item, index) => (
                                <li key={index} className="my-3">
                                    <a href={`${item.path}`} className='hover:text-white'>{item.link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-6 lg:mb-0 lg:w-1/4 lg:mr-10">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <p className="mt-4 text-gray-400">123 Street, City, State, Country</p>
                        <p className="mt-2 text-gray-400">Email: xxxx@yy.com</p>
                        <p className="mt-2 text-gray-400">Phone: (123) 456-7890</p>
                    </div>
                    <div className="lg:w-1/4">
                        <h2 className="text-lg font-semibold">Follow Us</h2>
                        <ul className="mt-4 flex space-x-5">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
