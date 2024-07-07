import {useNavigate, useParams} from "react-router-dom";
import {Topnav} from "../../topnav/Topnav.tsx";
import {useEffect, useState} from "react";
import {ITask} from "./Task.tsx";
import {getTaskById} from "../../../api/Api.ts";

export function TaskDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        getTaskById(Number(id)).then((data) => {
            setTask(data[0])
        })
    }, [id]);

    console.log(task)

    return (
        <div className="h-screen bg-code-grey-950">
            <Topnav />
            <div className="m-4">
                <button className="text-4xl text-code-grey-500" onClick={() => navigate(-1)}>&lt;</button>
                <div className="mt-5 mx-10 text-white">
                    <DescriptionArea Name={task?.Taskname}
                                     Description={task?.Description}/>
                </div>
            </div>
        </div>
    )
}

function DescriptionArea({Name, Description}: {
    Name: string | undefined,
    Description: string | undefined
}) {
    if (Name === undefined || Description === undefined) {
        return <></>
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <h1>{Name}</h1>
            </div>
            <hr className="my-5"/>
            <span className="text-code-grey-500">Description:</span>
            <textarea className="bg-transparent w-full border border-code-border-projects rounded-2xl p-2"
                      rows={4}
                      value={Description}
            />
            <hr className="my-5"/>
        </>
    )
}
