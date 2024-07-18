import React, { ReactNode } from 'react';
import Navbar from "@/src/components/Navbar/Navbar";

interface EntityLayoutProps {
    children: ReactNode;
}

export const EntityLayout: React.FC<EntityLayoutProps> = ({ children }) => {
    return (
        <div className={'flex'}>
            <Navbar />
            <main className={'w-full'}>
                {children}
            </main>

        </div>
    );
};
