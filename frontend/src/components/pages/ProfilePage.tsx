import {Topnav} from "../topnav/Topnav.tsx";
import {useQuery} from "@tanstack/react-query";
import {requestUserProfile} from "../../api/Api.ts";

export function ProfilePage() {
    const sessionID = localStorage.getItem("sessionID")

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
        <div className="w-screen h-screen bg-code-grey-950">
            <Topnav/>
            <div className="mt-12 w-screen flex gap-x-12 justify-around">
                <div className="flex flex-col gap-y-6">
                    <img className="border-2 rounded border-code-grey-700" src={""} alt={"profile_image"}/>
                    <ul className="flex flex-col gap-y-4">
                        <label className="font-roboto text-code-grey-500">Username</label>
                        <input placeholder={"name"}/>
                        <label className="font-roboto text-code-grey-500">E-Mail</label>
                        <input placeholder={"name"}/>
                    </ul>
                </div>
                <div className="w-[70%] flex flex-col gap-y-6">
                    <h1 className="text-[30px] text-code-grey-500">Projects</h1>
                    <div
                        className="h-[230px] flex items-center justify-center bg-code-grey-800 border-2 border-code-border-projects rounded">
                        <div>No Projects involved</div>
                    </div>
                    <h1 className="text-[30px] text-code-grey-500">Tasks</h1>
                    <div
                        className="h-[230px] flex items-center justify-center bg-code-grey-800 border-2 border-code-border-projects rounded">
                        <div>No Tasks involved</div>
                    </div>
                </div>
            </div>
        </div>
    )
}