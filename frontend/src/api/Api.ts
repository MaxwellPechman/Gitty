import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {UserLogin, UserLoginResponse, UserRegister, UserRegisterResponse} from "../types/user.ts";
import {newProject, newTask, requestId} from "../types/project.ts";
import {SessionRequest} from "../types/session.ts";
import {ProfileResponse} from "../types/profile.ts";

// Probably needs to be changed
function getBackendBaseUrl() {
    const host = import.meta.env.VITE_BACKEND_HOST
    const port = import.meta.env.VITE_BACKEND_PORT

    return "http://" + host + ":" + port + "/api"
}

export async function requestUserProfile(sessionId: SessionRequest): Promise<ProfileResponse> {
    const url = getBackendBaseUrl() + "/getUserProfile"

    return post<SessionRequest, ProfileResponse>(url, sessionId)
}

export async function requestUserRegister(userData: UserRegister): Promise<UserRegisterResponse> {
    const url = getBackendBaseUrl() + "/register"

    return post<UserRegister, UserRegisterResponse>(url, userData)
}

export async function requestUserLogin(userData: UserLogin): Promise<UserLoginResponse> {
    const url = getBackendBaseUrl() + "/login"

    return post<UserLogin, UserLoginResponse>(url, userData)
}

export async function requestUserProjects(uid: string): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserProjects"

    return post(url, {'sid': uid})
}

export async function getProjectById(pid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getProjectById"

    return post(url, pid)
}

export async function requestUserTasks(uid: string): Promise<any> {
    const url = getBackendBaseUrl() + "/getUserTasks"
    const data = {'sid': uid}
    return post(url, data)
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

export async function fetchFileSystem(pid: requestId): Promise<any> {
    const url = getBackendBaseUrl() + "/getFileSystem"

    return post(url, pid)
}

export async function createFolder(pid: number, parent_dir: number | null, dirName: string): Promise<any> {
    const url = getBackendBaseUrl() + "/createFolder"
    const data = [pid, parent_dir, dirName]

    return post(url, data)
}

export async function getProjectTasks(pid: number): Promise<any> {
    const url = getBackendBaseUrl() + "/getProjectTasks"
    const data = [pid]

    return post(url, data)
}

export async function updateTaskStatus(status: number, tid: number): Promise<any> {
    const url = getBackendBaseUrl() + "/updateTaskStatus"
    const data = [status, tid]

    return post(url, data)
}

export async function uploadFile(pid: number, parent_dir: number | null, fileName: string, fileContent: unknown): Promise<any> {
    const url = getBackendBaseUrl() + "/uploadFile"
    const data = [pid, parent_dir, fileName, fileContent]

    return post(url, data)
}

export async function uploadProfilePicture(sid: string, imgContent: unknown): Promise<any> {
    const url = getBackendBaseUrl() + "/uploadProfilePicture"

    return post(url, [sid, imgContent])
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