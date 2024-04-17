import {useState} from "react";

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
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="w-screen h-16 sticky top-0 bg-neutral-100 flex items-center justify-between">
            <ul className="px-4 flex items-center gap-x-4">
                <li className="text-neutral-800 cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out">HOME</li>
                <li className="text-neutral-800 cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out">PROJECTS</li>
                <li className="text-neutral-800 cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out">ABOUT</li>
                <li className="text-neutral-800 cursor-pointer hover:text-neutral-500 transition duration-200 ease-in-out">CONTACT</li>
            </ul>
            {
                loggedIn ?
                    <LogoutSection/>
                    :
                    <LoginSection/>
            }
        </div>
    )
}

function LoginSection() {
    return (
        <ul className="px-4 flex items-center gap-x-4">
            <li className="px-2 py-1 text-neutral-800 cursor-pointer border border-neutral-800 rounded hover:text-neutral-500 hover:border-neutral-500 transition duration-200 ease-in-out">Login</li>
            <li className="px-2 py-1 text-white bg-neutral-800 cursor-pointer border border-neutral-800 rounded hover:bg-neutral-950 transition duration-200 ease-in-out">Sign
                Up
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
    return (
        <></>
    )
}