import { useEffect, useState } from 'react';
import { fetcher } from '../fetcher';

import { FetchReturn, ErrorState, DataFetched, ApiUrl } from '../types/global';

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

export { useFetch };
