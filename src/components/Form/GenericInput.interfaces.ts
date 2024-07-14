export interface GenericInputProps {
    field: string;
    value: string; // Accept both string and number
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
}