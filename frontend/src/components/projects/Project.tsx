import iconGame from "../../assets/icons/Icon1.png"
import iconTable from "../../assets/icons/Icon2.png"
import iconCode from "../../assets/icons/Icon3.png"
import progressIcon from "../../assets/icons/projects/small/Progress.png"
import cancelIcon from "../../assets/icons/projects/small/Cancel.png"
import React, {useEffect, useState} from "react";
import {getUserProjects, requestId, Project} from "../../api/Api.ts";

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [userId, setUserId] = useState<requestId>({id: 1})

    useEffect(() => {
        getUserProjects(userId).then((data) => {
            setProjects(data)
        })
        return
    }, [])

    const renderProjects = projects.map(project => {
        return (
            <div key={project.pid}
                 className="mt-[38px] mb-[38px] min-w-[215px] min-h-[231px] bg-black text-white rounded-2xl m-2 hover:bg-code-grey-500 hover:text-black">
                <img src={getIcon(project.projectType)} className="pl-[18px] pt-[18px] h-[51px]" alt=""/>
                <div className="mt-[20px]">
                    <span className="pl-[18px] text-[16px] font-bold">{project.projectName}</span>
                    <p className="mt-[7px] text-[12px] pl-[18px]">{project.projectType}</p>
                </div>
                <div className="mt-[60px] ml-[17px]">
                    <Status projectStatus={project.projectStatus} />
                </div>
            </div>
        )
    })

    return (
        <div className="flex flex-row">
            {renderProjects}
        </div>
    )
}

function getIcon(projectType: string | undefined) {
    switch (projectType) {
        case "Code":
            return iconCode
        case "Game":
            return iconGame
        case "Table":
            return iconTable
        default:
            return iconTable
    }
}

const Status: React.FC<boolean> = ({projectStatus}) => {
    switch (projectStatus) {
        case false:
            return <div className="flex flex-row">
                <img src={cancelIcon} className="h-[18px] w-[18px]" alt="Progress Icon"></img>
                <span className="text-code-red leading-[18px] text-[16px] ml-[6px]">canceled</span>
            </div>
        default:
            return <div className="flex flex-row">
                <img src={progressIcon} className="h-[18px] w-[18px]" alt="Progress Icon"></img>
                <span className="text-code-yellow leading-[18px] text-[16px] ml-[6px]">in progress</span>
            </div>
    }
}