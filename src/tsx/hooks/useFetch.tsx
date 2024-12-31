import { useEffect, useState } from 'react';
import { ProductData, ProductCategories } from '../types/global';

type CategoryPath = '/category' | `/category?type=${string}`;
type ApiUrl = `${typeof baseUrl}${CategoryPath}`;

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

const fetcher = async (
    url: string,
    controller: AbortController,
): Promise<FetchReturn> => {
    let loaded: boolean = false;
    let onError: ErrorState = null;
    let data: DataFetched = null;

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

        const dataFetched = await response.json();

        data = !dataFetched[0]?.id
            ? dataFetched
            : dataFetched.map(
                  (item: Record<string, string>): ProductData => ({
                      id: +item.id,
                      title: item.title,
                      price: +item.price,
                      description: item.description,
                      image: item.image,
                      category: item.category,
                  }),
              );
    } catch (err) {
        const { code = 'unknown', description = 'unknown' } = err as FetchError;
        const errPrompt = `Error ${code}: ${description}`;
        onError = [true, errPrompt];
    } finally {
        loaded = true;
    }

    return { loaded, onError, data };
};

const useFetch = (url: ApiUrl): FetchReturn => {
    const [loaded, setLoaded] = useState(false);
    const [onError, setOnError] = useState<ErrorState>(null);
    const [data, setData] = useState<DataFetched>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetcher(url, controller).then(({ loaded, onError, data }) => {
            setLoaded(loaded);
            setOnError(onError);
            setData(data);
        });

        return () => controller.abort();
    }, [url]);
    return { data, onError, loaded };
};

export { makeFetchUrl, useFetch };
