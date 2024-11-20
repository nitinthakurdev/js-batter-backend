import { signupSchema } from "../validation/user.validateion.js";
import { validate } from "./validate.js";

export const RegisterValidateion = validate(signupSchema)