import { ProductData } from './types/global';

export class Cart {
    private quantities: Record<string, number> = {};
    private static instance: Cart | null = null;

    constructor() {
        if (Cart.instance) {
            return Cart.instance;
        }
    }

    addItem(id: string): void {
        this.quantities[id] = (this.quantities[id] || 0) + 1;
    }

    setAmount(id: string, quantity: number): void {
        this.quantities[id] = quantity;
    }

    subItem(id: string): void {
        if (!this.quantities[id]) {
            return;
        }
        this.quantities[id] -= 1;
    }

    deleteItem(id: string): void {
        if (!this.quantities[id]) {
            return;
        }
        delete this.quantities[id];
    }

    itemsInCart() {
        return Object.keys(this.quantities);
    }

    resetCart() {
        this.quantities = {};
    }

    itemTotalCost(id: string, inventory: ProductData[]): number {
        const itemPrice = inventory.find((item) => item.id === id)?.price ?? 0;
        return this.quantities[id] * itemPrice;
    }

    totalCost(inventory: ProductData[]): number {
        let cost = 0;
        for (const itemId of Object.keys(this.quantities)) {
            cost += this.itemTotalCost(itemId, inventory);
        }
        return cost;
    }
}
