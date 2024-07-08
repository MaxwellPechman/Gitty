import {createContext, ReactNode, useState} from "react";

type SearchBarContextType = {
    text: string;
    setText: (text: string) => void;
}

const emptySearchBarContextObj: SearchBarContextType = {
    text: "",
    setText: () => {}
}

export const SearchBarContext = createContext<SearchBarContextType>(emptySearchBarContextObj)

export function SearchBarProvider({ children }: { children: ReactNode }) {
    const [ text, setText ] = useState("");

    return (
        <SearchBarContext.Provider value={{ text: text, setText: setText}}>
            {children}
        </SearchBarContext.Provider>
    )
}