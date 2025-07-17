import { create } from "zustand";

interface ProgressState {
  visible: boolean;
  collapsed: boolean;
  progress: number;
  current: number;
  total: number;
  startProgress: () => void;
  toggleCollapse: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => {
  let intervalId: any = null;

  return {
    visible: false,
    collapsed: false,
    progress: 0,
    current: 0,
    total: 130,

    startProgress: () => {
      const { total } = get();
      const intervalDelay = Math.floor(8000 / total);

      if (intervalId) {
        clearInterval(intervalId);
      }

      set({
        visible: true,
        collapsed: false,
        progress: 0,
        current: 0,
      });

      let count = 0;

      intervalId = setInterval(() => {
        count += 1;
        const percent = Math.min(Math.round((count / total) * 100), 100);

        set({
          current: count,
          progress: percent,
        });

        if (count >= total) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, intervalDelay);
    },

    toggleCollapse: () => {
      set((state) => ({ collapsed: !state.collapsed }));
    },
  };
});
