import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { categoryName } = useParams();
  return <h1>{categoryName}</h1>;
}
