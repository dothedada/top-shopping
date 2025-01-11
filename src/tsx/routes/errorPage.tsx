import { useRouteError } from 'react-router-dom';
import { ErrorReactRouter } from '../types/global';
export default function ErrorPage() {
  const error = useRouteError() as ErrorReactRouter;

  return (
    <>
      <h1>OOOPPPPSSSSS!!!</h1>
      <p>Algo sucedio y la información que buscas no está disponible</p>
      <h2>{error.statusText}</h2>
      <p>{error.message}</p>
    </>
  );
}
