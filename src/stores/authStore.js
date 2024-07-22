import { create } from 'zustand';
import { createSelectors } from './create-selectors';

const useAuthStore = create((set) => ({
  emailInput: '',
  updateEmailInput: (userInput) => set(() => ({ emailInput: userInput })),
  passwordInput: '',
  updatePasswordInput: (userInput) => set(() => ({ passwordInput: userInput })),
  showPassword: false,
  updateShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

// TODO: Use selectors for using states
export const useAuthStoreSelectors = createSelectors(useAuthStore);
