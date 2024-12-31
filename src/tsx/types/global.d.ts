export interface ProductData {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export type ProductCategories = string[];

export type ErrorState = [true, string] | null;

export interface FetchError {
    code: number | 'unknown';
    description: string[];
}

export type FetchReturn = {
    loaded: boolean;
    data: DataFetched;
    onError: ErrorState;
};

export type DataFetched = ProductData[] | ProductCategories | null;

export type CategoryPath =
    | '/category'
    | `/category?type=${string}`
    | `/category?type=${string}?limit=${number}`
    | `?limit=${number}`;

export type ApiUrl = `${typeof baseUrl}${CategoryPath}`;
