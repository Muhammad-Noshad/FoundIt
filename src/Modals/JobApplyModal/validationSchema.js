import * as Yup from 'yup';

const validationSchema = Yup.object({
  cv: Yup.mixed()
    .required("CV is required")
    .test(
      "fileFormat",
      "Only PDF files are allowed",
      (value) => value && value.type === "application/pdf"
    ),
  additionalComments: Yup.string()
    .max(500, "Comments cannot exceed 500 characters"),
});

export default validationSchema;