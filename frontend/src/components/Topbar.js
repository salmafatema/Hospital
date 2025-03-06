import React, { useState } from 'react';
import {    FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div>
            
            <div className="fixed top-0 right-0 w-[calc(100%-16rem)] bg-white p-4 flex items-center justify-between">
                <h1 className='text-2xl font-bold'>
                    Hospital Management System
                </h1>
                <div className="relative">
                    <div 
                        className="flex items-center gap-2 profile cursor-pointer mr-4"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <FaUser />
                    </div>
                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                My Profile
                            </a>
                            <button 
                                onClick={() => {/* Add logout logic here */}}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
