import { create } from 'zustand';
import { createSelectors } from './create-selectors';
import PICTURES from '../assets/pictures';

const defaultProfilePicture = PICTURES.profilePicture;

const useUserProfileStore = create((set) => ({
  userFullName: '',
  updateUserFullName: (userInput) => set(() => ({ userFullName: userInput })),
  username: '',
  updateUsername: (userInput) => set(() => ({ username: userInput })),

  userAvatar: defaultProfilePicture,
  updateUserAvatar: (userImportedPicture) =>
    set(() => ({
      userAvatar: userImportedPicture,
    })),
  userBio: '',
  updateUserBio: (userInput) => set(() => ({ userBio: userInput })),
}));

export const useUserProfileStoreSelector = createSelectors(useUserProfileStore);
