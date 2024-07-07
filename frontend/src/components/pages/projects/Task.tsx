import {useEffect, useState} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "./ag-theme-TaskGrid.css";
import {requestUserTasks} from "../../../api/Api.ts";
import {useNavigate} from "react-router-dom";

export interface ITask {
    tid: number,
    Taskname: string,
    Project: undefined | string,
    Status: number,
    Action: undefined | string,
    Description: undefined | string
}

export function Tasks() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<ITask[]>([])
    const [userId] = useState<string>(localStorage.getItem("sessionID") || "")
    useEffect(() => {
        requestUserTasks(userId).then((data) => {
            setTasks(data)
        })
    }, [])

    return (
        <div className="w-full border-code-login-gray border-[1px] rounded-2xl p-2">
            <div className="flex flex-row my-2">
                <span className="w-[50%]">Task name</span>
                <span className="w-[25%]">Project</span>
                <span className="w-[15%]">Status</span>
                <span className="w-[15%]">Action</span>
            </div>
            <hr/>
            {tasks.map((task: ITask) => {
                let status: string
                switch (task.Status) {
                    case 0:
                        status = "new"
                        break
                    case 1:
                        status = "active"
                        break
                    case 2:
                        status = "done"
                        break
                    default:
                        status = "canceled"
                        break
                }

                return (
                    <div key={task.tid}>
                        <div className="flex flex-row py-3 hover:bg-code-grey-500"
                             onClick={() => {
                                 navigate("/task/" + task.tid)
                             }}>
                            <span className="w-[50%]">{task.Taskname}</span>
                            <span className="w-[25%]">{task.Project}</span>
                            <span className="w-[15%]">{status}</span>
                            <button className="w-[15%] text-start h-full">...</button>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}