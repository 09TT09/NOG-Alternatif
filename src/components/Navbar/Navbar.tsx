import { useSession } from "next-auth/react";
import React from 'react';
import DashboardIcon from '@/public/assets/icon-dashboard.svg';
import EntityIcon from '@/public/assets/icon-entity.svg';
import RolesIcon from '@/public/assets/icon-roles.svg';
import SettingsIcon from '@/public/assets/icon-settings.svg';
import NavbarTab from '@/src/components/Navbar/NavbarTab';
import { Prisma } from "@/prisma/generated/client";
import NavbarButton from "./NavbarButton";
import ChevronRight from "@/public/assets/icon-chevron-right.svg";
import ChevronLeft from '@/public/assets/icon-chevron-left.svg';
import { modelExclusionArray } from "@/src/utils/modelsExclusion";
import {truncateEmail} from "@/src/utils/truncateEmail";

interface NavbarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleSidebar }) => {
    const { data: session } = useSession();
    const modelsNames = Object.values(Prisma.ModelName);

    const updatedModelsNames = modelsNames.filter(
        (modelName) => !modelExclusionArray.some((exclusion) => exclusion.excludedModelName === modelName)
    ).map(modelName => modelName + 's');

    const dashboardItems = [
        { name: 'Global', url: '/dashboard/global', isDisabled: true, isVisible: true },
        { name: 'Statistics', url: '/dashboard/statistics', isDisabled: true, isVisible: true },
    ];

    const entityItems = updatedModelsNames.map(modelName => ({ name: modelName, url: `/admin/${modelName.toLowerCase()}`, isVisible: true }));

    const rolesItems = [
        { name: 'Users', url: '/admin/users', isDisabled: false, isVisible: true },
        { name: 'Role management', url: '/roles/management', isDisabled: true, isVisible: false },
    ];

    const settingsItems = [
        { name: 'Global settings', url: '/settings/global', isDisabled: true, isVisible: true },
        { name: 'Edit slugs', url: '/settings/slugs', isDisabled: true, isVisible: true },
        { name: 'Edit layout', url: '/settings/layout', isDisabled: true, isVisible: true },
        { name: 'Logout', url: '', isDisabled: false, isVisible: true },
    ];

    return (
        <div className={`h-screen flex flex-col ${isOpen ? 'w-64' : 'w-20'} p-2 bg-gray-800 transition-width duration-300`}>
            <div className="flex items-center justify-between px-1 w-full h-8 gap-x-1 mb-1 rounded border border-solid border-gray-500">
                <NavbarButton
                    onClick={toggleSidebar}
                    icon={isOpen ? ChevronLeft : ChevronRight}
                    borderColor="border-gray-500"
                    borderHoverColor="border-gray-400"
                />
            </div>
            <NavbarTab title="Dashboard" imageSrc={DashboardIcon} listItems={dashboardItems} isOpen={isOpen} />
            <NavbarTab title="Entities" imageSrc={EntityIcon} listItems={entityItems} isOpen={isOpen} />
            <NavbarTab title="Roles" imageSrc={RolesIcon} listItems={rolesItems} isOpen={isOpen} />
            <NavbarTab title="Settings" imageSrc={SettingsIcon} listItems={settingsItems} lastItemColor="text-red-600" isOpen={isOpen} />
            <div className="flex flex-col grow w-full justify-end">
                {(session && session.user && session.user.email) ? (
                    <>
                        <p className={`text-sm ${isOpen ? '' : 'hidden'}`}>Connected as :</p>
                        <p className={`text-orange-500 text-sm ${isOpen ? '' : 'hidden'}`}>{truncateEmail(session.user.email, 30)}</p>
                    </>
                ) : (
                    <p className="text-sm">Not logged</p>
                )}
            </div>
        </div>
    );
};

export default Navbar;
