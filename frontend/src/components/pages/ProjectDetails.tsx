import {Topnav} from "../topnav/Topnav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createFolder, fetchFileSystem, getProjectById} from "../../api/Api.ts";
import {projectDetails} from "../../types/project.ts";
import folder from "../../assets/icons/folder/small/folder.png";
import file from "../../assets/icons/folder/small/file.png";
import {Directory} from "../../types/filesystem.ts";

export function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ items, setItems] = useState<Directory[]>([]);
    const [ projectData, setProjectData] = useState<projectDetails>();
    useEffect(() => {
        getProjectById({id: Number(id)}).then((data) => {
            setProjectData(data[0])
        })

        fetchFileSystem({id: Number(id)}).then((data) => setItems(data))
    }, [])

    // @ts-ignore
    const RecursiveComponent = ({ data}) => {
        const [showNested, setShowNested] = useState({});
        // @ts-ignore
        const toggleNested = (name) => {
            // @ts-ignore
            setShowNested({ ...showNested, [name]: !showNested[name] });
        };

        return (
            <div className="pl-3">
                {// @ts-ignore
                    data.map((parent) => {
                    return (
                        <div key={parent.name}>
                            <div className="flex flex-row p-1 hover:bg-code-grey-500 rounded-2xl" onClick={() => toggleNested(parent.name)}>
                                <img src={parent.folder ? folder : file} alt=""/>
                                <span>{parent.name}</span>
                            </div>

                            <div className={// @ts-ignore
                                !showNested[parent.name] ? "hidden" : ""}>
                            {parent.children && <RecursiveComponent data={parent.children} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="m-4">
                <button className="text-4xl text-code-grey-500" onClick={() => navigate("/home")}>&lt;</button>
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
                            <button className="bg-white text-black w-24 rounded-2xl justify-end ml-5"
                            onClick={() => createFolder(1, 1, "test")}>Add Folder
                            </button>
                            <button className="bg-white text-black w-24 rounded-2xl justify-end ml-5">Upload File
                            </button>
                            <div className="w-full border border-code-border-projects rounded-2xl p-2 mt-2">
                                <RecursiveComponent data={items} />
                            </div>
                        </div>
                        <div className="w-1/3">
                            <span className="text-code-grey-500">Tasks:</span>
                            <div className="w-full border border-code-border-projects rounded-2xl p-2">
                                TODO: Projecttasks
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}