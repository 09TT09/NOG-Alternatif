import { signOut } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TabProps } from '@/src/components/Navbar/Navbar.interfaces';
import ChevronUp from "@/public/assets/icon-chevron-up.svg";
import ChevronDown from "@/public/assets/icon-chevron-down.svg";
import Link from "next/link";

const NavbarTab: React.FC<TabProps> = ({ title, imageSrc, listItems, lastItemColor, isDisabled, isOpen: isOpenProp }) => {
    const [isOpen, setIsOpen] = useState(isOpenProp);

    useEffect(() => {
        // Check if all items are disabled or not visible
        const allItemsDisabledOrInvisible = listItems.every(item => item.isDisabled || !item.isVisible);
        if (allItemsDisabledOrInvisible) {
            setIsOpen(false);
        }
    }, [listItems]);

    const toggleList = () => {
        if (!isDisabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <div onClick={toggleList} className="flex items-center h-8 px-2 py-1 mt-1 mb-1 rounded text-sm duration-300 cursor-pointer bg-gray-700 hover:bg-gray-600">
                <Image src={imageSrc} width={20} height={20} alt={`${title} icon`} className="object-contain h-full w-fit p-0.5" />
                <p className="ml-2 grow">{title}</p>
                <Image src={isOpen ? ChevronUp : ChevronDown} width={20} height={20} alt="Toggle icon" className="object-contain h-full w-fit p-1.5" />
            </div>
            {isOpen && (
                <ul className="pl-4 mb-2 text-sm">
                    {listItems.every(item => item.isDisabled && !item.isVisible) ? (
                        <li className="h-7 text-gray-500">Unable for the moment, WIP</li>
                    ) : (
                        listItems.filter(item => item.isVisible).map((item, index) => (
                            <li
                                key={index}
                                className={`h-7 duration-300 ${lastItemColor !== null && lastItemColor !== undefined && index === listItems.length - 1 ? 'hover:text-red-700' : 'hover:text-blue-500'} ${index === listItems.length - 1 ? lastItemColor : ''} ${item.isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                onClick={item.name === "Logout" && !item.isDisabled ? () => signOut({ callbackUrl: 'http://localhost:3000/admin' }) : undefined}
                            >
                                <Link href={item.isDisabled ? '#' : item.url}>{item.name}</Link>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default NavbarTab;
