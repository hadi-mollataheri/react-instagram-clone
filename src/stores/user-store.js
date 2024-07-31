import { create } from 'zustand';
import { createSelectors } from './create-selectors';
import PICTURES from '../assets/pictures';

const defaultProfilePicture = PICTURES.profilePicture;

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
  userAvatar: defaultProfilePicture,
  updateUserAvatar: (userImportedPicture) =>
    set(() => ({
      userAvatar: userImportedPicture,
    })),
  userBio: '',
  updateUserBio: (userInput) => set(() => ({ userBio: userInput })),
}));

export const useUserStoreSelectors = createSelectors(useUserStore);
