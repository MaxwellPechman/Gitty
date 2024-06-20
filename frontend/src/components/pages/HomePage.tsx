import {Topnav} from "../topnav/Topnav.tsx";
import {Projects} from "../projects/Project.tsx";
import {Tasks} from "../projects/Task.tsx";
import {useEffect, useState} from "react";
import {createProject, createTask, getTypes, getUserProjects} from "../../api/Api.ts";
import {newProject, types, newTask} from "../../types/project.ts";

export function HomePage() {

    const [userId] = useState<string>(localStorage.getItem("sessionID") || "");

    const [showPrjoectsTab, setShowPrjoectsTab] = useState(false);
    const [showTaskTab, setShowTaskTab] = useState(false);
    const [optionsProject, setOptionsProject] = useState<types[]>([])
    const [optionsTask, setOptionsTask] = useState<newProject[]>([])
    const [project, setProject] = useState<newProject>({
        pid: 0,
        projectName: "Introduction",
        projectStatus: true,
        projectType: "Other",
        projectDescription: "",
        uid: userId
    })
    const [task, setTask] = useState<newTask>({
        tid: 0,
        taskName: "",
        taskStatus: 0,
        taskPid: "",
        taskDescription: "ABC",
        uid: userId
    })

    useEffect(() => {
        getUserProjects(userId || "").then((data) => {
            setOptionsTask(data)
            setTask({
                tid: 0,
                taskName: task.taskName,
                taskStatus: task.taskStatus,
                taskPid: data[0].projectName,
                taskDescription: task.taskDescription,
                uid: userId
            })
        });

        getTypes().then((data) => {
            setOptionsProject(data.data)
        });

    }, []);

    function toggleViewProjects() {
        setShowPrjoectsTab((prev) => !prev)
    }

    function toggleViewTasks() {
        setShowTaskTab((prev) => !prev)
    }

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="flex justify-around mt-[54px]">
                <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My projects</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black"
                        onClick={toggleViewProjects}>+
                        Create project
                    </button>
                    <div
                        className="bg-code-grey-800 h-[308px] rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll noScrollbar">
                        <Projects/>
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
                                    onClick={toggleViewProjects}>_
                            </button>
                            <button className="text-[30px] text-code-grey-500 top-1 right-6 absolute"
                                    onClick={toggleViewProjects}>x
                            </button>
                        </div>
                        <p className="text-[14px] text-code-grey-500">A project contains the code and all comments
                            aswell as information <br/>regarding the allocation.</p>
                        <p className="text-[16px] mt-6 text-code-grey-500">Title</p>
                        <input type="text"
                               className="w-[475px] bg-code-grey-800 h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px] pl-2"
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
                                <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl pl-2"
                                        onChange={(event) => setProject({
                                            pid: project.pid,
                                            projectName: project.projectName,
                                            projectType: event.target.value,
                                            projectStatus: project.projectStatus,
                                            projectDescription: project.projectDescription,
                                            uid: project.uid,
                                        })}>
                                    {optionsProject.map((option) => (
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
                        <textarea
                            className="w-[475px] h-[243px] bg-code-grey-800 mt-2 border-code-login-gray border-[1px] rounded-[10px] pl-2"
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
                                onClick={() => createProject(project).then(() => {
                                    toggleViewProjects()
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
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black"
                        onClick={toggleViewTasks}>+
                        Create task
                    </button>
                    <div className="mt-4">
                        <Tasks/>
                    </div>
                </div>
            </div>
            <div className={showTaskTab ? "float-right" : "hidden"}>
                <div
                    className="top-[233px] h-[627px] w-[544px] bg-code-project-detail absolute z-50 right-0 rounded-2xl">
                    <div className="ml-7 mt-7">
                        <div className="flex flex-row">
                            <h1 className="text-[30px] font-roboto">Create a new task</h1>
                            <button className="text-[30px] text-code-grey-500 top-0 right-12 absolute"
                                    onClick={toggleViewTasks}>_
                            </button>
                            <button className="text-[30px] text-code-grey-500 top-1 right-6 absolute"
                                    onClick={toggleViewTasks}>x
                            </button>
                        </div>
                        <p className="text-[14px] text-code-grey-500">A task contains the code and all comments
                            aswell as information <br/>regarding the allocation.</p>
                        <p className="text-[16px] mt-6 text-code-grey-500">Title</p>
                        <input type="text"
                               className="w-[475px] bg-code-grey-800 h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px] pl-2"
                               onChange={(event) => setTask({
                                   tid: task.tid,
                                   taskName: event.target.value,
                                   taskDescription: task.taskDescription,
                                   taskPid: task.taskPid,
                                   taskStatus: task.taskStatus,
                                   uid: task.uid
                               })}/>
                        <div className="flex justify-between flex-row">
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Project</p>
                                <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl pl-2"
                                        onChange={(event) => setTask({
                                            tid: task.tid,
                                            taskName: task.taskName,
                                            taskDescription: task.taskDescription,
                                            taskPid: event.target.value,
                                            taskStatus: task.taskStatus,
                                            uid: task.uid
                                        })}>
                                    {optionsTask.map((taskOption) => (
                                        <option value={taskOption.projectName} key={taskOption.pid}>{taskOption.projectName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Add people to task</p>
                                <button
                                    className="w-[244px] h-7 mt-2 mr-4 bg-code-grey-800 rounded-2xl">PLATZHALTER
                                </button>
                            </div>
                        </div>
                        <p className="text-[16px] mt-2 text-code-grey-500">Description</p>
                        <textarea
                            className="w-[475px] h-[243px] bg-code-grey-800 mt-2 border-code-login-gray border-[1px] rounded-[10px] pl-2"
                            placeholder="What is your task about..."
                            onChange={(event) => setTask({
                                tid: task.tid,
                                taskName: task.taskName,
                                taskDescription: event.target.value,
                                taskPid: task.taskPid,
                                taskStatus: task.taskStatus,
                                uid: task.uid
                            })}></textarea>
                        <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]"
                                onClick={() => createTask(task).then(() => {
                                    toggleViewProjects()
                                    setTask({
                                        tid: 0,
                                        taskName: "",
                                        taskStatus: 0,
                                        taskPid: "",
                                        taskDescription: "",
                                        uid: userId
                                    })
                                    window.location.reload()
                                })}>Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}