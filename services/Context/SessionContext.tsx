import React, { createContext, useContext, useState, } from "react";
import type { ReactNode } from 'react';
import { supabase } from "../Supabase/connection";
import type { SupabaseClient } from "@supabase/supabase-js";

interface SessionContextProps {
  supabaseClient: SupabaseClient<any, "public", any>,
  showTranscriptionsList: boolean;
  toggleTranscriptionsList: () => void;
  showSelectedTranscription: () => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  closeSelectedTranscription: () => void;
  showTranscription: boolean;
  setShowTranscription: (show: boolean) => void;
  toggleShowMenu: () => void;
  showFileDropzone: boolean;
  toggleShowFileDropzone: () => void;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  closeFilePreview: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe ser usado dentro de un SessionProvider");
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode; // Especificamos que children es de tipo ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [showTranscriptionsList, setShowTranscriptionsList] = useState(true); // Estado para mostrar y ocultar la lista de transcripciones
  const [showTranscription, setShowTranscription] = useState(false); // Estado para mostrar y ocultar una transcripciones
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar y ocultar el menú desplegable
  const [showFileDropzone, setShowFileDropzone] = useState(true); // Estado para mostrar y ocultar la zona para subir archivos
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para la selección y previsualización de archivos
  const supabaseClient = supabase;

  // Manejar el cmabio de estado para mostrar y ocultar la zona para subir archivos teniendo en cuenta el archivo subido
  const closeFilePreview = () => {
    setShowFileDropzone(true);
    setSelectedFile(null);
  };

  const showSelectedTranscription = () => {
    setShowTranscription(true);
    setSelectedFile(null);
    setShowFileDropzone(false);
  };

  const closeSelectedTranscription = () => {
    setShowTranscription(false);
  };

  // Manejar el cmabio de estado para mostrar y ocultar la lista de transcripciones
  const toggleTranscriptionsList = () => {
    setShowTranscriptionsList(!showTranscriptionsList);
  };

  // Manejar el cambio de estado para mostrar y ocultar el menú desplegable
  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  // Manejar el cambio de estado para mostrar y ocultar la zona para subir archivos
  const toggleShowFileDropzone = () => {
    setShowFileDropzone(!showFileDropzone);
  };

  const value: SessionContextProps = {
    supabaseClient,
    showTranscriptionsList,
    toggleTranscriptionsList,
    showMenu,
    setShowMenu,
    showTranscription,
    closeSelectedTranscription,
    setShowTranscription,
    showSelectedTranscription,
    toggleShowMenu,
    showFileDropzone,
    toggleShowFileDropzone,
    selectedFile,
    setSelectedFile,
    closeFilePreview,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
