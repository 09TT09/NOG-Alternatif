import React from "react";
import Head from "next/head";
import Link from "next/link";
import fs from 'fs';
import prisma from "@/prisma/prisma";
import { TableContainer } from "../../../components/Table/TableContainer";
import { GenericPageProps } from "../../../types/GenericProp";
import { getModelDefinition, capitalizeAndRemoveLast, getCreateURLFor } from "../../../utils";
import {EntityLayout} from "@/src/pages/admin/[entity]/_layout";

type IndexOptions = {};

const GenericPage: React.FC<GenericPageProps> = ({
  data,
  entityConfig,
  modelEntity,
  tableName
// }: IndexOptions) => {
}) => {
  const pageTitle = `${entityConfig.entityName}'s Dashboard`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <EntityLayout>

      <div className="container mx-auto flex flex-col">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <TableContainer
              data={data}
              tableName={tableName}
              entityPath={entityConfig.entityName}
              modelEntity={modelEntity}/>
          <div className={'pb-8 flex justify-end mr-8'}>
            <Link
                className="px-6 py-2 rounded-md text-white transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-700"
                href={getCreateURLFor(entityConfig.entityName)}
            >
              Create a {entityConfig.displayNameProperty}
            </Link>
          </div>
        </div>


      </div>

      </EntityLayout>
    </>
  );
};

type ServerSideProps = {
  params: {
    entity: string;
  }
}

export async function getServerSideProps(params: ServerSideProps) {
  // TODO: Stop using users, clients (model name with a s at the end), it simplier to just use user, client (for APIs etc)
  const { entity } = params.params;
  const modelName = capitalizeAndRemoveLast(entity);
  // @ts-ignore
  const arrEntity = [...entity];
  arrEntity.pop();
  const tableName = arrEntity.join('');

  // Schema
  //console.log({fs, modelName})
  const modelEntity = await getModelDefinition(fs, modelName);
  

  // TODO: Add this into the API as [entity] GET query all
  // @ts-ignore
  const data = await (prisma[tableName] as unknown).findMany();

  return  {
    props: {
      data,
      modelEntity,
      tableName,
      entityConfig: {
        entityName: entity,
        displayNameProperty: modelName,
      }
    }
  };
}

export default GenericPage;
