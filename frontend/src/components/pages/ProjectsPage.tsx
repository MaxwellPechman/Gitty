import {useEffect, useState} from "react";
import {Topnav} from "../topnav/Topnav.tsx";
import {Projects} from "../projects/Project.tsx";
import {Project, types} from "../../types/project.ts";
import {getTypes, getUserProjects} from "../../api/Api.ts";

export function ProjectsPage() {
    const [userId, setUserId] = useState(1);
    const [optionsProject, setOptionsProject] = useState<types[]>([])
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        getTypes().then((data) => {
            setOptionsProject(data.data)
        })
    }, [])

    useEffect(() => {
        getUserProjects({id: userId}).then((data) => {
            if (data != "") {
                setProjects(data)
            }
        })
        return
    }, [])

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="flex justify-around mt-[54px]">
                <div className="w-9/12">
                    <span className="text-[30px] text-code-grey-500 ml-4">My projects</span>
                    <div
                        className="bg-code-grey-800 rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll noScrollbar">
                        <div onClick={() => console.log("123")}>
                            <Projects/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-around mt-4">
                <div className="w-9/12">
                    <span className="text-[30px] text-code-grey-500 ml-4">Project Description</span>
                    <div className="bg-code-grey-800 h-auto rounded-2xl border-code-border-projects border-[1px] mt-4">
                        <div className="flex">
                            <div className="m-4">
                                <p className="text-[16px] text-code-grey-500">Title:</p>
                                <input type="text"
                                       className="w-96 bg-black h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px]"
                                       placeholder="Project Title"
                                />
                            </div>
                            <div className="m-4">
                                <p className="text-[16px] text-code-grey-500">Type:</p>
                                <select className="w-[244px] h-7 mt-2 bg-black rounded-2xl"
                                >
                                    <option value="">----</option>
                                    {optionsProject.map((option) => (
                                        <option value={option.type_name} key={option.typeId}>{option.type_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="m-4">
                                <p className="text-[16px] text-code-grey-500">Add people to project:</p>
                                <button
                                    className="w-[244px] h-7 mt-2 bg-black rounded-2xl">PLATZHALTER
                                </button>
                            </div>
                            <div className="m-4">
                                <p className="text-[16px] text-code-grey-500">Status:</p>
                                <select className="w-[244px] h-7 mt-2 bg-black rounded-2xl">
                                    <option value="">----</option>
                                    <option value={"true"} key={"true"}>Active</option>
                                    <option value={"false"} key={"false"}>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="ml-4 mr-4">
                            <p className="text-[16px] text-code-grey-500">Description</p>
                            <textarea
                                className="w-full h-[140px] bg-black mt-2 border-code-login-gray border-[1px] rounded-[10px]"
                                placeholder="What is your project about..."></textarea>
                        </div>
                        <div className="m-4">
                            <button className="bg-black hover:bg-white text-white hover:text-black w-24 m-2 rounded-2xl">Save</button>
                            <button className="bg-black hover:bg-white text-white hover:text-black w-24 m-2 rounded-2xl">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}