import { createContext, useState } from "react";
import { ChildrenProps } from "../ChildrenProps.tsx";

type FolderFocusType = {
    id: number | null
    setId: (id: number) => void
}

const EmptyFolderFocusObj: FolderFocusType = {
    id: null,
    setId: () => {}
}

export const FolderFocusContext = createContext<FolderFocusType>(EmptyFolderFocusObj)

export function FolderFocusProvider({ children }: ChildrenProps) {
    const [ id, setId ] = useState<number | null>(null);

    return (
        <FolderFocusContext.Provider value={{ id: id, setId: setId }}>
            { children }
        </FolderFocusContext.Provider>
    )
}