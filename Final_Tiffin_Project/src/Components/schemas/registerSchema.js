import * as Yup from "yup";
const SUPPORTED_FORMATS= ["image/jpg","image/jpeg","image/png"];

export const registerSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please enter your first name"),
  email: Yup.string().email().required("Please enter your email"),
  mobile:Yup.number().min(10).required("Please provide mobile number ").positive().integer(),
  category:Yup.string().required('category is required'),
  city:Yup.string().required('city is required'),
  gender:Yup.string().required('select the required gender'),
  address:Yup.string().required('enter the correct address'),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  // img_array:Yup.array(),
  // file: Yup
  //     .mixed()
  //     .nullable()
  //     .required()
  //     .test(
  //       "FILE_SIZE",
  //       "Uploaded file is too big",
  //       (value)=>!value || (value && value.size <= 1024 * 1024)
  //     )

  //     .test(
  //       "FILE_FORMAT",
  //       "Uploaded file has unsupported format.",
  //       (value)=> !value|| (value && SUPPORTED_FORMATS.includes(value?.type))
  //     )
});
