import {Topnav} from "../topnav/Topnav.tsx";

/**
 * Hauptseite für das Projekt. Kb was da drauf kommt, Namen können wir auch noch ändern von der page.
 */
export function MainPage() {

    return (
        <div className="w-screen h-[2500px] bg-white">
            <Topnav/>
            <div className="bg-red-600">
                <h1>Test dies das...</h1>
            </div>
        </div>
    )
}