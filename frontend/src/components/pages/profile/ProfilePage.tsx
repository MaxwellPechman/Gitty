import {Topnav} from "../../topnav/Topnav.tsx";
import {useQuery} from "@tanstack/react-query";
import {requestUserProfile, uploadProfilePicture} from "../../../api/Api.ts";
import {useNavigate} from "react-router-dom";
import blank from "../../../assets/icons/profile/large/profile.png"
import {useSessionStore} from "../../../stores/SessionStore.ts";
import {convertFileToBase64} from "../../../utils/files.ts";

export function ProfilePage() {
    const { sessionId } = useSessionStore()
    const navigate = useNavigate();

    const profileRequest = useQuery({
        queryKey: [sessionId],
        queryFn: () => requestUserProfile({session: sessionId})
    })

    if(profileRequest.isError) {
        return <div>Error...</div>
    }

    return (
        <div className="w-screen min-h-screen h-full bg-code-grey-950">
            <Topnav/>
            {profileRequest.isLoading ? <div>Loading...</div> :
            <div className="mt-12 w-screen flex gap-x-12 justify-around">
                <div className="flex flex-col gap-y-6 top-32 left-16 fixed">
                    <label>
                        <input className="hidden"
                               type="file"
                               accept="image/*"
                               onChange={(event) => {
                                   if (event.target.files === null) {
                                   } else {
                                       convertFileToBase64(event.target.files[0]).then((data: any) => {
                                           uploadProfilePicture(sessionId, data).then(() => {
                                               window.location.reload();
                                           })
                                       })
                                   }}}
                        />
                        <img className="mx-11 border-2 rounded-full border-code-grey-700 w-[100px] h-[100px] hover:cursor-pointer"
                             src={profileRequest.data?.userPicture === null ? blank : profileRequest.data?.userPicture}
                             alt={"profile_image"} />
                    </label>

                    <ul className="flex flex-col gap-y-4">
                        <label className="font-roboto text-code-grey-500">Username</label>
                        <input placeholder={profileRequest.data?.username} disabled={true}
                               className="p-1 pl-2 rounded-2xl bg-transparent border-code-login-gray border-[1px]"/>
                        <label className="font-roboto text-code-grey-500">E-Mail</label>
                        <input placeholder={profileRequest.data?.mail} disabled={true} className="p-1 pl-2 rounded-2xl bg-transparent border-code-login-gray border-[1px]"/>
                    </ul>
                </div>
                <div className="w-[70%] flex flex-col gap-y-6 ml-52 mb-10">
                    <h1 className="text-[30px] text-code-grey-500">Projects</h1>
                    <div
                        className="min-h-[200px] p-2 flex bg-code-grey-800 border-2 border-code-border-projects rounded-2xl">
                        {profileRequest.data?.projects === undefined ?
                            <div>No Projects involved</div>
                            :
                            <div className="w-full">
                                {profileRequest.data?.projects.map((project) => {
                                    return (
                                        <div key={project.pid}>
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
                                    return (
                                        <div key={task.tid}>
                                            <div className="hover:bg-code-project-detail rounded-2xl p-2"
                                                 onClick={() => navigate(`/task/${task.tid}`)}>
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
            }
        </div>
    )
}
