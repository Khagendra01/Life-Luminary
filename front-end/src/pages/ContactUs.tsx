import { useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ContactInfo } from '../models/contactModel';
import { contactUs } from '../api/contactUs';

const ContactUs = () => {
    const [loading, setLoading] = useState(false);

    const initInfo: ContactInfo = { firstName: "", lastName:"", email:"", message:"" };

    const [contactInfo, setContactInfo] = useState<ContactInfo>( initInfo );

    const handleloginInfoChange = (name: keyof ContactInfo, value: string) => {
        setContactInfo({ ...contactInfo, [name]: value });
    }

    const handleSubmit = async() => {
        setLoading(true);
        console.log(contactInfo)
        await contactUs(contactInfo)
        .then(() => {
            alert("Contact Us report Posted")
            setContactInfo(initInfo)
        })
        .catch((error) => {
            alert(`Sorry ${error.message}`);
          });

        setLoading(false);
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center py-2">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3">
                    <h2 className="text-2xl font-bold mb-5 text-gray-900">Contact Us</h2>
                    <div className="space-y-5" onSubmit={handleSubmit}>
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" id ="firstName" name ="firstName" placeholder="First Name" required onChange={(e) => handleloginInfoChange(e.target.name as keyof ContactInfo, e.target.value)}/>
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" id ="lastName" name ="lastName" placeholder="Last Name" required onChange={(e) => handleloginInfoChange(e.target.name as keyof ContactInfo, e.target.value)} />
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="email" id ="email" name="email" placeholder="Email" required onChange={(e) => handleloginInfoChange(e.target.name as keyof ContactInfo, e.target.value)} />
                        <textarea className="w-full p-2 border border-gray-300 rounded-lg" id="message" name="message" placeholder="Message" required onChange={(e) => handleloginInfoChange(e.target.name as keyof ContactInfo, e.target.value)}></textarea>
                        <button onClick={handleSubmit} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-20 flex flex-col bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
                <div className="flex-1 bg-white p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join as a Developer</h2>
                        <p className="text-gray-600 text-base leading-normal">
                            Join our team as a developer and help us build amazing things.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center py-4 px-4 bg-gray-100 border-t border-gray-200">
                    <button onClick={ () => alert("Fill the contact us form, we have note created the separate form for this application. If you are approved in the team, you are going to make it.")} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Join Now
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ContactUs;