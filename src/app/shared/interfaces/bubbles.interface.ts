import { GraphBox, Indicator } from "./generic.interface";

export interface BubblesInterface extends Partial<GraphBox> {
    bubbles: number[],
    categories: Indicator[]
}