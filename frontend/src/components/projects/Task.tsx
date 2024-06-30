import {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "./ag-theme-TaskGrid.css";
import {requestUserTasks, updateTaskStatus} from "../../api/Api.ts";

export interface ITask {
    tid: number,
    Taskname: string,
    Project: string,
    Status: string,
    Action: string
}

export function Tasks() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [userId] = useState<string>(localStorage.getItem("sessionID") || "")
    useEffect(() => {
        requestUserTasks(userId).then((data) => {
            setTasks(data)
        })
    }, [])

    const actionComponent = (props: any) => {
        return (
            <select className="w-full h-full bg-code-grey-800"
                    defaultValue={props.data.Status}
                    onChange={(event) => {
                        updateTaskStatus(Number(event.target.value), props.data.tid)
                    }}>
                <option value="0">new</option>
                <option value="1">active</option>
                <option value="2">done</option>
                <option value="3">canceled</option>
            </select>
        )
    }

    const [colDefs] = useState<any>([
        {field: "Taskname", flex: 10},
        {field: "Project", flex: 3},
        {field: "Status", flex: 2, cellRenderer: actionComponent},
        {field: "Action", flex: 2}
    ])

    return (
        <div className="ag-theme-TaskGrid" style={{height: 350}}>
            <AgGridReact rowData={tasks} columnDefs={colDefs} className=""/>
        </div>
    )
}