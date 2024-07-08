import {useNavigate} from "react-router-dom";
import {useTasksStore} from "../../../stores/TasksStore.ts";
import {getTaskStatus} from "../../../utils/tasks.ts";

export function Tasks() {
    const { tasks } = useTasksStore()
    const navigate = useNavigate();

    return (
        <div className="w-full border-code-login-gray border-[1px] rounded-2xl p-2">
            <div className="flex flex-row my-2">
                <span className="w-[50%]">Task name</span>
                <span className="w-[25%]">Project</span>
                <span className="w-[15%]">Status</span>
                <span className="w-[15%]">Action</span>
            </div>
            <hr/>
            {tasks.map((task) => {
                return (
                    <div key={task.tid}>
                        <div className="flex flex-row py-3 hover:bg-code-grey-500"
                             onClick={() => {
                                 navigate("/task/" + task.tid)
                             }}>
                            <span className="w-[50%]">{task.taskName}</span>
                            <span className="w-[25%]">{task.projectName}</span>
                            <span className="w-[15%]">{getTaskStatus(task.status)}</span>
                            <button className="w-[15%] text-start h-full">...</button>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}