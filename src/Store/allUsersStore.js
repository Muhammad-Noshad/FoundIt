import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import API from '../API/API';

const allUsersStore = create(
  persist(
    (set) => ({
      users: null,
      setUsers: (data) => set({ users: data }),
      fetchAllUsers: async () => {
        try {
          const response = await API.get('/user/all');
          set({ users: response.data });
        } catch (error) {
          console.error('Error fetching all users:', error);
        }
      },
    }),
    {
      name: 'all-users-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default allUsersStore;
