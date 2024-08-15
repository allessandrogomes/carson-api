import { Request, Response } from 'express'
declare class UserController {
  static listUsers(req: Request, res: Response): Promise<void>
  static registerUser(req: Request, res: Response): Promise<void>
  static checkEmailExists(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined>
}
export default UserController
