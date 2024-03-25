import NewTranscipt from "../icons/NewTranscript";
import History from "../icons/History";
import MenuIcon from "../icons/MenuIcon";
import { useEffect } from "react";
import { useSession } from "../../services/Context/SessionContext";

export default function HeaderContent() {
    const {
        toggleTranscriptionsList,
        showTranscriptionsList,
        toggleShowMenu,
        showMenu,
        closeFilePreview
    } = useSession();

    // Ajustar el layout dependiendo de la lista de transcripciones
    useEffect(() => {
        const appContainer = document.querySelector('.app-container') as HTMLElement;
        if (appContainer) {
            if (!showTranscriptionsList) {
                appContainer.style.gridTemplateAreas = `"header header" "main main"`;
            } else {
                appContainer.style.gridTemplateAreas = `"header header" "main aside"`;
            }
        }
    }, [showTranscriptionsList]);

    return (
        <header className="[grid-area:header] bg-white dark:bg-[#171717]">
            <div className="h-full flex justify-between items-center px-4">
                {/* Nueva transcripción */}
                <section>
                    <button type="button" onClick={closeFilePreview} className="flex items-center gap-4 hover:bg-[#333] rounded-lg px-2 py-1">
                        <span className="sr-only">Generar nueva transcripción</span>
                        <span>Nueva transcripción</span><NewTranscipt />
                    </button>
                </section>
                {/* Inicio de sesion y lista de transcripcioens) */}
                <section>
                    <section className="header-menu flex items-center gap-4">
                        {!showTranscriptionsList && (
                            <button onClick={toggleTranscriptionsList} type="button" className="flex items-center gap-4 hover:bg-[#333] rounded-lg px-2 py-1">
                                <span className="sr-only">Mostrar lista de transcripciones</span>
                                <span>Transcripciones</span><History width={15} height={15} />
                            </button>
                        )}
                        <button type="button" className="hover:bg-[#333] rounded-lg px-2 py-1">Acceder</button>
                    </section>
                    {!showMenu && (
                        <button onClick={toggleShowMenu} className="menu-icon-button hidden hover:bg-[#333] rounded-lg p-2" title="Menú desplegable">
                            <span className="sr-only">Abrir menú desplegable</span>
                            <MenuIcon />
                        </button>
                    )}
                </section>
            </div>
        </header>
    );
};