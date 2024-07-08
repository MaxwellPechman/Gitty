import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface SessionStore {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            sessionId: "",
            setSessionId: (sessionId: string) => set({ sessionId }),
        }),
        {
            name: 'session-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)