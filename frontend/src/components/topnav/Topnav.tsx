import {BurgerMenu} from "./BurgerMenu.tsx";
import gitty_icon from "../../assets/icons/gitty.png";
import {Searchbar} from "../searchbar/Searchbar.tsx";
import {useNavigate} from "react-router-dom";
import profile_icon from "../../assets/icons/profile_icon_that_looks_overweight.png"

/**
 * Obere Navigationsleiste zum Navigieren (captain obvious) der Webseite.
 *
 * Besitzt im Moment noch keine Funktionen...
 */
export function Topnav() {
    /**
     * Mit diesem useState React-hook können wir dann später definieren, ob ein Benutzer eingeloggt ist oder nicht und
     * dementsprechend entweder die LoginSection (Wenn der Nutzer nicht eingeloggt ist, also quasi der default-state)
     * oder die LogoutSection (Wenn der Nutzer eingeloggt ist) in die Topnav rendern.
     */
    const navigate = useNavigate();

    return (
        <div className="w-screen h-[74px] sticky top-0 bg-code-grey-700 flex items-center justify-between z-50">
            <div className="px-4 flex items-center">
                <BurgerMenu/>
                <img className="mx-6 mt-2 w-[30px] h-[29px]" src={gitty_icon} alt="gitty_icon"/>
                <ul className="flex gap-x-4">
                    <li className="text-white leading-8 cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out"
                        onClick={() => navigate("/home")}>Home
                    </li>
                </ul>
            </div>
            <Searchbar/>
            {
                localStorage.getItem("sessionID") === null ?
                    <LoginSection/>
                    :
                    <LogoutSection/>
            }
        </div>
    )
}

function LoginSection() {
    const navigate = useNavigate();

    return (
        <ul className="px-4 flex items-center gap-x-3">
            <li className="px-2 py-1 text-white cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out">Login</li>
            <li className="px-2 py-1 text-white border border-code-grey-950 bg-code-grey-950 rounded cursor-pointer hover:bg-code-grey-700 transition duration-200 ease-in-out"
                onClick={() => navigate("/register")}>Sign Up
            </li>
        </ul>
    )
}

/**
 * TODO...
 *
 * Gibt im Moment nur ein leeres JSX-Element zurück, quasi wie "null".
 */
function LogoutSection() {
    const navigate = useNavigate()

    function logoutUser() {
        localStorage.setItem("sessionID", "");
        navigate("/login")
    }

    return (
        <ul className="flex items-center">
            <li className="cursor-pointer hover:bg-code-grey-700 transition duration-200 ease-in-out"
                onClick={() => navigate("/profile")}>
                <img className="w-[22px h-[22px]" src={profile_icon} alt={"profile_icon"}/>
            </li>
            <li className="mx-4 px-2 py-1 text-white border border-code-grey-950 bg-code-grey-950 rounded cursor-pointer hover:bg-code-grey-700 transition duration-200 ease-in-out"
                onClick={() => logoutUser}>Logout
            </li>
        </ul>
    )
}