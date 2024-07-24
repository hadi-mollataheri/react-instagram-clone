import { create } from 'zustand';
import { createSelectors } from './create-selectors';

const useUserStore = create((set) => ({
  userEmail: '',
  updateUserEmail: (userInput) => set(() => ({ userEmail: userInput })),
  userPassword: '',
  updateUserPassword: (userInput) => set(() => ({ userPassword: userInput })),
  userFullName: '',
  updateUserFullName: (userInput) => set(() => ({ userFullName: userInput })),
  username: '',
  updateUsername: (userInput) => set(() => ({ username: userInput })),
  showPassword: false,
  updateShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

// TODO: Use selectors for using states
export const useUserStoreSelectors = createSelectors(useUserStore);
