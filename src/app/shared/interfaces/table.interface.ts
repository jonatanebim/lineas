import { ColumnsValues, GraphBox, Indicator } from "./generic.interface";

export interface TableColumn {
    column: string,
    label: string
}

export interface TableValues {
    product: string,
    mq: number,
    cobmq: string,
    vsma: number,
    vs3um: number,
    vs6um: number,
    vsmaa: number
}

export interface Table extends Partial<GraphBox> {
    columns: TableColumn[],
    values: TableValues
}