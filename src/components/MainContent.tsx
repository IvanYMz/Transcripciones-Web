import { useEffect } from "react";
import { SessionProvider } from "../../services/Context/SessionContext";
import { useSession } from "../../services/Context/SessionContext";
import type { User } from "../../services/Context/SessionContext";
import FileDropZone from "./FileDropzone";

interface MainContentProps {
    user: User;
    //showTranscription: boolean;
}

export default function MainContent({ user, /*showTranscription*/ }: MainContentProps) {
    const { showTranscription } = useSession();
    return (
        <main className="[grid-area:main] bg-[#f5f5fa] dark:bg-[#212121] overflow-hidden">
            <div className="flex justify-center items-center h-full">
                {(showTranscription) ? (
                    <p>Holiwis</p>
                ) : (
                    <SessionProvider>
                        <FileDropZone user={user} />
                    </SessionProvider>
                )}
            </div>
        </main>
    );
};