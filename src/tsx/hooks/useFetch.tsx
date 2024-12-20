import { useEffect, useState } from 'react';

type CategoryPath = '/category' | `/category?type=${string}`;
type ApiUrl = `${typeof baseUrl}${CategoryPath}`;
type ProductCategories = string[];

interface ProductData {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

type ErrorState = [true, string] | null;

interface FetchError {
    code: number | 'unknown';
    description: string[];
}

type FetchReturn = {
    loaded: boolean;
    data: DataFetched;
    onError: ErrorState;
};

type DataFetched = ProductData[] | ProductCategories | null;

const baseUrl = 'https://fakestoreapi.in/api/products' as const;
const makeFetchUrl = (category: string = ''): ApiUrl => {
    const categoryName = category ? `/category?type=${category}` : '/category';
    return `${baseUrl}${categoryName as CategoryPath}`;
};

const useFetch = (url: ApiUrl): FetchReturn => {
    const [loaded, setLoaded] = useState(false);
    const [onError, setOnError] = useState<ErrorState>(null);
    const [data, setData] = useState<DataFetched>(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetcher = async () => {
            try {
                const response = await fetch(url, {
                    mode: 'cors',
                    signal: controller.signal,
                });

                if (!response.ok) {
                    const { errors } = await response.json();

                    throw {
                        code: response.status,
                        description: errors,
                    } as FetchError;
                }

                const data = await response.json();

                if (!data[0].id) {
                    setData(data);
                } else {
                    setData(
                        data.map(
                            (item: Record<string, string>): ProductData => ({
                                id: +item.id,
                                title: item.title,
                                price: +item.price,
                                description: item.description,
                                image: item.image,
                                category: item.category,
                            }),
                        ),
                    );
                }
            } catch (err) {
                const { code = 'unknown', description = 'unknown' } =
                    err as FetchError;
                const errPrompt = `Error ${code}: ${description}`;
                setOnError([true, errPrompt]);
            } finally {
                setLoaded(true);
            }
        };
        fetcher();

        return () => controller.abort();
    }, [url]);
    return { data, onError, loaded };
};

export { makeFetchUrl, useFetch };
