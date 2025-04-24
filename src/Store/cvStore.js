// src/store/cvStore.js
import { create } from "zustand";
import API from "../API/API";

const useAPICVStore = create((set) => ({
  cvData: null,
  isLoading: false,
  error: null,

  //----------------- Fetch CV ---------------------
  fetchCV: async (userId) => {
    try {
      set({ isLoading: true, error: null });

      const res = await API.get(`/userCV/getCv/${userId}`);

      set({ cvData: res.data });

      console.log("Fetched CV Data:", res.data);
    } catch (error) {
      set({ error: error.message });
      console.error("Failed to fetch CV:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  //---------------- Create New CV ----------------------

  createCV: async ({
    name,
    userId,
    address,
    executiveSummary,
    email,
    phone,
  }) => {
    try {
      set({ isLoading: true, error: null });

      const res = await API.post("/userCV/create", null, {
        params: {
          name,
          userID: userId,
          address,
          summary: executiveSummary,
          phone,
          email,
        },
      });

      set({ cvData: res.data });
      console.log("CV created successfully:", res.data);
    } catch (error) {
      set({ error: error.message });
      console.error("Failed to create CV:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  //----------------------------- Adding the SOcial Links ------------------

  addSocialLinks: async ({ cvID, socials }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.post("/userCV/addSocials", {
        cvID,
        socials,
      });

      console.log("Social links added successfully:", res.data);

      // Optional: Update store if backend returns updated data
      set((state) => ({
        cvData: {
          ...state.cvData,
          socials: res.data.socials || socials,
        },
      }));
    } catch (err) {
      set({ error: err.message });
      console.error("Failed to add social links:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  //---------------------- Adding the Education -----------------------

  addEducationObj: async ({ cvID, education }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.post("/userCV/addEducation", {
        cvID,
        education,
      });

      console.log("Education added successfully:", res.data);

      // Optional: Update cvData if education is updated
      set((state) => ({
        cvData: {
          ...state.cvData,
          education: res.data.education || education,
        },
      }));
    } catch (err) {
      set({ error: err.message });

      // Log the error response from the API for more details
      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //---------------------- Adding the Experience --------------------
  addExperienceObj: async ({ cvID, experience }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.post("/userCV/addExperience", {
        cvID,
        experience,
      });

      console.log("Experience added successfully:", res.data);

      // Optional: Update cvData if experience is updated
      set((state) => ({
        cvData: {
          ...state.cvData,
          experience: res.data.experience || experience,
        },
      }));
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //-------------------- Adding Skills ---------------------------

  addSkillsToCV: async ({ cvID, skills }) => {
    try {
      const res = await API.post("/userCV/addSkills", {
        cvID,
        skills,
      });
      console.log("Skills added successfully:", res.data);
    } catch (error) {
      console.error("Error adding skills:", error);
    }
  },

  //---------------------- Remove the social Link ------------------
  removeSocialLink: async (socialId) => {
    set({ isLoading: true, error: null });

    try {
      // Send DELETE request to remove the social link
      const res = await API.delete(`/userCV/removeSocial/${socialId}`);
      console.log("Social link removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentSocialLinks = currentCvData.socialLinks || [];

        return {
          cvData: {
            ...currentCvData,
            socialLinks: currentSocialLinks.filter(
              (link) => link.id !== socialId
            ),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      // Log more details if available
      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------- Adding Certificates ------------------------

  addCertificateObj: async ({ cvID, certificates }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.post("/userCV/addCertificate", {
        cvID,
        certificates,
      });

      console.log("Certificates added successfully:", res.data);

      // Update cvData if applicable
      set((state) => ({
        cvData: {
          ...state.cvData,
          certificates: res.data.certificates || certificates,
        },
      }));
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //----------------------- Adding Projects -------------------------

  addProjectObj: async ({ cvID, projects }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.post("/userCV/addProjects", {
        cvID,
        projects,
      });

      console.log("Projects added successfully:", res.data);

      // Optional: update cvData in your store
      set((state) => ({
        cvData: {
          ...state.cvData,
          projects: res.data.projects || projects,
        },
      }));
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------------ Deletion API Calls --------------------------

  //----------------- Delete Education -----------------

  removeEducationList: async (educationId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.delete(`/userCV/removeEducation/${educationId}`);
      console.log("Education entry removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentEducation = currentCvData.education || [];

        return {
          cvData: {
            ...currentCvData,
            education: currentEducation.filter((edu) => edu.id !== educationId),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------ Remove Skills ------------------

  removeSkillList: async (skillId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.delete(`/userCV/removeSkill/${skillId}`);
      console.log("Skill removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentSkills = currentCvData.skills || [];

        return {
          cvData: {
            ...currentCvData,
            skills: currentSkills.filter((skill) => skill.id !== skillId),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------ REmove Experience --------------
  removeExperienceList: async (experienceId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.delete(`/userCV/removeExperience/${experienceId}`);
      console.log("Experience entry removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentExperience = currentCvData.experience || [];

        return {
          cvData: {
            ...currentCvData,
            experience: currentExperience.filter(
              (exp) => exp.id !== experienceId
            ),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------ Remove Projects ----------------

  removeProjectList: async (projectId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.delete(`/userCV/removeProject/${projectId}`);
      console.log("Project removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentProjects = currentCvData.projects || [];

        return {
          cvData: {
            ...currentCvData,
            projects: currentProjects.filter((proj) => proj.id !== projectId),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------------ remove Certificates ------------

  removeCertificateList: async (certificateId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.delete(
        `/userCV/removeCertificate/${certificateId}`
      );
      console.log("Certificate removed successfully:", res.data);

      // Safely update cvData
      set((state) => {
        const currentCvData = state.cvData || {};
        const currentCertificates = currentCvData.certificates || [];

        return {
          cvData: {
            ...currentCvData,
            certificates: currentCertificates.filter(
              (cert) => cert.id !== certificateId
            ),
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("Error response from API:", err.response.data);
      } else {
        console.error("Error details:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //-------------------- Update Name on CV ------------------

  updateCvName: async (cvId, newName) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.put(`/userCV/updateCvName`, null, {
        params: {
          name: newName,
          cvID: cvId,
        },
      });

      console.log("CV name updated successfully:", res.data);

      set((state) => {
        const currentCvData = state.cvData || {};
        return {
          cvData: {
            ...currentCvData,
            name: newName,
          },
        };
      });
    } catch (err) {
      set({ error: err.message });
      if (err.response) {
        console.error("API error response:", err.response.data);
      } else {
        console.error("Error:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //------------------- Update CV Address -----------------

  updateCvAddress: async (cvId, newAddress) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.put("/userCV/updateCvAddress", null, {
        params: {
          address: newAddress,
          cvID: cvId,
        },
      });

      console.log("CV address updated successfully:", res.data);

      // Update cvData in store
      set((state) => {
        const currentCvData = state.cvData || {};
        return {
          cvData: {
            ...currentCvData,
            address: newAddress,
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("API error response:", err.response.data);
      } else {
        console.error("Error:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //-------------------- Update Phone ------------------

  updateCvPhone: async (cvId, newPhone) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.put("/userCV/updateCvPhone", null, {
        params: {
          phone: newPhone,
          cvID: cvId,
        },
      });

      console.log("CV phone updated successfully:", res.data);

      // Update cvData in store
      set((state) => {
        const currentCvData = state.cvData || {};
        return {
          cvData: {
            ...currentCvData,
            phone: newPhone,
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("API error response:", err.response.data);
      } else {
        console.error("Error:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //-------------------- Update email ------------------

  updateCvEmail: async (cvId, newEmail) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.put("/userCV/updateCvEmail", null, {
        params: {
          email: newEmail,
          cvID: cvId,
        },
      });

      console.log("CV email updated successfully:", res.data);

      // Update cvData in store
      set((state) => {
        const currentCvData = state.cvData || {};
        return {
          cvData: {
            ...currentCvData,
            email: newEmail,
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("API error response:", err.response.data);
      } else {
        console.error("Error:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //-------------------- Update Exective Summary ----------

  updateCvSummary: async (cvId, newSummary) => {
    set({ isLoading: true, error: null });

    try {
      const res = await API.put("/userCV/updateCvSummary", null, {
        params: {
          summary: newSummary,
          cvID: cvId,
        },
      });

      console.log("CV summary updated successfully:", res.data);

      set((state) => {
        const currentCvData = state.cvData || {};
        return {
          cvData: {
            ...currentCvData,
            summary: newSummary,
          },
        };
      });
    } catch (err) {
      set({ error: err.message });

      if (err.response) {
        console.error("API error response:", err.response.data);
      } else {
        console.error("Error:", err);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAPICVStore;