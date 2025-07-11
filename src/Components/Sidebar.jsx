import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, toggleSidebar, closeSidebar }) => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    const categoryIcons = {
        Educational: (
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        Racing: (

            <svg
                className="h-4 w-4 text-yellow-500 align-middle"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path d="M3 13h18l-1 9H4l-1-9z" />
                <circle cx="7" cy="21" r="2" />
                <circle cx="17" cy="21" r="2" />
            </svg >

        ),


        Quiz: (
            <svg
                className="h-4 w-4 text-purple-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path d="M12 18h.01" />
                <path d="M12 14a4 4 0 1 0-4-4 4 4 0 0 1 8 0" />
            </svg>
        ),

        Arcade: (
            <svg className="h-4 w-4 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8" cy="12" r="1" />
                <circle cx="16" cy="12" r="1" />
            </svg>
        ),
        Logic: (
            <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12h6" />
                <path d="M12 9v6" />
                <circle cx="12" cy="12" r="10" />
            </svg>
        ),
        Sports: (
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        Adventure: (
            <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2l4 20-4-2-4 2 4-20z" />
            </svg>
        ),
        Action: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                width="24"
                height="24"
                viewBox="0 0 2.33333 2.33333"
                style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "optimizeQuality",
                    fillRule: "evenodd",
                    clipRule: "evenodd"
                }}
            >
                <g>
                    <path d="M1.00178 1.18762c-0.00764567..." fillRule="nonzero" />
                    <path d="M1.34017 1.72908l0.395358..." fillRule="nonzero" />
                    <path d="M1.40702 1.42317c0.0186181..." fillRule="nonzero" />
                    <path d="M1.96744 0.366417l-0.320106..." fillRule="nonzero" />
                    <path d="M0.979016 1.7715l-0.423638..." fillRule="nonzero" />
                    <path d="M0.898031 1.39489c-0.0186181..." fillRule="nonzero" />
                </g>
            </svg>

        ),
        Strategy: (
            <svg className="h-4 w-4 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l4 4 4-8" />
            </svg>
        ),
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/game/all-categories`);
                setCategories(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err.message);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div onClick={closeSidebar} className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden" />
            )}

            <aside
                className={`
          bg-gray-900 text-white border-r border-gray-700
          w-64 fixed top-16 left-0 h-[calc(100vh-64px)] z-50
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:top-0 lg:left-0 lg:h-auto lg:transform-none lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex h-full flex-col overflow-auto pt-0 px-4">
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {/* Home Link */}
                            <li>
                                <Link
                                    to="/"
                                    onClick={closeSidebar}
                                    className={`flex items-center  px-4 py-2 rounded-lg ${location.pathname === '/' ? 'text-red-500  bg-gray-800' : 'text-white '
                                        }`}
                                >
                                    <svg
                                        className="h-5 w-5 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    </svg>
                                    <span>Home</span>
                                </Link>
                            </li>

                            {/* Category Links */}
                            {/* <li> */}
                            {/* <ul className="pl-6 space-y-1 mt-1"> */}
                            {categories.map((category, index) => {
                                const icon = categoryIcons[category] || (
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                );

                                // Active if current path exactly matches /category/categoryName
                                const isActive = location.pathname === `/category/${category}`;

                                return (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${category}`}
                                            onClick={closeSidebar}
                                            className={`flex items-center px-4 gap-x-2 py-1 hover:text-red-500 ${isActive ? 'text-red-500 flex-start bg-gray-800 px-4 py-2 rounded-lg' : 'text-white'
                                                }`}
                                        >
                                            {icon}
                                            <span>{category}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {/* </li> */}
                        {/* </ul> */}
                    </nav>
                </div >
            </aside >
        </>
    );
};

export default Sidebar;
