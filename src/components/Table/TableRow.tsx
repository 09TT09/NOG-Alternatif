import React from 'react';
import Link from "next/link";
import { getEditURLFor, getReadURLFor, } from "../../utils";
import { TableRowProps } from './Table.interfaces';

export const TableRow: React.FC<TableRowProps> = ({ item, modelProperties, tableName, headers }) => {
    const handleDelete = (id: string) => async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${tableName}`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id
                    })
                });

                if (res.status === 200) {
                    console.log('Item deleted successfully');
                    window.location.reload();
                } else {
                    console.error('Failed to delete the item:', res.statusText);
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    }
    const columnWidth = `calc(100% / ${modelProperties.length + 1})`;

    return (
        <tr>
            {modelProperties.map((key, index) => (
                    <td
                        key={`${item.id}-${key}`}
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                        style={{ width: columnWidth }}

                    >
                        {/* si la string "image" ou "img" est dans un header, on affiche l'image*/}
                        {headers[index].toLowerCase().includes('image') || headers[index].toLowerCase().includes('img') ? (
                            <img
                                src={item[key]}
                                alt={headers[index]}
                                className="h-10 w-10 rounded-full"
                            />
                        ) : (
                            item[key]
                        )}

                  
                    </td>
                ))}
            <td
                className="px-6 py-4 whitespace-nowrap"
            >
                <div className={`text-center`}>

                <Link href={getReadURLFor(tableName + 's', item.id)}>View</Link>
                {' | '}
                <Link href={getEditURLFor(tableName + 's', item.id)}>Modify</Link>
                {' | '}
                {/*use handler to delete on button*/}
                <button onClick={handleDelete(item.id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
};
