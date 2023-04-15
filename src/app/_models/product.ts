export interface Product {
  id: number,
  productname : string,
  description : string,
  price: string,
  quantity: number,
  rate: number,
  inventoryStatus: string,
  categoryId: number,
  imageIds: Array<string>
}
export interface ProductDetails {
  id: number,
  productname : string,
  description : string,
  origin: string,
  unit: string,
  expiry: Date,
  price: number,
  rate: number,
  inventoryStatus: string,
  quantity: number,
  categoryId: number,
  imageIds: Array<string>,
  commentIds: Array<string>
}
