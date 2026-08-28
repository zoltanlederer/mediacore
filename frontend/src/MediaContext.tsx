import { createContext } from 'react';
import type { Media } from './types';

interface MediaContextType {
    data: Media[];
    page: number;
    // "on..." names signal these are handlers that do real work (e.g. updating the URL),
    // not plain useState setters — see AppContent for the implementations
    onPageChange: (value: number) => void;
    total: number;
    limit: number;    
    onWatchedToggle: (selectedIndex: number) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    selectedType: string;
    onSelectedTypeChange: (value: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export default MediaContext;