import { createContext, useState } from "react";
import { ChildrenProps } from "../ChildrenProps.tsx";

type FolderFocusType = {
    id: number
    setId: (id: number) => void
}

const defaultId = -1

const EmptyFolderFocusObj: FolderFocusType = {
    id: defaultId,
    setId: () => {}
}

export const FolderFocusContext = createContext<FolderFocusType>(EmptyFolderFocusObj)

export function FolderFocusProvider({ children }: ChildrenProps) {
    const [ id, setId ] = useState(defaultId);

    return (
        <FolderFocusContext.Provider value={{ id: id, setId: setId }}>
            { children }
        </FolderFocusContext.Provider>
    )
}