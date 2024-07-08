import {Topnav} from "../../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {
    createFile,
    fetchFileSystem,
    getProjectById,
    getProjectTasks,
    updateProjectDescription, updateProjectStatus,
    uploadFile
} from "../../../api/Api.ts";
import {projectDetails} from "../../../types/project.ts";
import {FileElement} from "../../../types/filesystem.ts";
import {ITask} from "./Task.tsx";
import {convertFileToBase64} from "../../../utils/files.ts";
import {FolderFocusContext} from "../../providers/FolderFocusProvider.tsx";
import {FileArea} from "./FileArea.tsx";
import {useDebounce} from "use-debounce";
import {useQuery} from "@tanstack/react-query";

export function ProjectDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ items, setItems] = useState<FileElement[]>([]);
    const [ projectData, setProjectData] = useState<projectDetails>();
    const idRef = useRef(0)

    if(id !== undefined) {
        idRef.current = parseInt(id)
    }

    useEffect(() => {
        getProjectById({id: Number(id)}).then((data) => {
            setProjectData(data[0])
        })

        fetchFileSystem({id: Number(id)}).then((data) => setItems(data))
    }, [id])

    console.log(projectData)

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="m-4">
                <button className="text-4xl text-code-grey-500 hover:text-white transition duration-200 ease-in-out cursor-pointer"
                        onClick={() => navigate(-1)}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <DescriptionArea projectName={projectData?.project_name}
                                     projectDescription={projectData?.project_description}
                                     pid={Number(projectData?.pid)}
                                     projectStatus={projectData?.active ? "true" : "false"}/>
                    <div className="flex flex-row gap-x-4">
                        <div className="w-2/3">
                            <FolderToolbar id={idRef.current}/>
                            <FileArea files={items}/>
                        </div>
                        <TasksArea id={idRef.current}/>
                    </div>
                </div>
            </div>
        </div>
    )
}



function TasksArea({ id }: { id: number }) {
    const [tasks, setTasks] = useState<ITask[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        getProjectTasks(id).then((data) => {
            setTasks(data)
        })
    }, [])

    return (
        <div className="w-1/3">
            <span className="text-code-grey-500">Tasks:</span>
            <div className="w-full border border-code-border-projects rounded-2xl p-2 mx-2">
                <div className="flex flex-row m-2">
                    <span className="w-[50%]">Task name</span>
                    <span className="w-[25%]">Project</span>
                    <span className="w-[15%]">Status</span>
                    <span className="w-[15%]">Action</span>
                </div>
                <hr/>
                {tasks.map((task: ITask) => {
                    let status: string
                    switch (task.Status) {
                        case 0:
                            status = "new"
                            break
                        case 1:
                            status = "active"
                            break
                        case 2:
                            status = "done"
                            break
                        default:
                            status = "canceled"
                            break
                    }

                    return (
                        <div key={task.tid}>
                            <div className="flex flex-row py-3 hover:bg-code-grey-500"
                                 onClick={() => {
                                     navigate("/task/" + task.tid)
                                 }}>
                                <span className="w-[50%]">{task.Taskname}</span>
                                <span className="w-[25%]">{task.Project}</span>
                                <span className="w-[15%]">{status}</span>
                                <button className="w-[15%] text-start h-full">...</button>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function FolderToolbar({id}: { id: number }) {
    const [folderName, setFolderName] = useState("")
    const folderFocusContext = useContext(FolderFocusContext);

    function fileAddEvent() {
        createFile(id, folderFocusContext.id, folderName).then(() => {
            window.location.reload();
        });
    }

    function fileRemoveEvent() {
        window.location.reload();
    }

    function fileUploadEvent(event: any) {
        convertFileToBase64(event.target.files[0]).then((file) => {
            uploadFile(id, folderFocusContext.id, event.target.files[0].name, file)
        });
    }

    return (
        <div className="flex gap-x-1 items-center">
            <span className="text-code-grey-500">Folder:</span>
            <input type="text"
                   className="pl-3 bg-transparent ml-2 rounded-2xl border-white border-[1px]"
                   placeholder="Foldername"
                   onChange={(event) => {
                       setFolderName(event.target.value);
                   }}/>
            <div className="mx-2">
                <button className="mx-1 p-1 bg-white text-black w-24 rounded-sm justify-end"
                        onClick={() => {
                            fileAddEvent()
                        }}>Add File
                </button>
                <button className="mx-1 p-1 bg-white text-black w-24 rounded-sm justify-end"
                        onClick={() => {
                            fileRemoveEvent()
                        }}>Remove File
                </button>
            </div>
            <input type="file"
                   name="file"
                   className="p-2 rounded-2xl"
                   onChange={(event) => {
                       fileUploadEvent(event)
                   }}
            />
        </div>
    )
}

function DescriptionArea({projectName, projectDescription, pid, projectStatus}: {
    projectName: string | undefined,
    projectDescription: string | undefined,
    pid: number,
    projectStatus: string
}) {
    if (projectName === undefined || projectDescription === undefined) {
        return <></>
    }

    const [desc, setDesc] = useState(projectDescription)
    const [value] = useDebounce(desc, 300)

    const descRequest = useQuery({
        queryKey: [pid, value],
        queryFn: () => updateProjectDescription(pid, value)
    })

    if(descRequest.isError) {
        return <div>Error...</div>
    }
    if(descRequest.isLoading) {
        return <div>Loading...</div>
    }

    console.log(projectStatus)

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-x-4">
                <h1>{projectName}</h1>
                <select className="bg-code-grey-950" onChange={(event) => {
                    updateProjectStatus(event.target.value === "true", pid)
                }}
                    defaultValue={projectStatus}>
                    <option key="true" value="true">Active</option>
                    <option key="false" value="false">Done</option>
                </select>
            </div>
            <hr className="my-5"/>
            <span className="text-code-grey-500">Description:</span>
            <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2"
                      rows={4}
                      value={desc}
                      onChange={(event) => {
                          setDesc(event.target.value);
                      }}/>
            <hr className="my-5"/>
        </>
    )
}
