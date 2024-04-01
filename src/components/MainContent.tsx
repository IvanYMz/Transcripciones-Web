import { useEffect, useState } from "react";
import { SessionProvider } from "../../services/Context/SessionContext";
import { useSession } from "../../services/Context/SessionContext";
import type { User } from "../../services/Context/SessionContext";
import FileDropZone from "./FileDropzone";

interface MainContentProps {
    user: User;
}

export default function MainContent({ user, /*showTranscription*/ }: MainContentProps) {
    const { showTranscription, selectedTranscription, supabaseClient, } = useSession();
    const [transcriptionURL, setTranscriptionURL] = useState<string | null>(null);

    // Generar la url de supabase para la previsualización del audio
    const createTranscriptionURL = async () => {
        try {
            const data = await supabaseClient.storage.from('bucketsazo').list(user.id + '/' + selectedTranscription);
            if (data.data && data.data.length > 0) {
                const fileName = data.data[0].name;
                if (fileName) {
                    const finalURL = await getURL(fileName); // Obtener la url completa
                    if (finalURL) {
                        setTranscriptionURL(finalURL);
                    } else {
                        console.error('No se pudo obtener la URL.');
                    }
                } else {
                    console.error('El nombre del archivo no está definido.');
                }
            } else {
                console.error('No se encontraron datos en la lista.');
            }
        } catch (error) {
            console.error('Error al obtener la URL de transcripción:', error);
        }
    };

    // Concatenar el path para obtener la url final.
    const getURL = async (fileName: string) => {
        try {
            const filePath = '/' + user.id + '/' + selectedTranscription + '/' + fileName;
            //console.log('Ruta: ' + filePath);
            const { data, error } = await supabaseClient.storage.from('bucketsazo').createSignedUrl(filePath, 900);
            if (data) {
                return data.signedUrl; // URL para la previsualización del audio.
            } else {
                console.error('Error al obtener la URL:', error);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la URL:', error);
            return null;
        }
    };

    useEffect(() => {
        if(showTranscription) {
            createTranscriptionURL();
        }
    }, [selectedTranscription]);

    return (
        <main className="[grid-area:main] bg-[#f5f5fa] dark:bg-[#212121] overflow-hidden">
            <div className="flex justify-center items-center h-full">
                {(showTranscription) ? (
                    <section className="flex flex-col">
                        <p>{selectedTranscription}</p>
                        {transcriptionURL && <audio controls src={transcriptionURL} />}
                    </section>
                ) : (
                    <SessionProvider>
                        <FileDropZone user={user} />
                    </SessionProvider>
                )}
            </div>
        </main>
    );

};