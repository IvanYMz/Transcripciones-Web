import { useState, useRef, useEffect } from 'react';
import { useSession } from '../../services/Context/SessionContext';
import type { User } from '../../services/Context/SessionContext';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface TranscriptionsListProps {
    user: User;
    showMenu: boolean;
    showSelectedTranscription: (selectedTranscription: string) => void;
    toggleShowMenu: () => void;
}

const TranscriptionsList = ({ user, showSelectedTranscription, toggleShowMenu, showMenu, }: TranscriptionsListProps) => {
    const { supabaseClient } = useSession();
    const [transcriptions, setTranscriptions] = useState<string[]>([]);
    const [selectedTranscription, setSelectedTranscription] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Enlistar las transcripciones del usuario (****ENCONTRAR LA MEJOR FORMA Y EL MEJOR LUGAR PARA CARGAR ESTO****) 
    const fetchUserTranscripts = async () => {
        try {
            if (user.id !== '') {
                const { data, error } = await supabaseClient
                    .storage
                    .from('bucketsazo')
                    .list(user.id, {
                        limit: 100,
                        offset: 0,
                        sortBy: { column: 'name', order: 'asc' },
                    });
                if (data) {
                    const namesArray: string[] = data.map(item => item.name);
                    setTranscriptions(namesArray); // Establece el estado con los nombres
                }
            }
        } catch (error) { console.log(error) }
    };

    const getFilesToRemove = async () => {
        try {
            const transcriptionFolderPath = user.id + '/' + selectedTranscription;
            const { data, error } = await supabaseClient
                .storage
                .from('bucketsazo')
                .list(transcriptionFolderPath)

            if (data) {
                const files2Remove: string[] = data.map(item => transcriptionFolderPath + '/' + item.name);
                return files2Remove;
            }
        } catch (error) { console.log(error) }
        return [];
    };

    const deleteTranscription = async () => {
        try {
            if (selectedTranscription) {
                const files2Remove = await getFilesToRemove();

                const { data, error } = await supabaseClient
                    .storage
                    .from('bucketsazo')
                    .remove(files2Remove)
                if (data) {
                    window.location.reload();
                }
            }
        } catch (error) { console.log(error) }
    };

    // Función para manejar la selección de una transcripción
    const handleTranscriptionSelect = (transcription: string) => {
        setSelectedTranscription(transcription === selectedTranscription ? null : transcription);
    };

    // Función para cerrar el menú cuando se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setSelectedTranscription(null);
        }
    };

    const cleanMainContent = () => {
        if (showMenu) { toggleShowMenu(); }
        setSelectedTranscription(null);
    };

    useEffect(() => {
        fetchUserTranscripts();
    }, [user.id]);

    // Agregar el listener para cerrar el menú cuando se hace clic fuera de él
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="text-[#fefefe] flex flex-col justify-between h-full shadow-xl">
            <section className="h-full overflow-y-auto pr-1 p-2">
                {transcriptions.length > 0 && (
                    <ul className="flex flex-col gap-2 pr-2 h-full animate-fade-in-right animate-delay-300">
                        {transcriptions.map((transcription, index) => (
                            <li key={index} className="relative">
                                <p
                                    className={`truncate cursor-pointer rounded-lg px-2 py-1 ${selectedTranscription === transcription ? 'bg-[#333]' : 'hover:bg-[#333]'}`}
                                    title={transcription}
                                    onClick={() => handleTranscriptionSelect(transcription)}
                                >
                                    {transcription}
                                </p>
                                {selectedTranscription === transcription && (
                                    <div ref={menuRef} className="absolute right-0 top-0 mt-2 w-40 bg-[#333] rounded-lg p-2 flex flex-col gap-y-1 shadow-lg border border-[#fefefe] shadow-black z-10">
                                        <button onClick={() => { showSelectedTranscription(selectedTranscription); cleanMainContent(); }} className="flex items-center gap-4 hover:bg-[#444] rounded-lg px-2 py-1">
                                            <span>Ver / Editar</span><EditIcon />
                                        </button>
                                        <button onClick={deleteTranscription} className="flex items-center gap-4 hover:bg-[#444] rounded-lg px-2 py-1 text-red-500">
                                            <span>Eliminar</span>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                <></>
            </section>
        </div>
    );
};

export default TranscriptionsList;
