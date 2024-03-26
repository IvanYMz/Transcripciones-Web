import { useState, useRef, useEffect } from 'react';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface TranscriptionViewProps {
    showSelectedTranscription: () => void;
    showTranscription: boolean;
}

const TranscriptionsList = ({ showSelectedTranscription, showTranscription }: TranscriptionViewProps) => {
    const transcriptions = [
        "el19demarzoyel2demayo_27_perezgaldos_64kb",
        "Edith Berenice Limon Garcia",
        "WhatsApp Ptt 2024-02-06 at 9.57.38 AM",
        "el19demarzoyel2demayo_06_perezgaldos_64kb",
        "John Smith",
        "Maria Rodriguez",
        "audio123",
        "Conference Call 2024-03-15",
        "Luisa Fernandez",
        "Voice Memo 2024-03-22",
        "Documentary Transcript",
        "Samantha Johnson",
        "Interview Transcript - John Doe",
        "Alexandria Martinez",
        "Conference Call 2024-03-18",
        "Speech 2024-03-10",
        "Peter Thompson",
        "Meeting Notes - March 24th",
        "Sarah Brown",
        "Video Transcript - March 2024",
        "Emma Davis",
        "Lecture Recording",
        "Adam Wilson",
        "Workshop Transcript",
        "Julia Garcia",
        "Podcast Episode 56",
        "Robert Miller",
        "Court Hearing Transcript",
        "Sophia Taylor",
        "Panel Discussion Transcript"
    ];

    const [selectedTranscription, setSelectedTranscription] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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
                <ul className="flex flex-col gap-2 pr-2 h-full">
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
                                    <button onClick={showSelectedTranscription} className="flex items-center gap-4 hover:bg-[#444] rounded-lg px-2 py-1">
                                        <span>Ver</span>
                                    </button>
                                    <button className="flex items-center gap-4 hover:bg-[#444] rounded-lg px-2 py-1">
                                        <span>Editar</span>
                                        <EditIcon />
                                    </button>
                                    <button className="flex items-center gap-4 hover:bg-[#444] rounded-lg px-2 py-1 text-red-500">
                                        <span>Eliminar</span>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default TranscriptionsList;
