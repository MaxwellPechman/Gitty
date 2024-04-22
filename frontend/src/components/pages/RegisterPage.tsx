import gitty_register2 from "../../assets/img/gitty_register2.png"
import lock_icon from "../../assets/icons/lock2.png"
import {useState} from "react";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

export function RegisterPage() {
    const [passwordBorder, setPasswordBorder] = useState(false)
    const [confPasswordBorder, setConfPasswordBorder] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex">
            <div className="w-screen h-screen bg-code-grey-950 flex flex-col items-center justify-center">
                <h1 className="py-10 font-roboto text-3xl text-white">Create your account</h1>
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
                            placeholder="Enter your username"/>
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
                            placeholder="Enter your email"/>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="password">Password</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <div
                            className={clsx("bg-code-grey-950 flex gap-x-2 items-center rounded-xl border border-code-grey-600 cursor-text hover:border-code-grey-300 transition duration-200 ease-in-out",
                                passwordBorder ? "border-code-grey-300" : "")}>
                            <img className="mx-3 w-[25px] h-[25px]" src={lock_icon} alt="lock_icon"/>
                            <input
                                className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onFocus={() => setPasswordBorder(true)}
                                onBlur={() => setPasswordBorder(false)}/>
                        </div>
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
                                className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300"
                                type="password"
                                name="conf_password"
                                placeholder="Confirm your password"
                                onFocus={() => setConfPasswordBorder(true)}
                                onBlur={() => setConfPasswordBorder(false)}/>
                        </div>
                    </div>
                    <button className="my-2 py-2 bg-white text-black font-roboto font-bold rounded-xl">Register</button>
                    <div className="-mt-3 flex gap-x-2 justify-center">
                        <div className="text-code-grey-500">Already got an account?</div>
                        <button className="text-code-blue hover:underline" onClick={() => navigate("/login")}>Login now</button>
                    </div>
                </form>
            </div>
            <img src={gitty_register2} alt="gitty register image"/>
        </div>
    )
}