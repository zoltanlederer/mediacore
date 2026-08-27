import { createContext } from 'react';
import type { Media } from './types';

interface MediaContextType {
    data: Media[];
    onWatchedToggle: (selectedIndex: number) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    selectedType: string;
    onSelectedTypeChange: (value: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export default MediaContext;