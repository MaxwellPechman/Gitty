import {Session} from "./session";

export type UserRegister = {
    name: string
    mail: string
    password: string
}

export type UserRegisterResponse = {
    session: Session
}

export type UserLogin = {
    username: string
    password: string
    remember: boolean
}

export type UserLoginResponse = {
    session: Session
}

export type requestId = {
    id: number
}

export type PasswordRequest = [{ password: string } | null]
