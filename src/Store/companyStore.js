import { create } from 'zustand';

import API from '../API/API';

const companyStore = create((set) => ({
  company: null,
  setCompany: (data) => set({ company: data }),
  fetchCompanyById: async (companyId) => {
    try {
      const response = await API.get(`/company/${companyId}`);
      set({ company: response.data });
    }
    catch (error) {
      console.error('Error company:', error);
    }
  },
}));

export default companyStore;