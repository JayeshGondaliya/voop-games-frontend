// src/components/Footer.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="text-white p-2 ">
            <div className="fluid-container mx-auto max-w-7xl">

                {/* Upper Part */}
                <div className="flex  m-0 flex-col md:flex-row md:justify-between md:space-x-8 items-start md:items-start text-left">


                    {/* Description */}
                    <div className="md:flex-1  mx-auto md:mx-0 flex flex-col items-start mb-2 md:mb-0">
                        <h3 className="text-xl sm:text-lg md:text-xl font-semibold mb-2">About Voop Games</h3>
                        <p className="leading-relaxed mb-4 text-left text-xs sm:text-sm md:text-base lg:text-base">
                            Welcome to <span className="text-red-600 font-bold">Voop Games</span>, your go-to destination for free online games! We offer a wide variety of HTML5 games that you can play instantly on any device—no downloads required. Our goal is to provide a fun, safe, and accessible gaming experience for players of all ages. Join us today and explore new games, challenge your friends, and dive into hours of endless entertainment!
                        </p>
                    </div>


                    {/* Links + Social */}
                    <div className=" md:w-1/2  flex flex-nowrap md:flex-wrap lg:flex-wrap text-center gap-4 md:gap-8 justify-between md:justify-between lg:justify-around text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-6xl mx-auto ">

                        {/* Our Links */}
                        <div className="text-left w-1/2 md:w-auto text-center">
                            <h3 className="text-sm sm:text-base md:text-xl  font-semibold mb-2">Our Links</h3>
                            <ul className="space-y-2 ">
                                <li className=" lg:text-base hover:text-red-600 cursor-pointer sm:text-base">Developers</li>
                                <li className="lg:text-base hover:text-red-600 cursor-pointer sm:text-base">Affiliate</li>
                                <li className="lg:text-base hover:text-red-600 cursor-pointer sm:text-base">Contact Us</li>
                                <li className="lg:text-base hover:text-red-600 cursor-pointer sm:text-base">About</li>
                            </ul>
                        </div>

                        {/* Social + Terms */}
                        <div className="text-left  w-1/2 md:w-auto flex flex-col text-center">
                            {/* Social Icons */}
                            <div className="flex justify-center md:justify-start space-x-3 mb-4 text-center">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full bg-indigo-600  transition flex items-center justify-center" title="Facebook">
                                    <i className="fab fa-facebook-f text-white text-xs sm:text-sm md:text-base"></i>
                                </div>
                                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full bg-blue-400  transition flex items-center justify-center" title="Twitter">
                                    <i className="fab fa-twitter text-white text-xs sm:text-sm md:text-base"></i>
                                </div>
                                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full bg-pink-500  transition flex items-center justify-center" title="Instagram">
                                    <i className="fab fa-instagram text-white text-xs sm:text-sm md:text-base"></i>
                                </div>
                                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full bg-red-600  transition flex items-center justify-center" title="Pinterest">
                                    <i className="fab fa-pinterest-p text-white text-xs sm:text-sm md:text-base"></i>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex flex-col space-y-0  text-center sm:text-base">
                                <p className="hover:text-indigo-400 cursor-pointer sm:text-base">Terms of Use</p>
                                <p className="hover:text-indigo-400 cursor-pointer sm:text-base">Privacy Policy</p>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

            {/* Developed By */}
            <div className="text-center text-white   text-sm">
                <p>
                    <em className="not-italic font-light">Developed By </em>
                    <span className="font-semibold text-white">Jayesh K. Gondaliya, Ruchit D. Gevariya</span>
                </p>
            </div>

            {/* Copyright */}
            <div className="text-center text-white  text-sm">
                <p>
                    <span className="font-semibold text-white">© Voop Games - All Rights Reserved.</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
