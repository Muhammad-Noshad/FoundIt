import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name cannot exceed 50 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name cannot exceed 50 characters')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  companyLocation: Yup.string()
    .min(2, 'Company Location must be at least 2 characters')
    .max(100, 'Company Location cannot exceed 100 characters')
    .required('Company Location is required'),
  companyName: Yup.string()
    .min(2, 'Company Name must be at least 2 characters')
    .max(100, 'Company Name cannot exceed 100 characters')
    .required('Company Name is required'),
  positionInCompany: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .max(50, 'Position cannot exceed 50 characters')
    .required('Position in Company is required'),
  companyLogo: Yup.mixed()
    .test(
      'fileType',
      'Only image files are allowed (jpeg, png, jpg)',
      (value) => {
        if (!value) return true;
        const fileType = value?.type || value?.[0]?.type;
        return fileType && ['image/jpeg', 'image/png', 'image/jpg'].includes(fileType);
      }
    )
    .test(
      'fileSize',
      'File size must be less than 2MB',
      (value) => {
        if (!value) return true;
        const fileSize = value?.size || value?.[0]?.size;
        return fileSize && fileSize <= 1 * 1024 * 1024;
      }
    )
});

export default validationSchema;
