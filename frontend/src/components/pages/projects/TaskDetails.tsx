import {useNavigate, useParams} from "react-router-dom";
import {Topnav} from "../../topnav/Topnav.tsx";
import {useEffect, useState} from "react";
import {ITask} from "./Task.tsx";
import {getTaskById, updateTaskDescription, updateTaskStatus} from "../../../api/Api.ts";
import {useDebounce} from "use-debounce";

export function TaskDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        getTaskById(Number(id)).then((data) => {
            setTask(data[0])
        })
    }, [id]);

    return (
        <div className="h-screen bg-code-grey-950">
            <Topnav />
            <div className="m-4">
                <button className="text-4xl text-code-grey-500" onClick={() => navigate(-1)}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <DescriptionArea Name={task?.Taskname}
                                     Description={task?.Description}
                                     Id={Number(task?.tid)}
                                     Status={Number(task?.Status)}/>
                </div>
            </div>
        </div>
    )
}

function DescriptionArea({Name, Description, Id, Status}: {
    Name: string | undefined,
    Description: string | undefined,
    Id: number,
    Status: number
}) {
    if (Name === undefined || Description === undefined) {
        return <></>
    }

    const [desc, setDesc] = useState(Description)
    const [value] = useDebounce(desc, 300)

    useEffect(() => {
        updateTaskDescription(Id, value)
    }, [value]);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <h1>{Name}</h1>
                <select className="bg-code-grey-950" onChange={(event) => {
                    updateTaskStatus(Number(event.target.value), Id)
                }}
                        defaultValue={Status}>
                    <option key={0} value={0}>New</option>
                    <option key={1} value={1}>Active</option>
                    <option key={2} value={2}>Done</option>
                    <option key={3} value={3}>Canceled</option>
                </select>
            </div>
            <hr className="my-5"/>
            <span className="text-code-grey-500">Description:</span>
            <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2"
                      rows={4}
                      value={desc}
                      onChange={(event) => {
                          setDesc(event.target.value)
                      }}
            />
            <hr className="my-5"/>
        </>
    )
}
