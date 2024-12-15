// src/Header.js
import React from 'react';
import { FaProjectDiagram, FaTasks } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <FaProjectDiagram className="text-3xl mr-2" />
                    <h1 className="text-3xl font-bold">Project Assignment Module</h1>
                </div>
                <nav className="flex space-x-4">
                    <a href="/" className="flex items-center hover:text-gray-300">
                        <FaTasks className="mr-1" />
                        Projects
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
