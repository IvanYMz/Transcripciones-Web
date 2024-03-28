import React, { useState } from 'react';
import Player from './Player';
import { useSession } from '../../services/Context/SessionContext';
import type { User } from '../../services/Context/SessionContext';

interface FileDropZoneprops {
  user: User;
}

const FileDropZone = ({ user }: FileDropZoneprops) => {
  const {
    toggleShowFileDropzone, showFileDropzone,
    setSelectedFile, selectedFile, closeFilePreview,
    supabaseClient, } = useSession();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const allowedExtensions: string[] = ['mp3', 'mp4', 'opus', 'awv'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (file.type.startsWith('audio/') || (fileExtension && allowedExtensions.includes(fileExtension))) {
        loadFile(file);
      } else {
        showError('Por favor, selecciona un archivo de audio válido (mp3, mp4, opus, awv).');
      }
    } else {
      showError('Por favor, selecciona un archivo.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (file.type.startsWith('audio/') || (fileExtension && allowedExtensions.includes(fileExtension))) {
        loadFile(file);
      } else {
        showError('Por favor, arrastra un archivo de audio válido (mp3, mp4, opus, awv).');
      }
    } else {
      showError('Por favor, arrastra un archivo de audio válido.');
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const loadFile = (file: File) => {
    toggleShowFileDropzone();
    setSelectedFile(file);
  };

  const showError = (message: string) => {
    alert(message);
  };

  return (
    <div className={'flex items-center justify-center text-[#fefefe] w-full h-full'}>
      {(showFileDropzone) && (
        <div
          className={`hover:opacity-75 ${isDragging ? 'opacity-50' : ''}`}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          // onDragOver para permitir el drop
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-center relative px-2">
            <h2 className="text-4xl font-bold mb-4">Transcribir Audio</h2>
            <p className="text-lg mb-6 font-normal">
              Sube tus archivos de audio y obtén transcripciones. Rápido y fácil.
            </p>
            <div className="flex justify-center items-center">
              <label
                className="bg-[#fefefe] text-[#222] font-lg py-2 px-4 rounded inline-flex items-center">
                <span>Seleccionar archivo</span>
                <input
                  id='audioFile'
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-sm font-light mt-4">o arrastra y suelta el archivo aquí</p>
          </div>
        </div>
      )}
      {(selectedFile && !showFileDropzone) && (
        <Player closeFilePreview={closeFilePreview} selectedFile={selectedFile} supabaseClient={supabaseClient} user={user} />
      )}
    </div>
  );
};

export default FileDropZone;
