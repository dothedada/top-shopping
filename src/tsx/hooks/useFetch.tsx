import { useEffect, useState } from 'react';

type ErrorState = [boolean, string] | null;
interface FetchError {
    code: number | 'unknown';
    description: string[];
}

type Categories = string[];
interface Product {
    id: number;
    title: string;
    model: string;
    image: string;
    price: number;
    brand: string;
    onSale: boolean;
    description: string;
}
type DataFetched = Product[] | Categories;

const makeRequestUrl = (category: string | undefined = undefined): string => {
    const providerUrl = 'https://fakestoreapi.in/api/products';
    // const providerUrl = 'https://fakestoreapi.com/products';
    const categoryName = category ? `/category?type=${category}` : '/category';
    // const categoryName = category ? `/category/${category}` : '';
    return `${providerUrl}${categoryName}`;
};

export const useFetch = (category: string | undefined = undefined) => {
    const [data, setData] = useState<DataFetched | null>(null);
    const [onError, setOnError] = useState<ErrorState>(null);
    const [onLoad, setOnLoad] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetcher = async () => {
            try {
                const request = await fetch(makeRequestUrl(category), {
                    mode: 'cors',
                    signal: controller.signal,
                });

                if (!request.ok) {
                    const { errors } = await request.json();
                    throw {
                        code: request.status,
                        description: errors,
                    } as FetchError;
                }

                const jsonFetched = await request.json();
                let dataFetched;
                if (jsonFetched['products']) {
                    const { products }: { products: Product[] } = jsonFetched;
                    dataFetched = products;
                } else {
                    const { categories }: { categories: Categories } =
                        jsonFetched;
                    dataFetched = categories;
                }

                setData(dataFetched ?? null);
            } catch (err) {
                const { code = 'unknown', description = ['Unexpected error'] } =
                    err as FetchError;

                const errPrompt = `Error ${code}: ${description.join('')}`;

                console.log('asd');
                setOnError([true, errPrompt]);
            } finally {
                setOnLoad(false);
            }
        };
        fetcher();
        return () => controller.abort();
    }, [category]);

    return { data, onError, onLoad };
};
