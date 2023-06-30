import { IProducts } from "./IProducts";

export interface CartItems {
  product: IProducts | null;
  quantity: number;
}
