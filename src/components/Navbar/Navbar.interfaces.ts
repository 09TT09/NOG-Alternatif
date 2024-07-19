export interface TabItem {
    name: string;
    url: string;
    isDisabled?: boolean;
    isVisible?: boolean; // Correcting the typo to `isVisible`
}

export interface TabProps {
    title: string;
    imageSrc: string;
    listItems: TabItem[];
    lastItemColor?: string;
    isDisabled?: boolean;
    isOpen?: boolean;
}








export interface ButtonProps {
    icon: string; // Assuming icon is the path to the image
    borderColor: string;
    borderHoverColor: string;
    onClick: () => void;
}

