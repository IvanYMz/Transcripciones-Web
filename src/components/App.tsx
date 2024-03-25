import { SessionProvider } from "../../services/Context/SessionContext";

// Componentes
import HeaderContent from "./HeaderContent";
import AsideContent from "./AsideContent";
import DropdownMenu from "./DropdownMenu";
import MainContent from "./MainContent";

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