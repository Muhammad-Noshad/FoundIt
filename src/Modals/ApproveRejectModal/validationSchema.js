import * as Yup from 'yup';

const validationSchema = Yup.object({
  additionalComments: Yup.string()
    .max(500, "Comments cannot exceed 500 characters"),
});

export default validationSchema;