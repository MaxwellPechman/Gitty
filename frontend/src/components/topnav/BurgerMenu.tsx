import gitty_icon from "../../assets/icons/gitty.png";
import home_icon from "../../assets/icons/burgerMenu/small/home.png"
import inbox_icon from "../../assets/icons/burgerMenu/small/inbox.png"
import projects_icon from "../../assets/icons/burgerMenu/small/projects.png"
import tasks_icon from "../../assets/icons/burgerMenu/small/tasks.png"
import React from "react";
import {useNavigate} from "react-router-dom";

export function BurgerMenu() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleView() {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="z-50">
            <button className="flex flex-col gap-y-1 cursor-pointer" type="button" onClick={toggleView}>
                <VerticalLine/>
                <VerticalLine/>
                <VerticalLine/>
            </button>
            <div
                className={isOpen ? "transition duration-300 w-[calc(100vw-327px)] h-screen bg-black bg-opacity-20 absolute top-0 ml-[311px]" : "hidden"}
                onClick={toggleView}>
            </div>
            <div
                className={isOpen ? "transition duration-300 top-0 absolute" : "hidden"}>
                <div
                    className={"w-[327px] h-screen absolute bg-code-grey-700 border-code-border-gray border-2 -ml-4 rounded-r-2xl"}>
                    <img src={gitty_icon} className="w-[30px] m-[22px]" alt="Logo"/>
                    <ul className="flex flex-col gap-y-4 text-code-grey-500 text-burger px-[22px]">
                        <li className="flex hover:cursor-pointer hover:border-2 border-gray-500" onClick={() => navigate("/home")}><img src={home_icon} className="pr-[9px]" alt=""/>Home</li>
                        <li className="flex hover:cursor-pointer hover:border-2 border-gray-500" onClick={() => navigate("/inbox")}><img src={inbox_icon} className="pr-[9px]" alt=""/>Inbox</li>
                        <li className="flex hover:cursor-pointer hover:border-2 border-gray-500" onClick={() => navigate("/projects")}><img src={projects_icon} className="pr-[9px] mt-1 w-7 h-6" alt=""/>My projects</li>
                        <li className="flex hover:cursor-pointer hover:border-2 border-gray-500" onClick={() => navigate("/tasks")}><img src={tasks_icon} className="pr-[9px]" alt=""/>My tasks</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function VerticalLine() {
    return <div className="w-[21px] h-[1px] bg-code-grey-300"/>
}