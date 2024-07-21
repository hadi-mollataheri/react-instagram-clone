import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  emailInput: '',
  updateEmail: (userInput) => set(() => ({ emailInput: userInput })),
  passwordInput: '',
  updatePasswordInput: (userInput) => set(() => ({ passwordInput: userInput })),
}));
