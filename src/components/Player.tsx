import CloseIcon from "../icons/CloseIcon";
import UploadIcon from "../icons/UploadIcon";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "../../services/Context/SessionContext";

interface PlayerProps {
    closeFilePreview: () => void;
    selectedFile: File | null;
    supabaseClient: SupabaseClient<any, "public", any>;
    user: User;
}

export default function Player({ closeFilePreview, selectedFile, supabaseClient, user }: PlayerProps) {
    const uploadFile = async () => {
        console.log(user);
        if (selectedFile) {
            const nombreArchivoConExtension: string = selectedFile.name;
            const ultimoPuntoIndex: number = nombreArchivoConExtension.lastIndexOf('.');
            const nombreArchivoSinExtension: string = ultimoPuntoIndex !== -1 ? nombreArchivoConExtension.substring(0, ultimoPuntoIndex) : nombreArchivoConExtension;
            const { data, error } = await supabaseClient.storage
                .from('bucketsazo')
                .upload(user.id + '/' + nombreArchivoSinExtension + '/' + selectedFile.name, selectedFile)
            if (error) {
                console.error(error);
            } 
            console.log(data);
        }
    };

    if (!selectedFile) {
        return null;
    }

    const { name, type } = selectedFile;

    return (
        <div className='flex w-full h-full items-center justify-center sm:w-1/2'>
            <section className="w-4/5 h-3/5 flex flex-col justify-center gap-y-7">
                <h2 className="text-center text-3xl font-bold mb-6">Previsualización de archivo</h2>
                <header className="flex flex-col">
                    <button
                        className="text-[#fafafa] rounded-lg ml-2 p-1 hover:bg-[#3b3b3b] self-end"
                        type="button" title="Cancelar selección de archivo" onClick={closeFilePreview}>
                        <span className="sr-only">Cancelar selección de archivo</span>
                        <CloseIcon width={18} height={18} />
                    </button>
                </header>
                <h3 className="truncate text-center" title={name}>{name}</h3>
                <div className="flex justify-center items-center overflow-hidden">
                    <audio controls title={name}>
                        <source src={URL.createObjectURL(selectedFile)} type={type} />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
                <footer className="flex items-center justify-center w-full">
                    <button onClick={uploadFile} className="flex items-center justify-center font-semibold text-lg text-[#222] px-4 py-2 rounded-full bg-[#fefefe] hover:bg-[#171717] hover:shadow-white hover:text-[#fefefe] transition duration-300">
                        <UploadIcon />Subir
                    </button>
                </footer>
            </section>
        </div>
    );
};
