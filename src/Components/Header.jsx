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
        <header className="sticky -top-0 z-40 flex items-center justify-between bg-gray-900 pt-0 px-2 md:px-2 h-16 border-b-0 shadow-none">
            {isMobile && (
                <button onClick={toggleSidebar} className="text-white lg:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            )}

            <div className={`flex-1 flex items-center ${isMobile && !isSearchActive ? 'justify-center' : 'justify-start'} md:justify-start`}>

                {/* Logo: show only when search is not active in mobile */}
                {(!isMobile || !isSearchActive) && (
                    <div className="flex items-center px-6 py-4">
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
                                className="flex-1 flex items-center justify-center relative max-w-full px-4"
                                style={{ maxWidth: '100%' }}
                            >
                                <input
                                    type="search"
                                    value={searchText}
                                    onChange={handleInputChange}
                                    className="w-full border-none bg-gray-800 text-white placeholder-gray-400 focus:ring-0 h-10 px-3 py-2 text-base rounded-full"
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
                                    className="w-full border-none bg-transparent text-white placeholder-gray-400 focus:ring-0 h-10 px-3 py-2 text-base rounded-full"
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
                                <button
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
                                </button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
