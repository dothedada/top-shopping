export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  brand: string;
  image: string;
  category: string;
  discount: number;
}

export type FetchCategories = string[];

export type Categories = Set<string>;

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

export type DataFetched = ProductData | ProductData[] | FetchCategories | null;

export type CategoryPath =
  | '/category'
  | `/category?type=${string}`
  | `/category?type=${string}?limit=${number}`
  | `?limit=${number}`
  | `/products/${number}`;

export type ApiUrl = `${typeof baseUrl}${CategoryPath}`;

type ErrorReactRouter = {
  statusText: string;
  message: string;
};
