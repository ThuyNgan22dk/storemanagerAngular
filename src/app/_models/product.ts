export interface Product {
  id: number,
  productname : string,
  description : string,
  origin: string,
  unit: string,
  price: number,
  quantity: number,
  rate: number,
  inventoryStatus: string,
  categoryId: number,
  imageIds: Array<string>
  commentIds: Array<string>
}
