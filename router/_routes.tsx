import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider } from "../services/Context/SessionContext";
import SignInUp from "../src/pages/_SignInUp";
import App from "../src/pages/_App";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SessionProvider><App /></SessionProvider>} /> {/* Ruta por defecto */}
                <Route path="/inicioSesion" element={<SessionProvider><SignInUp /></SessionProvider>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;