import {Topnav} from "../topnav/Topnav.tsx";
import manageLogo from "../../assets/icons/manageProjects.png";
import projectsImg from "../../assets/img/projects.png";
import icon1 from "../../assets/icons/Icon1.png";
import icon2 from "../../assets/icons/Icon2.png";
import icon3 from "../../assets/icons/Icon3.png";

/**
 * Hauptseite für das Projekt. Kb was da drauf kommt, Namen können wir auch noch ändern von der page.
 */
export function LandingPage() {

    return (
        <div className="w-screen bg-gradient-to-br from-gray-950  to-gray-900">
            <Topnav/>
            <div className="text-white text-center">
                <h1 className="mt-40 text-5xl">&lt;/Managing code easier&gt;</h1>
                <br/>
                <p className="font-roboto italic leading-10 text-xl font-thin">"Are you tired of juggling courtless
                    spreadsheets, emails, and sticky notes to <br/>
                    manage your coding projects? Say hello to Gitty, the ultimate project management<br/>
                    platform designed specifically for coders like you."</p>
                <br/>
                <button className="bg-black border-white mr-7 w-56 hover:bg-gray-900">Register</button>
                <button className="bg-white border-white text-black w-56 ml-7 hover:bg-gray-400">Login</button>
            </div>
            <div className="flex flex-row">
                <div className="bg-none w-72 h-72 ml-20 mt-36">
                    <div className="text-white bg-black w-56 h-56 rounded-2xl absolute z-50 shadow-2xl">
                        <img src={manageLogo} className="w-16 mx-3 my-3 pt-3" alt="Project Logo"/>
                        <h2 className="font-bold mx-3 text-lg leading-none">Manage Projects with Gitty</h2>
                        <p className="text-gray-400 text-xs mx-3">Gitty is awesome!</p>
                    </div>
                    <div className="bg-black w-56 h-56 rounded-2xl absolute z-0 mt-6 ml-6 shadow-2xl"></div>
                    <div className="bg-black w-56 h-56 rounded-2xl absolute z-0 mt-12 ml-12 shadow-2xl"></div>
                </div>
                <div className="bg-black mt-48 rounded-2xl">
                    <img src={projectsImg} className="mx-2 my-2 w-570 rounded-2xl" alt="Project Page Example"/>
                </div>
                <div className="bg-black mt-42 ml-3 rounded-2xl text-white h-54">
                    <p className="mx-2 my-2 text-sm">
                        <span className="text-code-blue">def</span> <span className="text-code-red">factorial</span>(n):<br/>
                        &emsp;<span className="text-code-blue">if</span> n == <span
                        className="text-code-purple">0</span>:<br/>
                        &emsp;&emsp;<span className="text-code-blue">return</span> <span
                        className="text-code-purple">1</span><br/>
                        &emsp;<span className="text-code-blue">else</span>:<br/>
                        &emsp;&emsp;<span className="text-code-blue">return</span> n * factorial(n-<span
                        className="text-code-purple">1</span>)<br/><br/>
                        # Test the function<br/>
                        number = <span className="text-code-purple">5</span><br/>
                        <span className="text-code-yellow">print</span>(<span className="text-code-green">"Factorial of"</span>, number,
                        <span className="text-code-green">"is"</span>,
                        factorial(n))
                    </p>
                </div>
                <div className="bg-black mt-72 ml-3 rounded-2xl">
                    <img src={icon3} className="w-20 mt-4 ml-4" alt=""/>
                    <img src={icon2} className="-mt-10 ml-32 mr-4 overflow-x-hidden" alt=""/>
                    <img src={icon1} className="ml-18" alt=""/>
                </div>
            </div>
        </div>
    )
}