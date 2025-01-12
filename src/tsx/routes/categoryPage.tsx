import { useEffect, useState } from 'react';
import { Navigate, useLoaderData, useParams } from 'react-router-dom';
import { Store } from '../store';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { store } = useLoaderData<{ store: Store }>();

  if (!categoryName || !store) {
    throw new Error('Cannot load the page');
  }

  if (!store.allCategories.includes(categoryName)) {
    return <h1>La categoría {categoryName} no existe en nuestro catálogo</h1>;
  }
  return (
    <>
      <h1>{categoryName}</h1>
    </>
  );
}
