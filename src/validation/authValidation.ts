import { body } from 'express-validator'

export const loginValidate = [
  body('email').isEmail().isLength({ max: 320 }),
  body('user_password').isString().isLength({ max: 256 })
]

export const changePasswordValidate = [
  body('old_password').isString().isLength({ max: 256 }),
  body('user_password').isStrongPassword().isLength({ max: 256 })
]