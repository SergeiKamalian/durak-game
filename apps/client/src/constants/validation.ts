import * as Yup from "yup";

export const REGISTRATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 charts")
    .max(30, "Maximum 30 charts")
    .required("Name is required"),
  password: Yup.string()
    .min(6, "Minimum 6 charts")
    .max(30, "Maximum 30 charts")
    .required("Password is required"),
});
