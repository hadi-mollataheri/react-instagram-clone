import { create } from 'zustand';
import { createSelectors } from './create-selectors';

const useUserPostStore = create((set) => ({
  likeCounter: 0,
  updateLikeCounter: (callback) =>
    set((state) => ({
      likeCounter: callback(state.likeCounter),
    })),
}));

export const useUserPostStoreSelectors = createSelectors(useUserPostStore);
