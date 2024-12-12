import * as Yup from 'yup';

const validationSchema = Yup.object({
  jobTitle: Yup.string()
      .required("Job Title is required")
      .min(3, "Job Title must be at least 3 characters"),
  jobSalary: Yup.number()
    .required("Job Salary is required")
    .positive("Job Salary must be a positive number")
    .typeError("Job Salary must be a valid number"),
  jobType: Yup.string()
    .required("Please select a job type"),
  jobDescription: Yup.string()
    .max(5000, "Job Description should not exceed 5000 characters"),
});

export default validationSchema;