import {Topnav} from "../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProjectById} from "../../api/Api.ts";
import {projectDetails} from "../../types/project.ts";
import {Tasks} from "../projects/Task.tsx";

export function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ projectData, setProjectData] = useState<projectDetails>();
    useEffect(() => {
        getProjectById({id: Number(id)}).then((data) => {
            setProjectData(data[0])
        })
    }, [])

    console.log(projectData);

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="m-4">
                <button className="text-4xl text-code-grey-500" onClick={() => navigate("/home")}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <div className="flex items-center justify-center w-full">
                        <h1>{projectData?.project_name}</h1>
                    </div>
                    <hr className="my-5"/>
                    <span className="text-code-grey-500">Description:</span>
                    <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2" rows="4" value={projectData?.project_description}></textarea>
                    <hr className="my-5"/>

                    <div className="flex flex-row">
                        <div className="w-2/3">
                            <span className="text-code-grey-500">Folder:</span>
                            <div className="w-full border border-code-border-projects rounded-2xl p-2">
                                TODO: Folderview
                            </div>
                        </div>
                        <div className="w-1/3">
                            <span className="text-code-grey-500">Tasks:</span>
                            <div className="w-full border border-code-border-projects rounded-2xl p-2">
                                TODO: Projecttasks
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}