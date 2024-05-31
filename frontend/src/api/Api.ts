import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export type UserRegister = {
    name: string
    mail: string
    password: string
}

export type UserLogin = {
    mail: string
    password: string
    remember: string
}

export type types = {
    typeId: number
    type_name: string
}

export type requestId = {
    id: number
}

export type Project = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
}

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
    uid: number;
}

// Probably needs to be changed
function getBackendBaseUrl() {
    const host = import.meta.env.VITE_BACKEND_HOST
    const port = import.meta.env.VITE_BACKEND_PORT

    return "http://" + host + ":" + port + "/api"
}

export async function requestUserRegister(userData: UserRegister): Promise<UserRegister> {
    const url = getBackendBaseUrl() + "/register"

    return post(url, userData)
}

export async function requestUserLogin(userData: UserLogin): Promise<UserLogin> {
    const url = getBackendBaseUrl() + "/login"

    return post(url, userData)
}

export async function getUserProjects(uid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserProjects"

    return post(url, uid)
}

export async function getUserTasks(uid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserTasks"

    return post(url, uid)
}

export async function getTypes(type_classification: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getTypes"

    return post(url, type_classification)
}

export async function createProject(projectData: Project): Promise<any> {
    const url = getBackendBaseUrl() + "/createProject"

    return post(url, projectData)
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