import {
  FetchReturn,
  FetchError,
  DataFetched,
  ErrorState,
  ProductData,
  ApiUrl,
  CategoryPath,
  FetchCategories,
} from './types/global';

const baseUrl = 'https://fakestoreapi.in/api/products' as const;

const makeFetchUrl = (categories: boolean = false): ApiUrl =>
  `${baseUrl}${categories ? '/category' : ''}` as CategoryPath;

const makeFetchItemUrl = (id: number): ApiUrl => `${baseUrl}/${id}`;

const itemBuilder = (item: Record<string, string>): ProductData => ({
  id: +item.id,
  title: item.title,
  price: +item.price,
  description: item.description,
  image: item.image,
  category: item.category,
  brand: item.brand,
  discount: +item.discount,
});

const fetcher = async (
  url: ApiUrl,
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
    if (dataFetched.categories) {
      data = dataFetched.categories as FetchCategories;
    } else if (dataFetched.products) {
      data = dataFetched.products.map(itemBuilder) as ProductData[];
    } else if (dataFetched.product) {
      data = dataFetched.product as ProductData;
    } else {
      throw new Error('Invalid dataFetched structure');
    }
  } catch (err) {
    const { code = 'unknown', description = 'unknown' } = err as FetchError;
    const errPrompt = `Error ${code}: ${description}`;
    onError = [true, errPrompt];
  } finally {
    loaded = true;
  }

  return { loaded, onError, data };
};

export { fetcher, makeFetchUrl, makeFetchItemUrl };
