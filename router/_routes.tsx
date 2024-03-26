import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "../src/pages/_SignInUp";
import App from "../src/pages/_App";
import { SessionProvider } from "../services/Context/SessionContext";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/inicioSesion" element={<SessionProvider><SignInUp /></SessionProvider>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;