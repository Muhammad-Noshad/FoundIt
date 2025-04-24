import { create } from "zustand";

const useCVStore = create((set) => ({
  // Education Store
  educationList: [],
  setEducation: (education) =>
    set(() => ({
      educationList: education,
    })),
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
  setProject: (projects) =>
    set(() => ({
      projectList: projects,
    })),
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
  setLink: (links) =>
    set(() => ({
      linksList: links,
    })),
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
  setExperience: (experiences) =>
    set(() => ({
      experienceList: experiences,
    })),
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
  setSkill: (skills) =>
    set(() => ({
      skillsList: skills,
    })),
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
  setCertificate: (certificates) =>
    set(() => ({
      certificateList: certificates,
    })),
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
