import { ColumnsValues, GraphBox } from "./generic.interface";

export interface Evolutive extends Partial<GraphBox> {
    columns: string[],
    values: ColumnsValues
}