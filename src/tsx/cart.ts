import { ProductData } from './types/global';

export class Cart {
  private quantities: Record<string, number> = {};
  private static instance: Cart | null = null;
  private inventory: ProductData[] = [];

  constructor(inventory: ProductData[] = []) {
    if (Cart.instance) {
      return Cart.instance;
    }
    this.inventory = inventory;
  }

  addItem(id: string): void {
    if (!this.inventory.some((item) => item.id === id)) {
      throw new Error(`Item with id: ${id} does not exist in inventory`);
    }
    this.quantities[id] = (this.quantities[id] || 0) + 1;
  }

  setAmount(id: string, quantity: number): void {
    if (!this.inventory.some((item) => item.id === id)) {
      throw new Error(`Item with id: ${id} does not exist in inventory`);
    }
    this.quantities[id] = quantity;
  }

  getAmount(id: string): number | null {
    return this.quantities[id] ?? null;
  }

  subItem(id: string): void {
    if (!this.quantities[id]) {
      return;
    }
    this.quantities[id] -= 1;

    if (this.quantities[id] === 0) {
      console.log(this.quantities[id]);
      this.deleteItem(id);
    }
  }

  deleteItem(id: string): void {
    if (this.quantities[id] === undefined) {
      return;
    }
    delete this.quantities[id];
  }

  itemsInCart() {
    return Object.keys(this.quantities);
  }

  get totalItems() {
    return Object.keys(this.quantities).reduce(
      (sum, curr) => sum + this.quantities[curr],
      0,
    );
  }

  resetCart() {
    this.quantities = {};
  }

  itemTotalCost(id: string): number {
    const itemPrice = this.inventory.find((item) => item.id === id)?.price ?? 0;
    const itemAmount = this.quantities[id] ?? 0;
    return itemAmount * itemPrice;
  }

  totalCost(): number {
    let cost = 0;
    for (const itemId of Object.keys(this.quantities)) {
      cost += this.itemTotalCost(itemId);
    }
    return cost;
  }
}
