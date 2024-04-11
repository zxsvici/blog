import React from 'react'
import ReactDOM from 'react-dom/client';
import App from '@/App'
import {BrowserRouter} from "react-router-dom";
import 'reset-css'
import {CacheProvider} from "@/components/context";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CacheProvider>
                <App/>
            </CacheProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
