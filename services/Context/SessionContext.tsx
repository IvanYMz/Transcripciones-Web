import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from 'react';
import { supabase } from "../Supabase/connection";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface User {
  email: string | undefined;
  id: string;
  role: string;
}

interface SessionContextProps {
  supabaseClient: SupabaseClient<any, "public", any>;
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
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

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
  const [user, setUser] = useState<User>({
    email: '',
    id: '',
    role: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para la selección y previsualización de archivos
  const supabaseClient = supabase;

  useEffect(() => {
    const getSupabaseUser = async () => {
      let session = await supabase.auth.getUser();
      if (session.data.user?.role === 'authenticated') {
        // Inicializar el estado user con los datos de session.user
        setUser({
          email: session.data.user.email,
          id: session.data.user.id,
          role: session.data.user.role
        });
      } else {
        setUser({
          email: 'NONE',
          id: 'NONE',
          role: 'NONE'
        });
      }
    };

    getSupabaseUser();
  }, []);

  // Manejar el cambio de estado para mostrar y ocultar la zona para subir archivos teniendo en cuenta el archivo subido
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

  // Manejar el cambio de estado para mostrar y ocultar la lista de transcripciones
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
    setUser,
    user,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};