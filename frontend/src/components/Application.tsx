import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {ProfilePage} from "./pages/profile/ProfilePage.tsx";
import {TasksPage} from "./pages/TasksPage.tsx";
import {ProjectDetailsPage} from "./pages/projects/ProjectDetailsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ProjectsPage} from "./pages/projects/ProjectsPage.tsx";
import {FolderFocusProvider} from "./providers/FolderFocusProvider.tsx";

const queryClient = new QueryClient();

export function Application() {
    return (
        <QueryClientProvider client={queryClient}>
            <FolderFocusProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/projects" element={<ProjectsPage/>}/>
                        <Route path="/project/:id" element={<ProjectDetailsPage/>}/>
                        <Route path="/tasks" element={<TasksPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </BrowserRouter>
            </FolderFocusProvider>
        </QueryClientProvider>
    )
}