import logo from "../../assets/icons/Gitty_Logo@2.png"
import lock_icon from "../../assets/icons/lock2.png";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {requestUserLogin} from "../../api/Api.ts";
import {UserLogin} from "../../types/user.ts";

export function LoginPage() {
    const [loginData, setLoginData] = useState({} as UserLogin)
    const navigate = useNavigate();

    function loginUser() {
        requestUserLogin(loginData)
            .then((response) => {
                if(response.session !== undefined) {
                    localStorage.setItem("session-key", response.session)
                    navigate("/projects")
                }
        })
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center bg-code-grey-950">
            <div className="flex flex-col items-center justify-center">
                <img className="h-14" src={logo} alt="Gitty Logo"/>
                <h1 className="text-4xl">Log in to Gitty</h1>
            </div>
            <div className="flex items-center justify-center mt-2">
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
                            onChange={(event) => setLoginData({
                                username: event.target.value,
                                password: loginData.password,
                                remember: loginData.remember
                        })}/>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex gap-x-2">
                            <label className="font-roboto text-white" htmlFor="password">Password</label>
                            <div className="font-roboto text-code-red">*</div>
                        </div>
                        <div
                            className="bg-code-grey-950 flex gap-x-2 items-center rounded-xl border border-code-grey-600 cursor-text hover:border-code-grey-300 transition duration-200 ease-in-out">
                            <img className="mx-3 w-[25px] h-[25px]" src={lock_icon} alt="lock_icon"/>
                            <input
                                className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={(event) => setLoginData({
                                    username: loginData.username,
                                    password: event.target.value,
                                    remember: loginData.remember
                                })}/>
                        </div>
                    </div>
                    <div className="flex gap-y-3 ml-1">
                        <input className="w-5 accent-transparent" type="checkbox"
                                onChange={(event) => setLoginData({
                                    username: loginData.username,
                                    password: loginData.password,
                                    remember: false
                                })}/>
                        <label className="ml-3 text-lg">Remember me</label>
                    </div>
                    <button className="my-2 py-2 bg-white text-black font-roboto font-bold rounded-xl" type="button"
                            onClick={() => loginUser()}>Login</button>
                    <div className="-mt-3 flex gap-x-2 justify-center">
                        <div className="text-code-grey-500">No account?</div>
                        <button className="text-code-blue hover:underline" onClick={() => navigate("/register")}>Register now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}