import {Topnav} from "../topnav/Topnav.tsx";

/**
 * Hauptseite für das Projekt. Kb was da drauf kommt, Namen können wir auch noch ändern von der page.
 */
export function MainPage() {

    return (
        <div className="w-screen h-[2500px] bg-black">
            <Topnav/>
            <div className="text-white text-center">
                <h1 className="mt-40 text-5xl">&lt;/Managing code easier&gt;</h1>
                <br/>
                <p className="font-roboto italic leading-10 text-xl font-thin">"Are you tired of juggling courtless spreadsheets, emails, and sticky notes to <br/>
                    manage your coding projects? Say hello to Gitty, the ultimate project management<br/>
                    platform designed specifically for coders like you."</p>
                <br/>
                <button className="bg-black border-white mr-7 w-56">Register</button>
                <button className="bg-white border-white text-black w-56 ml-7">Login</button>
            </div>
        </div>
    )
}