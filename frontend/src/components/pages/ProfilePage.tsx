import {Topnav} from "../topnav/Topnav.tsx";
import {useQuery} from "@tanstack/react-query";
import {requestUserProfile} from "../../api/Api.ts";
import {useNavigate} from "react-router-dom";

export function ProfilePage() {
    const sessionID = localStorage.getItem("sessionID")
    const navigate = useNavigate();

    if(sessionID == null) {
        return
    }

    const profileRequest = useQuery({
        queryKey: [sessionID],
        queryFn: () => requestUserProfile({session: sessionID})
    })

    if(profileRequest.isLoading) {
        return <div>Loading...</div>
    }

    if(profileRequest.isError) {
        return <div>Error...</div>
    }

    return (
        <div className="w-screen min-h-screen h-full bg-code-grey-950">
            <Topnav/>
            <div className="mt-12 w-screen flex gap-x-12 justify-around">
                <div className="flex flex-col gap-y-6">
                    <img className="border-2 rounded border-code-grey-700" src={""} alt={"profile_image"}/>
                    <ul className="flex flex-col gap-y-4">
                        <label className="font-roboto text-code-grey-500">Username</label>
                        <input placeholder={profileRequest.data?.username} disabled={true} className="p-1 pl-2 rounded-2xl bg-transparent border-code-login-gray border-[1px]"/>
                        <label className="font-roboto text-code-grey-500">E-Mail</label>
                        <input placeholder={profileRequest.data?.mail} disabled={true} className="p-1 pl-2 rounded-2xl bg-transparent border-code-login-gray border-[1px]"/>
                    </ul>
                </div>
                <div className="w-[70%] flex flex-col gap-y-6">
                    <h1 className="text-[30px] text-code-grey-500">Projects</h1>
                    <div
                        className="min-h-[200px] p-2 flex bg-code-grey-800 border-2 border-code-border-projects rounded-2xl">
                        {profileRequest.data?.projects === undefined ?
                            <div>No Projects involved</div>
                            :
                            <div className="w-full">
                                {profileRequest.data?.projects.map((project) => {
                                    return (
                                        <div>
                                            <div className="hover:bg-code-project-detail hover:cursor-pointer rounded-2xl p-2"
                                                 onClick={() => navigate(`/project/${project.pid}`)}>
                                                <h1 className="text-2xl font-bold">{project.projectName}</h1>
                                                <span className="text-[12px]">{project.projectType}</span>
                                                <div className="flex flex-row justify-end -mt-[19px]">
                                                    <span
                                                        className="text-[12px]">Created: {project.created}</span>
                                                    <span
                                                        className="text-[12px] mx-2">Updated: {project.lastUpdated}</span>
                                                </div>
                                            </div>
                                            <hr className="my-2"/>
                                        </div>
                                    )
                                })}
                            </div>}
                    </div>
                    <h1 className="text-[30px] text-code-grey-500">Tasks</h1>
                    <div
                        className="min-h-[230px] p-2 flex bg-code-grey-800 border-2 border-code-border-projects rounded-2xl">
                        {profileRequest.data?.tasks === undefined ?
                            <div>No Tasks involved</div>
                            :
                            <div className="w-full">
                                {profileRequest.data?.tasks.map((task) => {
                                    console.log(task)
                                    return (
                                        <div>
                                            <div className="hover:bg-code-project-detail rounded-2xl p-2">
                                                <h1 className="text-2xl font-bold">{task.task_name}</h1>
                                                <span className="text-[12px]">{task.project_name}</span>
                                                <span className="text-[12px] ml-10">Status: {task.task_status}</span>
                                            </div>
                                            <hr className="my-2"/>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}