import { body } from 'express-validator'

export const loginValidate = [
  body('email').isEmail(),
  body('user_password').isString()
]

export const changePasswordValidate = [
  body('old_password').isString(),
  body('user_password').isStrongPassword()
]