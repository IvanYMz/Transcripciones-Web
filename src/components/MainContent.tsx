import { useSession } from "../../services/Context/SessionContext";
import FileDropZone from "./FileDropzone";

export default function MainContent() {
    const {
        toggleShowFileDropzone,
        closeFilePreview,
        setSelectedFile,
        selectedFile,
        showFileDropzone,
        showTranscription,
        supabaseClient,
        user
    } = useSession();

    return (
        <main className="[grid-area:main] bg-[#f5f5fa] dark:bg-[#212121] overflow-hidden">
            <div className="flex justify-center items-center h-full">
                {(showTranscription) ? (
                    <p>Holiwis</p>
                ) : (
                    <FileDropZone
                        toggleShowFileDropzone={toggleShowFileDropzone}
                        showFileDropzone={showFileDropzone}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        closeFilePreview={closeFilePreview}
                        supabaseClient={supabaseClient}
                        user={user}
                    />
                )}
            </div>
        </main>
    );
};