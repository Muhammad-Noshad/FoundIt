import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from "../API/API";

const jobApplicationStore = create(
  persist(
    (set) => ({
      jobApplications: [],
      setJobApplications: (data) => set({ jobApplications: data }),
      fetchJobApplicationsByUserId: async (userId) => {
        try {
          const response = await API.get(`/job-application/${userId}`);
          set({ jobApplications: response.data });
        } catch (error) {
          console.error('Error fetching job applications:', error);
        }
      },
      fetchJobApplicationsByPostId: async (postId) => {
        try {
          const response = await API.get(`/job-application/job-post/${postId}`);
          set({ jobApplications: response.data });
        } catch (error) {
          console.error('Error fetching job applications:', error);
        }
      },
    }),
    {
      name: 'job-application-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default jobApplicationStore;
