import React from 'react';
import { GenericInputProps } from './GenericInput.interfaces';

export const GenericInputNumber = (props: GenericInputProps) => (
    <input
        type="number"
        name={props.field}
        id={props.id}
        value={props.value || ''}
        onChange={props.handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
);