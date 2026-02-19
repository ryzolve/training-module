import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
      image: null,
      firstname: '',
      lastname: '',
    },
    updateUserData: (userData) => {
      set(() => ({
        UserData: userData,
      }));
    },
    updateImage: (image) => {
      set((state) => ({
        UserData: {
          ...state.UserData,
          image,
        },
      }));
    },
    removeUserData: () => {
      set(() => ({
        UserData: {
          authToken: '',
          userName: '',
          isLoggedIn: false,
          image: null,
          firstname: '',
          lastname: '',
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);
