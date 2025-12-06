// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import DetailsPage from './Components/DetailsPage';
import Category from './Components/Category';
import GameCard from './Components/GameCard';

import './App.css';
import './index.css';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import DetailsPageWrapper from './Components/DetailsPageWrapper';

const App = () => {
  // console.log("this is url ",process.env.REACT_APP_API_URL);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <Router>
            <ScrollToTop /> 
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        {/* Header with menu icon and search */}
        <Header
        searchText={searchText}
        setSearchText={setSearchText}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        toggleSearch={toggleSearch}
        isSearchActive={isSearchActive}
        closeSidebar={closeSidebar}
      />

        {/* Layout: Sidebar + Main */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

          {/* Overlay visible only when sidebar open on tablet/mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Main content */}
          <main
            className={`flex-1 p-2 relative z-30 transition-all duration-300 ${
              isSidebarOpen ? 'blur-sm' : ''
            }`}
            onClick={() => isSidebarOpen && closeSidebar()}
            style={{
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 64px)', // 64px is header height, adjust if different
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <GameCard searchText={searchText} setSearchText={setSearchText} />
                }
              />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/:code" element={<DetailsPageWrapper  />} />
            </Routes>
             <div >
            <hr />
            <Footer />
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
