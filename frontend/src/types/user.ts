import {Session} from "./session.ts";

export type UserRegister = {
    name: string
    mail: string
    password: string
}

export type UserRegisterResponse = {
    session: Session,
    error: string
}

export type UserLoginResponse = {
    session: Session
}

export type UserLogin = {
    username: string
    password: string
    remember: boolean
}