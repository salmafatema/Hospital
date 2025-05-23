import React, { useState } from 'react';
import { FaHome, FaUser, FaCalendar, FaUserMd, FaFileInvoiceDollar, FaPills, FaMicroscope, FaHospital, FaFileAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>

            <nav className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 w-64 z-40`}>
                <div className="flex h-full flex-col">
                    <div className="p-4">
                        <Link to="/" >
                            <h1>HMS</h1>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ul className="space-y-4 p-3">
                            <li>
                                <Link 
                                    to="/" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaHome /></span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            {/* <li className="py-4">
                                <span className="px-3 text-xs font-semibold uppercase text-gray-500">Authentication</span>
                            </li> */}
                            {/* <li>
                                <Link 
                                    to="/login" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/login') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaSignInAlt /></span>
                                    <span>Login</span>
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link 
                                    to="/signup" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/signup') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaUserPlus /></span>
                                    <span>Sign Up</span>
                                </Link>
                            </li> */}

                            <li className="py-4">
                                <span className="px-3 text-xs font-semibold uppercase text-gray-500">Pages</span>
                            </li>
                            <li>
                                <Link 
                                    to="/patients" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/patients') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaUser /></span>
                                    <span>Patients</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/appointments" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/appointments') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaCalendar /></span>
                                    <span>Appointments</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/doctors" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/doctors') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaUserMd /></span>
                                    <span>Doctors</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/invoice" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/invoice') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaFileInvoiceDollar /></span>
                                    <span>Invoice</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/medications" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/medications') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaPills /></span>
                                    <span>Medications</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/laboratory" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/laboratory') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaMicroscope /></span>
                                    <span>Laboratory</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/emergency" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/emergency') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaHospital /></span>
                                    <span>Emergency & ICU</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/reports" 
                                    className={`flex items-center rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/reports') 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3"><FaFileAlt /></span>
                                    <span>Reports</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Sidebar;

