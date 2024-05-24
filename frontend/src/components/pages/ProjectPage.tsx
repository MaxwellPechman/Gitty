import {Topnav} from "../topnav/Topnav.tsx";
import {Projects} from "../projects/Project.tsx";
import {Tasks} from "../projects/Task.tsx";

export function ProjectPage() {

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="flex justify-around mt-[54px]">
            <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My projects</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black">+
                        Create project
                    </button>
                    <div
                        className="bg-code-grey-800 h-[308px] rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll noScrollbar">
                        <span className="hidden">Projekte Laden</span>
                        <Projects/>
                    </div>
                </div>
            </div>
            <div className="flex justify-around mt-[37px]">
                <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My tasks</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black">+
                        Create task
                    </button>
                    <div className="mt-4">
                        <Tasks/>
                    </div>

                </div>
            </div>
        </div>
    )
}