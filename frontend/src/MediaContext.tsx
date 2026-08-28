import { createContext } from 'react';
import type { Media } from './types';

interface MediaContextType {
    data: Media[];
    page: number;
    total: number;
    limit: number
    onPageChange: (value: number) => void;
    onWatchedToggle: (selectedIndex: number) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    selectedType: string;
    onSelectedTypeChange: (value: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export default MediaContext;