import * as Yup from "yup";

const validationSchema = Yup.object({
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters long"),
  body: Yup.string()
    .required("Body is required")
    .min(10, "Body must be at least 10 characters long"),
});

export default validationSchema;
