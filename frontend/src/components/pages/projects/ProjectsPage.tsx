import {useEffect, useState} from "react";
import {newProject, newTask, Project} from "../../../types/project.ts";
import {createProject, createTask, requestUserProjects} from "../../../api/Api.ts";
import {Topnav} from "../../topnav/Topnav.tsx";
import {Projects} from "./Project.tsx";
import {Tasks} from "./Task.tsx";
import {useProjectsStore} from "../../../stores/ProjectsStore.ts";

const emptyProject: Project = {
    pid: 0,
    projectName: "",
    projectStatus: true,
    projectType: 0,
    projectDescription: ""
}

export function ProjectsPage() {
    const [userId] = useState<string>(localStorage.getItem("sessionID") || "");
    const [showTaskTab, setShowTaskTab] = useState(false);
    const [showProjectsTab, setShowProjectsTab] = useState(false);
    const [optionsTask, setOptionsTask] = useState<newProject[]>([])
    const [task, setTask] = useState<newTask>({
        tid: 0,
        taskName: "",
        taskStatus: 0,
        taskPid: "",
        taskDescription: "",
        uid: userId
    })

    useEffect(() => {
        requestUserProjects(userId || "").then((data) => {
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
    }, []);

    function toggleViewTasks() {
        setShowTaskTab((prev) => !prev)
    }

    function toggleViewProjects() {
        setShowProjectsTab((prev) => !prev)
    }

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="flex justify-around mt-[54px]">
                <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My projects</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black"
                        onClick={toggleViewProjects}>+ Create project
                    </button>
                    <div
                        className="bg-code-grey-800 h-[308px] rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll noScrollbar">
                        <Projects/>
                    </div>
                </div>
            </div>
            <div className={showProjectsTab ? "float-right" : "hidden"}>
                <ProjectCreationDialog toggleViewProjects={toggleViewProjects}/>
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
                                        <option value={taskOption.projectName}
                                                key={taskOption.pid}>{taskOption.projectName}</option>
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
                                })}>Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectCreationDialog({ toggleViewProjects }: { toggleViewProjects: () => void }) {
    const [ project, setProject ] = useState<Project>(emptyProject)
    const { projects, updateProjects } = useProjectsStore();

    function createProjectEvent(newProject: Project) {
        createProject({
            project: newProject,
            sessionId: localStorage.getItem("sessionId") ?? "",
        }).then((pid) => {
            toggleViewProjects()
            setProject(emptyProject)
            updateProjects({
                pid: pid.pid,
                projectName: newProject.projectName,
                projectDescription: newProject.projectDescription,
                projectType: newProject.projectType,
                projectStatus: newProject.projectStatus
            })
        })
    }

    return (
        <div className="top-[233px] h-[627px] w-[544px] bg-code-project-detail absolute z-50 right-0 rounded-2xl">
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
                           pid: project.pid,
                           projectName: event.target.value,
                           projectType: project.projectType,
                           projectStatus: project?.projectStatus,
                           projectDescription: project.projectDescription
                       })}/>
                <div className="flex justify-between flex-row">
                    <div>
                        <p className="text-[16px] mt-2 text-code-grey-500">Project type</p>
                        <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl pl-2"
                                onChange={(event) => setProject({
                                    pid: project.pid,
                                    projectName: project.projectName,
                                    projectType: projectTypeToCode(event.target.value),
                                    projectStatus: project.projectStatus,
                                    projectDescription: project.projectDescription,
                                })}>
                            {projects.map((projectOption) => (
                                <option value={projectOption.projectType} key={projectOption.pid}>{projectOption.projectName}</option>
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
                    placeholder="What is your project about..."
                    onChange={(event) => setProject({
                        pid: project.pid,
                        projectName: project.projectName,
                        projectType: project.projectType,
                        projectStatus: project.projectStatus,
                        projectDescription: event.target.value
                    })}/>
                <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]"
                        onClick={() => createProjectEvent(project)}>Create project
                </button>
            </div>
        </div>
    )
}

function projectTypeToCode(projectType: string) {
    switch (projectType) {
        case "Code":
            return 1
        case "Game":
            return 2
        case "Website":
            return 3
        case "Database":
            return 4
        default:
            return 0
    }
}