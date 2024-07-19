import React, { useState, ReactNode } from 'react';
import Navbar from "@/src/components/Navbar/Navbar";
import ChevronRight from "@/public/assets/icon-chevron-right.svg";
import NavbarButton from "@/src/components/Navbar/NavbarButton";

interface EntityLayoutProps {
    children: ReactNode;
}

export const EntityLayout: React.FC<EntityLayoutProps> = ({ children }) => {
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
            <main className={`bg-white grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                {children}
            </main>
        </div>
    );
};

export default EntityLayout;
