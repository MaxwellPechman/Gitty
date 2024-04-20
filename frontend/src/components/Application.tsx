import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage.tsx";

export function Application() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
    )
}