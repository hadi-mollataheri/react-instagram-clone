import { create } from 'zustand';
import { createSelectors } from './create-selectors';

const useUserAuthStore = create((set) => ({
  user: null,
  updateUser: (newUser) => set(() => ({ user: newUser })),

  userEmail: '',
  updateUserEmail: (userInput) => set(() => ({ userEmail: userInput })),

  userPassword: '',
  updateUserPassword: (userInput) => set(() => ({ userPassword: userInput })),

  showPassword: false,
  updateShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),

  sessionData: null,
  updateSessionData: (newSessionData) =>
    set(() => ({ sessionData: newSessionData })),

  sessionExpiration: null,
  updateSessionExpiration: (isSessionExpired) => {
    set(() => ({ sessionExpiration: isSessionExpired }));
  },
}));

export const useUserAuthStoreSelector = createSelectors(useUserAuthStore);
