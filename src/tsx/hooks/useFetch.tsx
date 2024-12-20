type CategoryPath = '/category' | `/category?type=${string}`;
type ApiUrl = `${typeof baseUrl}${CategoryPath}`;
type ProductCategories = string[];

interface ProductData {
    id: number;
    title: string;
    model: string;
    image: string;
    price: number;
    brand: string;
    onSale: boolean;
    description: string;
}

type ErrorState = [boolean, string] | null;

// interface FetchError {
//     code: number | 'unknown';
//     description: string[];
// }

type FetchReturn = {
    onLoad: boolean;
    data: DataFetched | null;
    onError: ErrorState | null;
};

type DataFetched = ProductData[] | ProductCategories;

const baseUrl = 'https://fakestoreapi.in/api/products' as const;
const makeFetchUrl = (category: string = ''): ApiUrl => {
    const categoryName = category ? `/category?type=${category}` : '/category';
    return `${baseUrl}${categoryName as CategoryPath}`;
};

const useFetch = (url: ApiUrl): FetchReturn => {
    return { data: null, onError: null, onLoad: false };
};

export { makeFetchUrl, useFetch };
