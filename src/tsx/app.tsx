import { useEffect, useState } from 'react';
import { fetcher, makeFetchUrl } from './fetcher';
import { DataFetched, ProductCategories, ErrorState } from './types/global';

export function App() {
    const [categoryLoad, setCategoryLoad] = useState(false);
    const [categoryError, setCategoryError] = useState<ErrorState>(null);
    const [categoryData, setCategoryData] = useState<DataFetched>(null);

    useEffect(() => {
        const categoryFech = async () => {
            const controller = new AbortController();
            const categoryURL = makeFetchUrl();
            const { loaded, onError, data } = await fetcher(
                categoryURL,
                controller,
            );

            setCategoryLoad(loaded);
            setCategoryError(onError);
            setCategoryData(data as ProductCategories);
        };
        categoryFech();
    }, []);

    return (
        <>
            <h1>{!categoryLoad ? 'Cargando' : 'Hola carebola'}</h1>
            {categoryError?.[0] && <div>{categoryError[1]}</div>}
            {categoryData &&
                (categoryData as ProductCategories)?.map((e, i) => (
                    <div key={i}>{e}</div>
                ))}
        </>
    );
}
