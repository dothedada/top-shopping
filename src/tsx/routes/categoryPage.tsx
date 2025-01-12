import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Store } from '../store';

export default function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <>
      <h1>{categoryName}</h1>
    </>
  );
}
