import { GraphBox, Indicator } from "./generic.interface";

export interface CategoryParticipation extends Partial<GraphBox> {
    amount: number,
    categories: Partial<Indicator>[]
}

export interface BdfParticipation extends Partial<GraphBox> {
    category: string,
    total: Indicator,
    bdf: Indicator
}