import { SessionProvider, useSession } from "../../services/Context/SessionContext";

// Componentes
import HeaderContent from "../components/HeaderContent";
import AsideContent from "../components/AsideContent";
import DropdownMenu from "../components/DropdownMenu";
import MainContent from "../components/MainContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const { supabaseClient, user, setUser } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado para asignar sus datos
        const getSupabaseUser = async () => {
            let session = await supabaseClient.auth.getSession();
            if(session.data.session === null) { navigate('/SignIn'); }
            try {
                if (session.data.session) {
                    let loggedUser = await supabaseClient.auth.getUser();
                    if (loggedUser.data.user?.role === 'authenticated') {
                        setUser({
                            email: loggedUser.data.user.email,
                            id: loggedUser.data.user.id,
                        });
                    }
                }
            } catch (error) {
                console.error('Error al obtener el usuario de Supabase:', error);
                // Manejar el error de autenticación aquí
            }
        };
        getSupabaseUser();
    }, []);

    return (
        <SessionProvider>
            <div className="app-container dark:text-[#fefefe] animate-fade-in">
                {/* Header */}
                <HeaderContent user={user}/>
                {/* Sección relacionada con la lista de transcripciones */}
                <AsideContent user={user} />
                {/* Menú desplegable */}
                <DropdownMenu user={user} />
                {/* Contenido principal */}
                <MainContent user={user} />
            </div>
        </SessionProvider>
    );
};