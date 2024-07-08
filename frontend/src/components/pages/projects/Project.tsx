import progressIcon from "../../../assets/icons/projects/small/Progress.png"
import cancelIcon from "../../../assets/icons/projects/small/Cancel.png"
import {useNavigate} from "react-router-dom";
import {useProjectsStore} from "../../../stores/ProjectsStore.ts";
import {getProjectIcon, projectCodeToType} from "../../../utils/projects.ts";

export function Projects() {
    const navigate = useNavigate();
    const { projects } = useProjectsStore();

    return (
        <div className="flex flex-row">
            {projects.map((project, index) => {
                return (
                    <div key={index}
                         className="mt-[38px] mb-[38px] min-w-[215px] min-h-[231px] bg-black text-white rounded-2xl m-2 hover:bg-white hover:text-black cursor-pointer"
                         onClick={() => navigate(`/project/${project.pid}`)}>
                        <img src={getProjectIcon(project.projectType)} className="pl-[18px] pt-[18px] h-[51px]" alt=""/>
                        <div className="mt-[20px]">
                            <span className="pl-[18px] text-[16px] font-bold">{project.projectName}</span>
                            <p className="mt-[7px] text-[12px] pl-[18px]">{projectCodeToType(project.projectType)}</p>
                        </div>
                        <div className="mt-[60px] ml-[17px]">
                            <StatusDisplay projectStatus={project.projectStatus} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
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