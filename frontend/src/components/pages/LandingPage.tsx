import logo from "../../assets/icons/gitty.png"
import manageLogo from "../../assets/icons/manageProjects.png";
import projectsImg from "../../assets/img/projects.png";
import icon1 from "../../assets/icons/Icon1.png";
import icon2 from "../../assets/icons/Icon2.png";
import icon3 from "../../assets/icons/Icon3.png";
import {useNavigate} from "react-router-dom";

/**
 * Hauptseite für das Projekt. Kb was da drauf kommt, Namen können wir auch noch ändern von der page.
 */
export function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="w-screen lg:h-screen bg-gradient-to-br from-gray-950 to-gray-900">
            <img className="mx-5 py-5" src={logo} alt="Gitty Logo"/>
            <div className="text-white text-center overflow-auto">
                <h1 className="mt-40 text-5xl">&lt;/Managing code easier&gt;</h1>
                <br/>
                <p className="font-roboto italic leading-10 text-xl font-thin">"Are you tired of juggling courtless
                    spreadsheets, emails, and sticky notes to <br/>
                    manage your coding projects? Say hello to Gitty, the ultimate project management<br/>
                    platform designed specifically for coders like you."</p>
                <br/>
                <button className="bg-black border-white mb-3 lg:mr-7 lg:mb-0 md:mr-3.5 w-56 hover:bg-gray-900" onClick={() => navigate("/register")}>Register</button>
                <button className="bg-white border-white text-black w-56 lg:ml-7 md:ml-3.5 hover:bg-gray-400" onClick={() => navigate("/login")}>Login</button>
            </div>
            <div className="hidden lg:flex flex-row w-screen mt-5 justify-between">
                <div className="bg-none mx-3 w-275">
                    <div className="text-white bg-black w-56 h-56 rounded-2xl absolute z-50 shadow-2xl">
                        <img src={manageLogo} className="w-16 mx-3 my-3 pt-3" alt="Project Logo"/>
                        <h2 className="font-bold mx-3 text-lg leading-none">Manage Projects with Gitty</h2>
                        <p className="text-gray-400 text-xs mx-3">Gitty is awesome!</p>
                    </div>
                    <div className="bg-black w-56 h-56 rounded-2xl absolute z-0 mt-6 ml-6 shadow-2xl"></div>
                    <div className="bg-black w-56 h-56 rounded-2xl absolute z-0 mt-12 ml-12 shadow-2xl"></div>
                </div>
                <div className="bg-black mt-12 rounded-2xl h-auto">
                    <img src={projectsImg} className="px-2 mx-2 py-2 my-2 object-fit rounded-2xl"
                         alt="Project Page Example"/>
                </div>
                <div className="bg-black h-54 ml-3 rounded-2xl text-white mx-3 ">
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
                        <span className="text-code-yellow">print</span>(<span
                        className="text-code-green">"Factorial of"</span>, number,
                        <span className="text-code-green">"is"</span>,
                        factorial(n))
                    </p>
                </div>
                <div className="bg-black h-42 mt-36 rounded-2xl mr-3">
                    <img src={icon3} className="w-20 mt-4 ml-4" alt=""/>
                    <img src={icon2} className="-mt-10 ml-32 mr-4" alt=""/>
                    <img src={icon1} className="ml-18" alt=""/>
                </div>
            </div>
            <div className="flex flex-col lg:hidden w-screen my-5 justify-center items-center">
                <div className="bg-none mb-5">
                    <div className="text-white bg-black w-56 h-56 rounded-2xl shadow-2xl">
                        <img src={manageLogo} className="w-16 mx-3 my-3 pt-3" alt="Project Logo"/>
                        <h2 className="font-bold mx-3 text-lg leading-none">Manage Projects with Gitty</h2>
                        <p className="text-gray-400 text-xs mx-3">Gitty is awesome!</p>
                    </div>
                </div>
                <div className="bg-black rounded-2xl h-auto mb-5">
                    <img src={projectsImg} className="px-2 mx-2 py-2 my-2 object-fit rounded-2xl"
                         alt="Project Page Example"/>
                </div>
                <div className="bg-black h-54 rounded-2xl text-white mb-5 ">
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
                        <span className="text-code-yellow">print</span>(<span
                        className="text-code-green">"Factorial of"</span>, number,
                        <span className="text-code-green">"is"</span>,
                        factorial(n))
                    </p>
                </div>
                <div className="bg-black h-42 rounded-2xl mr-3">
                    <img src={icon3} className="w-20 mt-4 ml-4" alt=""/>
                    <img src={icon2} className="-mt-10 ml-32 mr-4" alt=""/>
                    <img src={icon1} className="ml-18" alt=""/>
                </div>
            </div>
            <br/>
        </div>
    )
}