import {Session} from "./session";

export type UserRegister = {
    name: string
    mail: string
    password: string
}

export type UserRegisterResponse = {
    session: Session
}

export type requestUserId = {
    uid: number
}

export type requestId = {
    id: number
}
