import { create } from 'zustand';

const companyStore = create((set) => ({
  company: null,
  setCompany: (data) => set({ company: data }),
}));

export default companyStore;