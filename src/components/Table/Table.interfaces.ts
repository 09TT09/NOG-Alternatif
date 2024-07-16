export interface TableContainerProps {
    data: Record<string, any>[];
    entityPath: string;
    tableName: string;
    modelEntity: any;
}

export interface TableHeaderProps {
    modelProperties: string[];
}

export interface TableRowProps {
    item: Record<string, any>;
    modelProperties: string[];
    tableName: string;
    headers: string[]
}