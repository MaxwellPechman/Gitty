import icon_search from "../../assets/icons/search.png"
import {useContext} from "react";
import {SearchBarContext} from "../providers/SearchBarProvider.tsx";

export function Searchbar() {
    const searchBarContext = useContext(SearchBarContext)

    return (
        <div className="w-[372px] h-[30px] bg-code-grey-950 rounded-xl flex items-center">
            <img className="mx-2" src={icon_search} alt="icon_search"/>
            <input className="bg-code-grey-950 focus:outline-none text-code-grey-500"
                   placeholder="Search..."
                   onChange={(event) => searchBarContext.setText(event.target.value)}/>
        </div>
    )
}