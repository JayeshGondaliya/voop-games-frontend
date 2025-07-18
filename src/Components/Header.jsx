import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';

const Header = ({ toggleSearch, toggleSidebar, isSearchActive, closeSidebar }) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get('search') || '');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            console.log("Screen width:", window.innerWidth);
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        if (urlSearch !== searchText) {
            setSearchText(urlSearch);
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const handleClear = () => {
        setSearchText('');
        setSearchParams({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search submitted:', searchText);
    };

    const showSearch = location.pathname === '/';

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between bg-gray-900 pt-0 px-2 md:px-2 h-16 border-b-0 shadow-none">
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="w-8 h-8 flex items-center justify-center"
                    aria-label="Toggle Menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" id="menu-strawberry">
                        <path fill="#fff" fill-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM5 12C5 11.4477 5.44772 11 6 11L18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L6 13C5.44772 13 5 12.5523 5 12ZM7 18C7 17.4477 7.44772 17 8 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H8C7.44772 19 7 18.5523 7 18Z" clip-rule="evenodd"></path>
                    </svg>

                </button>
            )}



            <div className={`flex-1 flex items-center ${isMobile && !isSearchActive ? '' : 'justify-start'} md:justify-start`}>

                {/* Logo: show only when search is not active in mobile */}
                {(!isMobile || !isSearchActive) && (
                    <div className="flex  px-6 py-4">
                        <Link to="/" className="flex items-center" onClick={closeSidebar}>
                            <div className="mr-1 h-8 w-auto p-2 rounded-md bg-red-600 flex items-center justify-center">
                                <span className="text-xl text-white font-bold">VOOP</span>
                            </div>
                            <span className="text-xl font-bold">
                                <span className="text-red-600">GAMES</span>
                            </span>
                        </Link>
                    </div>
                )}

                {/* Mobile View */}
                {isMobile ? (
                    isSearchActive ? (
                        <>
                            <form
                                onSubmit={handleSubmit}
                                className="flex-1 flex items-center focus:outline-none  justify-center relative max-w-full px-4"
                                style={{ maxWidth: '100%' }}
                            >
                                <input
                                    type="search"
                                    value={searchText}
                                    onChange={handleInputChange}
                                    className="w-full border-none focus:border-none focus:outline-none focus:ring-0 bg-gray-800 text-white placeholder-gray-400 s h-10 px-3 py-2 text-base rounded-full"

                                    placeholder="Search"
                                    autoFocus
                                    style={{ maxWidth: '100%' }}
                                />
                                {searchText && (
                                    <button
                                        type="submit"
                                        className="ml-2 flext-end p-2 text-gray-400 hover:text-white"
                                        aria-label="Submit search"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                        </svg>
                                    </button>


                                )}
                            </form>
                            <button onClick={toggleSearch} className="p-2 text-gray-400 hover:text-white">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            {showSearch && (
                                <button onClick={toggleSearch} className="ml-auto p-2 text-gray-400 hover:text-white">
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </button>
                            )}
                        </>
                    )
                ) : (
                    <>
                        {showSearch && (
                            <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-md rounded-full bg-gray-800 overflow-hidden flex items-center">
                                <input
                                    type="search"
                                    value={searchText}
                                    onChange={handleInputChange}
                                    className="w-full border-none focus:outline-none bg-transparent text-white placeholder-gray-400 focus:ring-0 h-10 px-3 py-2 text-base rounded-full"
                                    placeholder="Search"
                                />
                                {searchText && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                        aria-label="Clear search"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                {/* Search Button at the right end */}
                                {/* <button
                                    type="submit"
                                    className="ml-2 p-2 text-gray-400 hover:text-white"
                                    aria-label="Submit search"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </button> */}
                            </form>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
