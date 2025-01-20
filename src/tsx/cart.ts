import { Store } from './store';

export class Cart {
  private quantities: Record<string, number> = {};
  private static instance: Cart | null = null;
  private currentInventory: Store = null!;

  constructor(inventory: Store) {
    if (Cart.instance) {
      return Cart.instance;
    }
    this.currentInventory = inventory;
  }

  addItem(id: number): void {
    if (!this.currentInventory.hasItem(id)) {
      throw new Error(`Item with id: ${id} does not exist in inventory`);
    }
    this.quantities[id] = (this.quantities[id] || 0) + 1;
  }

  setAmount(id: number, quantity: number): void {
    if (!this.currentInventory.hasItem(id)) {
      throw new Error(`Item with id: ${id} does not exist in inventory`);
    }
    this.quantities[id] = quantity;
  }

  getAmount(id: number): number | null {
    return this.quantities[id] ?? null;
  }

  subItem(id: number): void {
    if (!this.quantities[id]) {
      return;
    }
    this.quantities[id] -= 1;

    if (this.quantities[id] === 0) {
      console.log(this.quantities[id]);
      this.deleteItem(id);
    }
  }

  deleteItem(id: number): void {
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
      (sum: number, curr: string) => sum + this.quantities[+curr],
      0,
    );
  }

  resetCart() {
    this.quantities = {};
  }

  itemSubTotal(id: number): number {
    const itemPrice = this.currentInventory.getItem(id)?.price ?? 0;
    const itemAmount = this.quantities[id] ?? 0;
    return itemAmount * itemPrice;
  }

  totalCost(): number {
    return Object.keys(this.quantities).reduce((sum: number, curr: string) => {
      const itemSubTotal = this.itemSubTotal(+curr);
      return sum + itemSubTotal;
    }, 0);
  }
}
