import { SessionProvider } from "../../services/Context/SessionContext";

// Componentes
import HeaderContent from "../components/HeaderContent";
import AsideContent from "../components/AsideContent";
import DropdownMenu from "../components/DropdownMenu";
import MainContent from "../components/MainContent";

export default function App() {
    return (
        <SessionProvider>
            <div className="app-container dark:text-[#fefefe]">
                {/* Header */}
                <HeaderContent />
                {/* Sección relacionada con la lista de transcripciones */}
                <AsideContent />
                {/* Menú desplegable */}
                <DropdownMenu />
                {/* Contenido principal */}
                <MainContent />
            </div>
        </SessionProvider>
    );
};