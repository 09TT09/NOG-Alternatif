import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Link from "next/link";
import fs from 'fs';
import prisma from "@/prisma/prisma";
import { GenericPageProps } from "../../../../types/GenericProp";
import { capitalizeAndRemoveLast, getModelProperties, } from "../../../../utils";

const GenericDetails: NextPage<GenericPageProps> = ({
  item,
  entityConfig,
  modelProperties,
}) => {
  if (!entityConfig) {
    return <div>Loading or Invalid Configuration...</div>;
  }

  const pageTitle = `${entityConfig.entityName}'s Dashboard`;

  if (!item) {
    return <div>{entityConfig.entityName} introuvable</div>;
  }

  const handleDelete = (id: string) => async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${item.entityName}`, {
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


  return (
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Model: {entityConfig.displayNameProperty.toString()}</h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
            <tr>
              <th className="px-4 py-2 border-b">Property</th>
              <th className="px-4 py-2 border-b">Value</th>
            </tr>
            </thead>
            <tbody>
            {modelProperties.map(key => (
                <tr key={key} className="border-b">
                  <td className="px-4 py-2 font-medium text-gray-700">{key}</td>
                  <td className="px-4 py-2">
                    {key.toLowerCase().includes("img") || key.toLowerCase().includes("image") ? (
                        <img src={item[key]} alt={key} className="w-32 h-32 object-cover rounded" />
                    ) : (
                        <span className="text-gray-900">{item[key]}</span>
                    )}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link href={`/admin/${entityConfig.entityName}s/edit/${item.id}`}>
            <span className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              Edit
            </span>
            </Link>
            {/* Delete */}
            <button onClick={handleDelete(item.id)}
                    className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              Delete
            </button>
            {/* Back */}
            <Link href={`/admin/${entityConfig.entityName}s`}>
            <span className="inline-block px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
              Back
            </span>
            </Link>

          </div>
        </div>
      </>
  );
};

type ServerSideProps = {
  params: {
    id: string;
    entity: string;
  }
}

export async function getServerSideProps(params: ServerSideProps) {
  const { id, entity } = params.params;
  // @ts-ignore
  const arrEntity = [...entity];
  arrEntity.pop()
  const tableName = arrEntity.join('')
  const displayName = capitalizeAndRemoveLast(entity);
  const modelProperties = await getModelProperties(fs, displayName);

  // @ts-ignore
  const item = await prisma[tableName].findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    props: {
      item,
      modelProperties,
      entityConfig: {
        entityName: tableName,
        displayNameProperty: displayName,
        entityPath: entity
      },
    },
  };
}

export default GenericDetails;
