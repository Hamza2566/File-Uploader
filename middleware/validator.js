import { check } from "express-validator";

const validateRegister = [
    check("username")
    .notEmpty().withMessage("username is required"),
    check("email")
    .notEmpty().withMessage("email is required"),
  check("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
     check("confirmPassword")
    .notEmpty().withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export default validateRegister
