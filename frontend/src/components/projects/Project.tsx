import icon1 from "../../assets/icons/Icon1.png"
import icon2 from "../../assets/icons/Icon2.png"
import icon3 from "../../assets/icons/Icon3.png"
import progressIcon from "../../assets/icons/projects/small/Progress.png"
import cancelIcon from "../../assets/icons/projects/small/Cancel.png"
import React from "react";

interface IProject {
    projectName: string;
    projectType?: string;
    projectStatus?: number;
}

export const Project: React.FC<IProject> = ({projectName, projectType = "Reaserach", projectStatus = 0}) => {
    return (
        <div className="mt-[38px] min-w-[215px] min-h-[231px] bg-black text-white rounded-2xl m-2">
            <img src={getIcon(projectType)} className="pl-[18px] pt-[18px] h-[51px]"/>
            <div className="mt-[20px]">
                <span className="pl-[18px] text-[16px] font-bold">{projectName}</span>
                <p className="mt-[7px] text-[12px] pl-[18px] text-code-grey-500">{projectType}</p>
            </div>
            <div className="mt-[60px] ml-[17px]">
                <Status projectStatus={projectStatus} projectName={""} projectType={""} />
            </div>
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

const Status: React.FC<IProject> = ({projectName , projectType, projectStatus}) => {
    projectName
    projectType
    switch (projectStatus) {
        case 1:
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