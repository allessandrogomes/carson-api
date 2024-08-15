import { Request, Response } from 'express'
declare class AdvertisementController {
  static listAdvertisements(req: Request, res: Response): Promise<void>
  static searchAdvertisements(req: Request, res: Response): Promise<void>
  static registerAdvertisement(req: Request, res: Response): Promise<void>
  static listAdvertisementById(req: Request, res: Response): Promise<void>
}
export default AdvertisementController
