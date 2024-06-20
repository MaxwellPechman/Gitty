import {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "./ag-theme-TaskGrid.css";
import {getUserTasks} from "../../api/Api.ts";

export interface ITask {
    Taskname: string,
    Project: string,
    Status: string,
    Action: string
}

export function Tasks() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [userId] = useState<string>(localStorage.getItem("sessionID") || "")
    useEffect(() => {
        getUserTasks(userId).then((data) => {
            setTasks(data)
        })
        return
    }, [])

    const [colDefs] = useState([
        {field: "Taskname", flex: 10},
        {field: "Project", flex: 3},
        {field: "Status", flex: 2},
        {field: "Action", flex: 2}
    ])

    return <div className="ag-theme-TaskGrid" style={{height: 350}}>
        <AgGridReact rowData={tasks} columnDefs={colDefs}/>
    </div>
}