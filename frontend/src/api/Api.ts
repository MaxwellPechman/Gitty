import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {UserLogin, UserLoginResponse, UserRegister, UserRegisterResponse} from "../types/user.ts";
import {newProject, newTask, requestId} from "../types/project.ts";

// Probably needs to be changed
function getBackendBaseUrl() {
    const host = import.meta.env.VITE_BACKEND_HOST
    const port = import.meta.env.VITE_BACKEND_PORT

    return "http://" + host + ":" + port + "/api"
}

export async function requestUserRegister(userData: UserRegister): Promise<UserRegisterResponse> {
    const url = getBackendBaseUrl() + "/register"

    return post<UserRegister, UserRegisterResponse>(url, userData)
}

export async function requestUserLogin(userData: UserLogin): Promise<UserLoginResponse> {
    const url = getBackendBaseUrl() + "/login"

    return post<UserLogin, UserLoginResponse>(url, userData)
}

export async function getUserProjects(uid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserProjects"

    return post(url, uid)
}

export async function getUserTasks(uid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserTasks"

    return post(url, uid)
}

export async function getTypes(): Promise<any> {
    const url = getBackendBaseUrl() + "/getTypes"

    return axios.get(url)
}

export async function createProject(projectData: newProject): Promise<any> {
    const url = getBackendBaseUrl() + "/createProject"

    return post(url, projectData)
}

export async function createTask(taskData: newTask): Promise<any> {
    const url = getBackendBaseUrl() + "/createTask"

    return post(url, taskData)
}

async function post<Request, Response>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig<Request>
): Promise<Response> {
    return (await postNative<Request, Response>(url, data, config)).data;
}

async function postNative<Request, Response>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig<Request>
): Promise<AxiosResponse<Response, Request>> {
    return await axios.post<Response, AxiosResponse<Response, Request>, Request>(url, data, config);
}