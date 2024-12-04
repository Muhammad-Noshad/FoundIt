import { create } from 'zustand';
import API from "../API/API";

const jobApplicationStore = create((set) => ({
  jobApplications: [],
  setJobApplications: (data) => set({ jobApplications: data }),
  fetchJobApplicationsById: async (userId) => {
    try {
      const response = await API.get(`/job-application/${userId}`);
      set({ jobApplications: response.data });
    }
    catch (error) {
      console.error('Error fetching job applications:', error);
    }
  },
}));

export default jobApplicationStore;