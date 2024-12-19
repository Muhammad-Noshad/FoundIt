import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import API from '../API/API';

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      fetchUserById: async (userId) => {
        try {
          const response = await API.get(`/user/${userId}`);
          set({ user: response.data });
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default userStore;
