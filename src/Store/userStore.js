import { create } from 'zustand';

import API from '../API/API';

const userStore = create((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));

export default userStore;