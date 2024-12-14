import * as Yup from 'yup';

const validationSchema = Yup.object({
  cv: Yup.mixed()
    .required("CV is required")
    .test(
      "fileFormat",
      "Only PDF files are allowed",
      (value) => value && value.type === "application/pdf"
    )
    .test(
      'fileSize',
      'File size must be less than 1MB',
      (value) => {
        if (!value) return false;
        const fileSize = value?.size || value?.[0]?.size;
        return fileSize && fileSize <= 1 * 1024 * 1024;
      }
    ),
  additionalComments: Yup.string()
    .max(500, "Comments cannot exceed 500 characters"),
});

export default validationSchema;