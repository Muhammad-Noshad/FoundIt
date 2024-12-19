import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import API from '../API/API';

const companyStore = create(
  persist(
    (set) => ({
      company: null,
      setCompany: (data) => set({ company: data }),
      fetchCompanyById: async (companyId) => {
        try {
          const response = await API.get(`/company/${companyId}`);
          set({ company: response.data });
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      },
    }),
    {
      name: 'company-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default companyStore;
