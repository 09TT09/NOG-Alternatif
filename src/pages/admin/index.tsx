import React, { useState } from 'react';
import ChevronRight from "@/public/assets/icon-chevron-right.svg";
import Navbar from "@/src/components/Navbar/Navbar";
import NavbarButton from "@/src/components/Navbar/NavbarButton";

const AdminDashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex w-full h-screen max-h-screen bg-white">
            {isOpen && <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />}
            {!isOpen && (
                <div className="fixed top-2 left-2">
                    <NavbarButton
                        onClick={toggleSidebar}
                        icon={ChevronRight}
                        borderColor="border-gray-500"
                        borderHoverColor="border-gray-400"
                    />
                </div>
            )}
            <div className={`bg-white grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}></div>
        </div>
    );
};

export default AdminDashboard;
