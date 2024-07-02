import {Topnav} from "../../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {createFolder, fetchFileSystem, getProjectById, getProjectTasks, uploadFile} from "../../../api/Api.ts";
import {projectDetails} from "../../../types/project.ts";
import {FileElement} from "../../../types/filesystem.ts";
import {ITask} from "./Task.tsx";
import {AgGridReact} from "ag-grid-react";
import {convertFileToBase64} from "../../../utils/files.ts";
import {FolderFocusContext} from "../../providers/FolderFocusProvider.tsx";
import {FileArea} from "./FileArea.tsx";

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
                <button className="text-4xl text-code-grey-500" onClick={() => navigate("/projects")}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <DescriptionArea projectName={projectData?.project_name} projectDescription={projectData?.project_description}/>
                    <div className="flex flex-row">
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

    function handleButtonClick() {
        createFolder(id, folderFocusContext.id, folderName).then(() => {
            window.location.reload();
        });
    }

    function fileUpload(event: any) {
        convertFileToBase64(event.target.files[0]).then((file) => {
            uploadFile(id, null, event.target.files[0].name, file)
        });
    }

    return (
        <>
            <span className="text-code-grey-500">Folder:</span>
            <input type="text"
                   className="pl-3 bg-transparent ml-2 rounded-2xl border-white border-[1px]"
                   placeholder="Foldername"
                   onChange={(event) => {
                       setFolderName(event.target.value);
                   }}/>
            <button className="p-1 bg-white text-black w-24 rounded-sm justify-end ml-5"
                    onClick={() => {handleButtonClick()}}>Add Folder
            </button>
            <input type="file"
                   name="file"
                   className="p-2 rounded-2xl"
                   onChange={(event) => {fileUpload(event)}}
            />
        </>
    )
}

function DescriptionArea({projectName, projectDescription}: {
    projectName: string | undefined,
    projectDescription: string | undefined
}) {
    if (projectName === undefined || projectDescription === undefined) {
        return <></>
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <h1>{projectName}</h1>
            </div>
            <hr className="my-5"/>
            <span className="text-code-grey-500">Description:</span>
            <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2"
                      rows={4}
                      value={projectDescription}/>
            <hr className="my-5"/>
        </>
    )
}
