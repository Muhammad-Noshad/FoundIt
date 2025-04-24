import { create } from "zustand";

const useCVStore = create((set) => ({
  // Education Store
  educationList: [],
  addEducation: (education) =>
    set((state) => ({
      educationList: [...state.educationList, education],
    })),
  removeEducation: (id) =>
    set((state) => ({
      educationList: state.educationList.filter((edu) => edu.id !== id),
    })),

  // Projects Store
  projectList: [],
  addProject: (project) =>
    set((state) => ({
      projectList: [...state.projectList, project],
    })),
  removeProject: (id) =>
    set((state) => ({
      projectList: state.projectList.filter((proj) => proj.id !== id),
    })),

  // Links Store
  linksList: [],
  addLink: (link) =>
    set((state) => ({
      linksList: [...state.linksList, link],
    })),
  removeLink: (id) =>
    set((state) => ({
      linksList: state.linksList.filter((link) => link.id !== id),
    })),

  // Experiences Store
  experienceList: [],
  addExperience: (exp) =>
    set((state) => ({
      experienceList: [...state.experienceList, exp],
    })),
  removeExperience: (id) =>
    set((state) => ({
      experienceList: state.experienceList.filter((exp) => exp.id !== id),
    })),

  // Skills Store
  skillsList: [],
  addSkill: (skill) =>
    set((state) => ({
      skillsList: [...state.skillsList, skill],
    })),
  removeSkill: (id) =>
    set((state) => ({
      skillsList: state.skillsList.filter((skill) => skill.id !== id),
    })),

  //Certificates Store
  certificateList: [],
  addCertificate: (certificate) =>
    set((state) => ({
      certificateList: [...state.certificateList, certificate],
    })),
  removeCertificate: (id) =>
    set((state) => ({
      certificateList: state.certificateList.filter(
        (certificate) => certificate.id !== id
      ),
    })),
}));

export default useCVStore;
