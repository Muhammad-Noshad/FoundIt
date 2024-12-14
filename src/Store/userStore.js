import { create } from 'zustand';

import API from '../API/API';

const userStore = create((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  fetchUserById: async (userId) => {
    try {
      const response = await API.get(`/user/${userId}`);
      set({ user: response.data });
    }
    catch (error) {
      console.error('Error fetching user:', error);
    }
  },
}));

export default userStore;