import gitty_register2 from "../../assets/img/gitty_register2.png";
import lock_icon from "../../assets/icons/lock2.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {requestUserRegister} from "../../api/Api.ts";
import {UserRegister} from "../../types/user.ts";
import {ErrorDialog, ErrorType} from "../dialogs/ErrorDialog.tsx";
import clsx from "clsx";
import logo from "../../assets/icons/Gitty_Logo@2.png";
import * as EmailValidator from "email-validator"
import {useSessionStore} from "../../stores/SessionStore.ts";

export function RegisterPage() {
    const [passwordBorder, setPasswordBorder] = useState(false)
    const [passwordSecureBorder, setPasswordSecureBorder] = useState(true)
    const [confPasswordBorder, setConfPasswordBorder] = useState(false)
    const [confPassword, setConfPassword] = useState("")
    const [registerData, setRegisterData] = useState<UserRegister>({
        name: "",
        mail: "",
        password: ""
    })
    const [displayErrorDialog, setDisplayErrorDialog] = useState<ErrorType>("NONE")
    const { setSessionId } = useSessionStore()
    const navigate = useNavigate();

    function validatePassword(password: string) {
        const chars = Array.from(password)
        var uppercase = chars.some(char => /[A-Z]/.test(char))
        var lowercase = chars.some(char => /[a-z]/.test(char))
        var numeric = chars.some(char => /[0-9]/.test(char))
        var special = chars.some(char => /[!@#$%^&*(),.?":{}|<>]/.test(char))

        return (uppercase && lowercase && numeric && special)
    }

    function registerUser() {
        if(registerData.name === "") {
            setDisplayErrorDialog("EMPTY_USERNAME")

        } else if(registerData.mail === "") {
            setDisplayErrorDialog("EMPTY_EMAIL")

        } else if(registerData.password === "") {
            setDisplayErrorDialog("EMPTY_PASSWORD")

        } else {
            if(confPassword === registerData.password) {
                if (!EmailValidator.validate(registerData.mail)) {
                    setDisplayErrorDialog("REGISTER_INVALID_EMAIL")
                } else {
                    requestUserRegister(registerData)
                        .then((response) => {
                            if(response.session === "" && response.error === "") {
                                setDisplayErrorDialog("INVALID_CREDENTIALS")

                            } else if(response.session === "" && response.error === "REGISTER_USERNAME_USED") {
                                setDisplayErrorDialog("REGISTER_USERNAME_USED")

                            } else if(response.session === "" && response.error === "REGISTER_EMAIL_USED") {
                                setDisplayErrorDialog("REGISTER_EMAIL_USED")

                            } else {
                                setSessionId(response.session)
                                navigate("/projects")
                            }
                        })
                        .catch(() => {
                            setDisplayErrorDialog("NETWORK_ERROR")
                        })
                }
            } else {
                setDisplayErrorDialog("REGISTER_PASSWORD_MATCH")
            }
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <div className="w-screen h-screen bg-code-grey-950 flex flex-col items-center justify-center">
                <img className="h-14 cursor-pointer" src={logo} alt="Gitty Logo" onClick={() => navigate("/")}/>
                <h1 className="pb-4 pt-6 font-roboto text-3xl text-white">Create your account</h1>
                {
                    displayErrorDialog === "NONE" ?  <></> : <ErrorDialog errorType={displayErrorDialog}/>
                }
                <form className="p-6 w-[459px] bg-code-grey-800 rounded-xl flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="username">Username</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <input
                            className="px-4 py-5 bg-code-grey-950 font-roboto rounded-xl border border-code-grey-600 text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300 hover:border-code-grey-300 transition duration-200 ease-in-out"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={(event) => setRegisterData({
                                name: event.target.value,
                                mail: registerData.mail,
                                password: registerData.password,
                            })}/>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="mail">Email</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <input
                            className="px-4 py-5 bg-code-grey-950 font-roboto rounded-xl border border-code-grey-600 text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300 hover:border-code-grey-300 transition duration-200 ease-in-out"
                            type="text"
                            name="mail"
                            placeholder="Enter your email"
                            onChange={(event) => setRegisterData({
                                name: registerData.name,
                                mail: event.target.value,
                                password: registerData.password,
                            })}/>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="password">Password</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <div
                            className={clsx("bg-code-grey-950 flex gap-x-2 items-center rounded-xl border border-code-grey-600 cursor-text hover:border-code-grey-300 transition duration-200 ease-in-out",
                                passwordBorder ? "border-code-grey-300" : "",
                                passwordSecureBorder ? "" : "border-code-red hover:border-code-red")}>
                            <img className="mx-3 w-[25px] h-[25px]" src={lock_icon} alt="lock_icon"/>
                            <input
                                className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300 w-full mr-2"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onFocus={() => setPasswordBorder(true)}
                                onBlur={() => setPasswordBorder(false)}
                                onChange={(event) => {
                                    setRegisterData({
                                        name: registerData.name,
                                        mail: registerData.mail,
                                        password: event.target.value,
                                    })
                                    setPasswordSecureBorder(validatePassword(event.target.value))
                            }}/>
                        </div>
                        <p className="-mt-2 ml-2 text-[11px] text-code-grey-500">Password must include uppercase, lowercase, numbers, and special characters</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="conf_password">Confirm Password</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <div
                            className={clsx("bg-code-grey-950 flex gap-x-2 items-center rounded-xl border border-code-grey-600 cursor-text hover:border-code-grey-300 transition duration-200 ease-in-out",
                                confPasswordBorder ? "border-code-grey-300" : "")}>
                            <img className="mx-3 w-[25px] h-[25px]" src={lock_icon} alt="lock_icon"/>
                            <input
                                className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300 w-full mr-2"
                                type="password"
                                name="conf_password"
                                placeholder="Confirm your password"
                                onFocus={() => setConfPasswordBorder(true)}
                                onBlur={() => setConfPasswordBorder(false)}
                                onChange={(event) => setConfPassword(event.target.value)}/>
                        </div>
                    </div>
                    <button className="my-2 py-2 bg-white text-black font-roboto font-bold rounded-xl" type="button"
                            onClick={() => registerUser()}>Register
                    </button>
                    <div className="-mt-3 flex gap-x-2 justify-center">
                        <div className="text-code-grey-500">Already got an account?</div>
                        <button className="text-code-blue hover:underline" onClick={() => navigate("/login")}>Login
                            now
                        </button>
                    </div>
                </form>
            </div>
            <img src={gitty_register2} alt="gitty register image"/>
        </div>
    )
}