import {useState} from "react";
import {Topnav} from "../topnav/Topnav.tsx";

export function TasksPage() {
    const [userId, setUserId] = useState(1);

    return (
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>

        </div>
    )
}