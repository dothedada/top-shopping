const makeFetchUrl = (category: string = ''): string => {
    const providerUrl = 'https://fakestoreapi.in/api/products';
    const categoryName = category ? `/category?type=${category}` : '/category';
    return `${providerUrl}${categoryName}`;
};

export { makeFetchUrl };
