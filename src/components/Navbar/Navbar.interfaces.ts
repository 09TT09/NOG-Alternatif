export interface TabProps {
    title: string;
    imageSrc: string;
    listItems: string[];
    lastItemColor?: string;
}

export interface ButtonProps {
    icon: string;
    borderColor: string;
    borderHoverColor: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
