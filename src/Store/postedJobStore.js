import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from "../API/API";

const postedJobStore = create(
  persist(
    (set) => ({
      postedJobs: [],
      setPostedJobs: (data) => set({ postedJobs: data }),
      fetchPostedJobs: async () => {
        try {
          const response = await API.get('/posted-job');
          set({ postedJobs: response.data });
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
      fetchPostedJobsByCompanyId: async (companyId) => {
        try {
          const response = await API.get(`/posted-job/${companyId}`);
          set({ postedJobs: response.data });
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
    }),
    {
      name: 'posted-job-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default postedJobStore;
