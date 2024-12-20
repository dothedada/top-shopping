import { useEffect, useState } from 'react';

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
    const [onLoad, setOnLoad] = useState(false);

    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Cannot fetch the data');
                }
            } catch (err) {
                // console.log(err);
            } finally {
                setOnLoad(true);
            }
        };
        fetcher();
    }, [url]);
    return { data: null, onError: null, onLoad };
};

export { makeFetchUrl, useFetch };
