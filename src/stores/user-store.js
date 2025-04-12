import { create } from 'zustand';
import { createSelectors } from './create-selectors';
import PICTURES from '../assets/pictures';

const defaultProfilePicture = PICTURES.profilePicture;

const useUserStore = create((set) => ({
  user: null,
  updateUser: (newUser) => set(() => ({ user: newUser })),
  userEmail: '',
  updateUserEmail: (userInput) => set(() => ({ userEmail: userInput })),
  userPassword: '',
  updateUserPassword: (userInput) => set(() => ({ userPassword: userInput })),
  userFullName: '',
  updateUserFullName: (userInput) => set(() => ({ userFullName: userInput })),
  username: '',
  updateUsername: (userInput) => set(() => ({ username: userInput })),
  // showPassword: false,
  // updateShowPassword: () =>
  //   set((state) => ({ showPassword: !state.showPassword })),
  userAvatar: defaultProfilePicture,
  updateUserAvatar: (userImportedPicture) =>
    set(() => ({
      userAvatar: userImportedPicture,
    })),
  userBio: '',
  updateUserBio: (userInput) => set(() => ({ userBio: userInput })),

  // TODO: I can just remove the 2 stats below and move them to the CreatePostModal component because I don't use them anywhere else
  postText: '',
  updatePostText: (userInput) =>
    set(() => ({
      postText: userInput,
    })),

  postImagesURLs: [],
  updatePostImagesURLs: (userInputImages) =>
    set(() => ({ postImagesURLs: userInputImages })),

  userPosts: [],
  // fetchedPostData is an array of post objects
  updateUserPosts: (fetchedPostData) =>
    set(() => ({ userPosts: fetchedPostData })),
}));

export const useUserStoreSelectors = createSelectors(useUserStore);
