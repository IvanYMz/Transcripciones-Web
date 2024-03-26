import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../services/Context/SessionContext';


export default function SignInUp() {
    const { supabaseClient } = useSession();
    const navigate = useNavigate();

    supabaseClient.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_IN') {
            navigate("/")
        }
    });

    // Estilos para el componente Auth
    const authStyle = {
        input: { color: '#fefefe' },
        button: {
            backgroundColor: '#fefefe',
            color: '#222',
            border: 'none',
        },
    };

    // Configuración para el componente Auth
    const signInUpConfig = {
        variables: {
            sign_in: {
                email_label: 'Correo electrónico',
                email_input_placeholder: 'ejemplo@algo.com',
                password_label: 'Contraseña',
                password_input_placeholder: 'Tu contraseña',
                button_label: "Iniciar sesión"
            },

            sign_up: {

            }
        }
    };

    return (
        <div className='absolute z-10 h-full w-full flex justify-center items-center bg-[#212121]'>
            <Auth
                supabaseClient={supabaseClient}
                redirectTo={'https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#import-the-auth-component'}
                localization={signInUpConfig}
                appearance={{ theme: ThemeSupa, style: authStyle }}
                providers={[]}
            />
        </div>
    );

};