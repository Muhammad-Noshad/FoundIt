import { create } from 'zustand';
import API from "../API/API";

const postedJobStore = create((set) => ({
  postedJobs: [],
  setPostedJobs: (data) => set({ postedJobs: data }),
  fetchPostedJobs: async () => {
    try {
      const response = await API.get('/posted-job');
      set({ postedJobs: response.data });
    }
    catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
}));

export default postedJobStore;