import {Topnav} from "../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, createContext} from "react";
import {createFolder, fetchFileSystem, getProjectById, getProjectTasks, uploadFile} from "../../api/Api.ts";
import {projectDetails} from "../../types/project.ts";
import {FilesystemItem} from "../../types/filesystem.ts";
import {ITask} from "../projects/Task.tsx";
import {AgGridReact} from "ag-grid-react";
import {FolderView} from "./projects/Folderview.tsx";

export const focusedFolderContext = createContext<number | undefined>(undefined);

export function ProjectDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ items, setItems] = useState<FilesystemItem[]>([]);
    const [ projectData, setProjectData] = useState<projectDetails>();
    const [ folderName, setFolderName] = useState("");
    const [ focusedFolder, setFocusedFolder] = useState<number>();
    useEffect(() => {
        getProjectById({id: Number(id)}).then((data) => {
            setProjectData(data[0])
        })

        fetchFileSystem({id: Number(id)}).then((data) => setItems(data))
    }, [id])

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
        getProjectTasks(Number(id)).then((data) => {
            setTasks(data)
        })
    }, [])

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="m-4">
                <button className="text-4xl text-code-grey-500" onClick={() => navigate(-1)}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <div className="flex items-center justify-center w-full">
                        <h1>{projectData?.project_name}</h1>
                    </div>
                    <hr className="my-5"/>
                    <span className="text-code-grey-500">Description:</span>
                    <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2" rows={4} value={projectData?.project_description}></textarea>
                    <hr className="my-5"/>
                    <div className="flex flex-row">
                        <div className="w-2/3">
                            <span className="text-code-grey-500">Folder:</span>
                            <input type="text"
                                   className="pl-2 bg-transparent ml-2 rounded-2xl border-white border-[1px]"
                                   placeholder="Foldername"
                                   onChange={(event) => {
                                    setFolderName(event.target.value);
                            }}/>
                            <button className="bg-white text-black w-24 rounded-2xl justify-end ml-5"
                            onClick={() => {
                                createFolder(Number(id), focusedFolder === undefined ? null : focusedFolder, folderName);
                                window.location.reload();
                            }}>Add Folder
                            </button>
                            <input type="file" name="file" onChange={(event) => {
                                // @ts-ignore
                                convertFileToBase64(event.target.files[0]).then((data) => {
                                   // @ts-ignore
                                    uploadFile(Number(id), focusedFolder, event.target.files[0].name, data)
                                });
                            }}
                                className="p-2 rounded-2xl"></input>
                            <div className="w-full h-360 border border-code-border-projects rounded-2xl p-2 mt-2 overflow-y-scroll">
                                <focusedFolderContext.Provider value={focusedFolder}>
                                    <FolderView id={0} name={""} isDir={true} parentDir={null} children={items} />
                                </focusedFolderContext.Provider>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <span className="text-code-grey-500">Tasks:</span>
                            <div className="w-full border border-code-border-projects rounded-2xl p-2">
                                <div className="ag-theme-TaskGrid" style={{height: 350}}>
                                    <AgGridReact rowData={tasks} columnDefs={colDefs}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function convertFileToBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result);
        }
        reader.onerror = reject;
    })
}