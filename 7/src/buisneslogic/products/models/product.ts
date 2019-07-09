export class Product {
  id: string;
  categoryId: string;
  name: string;
  itemsInStock: number;

  constructor(
    id: string,
    categoryId: string,
    name: string,
    itemsInStock: number
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.itemsInStock = itemsInStock;
  }
}
