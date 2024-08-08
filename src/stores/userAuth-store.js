import { create } from 'zustand';
import { createSelectors } from './create-selectors';

const useUserAuthStore = create((set) => ({
  user: null,
  updateUser: (newUser) => set(() => ({ user: newUser })),
  isLoggedIn: false,
  // TODO: Check the if the returned response has a status object or like it for updating the isLoggedIn
  updateIsLoggedIn: () =>
    set(() => ({ isLoggedIn: 'some status or just boolean' })),
  userEmail: '',
  updateUserEmail: (userInput) => set(() => ({ userEmail: userInput })),
  userPassword: '',
  updateUserPassword: (userInput) => set(() => ({ userPassword: userInput })),
  showPassword: false,
  updateShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export const useUserAuthStoreSelector = createSelectors(useUserAuthStore);
