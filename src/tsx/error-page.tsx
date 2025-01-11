import { useRouteError } from 'react-router-dom';

type RouteError = {
    statusText?: string;
    message?: string;
};

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.log(error);

    return (
        <div id="error-page">
            <h2>Oooopsie!!!</h2>
            <p>Sorry, something unexpected happen.</p>
            <p>
                <i>{error?.statusText || error?.message || 'Unknown error'}</i>
            </p>
        </div>
    );
}
