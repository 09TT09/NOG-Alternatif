import React from 'react';
import Image from 'next/image';
import { ButtonProps } from './Navbar.interfaces';

const NavbarButton: React.FC<ButtonProps> = ({ icon, borderColor, borderHoverColor, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex justify-center items-center w-6 h-6 duration-300 cursor-pointer rounded border border-solid ${borderColor} bg-gray-700 hover:bg-gray-600 ${borderHoverColor}`}
            aria-label="Toggle Sidebar"
        >
            <Image src={icon} alt="Toggle Icon" height={10} width={10} />
        </button>
    );
};

export default NavbarButton;
