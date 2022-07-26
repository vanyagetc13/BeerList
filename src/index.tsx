import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import BeerPage from "./components/BeerPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            {/* Routes */}
            <Route path="/beers" element={<App />} />
            <Route path="/beers/:id" element={<BeerPage />} />
            {/* Route misstakes */}
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/" element={<Navigate to="/beers"/>}/>
        </Routes>
    </BrowserRouter>
);
