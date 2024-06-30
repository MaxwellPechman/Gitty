import iconGame from "../../assets/icons/projects/small/Game.png"
import iconWebsite from "../../assets/icons/projects/small/Website.png"
import iconCode from "../../assets/icons/projects/small/Code.png"
import iconDatabase from "../../assets/icons/projects/small/Database.png"
import iconOther from "../../assets/icons/projects/small/Other.png"
import progressIcon from "../../assets/icons/projects/small/Progress.png"
import cancelIcon from "../../assets/icons/projects/small/Cancel.png"
import {useEffect, useState} from "react";
import {requestUserProjects} from "../../api/Api.ts";
import {Project} from "../../types/project.ts";
import {useNavigate} from "react-router-dom";

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([{
        pid: 0,
        projectName: "Introduction",
        projectStatus: true,
        projectType: 0
    }])
    const [userId] = useState<string>(localStorage.getItem("sessionID") || "")
    const navigate = useNavigate();

    useEffect(() => {
        requestUserProjects(userId).then((data) => {
            if (data != "") {
                setProjects(data)
            }
        });
    }, [])

    const renderProjects = projects.map(project => {
        return (
            <div key={project.pid}
                 className="mt-[38px] mb-[38px] min-w-[215px] min-h-[231px] bg-black text-white rounded-2xl m-2 hover:bg-code-grey-500 hover:text-black"
                 onClick={() => navigate(`/project/${project.pid}`)}>
                <img src={getIcon(project.projectType)} className="pl-[18px] pt-[18px] h-[51px]" alt=""/>
                <div className="mt-[20px]">
                    <span className="pl-[18px] text-[16px] font-bold">{project.projectName}</span>
                    <p className="mt-[7px] text-[12px] pl-[18px]">{getType(project.projectType)}</p>
                </div>
                <div className="mt-[60px] ml-[17px]">
                    <StatusDisplay projectStatus={project.projectStatus} />
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

function getIcon(projectType: number | undefined) {
    switch (projectType) {
        case 1:
            return iconCode
        case 2:
            return iconGame
        case 3:
            return iconWebsite
        case 4:
            return iconDatabase
        default:
            return iconOther
    }
}

function getType(projectTpye: number | undefined) {
    switch (projectTpye) {
        case 1:
            return "Code"
        case 2:
            return "Game"
        case 3:
            return "Website"
        case 4:
            return "Database"
        default:
            return "Other"
    }
}

function StatusDisplay({ projectStatus }: { projectStatus: boolean })  {
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