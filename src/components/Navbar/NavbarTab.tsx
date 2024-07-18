import { signOut } from "next-auth/react";
import React, { useState } from 'react';
import Image from 'next/image';
import { TabProps } from '@/src/components/Navbar/Navbar.interfaces';
import ChevronUp from "@/public/assets/icon-chevron-up.svg";
import ChevronDown from "@/public/assets/icon-chevron-down.svg";
import { getListUrlFor } from "@/src/utils";
import { getModelFromUrl } from "@/src/utils";
import {getModelFromUrlWithIteration} from "@/src/utils/routesHelpers";
import Link from "next/link"; // Import the new utility function

const NavbarTab = ({ title, imageSrc, listItems, lastItemColor }: TabProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleList} className="flex items-center h-8 px-2 py-1 mt-1 mb-1 rounded text-sm duration-300 cursor-pointer bg-gray-700 hover:bg-gray-600">
                <Image src={imageSrc} width={20} height={20} alt="" className="object-contain h-full w-fit p-0.5"/>
                <p className="ml-2 grow">{title}</p>
                <Image src={isOpen ? ChevronUp : ChevronDown} width={20} height={20} alt="" className="object-contain h-full w-fit p-1.5"/>
            </div>
            {isOpen && (
                <ul className="pl-4 mb-2 text-sm">
                    {listItems.map((item, index) => {
                        const url = getListUrlFor(item);


                        const model = getModelFromUrlWithIteration(url.toLowerCase(), 0);

                        return (
                            <>  
                            <li key={index} className={`h-7 cursor-pointer duration-300
                                ${lastItemColor !== null && lastItemColor !== undefined && index === listItems.length - 1 ? 'hover:text-red-700' : 'hover:text-blue-500'}
                                ${index === listItems.length - 1 ? lastItemColor : ''}
                            `} onClick={item === "Logout" ? () => signOut({ callbackUrl: 'http://localhost:3000/admin' }) : undefined} >
                                <Link href={model}>{item}</Link>
                            </li>
                            </>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default NavbarTab;
