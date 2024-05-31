import {useEffect, useState} from "react";
import {createProject, getTypes, Project, requestId, types} from "../../api/Api.ts";

export function ProjectDetails() {

    const [options, setOptions] = useState<types[]>([])
    const [project, setProject] = useState<Project>({
        pid: 0,
        projectName: "",
        projectStatus: true,
        projectType: "",
    })
    const [type_classification] = useState<requestId>({id: 0})
    useEffect(() => {
        getTypes(type_classification).then((data) => {
            setOptions(data)
        })
        return
    }, [])

    return (
        <div className="top-[233px] h-[375px] w-[544px] bg-code-project-detail absolute z-50 right-0 rounded-2xl">
            <div className="ml-7 mt-7">
                <div className="flex flex-row">
                    <h1 className="text-[30px] font-roboto">Create a new project</h1>
                    <button className="text-[30px] text-code-grey-500 top-0 right-12 absolute">_</button>
                    <button className="text-[30px] text-code-grey-500 top-1 right-6 absolute">x</button>
                </div>

                <p className="text-[14px] text-code-grey-500">A project contains the code and all comments aswell as information <br/>regarding the allocation.</p>
                <p className="text-[16px] mt-6 text-code-grey-500">Title</p>
                <input type="text" className="w-[475px] bg-code-grey-800 h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px]" onChange={(event) => setProject({
                    projectName: event.target.value,
                    projectType: project.projectType,
                    pid: project.pid,
                    projectStatus: project?.projectStatus
                })}/>
                <div className="flex justify-between flex-row">
                    <div>
                        <p className="text-[16px] mt-2 text-code-grey-500">Project type</p>
                        <select className="w-[244px] h-[57px] mt-2 bg-code-grey-800 rounded-2xl" onChange={(event) => setProject({
                            pid: project.pid,
                            projectName: project.projectName,
                            projectType: event.target.value,
                            projectStatus: project.projectStatus
                        })}>
                            {options.map((option) => (
                                <option value={option.typeId}>{option.type_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="text-[16px] mt-2 text-code-grey-500">Add people to project</p>
                        <button className="w-[244px] h-[57px] mt-2 mr-4 bg-code-grey-800 rounded-2xl">PLATZHALTER</button>
                    </div>
                </div>
                <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]" onClick={(e :any) => createProject(project).then(response => {
                    console.log(response)
                })}>Create project</button>
            </div>
        </div>
    )
}