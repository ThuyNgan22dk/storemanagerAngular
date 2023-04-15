import { ImportDetail } from "./import-detail";

export interface ImportGood {
  id: number;
  nameShipper: string;
  phoneShipper: string;
  note: string;
  totalPrice: number;
  importDetails: ImportDetail[],
}
