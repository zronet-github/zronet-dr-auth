import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {

  id: string;
  email: string;
}

declare global { // Inside the express model find the interface that is already define and add the new optional property currentUser 
  namespace Express {
    interface Request {
      currentUser?: UserPayload;

    }
  }
}


export const currentUser = (req: Request, res: Response, next: NextFunction)=> { // not error handling middleware so only take 3 parameters


  if (!req.session?.jwt) {

      return next() // session or jwt property doesn't exist move onto the next middleware function

  }

  try {

    // verify that the JWT hasn't been tampered with if so set to currentUser

    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload;
    next()

  }
  catch (err) {

     next()

  }



}