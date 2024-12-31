export type ProductCategories = string[];

export interface ProductData {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
