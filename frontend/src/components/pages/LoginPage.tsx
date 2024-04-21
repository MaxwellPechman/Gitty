import logo from "../../assets/icons/Gitty_Logo@2.png"

export function LoginPage() {

    return (
        <div className="flex w-screen h-screen justify-center bg-gradient-to-br from-gray-950 to-gray-900">
            <img className="h-14 mt-20 absolute" src={logo} alt="Gitty Logo"/>
            <h1 className="mt-40 text-4xl absolute">Log in to Gitty</h1>
            <div className="bg-gray-400 mt-60 w-96">
                <span className="mx-3">Username or email address:</span><br/>
                <input className="w-360 mx-3 rounded-l border-code-login-gray" type="text"></input>
            </div>
        </div>
    )
}