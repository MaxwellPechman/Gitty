import {FilesystemItem} from "../../../types/filesystem.ts";
import {useState, useContext} from "react";
import folder from "../../../assets/icons/folder/small/folder.png";
import file from "../../../assets/icons/folder/small/file.png";
import {focusedFolderContext} from "../ProjectDetails.tsx";

export function FolderView({children}: FilesystemItem) {
    const [showChildren, setShowChildren] = useState(false);
    const [setFocusedFolder] = useContext(focusedFolderContext);
    if (children === undefined) {
        return <></>;
    }

    return (
        <div className="pl-3">
            {
                children.map((child) => {
                    return (
                        <div key={child.id}>
                            {
                                child.isDir ?
                                    <div>
                                        <div className="flex flex-row p-1 hover:bg-code-grey-500 rounded-2xl"
                                             onClick={() => {
                                                 setShowChildren(!showChildren);
                                                 setFocusedFolder(child.id);
                                             }}>
                                            <img src={folder} alt="Folder"/>
                                            <span>{child.name}</span>
                                        </div>
                                        <div className={showChildren ? "visible" : "hidden"}>
                                            <FolderView id={child.id}
                                                        name={child.name}
                                                        isDir={child.isDir}
                                                        children={child.children}
                                                        parentDir={child.parentDir}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <ElementView fileName={child.name} id={child.id} content={child.file_content}/>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

function ElementView({fileName, id, content}: any) {

    return (
        <div key={id} className="flex flex-row p-1 hover:bg-code-grey-500 rounded-2xl">
            <img src={file} alt="File" />
            <a href={content} className="text-white" download={fileName} >{fileName}</a>
        </div>
    )
}