import {useState} from "react";
import {Project} from "../../../types/project.ts";
import {createProject, createTask} from "../../../api/Api.ts";
import {Topnav} from "../../topnav/Topnav.tsx";
import {Projects} from "./Project.tsx";
import {Tasks} from "./Task.tsx";
import {projectTypes} from "../../../utils/projects.ts";
import {useSessionStore} from "../../../stores/SessionStore.ts";
import {useProjectsStore} from "../../../stores/ProjectsStore.ts";
import {Task} from "../../../types/task.ts";
import {useTasksStore} from "../../../stores/TasksStore.ts";

export function ProjectsPage() {
    const { sessionId} = useSessionStore()
    const { projects, updateProjects } = useProjectsStore();
    const { updateTasks } = useTasksStore();
    const [showProjectsTab, setShowProjectsTab] = useState(false);
    const [showTaskTab, setShowTaskTab] = useState(false);
    const [project, setProject] = useState<Project>({
        pid: 0,
        projectName: "Introduction",
        projectStatus: true,
        projectType: 0,
        projectDescription: ""
    })
    const [task, setTask] = useState<Task>({
        tid: 0,
        taskName: "",
        projectName: "",
        taskDescription: "",
        status: 0
    })

    function toggleViewProjects() {
        setProject({
            pid: 0,
            projectName: "",
            projectStatus: project.projectStatus,
            projectType: 0,
            projectDescription: ""
        })

        setShowProjectsTab((prev) => !prev)
    }

    function toggleViewTasks() {
        setTask({
            tid: 0,
            taskName: "",
            projectName: "",
            taskDescription: "",
            status: 0
        })

        setShowTaskTab((prev) => !prev)
    }

    function createProjectEvent() {
        createProject({
            sessionId: sessionId,
            project: project
        }).then((pid) => {
            toggleViewProjects()
            updateProjects({
                pid: pid.pid,
                projectName: project.projectName,
                projectDescription: project.projectDescription,
                projectStatus: project.projectStatus,
                projectType: project.projectType
            })
            setProject({
                pid: 0,
                projectName: "",
                projectStatus: project.projectStatus,
                projectType: 0,
                projectDescription: ""
            })
        })
    }

    function createTaskEvent() {
        const adjustedTask: Task = {
            tid: task.tid,
            taskName: task.taskName,
            projectName: task.projectName === "" ? projects[0].projectName : task.projectName,
            taskDescription: task.taskDescription,
            status: task.status
        }

        createTask({
            sessionId: sessionId,
            task: adjustedTask
        }).then((tid) => {
            toggleViewTasks()
            updateTasks({
                tid: tid.tid,
                taskName: task.taskName,
                projectName: task.projectName === "" ? projects[0].projectName : task.projectName,
                taskDescription: task.taskDescription,
                status: task.status
            })
            setTask({
                tid: 0,
                taskName: "",
                projectName: "",
                taskDescription: "",
                status: 0
            })
        })
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
                        className="bg-code-grey-800 h-[308px] rounded-2xl mt-4 border-code-border-projects border-[1px] flex overflow-x-scroll">
                        <Projects/>
                    </div>
                </div>
            </div>
            <div className={showProjectsTab ? "float-right" : "hidden"}>
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
                            as well as information <br/>regarding the allocation.</p>
                        <p className="text-[16px] mt-6 text-code-grey-500">Title</p>
                        <input type="text"
                               className="w-[475px] bg-code-grey-800 h-8 mt-2 border-code-login-gray border-[1px] rounded-[10px] pl-2"
                               value={project.projectName}
                               onChange={(event) => setProject({
                                   projectName: event.target.value,
                                   projectType: project.projectType,
                                   pid: project.pid,
                                   projectStatus: project?.projectStatus,
                                   projectDescription: project.projectDescription
                               })}/>
                        <div className="flex justify-between flex-row">
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Project type</p>
                                <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl pl-2"
                                        onChange={(event) => {
                                            setProject({
                                                pid: project.pid,
                                                projectName: project.projectName,
                                                projectType: parseInt(event.target.value),
                                                projectStatus: project.projectStatus,
                                                projectDescription: project.projectDescription
                                            })
                                        }}>
                                    {projectTypes.map((types, index) => (
                                        <option value={types.code} key={index}>{types.type}</option>
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
                            value={project.projectDescription}
                            onChange={(event) => setProject({
                                pid: project.pid,
                                projectName: project.projectName,
                                projectType: project.projectType,
                                projectStatus: project.projectStatus,
                                projectDescription: event.target.value
                            })}></textarea>
                        <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]"
                                onClick={() => createProjectEvent()}>Create project
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-around mt-[37px]">
                <div className="w-9/12 h-[363px]">
                    <span className="text-[30px] text-code-grey-500 ml-4">My tasks</span>
                    <button
                        className="ml-[31px] border-code-border-gray border-[1px] text-[14px] p-1 rounded-xl text-white w-40 hover:bg-white hover:text-black"
                        disabled={projects.length === 0}
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
                               value={task.taskName}
                               onChange={(event) => setTask({
                                   tid: task.tid,
                                   taskName: event.target.value,
                                   projectName: task.projectName,
                                   taskDescription: task.taskDescription,
                                   status: task.status
                               })}/>
                        <div className="flex justify-between flex-row">
                            <div>
                                <p className="text-[16px] mt-2 text-code-grey-500">Project</p>
                                <select className="w-[244px] h-7 mt-2 bg-code-grey-800 rounded-2xl pl-2"
                                        onChange={(event) => setTask({
                                            tid: task.tid,
                                            taskName: task.taskName,
                                            projectName: event.target.value,
                                            taskDescription: task.taskDescription,
                                            status: task.status
                                        })}>
                                    {projects.map((project, index) => (
                                        <option value={project.projectName} key={index}>{project.projectName}</option>
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
                            value={task.taskDescription}
                            onChange={(event) => setTask({
                                tid: task.tid,
                                taskName: task.taskName,
                                projectName: task.projectName,
                                taskDescription: event.target.value,
                                status: task.status
                            })}></textarea>
                        <button className="mt-7 w-[474px] h-7 bg-white text-code-grey-800 rounded-2xl text-[14px]"
                                onClick={() => createTaskEvent()}>Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}