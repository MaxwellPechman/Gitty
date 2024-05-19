import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css";


export function Task() {
    var task = [
        {Taskname: "Tesla", Project: "Songwebsite", Working: 1, Status: getStatus(1), Action: "..."},
        {Taskname: "Ford", Project: "Code for a friend", Working: 2, Status: getStatus(2), Action: "..."},
        {Taskname: "Toyota", Project: "Mobile game for IPhone", Working: 3, Status: getStatus(3), Action: "..."},
        {Taskname: "Tesla", Project: "Songwebsite", Working: 1, Status: getStatus(1), Action: "..."},
    ]

    const [rowData, setRowData] = useState(task)
    const [colDefs, setColDefs] = useState([
        {field: "Taskname", flex: 10},
        {field: "Project", flex: 3},
        {field: "Working", flex: 2},
        {field: "Status", flex: 2},
        {field: "Action", flex: 2}
    ])

    return <div className="ag-theme-alpine-dark" style={{height: 350}}>
        <AgGridReact rowData={rowData} columnDefs={colDefs}/>
    </div>
}

function getStatus(projectStatus: number) {
    switch (projectStatus) {
        case 1:
            return "active"
        case 2:
            return "done"
        case 3:
            return "canceled"
        default:
            return "new"
    }
}