import {Session} from "./session";

export type DatabaseUserColumns = [{
    uid: number
    mail: string
    password: string
    date_created: string
    date_changed: string
    active: boolean
}]

export type UserRegister = {
    name: string
    mail: string
    password: string
}

export type UserRegisterResponse = {
    session: Session,
    error: string
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
