import icon1 from "../../assets/icons/Icon1.png"
import icon2 from "../../assets/icons/Icon2.png"
import icon3 from "../../assets/icons/Icon3.png"

interface IProject {
    projectName: string;
    projectType: string;
    projectStatus: number;
}

export const Project: React.FC<IProject> = ({projectName, projectType, projectStatus}) => {
    return (
        <div className="mt-[38px] w-[215px] h-[231px] bg-black text-white rounded-2xl m-2">
            <img src={getIcon(projectType)} className="pl-[18px] pt-[18px] h-[51px]"/>
            <span className="pl-[18px] text-[16px] font-bold">{projectName}</span>
            <p>{getStatus(projectStatus)}</p>
        </div>
    );
};

function getIcon(projectType: string) {
    switch (projectType) {
        case "Code":
            return icon3
        case "Game":
            return icon1
        default:
            return icon2
    }
}

function getStatus(projectStatus: number) {
    switch (projectStatus) {
        case 1:
            return "active"
        case 2:
            return "done"
        case 3:
            return "canceled"
        default:
            return "new"
    }
}