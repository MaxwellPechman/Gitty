import {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "./ag-theme-TaskGrid.css";
import {getUserTasks} from "../../api/Api.ts";
import {requestId} from "../../types/project.ts";

export interface ITask {
    Taskname: string,
    Project: string,
    Status: string,
    Action: string
}

export function Tasks() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [userId, setUserId] = useState<requestId>({id: 1})

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