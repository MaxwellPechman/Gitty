import logo from "../../assets/icons/Gitty_Logo@2.png"
import lock_icon from "../../assets/icons/lock2.png";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="flex w-screen h-screen justify-center bg-gradient-to-br from-gray-950 to-gray-900">
            <img className="h-14 mt-20 absolute" src={logo} alt="Gitty Logo"/>
            <h1 className="mt-40 text-4xl absolute">Log in to Gitty</h1>
            <div className="flex items-center justify-center">


            <form className="p-6 w-[459px] bg-code-grey-800 rounded-xl flex flex-col gap-y-5">
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
                        className="bg-code-grey-950 flex gap-x-2 items-center rounded-xl border border-code-grey-600 cursor-text hover:border-code-grey-300 transition duration-200 ease-in-out">
                        <img className="mx-3 w-[25px] h-[25px]" src={lock_icon} alt="lock_icon"/>
                        <input
                            className="-mx-2 py-5 bg-code-grey-950 font-roboto text-code-grey-500 focus:outline-none focus:text-white focus:border-code-grey-300"
                            type="password"
                            name="password"
                            placeholder="Enter your password"/>
                    </div>
                </div>
                <div className="flex gap-y-3 ml-1">
                    <input className="w-5 accent-transparent bg-white" type="checkbox"/>
                    <label className="ml-3 text-lg">Remember me</label>
                </div>
                <button className="my-2 py-2 bg-white text-black font-roboto font-bold rounded-xl">Login</button>
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