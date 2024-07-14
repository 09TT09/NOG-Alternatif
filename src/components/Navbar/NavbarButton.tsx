import React from 'react';
import { ButtonProps } from './Navbar.interfaces';
import Image from 'next/image';

const NavbarButton = ({icon, borderColor, borderHoverColor, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`flex justify-center items-center w-6 h-6 duration-300 cursor-pointer rounded border border-solid ${borderColor} bg-gray-700 hover:bg-gray-600 hover:${borderHoverColor}`}>
      <Image src={icon} alt="" height={10} width={10} />
    </button>
  );
};

export default NavbarButton;