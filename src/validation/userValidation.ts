import { body } from 'express-validator'

export const createUserValidate = [
  body('first_name').trim().isLength({ min: 2 }),
  body('last_name').trim().isLength({ min: 2 }),
  body('email').trim().isEmail(),
  body('user_password').isLength({ min: 6 })
]

export const updateUserValidate = [
  body('first_name').trim().isLength({ min: 2 }),
  body('last_name').trim().isLength({ min: 2 })
]

export const changeEmailValidate = [
  body('new_email').trim().isEmail(),
  body('user_password').isLength({ min: 6 })
]

export const deleteUserValidate = [
  body('user_password').isLength({ min: 6 })
]