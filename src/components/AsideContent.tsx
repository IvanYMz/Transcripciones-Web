import TranscriptionsList from "./TranscriptionsList";
import CloseIcon from "../icons/CloseIcon";
import { useSession } from "../../services/Context/SessionContext";



export default function AsideContent() {
    const { toggleTranscriptionsList, showTranscriptionsList } = useSession();
    return (
        <>
            {showTranscriptionsList ? (
                <aside className="[grid-area:aside] transcriptions-list flex flex-col mt-6 mr-6 overflow-y-auto">
                    {/* Cerrar historial de transcripciones */}
                    <header className="flex flex-row justify-between items-center p-2 text-slate-200">
                        <h3 className="text-sm">Historial de transcripciones</h3>
                        <button onClick={toggleTranscriptionsList} className="hover:bg-[#171717] rounded-lg p-1" title="Cerrar historial de transcripciones">
                            <span className="sr-only">Ocultar lista de transcripciones</span>
                            <CloseIcon width={20} height={20} />
                        </button>
                    </header>
                    {/* Lista de transcripciones */}
                    <section className="dark:bg-[#171717] rounded-lg w-full h-3/4">
                        <TranscriptionsList />
                    </section>
                </aside>
            ) : (
                <></>
            )}
        </>

    );
};