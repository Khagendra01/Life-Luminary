import React from 'react';



const ContactUs = () => {

    const handleSubmit = (event: any) => {
        event.preventDefault();

    }

    return (
        <>
            <div className="flex flex-col items-center py-2">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3">
                    <h2 className="text-2xl font-bold mb-5 text-gray-900">Contact Us</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" placeholder="First Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" placeholder="Last Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded-lg" type="email" placeholder="Email" required />
                        <textarea className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Message" required></textarea>
                        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm" type="submit">
                            submit
                        </button>
                    </form>
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
        </>
    );
}

export default ContactUs;