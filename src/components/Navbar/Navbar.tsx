import { useSession } from "next-auth/react";
import React, { useState } from 'react';
import DashboardIcon from '@/public/assets/icon-dashboard.svg';
import EntityIcon from '@/public/assets/icon-entity.svg';
import RolesIcon from '@/public/assets/icon-roles.svg';
import SettingsIcon from '@/public/assets/icon-settings.svg';
import NavbarTab from '@/src/components/Navbar/NavbarTab';
import { truncateEmail } from "@/src/utils/truncateEmail";
import { Prisma } from "@/prisma/generated/client";
import NavbarButton from "./NavbarButton";
import ChevronUp from "@/public/assets/icon-chevron-up.svg";
import ChevronDown from "@/public/assets/icon-chevron-down.svg";
import ChevronLeft from "@/public/assets/icon-chevron-left.svg";
import { modelExclusionArray } from "@/src/utils/modelsExclusion";

const Navbar = () => {
  const { data: session } = useSession();
  const modelsNames = Object.values(Prisma.ModelName);
  let updatedModelsNames: string[] = modelsNames.filter(
    (modelName) => !modelExclusionArray.some((exclusion) => exclusion.excludedModelName === modelName)
  );
    
  return (
    <div className="flex flex-col w-64 p-2 bg-gray-800">
      <div className="flex items-center px-1 w-full h-8 gap-x-1 mb-1 rounded border border-solid border-gray-500">
        <NavbarButton borderColor="border-blue-500" borderHoverColor="border-blue-600" icon={ChevronUp} />
        <NavbarButton borderColor="border-red-500" borderHoverColor="border-blue-600" icon={ChevronDown} />
      </div>
      <NavbarTab title="Dashboard" imageSrc={DashboardIcon} listItems={['Global', 'Statistics']}/>
      <NavbarTab title="Entities" imageSrc={EntityIcon} listItems={updatedModelsNames}/>
      <NavbarTab title="Roles" imageSrc={RolesIcon} listItems={['Users', 'Role management']}/>
      <NavbarTab title="Settings" imageSrc={SettingsIcon} listItems={['Global settings', 'Edit slugs', 'Edit layout', 'Logout']} lastItemColor="text-red-600"/>
      <div className="flex flex-col grow w-full justify-end">
        {(session && session.user && session.user.email) ? (
            <>
                <p className="text-sm">Connected as :</p>
                <p className="text-orange-500 text-sm">{truncateEmail(session.user.email, 30)}</p> 
            </>
        ) : (
            <p className="text-sm">Not logged</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;