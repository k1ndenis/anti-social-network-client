import { useMemo, useState } from "react";
import type { Track } from "../../../../types/track";

export const SORT_MODES = {
  AUTHOR_ASC: 1,
  AUTHOR_DESC: 2,
  TITLE_ASC: 3,
  TITLE_DESC: 4
};

export const useTrackProcessor = (tracks: Track[], searchValue: string) => {
  const [sorting, setSorting] = useState(SORT_MODES.AUTHOR_ASC);
  
  const processedTracks = useMemo(() => {
    const result = [...tracks].filter((track) => {
      const composition = `${track.author} ${track.title}`.toLowerCase();
      const search = searchValue.toLowerCase();
      return composition.includes(search);
    });
      
    if (sorting === SORT_MODES.AUTHOR_ASC) result.sort((a, b) => a.author.localeCompare(b.author));
    if (sorting === SORT_MODES.AUTHOR_DESC) result.sort((a, b) => b.author.localeCompare(a.author));
    if (sorting === SORT_MODES.TITLE_ASC) result.sort((a, b) => a.title.localeCompare(b.title));
    if (sorting === SORT_MODES.TITLE_DESC) result.sort((a, b) => b.title.localeCompare(a.title));
        
    return result;
  }, [tracks, searchValue, sorting])
  return { processedTracks, sorting, setSorting }
}