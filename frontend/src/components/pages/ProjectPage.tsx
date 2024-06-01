import {Topnav} from "../topnav/Topnav.tsx";
import {Projects} from "../projects/Project.tsx";
import {Tasks} from "../projects/Task.tsx";
import {useEffect, useState} from "react";
import {createProject, getTypes, newProject, types} from "../../api/Api.ts";

export function ProjectPage() {
    const [userId, setUserId] = useState( 1);
    const [showPrjoectsTab, setShowPrjoectsTab] = useState(false);
    const [options, setOptions] = useState<types[]>([])
    const [project, setProject] = useState<newProject>({
        pid: 0,
        projectName: "",
        projectStatus: true,
        projectType: "Code",
        projectDescription: "",
        uid: userId
    })

    useEffect(() => {
        getTypes({id: 0}).then((data) => {
            setOptions(data)
        })
    }, [])

    function toggleView() {
        setShowPrjoectsTab((prev) => !prev)
    }

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="flex justify-around mt-[54px]">
            <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My projects</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black"
                        onClick={toggleView}>+
                        Create project
                    </button>
                    <div
                        className="bg-code-grey-800 h-[308px] rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll noScrollbar">
                        <Projects />
                    </div>
                </div>
            </div>
            <div className={showPrjoectsTab ? "float-right" : "hidden"}>
                <div
                    className="top-[233px] h-[627px] w-[544px] bg-code-project-detail absolute z-50 right-0 rounded-2xl">
                    <div className="ml-7 mt-7">
                        <div className="flex flex-row">
                            <h1 className="text-[30px] font-roboto">Create a new project</h1>
                            <button className="text-[30px] text-code-grey-500 top-0 right-12 absolute"
                                    onClick={toggleView}>_
                            </button>
                            <button className="text-[30px] text-code-grey-500 top-1 right-6 absolute"
                                    onClick={toggleView}>x
                            </button>
                        </div>
                        <p className="text-[14px] text-code-grey-500">A project contains the code and all comments
                            aswell as information <br/>regarding the allocation.</p>
                        <p className="text-[16px] mt-6 text-code-grey-500">Title</p>
                        <input type="text"
                               className="w-[475px] bg-code-grey-800 h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px]"
                               onChange={(event) => setProject({
                                   projectName: event.target.value,
                                   projectType: project.projectType,
                                   pid: project.pid,
                                   projectStatus: project?.projectStatus,
                                   projectDescription: project.projectDescription,
                                   uid: project.uid,
                               })}/>
                        <div className="flex justify-between flex-row">
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Project type</p>
                                <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl"
                                        onChange={(event) => setProject({
                                            pid: project.pid,
                                            projectName: project.projectName,
                                            projectType: event.target.value,
                                            projectStatus: project.projectStatus,
                                            projectDescription: project.projectDescription,
                                            uid: project.uid,
                                        })}>
                                    {options.map((option) => (
                                        <option value={option.type_name} key={option.typeId}>{option.type_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Add people to project</p>
                                <button
                                    className="w-[244px] h-7 mt-2 mr-4 bg-code-grey-800 rounded-2xl">PLATZHALTER
                                </button>
                            </div>
                        </div>
                        <p className="text-[16px] mt-2 text-code-grey-500">Description</p>
                        <textarea className="w-[475px] h-[243px] bg-code-grey-800 mt-2 border-code-login-gray border-[1px] rounded-[10px]"
                                  placeholder="What is your task about..."
                                  onChange={(event) => setProject({
                                      pid: project.pid,
                                      projectName: project.projectName,
                                      projectType: project.projectType,
                                      projectStatus: project.projectStatus,
                                      projectDescription: event.target.value,
                                      uid: project.uid,
                                  })}></textarea>
                        <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]"
                                onClick={() => createProject(project).then(response => {
                                    toggleView()
                                    setProject({
                                        pid: 0,
                                        projectName: "",
                                        projectStatus: project.projectStatus,
                                        projectType: "Code",
                                        projectDescription: "",
                                        uid: project.uid,
                                    })
                                    window.location.reload()
                                })}>Create project
                        </button>
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