import React from 'react';
import { GenericInputProps } from './GenericInput.interfaces';

export const GenericInputText = (props: GenericInputProps) => (
    <input
        type="text"
        name={props.field}
        id={props.id}
        value={props.value as string || ''}
        onChange={props.handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
);
