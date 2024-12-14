import { useState } from 'react';
import '../css/App.css';

import { useFetch } from './hooks/useFetch.tsx';

function App() {
    const [count, setCount] = useState(0);
    // const { data, onError, onLoad } = useFetch();
    const { data: data2, onError: error2, onLoad: load2 } = useFetch();
    // console.log(data, onError, onLoad);
    console.log(data2, error2, load2);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
