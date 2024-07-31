import { ColumnsValues, GraphBox, Indicator } from "./generic.interface";

export interface Card extends Partial<GraphBox> {
    amount: number,
    indicators: Indicator[]
}