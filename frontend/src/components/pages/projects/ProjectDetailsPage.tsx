import {Topnav} from "../../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {
    createFile,
    fetchFileSystem,
    getProjectById,
    getProjectTasks,
    updateProjectDescription,
    uploadFile
} from "../../../api/Api.ts";
import {projectDetails} from "../../../types/project.ts";
import {FileElement} from "../../../types/filesystem.ts";
import {ITask} from "./Task.tsx";
import {AgGridReact} from "ag-grid-react";
import {convertFileToBase64} from "../../../utils/files.ts";
import {FolderFocusContext} from "../../providers/FolderFocusProvider.tsx";
import {FileArea} from "./FileArea.tsx";
import {useDebounce} from "use-debounce";

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

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="m-4">
                <button className="text-4xl text-code-grey-500 hover:text-white transition duration-200 ease-in-out cursor-pointer"
                        onClick={() => navigate("/projects")}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <DescriptionArea projectName={projectData?.project_name} projectDescription={projectData?.project_description} pid={Number(projectData?.pid)}/>
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

    const actionComponent = (props: any) => {
        return (
            <button onClick={() => console.log(props.data)}>...</button>
        )
    }

    const [colDefs] = useState<any>([
        {field: "Taskname", flex: 5},
        {field: "Project", flex: 4},
        {field: "Status", flex: 2},
        {field: "Action", flex: 2, cellRenderer: actionComponent}
    ])

    useEffect(() => {
        getProjectTasks(id).then((data) => {
            setTasks(data)
        })
    }, [])

    return (
        <div className="w-1/3">
            <span className="text-code-grey-500">Tasks:</span>
            <div className="w-full border border-code-border-projects rounded-2xl p-2">
                <div className="ag-theme-TaskGrid" style={{height: 350}}>
                    <AgGridReact rowData={tasks} columnDefs={colDefs}/>
                </div>
            </div>
        </div>
    )
}

function FolderToolbar({ id } : { id: number }) {
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

function DescriptionArea({projectName, projectDescription, pid}: {
    projectName: string | undefined,
    projectDescription: string | undefined,
    pid: number
}) {
    if (projectName === undefined || projectDescription === undefined) {
        return <></>
    }

    const [desc, setDesc] = useState(projectDescription)
    const [value] = useDebounce(desc, 300)

    useEffect(() => {
        updateProjectDescription(pid, value)
    }, [value]);

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <h1>{projectName}</h1>
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
