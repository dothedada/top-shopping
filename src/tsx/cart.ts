import { Store } from './store';
import { ProductData } from './types/global';

export class Cart {
  private quantities: Record<string, number> = {};
  private static instance: Cart | null = null;
  private currentInventory: Store = null!;

  constructor(inventory: Store) {
    if (Cart.instance) {
      return Cart.instance;
    }
    Cart.instance = this;
    this.currentInventory = inventory;
  }

  addItem(id: number): void {
    if (!this.currentInventory?.hasItem(id)) {
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
      this.deleteItem(id);
    }
  }

  deleteItem(id: number): void {
    if (this.quantities[id] === undefined) {
      return;
    }
    delete this.quantities[id];
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

  itemSubTotal(id: number): { fullPrice: number; discount: number } {
    const item = this.currentInventory.getItem(id);

    if (!item) {
      throw new Error(`This item is not in the inventory ${id}`);
    }
    const discountPrice = Math.floor(item.price * (100 - item.discount) * 0.01);
    const itemAmount = this.quantities[id] ?? 0;
    const fullPrice = itemAmount * item.price;
    const discount = itemAmount * discountPrice;
    return { fullPrice, discount };
  }

  get totalCost(): { pay: number; savings: number } {
    return Object.keys(this.quantities).reduce(
      (sum: { pay: number; savings: number }, curr: string) => {
        const { fullPrice, discount } = this.itemSubTotal(+curr);
        sum.pay = (sum.pay || 0) + discount;
        sum.savings = (sum.savings || 0) + fullPrice - discount;
        return sum;
      },
      { pay: 0, savings: 0 },
    );
  }

  get getItemsInCart(): ProductData[] | [] {
    const items = Object.keys(this.quantities)
      .map((id) => this.currentInventory.getItem(+id))
      .filter((e) => e);
    return items as ProductData[];
  }

  get hasItems(): boolean {
    return Object.keys(this.quantities).length > 0;
  }
}
