import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {ProjectsPage} from "./pages/ProjectsPage.tsx";
import {TasksPage} from "./pages/TasksPage.tsx";

export function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/projects" element={<ProjectsPage/>}/>
                <Route path="/tasks" element={<TasksPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}