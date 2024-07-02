import file_img from "../../../assets/icons/folder/small/file.png"
import folder_img from "../../../assets/icons/folder/small/folder.png"
import {FileElement} from "../../../types/filesystem.ts";
import {useContext} from "react";
import {FolderFocusContext} from "../../providers/FolderFocusProvider.tsx";
import clsx from "clsx";

export function FileArea({ files } : { files: FileElement[] } ) {
    const rootFiles = files.filter((file) => file.parentDir === null)

    return (
        <div className="w-full h-360 border border-code-border-projects rounded-2xl p-2 mt-2 overflow-y-scroll">
            {
                rootFiles.map((file) => {
                    return (
                        <div key={file.id}>
                            {
                                file.isDir ?
                                    <FolderView folder={file}/>
                                    :
                                    <FileView file={file}/>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

function FolderView({ folder } : { folder: FileElement }) {
    const folderFocusContext = useContext(FolderFocusContext)

    return (
        <div className="pl-3">
            <div className={clsx(folderFocusContext.id === folder.id ?
                "flex flex-row p-1 bg-code-grey-500 rounded-2xl cursor-pointer" :
                "flex flex-row p-1 hover:bg-code-grey-500 rounded-2xl cursor-pointer")}
                 onClick={() => folderFocusContext.setId(folder.id)}>
                <img src={folder_img} alt="folder_img"/>
                <span>{folder.name}</span>
            </div>
            {
                folder.children === undefined ?  <></>
                    :
                folder.children.map((folderChildren) => {
                    return (
                        <>
                            {
                                folderChildren.isDir ?
                                    <FolderView folder={folderChildren}/>
                                    :
                                    <FileView file={folderChildren}/>
                            }
                        </>
                    )
                })

            }
        </div>
    )
}

function FileView({file}: { file: FileElement }) {
    return (
        <div key={file.id} className="flex flex-row p-1 hover:bg-code-grey-500 rounded-2xl">
            <img src={file_img} alt="file_img"/>
            <a href={file.file_content} className="text-white" download={file.name}>{file.name}</a>
        </div>
    )
}