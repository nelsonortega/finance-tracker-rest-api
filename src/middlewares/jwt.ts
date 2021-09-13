import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  let token = ''
  const authenticationHeader = req.headers['authentication'] as string

  if (!authenticationHeader) {
    return res.json({
      success: false,
      message: `A token is required`
    })    
  }

  try {
    token = authenticationHeader.split(' ')[1]
    const userInfo: JwtPayload = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as JwtPayload

    req.params.user_id = userInfo.user_id
  } catch (error) {
    return res.json({
      success: false,
      message: `Invalid token`
    })
  }

  next()
}