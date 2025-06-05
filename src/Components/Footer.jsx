import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <>
            {/* Main Footer */}
            <footer className="bg-gray-900 text-white p-2">
                <div className="fluid-container mx-auto max-w-7xl">
                    <div
                        className="
                            flex flex-col
                            md:flex-row
                            md:justify-between
                            md:space-x-8
                            items-center
                            md:items-start
                            text-center
                            md:text-left
                        "
                    >
                        {/* About Section */}
                        <div className="md:flex-1 mb-0 md:mb-0 max-w-md mx-auto md:mx-0 flex flex-col items-start">
                            <h3 className="text-xl font-semibold mb-4">About Toca Games World</h3>
                            <p className="leading-relaxed mb-4 text-left">
                                Welcome to <span className="text-indigo-400 font-bold">Toca Games World</span>, your go-to destination for free online games! We offer a wide variety of HTML5 games that you can play instantly on any device—no downloads required. Our goal is to provide a fun, safe, and accessible gaming experience for players of all ages. Join us today and explore new games, challenge your friends, and dive into hours of endless entertainment!
                            </p>
                        </div>

                        {/* Links Section */}
                        <div className="w-full sm:w-1/2 md:flex-1 max-w-xs mx-auto md:mx-0 mb-8 md:mb-0">
                            <h3 className="text-xl font-semibold mb-4">Our Links</h3>
                            <ul className="space-y-2">
                                <li className="hover:text-indigo-400 cursor-pointer">Developers</li>
                                <li className="hover:text-indigo-400 cursor-pointer">Affiliate</li>
                                <li className="hover:text-indigo-400 cursor-pointer">Contact Us</li>
                                <li className="hover:text-indigo-400 cursor-pointer">About</li>
                            </ul>
                        </div>

                        {/* Social & Legal */}
                        <div className="md:flex-1 max-w-xs mx-auto md:mx-0">
                            <div className="flex justify-center md:justify-start space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition flex items-center justify-center">
                                    <i className="fab fa-facebook-f text-white"></i>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-400 hover:bg-blue-500 cursor-pointer transition flex items-center justify-center">
                                    <i className="fab fa-twitter text-white"></i>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 cursor-pointer transition flex items-center justify-center">
                                    <i className="fab fa-instagram text-white"></i>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 cursor-pointer transition flex items-center justify-center">
                                    <i className="fab fa-pinterest-p text-white"></i>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2 font-bold text-sm cursor-pointer">
                                <p className="hover:text-indigo-400">Terms of Use</p>
                                <p className="hover:text-indigo-400">Privacy Policy</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Developed By Section */}
                <div className=" text-center text-white py-0 text-sm">
                    <p>
                        <em className="not-italic font-light">Developed By  </em>
                        <span className="font-semibold text-white"> Jayesh K. Gondaliya , Ruchit D. Gevariya</span>
                    </p>
                </div>
                <div className=" text-center text-white py-0 text-sm">
                    <p>
                        <span className="font-semibold text-white"> &copy; Voop Games-All Rights Reserved.</span>
                    </p>
                </div>
            </footer>


        </>
    );
};

export default Footer;
