import * as yup from "yup";
import type { SignUpAuth } from "../interfaces/send/auth_interface";

export const schema: yup.ObjectSchema<SignUpAuth> = yup.object({
  first_name: yup
    .string()
    .required("Full name is required.")
    .min(3, "Provide at least 3 characters.")
    .max(20, "Fisrt Name must be in 20 characters.")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "First name must start with a capital letter and contain only alphabets.",
    ),
  last_name: yup
    .string()
    .required("Full name is required.")
    .min(3, "Provide at least 3 characters.")
    .max(20, "Last name must be in 20 characters.")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "First name must start with a capital letter and contain only alphabets.",
    ),
  email: yup
    .string()
    .required("Email is required.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format. Please enter a valid email (e.g., user@example.com).",
    ),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
  confirm_password: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
  // profile_pic: yup
  //   .mixed<FileList>()
  //   .test("required", "Profile picture is required.", (value) => {
  //     return value instanceof FileList && value.length > 0;
  //   })
  //   .test("fileType", "Only PNG and JPG images are allowed.", (value) => {
  //     if (!value || value.length === 0) return true;

  //     const file = value[0];

  //     return /^image\/(png|jpe?g)$/.test(file.type);
  //   })
  //   .test("fileSize", "File size must be less than 2 MB.", (value) => {
  //     if (!value || value.length === 0) return true;

  //     return value[0].size <= 2 * 1024 * 1024;
  //   }),

  profile_pic: yup
  .mixed<FileList>()
  .required("Profile picture is required.")
  .test(
    "fileType",
    "Only PNG and JPG images are allowed.",
    (value) => {
      if (!value || value.length === 0) return false;

      return /^image\/(png|jpe?g)$/.test(value[0].type);
    },
  )
  .test(
    "fileSize",
    "File size must be less than 2 MB.",
    (value) => {
      if (!value || value.length === 0) return false;

      return value[0].size <= 2 * 1024 * 1024;
    },
  ),

  // profile_pic: yup
  // .mixed<FileList>()
  // .required("File is required.")
  // .test("fileType", "Only PNG and JPG images are allowed.", (value) => {
  //   if (!value || value.length === 0) return false;

  //   const file = value[0];
  //   return /^image\/(png|jpe?g)$/.test(file.type);
  // })
  // .test("fileSize", "File size must be less than 2 MB.", (value) => {
  //   if (!value || value.length === 0) return false;
  //   return value[0].size <= 2 * 1024 * 1024; // 2 MB
  // }),
});
