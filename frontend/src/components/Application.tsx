import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage.tsx";
import {ProjectPage} from "./pages/ProjectPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";

export function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/projects" element={<ProjectPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}