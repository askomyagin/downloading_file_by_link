import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Global, css } from '@emotion/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
        <Global
            styles={css`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp');
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Montserrat', sans-serif;
                }
            `}
        />
    </React.StrictMode>
);
